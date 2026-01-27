import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../services/auth.service';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Mock User for now, replace with API call later
  // State
  const [user, setUser] = useState(null); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeMode, setActiveMode] = useState('user'); // 'user' | 'admin'
  const [loading, setLoading] = useState(true); // Default to true to prevent premature redirects

  useEffect(() => {
    // Restore session
    const token = localStorage.getItem('token');
    if (token) {
        // Mock restore user from token
        // In real app: await AuthService.me()
        setUser({ id: 1, username: 'admin', email: 'admin@example.com', role: 'admin' }); 
        setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
        const response = await AuthService.login(email, password);
        setUser(response.user);
        setIsAuthenticated(true);
        localStorage.setItem('token', response.token);
        setActiveMode('user');
        return true;
    } catch (error) {
        console.error("Login failed", error);
        throw error;
    } finally {
        setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    try {
        const response = await AuthService.signup(userData);
        setUser(response.user);
        setIsAuthenticated(true);
        localStorage.setItem('token', response.token);
        return true;
    } catch (error) {
        console.error("Signup failed", error);
        throw error;
    } finally {
        setLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
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
