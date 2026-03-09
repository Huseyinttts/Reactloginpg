import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const phoneNumberSchema = (value: string) => {
  let number = value.replace(/\D/g, "");
  if (number.length === 0) return "";
  if (number[0] !== "0") number = 0 + number;
  number = number.substring(0, 11);

  let formatted = "";
  if (number.length > 0) formatted += number.substring(0, 1);
  if (number.length > 1) formatted += " (" + number.substring(1, 4);
  if (number.length > 4) formatted += ") " + number.substring(4, 7);
  if (number.length > 7) formatted += " " + number.substring(7, 9);
  if (number.length > 9) formatted += " " + number.substring(9, 11);
  return formatted;
};

const emailSchema = yup.object({
  fullName: yup.string().required("Ad Soyad zorunludur."),
  email: yup
    .string()
    .email("Geçerli bir e-posta girin.")
    .required("E-posta alanı zorunludur."),
  password: yup
    .string()
    .min(8, "Şifre en az 8 karakter olmalıdır.")
    .required("Şifre zorunludur."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Şifreler birbiriyle eşleşmiyor.")
    .required("Şifre tekrarı zorunludur."),
});

const phoneSchema = yup.object({
  fullName: yup.string().required("Ad Soyad zorunludur."),
  phone: yup
    .string()
    .required("Telefon numarası zorunludur.")
    .test("is-valid", "Lütfen 11 haneli geçerli bir numara girin.", (value) => {
      if (!value) return false;
      const numbersOnly = value.replace(/\D/g, "");
      return numbersOnly.length === 11;
    }),
  password: yup
    .string()
    .min(8, "Şifre en az 8 karakter olmalıdır.")
    .required("Şifre zorunludur."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Şifreler birbiriyle eşleşmiyor.")
    .required("Şifre tekrarı zorunludur."),
});

function Register() {
  const navigate = useNavigate();
  const [type, setType] = useState<"email" | "phone">("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(
      (type === "email" ? emailSchema : phoneSchema) as any,
    ),
  });

  const onSubmitForm = (data: any) => {
    let finalData = { ...data };

    if (type === "phone" && finalData.phone) {
      finalData.phone = finalData.phone.replace(/\D/g, "");
    }

    console.log("Kayıt verileri başarıyla alındı:", finalData);
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
      <div className="bg-indigo-900 p-10 shadow-2xl flex flex-col gap-6 w-112.5">
        <h2 className="text-white text-3xl font-bold text-center">Kayıt Ol</h2>

        <form
          onSubmit={handleSubmit(onSubmitForm)}
          className="flex flex-col gap-5"
        >
          <div className="flex bg-black/20 p-1 mb-2">
            <button
              type="button"
              onClick={() => setType("email")}
              className={`flex-1 py-2 text-sm font-bold transition-all ${
                type === "email"
                  ? "bg-indigo-500 text-white shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              E-posta ile Kayıt
            </button>
            <button
              type="button"
              onClick={() => setType("phone")}
              className={`flex-1 py-2 text-sm font-bold transition-all ${
                type === "phone"
                  ? "bg-indigo-500 text-white shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Telefon ile Kayıt
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <input
              type="text"
              placeholder="Adınız ve Soyadınız"
              {...register("fullName")}
              className="border-2 border-black p-3 focus:border-gray-800 outline-none transition-all w-full"
            />
            {errors.fullName && (
              <span className="text-yellow-400 text-sm font-bold">
                {String(errors.fullName.message)}
              </span>
            )}
          </div>

          {type === "email" ? (
            <div className="flex flex-col gap-1">
              <input
                type="text"
                placeholder="E-posta Adresi"
                {...register("email")}
                className="border-2 border-black p-3 focus:border-gray-800 outline-none transition-all w-full"
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
                placeholder="Telefon Numarası (Örn: 555...)"
                {...register("phone", {
                  onChange: (e) =>
                    (e.target.value = phoneNumberSchema(e.target.value)),
                })}
                className="border-2 border-black p-3 focus:border-gray-800 outline-none transition-all w-full"
              />
              {errors.phone && (
                <span className="text-yellow-400 text-sm font-bold">
                  {String(errors.phone.message)}
                </span>
              )}
            </div>
          )}

         
          <div className="flex flex-col gap-1">
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Şifre Oluştur"
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
            {errors.password && (
              <span className="text-yellow-400 text-sm font-bold">
                {String(errors.password.message)}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Şifreyi Tekrar Girin"
                {...register("confirmPassword")}
                className="border-2 border-black p-3 focus:border-gray-800 outline-none transition-all w-full pr-16"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3.5 text-black hover:text-gray-800 focus:outline-none"
              >
                <span className="material-icons">
                  {showConfirmPassword ? "visibility" : "visibility_off"}
                </span>
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="text-yellow-400 text-sm font-bold">
                {String(errors.confirmPassword.message)}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="bg-black text-white p-3 hover:ring-amber-50 font-bold hover:bg-gray-800 transition-colors w-full mt-2"
          >
            Kayıt Ol
          </button>
        </form>

        <p className="text-center text-gray-300 text-sm mt-4">
          Zaten bir hesabın var mı?{" "}
          <Link
            to="/"
            className="text-indigo-400 hover:text-indigo-300 font-bold underline"
          >
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
