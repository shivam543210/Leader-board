import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, ChevronDown, CheckCircle, AlertTriangle, XCircle, Clock } from 'lucide-react';
import Button from '../ui/Button';

const LANGUAGES = [
    { id: 'cpp', name: 'C++ (GCC 9.2.0)' },
    { id: 'java', name: 'Java (OpenJDK 13)' },
    { id: 'python', name: 'Python 3.8.1' },
    { id: 'javascript', name: 'JavaScript (Node.js 12)' }
];

const CODE_TEMPLATES = {
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello World";\n    return 0;\n}',
    java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}',
    python: 'def solve():\n    print("Hello World")\n\nsolve()',
    javascript: 'console.log("Hello World");'
};

const CodeEditor = ({ onRun, onSubmit, isSubmitting, verdict }) => {
    const [language, setLanguage] = useState('cpp');
    const [code, setCode] = useState(CODE_TEMPLATES['cpp']);
    const [lines, setLines] = useState(1);

    useEffect(() => {
        setCode(CODE_TEMPLATES[language]);
    }, [language]);

    const handleCodeChange = (e) => {
        setCode(e.target.value);
        setLines(e.target.value.split('\n').length);
    };

    const VerdictBanner = ({ status }) => {
        if (!status) return null;
        
        const config = {
            'Accepted': { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', icon: CheckCircle },
            'Wrong Answer': { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', icon: XCircle },
            'Time Limit Exceeded': { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-400', icon: Clock },
            'Compilation Error': { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', icon: AlertTriangle },
        }[status] || { bg: 'bg-gray-100', text: 'text-gray-700', icon: AlertTriangle };

        const Icon = config.icon;

        return (
            <div className={`p-3 rounded-lg flex items-center gap-3 mb-4 animate-in fade-in slide-in-from-bottom-2 ${config.bg}`}>
                <Icon size={18} className={config.text} />
                <span className={`font-medium ${config.text}`}>{status}</span>
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
                <div className="relative group">
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        {LANGUAGES.find(l => l.id === language)?.name}
                        <ChevronDown size={14} className="text-gray-400" />
                    </button>
                    {/* Dropdown would go here, simplified for demo using native select opacity 0 overlay or custom popper. 
                        For now just a native select on top for functionality. 
                    */}
                    <select 
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    >
                        {LANGUAGES.map(lang => (
                            <option key={lang.id} value={lang.id}>{lang.name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex gap-2">
                    <button 
                         onClick={() => setCode(CODE_TEMPLATES[language])}
                         className="p-1.5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                         title="Reset Code"
                    >
                        <RotateCcw size={16} />
                    </button>
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 relative font-mono text-sm group">
                {/* Line Numbers */}
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col items-end pt-4 pr-3 text-gray-400 select-none overflow-hidden text-xs">
                    {Array.from({ length: Math.max(lines, 20) }).map((_, i) => (
                        <div key={i} className="leading-6">{i + 1}</div>
                    ))}
                </div>

                {/* Textarea */}
                <textarea
                    value={code}
                    onChange={handleCodeChange}
                    spellCheck="false"
                    className="absolute inset-0 pl-14 pt-4 pr-4 w-full h-full bg-transparent resize-none outline-none text-gray-800 dark:text-gray-200 leading-6"
                />
            </div>

            {/* Verdict Display */}
            <div className="px-4 pt-2">
                <VerdictBanner status={verdict} />
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-3 bg-gray-50/30 dark:bg-gray-800/10">
                <Button 
                    variant="secondary" 
                    onClick={() => onRun(code)}
                    disabled={isSubmitting}
                    className="!py-2"
                >
                    <Play size={16} className="mr-2" /> Run
                </Button>
                <Button 
                    variant="primary" 
                    onClick={() => onSubmit(code)}
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                    className="!py-2"
                >
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default CodeEditor;
