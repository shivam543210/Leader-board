import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Plus } from 'lucide-react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const CreateContest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    startTime: '',
    duration: 90,
    description: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Creating contest:', formData);
    // Simulate API call
    setTimeout(() => {
        navigate('/admin/contests');
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
          <ArrowLeft size={20} className="text-gray-500" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Contest</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contest Details</h3>
                <form id="create-contest-form" onSubmit={handleSubmit} className="space-y-4">
                    <Input 
                        label="Contest Title" 
                        name="title" 
                        value={formData.title} 
                        onChange={handleChange} 
                        placeholder="e.g. Weekly Contest 405" 
                        required 
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                        <Input 
                            label="Start Time" 
                            name="startTime" 
                            type="datetime-local" 
                            value={formData.startTime} 
                            onChange={handleChange} 
                            required 
                        />
                        <Input 
                            label="Duration (minutes)" 
                            name="duration" 
                            type="number" 
                            value={formData.duration} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                        <textarea 
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400"
                            placeholder="Contest rules and description..."
                        />
                    </div>
                </form>
            </div>
            
             <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
                 <div className="flex justify-between items-center mb-4">
                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Problems</h3>
                     <Button size="sm" variant="outline" className="text-xs">
                         <Plus size={14} className="mr-1" /> Add Problem
                     </Button>
                 </div>
                 <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                     No problems added yet.
                 </div>
             </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-4">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm sticky top-24">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Actions</h3>
                <Button type="submit" form="create-contest-form" className="w-full flex items-center justify-center gap-2 mb-3">
                    <Save size={18} /> Save Contest
                </Button>
                <Button variant="ghost" className="w-full" onClick={() => navigate(-1)}>
                    Cancel
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CreateContest;
