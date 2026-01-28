import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { ArrowLeft, Users, Clock, CheckCircle, AlertTriangle, TrendingDown } from 'lucide-react';
import GlassPanel from '../../components/ui/GlassPanel';
import Button from '../../components/ui/Button';
import AdminLeaderboard from './AdminLeaderboard';

// Mock Data
const PARTICIPATION_DATA = [
  { time: '0m', users: 15 },
  { time: '10m', users: 45 },
  { time: '20m', users: 120 },
  { time: '30m', users: 115 },
  { time: '40m', users: 110 },
  { time: '50m', users: 105 },
  { time: '60m', users: 90 },
];

const PROBLEM_SOLVE_STATS = [
  { name: 'P1: Two Sum', solved: 150, attempted: 160 },
  { name: 'P2: Matrix', solved: 89, attempted: 120 },
  { name: 'P3: Graph', solved: 45, attempted: 90 },
  { name: 'P4: DP Hard', solved: 12, attempted: 50 },
];

const LANGUAGE_STATS = [
    { name: 'C++', value: 65, color: '#3b82f6' },
    { name: 'Java', value: 20, color: '#ea580c' },
    { name: 'Python', value: 10, color: '#eab308' },
    { name: 'JS', value: 5, color: '#22c55e' },
];

const ContestAnalytics = () => {
    const { id } = useParams();

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/admin/contests" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics: Weekly Contest {id || 402}</h1>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1"><Users size={14} /> 245 Participants</span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><Clock size={14} /> Ended 2 hours ago</span>
                        </div>
                    </div>
                </div>
                <Button variant="outline" size="sm">Download Report (CSV)</Button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-medium text-gray-500">Avg Solve Time</p>
                        <Clock size={16} className="text-blue-500" />
                    </div>
                    <h3 className="text-2xl font-bold">42m 15s</h3>
                    <p className="text-xs text-green-500 mt-1">↓ 5% quicker than avg</p>
                </div>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-medium text-gray-500">Completion Rate</p>
                        <CheckCircle size={16} className="text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold">18.5%</h3>
                    <p className="text-xs text-gray-500 mt-1">Users solved all</p>
                </div>
                <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-medium text-gray-500">Drop-off Rate</p>
                        <TrendingDown size={16} className="text-red-500" />
                    </div>
                    <h3 className="text-2xl font-bold">12%</h3>
                    <p className="text-xs text-gray-500 mt-1">Left after 1st fail</p>
                </div>
                 <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-medium text-gray-500">Cheating flags</p>
                        <AlertTriangle size={16} className="text-orange-500" />
                    </div>
                    <h3 className="text-2xl font-bold">5</h3>
                    <p className="text-xs text-orange-500 mt-1">Review required</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Problem Solve Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                     <h3 className="font-bold text-gray-900 dark:text-white mb-6">Problem Solving Statistics</h3>
                     <div className="h-[300px] w-full">
                         <ResponsiveContainer width="100%" height="100%">
                             <BarChart data={PROBLEM_SOLVE_STATS} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                 <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                 <XAxis type="number" />
                                 <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 12}} />
                                 <Tooltip cursor={{fill: 'transparent'}} />
                                 <Bar dataKey="solved" fill="#22c55e" name="Solved" barSize={20} radius={[0, 4, 4, 0]} />
                                 <Bar dataKey="attempted" fill="#cbd5e1" name="Attempts (Total)" barSize={20} radius={[0, 4, 4, 0]} />
                             </BarChart>
                         </ResponsiveContainer>
                     </div>
                </div>

                {/* Language Distribution */}
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                     <h3 className="font-bold text-gray-900 dark:text-white mb-6">Language Usage</h3>
                     <div className="h-[300px] w-full flex flex-col items-center justify-center">
                        <ResponsiveContainer width="100%" height={220}>
                            <PieChart>
                                <Pie
                                    data={LANGUAGE_STATS}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {LANGUAGE_STATS.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex flex-wrap justify-center gap-3 mt-4">
                            {LANGUAGE_STATS.map((lang) => (
                                <div key={lang.name} className="flex items-center gap-1.5 text-xs">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }} />
                                    <span>{lang.name} ({lang.value}%)</span>
                                </div>
                            ))}
                        </div>
                     </div>
                </div>
            </div>
            
            {/* Task 4: Admin Leaderboard Embed */}
            <div className="mt-8">
                <AdminLeaderboard />
            </div>
            
        </div>
    );
};

export default ContestAnalytics;
