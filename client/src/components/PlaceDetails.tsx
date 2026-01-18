import React from 'react';

export const PlaceDetails: React.FC = () => {
    return (
        <div className="absolute top-6 left-88 w-96 max-h-[calc(100vh-48px)] glass-effect rounded-2xl overflow-hidden flex flex-col z-20 animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="relative h-48">
                <img
                    src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=800"
                    alt="Engineering Lecture Theater"
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                    <button className="w-8 h-8 glass-card rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </button>
                </div>
                <div className="absolute bottom-4 left-4 glass-card px-2 py-1 rounded bg-black/40 text-[10px] flex items-center gap-1">
                    <span>📷</span> 8 Photos
                </div>
            </div>

            <div className="p-5 flex flex-col gap-4 overflow-y-auto">
                <div>
                    <h2 className="text-xl font-bold">Engineering Lecture Theater 2</h2>
                    <p className="text-xs text-white/50 mt-1">Building 4 • Level 2 • Room 204</p>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="flex text-yellow-500">
                            {['★', '★', '★', '★', '☆'].map((s, i) => <span key={i}>{s}</span>)}
                        </div>
                        <span className="text-xs font-bold text-white/80">4.5</span>
                        <span className="text-[10px] text-white/40">(128 reviews)</span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button className="flex-1 h-11 bg-blue-500 rounded-xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-blue-500/20">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                        </svg>
                        Navigate Here
                    </button>
                    <button className="w-11 h-11 glass-card rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    {[
                        { label: 'Open Now', value: 'Closes at 10:00 PM', icon: '🕒' },
                        { label: 'Capacity', value: '250 Seats • Lecture Style', icon: '👥' },
                        { label: 'Accessibility', value: 'Wheelchair accessible via North Lift', icon: '♿' },
                    ].map((item, i) => (
                        <div key={i} className="flex gap-3">
                            <div className="w-8 h-8 glass-card rounded-lg flex items-center justify-center shrink-0">
                                {item.icon}
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{item.label}</p>
                                <p className="text-xs font-medium text-white/80">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-2">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-bold">Student Tips</h3>
                        <button className="text-[10px] font-bold text-blue-400">View All</button>
                    </div>

                    <div className="flex flex-col gap-2">
                        {[
                            { author: 'Sophomore12', text: 'Bring a jacket! ❄️ The AC is freezing even in summer.', date: '2 days ago' },
                            { author: 'EngStudent', text: 'Best seats are in the back row near the outlets! ⚡', date: '1 week ago' },
                        ].map((tip, i) => (
                            <div key={i} className="glass-card rounded-xl p-3">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-[10px] font-bold text-blue-400">{tip.author}</span>
                                    <span className="text-[9px] text-white/30">{tip.date}</span>
                                </div>
                                <p className="text-[11px] text-white/80 leading-relaxed">{tip.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
