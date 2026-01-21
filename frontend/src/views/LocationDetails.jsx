import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LocationDetailsScreen = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className={`${isDarkMode ? 'dark' : ''} bg-gray-100 dark:bg-gray-900 transition-colors duration-300`}>
      <div className="fixed inset-0 z-0">
        <img 
          alt="Campus Map Background" 
          className="w-full h-full object-cover grayscale opacity-40 dark:opacity-20" 
          src="/map.png"
        />
        <div className="absolute top-6 right-6 flex flex-col gap-3">
          <button className="bg-white dark:bg-card-dark p-3 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200">
            <span className="material-symbols-outlined">layers</span>
          </button>
          <button className="bg-white dark:bg-card-dark p-3 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
        <div className="absolute bottom-10 right-10 flex flex-col gap-3">
          <div className="flex flex-col bg-white dark:bg-card-dark rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-slate-800">
            <button className="p-3 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 border-b dark:border-slate-700">
              <span className="material-symbols-outlined">add</span>
            </button>
            <button className="p-3 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 border-b dark:border-slate-700">
              <span className="material-symbols-outlined">remove</span>
            </button>
            <button className="p-3 hover:bg-gray-50 dark:hover:bg-slate-700 text-primary">
              <span className="material-symbols-outlined">my_location</span>
            </button>
          </div>
        </div>
      </div>

      <div className="fixed top-6 left-6 z-50 flex gap-3">
        <button 
          onClick={() => navigate('/search')}
          className="bg-white dark:bg-card-dark p-3 rounded-xl shadow-lg border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors" 
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <button 
          className="bg-white dark:bg-card-dark p-3 rounded-xl shadow-lg border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-gray-200" 
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          <span className="material-symbols-outlined dark:hidden">dark_mode</span>
          <span className="material-symbols-outlined hidden dark:block">light_mode</span>
        </button>
      </div>

      <div className="fixed top-0 left-0 h-full w-full max-w-md bg-background-light dark:bg-background-dark shadow-2xl z-40 overflow-y-auto border-r border-gray-200 dark:border-slate-800" style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
        <div className="relative h-72 w-full overflow-hidden">
          <img 
            alt="Engineering Lecture Theater" 
            className="w-full h-full object-cover" 
            src="/event-hall.png"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <button className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-2.5 rounded-full transition-colors">
            <span className="material-symbols-outlined">bookmark</span>
          </button>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="bg-primary px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Building 4</span>
              <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-semibold">
                <span className="material-symbols-outlined text-[12px] text-amber-400 fill-1">star</span>
                4.5 (128)
              </div>
            </div>
            <h1 className="text-2xl font-bold leading-tight">Engineering Lecture Theater 2</h1>
          </div>
        </div>

        <div className="p-6 space-y-8">
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => navigate('/active-search')}
              className="bg-primary hover:bg-blue-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined">directions</span>
              Directions
            </button>
            <button className="bg-white dark:bg-card-dark border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all">
              <span className="material-symbols-outlined">share</span>
              Share
            </button>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">About this Facility</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              A modern, multi-tier lecture theater equipped with high-definition projection systems and integrated audio. Located in the North Wing of the Engineering Complex.
            </p>
            <div className="grid grid-cols-1 gap-4 pt-2">
              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary transition-colors group-hover:bg-blue-100">
                  <span className="material-symbols-outlined">groups</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Capacity</p>
                  <p className="font-bold text-gray-900 dark:text-white">200 Seats • Tiered Seating</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary transition-colors group-hover:bg-blue-100">
                  <span className="material-symbols-outlined">accessible</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Accessibility</p>
                  <p className="font-bold text-gray-900 dark:text-white">Wheelchair Accessible</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary transition-colors group-hover:bg-blue-100">
                  <span className="material-symbols-outlined">bolt</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Power</p>
                  <p className="font-bold text-gray-900 dark:text-white">Outlets at Every Seat</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Student Reviews</h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex text-amber-400">
                    <span className="material-symbols-outlined text-sm fill-1">star</span>
                    <span className="material-symbols-outlined text-sm fill-1">star</span>
                    <span className="material-symbols-outlined text-sm fill-1">star</span>
                    <span className="material-symbols-outlined text-sm fill-1">star</span>
                    <span className="material-symbols-outlined text-sm">star_half</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">4.5 average</span>
                </div>
              </div>
              <button className="bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
                Write Review
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-white dark:bg-card-dark p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-indigo-500 rounded-full flex items-center justify-center text-[11px] text-white font-bold">SM</div>
                    <div>
                      <p className="font-bold text-sm text-gray-900 dark:text-white">Sophomore12</p>
                      <p className="text-[10px] text-gray-400">Post Graduate • 2 days ago</p>
                    </div>
                  </div>
                  <div className="flex text-amber-400 scale-75 origin-right">
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined">star</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  The AC is quite strong here, so definitely bring a sweater even in summer. The acoustics are amazing though, you can hear perfectly from the back.
                </p>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1.5 text-gray-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">thumb_up</span>
                    <span className="text-xs font-bold">14</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-gray-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">chat_bubble</span>
                    <span className="text-xs font-bold">2</span>
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-card-dark p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center text-[11px] text-white font-bold">ES</div>
                    <div>
                      <p className="font-bold text-sm text-gray-900 dark:text-white">EngStudent</p>
                      <p className="text-[10px] text-gray-400">Engineering • 1 week ago</p>
                    </div>
                  </div>
                  <div className="flex text-amber-400 scale-75 origin-right">
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Highly recommend the back rows if you need power outlets. There are USB charging ports integrated into the desks there.
                </p>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-1.5 text-gray-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">thumb_up</span>
                    <span className="text-xs font-bold">32</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-gray-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-lg">chat_bubble</span>
                    <span className="text-xs font-bold">5</span>
                  </button>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 py-3 border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-xl text-gray-400 dark:text-gray-500 font-bold text-sm hover:border-primary hover:text-primary transition-all">
              Load More Reviews
            </button>
          </div>
        </div>
        <div className="h-10"></div>
      </div>
    </div>
  );
};

export default LocationDetailsScreen;