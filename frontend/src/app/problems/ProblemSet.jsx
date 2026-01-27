import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Circle, PlayCircle } from 'lucide-react';
import GlassPanel from '../../components/ui/GlassPanel';

const MOCK_PROBLEMS = [
    { id: 101, title: "Two Sum", difficulty: "Easy", acceptance: "48%", status: "solved" },
    { id: 102, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", acceptance: "32%", status: "attempted" },
    { id: 103, title: "Median of Two Sorted Arrays", difficulty: "Hard", acceptance: "28%", status: "unsolved" },
    { id: 104, title: "Container With Most Water", difficulty: "Medium", acceptance: "54%", status: "unsolved" },
    { id: 105, title: "3Sum", difficulty: "Medium", acceptance: "31%", status: "unsolved" },
    { id: 106, title: "Valid Parentheses", difficulty: "Easy", acceptance: "62%", status: "solved" },
    { id: 107, title: "Merge K Sorted Lists", difficulty: "Hard", acceptance: "25%", status: "unsolved" },
];

const DifficultyBadge = ({ difficulty }) => {
    const colors = {
        Easy: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        Medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
        Hard: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[difficulty]}`}>
            {difficulty}
        </span>
    );
};

const StatusIcon = ({ status }) => {
    if (status === 'solved') return <CheckCircle size={18} className="text-green-500" />;
    if (status === 'attempted') return <PlayCircle size={18} className="text-yellow-500" />;
    return <Circle size={18} className="text-gray-300 dark:text-gray-700" />;
};

const ProblemSet = () => {
    const [filter, setFilter] = useState('all');

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Problem Set</h1>
                {/* Simplified Filter Mock */}
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 text-sm font-medium border border-gray-200 dark:border-gray-700">Tags</button>
                    <button className="px-3 py-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 text-sm font-medium border border-green-200 dark:border-green-800">Easy</button>
                    <button className="px-3 py-1.5 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 text-sm font-medium border border-yellow-200 dark:border-yellow-800">Medium</button>
                    <button className="px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 text-sm font-medium border border-red-200 dark:border-red-800">Hard</button>
                </div>
            </div>

            <GlassPanel className="overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50/50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 text-xs uppercase font-semibold">
                        <tr>
                            <th className="p-4 w-12 text-center">Status</th>
                            <th className="p-4">Title</th>
                            <th className="p-4 w-32">Acceptance</th>
                            <th className="p-4 w-32">Difficulty</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {MOCK_PROBLEMS.map((problem) => (
                            <tr key={problem.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <td className="p-4 text-center">
                                    <div className="flex justify-center"><StatusIcon status={problem.status} /></div>
                                </td>
                                <td className="p-4 font-medium">
                                    <Link to={`/contest/practice?problemId=${problem.id}`} className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                                        {problem.id}. {problem.title}
                                    </Link>
                                </td>
                                <td className="p-4 text-gray-500 dark:text-gray-400 text-sm">
                                    {problem.acceptance}
                                </td>
                                <td className="p-4">
                                    <DifficultyBadge difficulty={problem.difficulty} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </GlassPanel>
        </div>
    );
};

export default ProblemSet;
