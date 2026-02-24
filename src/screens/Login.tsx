import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const emailSchema = yup.object({
  email: yup.string()
    .email("Lütfen geçerli bir e-posta adresi girin.")
    .required("E-posta alanı zorunludur."),
  password: yup.string()
    .min(8, "Şifre en az 8 karakter olmalıdır.")
    .required("Şifre alanı zorunludur."),
});

const phoneSchema = yup.object({
  phone: yup.string()
    .matches(/^[0-9]+$/, "Sadece rakam girebilirsiniz.")
    .required("Telefon numarası zorunludur."),
  password: yup.string()
    .min(8, "Şifre en az 8 karakter olmalıdır.")
    .required("Şifre alanı zorunludur."),
});

function Login() {
  const navigate = useNavigate();
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
    console.log("veri gibi veri:", data);
    navigate("/home");
  };

 
   
      
     
      return (
    <div className="h-screen bg-neutral-900 flex items-center justify-center">
      <div className="bg-indigo-900 p-10 shadow-2xl flex flex-col gap-6 w-96">
        <h2 className="text-white text-3xl font-bold text-center">Giriş Yap</h2>

       
        <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-6">
          
          <div className="flex bg-black/20 p-1 mb-2">
            <button
              type="button"
              onClick={() => setType('email')}
              className={`flex-1 py-2 text-sm font-bold transition-all ${
                type === 'email' ? 'bg-indigo-500 text-white shadow' : 'text-gray-400 hover:text-white'
              }`}
            >
              E-posta ile giriş
            </button>
            <button
              type="button"
              onClick={() => setType('phone')}
              className={`flex-1 py-2 text-sm font-bold transition-all ${
                type === 'phone' ? 'bg-indigo-500 text-white shadow' : 'text-gray-400 hover:text-white'
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
                className="border-2 border-black p-3  focus:border-gray-800 outline-none transition-all w-full"
              />
              
              {errors.email && <span className="text-yellow-400 text-sm font-bold">{String(errors.email.message)}</span>}
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <input
                type="text"
                placeholder="Telefon Numarası (Sadece Rakam)"
                {...register("phone")} 
                className="border-2 border-black p-3  focus:border-gray-800 outline-none transition-all w-full"
              />
          
              {errors.phone && <span className="text-yellow-400 text-sm font-bold">{String(errors.phone.message)}</span>}
            </div>
          )}

          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Şifre"
              {...register("password")}
              className="border-2 border-black p-3 focus:border-gray-800 outline-none transition-all w-full pr-16"
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
          {/* Yup'tan gelen Şifre hatası varsa kutunun altında çıkar */}
          {errors.password && <span className="text-yellow-400 text-sm font-bold -mt-4">{String(errors.password.message)}</span>}

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
