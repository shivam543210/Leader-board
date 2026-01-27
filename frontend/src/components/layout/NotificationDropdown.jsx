import React, { useState } from 'react';
import { Bell, Check, Info, AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';

// Mock Notifications
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: 'success',
    title: 'Registration Successful',
    message: 'You have successfully registered for Weekly Contest 401.',
    time: '2 mins ago',
    read: false,
  },
  {
    id: 2,
    type: 'info',
    title: 'Contest Starting Soon',
    message: 'Bi-Weekly Contest 120 starts in 30 minutes.',
    time: '30 mins ago',
    read: false,
  },
  {
    id: 3,
    type: 'warning',
    title: 'Rank Update',
    message: 'Your rank has dropped to #1240 in Global Leaderboard.',
    time: '1 hour ago',
    read: true,
  },
];

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type) => {
    switch (type) {
        case 'success': return <Check size={16} className="text-green-500" />;
        case 'warning': return <AlertTriangle size={16} className="text-orange-500" />;
        default: return <Info size={16} className="text-blue-500" />;
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-400 transition-colors"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        )}
      </button>

      {isOpen && (
        <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
            <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg z-50 overflow-hidden">
                <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                    <button onClick={markAllAsRead} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                        Mark all read
                    </button>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                    {notifications.length > 0 ? (
                        notifications.map((notif) => (
                            <div 
                                key={notif.id} 
                                className={clsx(
                                    "p-4 border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer",
                                    !notif.read && "bg-blue-50/50 dark:bg-blue-900/10"
                                )}
                                onClick={() => markAsRead(notif.id)}
                            >
                                <div className="flex gap-3">
                                    <div className="mt-1 bg-white dark:bg-gray-800 p-1.5 rounded-full shadow-sm h-fit">
                                        {getIcon(notif.type)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className={clsx("text-sm font-medium", !notif.read ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400")}>
                                                {notif.title}
                                            </h4>
                                            <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{notif.time}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                                            {notif.message}
                                        </p>
                                    </div>
                                    {!notif.read && (
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0 self-center"></div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            No notifications
                        </div>
                    )}
                </div>
            </div>
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;
