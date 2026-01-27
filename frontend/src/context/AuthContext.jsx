import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Mock User for now, replace with API call later
  const [user, setUser] = useState(null); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeMode, setActiveMode] = useState('user'); // 'user' | 'admin'

  const login = async (email, password) => {
    // TODO: Implement API call
    console.log('Logging in', email, password);
    // Mock success
    const mockUser = { id: 1, username: 'testuser', role: 'admin' };
    setUser(mockUser);
    setIsAuthenticated(true);
    // Default to user mode on login
    setActiveMode('user');
  };

  const signup = async (userData) => {
    console.log('Signing up', userData);
    // TODO: Implement API call
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setActiveMode('user');
  };

  const switchMode = () => {
    if (user?.role === 'admin') {
      setActiveMode((prev) => (prev === 'user' ? 'admin' : 'user'));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, activeMode, login, signup, logout, switchMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
