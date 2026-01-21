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
    // if (!formData.username || !formData.password) {
    //   setError('Please fill in all fields');
    // }

    // setLoading(true);
    // setError('');
    // try {
    //   await authService.login(formData.username, formData.password);
    // } catch (err) {
    //   setError(err.message || 'Failed to sign in');
    // } finally {
    //   setLoading(false);
      navigate('/dashboard');
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 antialiased bg-bg-main">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-2xl mb-6 shadow-[0_0_30px_rgba(19,127,236,0.3)]">
            <span className="material-symbols-outlined text-4xl">map</span>
          </div>
          <h1 className="text-4xl font-bold text-text-light tracking-tight mb-2">CampusNav</h1>
          <p className="text-slate-400 font-medium">Precision navigation for the modern campus</p>
        </div>

        <div className="bg-[#1a242d] rounded-[2rem] p-10 border border-slate-800 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#f6f7f8] opacity-60 ml-1" htmlFor="email">
                  University Email
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">mail</span>
                  <input 
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-primary/40 focus:border-primary text-[#f6f7f8] transition-all outline-none placeholder:text-slate-600" 
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
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#f6f7f8] opacity-60" htmlFor="password">
                    Password
                  </label>
                  <button 
                    type="button"
                    onClick={() => navigate('/forgot-password')}
                    className="text-xs font-semibold text-primary hover:text-blue-400 transition-colors"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">lock</span>
                  <input 
                    className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-primary/40 focus:border-primary text-[#f6f7f8] transition-all outline-none placeholder:text-slate-600" 
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
                className="w-full bg-primary hover:bg-[#1589ff] text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group mt-8" 
                type="button"
                onClick={() => {
                  console.log('Button clicked');
                  window.location.href = '/dashboard';
                }}
              >
                Sign In
                <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.2em]">
                  <span className="bg-[#1a242d] px-4 text-slate-500">Fast Connect</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  className="flex items-center justify-center gap-2 px-4 py-3.5 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors group" 
                  type="button"
                >
                  <span className="material-symbols-outlined text-white/80 group-hover:text-white text-xl">google</span>
                  <span className="text-sm font-semibold text-slate-300">Google</span>
                </button>
                <button 
                  className="flex items-center justify-center gap-2 px-4 py-3.5 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors group" 
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
            className="text-primary font-bold hover:text-[#1589ff] transition-colors"
          >
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInScreen;