import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import toast from 'react-hot-toast';
import { getLocations } from '../services/api';

interface MapProps {
    onPlaceSelect: (place: any) => void;
}

const containerStyle = {
    width: '100%',
    height: '100%'
};

const defaultCenter = {
    lat: 6.6745, // Example: KNUST, Ghana (from user name inference? or random) -> Let's use generic or user's locale.
    lng: -1.5716 // Using KNUST as a placeholder or a generic campus
};

// Placeholder Map Component (The original one)
const PlaceholderMap: React.FC<{ onPlaceSelect: any, message?: string }> = ({ onPlaceSelect, message }) => {
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
            
            {message && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500/20 text-red-200 px-4 py-2 rounded-lg border border-red-500/50 z-50">
                    {message}
                </div>
            )}

            {/* Central Marker Placeholder */}
            <div className="relative cursor-pointer" onClick={() => onPlaceSelect({ name: 'Your Location', type: 'current', icon: '📍' })}>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 glass-card px-3 py-1 rounded-lg whitespace-nowrap text-xs font-bold ring-1 ring-blue-500/50">
                    You are here
                </div>
            </div>

            {/* Floating Controls (Preserved from original) */}
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
                 <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl overflow-hidden glass-card ring-2 ring-white/10">
                    <img src="https://ui-avatars.com/api/?name=User&background=3b82f6&color=fff" alt="User" />
                </div>
            </div>
        </div>
    );
};

export const Map: React.FC<MapProps> = ({ onPlaceSelect }) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey || '', // Pass empty string if undefined to avoid crash, but it will fail load
    });

    const [, setMap] = React.useState<google.maps.Map | null>(null);
    const [locations, setLocations] = useState<any[]>([]);

    useEffect(() => {
        // Fetch locations from backend
        getLocations().then(res => {
            setLocations(res.data);
        }).catch(err => {
            console.error("Failed to fetch locations", err);
            // Don't toast error on mount to avoid spam if backend is down
        });
    }, []);

    const onLoad = React.useCallback(function callback(map: google.maps.Map) {
        const bounds = new google.maps.LatLngBounds(defaultCenter);
        map.fitBounds(bounds);
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback() {
        setMap(null);
    }, []);

    if (!apiKey) {
        return <PlaceholderMap onPlaceSelect={onPlaceSelect} message="Google Maps API Key missing. Showing Placeholder." />;
    }

    if (loadError) {
        return <PlaceholderMap onPlaceSelect={onPlaceSelect} message="Error loading Google Maps. Showing Placeholder." />;
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultCenter}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                styles: [
                    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                    // ... more dark mode styles can be added
                ],
                disableDefaultUI: true, // We have custom UI
            }}
        >
            {/* Child components, such as markers, info windows, etc. */}
            {locations.map((loc: any) => (
                 <Marker
                    key={loc.id}
                    position={{ lat: loc.latitude, lng: loc.longitude }}
                    onClick={() => onPlaceSelect(loc)}
                    title={loc.name}
                 />
            ))}
            
            {/* Custom Controls Overlay (reusing the ones from placeholder) */}
            <div className="absolute top-4 md:top-6 right-4 md:right-6 flex items-center gap-2 md:gap-3">
                 <button
                    onClick={() => {
                        toast.success('Layers toggled');
                    }}
                    className="h-8 px-3 md:h-10 md:px-4 glass-card rounded-xl flex items-center gap-2 text-xs md:text-sm font-medium hover:bg-white/10 transition-colors bg-white/5 text-white"
                >
                     <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span className="hidden sm:inline">Layers</span>
                </button>
            </div>
        </GoogleMap>
    ) : (
        <div className="flex items-center justify-center h-full bg-[#0d1117] text-white">
            Loading Map...
        </div>
    );
};