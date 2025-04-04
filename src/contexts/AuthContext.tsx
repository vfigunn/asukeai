
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { getUserProfile } from '@/services/userService';

interface Profile {
  id: string;
  email: string;
  name: string | null;
  is_admin: boolean;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch profile data for a user with retries
  const fetchProfile = async (userId: string, retryCount = 3, delay = 1000): Promise<Profile | null> => {
    try {
      console.log(`Attempting to fetch profile for user ${userId}, attempt 1/${retryCount + 1}`);
      const data = await getUserProfile(userId);
      console.log("Profile data received:", data);
      return data as Profile;
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      
      if (retryCount > 0) {
        console.log(`Retrying profile fetch in ${delay}ms, ${retryCount} attempts left`);
        return new Promise(resolve => {
          setTimeout(async () => {
            const result = await fetchProfile(userId, retryCount - 1, delay * 1.5);
            resolve(result);
          }, delay);
        });
      }
      
      return null;
    }
  };

  // Refresh the current user's profile data with retries
  const refreshProfile = async (retryCount = 3, delay = 1000): Promise<void> => {
    if (!user) return;
    
    try {
      console.log(`Refreshing profile for user ${user.id}, attempt 1/${retryCount + 1}`);
      const profileData = await fetchProfile(user.id);
      setProfile(profileData);
      console.log('Profile refreshed:', profileData);
    } catch (error) {
      console.error('Error refreshing profile:', error);
      
      if (retryCount > 0) {
        console.log(`Retrying profile refresh in ${delay}ms, ${retryCount} attempts left`);
        setTimeout(() => refreshProfile(retryCount - 1, delay * 1.5), delay);
      }
    }
  };

  useEffect(() => {
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log('Auth state change:', event, currentSession?.user?.id);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          const profileData = await fetchProfile(currentSession.user.id);
          setProfile(profileData);
          console.log('Profile after auth change:', profileData);
        } else {
          setProfile(null);
        }

        setIsLoading(false);
      }
    );

    // Check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          const profileData = await fetchProfile(currentSession.user.id);
          setProfile(profileData);
          console.log('Initial profile:', profileData);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Refresh profile multiple times with increasing delay to ensure we get admin status
      if (data.user) {
        // First immediate fetch
        const profileData = await fetchProfile(data.user.id);
        setProfile(profileData);
        
        // Schedule additional refreshes with increasing delays
        setTimeout(() => refreshProfile(), 1000);
        setTimeout(() => refreshProfile(), 3000);
      }

      // Success notification
      toast({
        title: "Signed in successfully",
        description: "Welcome back!",
      });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) throw error;

      // We need to give the database trigger enough time to complete
      // and set the admin status for the first user
      console.log("Signup successful, waiting for database triggers to complete");
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully. Checking admin status...",
      });
      
      // Schedule multiple profile refreshes with increasing delays
      setTimeout(async () => {
        if (data.user) {
          console.log("First profile refresh after signup");
          const profileData = await fetchProfile(data.user.id, 3, 1000);
          setProfile(profileData);
          console.log('Profile after signup (1st check):', profileData);
        }
      }, 1000);
      
      setTimeout(async () => {
        if (data.user) {
          console.log("Second profile refresh after signup");
          const profileData = await fetchProfile(data.user.id, 3, 1000);
          setProfile(profileData);
          console.log('Profile after signup (2nd check):', profileData);
        }
      }, 3000);
      
      setTimeout(async () => {
        if (data.user) {
          console.log("Third profile refresh after signup");
          const profileData = await fetchProfile(data.user.id, 3, 1000);
          setProfile(profileData);
          console.log('Profile after signup (3rd check):', profileData);
        }
      }, 6000);
      
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been signed out successfully",
      });
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message || "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user,
        profile,
        session,
        isAdmin: profile?.is_admin || false,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
