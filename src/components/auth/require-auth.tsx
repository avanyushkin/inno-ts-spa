import { Navigate, useRouter } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

interface RequireAuthProps {
  children: ReactNode;
}
export const RequireAuth = ({ children }: RequireAuthProps) => {
  const router = useRouter ();
  const token = localStorage.getItem ('token');
  useEffect ( () => {
    const unsubscribe = router.subscribe ('onBeforeLoad', ({ pathChanged }) => {
      if (pathChanged) {
        const isProtectedRoute = location.pathname.startsWith ('/profile');
        if (isProtectedRoute) {
          const currentToken = localStorage.getItem ('token');
          if (!currentToken) {
            router.navigate ({ to: '/login' });
          }
        }
      }
    });
    return () => unsubscribe ();
  }, [router]);

  if (!token) {
    return <Navigate to = "/login" />;
  }
  return <>{children}</>;
};