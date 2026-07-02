import type { InferType } from "yup";
import { AxiosInstance } from "../config/AxoisInstance";
import type { editQuizShcema } from "../schema";

type Question = {
  text: string;
  options: string[];
  correctAnswer: string;
  points: number;
};

type IQuizData = {
  courseId: string;
  title: string;
  dueDate: string;
  timeLimit: number;
  questionsNumber: number;
  questions: Question[];
};

type IEditQuiz = InferType<typeof editQuizShcema>;

export const getCourseQuizzes = async (id: string) => {
  const response = await AxiosInstance.get(`/api/quizzes/course/${id}`);

  return response.data;
};

export const getQuizInfoApi = async (id: string) => {
  const response = await AxiosInstance.get(`/api/quizzes/${id}`);

  return response.data;
};

export const getTeacherQuizzes = async () => {
  const response = await AxiosInstance.get(`/api/quizzes/teacher`);

  return response.data;
};

export const createQuiz = async (data: IQuizData) => {
  const response = await AxiosInstance.post(`/api/quizzes`, data);

  return response.data;
};

export const getQuizSubmissions = async (id: string) => {
  const response = await AxiosInstance.get(`/api/quizzes/${id}/submissions`);

  return response.data;
};

export const studentGetQuizSubmissions = async (id: string) => {
  const response = await AxiosInstance.get(`/api/quizzes/${id}/submission`);

  return response.data;
};

export const editQuizApi = async (id: string, data: IEditQuiz) => {
  const response = await AxiosInstance.put(`/api/quizzes/${id}`, data);

  return response.data;
};

export const deleteQuizApi = async (id: string) => {
  const response = await AxiosInstance.delete(`/api/quizzes/${id}`);

  return response.data;
};

export const takeQuizApi = async (id: string) => {
  const response = await AxiosInstance.get(`/api/quizzes/${id}/take`);

  return response.data;
};

export const submitQuizApi = async (
  id: string,
  data: {
    answers: {
      questionId: string;
      answer: string;
    }[];
  },
) => {
  const response = await AxiosInstance.post(`/api/quizzes/${id}/submit`, data);

  return response.data;
};

