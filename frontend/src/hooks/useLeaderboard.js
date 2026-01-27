import { useState, useEffect, useCallback } from 'react';

const MOCK_LEADERBOARD_DATA = Array.from({ length: 50 }, (_, i) => ({
  rank: i + 1,
  username: `user_${i + 1}`,
  score: Math.floor(Math.random() * 50) * 10,
  finish_time: '1:30:45',
  country: ['USA', 'IND', 'CHN', 'JPN', 'UK'][Math.floor(Math.random() * 5)]
}));

const useLeaderboard = (contestId) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetchLeaderboard = useCallback(async () => {
    // Simulate API delay
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate ranking changes
    const data = MOCK_LEADERBOARD_DATA.map(u => ({
        ...u,
        score: u.score + (Math.random() > 0.8 ? 10 : 0) // Randomly increase score
    })).sort((a, b) => b.score - a.score).map((u, i) => ({ ...u, rank: i + 1 }));

    setLeaderboard(data);
    setLoading(false);
  }, [contestId]);

  useEffect(() => {
    fetchLeaderboard();
    
    // Poll every 10 seconds
    const interval = setInterval(fetchLeaderboard, 10000);
    return () => clearInterval(interval);
  }, [fetchLeaderboard]);

  return { leaderboard, loading, refresh: fetchLeaderboard };
};

export default useLeaderboard;
