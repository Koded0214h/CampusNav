import React, { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker, InfoWindow, Autocomplete } from '@react-google-maps/api';

const API_KEY = 'AIzaSyD0ero7ddL_MvMN0kA56cqtJYdXrlNdRCI';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 6.5244, // Lagos, Nigeria coordinates (adjust to your campus location)
  lng: 3.3792,
};

export const SearchMapScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  // Campus locations with markers
  const campusLocations = useMemo(() => [
    {
      id: 'engineering-hall-4',
      position: { lat: 6.5250, lng: 3.3800 },
      title: 'Engineering Hall 4',
      subtitle: 'West Wing • Room 204',
      category: 'academic',
      icon: 'school',
    },
    {
      id: 'central-library',
      position: { lat: 6.5240, lng: 3.3785 },
      title: 'Central Library',
      subtitle: 'Main Square • Quiet Zone',
      category: 'academic',
      icon: 'local_library',
    },
    {
      id: 'cafeteria-1',
      position: { lat: 6.5235, lng: 3.3795 },
      title: 'Main Cafeteria',
      subtitle: 'Ground Floor • Air Conditioned',
      category: 'food',
      icon: 'restaurant',
    },
    {
      id: 'student-hostel-a',
      position: { lat: 6.5255, lng: 3.3775 },
      title: 'Student Hostel A',
      subtitle: 'Male Wing • 200 Rooms',
      category: 'housing',
      icon: 'bed',
    },
    {
      id: 'fitness-center',
      position: { lat: 6.5230, lng: 3.3770 },
      title: 'Campus Fitness Center',
      subtitle: 'Gym • Sports Complex',
      category: 'sports',
      icon: 'fitness_center',
    },
  ], []);

  const onPlaceChanged = useCallback(() => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        setSelectedPlace({
          position: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
          title: place.name || place.formatted_address || 'Selected Location',
          subtitle: place.formatted_address || '',
        });

        if (map) {
          map.panTo(place.geometry.location);
          map.setZoom(17);
        }
      }
    }
  }, [autocomplete, map]);

  const onLoad = useCallback((autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  }, []);

  const onMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  const renderIcon = (iconName) => {
    const icons = {
      school: '🏫',
      local_library: '📚',
      restaurant: '🍽️',
      bed: '🏢',
      fitness_center: '💪',
    };
    return icons[iconName] || '📍';
  };

  return (
    <LoadScript
      googleMapsApiKey={API_KEY}
      libraries={['places']}
    >
      <div className="bg-[#101922] text-gray-100 h-screen overflow-hidden flex">
        <aside className="w-[420px] h-full bg-[#101922] z-20 flex flex-col border-r border-[#242f3d] shadow-2xl">
          <div className="p-6 pb-4">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#137fec] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#137fec]/20">
                  <span className="material-symbols-outlined">school</span>
                </div>
                <div>
                  <h1 className="font-bold text-xl tracking-tight text-white">CampusNav</h1>
                  <p className="text-xs text-gray-400">Navigation Mode Active</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/profile')}
                  className="p-2 hover:bg-[#1a242d] rounded-full text-gray-300 transition-colors"
                >
                  <span className="material-symbols-outlined">notifications</span>
                </button>
                <img
                  alt="User profile"
                  className="w-10 h-10 rounded-full border-2 border-[#242f3d] shadow-sm cursor-pointer hover:border-[#137fec] transition-colors"
                  src="/profile.png"
                  onClick={() => navigate('/profile')}
                />
              </div>
            </div>
            <div className="relative group">
              <Autocomplete
                onLoad={onLoad}
                onPlaceChanged={onPlaceChanged}
              >
                <input
                  className="w-full bg-[#f6f7f8] border-none focus:ring-4 focus:ring-[#137fec]/20 rounded-2xl py-4 pl-12 pr-12 text-sm text-[#101922] font-semibold transition-all outline-none"
                  placeholder="Search buildings, rooms, or cafes..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </Autocomplete>
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#137fec]">search</span>
              <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-8" style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#242f3d transparent'
          }}>
            <section className="mt-6">
              <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.15em] mb-4">Categories</h2>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigate('/location?category=cafeterias')}
                  className="flex items-center gap-3 p-3 bg-[#f6f7f8] rounded-2xl hover:bg-white transition-all transform hover:-translate-y-0.5 shadow-sm group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white shadow-inner flex items-center justify-center text-[#137fec] group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">restaurant</span>
                  </div>
                  <span className="text-sm font-bold text-[#101922]">Cafeterias</span>
                </button>
                <button
                  onClick={() => navigate('/location?category=hostels')}
                  className="flex items-center gap-3 p-3 bg-[#f6f7f8] rounded-2xl hover:bg-white transition-all transform hover:-translate-y-0.5 shadow-sm group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white shadow-inner flex items-center justify-center text-[#137fec] group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">bed</span>
                  </div>
                  <span className="text-sm font-bold text-[#101922]">Hostels</span>
                </button>
                <button
                  onClick={() => navigate('/location?category=libraries')}
                  className="flex items-center gap-3 p-3 bg-[#f6f7f8] rounded-2xl hover:bg-white transition-all transform hover:-translate-y-0.5 shadow-sm group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white shadow-inner flex items-center justify-center text-[#137fec] group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">local_library</span>
                  </div>
                  <span className="text-sm font-bold text-[#101922]">Libraries</span>
                </button>
                <button
                  onClick={() => navigate('/location?category=gyms')}
                  className="flex items-center gap-3 p-3 bg-[#f6f7f8] rounded-2xl hover:bg-white transition-all transform hover:-translate-y-0.5 shadow-sm group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white shadow-inner flex items-center justify-center text-[#137fec] group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined">fitness_center</span>
                  </div>
                  <span className="text-sm font-bold text-[#101922]">Gyms</span>
                </button>
              </div>
            </section>

            <section className="mt-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.15em]">Campus Locations</h2>
                <button className="text-xs text-[#137fec] font-bold hover:opacity-80">View All</button>
              </div>
              <div className="space-y-3">
                {campusLocations.map((location) => (
                  <div
                    key={location.id}
                    onClick={() => {
                      setSelectedMarker(location);
                      if (map) {
                        map.panTo(location.position);
                        map.setZoom(17);
                      }
                    }}
                    className="flex items-center justify-between p-4 bg-[#1a242d]/50 hover:bg-[#1a242d] rounded-2xl cursor-pointer transition-all border border-[#242f3d] hover:border-[#242f3d] group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#137fec]/10 flex items-center justify-center text-[20px] group-hover:bg-[#137fec] group-hover:scale-95 transition-all">
                        {renderIcon(location.icon)}
                      </div>
                      <div>
                        <p className="text-[15px] font-bold text-gray-100">{location.title}</p>
                        <p className="text-xs text-gray-400 font-medium">{location.subtitle}</p>
                      </div>
                    </div>
                    <button className="p-2 text-[#137fec] bg-[#137fec]/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-[20px]">directions</span>
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <div className="mt-10 p-5 bg-[#137fec]/10 border border-[#137fec]/20 rounded-2xl flex gap-4">
              <div className="w-10 h-10 bg-[#137fec]/20 rounded-full flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#137fec]">campaign</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#137fec]">Campus Alert</h4>
                <p className="text-xs text-gray-300 leading-relaxed mt-1">North entrance construction ongoing until 5 PM today. Please use East Gate.</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 relative bg-[#101922] overflow-hidden">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={16}
            onLoad={onMapLoad}
            options={{
              styles: [
                {
                  featureType: 'all',
                  elementType: 'all',
                  stylers: [{ saturation: -20 }, { lightness: -10 }],
                },
              ],
              disableDefaultUI: false,
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            {campusLocations.map((location) => (
              <Marker
                key={location.id}
                position={location.position}
                title={location.title}
                onClick={() => setSelectedMarker(location)}
                animation={window.google && window.google.maps.Animation.DROP}
                icon={{
                  path: window.google?.maps?.SymbolPath?.CIRCLE || 'circle',
                  scale: 10,
                  fillColor: location.category === 'academic' ? '#137fec' :
                            location.category === 'food' ? '#f97316' :
                            location.category === 'housing' ? '#22c55e' :
                            location.category === 'sports' ? '#eab308' : '#6b7280',
                  fillOpacity: 1,
                  strokeColor: '#ffffff',
                  strokeWeight: 2,
                }}
              />
            ))}

            {selectedPlace && (
              <Marker
                position={selectedPlace.position}
                title={selectedPlace.title}
                icon={{
                  path: window.google?.maps?.SymbolPath?.CIRCLE || 'circle',
                  scale: 12,
                  fillColor: '#ef4444',
                  fillOpacity: 1,
                  strokeColor: '#ffffff',
                  strokeWeight: 2,
                }}
              />
            )}

            {selectedMarker && (
              <InfoWindow
                position={selectedMarker.position}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div className="p-3 min-w-[200px]">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{selectedMarker.title}</h3>
                  <p className="text-xs text-gray-600 mb-2">{selectedMarker.subtitle}</p>
                  <button
                    onClick={() => navigate(`/location?place=${selectedMarker.id}`)}
                    className="w-full bg-[#137fec] hover:bg-[#0d6efd] text-white rounded-lg py-2 px-3 text-sm font-medium transition-colors"
                  >
                    Get Directions
                  </button>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>

          <div className="absolute top-6 left-6 right-6 flex justify-between pointer-events-none">
            <div></div>
            <div className="flex items-center gap-3 pointer-events-auto">
              <button className="bg-[#101922]/80 backdrop-blur-md shadow-xl px-5 py-2.5 rounded-full flex items-center gap-2 font-bold text-sm text-white hover:bg-[#101922] transition-colors border border-[#242f3d]">
                <span className="material-symbols-outlined text-[20px] text-[#137fec]">layers</span>
                Layers
              </button>
              <button className="bg-[#137fec] shadow-lg shadow-[#137fec]/30 px-6 py-2.5 rounded-full flex items-center gap-2 font-bold text-sm text-white hover:brightness-110 transition-all">
                <span className="material-symbols-outlined text-[20px]">share</span>
                Share Location
              </button>
            </div>
          </div>

          <div className="absolute bottom-8 right-8 flex flex-col gap-3">
            <button className="w-12 h-12 bg-[#101922]/90 backdrop-blur-md rounded-full shadow-2xl border border-[#242f3d] flex items-center justify-center hover:bg-[#101922] transition-colors text-gray-100">
              <span className="material-symbols-outlined">my_location</span>
            </button>
            <div className="flex flex-col bg-[#101922]/90 backdrop-blur-md rounded-2xl shadow-2xl border border-[#242f3d] overflow-hidden divide-y divide-[#242f3d]">
              <button
                onClick={() => map && map.setZoom(map.getZoom() + 1)}
                className="w-12 h-12 flex items-center justify-center hover:bg-[#1a242d] transition-colors text-gray-100"
              >
                <span className="material-symbols-outlined">add</span>
              </button>
              <button
                onClick={() => map && map.setZoom(map.getZoom() - 1)}
                className="w-12 h-12 flex items-center justify-center hover:bg-[#1a242d] transition-colors text-gray-100"
              >
                <span className="material-symbols-outlined">remove</span>
              </button>
            </div>
            <button
              onClick={() => navigate('/location')}
              className="w-16 h-16 bg-[#137fec] rounded-3xl shadow-2xl shadow-[#137fec]/40 flex items-center justify-center text-white hover:scale-105 transition-transform"
            >
              <span className="material-symbols-outlined text-4xl">directions</span>
            </button>
          </div>

          <div className="absolute bottom-8 left-8">
            <div className="flex items-center gap-4 bg-[#101922]/80 backdrop-blur-md p-1.5 rounded-2xl border border-[#242f3d]">
              <button className="px-6 py-2 bg-[#137fec] rounded-xl text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-[#137fec]/20">
                Navigating
              </button>
            </div>
          </div>
        </main>
      </div>
    </LoadScript>
  );
};

export default SearchMapScreen;