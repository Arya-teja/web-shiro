import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper functions for registered users database
  const getRegisteredUsers = () => {
    const users = localStorage.getItem("registeredUsers");
    return users ? JSON.parse(users) : [];
  };

  const saveRegisteredUser = (userData) => {
    const users = getRegisteredUsers();
    users.push(userData);
    localStorage.setItem("registeredUsers", JSON.stringify(users));
  };

  const findUserByEmail = (email) => {
    const users = getRegisteredUsers();
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  };

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const registeredUser = findUserByEmail(email);

    if (!registeredUser) {
      return {
        success: false,
        error: "Account not found. Please sign up first.",
      };
    }

    if (registeredUser.password !== password) {
      return { success: false, error: "Invalid password. Please try again." };
    }

    const userData = {
      id: registeredUser.id,
      name: registeredUser.name,
      email: registeredUser.email,
    };

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    return { success: true, user: userData };
  };

  const signup = (userData) => {
    // Check if email already exists
    const existingUser = findUserByEmail(userData.email);
    if (existingUser) {
      return {
        success: false,
        error: "Email already registered. Please login instead.",
      };
    }

    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password, // In production, this should be hashed
    };

    // Save to registered users database
    saveRegisteredUser(newUser);

    // Auto login after signup
    const loginData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };
    setUser(loginData);
    localStorage.setItem("user", JSON.stringify(loginData));

    return { success: true, user: loginData };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
