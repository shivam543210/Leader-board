import React from 'react';
import { Users, FileCode, CheckCircle, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
           <p className="text-gray-500 dark:text-gray-400">Platform overview and management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Users</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">8,542</h3>
            </div>
            <div className="p-3 rounded-lg bg-blue-500">
                <Users size={24} className="text-white" />
            </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Contests</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">124</h3>
            </div>
            <div className="p-3 rounded-lg bg-purple-500">
                <TrendingUp size={24} className="text-white" />
            </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Problems</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">2,403</h3>
            </div>
            <div className="p-3 rounded-lg bg-orange-500">
                <FileCode size={24} className="text-white" />
            </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Submissions</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">1.2M</h3>
            </div>
            <div className="p-3 rounded-lg bg-green-500">
                <CheckCircle size={24} className="text-white" />
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
                <Link to="/admin/create-contest" className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:border-blue-200 dark:hover:border-blue-800 border border-transparent transition-all group">
                    <span className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 block mb-1">Create Contest</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Set up a new competition</span>
                </Link>
                <Link to="/admin/contests" className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:border-blue-200 dark:hover:border-blue-800 border border-transparent transition-all group">
                    <span className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 block mb-1">Manage Contests</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Edit or delete details</span>
                </Link>
            </div>
        </div>

        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">System Status</h3>
            <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-gray-600 dark:text-gray-400">Server Load</span>
                    <span className="text-green-500 font-medium">Healthy (12%)</span>
                </div>
                 <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-gray-600 dark:text-gray-400">Database Connection</span>
                    <span className="text-green-500 font-medium">Connected</span>
                </div>
                 <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 dark:text-gray-400">Redis Cache</span>
                    <span className="text-green-500 font-medium">Operational</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
