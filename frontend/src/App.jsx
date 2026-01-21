import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './views/SplashScreen';
import SignUpScreen from './views/SignUp';
import SignInScreen from './views/SignIn';
import ForgotPasswordScreen from './views/ForgotPassword';
import ActiveSearchStateScreen from './views/ActiveSearchState';
import SearchMapScreen from './views/SearchMap';
import LocationDetailsScreen from './views/LocationDetails';
import StudentProfileScreen from './views/StudentProfile';

function App() {
  const [isAuthenticated] = useState(true);
  const [loading] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-text-light">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes - SplashScreen as default landing page */}
        <Route path="/" element={<SplashScreen />} />
        <Route path="/sign-in" element={<SignInScreen />} />
        <Route path="/sign-up" element={<SignUpScreen />} />
        <Route path="/forgot-password" element={<ForgotPasswordScreen />} />

        {/* Protected Routes */}
        <Route path="/search" element={<SearchMapScreen />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <SearchMapScreen /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/active-search"
          element={isAuthenticated ? <ActiveSearchStateScreen /> : <Navigate to="/sign-in" />}
        />
        
        {/* Campus Navigation Routes */}
        <Route
          path="/search"
          element={isAuthenticated ? <SearchMapScreen /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/location"
          element={isAuthenticated ? <LocationDetailsScreen /> : <Navigate to="/sign-in" />}
        />
        <Route
          path="/profile"
          element={isAuthenticated ? <StudentProfileScreen /> : <Navigate to="/sign-in" />}
        />

        {/* 404 Catch All */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
