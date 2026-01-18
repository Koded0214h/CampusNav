import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface MapProps {
    onPlaceSelect: (place: any) => void;
}

export const Map: React.FC<MapProps> = ({ onPlaceSelect }) => {
    const [zoomLevel, setZoomLevel] = useState(15);
    const [showLayers, setShowLayers] = useState(false);
    return (
        <div className="absolute inset-0 bg-[#0d1117] flex items-center justify-center overflow-hidden">
            {/* Abstract Map Background Pattern */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}>
            </div>

            {/* Central Marker Placeholder */}
            <div className="relative cursor-pointer" onClick={() => onPlaceSelect({ name: 'Your Location', type: 'current', icon: '📍' })}>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 glass-card px-3 py-1 rounded-lg whitespace-nowrap text-xs font-bold ring-1 ring-blue-500/50">
                    You are here
                </div>
            </div>

            {/* Floating Controls */}
            <div className="absolute top-4 md:top-6 right-4 md:right-6 flex items-center gap-2 md:gap-3">
                <button
                    onClick={() => {
                        setShowLayers(!showLayers);
                        toast.success(showLayers ? 'Layers hidden' : 'Showing all layers');
                    }}
                    className="h-8 px-3 md:h-10 md:px-4 glass-card rounded-xl flex items-center gap-2 text-xs md:text-sm font-medium hover:bg-white/10 transition-colors"
                >
                    <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span className="hidden sm:inline">Layers</span>
                </button>
                <button
                    onClick={() => toast('Settings coming soon!')}
                    className="h-8 w-8 md:h-10 md:w-10 glass-card rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
                <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl overflow-hidden glass-card ring-2 ring-white/10">
                    <img src="https://ui-avatars.com/api/?name=User&background=3b82f6&color=fff" alt="User" />
                </div>
            </div>

            <div className="absolute bottom-6 md:bottom-10 right-4 md:right-8 flex flex-col gap-2 md:gap-3">
                <div className="flex flex-col glass-card rounded-xl overflow-hidden backdrop-blur-xl">
                    <button
                        onClick={() => {
                            setZoomLevel(Math.min(zoomLevel + 1, 20));
                            toast.success('Zoomed in');
                        }}
                        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center hover:bg-white/10 transition-colors border-b border-white/5 font-bold text-lg md:text-xl"
                    >
                        +
                    </button>
                    <button
                        onClick={() => {
                            setZoomLevel(Math.max(zoomLevel - 1, 10));
                            toast.success('Zoomed out');
                        }}
                        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center hover:bg-white/10 transition-colors font-bold text-lg md:text-xl"
                    >
                        −
                    </button>
                </div>
                <button
                    onClick={() => {
                        toast.success('Centering on your location...');
                        setTimeout(() => onPlaceSelect({ name: 'Your Location', type: 'current', icon: '📍' }), 500);
                    }}
                    className="w-10 h-10 md:w-12 md:h-12 glass-card rounded-xl flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </button>
            </div>

            <button
                onClick={() => toast('Quick add location coming soon!')}
                className="absolute bottom-6 md:bottom-10 right-16 md:right-24 w-12 h-12 md:w-14 md:h-14 bg-blue-500 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/40 hover:scale-105 transition-transform"
            >
                <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            </button>
        </div>
    );
};
