import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [Username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("all logs");
    console.log("Kullanıcı Adı:", Username);
    console.log("Şifre:", password);
    if (password.length < 8) {
      setErrorMessage("şifre en az 8 karakter olmalıdır.");
      return;
    }
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Username);
    const isPhone = /^[0-9]{10,11}$/.test(Username);

    if (!isEmail && !isPhone) {
      setErrorMessage(
        "geçerli bir e-posta adresi veya telefon numarası girin.",
      );
      return;
    }
    navigate("/home");
  };

  return (
    <div className="h-screen bg-neutral-900 flex items-center justify-center">
      <div className="bg-indigo-900 p-10  shadow-2xl flex flex-col gap-6 w-96">
        <h2 className="text-white text-3xl font-bold text-center">Giriş Yap</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Kullanıcı Adı"
            id="username"
            name="username"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-2 border-black p-3  focus:border-gray-800 outline-none transition-all w-full"
          />

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Şifre"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-black p-3  focus:border-gray-800 outline-none transition-all w-full pr-16"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-black hover:text-gray-800 focus:outline-none"
            >
              <span className="material-icons">
                {showPassword ? "visibility" : "visibility_off"}
              </span>
            </button>
          </div>

          {errorMessage && (
            <div className="bg-yellow-400 text-black p-3  text-sm text-center font-bold mb-4">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="bg-black text-white p-3 hover:ring-amber-50 font-bold hover:bg-gray-800 transition-colors w-full"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
