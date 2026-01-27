import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, Trophy, ChevronRight, PlayCircle, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';
import useContest from '../../hooks/useContest';

const ContestCard = ({ contest }) => {
  const { title, start_time, duration, status, id } = contest;
  const { registerForContest, isRegistered } = useContest();
  const registered = isRegistered(id);
  const [registering, setRegistering] = React.useState(false);

  const handleRegister = async () => {
    setRegistering(true);
    await registerForContest(id);
    setRegistering(false);
  };

  const formattedTime = useMemo(() => {
    return new Date(start_time).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }, [start_time]);

  const statusColors = {
    upcoming: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500',
    ongoing: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500',
    ended: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
  };

  const statusLabel = {
    upcoming: 'Upcoming',
    ongoing: 'Live Now',
    ended: 'Ended'
  };

  return (
    <div className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Status Badge */}
      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${statusColors[status] || statusColors.ended}`}>
        {statusLabel[status] || status}
      </div>

      <div className="flex flex-col h-full justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors">
            {title}
          </h3>
          
          <div className="space-y-2 mt-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-blue-500" />
              <span>{formattedTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-blue-500" />
              <span>{Math.floor(duration / 60)} mins</span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {status === 'ended' ? (
             <React.Fragment>
                <Link to={`/contest/${contest.id}?mode=virtual`}>
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2 border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                        <PlayCircle size={16} /> Virtual Contest
                    </Button>
                </Link>
                <Link to={`/contest/${contest.id}/leaderboard`} className="text-center text-xs text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 underline decoration-dotted">
                    View Leaderboard
                </Link>
             </React.Fragment>
          ) : (
            <Button 
                variant={status === 'upcoming' ? (registered ? 'outline' : 'secondary') : 'primary'} 
                className={`w-full flex items-center justify-center gap-2 ${registered ? 'border-green-200 text-green-600 bg-green-50' : ''}`}
                disabled={status === 'upcoming' && registered}
                onClick={status === 'upcoming' && !registered ? handleRegister : undefined}
                isLoading={registering}
            >
            {status === 'upcoming' ? (
                registered ? (
                    <>
                    <CheckCircle size={16} /> Registered
                    </>
                ) : (
                    <>
                    Register <ChevronRight size={16} />
                    </>
                )
            ) : (
                <Link to={`/contest/${contest.id}`} className="flex items-center gap-2 w-full justify-center">
                Join Contest <Trophy size={16} />
                </Link>
            )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContestCard;
