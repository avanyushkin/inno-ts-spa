import { useState, useEffect } from "react";
export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  phone?: string;
  address?: { city?: string };
};
export function useCurrentUser () {
  const [user, setUser] = useState<User | null> (null);
  useEffect (() => {
    const stored = localStorage.getItem ("user");
    if (stored) {
        setUser(JSON.parse(stored));
    }
  }, []);
  return {user, setUser};
}