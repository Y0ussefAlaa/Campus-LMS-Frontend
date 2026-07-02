import type { InferType } from "yup";
import { AxiosInstance } from "../config/AxoisInstance";
import type { addAdminShcema, editAdminShcema } from "../schema";

type AddAdminFormData = InferType<typeof addAdminShcema>;
type EditAdminFormData = InferType<typeof editAdminShcema>;

export const adminDashboardApi = async () => {
  const response = await AxiosInstance.get("/api/admin/stats");

  return response.data;
};

export const adminGetUsersApi = async () => {
  const response = await AxiosInstance.get("/api/admin/users");

  return response.data;
};

export const adminGetCoursesApi = async () => {
  const response = await AxiosInstance.get("/api/admin/courses");

  return response.data;
};

export const adminGetDepartmentsApi = async () => {
  const response = await AxiosInstance.get("/api/admin/departments");

  return response.data;
};

export const adminAddUserApi = async (data: AddAdminFormData) => {
  const response = await AxiosInstance.post("/api/admin/users", data);

  return response.data;
};

export const adminEditUserApi = async (id: string, data: EditAdminFormData) => {
  const response = await AxiosInstance.put(`/api/admin/users/${id}`, data);

  return response.data;
};

export const adminDeleteUserApi = async (id: string) => {
  const response = await AxiosInstance.delete(`/api/admin/users/${id}`);

  return response.data;
};

export const adminAddDepartmentApi = async (data: { name: string }) => {
  const response = await AxiosInstance.post("/api/admin/departments", data);

  return response.data;
};

export const adminDeleteDepartmentsApi = async (id: string) => {
  const response = await AxiosInstance.delete(`/api/admin/departments/${id}`);

  return response.data;
};

export const adminArchiveAllCoursesApi = async () => {
  const response = await AxiosInstance.put("/api/admin/courses/archive-all");

  return response.data;
};

export const adminArchiveCoursesApi = async (id: string) => {
  const response = await AxiosInstance.put(`/api/admin/courses/${id}/archive`);

  return response.data;
};

export const adminUNArchiveCoursesApi = async (id: string) => {
  const response = await AxiosInstance.put(`/api/admin/courses/${id}/unarchive`);

  return response.data;
};
