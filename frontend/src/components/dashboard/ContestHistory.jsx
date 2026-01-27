import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassPanel from '../ui/GlassPanel';

const MOCK_HISTORY = [
    { id: 105, name: 'Weekly Contest #105', rank: 45, score: 18, ratingChange: 25, date: '2 days ago' },
    { id: 104, name: 'Weekly Contest #104', rank: 120, score: 12, ratingChange: -15, date: '1 week ago' },
    { id: 103, name: 'Bi-Weekly Contest #32', rank: 12, score: 20, ratingChange: 55, date: '2 weeks ago' },
    { id: 102, name: 'Weekly Contest #102', rank: 250, score: 7, ratingChange: 5, date: '3 weeks ago' },
    { id: 101, name: 'Weekly Contest #101', rank: 500, score: 0, ratingChange: 0, date: '1 month ago' },
];

const ContestHistory = () => {
    return (
        <GlassPanel className="p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Contest History</h3>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-100 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
                            <th className="py-3 px-2 font-medium">Contest</th>
                            <th className="py-3 px-2 font-medium">Rank</th>
                            <th className="py-3 px-2 font-medium">Score</th>
                            <th className="py-3 px-2 font-medium">Rating Change</th>
                            <th className="py-3 px-2 font-medium text-right">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {MOCK_HISTORY.map((contest) => (
                            <tr key={contest.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <td className="py-4 px-2">
                                    <Link to={`/contest/${contest.id}`} className="font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        {contest.name}
                                    </Link>
                                </td>
                                <td className="py-4 px-2 text-gray-700 dark:text-gray-300">
                                    #{contest.rank}
                                </td>
                                <td className="py-4 px-2 text-gray-700 dark:text-gray-300">
                                    {contest.score} pts
                                </td>
                                <td className="py-4 px-2">
                                    <div className={`flex items-center gap-1 font-medium ${
                                        contest.ratingChange > 0 
                                            ? 'text-green-600 dark:text-green-500' 
                                            : contest.ratingChange < 0 
                                                ? 'text-red-600 dark:text-red-500' 
                                                : 'text-gray-500'
                                    }`}>
                                        {contest.ratingChange > 0 ? (
                                            <TrendingUp size={14} />
                                        ) : contest.ratingChange < 0 ? (
                                            <TrendingDown size={14} />
                                        ) : (
                                            <Minus size={14} />
                                        )}
                                        {contest.ratingChange > 0 ? '+' : ''}{contest.ratingChange}
                                    </div>
                                </td>
                                <td className="py-4 px-2 text-right text-sm text-gray-500">
                                    {contest.date}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </GlassPanel>
    );
};

export default ContestHistory;
