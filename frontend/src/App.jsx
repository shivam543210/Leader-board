import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contests from './pages/Contests';
import ContestDetails from './pages/ContestDetails';
import Leaderboard from './pages/Leaderboard';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminContests from './pages/admin/AdminContests';
import CreateContest from './pages/admin/CreateContest';

// Placeholder Pages
const Home = () => <Navigate to="/contests" replace />;

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/contests" element={<Contests />} />
              <Route path="/contest/:contestId" element={<ContestDetails />} />
              <Route path="/contest/:contestId/leaderboard" element={<Leaderboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/contests" element={<AdminContests />} />
              <Route path="/admin/create-contest" element={<CreateContest />} />
              
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
