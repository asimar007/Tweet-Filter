import type { Stats } from '@/utils/types';

export function StatsBar({ stats, onReset }: { stats: Stats; onReset: () => void }) {
  return (
    <div className="flex items-center justify-between px-5 py-3 bg-slate-900 border-b border-slate-700/50 shadow-inner">
      <div className="flex flex-col items-center gap-0.5">
        <span className="text-xl font-bold text-blue-400 tabular-nums">{stats.filtered}</span>
        <span className="text-[11px] text-slate-400 uppercase tracking-widest font-medium">Filtered</span>
      </div>
      <button
        className="flex items-center justify-center w-8 h-8 rounded-full bg-transparent border border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white transition-all active:scale-95" 
        onClick={onReset} 
        title="Reset statistics"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
      </button>
    </div>
  );
}
