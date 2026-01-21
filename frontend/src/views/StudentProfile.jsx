import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

export const StudentProfileScreen = () => {
  const navigate = useNavigate();
  const [userData] = useState(authService.getCurrentUser());

  return (
    <div className="min-h-screen bg-page-bg text-text-light">
      <nav className="sticky top-0 z-50 bg-[#161f2b] border-b border-[#242f3d] px-6 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-gray-800 rounded-full text-gray-300 transition-colors mr-2"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="bg-primary p-1.5 rounded-lg shadow-sm">
            <span className="material-symbols-outlined text-white text-2xl">school</span>
          </div>
          <div>
            <h1 className="font-bold text-xl tracking-tight leading-tight text-text-light">CampusNav</h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">Student Profile</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-[#101922] rounded-full px-4 py-2 border border-[#242f3d]">
            <span className="material-symbols-outlined text-slate-500 text-sm mr-2">search</span>
            <input 
              className="bg-transparent border-none focus:ring-0 p-0 text-sm w-64 placeholder:text-slate-500 text-text-light" 
              placeholder="Search buildings, rooms..." 
              type="text"
            />
          </div>
          <button className="p-2 rounded-full hover:bg-slate-800 text-slate-300">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="h-8 w-px bg-[#242f3d]"></div>
          <img 
            alt="Student Profile Picture" 
            className="w-10 h-10 rounded-full border-2 border-primary object-cover" 
            src="/profile.png"
          />
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card-bg rounded-2xl p-6 shadow-xl border border-[#242f3d]">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img 
                    alt="Large Profile Picture" 
                    className="w-24 h-24 rounded-2xl border-4 border-[#242f3d] shadow-2xl object-cover" 
                    src="/profile.png"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-card-bg"></div>
                </div>
                <h2 className="text-xl font-bold text-text-light">{userData?.first_name} {userData?.last_name}</h2>
                <p className="text-slate-400 text-sm font-medium">{userData?.department} • {userData?.year_of_study}</p>
                <div className="mt-2 inline-flex items-center px-3 py-1 bg-[#101922] rounded-full">
                  <span className="text-[11px] font-mono text-text-light">ID: {userData?.student_id}</span>
                </div>
              </div>

              <div className="mt-8 space-y-1">
                <a className="flex items-center gap-3 p-3 rounded-xl text-primary font-semibold transition-all border-l-4 border-primary bg-primary/15" href="#">
                  <span className="material-symbols-outlined">person</span>
                  <span className="text-text-light">My Profile</span>
                </a>
                <a className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#101922] text-text-light transition-all" href="#">
                  <span className="material-symbols-outlined text-primary">rate_review</span>
                  <span>My Reviews</span>
                  <span className="ml-auto text-xs font-bold bg-[#242f3d] px-2 py-0.5 rounded-full text-text-light">12</span>
                </a>
                <a className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#101922] text-text-light transition-all" href="#">
                  <span className="material-symbols-outlined text-primary">bookmark</span>
                  <span>Saved Places</span>
                </a>
                <a className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#101922] text-text-light transition-all" href="#">
                  <span className="material-symbols-outlined text-primary">campaign</span>
                  <span>Campus Alerts</span>
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-[#242f3d]">
                <div className="mb-4 space-y-2">
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <span className="material-symbols-outlined text-primary">email</span>
                    <span>{userData?.university_email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <span className="material-symbols-outlined text-primary">phone</span>
                    <span>{userData?.phone_number}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <span className="material-symbols-outlined text-primary">person</span>
                    <span>@{userData?.username}</span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    authService.logout();
                    navigate('/sign-in');
                  }}
                  className="flex items-center gap-3 p-3 w-full text-slate-400 hover:text-red-400 transition-colors"
                >
                  <span className="material-symbols-outlined">logout</span>
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </div>

            <div className="bg-primary/5 rounded-2xl p-5 border border-primary/20">
              <h3 className="text-primary font-bold text-sm uppercase tracking-wider mb-4">Nav Activity</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-primary">124</p>
                  <p className="text-xs text-slate-400 uppercase font-bold">Places Visited</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">48km</p>
                  <p className="text-xs text-slate-400 uppercase font-bold">Total Walks</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="text-2xl font-bold tracking-tight text-text-light">Recent Activity</h3>
              <div className="flex gap-2">
                <button className="bg-card-bg p-2 rounded-lg border border-[#242f3d] shadow-sm flex items-center gap-2 px-3 text-sm font-medium hover:bg-[#242f3d] text-text-light transition-colors">
                  <span className="material-symbols-outlined text-sm">filter_list</span>
                  Filter
                </button>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="bg-primary text-white p-2 rounded-lg shadow-sm flex items-center gap-2 px-4 text-sm font-semibold hover:bg-blue-600 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">map</span>
                  Open Map
                </button>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="bg-card-bg p-5 rounded-2xl shadow-sm border border-[#242f3d] flex items-start gap-4 group cursor-pointer hover:border-primary/50 transition-all">
                <div className="bg-primary/15 p-3 rounded-xl group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-primary">rate_review</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-text-light">Reviewed "Engineering Lecture Theater 2"</h4>
                    <span className="text-xs text-slate-500 font-medium">2 days ago</span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                    <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                    <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                    <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                    <span className="material-symbols-outlined text-slate-600 text-sm">star</span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    "Bring a jacket! 🥶 The AC is freezing even in summer. Also, the vending machine outside eats dollar bills."
                  </p>
                </div>
                <span className="material-symbols-outlined text-slate-600">chevron_right</span>
              </div>

              <div className="bg-card-bg p-5 rounded-2xl shadow-sm border border-[#242f3d] flex items-start gap-4 group cursor-pointer hover:border-primary/50 transition-all">
                <div className="bg-primary/15 p-3 rounded-xl group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-text-light">New Saved Place: Student Union</h4>
                    <span className="text-xs text-slate-500 font-medium">1 week ago</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 bg-green-900/30 text-green-400 rounded-full font-bold">Open</span>
                    <span className="text-xs text-slate-500">• Very Busy • 0.6 mi away</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-600">chevron_right</span>
              </div>

              <div className="bg-card-bg p-5 rounded-2xl shadow-sm border border-[#242f3d] flex items-start gap-4 group cursor-pointer hover:border-primary/50 transition-all">
                <div className="bg-primary/15 p-3 rounded-xl group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-primary">warning</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-text-light">Campus Alert: Construction</h4>
                    <span className="text-xs text-slate-500 font-medium">5 hours ago</span>
                  </div>
                  <p className="text-sm text-slate-400">
                    North entrance construction ongoing until 5 PM today. Please use the East Gate for access to the Library Quad.
                  </p>
                </div>
                <span className="material-symbols-outlined text-slate-600">chevron_right</span>
              </div>
            </div>

            <div className="mt-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold tracking-tight text-text-light">Your Helpful Tips</h3>
                <a className="text-primary text-sm font-bold hover:underline" href="#">See All Activity</a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0c131a] text-text-light p-6 rounded-3xl relative overflow-hidden group border border-[#242f3d]">
                  <div className="relative z-10">
                    <span className="material-symbols-outlined text-primary text-3xl mb-4">bolt</span>
                    <h4 className="font-bold text-lg mb-2">Shortcuts Master</h4>
                    <p className="text-slate-400 text-sm">You've shared 5 shortcuts that saved students over 200 hours of walking time!</p>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>
                </div>
                <div className="bg-primary text-white p-6 rounded-3xl relative overflow-hidden group">
                  <div className="relative z-10">
                    <span className="material-symbols-outlined text-white text-3xl mb-4">emoji_events</span>
                    <h4 className="font-bold text-lg mb-2">Top Contributor</h4>
                    <p className="text-blue-100 text-sm">You are in the top 5% of reviewers in the Science faculty this semester.</p>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileScreen;