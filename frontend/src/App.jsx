import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Login from './app/auth/Login';
import Signup from './app/auth/Signup';
import ContestList from './app/contests/ContestList';
import ContestWorkspace from './app/contest/ContestWorkspace';
import LeaderboardPage from './app/contest/LeaderboardPage';
import DashboardPage from './app/dashboard/DashboardPage';
import AdminDashboard from './app/admin/AdminDashboard';
import AdminContests from './app/admin/AdminContests';
import CreateContest from './app/admin/CreateContest';

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
              <Route path="/contests" element={<ContestList />} />
              <Route path="/contest/:contestId" element={<ContestWorkspace />} />
              <Route path="/contest/:contestId/leaderboard" element={<LeaderboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              
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
