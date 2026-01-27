import React, { useState, useEffect } from 'react';
import ContestCard from '../../components/contest/ContestCard';
import { Search, Loader2 } from 'lucide-react';
import Input from '../../components/ui/Input';
import GlassPanel from '../../components/ui/GlassPanel';
import useContest from '../../hooks/useContest';

const Contests = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const { contests, loading, error, fetchContests } = useContest();

  useEffect(() => {
    fetchContests(filter);
  }, [fetchContests, filter]);

  const filteredContests = contests.filter(contest => {
    // Client-side search (API could handle this in future)
    const matchesSearch = contest.title.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <GlassPanel className="flex flex-col md:flex-row gap-6 justify-between items-center p-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contests</h1>
          <p className="text-gray-500 dark:text-gray-400">Join upcoming contests and compete with others</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Tabs */}
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg self-start">
             {['all', 'upcoming', 'ongoing', 'ended'].map((tab) => (
               <button
                 key={tab}
                 onClick={() => setFilter(tab)}
                 className={`px-4 py-2 rounded-md text-sm font-medium transition-all capitalize ${
                   filter === tab 
                     ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm' 
                     : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                 }`}
               >
                 {tab}
               </button>
             ))}
          </div>

          {/* Search */}
          <div className="w-full md:w-64">
            <Input 
                placeholder="Search contests..." 
                icon={Search} 
                className="bg-gray-50 dark:bg-gray-800 border-transparent focus:bg-white dark:focus:bg-gray-900"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </GlassPanel>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
      ) : filteredContests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContests.map(contest => (
              <ContestCard key={contest.id} contest={contest} />
            ))}
          </div>
      ) : (
          <div className="text-center py-20">
              <div className="bg-gray-100 dark:bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <Search size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">No contests found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
          </div>
      )}
    </div>
  );
};

export default Contests;
