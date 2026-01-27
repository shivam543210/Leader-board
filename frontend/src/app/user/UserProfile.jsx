import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { User, MapPin, Calendar, Award, Code, Trophy, Zap, Star, Shield } from 'lucide-react';
import GlassPanel from '../../components/ui/GlassPanel';
import ContestHistory from '../../components/dashboard/ContestHistory'; 

const MOCK_USER = {
    username: 'genericUser',
    name: 'Generic User',
    country: 'United States',
    joinDate: 'Jan 2025',
    rank: 1240,
    rating: 1650,
    solved: 145,
    skills: [ 'C++', 'Algorithms', 'DP' ]
};

const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate fetch
    setTimeout(() => {
        setUser({ ...MOCK_USER, username: username || 'User' });
    }, 500);
  }, [username]);

  if (!user) {
      return <div className="p-8 text-center">Loading profile...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <GlassPanel className="p-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                {user.username.charAt(0).toUpperCase()}
            </div>
            
            <div className="flex-1 text-center md:text-left space-y-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center md:justify-start gap-3">
                    {user.username}
                    <span className="text-sm px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full font-medium flex items-center gap-1">
                        <Trophy size={14} /> Rank #{user.rank}
                    </span>
                </h1>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-500 dark:text-gray-400 text-sm">
                    <span className="flex items-center gap-1"><MapPin size={14} /> {user.country}</span>
                    <span className="flex items-center gap-1"><Calendar size={14} /> Joined {user.joinDate}</span>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                    {user.skills.map(skill => (
                        <span key={skill} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex gap-8 text-center px-8 border-l border-gray-100 dark:border-gray-800">
                <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{user.rating}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Rating</div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{user.solved}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Solved</div>
                </div>
            </div>
        </div>
      </GlassPanel>



      {/* Feature 27: Gamification (Badges) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
            { name: 'Algorithm Master', icon: Zap, color: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30', desc: 'Solved 100+ Algo problems' },
            { name: 'Contest Veteran', icon: Shield, color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30', desc: 'Participated in 50 contests' },
            { name: 'Problem Solver', icon: Code, color: 'text-green-500 bg-green-100 dark:bg-green-900/30', desc: 'Daily streak of 30 days' },
            { name: 'Top Rated', icon: Star, color: 'text-purple-500 bg-purple-100 dark:bg-purple-900/30', desc: 'Reached 1600+ rating' },
        ].map((badge) => (
            <GlassPanel key={badge.name} className="p-4 flex items-center gap-4 hover:scale-105 transition-transform cursor-pointer">
                <div className={`p-3 rounded-full ${badge.color}`}>
                    <badge.icon size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">{badge.name}</h4>
                    <p className="text-xs text-gray-500">{badge.desc}</p>
                </div>
            </GlassPanel>
        ))}
      </div>

      {/* Recent Activity */}
      <ContestHistory />
    </div>
  );
};

export default UserProfile;
