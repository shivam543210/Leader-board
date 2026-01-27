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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Chart - Dominates Space */}
         <GlassPanel className="lg:col-span-2 p-6 h-[450px]">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Rating History</h3>
                <div className="flex gap-2">
                    <span className="text-sm font-medium text-gray-500">Max: <span className="text-gray-900 dark:text-white">{MOCK_STATS.maxRating}</span></span>
                </div>
            </div>
            <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={MOCK_RATING_DATA}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-gray-800" />
                        <XAxis 
                            dataKey="contest" 
                            stroke="#9ca3af" 
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis 
                            stroke="#9ca3af" 
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            domain={['dataMin - 100', 'dataMax + 100']}
                        />
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                                borderRadius: '8px',
                                border: '1px solid #e5e7eb',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                        />
                        <Line 
                            type="monotone" 
                            dataKey="rating" 
                            stroke="#2563eb" 
                            strokeWidth={3}
                            dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </GlassPanel>

        {/* Secondary Stats Column */}
        <div className="space-y-6">
             {/* Rank Card - Highlighted */}
            <GlassPanel className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <p className="text-blue-100 font-medium">Global Rank</p>
                        <h3 className="text-4xl font-bold mt-1">#{MOCK_STATS.currentRank}</h3>
                    </div>
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                        <Target size={24} className="text-white" />
                    </div>
                </div>
                <div className="text-sm text-blue-100">
                    Top 5% of users
                </div>
            </GlassPanel>

            {/* Other Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                 <GlassPanel className="p-4 flex flex-col items-center justify-center text-center">
                    <Trophy size={20} className="text-orange-500 mb-2" />
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{MOCK_STATS.totalContests}</span>
                    <span className="text-xs text-gray-500">Contests</span>
                 </GlassPanel>
                 
                 <GlassPanel className="p-4 flex flex-col items-center justify-center text-center">
                    <CheckCircle size={20} className="text-green-500 mb-2" />
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">{MOCK_STATS.problemsSolved}</span>
                    <span className="text-xs text-gray-500">Solved</span>
                 </GlassPanel>
            </div>

            {/* Skill Radar Small */}
            <GlassPanel className="p-4 h-[200px]">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 ml-1">Skill Breakdown</h4>
                <div className="h-[150px] w-full -ml-4">
                     <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={SKILL_DATA}>
                        <PolarGrid stroke="#e5e7eb" className="dark:stroke-gray-700" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 10 }} />
                        <Radar
                            name="Skills"
                            dataKey="A"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fill="#3b82f6"
                            fillOpacity={0.4}
                        />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </GlassPanel>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
