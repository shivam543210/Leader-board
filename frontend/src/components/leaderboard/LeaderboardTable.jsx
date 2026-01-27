import React from 'react';
import { Trophy, Medal, User } from 'lucide-react';
import { clsx } from 'clsx';
import { useAuth } from '../../context/AuthContext';

const LeaderboardTable = ({ data }) => {
  const { user } = useAuth();

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return <Trophy size={20} className="text-yellow-500" />;
      case 2: return <Medal size={20} className="text-gray-400" />;
      case 3: return <Medal size={20} className="text-orange-500" />;
      default: return <span className="font-mono font-bold text-gray-500 w-5 text-center">{rank}</span>;
    }
  };

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 text-sm uppercase tracking-wider">
            <th className="p-4 w-16 text-center">Rank</th>
            <th className="p-4">User</th>
            <th className="p-4 text-center">Score</th>
            <th className="p-4 text-center">Finished</th>
            {/* Dynamic Problem Columns could go here */}
            <th className="p-4 text-right">Time</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {data.map((entry) => {
             const isCurrentUser = user?.username === entry.username;
             return (
              <tr 
                key={entry.rank} 
                className={clsx(
                    "hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors",
                    isCurrentUser && "bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500"
                )}
              >
                <td className="p-4 text-center flex justify-center items-center h-full">
                    {getRankIcon(entry.rank)}
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300">
                        {entry.username[0].toUpperCase()}
                    </div>
                    <span className={clsx("font-medium", isCurrentUser ? "text-blue-700 dark:text-blue-400" : "text-gray-900 dark:text-gray-100")}>
                        {entry.username} {isCurrentUser && "(You)"}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-center font-bold text-gray-900 dark:text-white">
                    {entry.score}
                </td>
                <td className="p-4 text-center text-gray-600 dark:text-gray-400">
                    {entry.solvedCount} / {entry.totalProblems}
                </td>
                <td className="p-4 text-right font-mono text-gray-500 dark:text-gray-400">
                    {entry.finishTime}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardTable;
