import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import AdminLayout from './components/layout/AdminLayout';
import Login from './app/auth/Login';
import Signup from './app/auth/Signup';
import ContestList from './app/contests/ContestList';
import ContestWorkspace from './app/contest/ContestWorkspace';
import LeaderboardPage from './app/contest/LeaderboardPage';
import DashboardPage from './app/dashboard/DashboardPage';
import AdminDashboard from './app/admin/AdminDashboard';
import AdminContests from './app/admin/AdminContests';
import CreateContestWizard from './app/admin/CreateContestWizard';
import ContestAnalytics from './app/admin/ContestAnalytics';
import UserProfile from './app/user/UserProfile';
import ProblemSet from './app/problems/ProblemSet';
import ProtectedRoute from './components/auth/ProtectedRoute';
import GlobalAnnouncer from './components/common/GlobalAnnouncer';
import { useAuth } from './context/AuthContext';


// Wrapper for User Layout - Enforce User Mode
const UserLayoutWrapper = () => {
    const { activeMode, user } = useAuth();
    
    // If user is admin but in admin mode, they shouldn't see user pages?
    // The requirement says "Block user routes in admin mode"
    if (user?.role === 'admin' && activeMode === 'admin') {
        return <Navigate to="/admin" replace />;
    }

    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

// Placeholder Pages
const Home = () => <Navigate to="/contests" replace />;

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <GlobalAnnouncer />
          {/* Layout removed */}
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Admin Routes - Wrapped in AdminLayout */}
              <Route element={
                  <ProtectedRoute requireAdmin>
                      <AdminLayout />
                  </ProtectedRoute>
              }>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/contests" element={<AdminContests />} />
                  <Route path="/admin/create-contest" element={<CreateContestWizard />} />
                  <Route path="/admin/contests" element={<AdminContests />} />
                  <Route path="/admin/contests/:id/analytics" element={<ContestAnalytics />} />
                  {/* Placeholders for future tasks */}
                  <Route path="/admin/system" element={<div className="p-4">System Health (Task 5)</div>} />
                  <Route path="/admin/errors" element={<div className="p-4">Error Log (Task 6)</div>} />
              </Route>

              {/* User Routes - Wrapped in User Layout */}
              {/* We need a wrapper component to handle the Layout logic since <Layout> was previously wrapping everything. */}
              {/* We will conditionally render Layout only for these routes using an Outlet? No, just wrap them in a Route. */}
              
              <Route element={
                  <UserLayoutWrapper />
              }>
                  <Route path="/" element={<Home />} />
                  <Route path="/contests" element={<ContestList />} />
                  <Route path="/contest/:contestId" element={<ContestWorkspace />} />
                  <Route path="/contest/:contestId/leaderboard" element={<LeaderboardPage />} />
                  <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                  <Route path="/problems" element={<ProblemSet />} />
                  <Route path="/user/:username" element={<UserProfile />} />
              </Route>

            </Routes>
          {/* </Layout> removed from here, moved to UserLayoutWrapper */}
          {/* Layout removed */}
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
