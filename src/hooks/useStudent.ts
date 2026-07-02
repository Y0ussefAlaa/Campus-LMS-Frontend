import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  studentGetCourses,
  studentGetMaterial,
  studentGetStats,
  studentJoinCourse,
} from "../lib/student.api";
import toast from "react-hot-toast";
import type { InferType } from "yup";
import type { joinCourseSchema } from "../schema";

type StudentJoinCourse = InferType<typeof joinCourseSchema>;

export const useStudentGetDashboard = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["studentDashboard"],
    queryFn: studentGetStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
  return { data, ...rest };
};

export const useStudentGetCourses = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["studentCourses"],
    queryFn: studentGetCourses,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
  return { data, ...rest };
};

export const useStudentGetMaterial = (id: string) => {
  const { data, ...rest } = useQuery({
    queryKey: ["material", id],
    queryFn: () => studentGetMaterial(id), // simpler closure approach
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return { data, ...rest };
};

export const useStudentJoinCourse = () => {
  const queryClient = useQueryClient();
  const { data, ...rest } = useMutation({
    mutationFn: (data: StudentJoinCourse) => studentJoinCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studentCourses"] });
      toast.success("Joined Successfully", {
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
      toast.error("Joined Fail", {
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
