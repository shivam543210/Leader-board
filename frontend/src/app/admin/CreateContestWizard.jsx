import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Save, CheckCircle } from 'lucide-react';
import GlassPanel from '../../components/ui/GlassPanel';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const WizardStep = ({ number, title, active, completed }) => (
  <div className={`flex items-center gap-2 ${active ? 'text-blue-600 dark:text-blue-400' : completed ? 'text-green-500' : 'text-gray-400'}`}>
    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 
      ${active ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' : completed ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-300 dark:border-gray-700'}`}>
      {completed ? <CheckCircle size={16} /> : number}
    </div>
    <span className="hidden sm:inline font-medium text-sm">{title}</span>
    <div className="h-0.5 w-8 bg-gray-200 dark:bg-gray-800 mx-2 last:hidden" />
  </div>
);

const CreateContestWizard = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        startTime: '',
        duration: 90,
        description: '',
        problems: [],
        settings: {
            showLeaderboard: true,
            penalty: 5
        }
    });

    const updateForm = (key, value) => setFormData(prev => ({ ...prev, [key]: value }));
    const updateSettings = (key, value) => setFormData(prev => ({ ...prev, settings: { ...prev.settings, [key]: value } }));

    const nextStep = () => setStep(p => Math.min(p + 1, 3));
    const prevStep = () => setStep(p => Math.max(p - 1, 1));
    
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Wizard Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Create New Contest</h1>
                <div className="flex items-center justify-between">
                    <WizardStep number={1} title="Basic Info" active={step === 1} completed={step > 1} />
                    <WizardStep number={2} title="Configuration" active={step === 2} completed={step > 2} />
                    <WizardStep number={3} title="Review" active={step === 3} completed={step > 3} />
                </div>
            </div>

            <GlassPanel className="p-8 min-h-[400px]">
                {step === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-xl font-semibold mb-4">Contest Details</h2>
                        <Input 
                            label="Contest Title" 
                            value={formData.title} 
                            onChange={e => updateForm('title', e.target.value)} 
                            placeholder="Weekly Contest #..." 
                        />
                         <div className="grid grid-cols-2 gap-4">
                            <Input 
                                label="Start Time" 
                                type="datetime-local" 
                                value={formData.startTime} 
                                onChange={e => updateForm('startTime', e.target.value)} 
                            />
                            <Input 
                                label="Duration (mins)" 
                                type="number" 
                                value={formData.duration} 
                                onChange={e => updateForm('duration', parseInt(e.target.value))} 
                            />
                        </div>
                        <div>
                             <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Description</label>
                             <textarea 
                                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[100px]" 
                                value={formData.description}
                                onChange={e => updateForm('description', e.target.value)}
                                placeholder="Enter contest rules..."
                            />
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-xl font-semibold mb-4">Settings</h2>
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div>
                                <h4 className="font-medium">Public Leaderboard</h4>
                                <p className="text-sm text-gray-500">Allow participants to see live rankings</p>
                            </div>
                            <input 
                                type="checkbox" 
                                checked={formData.settings.showLeaderboard}
                                onChange={e => updateSettings('showLeaderboard', e.target.checked)}
                                className="w-5 h-5 text-blue-600" 
                            />
                        </div>
                        <Input 
                            label="Wrong Submission Penalty (mins)"
                            type="number"
                            value={formData.settings.penalty}
                            onChange={e => updateSettings('penalty', parseInt(e.target.value))}
                        />
                    </div>
                )}

                {step === 3 && (
                     <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                        <h2 className="text-xl font-semibold mb-4">Review & Launch</h2>
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="text-sm text-gray-500 block">Title</span>
                                    <span className="font-medium">{formData.title || 'Untitled'}</span>
                                </div>
                                 <div>
                                    <span className="text-sm text-gray-500 block">Duration</span>
                                    <span className="font-medium">{formData.duration} mins</span>
                                </div>
                            </div>
                        </div>
                     </div>
                )}
            </GlassPanel>

            <div className="flex justify-between">
                <Button variant="ghost" onClick={prevStep} disabled={step === 1}>
                    <ChevronLeft className="mr-2" size={18} /> Back
                </Button>
                {step < 3 ? (
                     <Button onClick={nextStep}>
                        Next <ChevronRight className="ml-2" size={18} />
                    </Button>
                ) : (
                    <Button variant="primary" onClick={() => navigate('/admin/contests')}>
                        <Save className="mr-2" size={18} /> Create Contest
                    </Button>
                )}
            </div>
        </div>
    );
};

export default CreateContestWizard;
