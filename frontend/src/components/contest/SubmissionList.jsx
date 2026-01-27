import React from 'react';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';

const MOCK_SUBMISSIONS = [
  { id: 1, status: 'Accepted', language: 'C++', runtime: '12 ms', memory: '4.5 MB', time: '2 mins ago' },
  { id: 2, status: 'Wrong Answer', language: 'C++', runtime: 'N/A', memory: 'N/A', time: '15 mins ago' },
  { id: 3, status: 'Time Limit Exceeded', language: 'Python3', runtime: '> 2000 ms', memory: '12 MB', time: '1 hour ago' },
  { id: 4, status: 'Accepted', language: 'Python3', runtime: '45 ms', memory: '10 MB', time: '2 hours ago' },
  { id: 5, status: 'Compilation Error', language: 'C++', runtime: 'N/A', memory: 'N/A', time: '1 day ago' },
];

const StatusBadge = ({ status }) => {
  switch (status) {
    case 'Accepted':
      return <span className="flex items-center gap-1.5 text-green-600 dark:text-green-500 font-medium whitespace-nowrap"><CheckCircle size={14} /> Accepted</span>;
    case 'Wrong Answer':
      return <span className="flex items-center gap-1.5 text-red-600 dark:text-red-500 font-medium whitespace-nowrap"><XCircle size={14} /> Wrong Answer</span>;
    case 'Time Limit Exceeded':
      return <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-500 font-medium whitespace-nowrap"><Clock size={14} /> TLE</span>;
    case 'Compilation Error':
      return <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-500 font-medium whitespace-nowrap"><AlertCircle size={14} /> Compile Error</span>;
    default:
      return <span className="text-gray-500">{status}</span>;
  }
};

const SubmissionList = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-lg">
        <table className="w-full text-left border-collapse text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 font-semibold border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th className="p-3 w-32">Verdict</th>
              <th className="p-3">Language</th>
              <th className="p-3">Runtime</th>
              <th className="p-3">Memory</th>
              <th className="p-3 text-right">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {MOCK_SUBMISSIONS.map((sub) => (
              <tr 
                key={sub.id} 
                className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors cursor-pointer"
              >
                <td className="p-3">
                  <StatusBadge status={sub.status} />
                </td>
                <td className="p-3 font-mono text-gray-700 dark:text-gray-300">
                  <span className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs">
                    {sub.language}
                  </span>
                </td>
                <td className="p-3 text-gray-600 dark:text-gray-400 font-mono text-xs">{sub.runtime}</td>
                <td className="p-3 text-gray-600 dark:text-gray-400 font-mono text-xs">{sub.memory}</td>
                <td className="p-3 text-right text-gray-500 dark:text-gray-400 text-xs">{sub.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Empty State / Pagination Hint using standard tailwind classes */}
      <div className="mt-4 text-center text-xs text-gray-400">
        Showing recent submissions
      </div>
    </div>
  );
};

export default SubmissionList;
