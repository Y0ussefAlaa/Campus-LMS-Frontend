import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  adminAddDepartmentApi,
  adminAddUserApi,
  adminArchiveCoursesApi,
  adminArchiveAllCoursesApi,
  adminDashboardApi,
  adminDeleteDepartmentsApi,
  adminDeleteUserApi,
  adminEditUserApi,
  adminGetCoursesApi,
  adminGetDepartmentsApi,
  adminGetUsersApi,
  adminUNArchiveCoursesApi,
} from "../lib/admin.api";
import toast from "react-hot-toast";
import type { InferType } from "yup";
import type { editAdminShcema } from "../schema";

type EditAdminFormData = InferType<typeof editAdminShcema>;

export const useAdminDashboard = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["adminDashboardStats"],
    queryFn: adminDashboardApi,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
  return { data, ...rest };
};

export const useAdminGetUsers = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: adminGetUsersApi,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
  return { data, ...rest };
};

export const useAdminGetCourses = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["adminCourses"],
    queryFn: adminGetCoursesApi,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
  return { data, ...rest };
};
export const useAdminGetDepartments = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["adminDepartments"],
    queryFn: adminGetDepartmentsApi,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
  return { data, ...rest };
};

export const useAdminAddUser = () => {
  const queryClient = useQueryClient();
  const { data, ...rest } = useMutation({
    mutationFn: adminAddUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
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

export const useAdminEditUser = () => {
  const queryClient = useQueryClient();
  const { data, ...rest } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: EditAdminFormData }) =>
      adminEditUserApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
      toast.success("Updated Successfully", {
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
      toast.error("Update Fail", {
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

export const useAdminDeleteUser = () => {
  const queryClient = useQueryClient();

  const { data, ...rest } = useMutation({
    mutationFn: adminDeleteUserApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminUsers"] });
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
      toast.error("Deleted Fail", {
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

export const useAdminAddDepartment = () => {
  const queryClient = useQueryClient();

  const { data, ...rest } = useMutation({
    mutationFn: adminAddDepartmentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminDepartments"] });
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

export const useAdminDeleteDepartments = () => {
  const queryClient = useQueryClient();

  const { data, ...rest } = useMutation({
    mutationFn: adminDeleteDepartmentsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminDepartments"] });
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
      toast.error("Deleted Fail", {
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

export const useAdminArchiveAllCourses = () => {
  const queryClient = useQueryClient();

  const { data, ...rest } = useMutation({
    mutationFn: adminArchiveAllCoursesApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminCourses"] });
      toast.success("Archived-all Successfully", {
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
      toast.error("Archived-all Fail", {
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
export const useAdminArchiveCourses = () => {
  const queryClient = useQueryClient();

  const { data, ...rest } = useMutation({
    mutationFn: (id: string) => adminArchiveCoursesApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminCourses"] });
      toast.success("Archived Successfully", {
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
      toast.error("Archived Fail", {
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

export const useAdminUNArchiveCourses = () => {
  const queryClient = useQueryClient();

  const { data, ...rest } = useMutation({
    mutationFn: (id: string) => adminUNArchiveCoursesApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminCourses"] });
      toast.success("Un-Archived Successfully", {
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
      toast.error("Un-Archived Fail", {
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
