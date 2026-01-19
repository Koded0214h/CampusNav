import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getLocations } from '../services/api';
import { getLocationTypeDetails } from '../utils/locationUtils';

interface SidebarProps {
    onPlaceSelect: (place: any) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onPlaceSelect, searchQuery, setSearchQuery }) => {
    const navigate = useNavigate();
    const [places, setPlaces] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        toast.success('Logged out successfully');
        navigate('/login');
    };

    useEffect(() => {
        const fetchPlaces = async () => {
            setLoading(true);
            try {
                const response = await getLocations(searchQuery);
                setPlaces(response.data);
            } catch (error) {
                console.error("Error fetching places:", error);
                // toast.error("Failed to load places"); // Optional: don't annoy user if backend is down
                
                // Fallback to dummy data if backend fails (for demo purposes)
                if (searchQuery === '') { // Only populate dummy on empty search if fail
                     setPlaces([
                        {
                            id: 'd1',
                            name: 'Main Library (Demo)',
                            type: 'library',
                            latitude: 0, longitude: 0,
                            icon: '📖',
                            statusColor: 'bg-green-500',
                            status: 'Open',
                            description: 'Fallback data - Backend unreachable'
                        },
                         {
                            id: 'd2',
                            name: 'Student Union (Demo)',
                            type: 'facility',
                            latitude: 0, longitude: 0,
                             icon: '🏟️',
                             statusColor: 'bg-yellow-500',
                             status: 'Busy'
                        }
                    ]);
                }
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchPlaces();
        }, 300); // Debounce

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    return (
        <>
            {/* Mobile Handle - Only visible on small screens */}
            <div className="md:hidden fixed bottom-[40vh] left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/20 rounded-full z-40 mb-2"></div>

            <div className="fixed bottom-0 left-0 w-full h-[40vh] md:relative md:bottom-auto md:w-80 md:h-full glass-effect md:rounded-none rounded-t-[32px] p-4 md:p-6 flex flex-col gap-4 md:gap-6 z-30 overflow-y-auto md:overflow-visible">
                <div className="flex items-center justify-between md:justify-start gap-2 md:gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-lg md:text-xl font-bold tracking-tight">CampusNav</h1>
                            <p className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">Student Map & Insights</p>
                        </div>
                    </div>
                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="glass-card px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-white/10 transition-colors flex items-center gap-1.5"
                        title="Logout"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="hidden md:inline">Logout</span>
                    </button>
                </div>

                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search (e.g., 'LT 2')..."
                        className="w-full h-10 md:h-12 glass-input rounded-xl pl-9 md:pl-11 pr-4 text-xs md:text-sm"
                    />
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={() => setSearchQuery('canteen')}
                        className="flex-1 h-10 glass-card rounded-lg text-xs font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                    >
                        <span>🍴</span> Canteen
                    </button>
                    <button
                        onClick={() => setSearchQuery('printer')}
                        className="flex-1 h-10 glass-card rounded-lg text-xs font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                    >
                        <span>🖨️</span> Printers
                    </button>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-white/80">
                            {loading ? 'Searching...' : 'Places'}
                        </h2>
                        {searchQuery && !loading && (
                            <span className="text-xs text-white/50">{places.length} results</span>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3">
                        {loading ? (
                             <div className="glass-card rounded-xl p-8 text-center text-white/50 animate-pulse">Loading...</div>
                        ) : places.length > 0 ? (
                            places.map((spot, i) => (
                                <div
                                    key={spot.id || i}
                                    onClick={() => onPlaceSelect(spot)}
                                    className="glass-card rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-xl">
                                        {spot.icon || getLocationTypeDetails(spot.type || 'other').icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-bold">{spot.name}</h3>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <div className={`w-1.5 h-1.5 rounded-full ${spot.statusColor || 'bg-gray-500'}`}></div>
                                            <span className="text-[10px] text-white/50">{spot.type}</span>
                                        </div>
                                    </div>
                                    <svg className="w-4 h-4 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            ))
                        ) : (
                            <div className="glass-card rounded-xl p-8 text-center">
                                <p className="text-sm text-white/60">No places found matching "{searchQuery}"</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-auto glass-card rounded-xl p-4 border-blue-500/20 bg-blue-500/5 mb-4 md:mb-0">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-blue-400">📢</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Campus Alert</span>
                    </div>
                    <p className="text-[11px] text-white/70 leading-relaxed">
                        North entrance construction ongoing until 5 PM today. Use East Gate.
                    </p>
                </div>
            </div>
        </>
    );
};