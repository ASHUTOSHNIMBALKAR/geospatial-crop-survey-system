import React from 'react';
import { TrendingUp, BarChart, Clock, ShieldCheck, Map as MapIcon, Info } from 'lucide-react';

interface AnalyticsPanelProps {
  className?: string;
}

export function AnalyticsPanel({ className }: AnalyticsPanelProps) {
  const recentActivities = [
    { title: 'Sentinel-2 Scan Complete', time: '2m ago', region: 'Junnar', icon: MapIcon, color: 'text-agri-400' },
    { title: 'Gat-124 Audit Verified', time: '14m ago', region: 'Haveli', icon: ShieldCheck, color: 'text-blue-400' },
    { title: 'Moisture Alert: Critical', time: '1h ago', region: 'Purandar', icon: Info, color: 'text-red-400' },
    { title: 'Drone Sync Initiated', time: '2h ago', region: 'Shirur', icon: TrendingUp, color: 'text-gold-500' },
  ];

  return (
    <div className={`w-96 glass-panel m-4 flex flex-col p-6 z-20 overflow-hidden relative group/panel ${className || ''}`}>
      <div className="flex items-center gap-4 mb-8">
        <div className="bg-agri-600/20 p-3 rounded-2xl border border-agri-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
          <TrendingUp className="text-agri-500 h-6 w-6" />
        </div>
        <div>
          <h2 className="text-lg font-black tracking-tight text-white uppercase leading-none mb-2">Audit Intelligence</h2>
          <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] opacity-80">District Compliance: 92.4%</p>
        </div>
      </div>

      <div className="space-y-6 flex-1 overflow-y-auto pr-2 -mr-2 scrollbar-none">
        {/* District Progress */}
        <div className="glass-card p-5 border-white/5 space-y-4">
           <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Village Verification</span>
              <span className="text-xs font-black text-white">4.2k / 4.8k</span>
           </div>
           <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden shadow-inner">
              <div className="h-full bg-agri-500 w-[88%] shadow-[0_0_15px_rgba(16,185,129,0.3)]" />
           </div>
        </div>

        {/* Live Feed */}
        <div className="space-y-4">
          <h3 className="text-[11px] font-black uppercase text-slate-500 tracking-[0.3em] mb-4">Live Audit Feed</h3>
          {recentActivities.map((activity, i) => (
            <div key={i} className="flex gap-4 group/item cursor-pointer">
              <div className="relative">
                <div className="h-10 w-10 bg-slate-900 rounded-xl flex items-center justify-center border border-white/5 group-hover/item:border-white/10 transition-all">
                  <activity.icon size={18} className={activity.color} />
                </div>
                {i !== recentActivities.length - 1 && (
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1px] h-8 bg-slate-800" />
                )}
              </div>
              <div className="flex-1 pb-6">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-xs font-black text-white uppercase tracking-tight group-hover/item:text-agri-400 transition-colors">{activity.title}</p>
                  <span className="text-[9px] text-slate-600 font-bold flex items-center gap-1">
                    <Clock size={10} /> {activity.time}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mt-1">Region: <span className="text-slate-400">{activity.region}</span></p>
              </div>
            </div>
          ))}
        </div>

        {/* Prediction Card */}
        <div className="glass-card p-6 bg-gradient-to-br from-agri-600/10 to-transparent border-agri-500/20">
          <div className="flex items-center gap-3 mb-4">
            <BarChart className="text-agri-500" size={20} />
            <span className="text-xs font-black text-white uppercase tracking-tight">Yield Prediction</span>
          </div>
          <div className="text-3xl font-black text-white mb-2">+12.4%</div>
          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Net Surplus expected in sugar sector for FY2026</p>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-white/5">
        <button className="w-full py-3 glass-card !rounded-2xl border-agri-500/20 text-agri-400 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-agri-500 hover:text-white transition-all shadow-lg active:scale-95">
          Generate Full District Audit
        </button>
      </div>
    </div>
  );
}




