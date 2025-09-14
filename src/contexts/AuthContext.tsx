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

// Mock users data (in a real app, this would come from users.json via API)
const mockUsers: { [key: string]: { password: string; user: User } } = {
  'aasritha.adapa': {
    password: 'Aasritha Adapa',
    user: {
      id: '1',
      username: 'aasrith.aadapa',
      name: 'Aasritha Adapa',
      email: 'aasritha.adapa@university.edu',
      department: 'Computer Science',
      year: 'Senior',
      profilePicture: '/src/',
      bio: 'Passionate computer science student interested in AI and software development.',
      gpa: '9.8',
      major: 'Computer Science with AI focus'
    }
  },
  'jane.smith': {
    password: 'college456',
    user: {
      id: '2',
      username: 'jane.smith',
      name: 'Jane Smith',
      email: 'jane.smith@university.edu',
      department: 'Business Administration',
      year: 'Junior',
      profilePicture: '/src/assets/profiles/jane-smith.jpg',
      bio: 'Aspiring business leader with focus on sustainable business practices.',
      gpa: '3.9',
      major: 'Business Administration with Marketing minor'
    }
  },
  'mike.wilson': {
    password: 'campus789',
    user: {
      id: '3',
      username: 'mike.wilson',
      name: 'Mike Wilson',
      email: 'mike.wilson@university.edu',
      department: 'Engineering',
      year: 'Sophomore',
      profilePicture: '/src/assets/profiles/mike-wilson.jpg',
      bio: 'Engineering student passionate about renewable energy and innovation.',
      gpa: '3.7',
      major: 'Mechanical Engineering'
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
