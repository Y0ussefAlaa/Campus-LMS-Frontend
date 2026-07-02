import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  teacherAddCourses,
  teacherAddMaterial,
  teacherDeleteCourses,
  teacherDeleteMaterial,
  teacherEditCourses,
  teacherGetCourseMaterialApi,
  teacherGetCourses,
  teacherGetCourseStudentsApi,
  teacherGetStatsApi,
} from "../lib/teacher.api";
import toast from "react-hot-toast";
import type { editCourseShcema } from "../schema";
import type { InferType } from "yup";

type EditAdminFormData = InferType<typeof editCourseShcema>;

export const useTeacherGetStats = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["teacherStats"],
    queryFn: teacherGetStatsApi,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
  return { data, ...rest };
};

export const useTeacherGetCourses = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["teacherCourses"],
    queryFn: teacherGetCourses,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
  return { data, ...rest };
};

export const useTeacherGetCourseStudents = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ["teacherCourses", id],
    queryFn: () => teacherGetCourseStudentsApi(id),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
  return { data, ...rest };
};

export const useTeacherGetCourseMaterial = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ["CourseMaterial", id],
    queryFn: () => teacherGetCourseMaterialApi(id),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
  return { data, ...rest };
};

export const useTeacherAddCourses = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: teacherAddCourses,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacherCourses"] });
      toast("Added Successfully", {
        duration: 2500,
        position: "top-center",
        style: {
          background: "green",
          color: "white",
          fontSize: "20px",
          padding: "20px",
        },
      });
    },
    onError: () => {
      toast("Add Failed", {
        duration: 2500,
        position: "top-center",
        style: {
          background: "red",
          color: "white",
          fontSize: "20px",
          padding: "20px",
        },
      });
    },
  });
  return { mutate, ...rest };
};

export const useTeacherEditCourses = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: EditAdminFormData }) =>
      teacherEditCourses(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacherCourses"] });
      toast("Updated Successfully", {
        duration: 2500,
        position: "top-center",
        style: {
          background: "green",
          color: "white",
          fontSize: "20px",
          padding: "20px",
        },
      });
    },
    onError: () => {
      toast("Update Failed", {
        duration: 2500,
        position: "top-center",
        style: {
          background: "red",
          color: "white",
          fontSize: "20px",
          padding: "20px",
        },
      });
    },
  });
  return { mutate, ...rest };
};

export const useTeacherDeleteCourses = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: (id: string) => teacherDeleteCourses(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacherCourses"] });
      toast(`Deleted Successfully`, {
        duration: 2500,
        position: "top-center",
        style: {
          background: "green",
          color: "white",
          fontSize: "20px",
          padding: "20px",
        },
      });
    },
    onError: () => {
      toast("Delete Failed", {
        duration: 2500,
        position: "top-center",
        style: {
          background: "red",
          color: "white",
          fontSize: "20px",
          padding: "20px",
        },
      });
    },
  });
  return { mutate, ...rest };
};

// hooks/useTeacher.ts
export const useTeacherAddMaterial = () => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: (data: FormData) => teacherAddMaterial(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CourseMaterial"] });
      toast("Added Successfully", {
        duration: 2500,
        position: "top-center",
        style: {
          background: "green",
          color: "white",
          fontSize: "20px",
          padding: "20px",
        },
      });
    },
    onError: () => {
      toast("Add Failed", {
        duration: 2500,
        position: "top-center",
        style: {
          background: "red",
          color: "white",
          fontSize: "20px",
          padding: "20px",
        },
      });
    },
  });
  return { mutate, ...rest };
};

export const useTeacherDeleteMaterial = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: (id: string) => teacherDeleteMaterial(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CourseMaterial"] });
      toast(`Deleted Successfully`, {
        duration: 2500,
        position: "top-center",
        style: {
          background: "green",
          color: "white",
          fontSize: "20px",
          padding: "20px",
        },
      });
    },
    onError: () => {
      toast("Delete Failed", {
        duration: 2500,
        position: "top-center",
        style: {
          background: "red",
          color: "white",
          fontSize: "20px",
          padding: "20px",
        },
      });
    },
  });
  return { mutate, ...rest };
};
