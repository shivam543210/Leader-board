import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Medal } from 'lucide-react';
import GlassPanel from '../ui/GlassPanel';

const LeaderboardTable = ({ leaderboard = [], loading }) => {
  const { user } = useAuth();

  if (loading && (!leaderboard || leaderboard.length === 0)) {
    return (
      <GlassPanel className="overflow-hidden">
        <div className="p-4 space-y-4">
          {[...Array(5)].map((_, i) => (
             <div key={i} className="h-12 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
          ))}
        </div>
      </GlassPanel>
    );
  }

  return (
    <GlassPanel className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 text-xs uppercase font-semibold">
            <tr>
              <th className="p-4 w-16 text-center">Rank</th>
              <th className="p-4">User</th>
              <th className="p-4 text-center">Score</th>
              <th className="p-4 text-right">Finish Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {leaderboard && leaderboard.map((entry) => {
              const safeUsername = entry.username || 'Anonymous';
              const isCurrentUser = user && safeUsername === user.username;
              return (
                <tr 
                  key={entry.rank} 
                  className={`
                    transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-gray-800/50
                    ${isCurrentUser ? 'bg-blue-50/50 dark:bg-blue-900/10 border-l-4 border-blue-500' : ''}
                  `}
                >
                  <td className="p-4 text-center font-bold text-gray-700 dark:text-gray-300">
                    {entry.rank === 1 && <Medal size={20} className="text-yellow-500 mx-auto" />}
                    {entry.rank === 2 && <Medal size={20} className="text-gray-400 mx-auto" />}
                    {entry.rank === 3 && <Medal size={20} className="text-amber-600 mx-auto" />}
                    {entry.rank > 3 && `#${entry.rank}`}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300">
                        {safeUsername.charAt(0).toUpperCase()}
                      </div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {safeUsername}
                        {isCurrentUser && <span className="ml-2 text-xs text-blue-500 bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">You</span>}
                      </div>
                      <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                        {entry.country || 'N/A'}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-center font-mono font-bold text-blue-600 dark:text-blue-400">
                    {entry.score}
                  </td>
                  <td className="p-4 text-right text-sm text-gray-500 dark:text-gray-400 font-mono">
                    {entry.finish_time}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </GlassPanel>
  );
};

export default LeaderboardTable;
