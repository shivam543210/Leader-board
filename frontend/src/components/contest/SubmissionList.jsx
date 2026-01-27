import React from 'react';
import { CheckCircle, XCircle, Clock, AlertCircle, GitCompare } from 'lucide-react';

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
  const [showDiff, setShowDiff] = React.useState(null);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 relative">
      <div className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-lg">
        <table className="w-full text-left border-collapse text-sm">
          <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 font-semibold border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th className="p-3 w-32">Verdict</th>
              <th className="p-3">Language</th>
              <th className="p-3">Runtime</th>
              <th className="p-3">Memory</th>
              <th className="p-3 text-right">Time</th>
              <th className="p-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {MOCK_SUBMISSIONS.map((sub) => (
              <tr 
                key={sub.id} 
                className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
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
                <td className="p-3">
                    <button 
                        onClick={() => setShowDiff(sub.id)}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-400 hover:text-blue-500 transition-colors"
                        title="Compare with Solution"
                    >
                        <GitCompare size={16} />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Feature 29: Code Diff Viewer (Mock Modal) */}
      {showDiff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={() => setShowDiff(null)}>
            <div className="bg-white dark:bg-gray-900 w-full max-w-4xl rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                    <h3 className="font-bold flex items-center gap-2"><GitCompare size={18} /> Diff Viewer</h3>
                    <button onClick={() => setShowDiff(null)} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>
                <div className="grid grid-cols-2 h-[400px] text-xs font-mono">
                    <div className="border-r border-gray-200 dark:border-gray-800 flex flex-col">
                        <div className="p-2 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 font-semibold border-b border-gray-200 dark:border-gray-800">Your Submission</div>
                        <div className="p-4 overflow-auto bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200 whitespace-pre">
{`function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
-    for (let j = 0; j < nums.length; j++) {
-      if (i !== j && nums[i] + nums[j] === target) {
-        return [i, j];
-      }
-    }
  }
}`}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="p-2 bg-green-50 dark:bg-green-900/10 text-green-600 dark:text-green-400 font-semibold border-b border-gray-200 dark:border-gray-800">Model Solution</div>
                        <div className="p-4 overflow-auto bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200 whitespace-pre">
{`function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
+    const complement = target - nums[i];
+    if (map.has(complement)) {
+        return [map.get(complement), i];
+    }
+    map.set(nums[i], i);
  }
}`}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Empty State / Pagination Hint using standard tailwind classes */}
      <div className="mt-4 text-center text-xs text-gray-400">
        Showing recent submissions
      </div>
    </div>
  );
};

export default SubmissionList;
