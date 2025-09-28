import "./App.css";

function App() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center gap-8">
        
        <div className="h-24 w-24 flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 shadow-lg">
          <img
            src="./src/assets/react.svg"
            alt="React Logo"
            className="h-12 w-12 animate-spin-slow"
          />
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 text-center">
          🚀 Welcome to <span className="text-blue-600">React + Vite + Tailwind</span>
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-center text-base md:text-lg max-w-md">
          Build modern, responsive, and fast web apps with ease.  
          Edit <code className="bg-gray-100 px-1 rounded">App.jsx</code> and save to see live changes.
        </p>

        {/* Install Guide */}
        <div className="w-full bg-gray-50 border border-gray-200 rounded-lg p-5 text-left shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">📦 Installation</h2>
          <p className="text-gray-600 mb-2">Run this command to install dependencies:</p>
          <pre className="bg-black text-green-400 p-3 rounded-md text-sm overflow-x-auto">
            <code>npm install</code>
          </pre>
        </div>

        <button className="mt-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition">
          Get Started
        </button>

        <footer className="text-sm text-gray-500 mt-6 text-center">
          Created by <span className="font-semibold">Vishan Chathuranga</span>
        </footer>
      </div>
    </section>
  );
}

export default App;
