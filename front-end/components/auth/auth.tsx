import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  const checkAuthStatus = () => {
    const user = localStorage.getItem("loggedInUser");
    setAuthenticated(!!user);
  };

  useEffect(() => {
    checkAuthStatus();

    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
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
    window.dispatchEvent(new Event("storage"));
  }
};

// ROOTZ (Simon Denruyter / Ewout Servranckx)
