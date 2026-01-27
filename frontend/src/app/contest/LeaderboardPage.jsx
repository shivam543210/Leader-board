import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, RefreshCw, Trophy } from 'lucide-react';
import LeaderboardTable from '../../components/leaderboard/LeaderboardTable';
import Button from '../../components/ui/Button';
import useLeaderboard from '../../hooks/useLeaderboard';
import GlassPanel from '../../components/ui/GlassPanel';

const LeaderboardPage = () => {
  const { contestId } = useParams();
  const { leaderboard, loading, refresh } = useLeaderboard(contestId);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const handleRefresh = async () => {
    await refresh();
    setLastUpdated(new Date());
  };

  return (
    <div className="space-y-6">
       {/* Header */}
      <GlassPanel className="flex flex-col md:flex-row gap-4 justify-between items-center p-6">
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
                Auto-update active
            </span>
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
                <RefreshCw size={16} className={loading ? "animate-spin mr-2" : "mr-2"} /> Refresh
            </Button>
        </div>
      </GlassPanel>

      {/* Table */}
      <LeaderboardTable leaderboard={leaderboard} loading={loading} />
    </div>
  );
};

export default LeaderboardPage;
