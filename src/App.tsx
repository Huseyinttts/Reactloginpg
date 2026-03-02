import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import type { RootState } from "./store/store";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Register from "./screens/Register";

function App() {
  const [isDark, setIsDark] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
    
      <button 
        type="button"
        onClick={() => setIsDark(!isDark)}
        className="fixed top-4 right-4 z-50 px-4 py-2 rounded-full bg-gray-800 dark:bg-white text-white dark:text-black font-bold shadow-2xl transition-transform hover:scale-105 cursor-pointer"
      >
        {isDark ? "Light Mode" : "Dark Mode"}
      </button>

      <Routes>
        <Route path="/" element={!user ? <Login /> : <Navigate to="/home" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/home" />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;