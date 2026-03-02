import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../store/authSlice";
import type { RootState } from "../store/store";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutAction());

    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-indigo-600 dark:bg-neutral-800 transition-colors duration-300">
      <h1 className="text-4xl font-bold text-white dark:text-white mb-6">
        Ana Sayfa
      </h1>

      <div className="bg-white p-8 shadow-2xl  text-center flex flex-col gap-4 border dark:border-gray-700">
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Hesap Bilgileriniz:
        </p>

        <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
          {user?.email || user?.phone || "Gizemli Kullanıcı"}
        </p>

        <button
          onClick={handleLogout}
          className="mt-6 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer"
        >
          Çıkış Yap 
        </button>
      </div>
    </div>
  );
}

export default Home;
