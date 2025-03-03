import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import * as authService from '../services/authService';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User } from 'lucide-react';
import { toast } from 'sonner';

const UserMenu: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  
  if (!user) return null;
  
  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authService.logout();
      dispatch(logout());
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to log out');
      console.error('Failed to log out', error);
    } finally {
      setIsLoggingOut(false);
    }
  };
  
  // Get initials for avatar
  const getInitials = (username: string) => {
    return username.charAt(0).toUpperCase();
  };
  
  return (
    <div className="absolute top-4 right-4 flex items-center gap-2">
      <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm font-medium">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary text-primary-foreground">
            {getInitials(user.username)}
          </AvatarFallback>
        </Avatar>
        <span>{user.username}</span>
      </div>
      <Button 
        variant="neutral" 
        size="sm" 
        className="glass-panel" 
        onClick={handleLogout}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? (
          <span className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin"></span>
        ) : (
          <LogOut size={18} />
        )}
        <span className="sr-only">Logout</span>
      </Button>
    </div>
  );
};

export default UserMenu;