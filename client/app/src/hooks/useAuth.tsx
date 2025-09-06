import React, { useState, useEffect, createContext, useContext } from "react";
import { User } from "@/types";
import { mockUsers } from "@/lib/mock-data";
import api from "@/lib/api";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, username: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("ecofinds_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log("Attempting login with", email)
      const res = await api.post("/api/auth/login", { email, password });
      if (res.data.accessToken) {
        localStorage.setItem("accessToken", res.data.accessToken);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const register = async (email: string, password: string, username: string) => {
    try {
      const res = await api.post("/api/auth/register", { email, password, username });
      return res.status === 201;
    } catch (error: any) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ecofinds_user");
  };

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    const updatedUser = { ...user, ...updates, updatedAt: new Date().toISOString() };
    setUser(updatedUser);
    localStorage.setItem("ecofinds_user", JSON.stringify(updatedUser));
    return true;
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };