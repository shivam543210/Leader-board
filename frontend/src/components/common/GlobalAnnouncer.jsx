import React, { useState, useEffect } from 'react';
import { Megaphone, X } from 'lucide-react';

const GlobalAnnouncer = () => {
    const [announcement, setAnnouncement] = useState(null);

    useEffect(() => {
        // Simulating a system broadcast event
        const timer = setTimeout(() => {
            setAnnouncement({
                id: 'sys-1',
                message: "System Maintenance: The platform will undergo brief maintenance at 02:00 UTC.",
                type: 'warning'
            });
        }, 5000); // Show after 5 seconds

        return () => clearTimeout(timer);
    }, []);

    if (!announcement) return null;

    return (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top-4 fade-in duration-300 w-full max-w-lg px-4">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg shadow-xl p-4 flex items-start gap-3">
                <div className="bg-white/20 p-2 rounded-full shrink-0">
                    <Megaphone size={20} className="text-white" />
                </div>
                <div className="flex-1 pt-0.5">
                    <p className="font-bold text-sm mb-0.5">System Announcement</p>
                    <p className="text-sm text-amber-50 leading-tight">
                        {announcement.message}
                    </p>
                </div>
                <button 
                    onClick={() => setAnnouncement(null)}
                    className="text-white/70 hover:text-white transition-colors"
                >
                    <X size={18} />
                </button>
            </div>
        </div>
    );
};

export default GlobalAnnouncer;
