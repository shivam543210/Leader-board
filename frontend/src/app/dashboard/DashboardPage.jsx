import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, CheckCircle, Target, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Mock Data
const MOCK_STATS = {
    totalContests: 12,
    problemsSolved: 45,
    currentRank: 1240,
    maxRating: 1650
};

const MOCK_RATING_DATA = [
  { contest: 'WC 395', rating: 1200 },
  { contest: 'WC 396', rating: 1350 },
  { contest: 'WC 397', rating: 1300 },
  { contest: 'WC 398', rating: 1420 },
  { contest: 'WC 399', rating: 1450 },
  { contest: 'WC 400', rating: 1600 },
  { contest: 'WC 401', rating: 1650 },
];

const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center justify-between">
        <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
            <Icon size={24} className="text-white" />
        </div>
    </div>
);

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Welcome back, {user?.username || 'Guest'}!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
            title="Total Contests" 
            value={MOCK_STATS.totalContests} 
            icon={Trophy} 
            color="bg-purple-500" 
        />
        <StatCard 
            title="Problems Solved" 
            value={MOCK_STATS.problemsSolved} 
            icon={CheckCircle} 
            color="bg-green-500" 
        />
        <StatCard 
            title="Current Rank" 
            value={MOCK_STATS.currentRank} 
            icon={Target} 
            color="bg-blue-500" 
        />
        <StatCard 
            title="Max Rating" 
            value={MOCK_STATS.maxRating} 
            icon={TrendingUp} 
            color="bg-orange-500" 
        />
      </div>

      {/* Rating Graph */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Rating Progress</h3>
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MOCK_RATING_DATA}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-gray-800" />
                    <XAxis 
                        dataKey="contest" 
                        stroke="#6b7280" 
                        tick={{ fill: '#6b7280' }}
                        tickLine={false}
                    />
                    <YAxis 
                        stroke="#6b7280" 
                        tick={{ fill: '#6b7280' }}
                        tickLine={false}
                        domain={['dataMin - 100', 'dataMax + 100']}
                    />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                            borderRadius: '8px',
                            border: 'none',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                    />
                    <Line 
                        type="monotone" 
                        dataKey="rating" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
