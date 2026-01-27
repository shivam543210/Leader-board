import React from 'react';
import { CheckCircle, Circle, Lock, Clock } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const ProblemList = ({ problems, activeProblemId, onSelectProblem }) => {
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
        <h3 className="font-bold text-gray-900 dark:text-white">Problem List</h3>
      </div>
      <div className="flex-1 overflow-y-auto">
        {problems.map((problem, index) => {
          const isActive = activeProblemId === problem.id;
          return (
            <button
              key={problem.id}
              onClick={() => onSelectProblem(problem.id)}
              className={twMerge(
                "w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border-l-4",
                isActive 
                  ? "bg-blue-50 dark:bg-blue-900/20 border-blue-600 dark:border-blue-500" 
                  : "border-transparent"
              )}
            >
              <div className="flex items-start justify-between mb-1">
                <span className={clsx("font-medium", isActive ? "text-blue-700 dark:text-blue-400" : "text-gray-900 dark:text-gray-200")}>
                  {index + 1}. {problem.title}
                </span>
                {problem.status === 'solved' && <CheckCircle size={16} className="text-green-500 mt-1 shrink-0" />}
                {problem.status === 'attempted' && <Clock size={16} className="text-amber-500 mt-1 shrink-0" />}
                {problem.status === 'locked' && <Lock size={16} className="text-gray-400 mt-1 shrink-0" />}
                {!problem.status && <Circle size={16} className="text-gray-300 dark:text-gray-600 mt-1 shrink-0" />}
              </div>
              <div className="flex items-center gap-2">
                 <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getDifficultyColor(problem.difficulty)}`}>
                    {problem.difficulty}
                 </span>
                 <span className="text-xs text-gray-500 dark:text-gray-400">
                    {problem.points} points
                 </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProblemList;
