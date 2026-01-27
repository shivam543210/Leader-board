import React from 'react';
import Button from '../ui/Button';
import { Upload, Lock, FileText, AlertTriangle } from 'lucide-react';
import SubmissionList from './SubmissionList';

const EditorialLockedState = () => (
    <div className="flex flex-col items-center justify-center h-64 text-center p-8 animate-in fade-in zoom-in-95 duration-300">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
            <Lock size={32} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Editorial Locked</h3>
        <p className="text-gray-500 max-w-sm">
            The solution will be available once the contest has ended. Keep trying!
        </p>
    </div>
);

const EditorialContent = ({ content }) => (
    <div className="prose dark:prose-invert max-w-none animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-start gap-3 mb-6 border border-blue-100 dark:border-blue-800/50">
            <AlertTriangle className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" size={20} />
            <div className="text-sm text-blue-800 dark:text-blue-200">
                <p className="font-semibold mb-1">Approach Hint</p>
                <p>Try using Dynamic Programming with a sliding window optimization.</p>
            </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Solution Approach</h3>
        <div className="text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">
            {content || "Detailed solution explanation will appear here..."}
        </div>
    </div>
);

const ProblemView = ({ problem, contestStatus = 'active' }) => {
  const [activeTab, setActiveTab] = React.useState('description');

  if (!problem) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-900">
        Select a problem to view details
      </div>
    );
  }

  const tabs = [
    { id: 'description', label: 'Description', icon: null },
    { id: 'submissions', label: 'Submissions', icon: null },
    { id: 'editorial', label: 'Editorial', icon: Lock }, // Icon only if locked? or always?
    { id: 'discussion', label: 'Discussion', icon: null }
  ];

  const handleSubmit = () => {
    alert("Submitting solution... (Mock)");
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        handleSubmit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
       {/* Tab Header */}
       <div className="flex border-b border-gray-200 dark:border-gray-800 px-4">
          {tabs.map(tab => (
            <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                 activeTab === tab.id 
                   ? 'border-blue-600 text-blue-600 dark:text-blue-400' 
                   : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
               }`}
            >
              {tab.id === 'editorial' && contestStatus === 'active' && <Lock size={14} className="mb-0.5" />}
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
                    <Button variant="primary" className="flex items-center gap-2" onClick={handleSubmit}>
                        <Upload size={18} /> Submit Solution
                    </Button>
                </div>
            </div>
        )}
        
        {activeTab === 'submissions' && (
            <SubmissionList />
        )}
        
        {activeTab === 'editorial' && (
             contestStatus === 'active' 
                ? <EditorialLockedState />
                : <EditorialContent content={problem.editorial} />
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
