import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createQuiz,
  deleteQuizApi,
  editQuizApi,
  getCourseQuizzes,
  getQuizInfoApi,
  getQuizSubmissions,
  getTeacherQuizzes,
  studentGetQuizSubmissions,
  submitQuizApi,
  takeQuizApi,
} from "../lib/quiz.api";
import toast from "react-hot-toast";
import type { Quiz } from "../context/QuizContext";
import type { InferType } from "yup";
import type { editQuizShcema } from "../schema";
type IEditQuiz = InferType<typeof editQuizShcema>;

export const useCourseQuizes = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ["courseQuizzes", id],
    queryFn: () => getCourseQuizzes(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
  return { data, ...rest };
};
export const useQuizInfo = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ["quizInfo", id],
    queryFn: () => getQuizInfoApi(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
  return { data, ...rest };
};
export const useCourseQuizesSubmissions = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ["quizSubmissions", id],
    queryFn: () => getQuizSubmissions(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
  return { data, ...rest };
};

export const useStudentGetQuizSubmission = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ["quizSubmission", id],
    queryFn: () => studentGetQuizSubmissions(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
  return { data, ...rest };
};

export const useTakeQuiz = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ["takeQuiz", id],
    queryFn: () => takeQuizApi(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
  return { data, ...rest };
};

export const useTeacherQuizes = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["courseQuizzes"],
    queryFn: getTeacherQuizzes,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
  return { data, ...rest };
};

export const useCreateQuiz = () => {
  const queryClient = useQueryClient();
  const { data, ...rest } = useMutation({
    mutationFn: (data: Quiz) => createQuiz(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courseQuizzes"] });
      toast.success("Added Successfully", {
        duration: 2500,
        position: "top-center",
        style: {
          color: "white",
          fontSize: "20px",
          padding: "20px",
        },
      });
    },
    onError: () => {
      toast.error("Added Fail", {
        duration: 2500,
        position: "top-center",
        style: {
          color: "white",
          fontSize: "20px",
          padding: "20px",
        },
      });
    },
  });
  return { data, ...rest };
};

export const useEditQuiz = () => {
  const queryClient = useQueryClient();
  const { data, ...rest } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: IEditQuiz }) =>
      editQuizApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courseQuizzes"] });
      toast.success("Edited Successfully", {
        duration: 2500,
        position: "top-center",
        style: {
          color: "white",
          fontSize: "20px",
          padding: "20px",
        },
      });
    },
    onError: () => {
      toast.error("Edit Fail", {
        duration: 2500,
        position: "top-center",
        style: {
          color: "white",
          fontSize: "20px",
          padding: "20px",
        },
      });
    },
  });
  return { data, ...rest };
};

export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();
  const { data, ...rest } = useMutation({
    mutationFn: (id: string) => deleteQuizApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courseQuizzes"] });
      toast.success("Deleted Successfully", {
        duration: 2500,
        position: "top-center",
        style: {
          color: "white",
          fontSize: "20px",
          padding: "20px",
        },
      });
    },
    onError: () => {
      toast.error("Delete Fail", {
        duration: 2500,
        position: "top-center",
        style: {
          color: "white",
          fontSize: "20px",
          padding: "20px",
        },
      });
    },
  });
  return { data, ...rest };
};

export const useSubmitQuiz = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        answers: {
          questionId: string;
          answer: string;
        }[];
      };
    }) => submitQuizApi(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courseQuizzes"],
      });

      toast.success("Submitted Successfully");
    },

    onError: () => {
      toast.error("Submit Failed");
    },
  });
};
