import React, { useState } from 'react';
import { Search, AlertTriangle, Eye, Ban, Flag } from 'lucide-react';
import GlassPanel from '../../components/ui/GlassPanel';
import Button from '../../components/ui/Button';

// Mock Leaderboard Data with Suspicious Entries
const MOCK_LEADERBOARD = [
  { rank: 1, username: 'speed_demon', score: 400, finishTime: '00:15:23', country: 'US', flags: ['IMPOSSIBLE_TIME'] },
  { rank: 2, username: 'copy_cat_1', score: 350, finishTime: '00:45:10', country: 'CN', flags: ['IP_MATCH'] },
  { rank: 3, username: 'copy_cat_2', score: 350, finishTime: '00:45:10', country: 'CN', flags: ['IP_MATCH'] },
  { rank: 4, username: 'legit_user', score: 340, finishTime: '00:48:22', country: 'IN', flags: [] },
  { rank: 5, username: 'pro_coder', score: 320, finishTime: '00:52:10', country: 'US', flags: [] },
  { rank: 6, username: 'suspicious_guy', score: 310, finishTime: '00:55:00', country: 'RU', flags: ['PLAGIARISM_DETECTED'] },
  { rank: 7, username: 'newbie_1', score: 200, finishTime: '01:10:00', country: 'IN', flags: [] },
];

const AdminLeaderboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getFlagLabel = (flag) => {
      switch(flag) {
          case 'IMPOSSIBLE_TIME': return { label: 'Impossible Time', color: 'text-red-600 bg-red-100 border-red-200' };
          case 'IP_MATCH': return { label: 'IP Match', color: 'text-orange-600 bg-orange-100 border-orange-200' };
          case 'PLAGIARISM_DETECTED': return { label: 'Plagiarism (99%)', color: 'text-purple-600 bg-purple-100 border-purple-200' };
          default: return { label: flag, color: 'text-gray-600 bg-gray-100' };
      }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Live Leaderboard Monitor</h2>
            <p className="text-sm text-gray-500">Read-only view • System flags enabled</p>
        </div>
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
                type="text" 
                placeholder="Search user..." 
                className="pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 text-xs uppercase font-semibold border-b border-gray-200 dark:border-gray-800">
                <tr>
                    <th className="p-4 w-16 text-center">Rank</th>
                    <th className="p-4">User</th>
                    <th className="p-4 text-center">Score</th>
                    <th className="p-4 text-center">Finish Time</th>
                    <th className="p-4">System Flags</th>
                    <th className="p-4 text-right">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                {MOCK_LEADERBOARD
                    .filter(u => u.username.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((entry) => (
                    <tr key={entry.rank} className={`hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${entry.flags.length > 0 ? 'bg-red-50/30' : ''}`}>
                        <td className="p-4 text-center font-bold text-gray-700 dark:text-gray-300">#{entry.rank}</td>
                        <td className="p-4">
                            <div className="flex items-center gap-2">
                                <div className="font-medium text-gray-900 dark:text-white">{entry.username}</div>
                                <span className="text-xs text-gray-400">({entry.country})</span>
                            </div>
                        </td>
                        <td className="p-4 text-center font-mono font-bold text-blue-600">{entry.score}</td>
                        <td className="p-4 text-center font-mono text-gray-600 dark:text-gray-400">{entry.finishTime}</td>
                        <td className="p-4">
                            <div className="flex flex-wrap gap-2">
                                {entry.flags.length > 0 ? entry.flags.map(flag => {
                                    const style = getFlagLabel(flag);
                                    return (
                                        <span key={flag} className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs border ${style.color}`}>
                                            <AlertTriangle size={12} />
                                            {style.label}
                                        </span>
                                    );
                                }) : <span className="text-gray-400 text-xs italic">Clean</span>}
                            </div>
                        </td>
                        <td className="p-4 text-right">
                            <div className="flex justify-end gap-2">
                                <button className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded" title="Inspect Code">
                                    <Eye size={16} />
                                </button>
                                <button className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded" title="Disqualify">
                                    <Ban size={16} />
                                </button>
                                <button className="p-1.5 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded" title="Flag manually">
                                    <Flag size={16} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLeaderboard;
