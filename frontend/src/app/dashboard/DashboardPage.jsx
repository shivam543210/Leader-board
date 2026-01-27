import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Trophy, CheckCircle, Target, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import GlassPanel from '../../components/ui/GlassPanel';

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

const SKILL_DATA = [
  { subject: 'DP', A: 120, fullMark: 150 },
  { subject: 'Graph', A: 98, fullMark: 150 },
  { subject: 'Math', A: 86, fullMark: 150 },
  { subject: 'Strings', A: 99, fullMark: 150 },
  { subject: 'Greedy', A: 85, fullMark: 150 },
  { subject: 'Trees', A: 65, fullMark: 150 },
];

const StatCard = ({ title, value, icon: Icon, color }) => (
    <GlassPanel className="p-6 flex items-center justify-between hover:scale-[1.02] transition-transform">
        <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${color} bg-opacity-90 shadow-lg`}>
            <Icon size={24} className="text-white" />
        </div>
    </GlassPanel>
);

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Welcome back, {user?.username || 'Guest'}!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
            title="Total Contests" 
            value={MOCK_STATS.totalContests} 
            icon={Trophy} 
            color="bg-gradient-to-br from-purple-500 to-indigo-600" 
        />
        <StatCard 
            title="Problems Solved" 
            value={MOCK_STATS.problemsSolved} 
            icon={CheckCircle} 
            color="bg-gradient-to-br from-green-400 to-emerald-600" 
        />
        <StatCard 
            title="Current Rank" 
            value={MOCK_STATS.currentRank} 
            icon={Target} 
            color="bg-gradient-to-br from-blue-400 to-cyan-600" 
        />
        <StatCard 
            title="Max Rating" 
            value={MOCK_STATS.maxRating} 
            icon={TrendingUp} 
            color="bg-gradient-to-br from-orange-400 to-pink-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Rating Graph */}
        <GlassPanel className="lg:col-span-2 p-6">
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
                                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                                borderRadius: '12px',
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
        </GlassPanel>

        {/* Skill Radar */}
        <GlassPanel className="p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Skill Analysis</h3>
            <div className="h-[300px] w-full flex items-center justify-center">
                 <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={SKILL_DATA}>
                    <PolarGrid stroke="#e5e7eb" className="dark:stroke-gray-700" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                    <Radar
                        name="Mike"
                        dataKey="A"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fill="#3b82f6"
                        fillOpacity={0.3}
                    />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </GlassPanel>
      </div>
    </div>
  );
};

export default Dashboard;
