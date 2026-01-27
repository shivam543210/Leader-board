import React from 'react';
import Button from '../common/Button';
import { Upload } from 'lucide-react';

const ProblemView = ({ problem }) => {
  if (!problem) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900">
        Select a problem to view details
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-white dark:bg-gray-900 p-6">
      {/* Header */}
      <div className="mb-6 border-b border-gray-100 dark:border-gray-800 pb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-3">
          {problem.title}
          <span className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full font-medium">
            {problem.difficulty}
          </span>
        </h1>
        <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
          <span>Time Limit: {problem.timeLimit}</span>
          <span>Memory Limit: {problem.memoryLimit}</span>
        </div>
      </div>

      {/* Description */}
      <div className="prose dark:prose-invert max-w-none mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line mb-6">
          {problem.description}
        </p>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Input Format</h3>
        <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-sm font-mono text-gray-700 dark:text-gray-300 mb-6">
          {problem.inputFormat}
        </pre>

        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Output Format</h3>
        <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-sm font-mono text-gray-700 dark:text-gray-300 mb-6">
          {problem.outputFormat}
        </pre>

        {/* Examples */}
        <div className="space-y-4">
             <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Examples</h3>
             {problem.examples?.map((ex, i) => (
                 <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                         <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Input</div>
                         <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-sm font-mono">{ex.input}</pre>
                     </div>
                     <div>
                         <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Output</div>
                         <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-sm font-mono">{ex.output}</pre>
                     </div>
                 </div>
             ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
        <Button variant="primary" className="flex items-center gap-2">
            <Upload size={18} /> Submit Solution
        </Button>
      </div>
    </div>
  );
};

export default ProblemView;
