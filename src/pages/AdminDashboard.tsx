
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getAllEvents } from '@/services/eventService';
import { Event } from '@/types';
import { Edit, Trash2, Plus, LogOut, Loader2 } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, logout, isLoading } = useAuth();
  const [events, setEvents] = useState<Event[]>(getAllEvents());
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  // Protect the route
  React.useEffect(() => {
    if (!isLoading && !isAdmin) {
      navigate('/admin');
      toast({
        title: "Access denied",
        description: "You must be an admin to view this page",
        variant: "destructive",
      });
    }
  }, [isAdmin, isLoading, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const handleDeleteClick = (event: Event) => {
    setSelectedEvent(event);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedEvent) {
      // In a real app, this would be an API call
      // For now we'll just update our local state
      setEvents(events.filter(e => e.id !== selectedEvent.id));
      toast({
        title: "Event deleted",
        description: `"${selectedEvent.name}" has been deleted successfully`,
      });
    }
    setDeleteDialogOpen(false);
  };

  const handleEditEvent = (eventId: string) => {
    // In a real app, this would navigate to an edit form
    toast({
      title: "Edit event",
      description: "This would navigate to an edit form in a complete application",
    });
  };

  const handleAddEvent = () => {
    // In a real app, this would navigate to an add form
    toast({
      title: "Add event",
      description: "This would navigate to an add form in a complete application",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">Manage Events</h2>
          <Button onClick={handleAddEvent}>
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">Event</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Tag</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Price</th>
                <th className="px-6 py-3 text-right text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-muted/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img 
                        src={event.image} 
                        alt={event.name} 
                        className="h-10 w-10 rounded-md object-cover mr-3" 
                      />
                      <div className="truncate max-w-[200px]">
                        <div className="font-medium">{event.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {event.tag}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${event.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditEvent(event.id)}
                      className="mr-2"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteClick(event)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedEvent?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
