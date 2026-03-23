import { useState } from 'react';
import type { Settings } from '../utils/types';

export function CategoryKeywordList({ 
  categoryName, 
  settings, 
  updateSettings 
}: { 
  categoryName: string; 
  settings: Settings; 
  updateSettings: (patch: Partial<Settings>) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const key = `${categoryName}Keywords` as keyof Settings;
  const keywords = (settings[key] as string[]) || [];

  if (!keywords || keywords.length === 0) return null;

  return (
    <div className="flex flex-col mt-1 w-full relative z-10">
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsExpanded(prev => !prev);
        }}
        className="text-[11px] font-medium text-blue-400 hover:text-blue-300 transition-colors self-start mb-1 cursor-pointer"
      >
        {isExpanded ? 'Hide Keywords' : 'View Default Keywords'} ({keywords.length})
      </button>
      
      {isExpanded && (
        <div className="flex flex-wrap gap-1.5 mt-1 max-h-32 overflow-y-auto w-full no-scrollbar">
          {keywords.map(keyword => (
            <div key={keyword} className="flex items-center gap-1 bg-slate-900/50 border border-slate-700/50 rounded-sm pl-2 pr-1 py-0.5 text-[10px] text-slate-400 transition-colors hover:text-slate-300">
              <span>{keyword}</span>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  updateSettings({ [key]: keywords.filter(k => k !== keyword) });
                }}
                disabled={!settings.enabled}
                className="text-slate-500 hover:text-red-400 disabled:opacity-50 transition-colors p-0.5 rounded-sm hover:bg-slate-800 cursor-pointer"
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
