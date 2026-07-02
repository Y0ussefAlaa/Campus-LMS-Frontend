import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  approveCourseTasksApi,
  createCourseTasksApi,
  deleteCourseTasksApi,
  editCourseTasksApi,
  getCourseTasksApi,
  getCourseTasksSubmissionsApi,
  getTeacherTasksApi,
  studentGetSubmissionApi,
  submitCourseTasksApi,
  teacherApproveRejectTaskApi,
  teacherGetStudentSubmissionApi,
} from "../lib/task.api";
import type { InferType } from "yup";
import type { addTaskShcema, editTaskShcema } from "../schema";
import toast from "react-hot-toast";

type ICreateTask = InferType<typeof addTaskShcema>;
type IEditTask = InferType<typeof editTaskShcema>;

export const useGetTasks = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ["courseTasks", id],
    queryFn: () => getCourseTasksApi(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
  return { data, ...rest };
};

export const useGetTeacherTasks = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["teacherTasks"],
    queryFn: getTeacherTasksApi,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
  return { data, ...rest };
};

export const useGetTeacherStudentSubmission = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ["teacherTasks", id],
    queryFn: () => teacherGetStudentSubmissionApi(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
  return { data, ...rest };
};

export const useStudentGetSubmission = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ["studentSubmission", id],
    queryFn: () => studentGetSubmissionApi(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
  return { data, ...rest };
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { data, ...rest } = useMutation({
    mutationFn: (data: ICreateTask) => createCourseTasksApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teacherTasks", "courseTasks"],
      });
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

export const useEditTask = () => {
  const queryClient = useQueryClient();
  const { data, ...rest } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: IEditTask }) =>
      editCourseTasksApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courseTasks", "teacherTasks"],
      });
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

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { data, ...rest } = useMutation({
    mutationFn: (id: string) => deleteCourseTasksApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["courseTasks", "teacherTasks"],
      });
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

export const useGetTasksSubmissions = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ["taskSubmissions", id],
    queryFn: () => getCourseTasksSubmissionsApi(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
  return { data, ...rest };
};

export const useApproveTask = () => {
  const queryClient = useQueryClient();
  const { data, ...rest } = useMutation({
    mutationFn: (id: string) => approveCourseTasksApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taskSubmissions"] });
      toast.success("Approved Successfully", {
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
      toast.error("Aprrove Fail", {
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

export const useSubmitTask = () => {
  const queryClient = useQueryClient();
  const { data, ...rest } = useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      submitCourseTasksApi(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taskSubmissions"] });
      toast.success("Submitted Successfully", {
        duration: 2500,
        position: "top-center",
        style: { color: "white", fontSize: "20px", padding: "20px" },
      });
    },
    onError: () => {
      toast.error("Submited Fail", {
        duration: 2500,
        position: "top-center",
        style: { color: "white", fontSize: "20px", padding: "20px" },
      });
    },
  });
  return { data, ...rest };
};

export const useTeacherApproveRejectTask = () => {
  const queryClient = useQueryClient();
  const { data, ...rest } = useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: "approved" | "rejected";
    }) => teacherApproveRejectTaskApi(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacherStudentSubmission"] });
      toast.success("Updated Successfully");
    },
    onError: () => {
      toast.error("Update Failed");
    },
  });
  return { data, ...rest };
};
