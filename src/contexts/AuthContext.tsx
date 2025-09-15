import React, { createContext, useContext, useState, useEffect } from 'react';

// ✅ Import profile pictures from src/assets
import aasrithaPic from '../assets/profiles/aasritha.jpg';

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  department: string;
  year: string;
  profilePicture: string;
  bio?: string;
  gpa?: string;
  major?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ Mock users data
const mockUsers: { [key: string]: { password: string; user: User } } = {
  'aasritha.adapa': {
    password: 'Aasritha Adapa',
    user: {
      id: '1',
      username: 'aasritha.adapa',
      name: 'Aasritha Adapa',
      email: 'aasrithaadapa@gmail.com',
      department: 'Computer Science',
      year: '4th Year',
      // ✅ Use imported image
      profilePicture: aasrithaPic,
      bio: 'Passionate computer science student interested in AI and software development.',
      gpa: '9.8',
      major: 'Computer Science with AI focus',
    },
  },
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // ✅ Load from localStorage on app start
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const userRecord = mockUsers[username];
    if (userRecord && userRecord.password === password) {
      setUser(userRecord.user);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(userRecord.user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
