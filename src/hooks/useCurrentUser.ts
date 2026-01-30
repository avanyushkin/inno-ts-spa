import { useState, useEffect } from "react";
import type { User } from "@/types/user";

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
  }, []);
  
  return { user, setUser };
}