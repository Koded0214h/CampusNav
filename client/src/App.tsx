import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Map } from './components/Map';
import { PlaceDetails } from './components/PlaceDetails';

function App() {
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
  )
}

export default App