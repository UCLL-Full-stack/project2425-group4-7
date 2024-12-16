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
  if (typeof window === "undefined") {
    return null;
  }

  const user = localStorage.getItem("loggedInUser");
  if (user) {
    try {
      const parsed = JSON.parse(user);
      return parsed.role || null;
    } catch (error) {
      console.error("Fout bij het parsen van de gebruiker:", error);
      return null;
    }
  }
  return null;
};

export const logout = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("loggedInUser");
  }
};
