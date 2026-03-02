import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { loginAction } from "../store/authSlice";

const emailSchema = yup.object({
  email: yup
    .string()
    .email("Lütfen geçerli bir e-posta adresi girin.")
    .required("E-posta alanı zorunludur."),
  password: yup
    .string()
    .min(8, "Şifre en az 8 karakter olmalıdır.")
    .required("Şifre alanı zorunludur."),
});

const phoneSchema = yup.object({
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Sadece rakam girebilirsiniz.")
    .required("Telefon numarası zorunludur."),
  password: yup
    .string()
    .min(8, "Şifre en az 8 karakter olmalıdır.")
    .required("Şifre alanı zorunludur."),
});

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [type, setType] = useState<"email" | "phone">("email");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver((type === "email" ? emailSchema : phoneSchema) as any),
  });

  const onSubmitForm = (data: any) => {
    console.log("Giriş yapılıyor:", data);
    dispatch(loginAction(data));
  };

  return (
    <div className="h-screen bg-gray-500 dark:bg-neutral-900 flex items-center justify-center transition-colors duration-300">
      <div className="bg-indigo-300 dark:bg-indigo-900 p-10 shadow-2xl flex flex-col gap-6 w-96 transition-colors duration-300">
        <h2 className="text-gray-900 dark:text-white text-3xl font-bold text-center">
          Giriş Yap
        </h2>

        <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-6">
          <div className="flex bg-indigo-400/50 dark:bg-black/20 p-1 mb-4">
            <button
              type="button"
              onClick={() => setType("email")}
              className={`flex-1 py-2 text-sm font-bold transition-all ${
                type === "email"
                  ? "bg-indigo-600 dark:bg-indigo-500 text-white shadow"
                  : "text-gray-800 dark:text-gray-400 hover:text-white"
              }`}
            >
              E-posta ile giriş
            </button>
            <button
              type="button"
              onClick={() => setType("phone")}
              className={`flex-1 py-4 text-sm font-bold transition-all ${
                type === "phone"
                  ? "bg-indigo-600 dark:bg-indigo-500 text-white shadow"
                  : "text-gray-800 dark:text-gray-400 hover:text-white"
              }`}
            >
              Telefon ile Giriş
            </button>
          </div>

          {type === "email" ? (
            <div className="flex flex-col gap-1">
              <input
                type="text"
                placeholder="E-posta Adresi"
                {...register("email")}
                className="border-2 border-indigo-500 dark:border-black p-3 focus:border-indigo-800 dark:focus:border-gray-500 bg-white dark:bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none transition-all w-full"
              />
              {errors.email && (
                <span className="text-yellow-400 text-sm font-bold">
                  {String(errors.email.message)}
                </span>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <input
                type="text"
                placeholder="Telefon Numarası"
                {...register("phone")}
                className="border-2 border-indigo-500 dark:border-black p-3 focus:border-indigo-800 dark:focus:border-gray-500 bg-white dark:bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none w-full"
              />
              {errors.phone && (
                <span className="text-yellow-400 text-sm font-bold">
                  {String(errors.phone.message)}
                </span>
              )}
            </div>
          )}

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Şifre"
              {...register("password")}
              className="border-2 border-indigo-500 dark:border-black p-3 focus:border-indigo-800 dark:focus:border-gray-500 bg-white dark:bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none w-full pr-16"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white focus:outline-none"
            >
              <span className="material-icons">
                {showPassword ? "visibility" : "visibility_off"}
              </span>
            </button>
          </div>

          {errors.password && (
            <span className="text-yellow-400 text-sm font-bold -mt-4">
              {String(errors.password.message)}
            </span>
          )}

          <button
            type="submit"
            className="bg-gray-800 dark:bg-black text-white p-3 font-bold hover:bg-gray-900 dark:hover:bg-gray-800 w-full"
          >
            Giriş Yap
          </button>
          
          <p className="text-center text-gray-800 dark:text-gray-300 text-sm mt-4">
            Hesabın yok mu?{" "}
            <Link
              to="/register"
              className="text-indigo-800 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 font-bold underline"
            >
              Kayıt Ol
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;