import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Trophy } from 'lucide-react';
import LeaderboardTable from '../components/specific/LeaderboardTable';
import Button from '../components/common/Button';

// Mock Data Generator
const generateMockLeaderboard = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    rank: i + 1,
    username: i === 5 ? 'testuser' : `coder_${Math.floor(Math.random() * 1000)}`, // Simulate logged in user at rank 6
    score: Math.floor(Math.random() * 50) * 10 + 50, // 50 to 550
    solvedCount: Math.floor(Math.random() * 4) + 1,
    totalProblems: 4,
    finishTime: `${Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 50).toString().padStart(2, '0')}:${Math.floor(Math.random() * 50).toString().padStart(2, '0')}`
  })).sort((a, b) => b.score - a.score);
};

const Leaderboard = () => {
  const { contestId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchData = () => {
    // Simulate API Fetch
    const newData = generateMockLeaderboard();
    setData(newData);
    setLastUpdated(new Date());
    setLoading(false);
  };

  // Initial Fetch & Polling
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
       {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-4">
            <Link to={`/contest/${contestId}`} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500">
                <ArrowLeft size={20} />
            </Link>
            <div>
                 <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Trophy className="text-yellow-500" /> Leaderboard
                </h1>
                <p className="text-gray-500 dark:text-gray-400">Weekly Contest #{contestId}</p>
            </div>
        </div>

        <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">
                Updated: {lastUpdated.toLocaleTimeString()}
            </span>
            <Button variant="outline" onClick={() => { setLoading(true); fetchData(); }} disabled={loading}>
                <RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Refresh
            </Button>
        </div>
      </div>

      {/* Table */}
      <LeaderboardTable data={data} />
    </div>
  );
};

export default Leaderboard;
