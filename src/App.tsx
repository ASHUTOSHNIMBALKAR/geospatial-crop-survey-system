import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { MapUI } from './components/MapUI';
import { AnalyticsPanel } from './components/AnalyticsPanel';
import { Bell, Search, User, Zap, ShieldCheck, Info, ChevronDown, Satellite as SatelliteIcon, ArrowLeft, Download, Share2, CheckCircle2, Layers, BarChart3, Leaf, MessageSquare, Database } from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';
import { MAHARASHTRA_CROP_SAMPLES, FIELD_SURVEYS } from './lib/mockData';


const App: React.FC = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showAlert, setShowAlert] = useState(true);
    const [activeView, setActiveView] = useState<'dashboard' | 'gis' | 'analytics' | 'reports' | 'settings' | 'sustainability' | 'grievance'>('dashboard');
    const [selectedCropId, setSelectedCropId] = useState<string | null>(null);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const selectedCrop = MAHARASHTRA_CROP_SAMPLES.find(c => c.id === selectedCropId);

    const handlePrint = () => {
        window.print();
    }

    const renderReport = () => {
        if (!selectedCrop) return null;
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 m-4 glass-panel p-8 overflow-y-auto scrollbar-hide flex flex-col gap-6 relative print-content"
            >
                <button 
                    onClick={() => setSelectedCropId(null)}
                    className="absolute top-8 right-8 nav-btn print:hidden"
                >
                    <ArrowLeft size={18} /> Back to Map
                </button>

                <div className="flex justify-between items-start border-b border-slate-700/50 pb-6 print:border-slate-300">
                    <div>
                        <div className="flex items-center gap-2 text-agri-400 font-bold text-xs uppercase tracking-widest mb-2 print:text-green-700">
                           <SatelliteIcon size={14} /> Official GIS Audit Certificate
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter uppercase print:text-slate-900">{selectedCrop.name}</h1>
                        <p className="text-slate-400 mt-1 print:text-slate-600">Gat Number: <span className="text-white font-bold print:text-slate-900">#MH-{selectedCrop.id.toUpperCase()}</span> | Audit Date: {new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2 print:hidden">
                        <button className="nav-btn bg-slate-800"><Download size={16} /></button>
                        <button className="nav-btn bg-slate-800"><Share2 size={16} /></button>
                        <button 
                            onClick={handlePrint}
                            className="nav-btn bg-agri-600/20 text-agri-400 border border-agri-500/30 font-bold text-xs px-6 uppercase tracking-widest hover:bg-agri-600 hover:text-white transition-all"
                        >
                            Generate Official PDF
                        </button>
                    </div>
                </div>


                <div className="grid grid-cols-3 gap-6">
                    <div className="glass-card p-6 border-t-4 border-agri-500 flex flex-col gap-2">
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Health Certification</p>
                        <div className="text-3xl font-black text-white">{Math.round(selectedCrop.health * 100)}%</div>
                        <div className="flex items-center gap-2 text-[10px] text-agri-500 font-bold uppercase tracking-tight">
                            <CheckCircle2 size={12} /> Optimal Range Verified
                        </div>
                    </div>
                    <div className="glass-card p-6 border-t-4 border-blue-500 flex flex-col gap-2">
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Area Verification</p>
                        <div className="text-3xl font-black text-white">{selectedCrop.area} Ha</div>
                        <div className="flex items-center gap-2 text-[10px] text-blue-500 font-bold uppercase tracking-tight">
                            <SatelliteIcon size={12} /> Double-Validated by SAR
                        </div>
                    </div>
                    <div className="glass-card p-6 border-t-4 border-purple-500 flex flex-col gap-2">
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Yield Forecasting</p>
                        <div className="text-3xl font-black text-white">{selectedCrop.yield} Tons</div>
                        <div className="flex items-center gap-2 text-[10px] text-purple-500 font-bold uppercase tracking-tight">
                            <Zap size={12} /> AI Confidence: 94.2%
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 flex-1">
                    <div className="glass-card p-6 flex flex-col gap-4">
                        <h3 className="text-sm font-black uppercase tracking-widest">Multi-Spectral Analysis</h3>
                        <div className="flex-1 bg-slate-900/50 rounded-xl overflow-hidden relative">
                             <img src={`https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000`} className="w-full h-full object-cover opacity-50 grayscale" alt="satellite view" />
                             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                             <div className="absolute inset-0 flex items-center justify-center">
                                 <div className="w-48 h-48 border-2 border-agri-500/50 rounded-full animate-ping"></div>
                                 <div className="absolute text-[10px] font-black text-agri-400 uppercase tracking-[0.5em]">Cross-Referencing...</div>
                             </div>
                        </div>
                    </div>
                    <div className="glass-card p-6 flex flex-col gap-4 overflow-hidden">
                        <h3 className="text-sm font-black uppercase tracking-widest">Ground-Truth Evidence</h3>
                        <div className="grid grid-cols-2 gap-3 h-full overflow-y-auto pr-2 scrollbar-hide">
                            {FIELD_SURVEYS.slice(0, 4).map((survey, i) => (
                                <div key={i} className="group relative rounded-lg overflow-hidden h-32 border border-slate-700/50">
                                    <img src={survey.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="field" />
                                    <div className="absolute inset-0 bg-black/40 p-2 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                        <p className="text-[8px] font-bold text-white uppercase">{survey.date}</p>
                                        <p className="text-[8px] font-medium text-slate-300">Lat: {survey.lat.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    const renderContent = () => {
        if (selectedCropId) return renderReport();

        switch(activeView) {
            case 'gis': 
                return (
                    <div className="flex-1 m-4 glass-panel p-8 flex flex-col gap-4 overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-black uppercase tracking-tight">Active GIS Layers (Satellite)</h2>
                            <div className="flex gap-2">
                                <button className="nav-btn-active px-4 text-xs font-bold uppercase">Multi-Spectral</button>
                                <button className="nav-btn px-4 text-xs font-bold uppercase">SAR Radar</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { name: 'NDVI Vegetation Index', desc: 'Sentinel-2 Multi-Spectral Audit', icon: Layers },
                                { name: 'SAR Soil Moisture', desc: 'Sentinel-1 Radar (Cloud-Penetrant)', icon: Zap },
                                { name: 'Field Evidence Audit', desc: 'Secure Geo-Tagged Image Repository', icon: Database },
                                { name: 'LULC Land Classification', desc: 'AI-Driven Gat-Level Mapping', icon: Info }
                            ].map(layer => (
                                <div key={layer.name} className="glass-card p-6 flex justify-between items-center group cursor-pointer hover:border-agri-500/50">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 bg-slate-900 rounded-lg border border-slate-700 flex items-center justify-center text-agri-500 group-hover:bg-agri-500/10 transition-colors">
                                            <layer.icon size={24} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-white uppercase tracking-tight text-sm">{layer.name}</p>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{layer.desc}</p>
                                        </div>
                                    </div>
                                    <div className="h-5 w-10 bg-agri-600/20 border border-agri-500/30 rounded-full relative p-1 flex items-center justify-end group-hover:justify-start transition-all">
                                        <div className="h-3 w-3 bg-agri-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'reports':
                return (
                    <div className="flex-1 m-4 glass-panel p-8 flex flex-col gap-4 overflow-y-auto">
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-4 text-white">Geo-Tagged Field Evidence Repository</h2>
                        <div className="grid grid-cols-3 gap-6">
                            {FIELD_SURVEYS.map((survey, i) => (
                                <div key={i} className="glass-card overflow-hidden group hover:scale-[1.02] transition-all">
                                    <div className="h-40 relative">
                                        <img src={survey.image} className="h-full w-full object-cover" alt="survey" />
                                        <div className="absolute top-2 right-2 bg-agri-600 text-[8px] font-black text-white px-2 py-1 rounded uppercase tracking-widest">Verified</div>
                                    </div>
                                    <div className="p-4 flex flex-col gap-2">
                                        <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 mb-1 border-b border-slate-700/50 pb-2">
                                            <span>Survey Date: {survey.date}</span>
                                            <span className="text-agri-400">#SURV-0{i+1}</span>
                                        </div>
                                        <p className="text-xs font-bold text-white mb-2">{survey.location}</p>
                                        <div className="flex items-center gap-1.5 text-[9px] text-slate-400 uppercase tracking-widest">
                                            <SatelliteIcon size={10} /> Lat: {survey.lat.toFixed(4)}, Lng: {survey.lng.toFixed(4)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'analytics':
                return (
                    <div className="flex-1 m-4 glass-panel p-8 flex flex-col gap-4 overflow-y-auto">
                         <h2 className="text-2xl font-black uppercase tracking-tight mb-4 text-orange-500">Active Disaster Management Protocols</h2>
                         <div className="grid grid-cols-1 gap-4">
                             {[
                                 { title: 'Vidarbha Heatwave Level 2', region: 'Akola, Amravati', type: 'Drought Risk', severity: 'High' },
                                 { title: 'Marathwada Moisture Deficit', region: 'Beed, Latur', type: 'Water Stress', severity: 'Critical' },
                             ].map((alert) => (
                                 <div key={alert.title} className="glass-card p-6 flex justify-between items-center border-l-4 border-l-orange-500">
                                     <div>
                                         <p className="text-xl font-bold text-white">{alert.title}</p>
                                         <p className="text-xs text-slate-400 mt-1">Impacted Regions: <span className="text-slate-200">{alert.region}</span></p>
                                     </div>
                                     <div className="text-right px-4 py-2 bg-orange-500/10 rounded-lg">
                                         <p className="text-[10px] font-black uppercase tracking-widest text-orange-500">{alert.severity}</p>
                                         <p className="text-xs font-bold text-white uppercase">{alert.type}</p>
                                     </div>
                                 </div>
                             ))}
                         </div>
                    </div>
                );
            case 'sustainability':
                return (
                    <div className="flex-1 m-4 glass-panel p-8 flex flex-col gap-6 overflow-y-auto">
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <h1 className="text-3xl font-black uppercase tracking-tighter text-agri-400">Carbon & Sustainability Credits</h1>
                                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mt-1">Satellite-Verified ESG Audit • 2026 Season</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="text-right">
                                    <p className="text-[10px] text-slate-500 font-black uppercase leading-none mb-1">Total Credits</p>
                                    <p className="text-2xl font-black text-white">12,480 <span className="text-agri-500">tCO2e</span></p>
                                </div>
                                <div className="h-12 w-12 bg-agri-600/20 rounded-xl border border-agri-500/30 flex items-center justify-center">
                                    <Leaf className="text-agri-400" size={24} />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            {MAHARASHTRA_CROP_SAMPLES.slice(0, 3).map((sample) => (
                                <div key={sample.id} className="glass-card p-6 border-b-4 border-agri-500 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                                        <Zap size={80} className="text-agri-500" />
                                    </div>
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] mb-4">Field Asset #{sample.id}</p>
                                    <h3 className="text-lg font-black text-white mb-1 uppercase tracking-tight">{sample.name}</h3>
                                    <div className="flex items-center gap-2 mb-6">
                                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-agri-500" style={{ width: `${(sample.carbonCredits || 10) * 4}%` }}></div>
                                        </div>
                                        <span className="text-xs font-black text-agri-400">{sample.carbonCredits} Cr</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                                        <span>Soil Quality Index</span>
                                        <span className="text-white">0.92 Optimal</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex-1 glass-card p-6 flex flex-col items-center justify-center border-dashed border-2 border-slate-700/50">
                             <div className="h-16 w-16 bg-blue-600/10 rounded-full flex items-center justify-center mb-4">
                                 <ShieldCheck className="text-blue-500" size={32} />
                             </div>
                             <h3 className="text-xl font-black text-white uppercase tracking-tight">Marketplace Integration Active</h3>
                             <p className="text-slate-400 text-center max-w-sm mt-2 font-medium">Your verified carbon credits are eligible for the <span className="text-agri-400">Global Agri-ESG Marketplace</span>. High soil organic carbon detected in Western Pune sector.</p>
                             <button className="mt-6 nav-btn-active px-8 py-2 text-[10px] uppercase font-black tracking-widest">Withdrawal to Bank (Aadhar Pay)</button>
                        </div>
                    </div>
                );
            case 'grievance':
                return (
                    <div className="flex-1 m-4 glass-panel p-8 flex flex-col gap-6 overflow-y-auto">
                        <div className="flex justify-between items-start">
                            <div>
                                <h1 className="text-3xl font-black uppercase tracking-tighter">Farmer Support & AI Grivance</h1>
                                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mt-1">Intelligent Dispute & Support Resolution</p>
                            </div>
                            <div className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest animate-pulse">
                                Live: 42 AI Agents Active
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 flex-1">
                            <div className="glass-card p-6 flex flex-col gap-4">
                                <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                    <div className="h-2 w-2 bg-agri-500 rounded-full"></div> Incoming Multilingual Queries
                                </h3>
                                <div className="space-y-3 shrink-0">
                                    {[
                                        { user: 'Babu Rao', query: 'माझ्या पिकाला पाणी कमी पडत आहे, विमा मिळेल का?', status: 'Analyzing', lang: 'Marathi' },
                                        { user: 'Suresh K', query: 'Pest attack in Sugarcane blocks 14-18.', status: 'Escalated', lang: 'English' },
                                        { user: 'Vinayak P', query: 'Silo full. Need transport logistics.', status: 'Processing', lang: 'English' },
                                    ].map((msg, i) => (
                                        <div key={i} className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 hover:bg-slate-900 transition-colors cursor-pointer group">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-xs font-black text-white">{msg.user}</span>
                                                <span className="text-[8px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded font-black uppercase">{msg.lang}</span>
                                            </div>
                                            <p className="text-xs text-slate-400 mb-3 italic">"{msg.query}"</p>
                                            <div className="flex justify-between items-center">
                                                <div className="flex gap-1">
                                                    <span className="text-[9px] font-bold text-slate-500 uppercase">AI confidence:</span>
                                                    <span className="text-[9px] font-black text-agri-400 uppercase">96%</span>
                                                </div>
                                                <div className="h-5 px-3 bg-slate-800 rounded flex items-center text-[8px] font-black text-white uppercase group-hover:bg-agri-600 transition-colors">Resolve Now</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="glass-card p-6 flex-1 flex flex-col items-center justify-center text-center">
                                    <div className="h-14 w-14 bg-agri-600/10 rounded-full flex items-center justify-center mb-4">
                                        <MessageSquare className="text-agri-400" size={28} />
                                    </div>
                                    <h3 className="text-lg font-black text-white uppercase tracking-tight">AI Voice Assistant</h3>
                                    <p className="text-xs text-slate-500 mt-2">Speak in Marathi, Hindi, or English to query satellite data for your farm.</p>
                                    <div className="mt-6 flex items-center gap-4">
                                        <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-xl">
                                            <Zap className="text-slate-900 fill-current" size={20} />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Listening...</p>
                                            <div className="flex gap-0.5 mt-1">
                                                {[3, 6, 4, 8, 5, 7].map((h, i) => (
                                                    <div key={i} className="w-1 bg-agri-500 rounded-full animate-pulse" style={{ height: `${h*2}px`, animationDelay: `${i*100}ms` }} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="glass-card p-4 border-l-4 border-orange-500">
                                    <h4 className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1">Logistics Alert</h4>
                                    <p className="text-[11px] text-slate-400 font-medium">Junnar Toll Node experiencing high tractor volume. Rerouting suggested via NH61.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'settings':
                return (
                    <div className="flex-1 m-4 glass-panel p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-agri-500 to-transparent opacity-50"></div>
                         <BarChart3 className="text-agri-500 h-24 w-24 mb-6 opacity-20 animate-pulse" />
                         <h2 className="text-3xl font-black uppercase tracking-tighter text-white">Harvest Index Analytics</h2>
                         <p className="text-slate-400 max-w-md mt-4 text-sm font-medium">Comprehensive seasonal harvest yields are being consolidated with SAR imagery. Real-time tonnage aggregates for the <span className="text-white font-bold">2026 Rabi season</span> will be available post-government verification.</p>
                         <div className="mt-12 flex gap-4">
                            <div className="glass-card p-4 px-8">
                                <p className="text-[10px] text-slate-500 font-black uppercase">Target Yield</p>
                                <p className="text-xl font-black text-white">14.2M Tons</p>
                            </div>
                            <div className="glass-card p-4 px-8 border-agri-500/50">
                                <p className="text-[10px] text-slate-500 font-black uppercase">Verified to Date</p>
                                <p className="text-xl font-black text-agri-400">8.4M Tons</p>
                            </div>
                         </div>
                         <button onClick={() => setActiveView('dashboard')} className="mt-12 nav-btn-active px-10 py-3 text-xs uppercase font-black tracking-[0.2em]">Return to Command Center</button>
                    </div>
                );
            default:
                return (
                    <>
                        <div className="flex-1 flex flex-col overflow-hidden relative mr-4">
                            <MapUI onOpenReport={setSelectedCropId} />
                            
                            <div className="mb-4 grid grid-cols-4 gap-4">
                               {[
                                   { label: 'Total Survey Area', value: '4.21M Ha', icon: Zap, color: 'text-blue-500', trend: '+1.4%' },
                                   { label: 'Verified Crops', value: '82.4%', icon: ShieldCheck, color: 'text-agri-500', trend: '+2.1%' },
                                   { label: 'Insurance Claims', value: '1,248', icon: Info, color: 'text-orange-500', trend: '-8%' },
                                   { label: 'Alerts Active', value: '14', icon: Bell, color: 'text-red-500', trend: 'CRITICAL' }
                               ].map((stat, i) => (
                                   <motion.div 
                                     key={stat.label} 
                                     initial={{ opacity: 0, y: 10 }}
                                     animate={{ opacity: 1, y: 0 }}
                                     transition={{ delay: 0.1 * i }}
                                     className="glass-panel p-3 flex items-center gap-3 hover:bg-slate-900/40 transition-all cursor-default group"
                                   >
                                       <div className={`p-2.5 rounded-xl bg-slate-950/50 border border-slate-800 ${stat.color} group-hover:scale-110 transition-transform shadow-inner`}>
                                           <stat.icon size={18} />
                                       </div>
                                       <div className="flex-1">
                                           <div className="flex justify-between items-center mb-0.5">
                                                <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest leading-none">{stat.label}</p>
                                                <span className={`text-[7px] font-bold px-1 rounded-sm bg-slate-800 ${stat.trend.includes('+') ? 'text-agri-400' : 'text-red-400'}`}>{stat.trend}</span>
                                           </div>
                                           <p className="text-lg font-black tracking-tight leading-none text-white">{stat.value}</p>
                                       </div>
                                   </motion.div>
                               ))}
                            </div>
                        </div>
                        <AnalyticsPanel className="print:hidden" />
                    </>
                );
        }
    }

    return (
        <div className="flex bg-slate-950 text-slate-100 min-h-screen max-h-screen overflow-hidden selection:bg-agri-500/30">
            <div className="fixed inset-0 pointer-events-none opacity-20 overflow-hidden z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-agri-600/10 blur-[150px] rounded-full" />
            </div>

            <Sidebar activeView={activeView} onViewChange={(view) => { setActiveView(view); setSelectedCropId(null); }} />

            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
                <header className="h-20 flex items-center justify-between px-8 z-10 m-4 rounded-[2rem] glass-panel shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/5 print:hidden">
                    <div className="flex items-center gap-10 divide-x divide-white/5">
                        <div className="flex items-center gap-4 group cursor-pointer transition-all hover:translate-x-1">
                            <div className="h-4 w-4 bg-agri-500 rounded-full animate-pulse shadow-[0_0_25px_rgba(16,185,129,0.8)]" />
                            <div>
                                <h2 className="text-lg font-black tracking-tight uppercase text-white leading-none">Audit Command <span className="text-agri-500">•</span> AAGC-01</h2>
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em] mt-2 opacity-80">Govt of Maharashtra • GIS Division</p>
                            </div>
                        </div>
                        <div className="pl-10 flex items-center gap-10">
                            <div className="text-right">
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest opacity-60">Edge-AI Verification</p>
                                <p className="text-sm font-black text-agri-400 mt-1">ACTIVE: 124 NODES ONLINE</p>
                            </div>
                            <div className="h-12 w-12 rounded-2xl bg-slate-900/60 border border-white/5 flex items-center justify-center text-gold-500 shadow-2xl group/zap hover:scale-110 transition-transform cursor-help">
                                <Zap size={22} className="group-hover/zap:animate-pulse" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative group/search">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-hover/search:text-agri-400 transition-colors" size={20} />
                            <input 
                                type="text" 
                                placeholder="Audit Gat No. (e.g. MH-PN-124)..." 
                                className="bg-slate-950/40 border border-white/5 rounded-2xl py-3.5 pl-14 pr-8 text-xs w-[28rem] focus:outline-none focus:ring-1 focus:ring-agri-500/50 focus:border-agri-500/50 transition-all placeholder:text-slate-700 text-slate-200 transition-all shadow-inner focus:w-[32rem]"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-agri-500 uppercase tracking-tighter opacity-0 group-focus-within/search:opacity-100 transition-opacity flex items-center gap-2">
                                <ShieldCheck size={14} /> Live Auth
                            </div>
                        </div>

                        <div className="flex items-center gap-2 p-1.5 glass-card !rounded-2xl border-white/5 shadow-2xl">
                            <button className="h-10 w-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all relative group/bell">
                                <Bell size={20} className="group-hover/bell:rotate-12 transition-transform" />
                                <div className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-600 rounded-full border-2 border-slate-950 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
                            </button>
                            <div className="h-8 w-[1px] bg-white/5 mx-1" />
                            <div className="flex items-center gap-4 pl-3 pr-2 h-10 hover:bg-white/10 rounded-xl transition-all group/user cursor-pointer">
                                <div className="text-right whitespace-nowrap hidden xl:block">
                                    <p className="text-[11px] font-black leading-none text-white uppercase tracking-tight">ADMIN PORTAL</p>
                                    <p className="text-[9px] text-agri-500 font-black uppercase tracking-widest mt-1 leading-none">Authority: L-A</p>
                                </div>
                                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-agri-500 to-agri-950 flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:scale-110 transition-transform">
                                    <User size={18} className="text-white" />
                                </div>
                                <ChevronDown size={14} className="text-slate-600 group-hover:text-white transition-colors" />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 flex overflow-hidden px-4">
                    {renderContent()}
                </main>
            </div>

            <AnimatePresence>
                {showAlert && (currentTime.getSeconds() % 30 < 10) && (
                    <motion.div 
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="fixed bottom-36 right-80 z-[1500] max-w-sm glass-panel p-4 border-l-4 border-l-orange-500 shadow-2xl shadow-orange-500/20 overflow-hidden"
                    >
                        <div className="flex gap-4">
                            <div className="bg-orange-500/20 p-2 rounded-xl h-fit border border-orange-500/20">
                                <Zap className="text-orange-500 h-5 w-5 fill-current" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-black text-[10px] text-white uppercase tracking-tighter">AI AGENT: SAT-ANALYSIS ACTIVE</h4>
                                    <button onClick={() => setShowAlert(false)} className="text-slate-500 hover:text-white transition-colors">×</button>
                                </div>
                                <p className="text-[11px] text-slate-400 leading-tight font-medium">
                                    New satellite imagery for <span className="text-orange-400 font-bold uppercase tracking-tight">Vidarbha Region</span> just synced. Drought scores updated for <span className="text-white font-bold">42 DISTRICT POCKETS</span>.
                                </p>
                                <div className="mt-3 flex gap-2">
                                    <button onClick={() => setActiveView('gis')} className="px-3 py-1 bg-gradient-to-r from-orange-600 to-orange-500 text-white text-[9px] font-black rounded-lg uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-orange-600/30">Review Evidence</button>
                                    <button onClick={() => setShowAlert(false)} className="px-3 py-1 bg-slate-800 text-slate-300 text-[9px] font-black rounded-lg uppercase tracking-widest hover:bg-slate-700 transition-all border border-slate-700/50">Dismiss</button>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-1 right-1 h-3 w-3">
                             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @font-face {
                    font-family: 'Syne';
                    src: url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
                }
                h1, h2, h3, .font-black { font-family: 'Inter', sans-serif; font-weight: 800; }
                .glass-panel { transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
                .glass-panel:hover { transform: translateY(-2px); }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                
                @media print {
                    body { background: white !important; -webkit-print-color-adjust: exact !important; }
                    
                    /* Hide everything by default */
                    body > div > * { display: none !important; }
                    
                    /* Show ONLY the main content area */
                    body > div > .flex-1 { display: block !important; visibility: visible !important; }
                    
                    /* Hide Header and Sidebar specifically */
                    header, aside, .print-hidden, .analytics-panel, .sidebar, .sidebar-panel { display: none !important; visibility: hidden !important; }
                    
                    /* Force the report to fill the page */
                    .print-content { 
                        display: block !important; 
                        visibility: visible !important; 
                        position: fixed !important; 
                        left: 0 !important; 
                        top: 0 !important; 
                        width: 100% !important; 
                        height: 100% !important;
                        margin: 0 !important; 
                        padding: 30px !important;
                        background: white !important; 
                        color: black !important;
                        opacity: 1 !important;
                        z-index: 9999 !important;
                        overflow: visible !important;
                    }
                    
                    .print-content * { 
                        visibility: visible !important; 
                        color: black !important; 
                        opacity: 1 !important;
                    }

                    .glass-panel, .glass-card { 
                        background: white !important; 
                        border: 1px solid #ddd !important; 
                        box-shadow: none !important; 
                        color: black !important;
                    }

                    .text-agri-400 { color: #10b981 !important; }
                    .bg-agri-600\/20 { background: #ecfdf5 !important; }
                    .border-slate-700\/50 { border-color: #eee !important; }
                }
            `}</style>
        </div>
    );
};

export default App;




