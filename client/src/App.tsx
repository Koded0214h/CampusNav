import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Landing } from './pages/Landing';
import { Login } from './components/auth/Login';
import { Signup } from './components/auth/Signup';
import { Sidebar } from './components/Sidebar';
import { Map } from './components/Map';
import { PlaceDetails } from './components/PlaceDetails';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// Main Map View Component
const MainView = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0d1117] relative" onClick={() => setShowDetails(!showDetails)}>
      <Sidebar />
      <main className="flex-1 relative">
        <Map />
      </main>

      {showDetails && <PlaceDetails />}

      {/* Decorative Blur Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <MainView />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App