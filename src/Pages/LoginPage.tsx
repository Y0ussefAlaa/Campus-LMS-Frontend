import logo from "../assets/LOGO.jpg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../schema";
import * as yup from "yup";
import { NavLink } from "react-router-dom";
import CookiesService from "../Services/CookiesService";

type FormData = yup.InferType<typeof loginSchema>;
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = (data: FormData) => {
    CookiesService.setCookie("email", data.email);
    const extension = data.email.split(".")[1];
    const role =
      extension == "com" ? "student" : extension == "edu" ? "teacher" : "admin";
    CookiesService.setCookie("role", role);
    location.reload();
  };
  return (
    <div className="w-screen h-screen px-3 flex items-center justify-center bg-[#1B2233]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white  w-100 h-fit rounded-2xl flex flex-col  p-4 justify-center space-y-5 items-center"
        action=""
      >
        <div className="w-65 h-18">
          <img className="w-full h-full" src={logo} alt="" />
        </div>
        <p className="text-[#00246B] font-bold text-lg">Login Your Account</p>
        <div className="flex flex-col w-full">
          <label
            className="text-[#00246B] text-md font-semibold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            className="w-full h-9 p-2 bg-gray-300 rounded-md"
            {...register("email", { required: true, pattern: /^[A-Za-z]+$/i })}
          />
          <p className="text-red-600">{errors.email?.message}</p>
        </div>
        <div className="flex flex-col w-full">
          <label
            className="text-[#00246B] text-md font-semibold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            className="w-full h-9 p-2 bg-gray-300 rounded-md"
            {...register("password", { required: true, minLength: 8 })}
          />
          <p className="text-red-600">{errors.password?.message}</p>
        </div>
        <button
          type="submit"
          className="w-full bg-[#00246B] h-10 rounded-md text-white font-bold text-lg cursor-pointer"
        >
          Login
        </button>
        <p>
          Don’t have an account?{" "}
          <span className="font-bold text-[#00246B] cursor-pointer">
            <NavLink to={"sign-up"}>Register</NavLink>
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
