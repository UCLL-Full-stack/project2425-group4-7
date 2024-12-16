import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("loggedInUser");
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    }
  }, []);

  return authenticated;
};

export const getUserRole = (): string | null => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      const parsed = JSON.parse(user);
      return parsed.role || null;
    }
  }
  return null;
};

export const logout = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("loggedInUser");
  }
};
