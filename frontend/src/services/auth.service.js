import apiClient from './apiClient';

const AuthService = {
  login: async (email, password) => {
    // Phase 2: Mock response structure that mimics real backend
    // In production, this would be: return apiClient.post('/auth/login', { email, password });
    
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                user: { id: 1, email, username: 'DemoUser', role: 'admin' },
                token: 'mock-jwt-token-xyz'
            });
        }, 800);
    });
  },

  signup: async (userData) => {
      // return apiClient.post('/auth/signup', userData);
      return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                user: { id: 2, ...userData, role: 'user' },
                token: 'mock-jwt-token-abc'
            });
        }, 800);
    });
  },

  logout: () => {
    localStorage.removeItem('token');
    // return apiClient.post('/auth/logout');
  },
  
  getCurrentUser: async () => {
      // return apiClient.get('/auth/me');
      return null;
  }
};

export default AuthService;
