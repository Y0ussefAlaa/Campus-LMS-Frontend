import { useMutation, useQuery } from "@tanstack/react-query";
import {
  changePasswordApi,
  changeUserProfileApi,
  userProfileApi,
} from "../lib/user.api";
import toast from "react-hot-toast";

export const useUserProfile = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["profile"],
    queryFn: userProfileApi,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
  return { data, ...rest };
};

export const useChangeUserProfile = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: changeUserProfileApi,
    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
    onError: () => {
      toast.error("Error updating profile");
    },
  });
  return { mutate, ...rest };
};

export const useChangePassword = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: changePasswordApi,
    onSuccess: () => {
      toast.success("Password updated successfully");
    },
    onError: () => {
      toast.error("Error updating password");
    },
  });
  return { mutate, ...rest };
};
