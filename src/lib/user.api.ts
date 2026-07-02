import type { InferType } from "yup";
import { AxiosInstance } from "../config/AxoisInstance";
import type { loginSchema, signUpSchema } from "../schema";

type LoginFormData = InferType<typeof loginSchema>;
type SignUpFormData = InferType<typeof signUpSchema>;

export const registerApi = async (data: SignUpFormData) => {
  const response = await AxiosInstance.post("/api/auth/signup", data);

  return response.data;
};

export const loginApi = async (data: LoginFormData) => {
  const response = await AxiosInstance.post("/api/auth/login", data);

  return response.data;
};

export const userProfileApi = async () => {
  const response = await AxiosInstance.get("/api/auth/profile");
  return response.data;
};

export const changeUserProfileApi = async (data: {
  name: string;
  avatar?: string;
}) => {
  const response = await AxiosInstance.put("/api/auth/profile", data);
  return response.data;
};

export const changePasswordApi = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const response = await AxiosInstance.put("/api/auth/change-password", data);
  return response.data;
};
