import logo from "../assets/LOGO.jpg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../schema";
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import CookiesService from "../Services/CookiesService";
import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../lib/user.api";
import toast from "react-hot-toast";

type registerFormData = yup.InferType<typeof signUpSchema>;
const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerFormData>({
    resolver: yupResolver(signUpSchema),
  });

  const { mutate: Register } = useMutation({
    mutationFn: (data: registerFormData) => registerApi(data),
    onSuccess: () => {
      toast.success("Successfully Sign up ");
      navigate("/");
    },
    onError: (error: Error) => {
      toast.error("Registration failed: " + error.message);
    },
  });

  const onSubmit = (data: registerFormData) => {
    CookiesService.setCookie("email", data.email);
    Register(data as registerFormData);
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#1B2233]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-100 h-fit rounded-2xl flex flex-col  p-4 justify-center space-y-5 items-center"
        action=""
      >
        <div className="w-65 h-18">
          <img className="w-full h-full" src={logo} alt="" />
        </div>
        <p className="text-[#00246B] font-bold text-lg">Create Account</p>
        <div className="flex flex-col w-full">
          <label
            className="text-[#00246B] text-md font-semibold"
            htmlFor="username"
          >
            User Name
          </label>
          <input
            id="username"
            className="w-full h-9 p-2 bg-gray-300 rounded-md"
            {...register("username")}
          />
          <p className="text-red-600">{errors.username?.message}</p>
        </div>
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
            {...register("email")}
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
            {...register("password")}
          />
          <p className="text-red-600">{errors.password?.message}</p>
        </div>
        <div className="flex flex-col w-full">
          <label
            className="text-[#00246B] text-md font-semibold"
            htmlFor="confirmpassword"
          >
            Confirm Password
          </label>
          
        </div>

        <button
          type="submit"
          className="w-full bg-[#00246B] h-10 rounded-md text-white font-bold text-lg cursor-pointer"
        >
          Sign-up
        </button>
        <p>
          Have Account?{" "}
          <span className="font-bold text-[#00246B] cursor-pointer">
            <NavLink to={"/"}>Login</NavLink>
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUpPage;
