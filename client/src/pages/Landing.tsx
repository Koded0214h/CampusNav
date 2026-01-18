import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Landing: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen w-full relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0d1117]"></div>

            {/* Decorative Blur Orbs */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse"></div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}>
            </div>

            {/* Header */}
            <header className="relative z-10 px-6 md:px-12 py-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">CampusNav</h1>
                    </div>
                </div>
                <button
                    onClick={() => navigate('/login')}
                    className="glass-card px-6 py-2.5 rounded-xl font-semibold hover:bg-white/10 transition-all"
                >
                    Sign In
                </button>
            </header>

            {/* Hero Section */}
            <main className="relative z-10 flex flex-col items-center justify-center px-6 md:px-12 py-20 md:py-32">
                <div className="max-w-5xl mx-auto text-center space-y-8">
                    {/* Hero Badge */}
                    <div className="inline-flex glass-card px-4 py-2 rounded-full text-sm font-semibold text-blue-400">
                        <span>🎓</span>
                        <span className="ml-2">Built for Students, By Students</span>
                    </div>

                    {/* Hero Title */}
                    <h2 className="text-5xl md:text-7xl font-bold leading-tight">
                        Navigate Your Campus
                        <br />
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Like a Pro</span>
                    </h2>

                    {/* Hero Description */}
                    <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
                        Never get lost again. CampusNav provides real-time navigation, student shortcuts,
                        and community-powered insights to help you navigate your university with ease.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                        <button
                            onClick={() => navigate('/signup')}
                            className="w-full sm:w-auto px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-2xl font-bold shadow-lg shadow-blue-500/30 transition-all duration-200 hover:scale-105"
                        >
                            Get Started Free
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="w-full sm:w-auto px-8 py-4 glass-card rounded-2xl font-bold hover:bg-white/10 transition-all duration-200"
                        >
                            Explore Features
                        </button>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-20 md:mt-32">
                    {[
                        {
                            icon: '🗺️',
                            title: 'Smart Navigation',
                            description: 'Get directions optimized for walking between classes, buildings, and facilities.'
                        },
                        {
                            icon: '⭐',
                            title: 'Student Reviews',
                            description: 'Read authentic reviews and tips from fellow students about campus locations.'
                        },
                        {
                            icon: '🚀',
                            title: 'Fast & Accurate',
                            description: 'Find the quickest routes and discover student-only shortcuts across campus.'
                        }
                    ].map((feature, i) => (
                        <div key={i} className="glass-card rounded-2xl p-8 hover:bg-white/5 transition-all duration-300 group">
                            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-white/60 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Social Proof */}
                <div className="mt-20 md:mt-32 text-center space-y-4">
                    <p className="text-sm text-white/40 uppercase tracking-widest font-semibold">Trusted by Students</p>
                    <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
                        {['🏫 University A', '🎓 College B', '📚 Institute C', '🏛️ Academy D'].map((uni, i) => (
                            <span key={i} className="text-white/60 font-semibold">{uni}</span>
                        ))}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 px-6 md:px-12 py-8 border-t border-white/5">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
                    <p>© 2026 CampusNav • Built for students, by students</p>
                    <div className="flex gap-6">
                        <button className="hover:text-white/60 transition-colors">Privacy</button>
                        <button className="hover:text-white/60 transition-colors">Terms</button>
                        <button className="hover:text-white/60 transition-colors">Contact</button>
                    </div>
                </div>
            </footer>
        </div>
    );
};
