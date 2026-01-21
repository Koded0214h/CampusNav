import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchMapScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-nav-bg text-gray-100 h-screen overflow-hidden flex">
      <aside className="w-[420px] h-full bg-nav-bg z-20 flex flex-col border-r border-gray-800 shadow-2xl">
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
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
                className="p-2 hover:bg-gray-800 rounded-full text-gray-300 transition-colors"
              >
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <img 
                alt="User profile" 
                className="w-10 h-10 rounded-full border-2 border-gray-800 shadow-sm cursor-pointer hover:border-primary transition-colors" 
                src="/profile.png"
                onClick={() => navigate('/profile')}
              />
            </div>
          </div>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">search</span>
            <input 
              autoFocus
              className="w-full bg-card-light border-none focus:ring-4 focus:ring-primary/20 rounded-2xl py-4 pl-12 pr-12 text-sm text-nav-bg font-semibold transition-all outline-none" 
              placeholder="Search buildings, rooms, or cafes..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-8" style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#1e293b transparent'
        }}>
          <section className="mt-6">
            <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.15em] mb-4">Categories</h2>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => navigate('/location?category=cafeterias')}
                className="flex items-center gap-3 p-3 bg-card-light rounded-2xl hover:bg-white transition-all transform hover:-translate-y-0.5 shadow-sm group"
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-inner flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">restaurant</span>
                </div>
                <span className="text-sm font-bold text-nav-bg">Cafeterias</span>
              </button>
              <button 
                onClick={() => navigate('/location?category=hostels')}
                className="flex items-center gap-3 p-3 bg-card-light rounded-2xl hover:bg-white transition-all transform hover:-translate-y-0.5 shadow-sm group"
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-inner flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">bed</span>
                </div>
                <span className="text-sm font-bold text-nav-bg">Hostels</span>
              </button>
              <button 
                onClick={() => navigate('/location?category=libraries')}
                className="flex items-center gap-3 p-3 bg-card-light rounded-2xl hover:bg-white transition-all transform hover:-translate-y-0.5 shadow-sm group"
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-inner flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">local_library</span>
                </div>
                <span className="text-sm font-bold text-nav-bg">Libraries</span>
              </button>
              <button 
                onClick={() => navigate('/location?category=gyms')}
                className="flex items-center gap-3 p-3 bg-card-light rounded-2xl hover:bg-white transition-all transform hover:-translate-y-0.5 shadow-sm group"
              >
                <div className="w-10 h-10 rounded-xl bg-white shadow-inner flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">fitness_center</span>
                </div>
                <span className="text-sm font-bold text-nav-bg">Gyms</span>
              </button>
            </div>
          </section>

          <section className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.15em]">Recent Destinations</h2>
              <button className="text-xs text-primary font-bold hover:opacity-80">Clear All</button>
            </div>
            <div className="space-y-3">
              <div 
                onClick={() => navigate('/location?place=engineering-hall-4')}
                className="flex items-center justify-between p-4 bg-gray-800/30 hover:bg-gray-800/50 rounded-2xl cursor-pointer transition-all border border-gray-800 hover:border-gray-700 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[20px]">history</span>
                  </div>
                  <div>
                    <p className="text-[15px] font-bold text-gray-100">Engineering Hall 4</p>
                    <p className="text-xs text-gray-400 font-medium">West Wing • Room 204</p>
                  </div>
                </div>
                <button className="p-2 text-primary bg-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-[20px]">directions</span>
                </button>
              </div>
              <div 
                onClick={() => navigate('/location?place=central-library')}
                className="flex items-center justify-between p-4 bg-gray-800/30 hover:bg-gray-800/50 rounded-2xl cursor-pointer transition-all border border-gray-800 hover:border-gray-700 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[20px]">history</span>
                  </div>
                  <div>
                    <p className="text-[15px] font-bold text-gray-100">Central Library</p>
                    <p className="text-xs text-gray-400 font-medium">Main Square • Quiet Zone</p>
                  </div>
                </div>
                <button className="p-2 text-primary bg-primary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-[20px]">directions</span>
                </button>
              </div>
            </div>
          </section>

          <div className="mt-10 p-5 bg-primary/10 border border-primary/20 rounded-2xl flex gap-4">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary">campaign</span>
            </div>
            <div>
              <h4 className="font-bold text-sm text-primary">Campus Alert</h4>
              <p className="text-xs text-gray-300 leading-relaxed mt-1">North entrance construction ongoing until 5 PM today. Please use East Gate.</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 relative bg-nav-bg overflow-hidden">
        <div className="absolute inset-0">
          <img 
            alt="Campus Map" 
            className="w-full h-full object-cover brightness-60 contrast-125" 
            src="/map.png"
          />
        </div>

        <div className="absolute top-6 left-6 right-6 flex justify-between pointer-events-none">
          <div></div>
          <div className="flex items-center gap-3 pointer-events-auto">
            <button className="bg-nav-bg/80 backdrop-blur-md shadow-xl px-5 py-2.5 rounded-full flex items-center gap-2 font-bold text-sm text-white hover:bg-nav-bg transition-colors border border-gray-700">
              <span className="material-symbols-outlined text-[20px] text-primary">layers</span>
              Layers
            </button>
            <button className="bg-primary shadow-lg shadow-primary/30 px-6 py-2.5 rounded-full flex items-center gap-2 font-bold text-sm text-white hover:brightness-110 transition-all">
              <span className="material-symbols-outlined text-[20px]">share</span>
              Share Location
            </button>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[35%] left-[58%] flex flex-col items-center">
            <div className="bg-nav-bg/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-2xl mb-2 border border-primary/30">
              <p className="text-[11px] font-bold text-white uppercase tracking-wider">Engineering Hall</p>
            </div>
            <div className="w-10 h-10 bg-primary rounded-full border-4 border-nav-bg shadow-2xl flex items-center justify-center glow-marker">
              <span className="material-symbols-outlined text-white text-[20px]">location_on</span>
            </div>
          </div>
          <div className="absolute top-[52%] left-[42%] flex flex-col items-center">
            <div className="w-9 h-9 bg-orange-500 rounded-full border-4 border-nav-bg shadow-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[18px]">restaurant</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 flex flex-col gap-3">
          <button className="w-12 h-12 bg-nav-bg/90 backdrop-blur-md rounded-full shadow-2xl border border-gray-700 flex items-center justify-center hover:bg-nav-bg transition-colors text-gray-100">
            <span className="material-symbols-outlined">my_location</span>
          </button>
          <div className="flex flex-col bg-nav-bg/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700 overflow-hidden divide-y divide-gray-800">
            <button className="w-12 h-12 flex items-center justify-center hover:bg-gray-800 transition-colors text-gray-100">
              <span className="material-symbols-outlined">add</span>
            </button>
            <button className="w-12 h-12 flex items-center justify-center hover:bg-gray-800 transition-colors text-gray-100">
              <span className="material-symbols-outlined">remove</span>
            </button>
          </div>
          <button 
            onClick={() => navigate('/location')}
            className="w-16 h-16 bg-primary rounded-3xl shadow-2xl shadow-primary/40 flex items-center justify-center text-white hover:scale-105 transition-transform"
          >
            <span className="material-symbols-outlined text-4xl">directions</span>
          </button>
        </div>

        <div className="absolute bottom-8 left-8">
          <div className="flex items-center gap-4 bg-nav-bg/80 backdrop-blur-md p-1.5 rounded-2xl border border-gray-700">
            <button className="px-6 py-2 bg-primary rounded-xl text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-primary/20">
              Navigating
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchMapScreen;