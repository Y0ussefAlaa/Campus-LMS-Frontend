import type { InferType } from "yup";
import { AxiosInstance } from "../config/AxoisInstance";
import type { joinCourseSchema } from "../schema";
type StudentJoinCourse = InferType<typeof joinCourseSchema>;

export const studentGetStats = async () => {
  const response = await AxiosInstance.get(`/api/student/stats`);

  return response.data;
};

export const studentGetCourses = async () => {
  const response = await AxiosInstance.get(`/api/student/courses`);

  return response.data;
};

export const studentJoinCourse = async (data: StudentJoinCourse) => {
  const response = await AxiosInstance.post(`/api/student/courses/join`, data);

  return response.data;
};

export const studentGetMaterial = async (id: string) => {
  const response = await AxiosInstance.get(
    `/api/student/courses/${id}/materials`,
  );

  return response.data;
};
