
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, Lock, Loader2, User } from 'lucide-react';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Login schema
const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

// Signup schema
const signupSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const Admin = () => {
  const navigate = useNavigate();
  const { login, signup, isAuthenticated, isAdmin, isLoading, refreshProfile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [authError, setAuthError] = useState<string | null>(null);
  const [isCheckingAdminStatus, setIsCheckingAdminStatus] = useState(false);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // Clear any auth errors when switching tabs
  useEffect(() => {
    setAuthError(null);
  }, [activeTab]);

  // Function to check admin status with retry
  const checkAndRedirectIfAdmin = async (attempts = 5, delay = 1000) => {
    setIsCheckingAdminStatus(true);
    
    let currentAttempt = 0;
    
    const checkStatus = async () => {
      currentAttempt++;
      console.log(`Checking admin status, attempt ${currentAttempt}`);
      
      await refreshProfile();
      
      if (isAdmin) {
        console.log("Admin status confirmed, redirecting");
        navigate('/admin/dashboard');
        setIsCheckingAdminStatus(false);
        return true;
      }
      
      if (currentAttempt >= attempts) {
        console.log("Max attempts reached, not an admin");
        if (isAuthenticated) {
          toast({
            title: "Access Restricted",
            description: "You don't have admin privileges.",
            variant: "destructive"
          });
        }
        setIsCheckingAdminStatus(false);
        return false;
      }
      
      console.log(`Retrying in ${delay}ms...`);
      setTimeout(checkStatus, delay);
    };
    
    return checkStatus();
  };

  // Check authentication status and redirect if needed
  useEffect(() => {
    if (!isLoading && !isCheckingAdminStatus) {
      if (isAuthenticated) {
        if (isAdmin) {
          navigate('/admin/dashboard');
        } else {
          // If authenticated but not admin, refresh profile to check if they should be admin
          checkAndRedirectIfAdmin();
        }
      }
    }
  }, [isAuthenticated, isAdmin, isLoading, navigate]);

  async function onLoginSubmit(values: LoginFormValues) {
    setIsSubmitting(true);
    setAuthError(null);
    
    try {
      await login(values.email, values.password);
      
      toast({
        title: "Login Successful",
        description: "Checking your admin status...",
      });
      
      // After login, check admin status with retries
      checkAndRedirectIfAdmin();
      
    } catch (error: any) {
      console.error("Login error:", error);
      setAuthError(error.message || "Failed to login. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function onSignupSubmit(values: SignupFormValues) {
    setIsSubmitting(true);
    setAuthError(null);
    
    try {
      await signup(values.email, values.password, values.name);
      
      toast({
        title: "Account Created",
        description: "Your account has been created successfully. Checking admin status...",
      });
      
      // After signup, check admin status with retries
      // First signup usually gets admin automatically
      checkAndRedirectIfAdmin(10, 1000); // More attempts with 1s delay
      
    } catch (error: any) {
      console.error("Signup error:", error);
      
      // Handle different error types
      if (error.message?.includes("already registered")) {
        setAuthError("This email is already registered. Please log in instead.");
        
        toast({
          title: "Account Already Exists",
          description: "This email is already registered. Please log in instead.",
          variant: "destructive"
        });
        
        setActiveTab("login");
        loginForm.setValue("email", values.email);
      } else {
        setAuthError(error.message || "Failed to create account. Please try again.");
        
        toast({
          title: "Signup Failed",
          description: error.message || "Failed to create account. Please try again.",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-primary p-6 text-white">
          <h1 className="text-2xl font-bold">Admin Portal</h1>
          <p className="text-primary-foreground/80">Sign in to manage events</p>
        </div>
        
        <div className="p-6">
          {authError && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive text-sm">
              {authError}
            </div>
          )}
          
          {isCheckingAdminStatus && (
            <div className="mb-4 p-3 bg-primary/10 border border-primary/20 rounded-md text-primary text-sm flex items-center">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Verifying admin status...
            </div>
          )}
          
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "signup")}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:border-input">
                            <Mail className="ml-3 h-5 w-5 text-gray-400" />
                            <Input placeholder="email@example.com" className="border-0 focus-visible:ring-0" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:border-input">
                            <Lock className="ml-3 h-5 w-5 text-gray-400" />
                            <Input 
                              type="password" 
                              placeholder="••••••" 
                              className="border-0 focus-visible:ring-0" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting || isCheckingAdminStatus}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      'Sign In'
                    )}
                  </Button>
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="signup">
              <Form {...signupForm}>
                <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-6">
                  <FormField
                    control={signupForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:border-input">
                            <User className="ml-3 h-5 w-5 text-gray-400" />
                            <Input placeholder="Your name" className="border-0 focus-visible:ring-0" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={signupForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:border-input">
                            <Mail className="ml-3 h-5 w-5 text-gray-400" />
                            <Input placeholder="email@example.com" className="border-0 focus-visible:ring-0" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={signupForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:border-input">
                            <Lock className="ml-3 h-5 w-5 text-gray-400" />
                            <Input 
                              type="password" 
                              placeholder="••••••" 
                              className="border-0 focus-visible:ring-0" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full" disabled={isSubmitting || isCheckingAdminStatus}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
          
          <div className="text-sm text-gray-500 text-center mt-6">
            <p>First user to sign up will automatically become an admin.</p>
            <p>Other users can be granted admin rights by existing admins.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
