import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SignUpScreen = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    university_email: '',
    password: '',
    phone_number: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!formData.first_name || !formData.username || !formData.university_email || !formData.password) {
    //   setError('Please fill in all required fields');
    // }

    // setLoading(true);
    // setError('');
    // try {
    //   await authService.register(formData);
    //   setSuccess('Account created successfully! Redirecting...');
    // } catch (err) {
    //   setError(err.message || 'Failed to create account');
    // } finally {
    //   setLoading(false);
      navigate('/dashboard');
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 antialiased bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-blue-500 text-white rounded-2xl mb-6 shadow-[0_0_30px_rgba(19,127,236,0.3)]">
            <span className="material-symbols-outlined text-3xl">map</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Join CampusNav</h1>
          <p className="text-slate-400 font-medium">Create your account to start exploring</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 ml-1">
                    First Name *
                  </label>
                  <input 
                    className="w-full bg-white/10 border border-white/20 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl py-3 px-4 text-white font-medium placeholder:text-slate-500 transition-all outline-none" 
                    placeholder="John" 
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 ml-1">
                    Last Name
                  </label>
                  <input 
                    className="w-full bg-white/10 border border-white/20 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl py-3 px-4 text-white font-medium placeholder:text-slate-500 transition-all outline-none" 
                    placeholder="Doe" 
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Username */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 ml-1">
                  Username *
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">person</span>
                  <input 
                    className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl text-white font-medium placeholder:text-slate-500 transition-all outline-none" 
                    placeholder="johndoe" 
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 ml-1">
                  University Email *
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">mail</span>
                  <input 
                    className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl text-white font-medium placeholder:text-slate-500 transition-all outline-none" 
                    placeholder="john@university.edu" 
                    type="email"
                    name="university_email"
                    value={formData.university_email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 ml-1">
                  Phone Number
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">phone</span>
                  <input 
                    className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl text-white font-medium placeholder:text-slate-500 transition-all outline-none" 
                    placeholder="+1 (555) 123-4567" 
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 ml-1">
                  Password *
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">lock</span>
                  <input 
                    className="w-full pl-11 pr-12 py-3 bg-white/10 border border-white/20 focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl text-white font-medium placeholder:text-slate-500 transition-all outline-none" 
                    placeholder="Create a strong password" 
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="button"
                className="w-full bg-gradient-to-r from-primary to-blue-500 hover:from-primary/90 hover:to-blue-500/90 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-[0.98] flex items-center justify-center gap-2 group mt-8"
                onClick={() => {
                  console.log('Signup button clicked');
                  window.location.href = '/dashboard';
                }}
              >
                Create Account
                <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </form>

          {/* Divider */}
          <div className="relative py-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase font-bold tracking-wider">
              <span className="bg-white/5 px-4 text-slate-500">Already have an account?</span>
            </div>
          </div>

          {/* Sign In Link */}
          <button 
            onClick={() => navigate('/sign-in')}
            className="w-full text-primary font-bold hover:text-blue-400 transition-colors py-2"
          >
            Sign In Instead
          </button>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-slate-500 text-sm">
          By creating an account, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default SignUpScreen;