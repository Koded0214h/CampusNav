import React from 'react';
import toast from 'react-hot-toast';

interface PlaceDetailsProps {
    place: any;
    onClose: () => void;
}

export const PlaceDetails: React.FC<PlaceDetailsProps> = ({ place, onClose }) => {
    return (
        <div className="fixed bottom-0 left-0 w-full md:absolute md:top-6 md:left-88 md:w-96 md:bottom-auto h-[60vh] md:max-h-[calc(100vh-48px)] glass-effect rounded-t-[32px] md:rounded-2xl overflow-hidden flex flex-col z-[35] animate-in fade-in slide-in-from-bottom-4 md:slide-in-from-left-4 duration-300">
            <div className="relative h-48 shrink-0">
                <img
                    src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=800"
                    alt="Engineering Lecture Theater"
                    className="w-full h-full object-cover"
                />
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 md:hidden w-8 h-8 glass-card rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors z-10"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Place Image/Icon */}
                <div className="w-full h-48 md:h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-t-[32px] md:rounded-2xl overflow-hidden relative flex items-center justify-center">
                    {/* If you want to use an image, uncomment and adjust: */}
                    {/* {place.imageUrl ? (
                        <img
                            src={place.imageUrl}
                            alt={place.name}
                            className="w-full h-full object-cover"
                        />
                    ) : ( */}
                    <div className="absolute inset-0 flex items-center justify-center text-6xl md:text-8xl">
                        {place.icon || '🏛️'}
                    </div>
                    {/* )} */}
                </div>
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
                {/* Mobile Handle for details */}
                <div className="md:hidden absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white/40 rounded-full"></div>
            </div>

            <div className="p-5 flex flex-col gap-4 overflow-y-auto">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold">{place.name || 'Unknown Place'}</h2>
                    <p className="text-sm md:text-base text-white/60">{place.type || 'Campus Location'} • {place.distance || '200m'} away</p>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="flex text-yellow-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <span key={i}>{i < Math.floor(place.rating) ? '★' : (i < place.rating ? '★' : '☆')}</span>
                            ))}
                        </div>
                        <span className="text-xs font-bold text-white/80">{place.rating.toFixed(1)}</span>
                        <span className="text-[10px] text-white/40">({place.reviewCount} reviews)</span>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            toast.success(`Getting directions to ${place.name}...`);
                            setTimeout(() => onClose(), 1500);
                        }}
                        className="flex-1 h-12 md:h-14 bg-blue-500 hover:bg-blue-600 rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                        </svg>
                        Navigate
                    </button>
                    <button
                        onClick={() => {
                            toast.success(`Saved ${place.name} to favorites!`);
                        }}
                        className="flex-1 h-12 md:h-14 glass-card rounded-xl font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Save
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                    {[
                        { label: 'Status', value: place.isOpen ? `Open Now • Closes at ${place.closesAt}` : 'Closed', icon: '🕒' },
                        { label: 'Capacity', value: place.capacity, icon: '👥' },
                        { label: 'Accessibility', value: place.accessibility, icon: '♿' },
                    ].map((item, i) => (
                        <div key={i} className="flex gap-3">
                            <div className="w-9 h-9 glass-card rounded-lg flex items-center justify-center shrink-0">
                                {item.icon}
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{item.label}</p>
                                <p className="text-xs font-medium text-white/80">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-2 mb-4">
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

