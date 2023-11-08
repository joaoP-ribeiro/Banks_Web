"use client"
import  { createContext, useState } from 'react'

type AuthContextData = {
    token: string | null
    setToken: (token: string | null) => void
};


type Children = {
    children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextData>({
    token: null,
    setToken: () => {},
  });

export const AuthProvider = ({ children }: Children) => {
    const [token, setToken] = useState<string | null>(null)

    return (
        <AuthContext.Provider value={{ token, setToken}}>
          {children}
        </AuthContext.Provider>
      );
} 