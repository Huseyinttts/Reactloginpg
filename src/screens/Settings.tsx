import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store/store";

export default function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutAction());
    navigate("/");
  };

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-neutral-900 shadow-xl border dark:border-neutral-700">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Ayarlar</h1>
      
      <div className="flex flex-col gap-6">
        <div className="p-4 bg-gray-50 dark:bg-neutral-800  border border-gray-200 dark:border-neutral-700">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1"> Hesap</p>
          <p className="text-lg font-bold text-black">{user?.email || user?.phone}</p>
        </div>

        
    

        <button onClick={handleLogout} className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold ">
          Çıkış Yap
        </button>
      </div>
    </div>
  );
}