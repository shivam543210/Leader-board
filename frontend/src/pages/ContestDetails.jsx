import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import ProblemList from '../components/specific/ProblemList';
import ProblemView from '../components/specific/ProblemView';

const MOCK_PROBLEMS = [
  {
    id: 101,
    title: "Two Sum",
    difficulty: "Easy",
    points: 2,
    status: "solved",
    timeLimit: "1s",
    memoryLimit: "256MB",
    description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
    inputFormat: "First line contains an integer T. Each test case consists of two lines. First line contains N (size of array). Second line contains N integers.",
    outputFormat: "For each test case, print the indices of the two numbers.",
    examples: [
        { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
        { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
    ]
  },
  {
    id: 102,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    points: 4,
    status: "unsolved",
    timeLimit: "2s",
    memoryLimit: "512MB",
    description: "Given a string `s`, find the length of the longest substring without repeating characters.",
    inputFormat: "A single string s.",
    outputFormat: "An integer representing the length.",
    examples: [
        { input: "s = \"abcabcbb\"", output: "3" },
        { input: "s = \"bbbbb\"", output: "1" }
    ]
  },
  {
    id: 103,
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    points: 7,
    status: "unsolved",
    timeLimit: "3s",
    memoryLimit: "512MB",
    description: "Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays.",
    inputFormat: "Two lines containing the sorted arrays.",
    outputFormat: "A float value representing the median.",
    examples: [
        { input: "nums1 = [1,3], nums2 = [2]", output: "2.00000" }
    ]
  },
   {
    id: 104,
    title: "Container With Most Water",
    difficulty: "Medium",
    points: 5,
    status: "unsolved",
    timeLimit: "1s",
    memoryLimit: "256MB",
    description: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).",
    inputFormat: "An array of integers height.",
    outputFormat: "The maximum amount of water a container can store.",
    examples: [
        { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" }
    ]
  },
];

const ContestDetails = () => {
  const { contestId } = useParams();
  const [activeProblemId, setActiveProblemId] = useState(MOCK_PROBLEMS[0].id);
  const [timeLeft, setTimeLeft] = useState(5400); // 90 minutes in seconds

  const activeProblem = MOCK_PROBLEMS.find(p => p.id === activeProblemId);

  // Mock Timer
  useEffect(() => {
    const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] -my-4 -mx-4 sm:mx-0 sm:my-0">
      {/* Contest Header Bar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-4">
            <Link to="/contests" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500">
                <ArrowLeft size={20} />
            </Link>
            <h2 className="font-bold text-gray-900 dark:text-white truncate max-w-[200px] sm:max-w-md">
                Weekly Contest #{contestId}
            </h2>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg font-mono text-lg font-medium text-gray-900 dark:text-gray-100">
                <Clock size={18} className="text-gray-500" />
                {formatTime(timeLeft)}
            </div>
             <Link to={`/contest/${contestId}/leaderboard`} className="hidden sm:block text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                Live Leaderboard
            </Link>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Problem List (Responsive: hidden on mobile if problem viewed?) -> For now usually stacked or collapsible. 
            Let's keep specific mobile behavior simple: Side-by-side on desktop, Stacked on mobile but scrollable? 
            Actually, commonly mobile views show list, then click to view detail. 
            For desktop first requirement: Split pane.
        */}
        <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 dark:border-gray-800 hidden md:block">
            <ProblemList 
                problems={MOCK_PROBLEMS} 
                activeProblemId={activeProblemId} 
                onSelectProblem={setActiveProblemId} 
            />
        </div>

        {/* Right: Problem View */}
        <div className="flex-1 min-w-0 bg-gray-50 dark:bg-black/20">
            <ProblemView problem={activeProblem} />
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;
