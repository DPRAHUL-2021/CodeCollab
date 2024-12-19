import { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    // Mock login
    if (email === 'test@gitam.edu' && password === 'test123') {
      const user = {
        id: '1',
        username: 'testuser',
        email: 'test@gitam.edu',
        avatar: 'https://ui-avatars.com/api/?name=Test+User&size=32',
      };
      setUser(user);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    // Mock signup
    const user = {
      id: Date.now().toString(),
      username,
      email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&size=32`,
    };
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}