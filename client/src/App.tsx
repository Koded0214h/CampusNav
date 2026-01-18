import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Welcome to CampusNav
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Navigate your campus with ease.
      </p>
      
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setCount((count) => count + 1)}
      >
        count is {count}
      </button>
      
      <div className="mt-8 p-4 bg-white rounded shadow-md">
        <p className="text-gray-500">
          Frontend: React + Tailwind CSS<br/>
          Backend: Node/Express ready at port 5000
        </p>
      </div>
    </div>
  )
}

export default App