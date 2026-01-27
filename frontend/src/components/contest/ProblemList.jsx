import React from 'react';
import { CheckCircle, Circle, Lock, Clock, Filter, X } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';



const ProblemList = ({ problems, activeProblemId, onSelectProblem }) => {
  const [filterDifficulty, setFilterDifficulty] = React.useState('All');
  const [showFilters, setShowFilters] = React.useState(false);

  // Mock tags generator if not present
  const getProblemTags = (id) => {
    const tags = ['Array', 'DP', 'Graph', 'String', 'Tree', 'Greedy'];
    // Deterministic tag based on id
    const seed = String(id).charCodeAt(0); 
    return [tags[seed % tags.length], tags[(seed + 1) % tags.length]];
  };

  const filteredProblems = problems.filter(p => {
    if (filterDifficulty !== 'All' && p.difficulty !== filterDifficulty) return false;
    return true;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-600 dark:text-green-500 bg-green-100 dark:bg-green-900/30';
      case 'medium': return 'text-yellow-600 dark:text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30';
      case 'hard': return 'text-red-600 dark:text-red-500 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800';
    }
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-gray-900 dark:text-white">Problem List</h3>
            <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`p-1.5 rounded-lg transition-colors ${showFilters ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500'}`}
            >
                <Filter size={16} />
            </button>
        </div>
        
        {/* Filter Bar */}
        {showFilters && (
            <div className="flex gap-2 animate-in fade-in slide-in-from-top-1">
                {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
                    <button
                        key={diff}
                        onClick={() => setFilterDifficulty(diff)}
                        className={`text-xs px-2 py-1 rounded-md transition-colors ${
                            filterDifficulty === diff 
                                ? 'bg-gray-800 text-white dark:bg-white dark:text-gray-900' 
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                        }`}
                    >
                        {diff}
                    </button>
                ))}
            </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredProblems.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
                <p>No problems found.</p>
                <button onClick={() => setFilterDifficulty('All')} className="text-blue-500 text-sm mt-2 hover:underline">Clear filters</button>
            </div>
        ) : (
            filteredProblems.map((problem, index) => {
            const isActive = activeProblemId === problem.id;
            const tags = problem.tags || getProblemTags(problem.id); // Use real or mock tags

            return (
                <button
                key={problem.id}
                onClick={() => onSelectProblem(problem.id)}
                className={twMerge(
                    "w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-l-4 group",
                    isActive 
                    ? "bg-blue-50 dark:bg-blue-900/20 border-blue-600 dark:border-blue-500" 
                    : "border-transparent"
                )}
                >
                <div className="flex items-start justify-between mb-1">
                    <span className={clsx("font-medium transition-colors", isActive ? "text-blue-700 dark:text-blue-400" : "text-gray-900 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400")}>
                    {index + 1}. {problem.title}
                    </span>
                    {problem.status === 'solved' && <CheckCircle size={16} className="text-green-500 mt-1 shrink-0" />}
                    {problem.status === 'attempted' && <Clock size={16} className="text-amber-500 mt-1 shrink-0" />}
                    {problem.status === 'locked' && <Lock size={16} className="text-gray-400 mt-1 shrink-0" />}
                    {!problem.status && <Circle size={16} className="text-gray-300 dark:text-gray-600 mt-1 shrink-0" />}
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                    </span>
                    {/* Tags Display */}
                    {tags.map(tag => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded border border-gray-200 dark:border-gray-700">
                            {tag}
                        </span>
                    ))}
                </div>
                </button>
            );
            })
        )}
      </div>
    </div>
  );
};

export default ProblemList;
