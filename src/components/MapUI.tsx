import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MAHARASHTRA_CROP_SAMPLES } from '../lib/mockData';
import { Target, Satellite as SatelliteIcon, Wind, Loader2 } from 'lucide-react';

interface MapUIProps {
    onOpenReport: (id: string) => void;
}

const getCustomIcon = (color: string) => L.divIcon({
    className: 'custom-div-icon',
    html: `<div class="relative flex items-center justify-center">
            <div class="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style="background-color: ${color}"></div>
            <div class="relative inline-flex rounded-full h-3 w-3 border-2 border-white shadow-lg shadow-black/50" style="background-color: ${color}"></div>
           </div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6]
});

const MapUpdater: React.FC<{ mode: string }> = ({ mode }) => {
    const map = useMap();
    useEffect(() => {
        map.flyTo(map.getCenter(), map.getZoom(), { animate: true, duration: 1 });
    }, [mode, map]);
    return null;
}

export const MapUI: React.FC<MapUIProps> = ({ onOpenReport }) => {
    const [mapMode, setMapMode] = useState<'standard' | 'ndvi' | 'yield'>('standard');
    const [isScanning, setIsScanning] = useState(false);
    
    const changeMode = (newMode: 'standard' | 'ndvi' | 'yield') => {
        if (newMode === mapMode) return;
        setIsScanning(true);
        setTimeout(() => {
            setMapMode(newMode);
            setIsScanning(false);
        }, 1200);
    }

    const center: [number, number] = [19.7515, 75.7139]; 

    const getModeColor = (sample: typeof MAHARASHTRA_CROP_SAMPLES[0]) => {
        if (mapMode === 'ndvi') {
            const health = sample.health;
            if (health > 0.8) return '#166534'; 
            if (health > 0.6) return '#22c55e'; 
            if (health > 0.4) return '#f59e0b'; 
            return '#ef4444'; 
        }
        
        if (mapMode === 'yield') {
            const yieldVal = sample.yield;
            if (yieldVal > 400) return '#3b82f6'; 
            if (yieldVal > 200) return '#6366f1'; 
            return '#818cf8'; 
        }

        switch(sample.status) {
            case 'Optimal': return '#10b981';
            case 'Stressed': return '#ef4444';
            case 'Ready': return '#f59e0b';
            case 'Harvested': return '#3b82f6';
            default: return '#94a3b8';
        }
    }

    return (
        <div className="flex-1 relative m-4 glass-panel overflow-hidden border-0 satellite-scan">
            <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2">
                <div className="glass-card flex p-1 shadow-2xl overflow-hidden relative border-slate-700/50">
                    {isScanning && (
                        <div className="absolute inset-0 bg-agri-500/10 flex items-center justify-center backdrop-blur-[2px] z-10 transition-all">
                             <div className="flex items-center gap-2">
                                 <Loader2 className="animate-spin h-3 w-3 text-agri-400" />
                                 <span className="text-[10px] uppercase font-black tracking-widest text-agri-400">Atmospheric Correction...</span>
                             </div>
                        </div>
                    )}
                    <button 
                        onClick={() => changeMode('standard')}
                        disabled={isScanning}
                        className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all uppercase tracking-[0.2em] flex items-center gap-2 ${mapMode === 'standard' ? 'bg-agri-600/30 text-white border border-agri-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'text-slate-400 hover:bg-white/5 border border-transparent'}`}
                    >
                        <SatelliteIcon size={12} /> GIS Audit
                    </button>
                    <button 
                        onClick={() => changeMode('ndvi')}
                        disabled={isScanning}
                        className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all uppercase tracking-[0.2em] flex items-center gap-2 ${mapMode === 'ndvi' ? 'bg-green-500/30 text-white border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'text-slate-400 hover:bg-white/5 border border-transparent'}`}
                    >
                        <Wind size={12} /> NDVI Health
                    </button>
                    <button 
                         onClick={() => changeMode('yield')}
                         disabled={isScanning}
                         className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all uppercase tracking-[0.2em] flex items-center gap-2 ${mapMode === 'yield' ? 'bg-blue-600/30 text-white border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'text-slate-400 hover:bg-white/5 border border-transparent'}`}
                    >
                        <Target size={12} /> Prediction
                    </button>
                </div>
            </div>

            <div className="absolute bottom-6 right-6 z-[1000] glass-card p-4 pointer-events-none min-w-[180px] border-slate-700/50 shadow-2xl">
                <div className="flex items-center gap-2 mb-3 border-b border-slate-700/30 pb-2">
                    <div className="h-1.5 w-1.5 bg-agri-500 rounded-full animate-pulse"></div>
                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">Map Intelligence</span>
                </div>
                <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-agri-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                            <span className="text-[9px] text-slate-300 font-bold uppercase tracking-tight">Optimal Crop</span>
                        </div>
                        <span className="text-[8px] text-slate-500 font-black">72%</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]" />
                            <span className="text-[9px] text-slate-300 font-bold uppercase tracking-tight">Moisture Stress</span>
                        </div>
                        <span className="text-[8px] text-slate-500 font-black">18%</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                            <span className="text-[9px] text-slate-300 font-bold uppercase tracking-tight">Yield Deficit</span>
                        </div>
                        <span className="text-[8px] text-slate-500 font-black">10%</span>
                    </div>
                </div>
            </div>

            <MapContainer 
                center={center} 
                zoom={7} 
                scrollWheelZoom={true} 
                style={{ height: '100%', width: '100%', outline: 'none' }}
                zoomControl={false}
            >
                <MapUpdater mode={mapMode} />
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                
                {MAHARASHTRA_CROP_SAMPLES.map((sample) => (
                    <React.Fragment key={sample.id}>
                        <Circle 
                            center={sample.coords as L.LatLngExpression}
                            radius={Math.sqrt(sample.area) * 200}
                            pathOptions={{ 
                                fillColor: getModeColor(sample), 
                                fillOpacity: 0.35, 
                                color: getModeColor(sample),
                                weight: 1,
                                dashArray: mapMode === 'yield' ? '5, 5' : 'none'
                             }}
                        />
                        <Marker 
                            position={sample.coords as L.LatLngExpression} 
                            icon={getCustomIcon(getModeColor(sample))}
                        >
                            <Popup closeButton={false} offset={[0, -10]}>
                                <div className="min-w-[140px] text-slate-100 p-1">
                                    <div className="flex items-center justify-between gap-4 mb-2">
                                        <h4 className="font-bold text-sm tracking-tight">{sample.name}</h4>
                                        <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: getModeColor(sample) }}></div>
                                    </div>
                                    
                                    <div className="space-y-1.5 border-b border-slate-700/50 pb-3 mb-2">
                                        <div className="flex justify-between text-[10px] items-center">
                                            <span className="text-slate-400">Total Hectares:</span>
                                            <span className="font-bold">{sample.area} ha</span>
                                        </div>
                                        <div className="flex justify-between text-[10px] items-center">
                                            <span className="text-slate-400">Yield Prediction:</span>
                                            <span className="font-bold text-blue-400">{sample.yield} Tons</span>
                                        </div>
                                        <div className="flex justify-between text-[10px] items-center">
                                            <span className="text-slate-400">NDVI Health:</span>
                                            <span className={`font-bold ${sample.health > 0.7 ? 'text-agri-400' : 'text-red-400'}`}>
                                                {Math.round(sample.health * 100)}%
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex justify-center">
                                        <button 
                                            onClick={() => onOpenReport(sample.id)}
                                            className="text-[9px] font-black uppercase text-agri-400 hover:text-agri-300 transition-all tracking-tighter cursor-pointer underline underline-offset-4 decoration-agri-500/30"
                                        >
                                            View Comprehensive Report
                                        </button>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    </React.Fragment>
                ))}
            </MapContainer>
        </div>
    );
};
