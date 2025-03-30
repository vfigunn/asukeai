
import { supabase } from '@/integrations/supabase/client';

// Fetch all user profiles
export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching users:', error);
    throw new Error(error.message);
  }

  return data || [];
};

// Toggle admin status for a user
export const toggleAdminStatus = async (userId: string, isAdmin: boolean) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ is_admin: isAdmin })
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error updating admin status:', error);
    throw new Error(error.message);
  }

  return data;
};
