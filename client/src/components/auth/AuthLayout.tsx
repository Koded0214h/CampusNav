import React, { ReactNode } from 'react';

interface AuthLayoutProps {
    children: ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0d1117]"></div>

            {/* Decorative Blur Orbs */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse"></div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}>
            </div>

            {/* Auth Container */}
            <div className="relative w-full max-w-md">
                <div className="glass-effect rounded-3xl p-8 md:p-10 shadow-2xl">
                    {/* CampusNav Branding */}
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">CampusNav</h1>
                            <p className="text-[10px] text-white/50 uppercase tracking-widest font-semibold">Student Navigation</p>
                        </div>
                    </div>

                    {children}
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-white/40 mt-6">
                    © 2026 CampusNav • Built for students, by students
                </p>
            </div>
        </div>
    );
};
