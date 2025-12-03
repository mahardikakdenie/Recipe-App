// /src/contexts/Auth/AuthContext.tsx
import { getUser, removeToken, removeUser } from '@/src/utils/storage';
import React, { createContext, useContext, useEffect, useState } from 'react'; 

interface User {
    email: string;
    id: string;
}

type AuthContextType = {
  user: User | null;
  setUser: (user: User) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // ... logic login
  };

  const logout = async () => {
    setUser(null);
    await removeToken();
    await removeUser();
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await getUser();
      setUser(user);
    };

    getCurrentUser();
    
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
