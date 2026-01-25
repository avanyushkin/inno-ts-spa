import { Button } from "@/components/ui/button";
import { useRouter } from '@tanstack/react-router';
import { LogOut } from 'lucide-react';
export const LogoutButton = () => {
  const router = useRouter ();
  const handleLogout = () => {
    localStorage.removeItem ('token');
    localStorage.removeItem ('user');
    router.navigate ({ to: '/login' });
  };
  return (
    <Button variant = "destructive" onClick = {handleLogout} className = "flex items-center gap-2">
      <LogOut className = "h-4 w-4" />
      Logout
    </Button>
  );
};