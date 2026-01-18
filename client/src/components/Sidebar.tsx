import React from 'react';

export const Sidebar: React.FC = () => {
    return (
        <div className="w-80 h-full glass-effect p-6 flex flex-col gap-6 z-10">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </div>
                <div>
                    <h1 className="text-xl font-bold tracking-tight">CampusNav</h1>
                    <p className="text-xs text-white/50 uppercase tracking-widest font-semibold">Student Map & Insights</p>
                </div>
            </div>

            <div className="relative">
                <input
                    type="text"
                    placeholder="Search (e.g., 'Harry Potter Room')..."
                    className="w-full h-12 glass-input rounded-xl pl-11 pr-4 text-sm"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

            <div className="flex gap-2">
                <button className="flex-1 h-9 glass-card rounded-lg text-xs font-medium flex items-center justify-center gap-2">
                    <span>🍴</span> Canteen
                </button>
                <button className="flex-1 h-9 glass-card rounded-lg text-xs font-medium flex items-center justify-center gap-2">
                    <span>🖨️</span> Printers
                </button>
            </div>

            <div className="flex flex-col gap-4 mt-2">
                <h2 className="text-sm font-semibold text-white/80">Popular Spots</h2>

                {[
                    { name: 'Main Library', status: 'Open • Quiet Zone', icon: '📖', statusColor: 'bg-green-500' },
                    { name: 'Student Union', status: 'Open • Busy', icon: '🏟️', statusColor: 'bg-yellow-500' },
                    { name: 'The Gym', status: 'Open • Moderate', icon: '🏋️', statusColor: 'bg-green-500' },
                ].map((spot, i) => (
                    <div key={i} className="glass-card rounded-xl p-4 flex items-center gap-4 cursor-pointer">
                        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-xl">
                            {spot.icon}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-bold">{spot.name}</h3>
                            <div className="flex items-center gap-2 mt-0.5">
                                <div className={`w-1.5 h-1.5 rounded-full ${spot.statusColor}`}></div>
                                <span className="text-[10px] text-white/50">{spot.status}</span>
                            </div>
                        </div>
                        <svg className="w-4 h-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                ))}
            </div>

            <div className="mt-auto glass-card rounded-xl p-4 border-blue-500/20 bg-blue-500/5">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-blue-400">📢</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Campus Alert</span>
                </div>
                <p className="text-[11px] text-white/70 leading-relaxed">
                    North entrance construction ongoing until 5 PM today. Use East Gate.
                </p>
            </div>
        </div>
    );
};
