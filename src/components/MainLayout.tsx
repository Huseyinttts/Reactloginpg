import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/";
  
  };

  const menus = [
    { name: "Yapılacaklar", path: "/home" },
    { name: "Yeni Ekle", path: "/home/add" },
    { name: "Favoriler", path: "/home/favorites" },
    { name: "Ayarlar", path: "/home/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-neutral-800 transition-colors duration-300">
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 "
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-neutral-900 shadow-xl transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
            Ana Sayfa
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-2 p-4 flex-1">
          {menus.map((menu) => (
            <Link
              key={menu.path}
              to={menu.path}
              onClick={() => setIsOpen(false)}
              className={`p-3 rounded-lg font-medium transition-colors ${location.pathname === menu.path ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300" : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-800"}`}
            >
              {menu.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-gray-200 dark:border-neutral-700">
          <button
            onClick={() => handleLogout()}
            className="w-full flex items-center justify-center gap-2 p-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold transition-colors cursor-pointer shadow-md"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Çıkış Yap
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-screen w-full overflow-x-hidden">
        <header className="bg-white dark:bg-neutral-900 shadow-sm p-4 flex items-center">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="ml-4 text-xl font-bold text-gray-900 dark:text-white">
            Proje Yönetimi
          </h1>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
