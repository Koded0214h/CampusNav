import React, { useMemo } from 'react';
import toast from 'react-hot-toast';
import { getLocationTypeDetails } from '../utils/locationUtils';

interface PlaceDetailsProps {
    place: any;
    onClose: () => void;
    onNavigate?: () => void;
}

// Helper to generate consistent mock data based on place ID/Name
const getMockDetails = (place: any) => {
    // simple hash to get semi-random but consistent numbers
    const hash = place.name.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
    
    return {
        rating: (3 + (hash % 20) / 10).toFixed(1), // 3.0 to 5.0
        reviewCount: 10 + (hash % 100),
        capacity: 20 + (hash % 200),
        isOpen: hash % 2 === 0,
        closesAt: '10:00 PM',
        accessibility: hash % 3 === 0 ? 'Limited' : 'Wheelchair Accessible',
        distance: `${100 + (hash % 900)}m`,
        tips: [
             { author: 'Student_' + (hash % 99), text: 'Great spot for quiet study.', date: '2 days ago' },
             { author: 'CampusExplorer', text: 'Gets busy around noon.', date: '1 week ago' },
        ]
    };
};

export const PlaceDetails: React.FC<PlaceDetailsProps> = ({ place, onClose, onNavigate }) => {
    const typeDetails = getLocationTypeDetails(place.type);
    const details = useMemo(() => getMockDetails(place), [place]);
    // Merge passed place data with mock details (real data takes precedence if it existed)
    const fullPlace = { ...details, ...place };

    return (
        <div className="fixed bottom-0 left-0 w-full md:absolute md:top-6 md:left-84 md:w-96 md:bottom-auto h-[60vh] md:max-h-[calc(100vh-48px)] glass-effect rounded-t-[32px] md:rounded-2xl overflow-hidden flex flex-col z-[35] animate-in fade-in slide-in-from-bottom-4 md:slide-in-from-left-4 duration-300 shadow-2xl shadow-black/50 border border-white/10">
            <div className="relative h-48 shrink-0">
                {/* Dynamic Header Background */}
                <div 
                    className="w-full h-full absolute inset-0"
                    style={{ 
                        background: `linear-gradient(to bottom right, ${typeDetails.color}40, #0d1117)`,
                    }}
                >
                     {/* Pattern overlay */}
                    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                </div>

                {/* Top Action Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 z-20">
                    <button 
                        className="w-8 h-8 glass-card rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                        title="Save to favorites"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </button>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 glass-card rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors text-white/80 hover:text-white"
                        title="Close details"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Place Icon */}
                
                {/* Mobile Handle for details */}
                <div className="md:hidden absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white/40 rounded-full"></div>
            </div>

            <div className="p-5 flex flex-col gap-4 overflow-y-auto">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">{fullPlace.name || 'Unknown Place'}</h2>
                    <p className="text-sm md:text-base text-white/60 flex items-center gap-2">
                        <span>{fullPlace.distance} away</span>
                        <span>•</span>
                        <span className={fullPlace.isOpen ? "text-green-400" : "text-red-400"}>
                            {fullPlace.isOpen ? "Open Now" : "Closed"}
                        </span>
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="flex text-yellow-500 text-sm">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <span key={i}>{i < Math.floor(Number(fullPlace.rating)) ? '★' : '☆'}</span>
                            ))}
                        </div>
                        <span className="text-xs font-bold text-white/80">{fullPlace.rating}</span>
                        <span className="text-[10px] text-white/40">({fullPlace.reviewCount} reviews)</span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            toast.success(`Getting directions to ${fullPlace.name}...`);
                            if (onNavigate) onNavigate();
                            else setTimeout(() => onClose(), 1500); // Fallback
                        }}
                        className="flex-1 h-12 md:h-12 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 text-sm"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                        </svg>
                        Navigate
                    </button>
                    <button
                        onClick={() => {
                            toast.success(`Saved ${fullPlace.name} to favorites!`);
                        }}
                        className="flex-1 h-12 md:h-12 glass-card rounded-xl font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Save
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    {[
                        { label: 'Hours', value: fullPlace.isOpen ? `Until ${fullPlace.closesAt}` : 'Opens 8 AM', icon: '🕒' },
                        { label: 'Capacity', value: `${fullPlace.capacity} Seats`, icon: '👥' },
                        { label: 'Access', value: fullPlace.accessibility, icon: '♿' },
                    ].map((item, i) => (
                        <div key={i} className="glass-card p-3 rounded-xl flex items-start gap-3">
                            <div className="text-xl">{item.icon}</div>
                            <div>
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{item.label}</p>
                                <p className="text-xs font-semibold text-white/90 leading-tight">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-2 mb-4">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-bold text-white/90">Student Tips</h3>
                        <button className="text-[10px] font-bold text-blue-400 hover:text-blue-300">View All</button>
                    </div>

                    <div className="flex flex-col gap-2">
                        {fullPlace.tips.map((tip: any, i: number) => (
                            <div key={i} className="glass-card rounded-xl p-3 border border-white/5">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-[10px] font-bold text-blue-400">{tip.author}</span>
                                    <span className="text-[9px] text-white/30">{tip.date}</span>
                                </div>
                                <p className="text-[11px] text-white/70 leading-relaxed">{tip.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

