import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash, Calendar, Users, Eye } from 'lucide-react';
import Button from '../../components/ui/Button';

// Mock Data
const MOCK_ADMIN_CONTESTS = [
  { id: 1, title: 'Weekly Contest 401', start: '2026-02-01 10:00', status: 'upcoming', participants: 1205 },
  { id: 2, title: 'Bi-Weekly Contest 120', start: '2026-01-28 14:00', status: 'ongoing', participants: 3402 },
  { id: 3, title: 'Beginner Friendly Round #5', start: '2026-01-25 09:00', status: 'ended', participants: 854 },
];

const AdminContests = () => {
  const [contests, setContests] = useState(MOCK_ADMIN_CONTESTS);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this contest?')) {
      setContests(contests.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Contests</h1>
          <p className="text-gray-500 dark:text-gray-400">Create and edit contests</p>
        </div>
        <Link to="/admin/create-contest">
          <Button className="flex items-center gap-2">
            <Plus size={18} /> Create New Contest
          </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 text-sm uppercase">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Start Time</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Participants</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {contests.map((contest) => (
              <tr key={contest.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="p-4 font-medium text-gray-900 dark:text-white">{contest.title}</td>
                <td className="p-4 text-gray-500 flex items-center gap-2">
                  <Calendar size={14} /> {contest.start}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase
                    ${contest.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500' : ''}
                    ${contest.status === 'ongoing' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500' : ''}
                    ${contest.status === 'ended' ? 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400' : ''}
                  `}>
                    {contest.status}
                  </span>
                </td>
                <td className="p-4 text-center text-gray-600 dark:text-gray-400">
                  <div className="flex items-center justify-center gap-1">
                     <Users size={14} /> {contest.participants}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg">
                      <Eye size={18} />
                    </button>
                    <Link to={`/admin/contests/${contest.id}/analytics`} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg" title="Analytics">
                      <TrendingUp size={18} />
                    </Link>
                    <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(contest.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                      <Trash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminContests;
