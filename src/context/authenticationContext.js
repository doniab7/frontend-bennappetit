import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
useEffect(() => {
  async function fetchUser() {
    try {
      const content = await fetch("http://localhost:8000/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (content.ok) {
        const userData = await content.json();
        setAuthUser(userData);
        setIsLoggedIn(true);
      } else {
        console.error("Failed to fetch user:", content.statusText);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoggedIn(false);
    }
  }

  fetchUser();
}, []);


  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
  return useContext(AuthContext);
};
