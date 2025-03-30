
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2, ArrowLeft, ShieldCheck, ShieldX } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllUsers, toggleAdminStatus } from '@/services/userService';
import { Button } from '@/components/ui/button';

const AdminUsers = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const queryClient = useQueryClient();
  
  // Fetch all users
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['admin-users'],
    queryFn: getAllUsers,
  });

  // Toggle admin status mutation
  const toggleAdminMutation = useMutation({
    mutationFn: ({ userId, isAdmin }: { userId: string, isAdmin: boolean }) => 
      toggleAdminStatus(userId, isAdmin),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({
        title: "Admin status updated",
        description: "The user's admin status has been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Update failed",
        description: error instanceof Error ? error.message : "Failed to update admin status",
        variant: "destructive",
      });
    }
  });

  // Handle toggling admin status
  const handleToggleAdmin = (userId: string, currentStatus: boolean) => {
    if (user?.id === userId) {
      toast({
        title: "Action not allowed",
        description: "You cannot change your own admin status.",
        variant: "destructive",
      });
      return;
    }
    
    toggleAdminMutation.mutate({ userId, isAdmin: !currentStatus });
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    navigate('/admin');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manage Users</h1>
          <p className="text-gray-600">Assign or revoke administrator privileges</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/admin/dashboard')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold">User Accounts</h2>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="p-6 text-center text-red-500">
            Error loading users. Please try again later.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium">User</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                  <th className="px-6 py-3 text-right text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users.map((profile) => (
                  <tr key={profile.id} className="hover:bg-muted/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="truncate max-w-[200px]">
                          <div className="font-medium">{profile.name || 'Unnamed User'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {profile.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        profile.is_admin 
                          ? "bg-primary/10 text-primary" 
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {profile.is_admin ? 'Administrator' : 'Regular User'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleToggleAdmin(profile.id, profile.is_admin)}
                        disabled={toggleAdminMutation.isPending || user?.id === profile.id}
                      >
                        {profile.is_admin ? (
                          <ShieldX className="h-4 w-4 text-destructive mr-2" />
                        ) : (
                          <ShieldCheck className="h-4 w-4 text-primary mr-2" />
                        )}
                        {profile.is_admin ? 'Remove Admin' : 'Make Admin'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
