import type { InferType } from "yup";
import { AxiosInstance } from "../config/AxoisInstance";
import type { addCourseShcema, editCourseShcema } from "../schema";

type AddAdminFormData = InferType<typeof addCourseShcema>;

type EditAdminFormData = InferType<typeof editCourseShcema>;

export const teacherGetStatsApi = async () => {
  const response = await AxiosInstance.get(`/api/teacher/stats`);

  return response.data;
};

export const teacherGetCourseMaterialApi = async (id: string) => {
  const response = await AxiosInstance.get(
    `/api/teacher/courses/${id}/materials`,
  );

  return response.data;
};

export const teacherGetCourses = async () => {
  const response = await AxiosInstance.get(`/api/teacher/courses`);

  return response.data;
};

export const teacherAddCourses = async (data: AddAdminFormData) => {
  const response = await AxiosInstance.post(`/api/teacher/courses`, data);

  return response.data;
};

export const teacherEditCourses = async (
  id: string,
  data: EditAdminFormData,
) => {
  const response = await AxiosInstance.put(`/api/teacher/courses/${id}`, data);

  return response.data;
};

export const teacherDeleteCourses = async (id: string) => {
  const response = await AxiosInstance.delete(`/api/teacher/courses/${id}`);

  return response.data;
};

export const teacherAddMaterial = async (data: FormData) => {
  const response = await AxiosInstance.post(`/api/teacher/materials`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const teacherDeleteMaterial = async (id: string) => {
  const response = await AxiosInstance.delete(`/api/teacher/materials/${id}`);

  return response.data;
};

export const teacherGetCourseStudentsApi = async (id: string) => {
  const response = await AxiosInstance.get(
    `/api/teacher/courses/${id}/students`,
  );

  return response.data;
};
