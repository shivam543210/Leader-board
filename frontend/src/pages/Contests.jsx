import React, { useState } from 'react';
import ContestCard from '../components/specific/ContestCard';
import { Search } from 'lucide-react';
import Input from '../components/common/Input';

const MOCK_CONTESTS = [
  {
    id: 1,
    title: "Weekly Contest 401",
    start_time: "2026-02-01T10:00:00Z",
    duration: 5400, // 90 mins
    status: "upcoming"
  },
  {
    id: 2,
    title: "Bi-Weekly Contest 120",
    start_time: "2026-01-28T14:00:00Z",
    duration: 5400, 
    status: "ongoing"
  },
  {
    id: 3,
    title: "Beginner Friendly Round #5",
    start_time: "2026-01-25T09:00:00Z",
    duration: 7200, 
    status: "ended"
  },
  {
      id: 4,
      title: "Advanced Algorithm Challenge",
      start_time: "2026-01-20T18:00:00Z",
      duration: 10800,
      status: "ended"
  },
  {
      id: 5,
      title: "Weekly Contest 402",
      start_time: "2026-02-08T10:00:00Z",
      duration: 5400,
      status: "upcoming"
  }
];

const Contests = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredContests = MOCK_CONTESTS.filter(contest => {
    const matchesFilter = filter === 'all' || contest.status === filter;
    const matchesSearch = contest.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
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
      </div>

      {/* Grid */}
      {filteredContests.length > 0 ? (
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
