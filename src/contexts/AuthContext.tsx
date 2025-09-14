import React, { createContext, useContext, useState, useEffect } from 'react';

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
// Make sure profile pictures are inside: public/assets/profiles/
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
      // ✅ Profile pic from public folder
      profilePicture: '/assets/profiles/aasritha.jpg',
      bio: 'Passionate computer science student interested in AI and software development.',
      gpa: '9.8',
      major: 'Computer Science with AI focus'
    }
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is stored in localStorage on app load
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call delay
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
