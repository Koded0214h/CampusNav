import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

export const ActiveSearchStateScreen = () => {
  const navigate = useNavigate();
  const [user] = useState(authService.getCurrentUser());

  const handleLogout = async () => {
    await authService.logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="bg-[#0b1218] h-screen flex items-center justify-center">
        <div className="text-white text-2xl font-bold">Loading Active Search...</div>
      </div>
    );
  }

  return (
    <div className="bg-[#0b1218] text-white h-screen overflow-hidden flex">
      <aside className="w-[400px] flex flex-col bg-[#101922] border-r border-slate-800 z-20">
        <div className="p-6 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg">
              <span className="material-icons-round text-white">school</span>
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight text-white">CampusNav</h1>
              <p className="text-xs text-slate-400">Student Navigation</p>
            </div>
          </div>
          <img 
            alt="User Profile" 
            className="w-10 h-10 rounded-full border-2 border-slate-700 cursor-pointer hover:border-primary transition-colors" 
            src="/profile.png"
            onClick={() => navigate('/profile')}
          />
        </div>

        <div className="px-6 py-4 space-y-4 relative">
          <div className="relative flex flex-col gap-2">
            <div className="flex items-center gap-3 bg-slate-800/50 border border-slate-700 p-3 rounded-xl">
              <span className="material-icons-round text-slate-400 text-sm">my_location</span>
              <input className="bg-transparent border-none p-0 text-white focus:ring-0 w-full text-sm font-medium" type="text" defaultValue="Student Union" />
            </div>
            <div className="absolute left-[27px] top-[40px] bottom-[40px] w-px border-l border-dashed border-slate-600"></div>
            <div className="flex items-center gap-3 bg-slate-800/50 border border-slate-700 p-3 rounded-xl">
              <span className="material-icons-round text-primary text-sm">location_on</span>
              <input className="bg-transparent border-none p-0 text-white focus:ring-0 w-full text-sm font-medium" type="text" defaultValue="Engineering Hall" />
            </div>
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-700 p-2 rounded-lg hover:bg-slate-600 transition-colors shadow-lg">
              <span className="material-icons-round text-white text-sm">swap_vert</span>
            </button>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-primary text-white font-medium transition-all hover:bg-primary/90">
              <span className="material-icons-round text-lg">directions_walk</span>
              <span className="text-xs">Walk</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800 text-slate-300 font-medium hover:bg-slate-700 transition-all">
              <span className="material-icons-round text-lg">directions_bike</span>
              <span className="text-xs">Bike</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-800 text-slate-300 font-medium hover:bg-slate-700 transition-all">
              <span className="material-icons-round text-lg">directions_bus</span>
              <span className="text-xs">Shuttle</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 space-y-6 py-4" style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#1e293b transparent'
        }}>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">12 min</span>
              <span className="text-slate-400 font-medium">(0.6 mi)</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">Fastest Route</span>
              <span className="w-1 h-1 rounded-full bg-slate-600"></span>
              <span className="text-slate-400 text-xs">Arrival 10:45 AM</span>
            </div>
          </div>

          <div className="space-y-8 relative">
            <div className="flex gap-4 relative">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center z-10">
                  <span className="material-icons-round text-primary text-xl">north</span>
                </div>
                <div className="w-0.5 h-full bg-slate-700 absolute top-8 left-4"></div>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Head North from Student Union</p>
                <p className="text-slate-400 text-xs mt-1">Towards Central Plaza</p>
              </div>
            </div>

            <div className="flex gap-4 relative">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center z-10">
                  <span className="material-icons-round text-primary text-xl">turn_right</span>
                </div>
                <div className="w-0.5 h-full bg-slate-700 absolute top-8 left-4"></div>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Turn right towards Library Plaza</p>
                <p className="text-slate-400 text-xs mt-1">200 ft</p>
              </div>
            </div>

            <div className="ml-12 p-4 rounded-xl bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-icons-round text-primary text-sm">bolt</span>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Student Shortcut</span>
              </div>
              <p className="text-white font-medium text-sm">Cut through The Quad courtyard</p>
              <p className="text-slate-400 text-xs mt-1">Avoids crowded main walkway • Saves 2 min</p>
            </div>

            <div className="flex gap-4 relative">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center z-10">
                  <span className="material-icons-round text-primary text-xl">turn_left</span>
                </div>
                <div className="w-0.5 h-full bg-slate-700 absolute top-8 left-4"></div>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Exit Quad via North Gate</p>
                <p className="text-slate-400 text-xs mt-1">Turn left onto Engineering Walk</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center z-10">
                <span className="material-icons-round text-red-500 text-xl">location_on</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Arrive at Engineering Hall</p>
                <p className="text-slate-400 text-xs mt-1">Destination is on your right</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-slate-900/50 border-t border-slate-800 flex gap-3">
          <button className="flex-1 bg-primary text-white font-semibold py-3 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center justify-center gap-2">
            <span className="material-icons-round text-xl">navigation</span>
            Start
          </button>
          <button 
            onClick={handleLogout}
            className="px-4 bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 transition-all"
          >
            <span className="material-icons-round">logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 relative bg-[#111] overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern height="100" id="grid" patternUnits="userSpaceOnUse" width="100">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#333" strokeWidth="0.5"></path>
              </pattern>
            </defs>
            <rect fill="url(#grid)" height="100%" width="100%"></rect>
          </svg>
        </div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 1000">
          <path className="opacity-80" d="M 580 600 Q 650 500 750 450 T 950 300" fill="none" stroke="#137fec" strokeLinecap="round" strokeWidth="12" style={{
            filter: 'drop-shadow(0 0 8px rgba(19, 127, 236, 0.6))'
          }}></path>
          <path d="M 580 600 Q 650 500 750 450 T 950 300" fill="none" stroke="#fff" strokeDasharray="8 8" strokeLinecap="round" strokeWidth="2"></path>
          <circle cx="580" cy="600" fill="white" r="12" stroke="#137fec" strokeWidth="4"></circle>
          <circle cx="580" cy="600" fill="#137fec" fillOpacity="0.2" r="24"></circle>
          <g transform="translate(780, 420)">
            <circle cx="0" cy="0" fill="#137fec" r="16"></circle>
            <text fill="white" fontFamily="Material Icons Round" fontSize="16" x="-8" y="8">bolt</text>
          </g>
          <g transform="translate(360, 940)">
            <circle cx="0" cy="0" fill="#ef4444" r="16"></circle>
            <path d="M-6 -6 L6 6 M-6 6 L6 -6" stroke="white" strokeWidth="2"></path>
          </g>
        </svg>

        <div className="absolute top-6 right-6 flex gap-3">
          <button className="bg-slate-900/80 backdrop-blur-md text-white px-4 py-2.5 rounded-xl border border-slate-700/50 flex items-center gap-2 hover:bg-slate-800 transition-all">
            <span className="material-icons-round text-lg">layers</span>
            <span className="text-sm font-medium">Layers</span>
          </button>
          <button className="bg-primary text-white px-5 py-2.5 rounded-xl shadow-lg shadow-primary/30 flex items-center gap-2 hover:scale-105 transition-all">
            <span className="material-icons-round text-lg">ios_share</span>
            <span className="text-sm font-medium text-white">Share with Friend</span>
          </button>
        </div>

        <div className="absolute bottom-6 right-6 flex flex-col gap-3">
          <div className="flex flex-col bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-700/50 overflow-hidden">
            <button className="p-3 text-white hover:bg-slate-800 transition-all">
              <span className="material-icons-round">add</span>
            </button>
            <div className="h-px bg-slate-700"></div>
            <button className="p-3 text-white hover:bg-slate-800 transition-all">
              <span className="material-icons-round">remove</span>
            </button>
          </div>
          <button className="p-3 bg-white text-slate-900 rounded-xl shadow-xl hover:scale-110 transition-all flex items-center justify-center">
            <span className="material-icons-round">my_location</span>
          </button>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-4">
          <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/50 p-4 rounded-2xl flex items-start gap-4 shadow-2xl">
            <div className="bg-primary/20 p-2 rounded-lg">
              <span className="material-icons-round text-primary">campaign</span>
            </div>
            <div>
              <h4 className="text-white font-bold text-sm">Campus Alert</h4>
              <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">North entrance construction ongoing until 5 PM today. Use East Gate for access.</p>
            </div>
            <button className="text-slate-500 hover:text-white transition-colors">
              <span className="material-icons-round text-lg">close</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ActiveSearchStateScreen;