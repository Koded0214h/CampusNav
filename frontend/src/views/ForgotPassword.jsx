import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ForgotPasswordScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }

    setLoading(true);
    setError('');
    
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="bg-[#101922] min-h-screen flex flex-col font-display text-[#f6f7f8]">
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#1a2530] p-8 rounded-2xl shadow-2xl border border-gray-700 max-w-sm w-full text-center">
            <div className="size-16 bg-green-900/30 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-[#f6f7f8]">Check your email</h3>
            <p className="text-[#f6f7f8]/70 mb-6">We've sent a password reset link to your university email address.</p>
            <button 
              onClick={() => navigate('/sign-in')}
              className="w-full bg-primary text-white h-12 rounded-lg font-bold hover:bg-[#1a8cff] transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#101922] min-h-screen flex flex-col font-display text-[#f6f7f8]">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-[#1f2937] bg-[#101922] px-6 py-3 lg:px-10">
        <div className="flex items-center gap-4 text-[#f6f7f8]">
          <div className="size-6 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z" fill="currentColor" />
              <path clipRule="evenodd" d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236Z" fill="currentColor" fillRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-tight">Campus Nav</h2>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-sm font-medium hover:text-primary transition-colors text-[#f6f7f8]" href="#">Map</a>
            <a className="text-sm font-medium hover:text-primary transition-colors text-[#f6f7f8]" href="#">Directory</a>
            <a className="text-sm font-medium hover:text-primary transition-colors text-[#f6f7f8]" href="#">Events</a>
          </nav>
          <button 
            onClick={() => navigate('/sign-in')}
            className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-wide shadow-sm hover:opacity-90 transition-opacity"
          >
            Log In
          </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
        
        <div className="w-full max-w-[480px] bg-[#1a2530] shadow-2xl rounded-xl border border-gray-700/50 p-8 md:p-10">
          <div className="flex justify-center mb-8">
            <div className="size-14 bg-primary/20 rounded-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-3xl">lock_reset</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-[#f6f7f8] text-2xl md:text-[32px] font-bold tracking-tight leading-tight mb-3">
              Forgot Password?
            </h1>
            <p className="text-[#f6f7f8]/70 text-base font-normal leading-relaxed max-w-[360px] mx-auto">
              Enter the university email address associated with your account and we'll send you a link to reset your password.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
              <span className="ml-3 text-[#f6f7f8]">Sending reset link...</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col gap-2">
                <label className="flex flex-col group">
                  <span className="text-[#f6f7f8] text-sm font-semibold leading-normal pb-2">University Email</span>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">alternate_email</span>
                    <input 
                      className="w-full min-w-0 resize-none overflow-hidden rounded-lg text-white border border-gray-600 bg-[#253241] h-14 pl-12 pr-4 placeholder:text-gray-500 text-base font-normal leading-normal transition-all focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none" 
                      placeholder="name@university.edu" 
                      required 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </label>
              </div>

              <div className="pt-2">
                <button 
                  className="w-full flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-6 bg-[#137fec] text-[#f6f7f8] text-base font-bold leading-normal tracking-wide shadow-lg shadow-primary/20 hover:bg-[#1a8cff] active:scale-[0.98] transition-all" 
                  type="submit"
                >
                  <span className="truncate">Send Reset Link</span>
                  <span className="material-symbols-outlined ml-2 text-xl">arrow_forward</span>
                </button>
              </div>
            </form>
          )}

          <div className="mt-10 pt-6 border-t border-gray-700/50 text-center">
            <button 
              onClick={() => navigate('/sign-in')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#f6f7f8]/70 hover:text-primary transition-colors group"
            >
              <span className="material-symbols-outlined text-lg transition-transform group-hover:-translate-x-1">arrow_back</span>
              Back to Login
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-[#f6f7f8]/60 max-w-[400px]">
          <p>Need immediate assistance? Contact the University IT Support Desk at <span className="font-medium text-primary cursor-pointer hover:underline">support@campusnav.edu</span></p>
        </div>
      </main>
    </div>
  );
};

export default ForgotPasswordScreen;