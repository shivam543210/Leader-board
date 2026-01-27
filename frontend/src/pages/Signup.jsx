import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(formData);
      navigate('/');
    } catch (error) {
      console.error('Signup failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-2xl">
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">Create Account</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">Join the competitive programming community</p>
        
        <form onSubmit={handleSubmit} className="space-y-5">
           <Input
            label="Username"
            name="username"
            type="text"
            placeholder="johndoe"
            icon={User}
            value={formData.username}
            onChange={handleChange}
            required
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            placeholder="you@example.com"
            icon={Mail}
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
          
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            icon={Lock}
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="new-password"
          />

          <Button type="submit" variant="primary" className="w-full py-3 mt-2" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 transition-colors">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
