import React from 'react';
import Button from '../ui/Button';
import { Upload } from 'lucide-react';

const ProblemView = ({ problem }) => {
  const [activeTab, setActiveTab] = React.useState('description');

  if (!problem) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900">
        Select a problem to view details
      </div>
    );
  }

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'submissions', label: 'Submissions' },
    { id: 'discussion', label: 'Discussion' }
  ];

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
       {/* Tab Header */}
       <div className="flex border-b border-gray-200 dark:border-gray-800 px-4">
          {tabs.map(tab => (
            <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                 activeTab === tab.id 
                   ? 'border-blue-600 text-blue-600 dark:text-blue-400' 
                   : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
               }`}
            >
              {tab.label}
            </button>
          ))}
       </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'description' && (
            <div className="animate-in fade-in duration-200">
                 {/* Problem Header */}
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

                <div className="prose dark:prose-invert max-w-none mb-8">
                    <div className="text-gray-600 dark:text-gray-300 whitespace-pre-line mb-8 text-base leading-relaxed">
                        {problem.description}
                    </div>

                    <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">Input Format</h3>
                    <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-sm font-mono text-gray-700 dark:text-gray-300 mb-6 border border-gray-200 dark:border-gray-700">
                        {problem.inputFormat}
                    </pre>

                    <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">Output Format</h3>
                    <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-sm font-mono text-gray-700 dark:text-gray-300 mb-6 border border-gray-200 dark:border-gray-700">
                        {problem.outputFormat}
                    </pre>

                    {/* Examples */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Examples</h3>
                        {problem.examples?.map((ex, i) => (
                            <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50/50 dark:bg-gray-800/30">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <div className="text-xs font-bold text-gray-500 uppercase mb-2">Input</div>
                                        <pre className="bg-white dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700 text-sm font-mono">{ex.input}</pre>
                                    </div>
                                    <div>
                                        <div className="text-xs font-bold text-gray-500 uppercase mb-2">Output</div>
                                        <pre className="bg-white dark:bg-gray-900 p-3 rounded border border-gray-200 dark:border-gray-700 text-sm font-mono">{ex.output}</pre>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Footer */}
                <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800">
                    <Button variant="primary" className="flex items-center gap-2">
                        <Upload size={18} /> Submit Solution
                    </Button>
                </div>
            </div>
        )}
        
        {activeTab === 'submissions' && (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <p>No submissions yet.</p>
            </div>
        )}

        {activeTab === 'discussion' && (
             <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                <p>Discussion board coming soon.</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default ProblemView;
