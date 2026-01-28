import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Trophy, Activity, AlertCircle, LogOut, Repeat, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const { user, logout, switchMode } = useAuth();
  const location = useLocation();

  const NAV_ITEMS = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Contests', path: '/admin/contests', icon: Trophy },
    { label: 'System Health', path: '/admin/system', icon: Activity },
    { label: 'Errors', path: '/admin/errors', icon: AlertCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex font-sans text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col fixed h-full z-10">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Admin Console
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
            <div className="px-4 py-2">
                <p className="text-xs text-gray-500 uppercase font-semibold">Logged in as</p>
                <p className="font-medium truncate">{user?.username || 'Admin'}</p>
            </div>
            
            <button 
                onClick={switchMode}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
                <Repeat size={18} /> Switch to User
            </button>
            <button 
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
            >
                <LogOut size={18} /> Logout
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
