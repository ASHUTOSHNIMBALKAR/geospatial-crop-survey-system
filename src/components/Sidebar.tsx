import { 
    LayoutDashboard, 
    Map, 
    BarChart3, 
    FileText, 
    Settings, 
    User, 
    Combine, 
    Zap, 
    ShieldCheck, 
    Leaf, 
    MessageSquare 
} from 'lucide-react';

interface SidebarProps {
    activeView: 'dashboard' | 'gis' | 'analytics' | 'reports' | 'settings' | 'sustainability' | 'grievance';
    onViewChange: (view: 'dashboard' | 'gis' | 'analytics' | 'reports' | 'settings' | 'sustainability' | 'grievance') => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
    const navItems = [
        { id: 'dashboard', icon: LayoutDashboard, label: 'Audit Hub', desc: 'Real-time monitoring' },
        { id: 'gis', icon: Map, label: 'GIS Layers', desc: 'Satellite multi-stack' },
        { id: 'analytics', icon: BarChart3, label: 'Yield Intel', desc: 'Predictive forecasting' },
        { id: 'reports', icon: FileText, label: 'Audit Logs', desc: 'Official certification' },
        { id: 'sustainability', icon: Leaf, label: 'ESG & Carbon', desc: 'Marketplace revenue' },
        { id: 'grievance', icon: MessageSquare, label: 'Farmer AI', desc: 'Grievance resolution' },
        { id: 'settings', icon: Settings, label: 'System Config', desc: 'Access & Nodes' },
    ];

    return (
        <div className="w-80 h-screen glass-panel m-4 flex flex-col p-6 z-30 overflow-hidden relative group">
            {/* Glossy Header */}
            <div className="flex items-center gap-4 mb-10 px-2 transition-all group-hover:translate-x-1">
                <div className="relative">
                    <div className="h-14 w-14 bg-agri-600 rounded-3xl flex items-center justify-center text-white shadow-[0_0_40px_rgba(16,185,129,0.3)] animate-pulse-slow">
                        <Combine size={28} />
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-gold-500 rounded-xl flex items-center justify-center text-slate-950 shadow-xl border-2 border-slate-950">
                        <ShieldCheck size={14} />
                    </div>
                </div>
                <div>
                    <h1 className="text-2xl font-black tracking-tighter text-white uppercase leading-none">महा-AGRI</h1>
                    <p className="text-[10px] text-agri-400 font-bold uppercase tracking-[0.2em] mt-1.5 opacity-80">GIS-Audit Platform</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-3 overflow-y-auto pr-2 -mr-2 scrollbar-none">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onViewChange(item.id as any)}
                        className={`w-full nav-btn group/btn flex items-center gap-4 ${activeView === item.id ? 'nav-btn-active' : ''}`}
                    >
                        <div className={`p-2.5 rounded-2xl transition-all duration-300 ${activeView === item.id ? 'bg-agri-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'bg-slate-900/60 text-slate-500 group-hover/btn:text-white group-hover/btn:bg-slate-800'}`}>
                            <item.icon size={20} />
                        </div>
                        <div className="text-left flex-1">
                            <p className={`text-sm font-black tracking-tight uppercase leading-none transition-colors ${activeView === item.id ? 'text-white' : 'text-slate-400 group-hover/btn:text-slate-200'}`}>{item.label}</p>
                            <p className="text-[10px] text-slate-500 font-bold tracking-tighter mt-1 opacity-60">{item.desc}</p>
                        </div>
                        {activeView === item.id && (
                            <div className="h-2 w-2 bg-agri-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.8)] animate-pulse" />
                        )}
                    </button>
                ))}
            </nav>

            {/* Official Badge Section */}
            <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                <div className="bg-agri-500/5 rounded-2xl p-4 border border-agri-500/10">
                    <div className="flex items-center justify-between mb-2">
                         <span className="text-[9px] font-black text-agri-400 uppercase tracking-widest">Global ESG Score</span>
                         <span className="text-xs font-black text-white">8.4/10</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-agri-500 w-[84%] shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
                    </div>
                </div>

                <div className="glass-card p-4 flex items-center gap-3 border-transparent hover:border-white/10 transition-all cursor-pointer">
                    <div className="h-10 w-10 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center relative shadow-lg">
                        <User className="text-slate-400" size={20} />
                        <div className="absolute top-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-slate-900" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-white truncate uppercase tracking-tighter">District Collector</p>
                        <p className="text-[9px] text-agri-500 font-bold truncate tracking-widest uppercase">Verified Admin</p>
                    </div>
                    <Zap className="text-gold-500 animate-pulse" size={16} />
                </div>
            </div>
        </div>
    );
}
