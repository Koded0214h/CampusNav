import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SignInScreen = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate('/active-search');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 antialiased" style={{ backgroundColor: '#101922' }}>
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 text-white rounded-2xl mb-6" style={{ backgroundColor: '#137fec', boxShadow: '0 0 30px rgba(19, 127, 236, 0.3)' }}>
            <span className="material-symbols-outlined text-4xl">map</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2" style={{ color: '#f6f7f8' }}>CampusNav</h1>
          <p className="text-slate-400 font-medium">Precision navigation for the modern campus</p>
        </div>

        <div className="rounded-[2rem] p-10 border shadow-2xl" style={{ backgroundColor: '#1a242d', borderColor: 'rgb(30 41 59)' }}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest ml-1" style={{ color: '#f6f7f8', opacity: 0.6 }} htmlFor="email">
                University Email
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors">mail</span>
                <input 
                  className="w-full pl-12 pr-4 py-4 border rounded-2xl transition-all outline-none placeholder:text-slate-600" 
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#f6f7f8'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#137fec';
                    e.target.style.boxShadow = '0 0 0 2px rgba(19, 127, 236, 0.4)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                  id="email" 
                  placeholder="name@university.edu" 
                  required 
                  type="email"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="block text-[10px] font-bold uppercase tracking-widest" style={{ color: '#f6f7f8', opacity: 0.6 }} htmlFor="password">
                  Password
                </label>
                <button 
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="text-xs font-semibold hover:text-blue-400 transition-colors"
                  style={{ color: '#137fec' }}
                >
                  Forgot?
                </button>
              </div>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors">lock</span>
                <input 
                  className="w-full pl-12 pr-12 py-4 border rounded-2xl transition-all outline-none placeholder:text-slate-600" 
                  style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#f6f7f8'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#137fec';
                    e.target.style.boxShadow = '0 0 0 2px rgba(19, 127, 236, 0.4)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = 'none';
                  }}
                  id="password" 
                  placeholder="••••••••" 
                  required 
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors" 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <button 
              className="w-full text-white font-bold py-4 rounded-2xl shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 group mt-8" 
              style={{ 
                backgroundColor: '#137fec',
                boxShadow: '0 0 0 0 rgba(19, 127, 236, 0.2)'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1589ff'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#137fec'}
              type="submit"
            >
              Sign In
              <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }} />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.2em]">
                <span className="px-4 text-slate-500" style={{ backgroundColor: '#1a242d' }}>Fast Connect</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                className="flex items-center justify-center gap-2 px-4 py-3.5 border rounded-2xl hover:bg-white/5 transition-colors group" 
                style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
                type="button"
              >
                <span className="material-symbols-outlined text-white/80 group-hover:text-white text-xl">google</span>
                <span className="text-sm font-semibold text-slate-300">Google</span>
              </button>
              <button 
                className="flex items-center justify-center gap-2 px-4 py-3.5 border rounded-2xl hover:bg-white/5 transition-colors group" 
                style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
                type="button"
              >
                <span className="material-symbols-outlined text-white/80 group-hover:text-white text-xl">ios</span>
                <span className="text-sm font-semibold text-slate-300">Apple</span>
              </button>
            </div>
          </form>
        </div>

        <p className="mt-10 text-center text-slate-400 text-sm">
          New to the campus network?{' '}
          <button 
            onClick={() => navigate('/sign-up')}
            className="font-bold hover:text-blue-400 transition-colors"
            style={{ color: '#137fec' }}
          >
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInScreen;