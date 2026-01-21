import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthLayout } from './AuthLayout';
import { useGoogleLogin } from '@react-oauth/google';
import api from '../../services/api';

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address');
            setIsLoading(false);
            return;
        }

        // Password validation
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            setIsLoading(false);
            return;
        }

        // Simulate API call with realistic scenarios
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simulate 30% chance of "incorrect credentials"
        const randomOutcome = Math.random();
        if (randomOutcome < 0.3) {
            toast.error('Invalid email or password. Please try again.');
            setIsLoading(false);
            return;
        }

        // Simulate 10% chance of "account not found"
        if (randomOutcome >= 0.3 && randomOutcome < 0.4) {
            toast.error('No account found with this email address');
            setIsLoading(false);
            return;
        }

        // Simulate 5% chance of "account locked"
        if (randomOutcome >= 0.4 && randomOutcome < 0.45) {
            toast.error('Account temporarily locked. Too many failed attempts.');
            setIsLoading(false);
            return;
        }

        // Success case
        toast.success('Login successful! Welcome back.');
        setTimeout(() => {
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/map');
        }, 500);
        setIsLoading(false);
    };

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setIsLoading(true);
            try {
                // Send the access token to your backend
                const response = await api.post('auth/google/', {
                    access_token: tokenResponse.access_token,
                });
                // Assuming your backend returns a token
                const { key } = response.data;
                localStorage.setItem('authToken', key);
                localStorage.setItem('isAuthenticated', 'true');
                toast.success('Signed in with Google successfully!');
                navigate('/map');
            } catch (error) {
                console.error('Google login failed on backend:', error);
                toast.error('Google login failed. Please try again.');
            } finally {
                setIsLoading(false);
            }
        },
        onError: (errorResponse) => {
            console.error('Google login failed:', errorResponse);
            toast.error('Google login failed. Please try again.');
            setIsLoading(false);
        },
    });

    return (
        <AuthLayout>
            <div className="space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
                    <p className="text-sm text-white/60">Sign in to navigate your campus</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-xs font-semibold text-white/70 mb-2 uppercase tracking-wider">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="student@university.edu"
                                className="w-full h-12 glass-input rounded-xl pl-11 pr-4 text-sm"
                                required
                            />
                            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                        </div>
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-xs font-semibold text-white/70 mb-2 uppercase tracking-wider">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full h-12 glass-input rounded-xl pl-11 pr-12 text-sm"
                                required
                            />
                            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                            >
                                {showPassword ? (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Forgot Password */}
                    <div className="flex justify-end">
                        <button type="button" className="text-xs text-blue-400 hover:text-blue-300 font-semibold">
                            Forgot Password?
                        </button>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-12 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all duration-200 hover:scale-[1.02] disabled:hover:scale-100"
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="px-4 bg-transparent text-white/40 uppercase tracking-wider font-semibold">Or continue with</span>
                    </div>
                </div>

                {/* Google Login */}
                <button
                    onClick={() => googleLogin()}
                    disabled={isLoading}
                    className="w-full h-12 glass-card rounded-xl flex items-center justify-center gap-3 font-semibold hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 disabled:hover:bg-transparent"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z" />
                        <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z" />
                        <path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z" />
                        <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z" />
                    </svg>
                    <span>Google</span>
                </button>

                {/* Signup Link */}
                <p className="text-center text-sm text-white/60">
                    Don't have an account?{' '}
                    <button onClick={() => navigate('/signup')} className="text-blue-400 hover:text-blue-300 font-bold">
                        Sign Up
                    </button>
                </p>
            </div>
        </AuthLayout>
    );
};
