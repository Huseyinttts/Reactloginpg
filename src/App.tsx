import { useState, useEffect } from "react";
import AppNavigator from "./navigator/AppNavigator";

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="w-full min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-300">
      <div className="absolute top-4 right-4 z-50">
        <button
          type="button"
          onClick={() => setIsDark(!isDark)}
          className="px-4 py-2 bg-indigo-600 dark:bg-indigo-500 text-white font-bold rounded shadow"
        >
          {isDark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <AppNavigator />
    </div>
  );
}

export default App;