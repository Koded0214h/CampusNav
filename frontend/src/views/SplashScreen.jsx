import React from 'react';
import { useNavigate } from 'react-router-dom';

export const SplashScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#101922] min-h-screen text-[#f6f7f8] font-sans relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, #137fec 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }}></div>
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern height="100" id="grid" patternUnits="userSpaceOnUse" width="100">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#137fec" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect fill="url(#grid)" height="100%" width="100%" />
        </svg>
      </div>

      <div className="relative min-h-screen w-full flex flex-col items-center justify-between py-12 px-6">
        {/* Header */}
        <header className="w-full max-w-7xl flex justify-between items-center relative z-10 px-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#137fec]/20 rounded-lg">
              <span className="material-symbols-outlined text-[#137fec] text-2xl">account_balance</span>
            </div>
            <span className="text-[#f6f7f8] font-bold tracking-tight text-xl">State University</span>
          </div>
          <div className="text-[#f6f7f8]/40 text-sm font-medium tracking-widest uppercase">
            Interactive Map v2.4
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-col items-center justify-center relative z-10 flex-1">
          <div className="relative group">
            <div className="absolute -inset-8 bg-[#137fec]/20 blur-3xl rounded-full opacity-30"></div>
            <div className="relative flex flex-col items-center">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-[#101922] rounded-full flex items-center justify-center shadow-2xl border border-[#137fec]/20">
                <svg className="w-20 h-20 text-[#137fec]" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-[#f6f7f8] text-5xl md:text-6xl font-bold mt-8 tracking-tighter">CampusNav</h1>
              <div className="h-1 w-12 bg-[#137fec] rounded-full mt-4"></div>
              <h2 className="text-[#f6f7f8]/70 text-lg md:text-xl font-medium mt-6 max-w-md text-center leading-relaxed">
                Your path across campus, <span className="text-[#137fec] font-semibold">simplified.</span>
              </h2>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full flex flex-col items-center gap-8 relative z-10">
          <div className="flex flex-col items-center gap-4">
            <button 
              onClick={() => navigate('/sign-in')}
              className="flex min-w-[240px] group cursor-pointer items-center justify-center overflow-hidden rounded-full h-16 px-10 bg-[#137fec] text-white text-lg font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#137fec]/30"
            >
              <span className="truncate">Get Started</span>
              <span className="material-symbols-outlined ml-2 transition-transform group-hover:translate-x-1">arrow_forward</span>
            </button>
            <button 
              onClick={() => navigate('/sign-in')}
              className="text-[#f6f7f8]/50 hover:text-[#137fec] transition-colors text-sm font-medium px-4 py-2"
            >
              Visitor Access
            </button>
          </div>

          <div className="flex items-center gap-6 px-8 py-4 bg-[#101922]/50 backdrop-blur-md rounded-full border border-[#f6f7f8]/10 shadow-lg">
            <div className="flex -space-x-3">
              <div className="w-8 h-8 rounded-full border-2 border-[#101922] bg-[#1a2b3c] flex items-center justify-center overflow-hidden">
                <span className="material-symbols-outlined text-xs text-[#137fec]">person</span>
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-[#101922] bg-[#1e3a5f] flex items-center justify-center overflow-hidden">
                <span className="material-symbols-outlined text-xs text-[#137fec]">school</span>
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-[#101922] bg-[#254d85] flex items-center justify-center overflow-hidden">
                <span className="material-symbols-outlined text-xs text-[#137fec]">map</span>
              </div>
            </div>
            <div className="text-[#f6f7f8]/60 text-xs">
              Join <span className="text-[#f6f7f8] font-bold">12,400+</span> students today
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center gap-2">
            <p className="text-[#f6f7f8]/30 text-[10px] tracking-[0.2em] uppercase font-bold">Developed by University IT Services</p>
            <div className="flex gap-4 opacity-20">
              <span className="w-1 h-1 rounded-full bg-[#f6f7f8]"></span>
              <span className="w-1 h-1 rounded-full bg-[#f6f7f8]"></span>
              <span className="w-1 h-1 rounded-full bg-[#f6f7f8]"></span>
            </div>
          </div>
        </footer>

        {/* Background Blurs */}
        <div className="absolute top-1/4 -left-12 w-64 h-64 bg-[#137fec]/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-12 w-64 h-64 bg-[#137fec]/10 rounded-full blur-[100px] pointer-events-none"></div>
      </div>
    </div>
  );
};

export default SplashScreen;