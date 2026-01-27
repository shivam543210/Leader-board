import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, LogOut, LayoutDashboard, Repeat } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import NotificationDropdown from './NotificationDropdown';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, activeMode, switchMode } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md transition-colors duration-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Link to="/contests" className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2 transition-colors">
            <span className="text-blue-600 dark:text-blue-500">CP</span> Platform
          </Link>
        </div>

        {/* Center: Title / Context */}
        <div className="hidden md:block font-medium text-gray-600 dark:text-gray-400 transition-colors">
          {activeMode === 'admin' ? 'Admin Console' : 'Contest Area'}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
            {/* Mode Switch (Only if user is admin) */}
            {user?.role === 'admin' && (
                <button onClick={switchMode} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 transition-colors" title="Switch Mode">
                    <Repeat size={20} />
                </button>
            )}

            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 transition-colors" title="Toggle Theme">
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Notifications */}
            <NotificationDropdown />

            {/* Profile Dropdown */}
            <div className="relative group">
                <button className="flex items-center gap-2 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 font-medium">
                        {user?.username ? user.username[0].toUpperCase() : 'G'}
                    </div>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50">
                    <div className="py-1">
                        <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <LayoutDashboard size={16} /> Dashboard
                        </Link>
                        {user ? (
                           <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                               <LogOut size={16} /> Logout
                           </button>
                        ) : (
                           <Link to="/login" className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors">
                               Log In
                           </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
