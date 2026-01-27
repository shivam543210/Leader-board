import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, MessageCircle, MoreHorizontal, Send } from 'lucide-react';
import Button from '../ui/Button';

const MOCK_COMMENTS = [
    {
        id: 1,
        author: "code_master_99",
        avatar: "C",
        content: "Great problem! I used a hash map to optimize the solution to O(n).",
        likes: 45,
        replies: 3,
        time: "2 hours ago",
        isLiked: false
    },
    {
        id: 2,
        author: "algorithm_ninja",
        avatar: "A",
        content: "Can anyone explain why the greedy approach fails on test case 4?",
        likes: 12,
        replies: 5,
        time: "5 hours ago",
        isLiked: true
    },
    {
        id: 3,
        author: "python_fan",
        avatar: "P",
        content: "Standard DP problem. Similar to 'Climbing Stairs'.",
        likes: 8,
        replies: 0,
        time: "1 day ago",
        isLiked: false
    }
];

const DiscussionBoard = () => {
    const [comments, setComments] = useState(MOCK_COMMENTS);
    const [newComment, setNewComment] = useState("");

    const handlePost = () => {
        if (!newComment.trim()) return;
        
        const newPost = {
            id: Date.now(),
            author: "You",
            avatar: "Y",
            content: newComment,
            likes: 0,
            replies: 0,
            time: "Just now",
            isLiked: false
        };
        
        setComments([newPost, ...comments]);
        setNewComment("");
    };

    const toggleLike = (id) => {
        setComments(comments.map(c => 
            c.id === id ? { ...c, likes: c.isLiked ? c.likes - 1 : c.likes + 1, isLiked: !c.isLiked } : c
        ));
    };

    return (
        <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300">
            {/* Input Area */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400">
                        You
                    </div>
                    <div className="flex-1">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment or ask a question..."
                            className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none min-h-[80px] resize-y"
                        />
                        <div className="flex justify-end mt-2">
                            <Button 
                                variant="primary" 
                                size="sm" 
                                onClick={handlePost}
                                disabled={!newComment.trim()}
                                className="flex items-center gap-2"
                            >
                                <Send size={14} /> Post
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 group">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300 shrink-0">
                            {comment.avatar}
                        </div>
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-sm text-gray-900 dark:text-white">{comment.author}</span>
                                    <span className="text-xs text-gray-400">• {comment.time}</span>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MoreHorizontal size={16} />
                                </button>
                            </div>
                            
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                {comment.content}
                            </p>
                            
                            <div className="flex items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400">
                                <button 
                                    onClick={() => toggleLike(comment.id)}
                                    className={`flex items-center gap-1.5 transition-colors ${comment.isLiked ? 'text-blue-600 dark:text-blue-400' : 'hover:text-gray-700 dark:hover:text-gray-300'}`}
                                >
                                    <ThumbsUp size={14} className={comment.isLiked ? 'fill-current' : ''} />
                                    {comment.likes}
                                </button>
                                <button className="flex items-center gap-1.5 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                                    <MessageCircle size={14} />
                                    {comment.replies} Replies
                                </button>
                                <button className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                                    Reply
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DiscussionBoard;
