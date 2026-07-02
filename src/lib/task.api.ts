import type { InferType } from "yup";
import { AxiosInstance } from "../config/AxoisInstance";
import type { addTaskShcema, editTaskShcema } from "../schema";

type ICreateTask = InferType<typeof addTaskShcema>;
type IEditTask = InferType<typeof editTaskShcema>;

export const getCourseTasksApi = async (id: string) => {
  const response = await AxiosInstance.get(`/api/assignments/course/${id}`);

  return response.data;
};

export const getTeacherTasksApi = async () => {
  const response = await AxiosInstance.get(`/api/assignments/teacher`);

  return response.data;
};

export const createCourseTasksApi = async (data: ICreateTask) => {
  const response = await AxiosInstance.post(`/api/assignments`, data);

  return response.data;
};

export const editCourseTasksApi = async (id: string, data: IEditTask) => {
  const response = await AxiosInstance.put(`/api/assignments/${id}`, data);

  return response.data;
};

export const deleteCourseTasksApi = async (id: string) => {
  const response = await AxiosInstance.delete(`/api/assignments/${id}`);

  return response.data;
};

export const getCourseTasksSubmissionsApi = async (id: string) => {
  const response = await AxiosInstance.get(
    `/api/assignments/${id}/submissions`,
  );

  return response.data;
};

export const approveCourseTasksApi = async (id: string) => {
  const response = await AxiosInstance.put(
    `/api/assignments/submissions/${id}/grade`,
  );

  return response.data;
};

export const submitCourseTasksApi = async (id: string, formData: FormData) => {
  const response = await AxiosInstance.post(
    `/api/assignments/${id}/submit`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
  return response.data;
};

export const teacherGetStudentSubmissionApi = async (id: string) => {
  const response = await AxiosInstance.get(
    `/api/assignments/submissions/${id}`,
  );

  return response.data;
};

export const studentGetSubmissionApi = async (id: string) => {
  const response = await AxiosInstance.get(`/api/assignments/${id}/submission`);

  return response.data;
};

export const teacherApproveRejectTaskApi = async (
  id: string,
  status: "approved" | "rejected",
) => {
  const response = await AxiosInstance.put(
    `/api/assignments/submissions/${id}/grade`,
    { status },
  );
  return response.data;
};
