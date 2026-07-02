import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Calendar, LogOut, Shield, User, X } from "lucide-react";
import { useProfilePanel } from "../../context/ProfilePanelContext";
import ProfileService from "../../Services/ProfileService";
import type { IUserProfile } from "../../interfaces";
import { changePasswordSchema, profileEditSchema } from "../../schema";
import Input from "../ui/Input";
import PasswordInput from "../ui/PasswordInput";
import Button from "../ui/Button";
import * as yup from "yup";
import { useAuth } from "../../context/AuthContext";
import {
  useChangePassword,
  useChangeUserProfile,
  useUserProfile,
} from "../../hooks/useAuth";

interface ProfileFormData {
  name: string;
  department: string;
  year?: number;
}

type PasswordFormData = yup.InferType<typeof changePasswordSchema>;

const EXIT_MS = 300;

const ProfileSlideOver = () => {
  const { handleLogout } = useAuth();
  const { isOpen, closeProfile } = useProfilePanel();
  const { data } = useUserProfile();
  const { mutate: updateProfile, isPending } = useChangeUserProfile();
  const { mutate: changePassword, isPending: isChangingPassword } =
    useChangePassword();

  const [mounted, setMounted] = useState(false);
  const [newAvatar, setNewAvatar] = useState<string | undefined>("");
  const [visible, setVisible] = useState(false);
  const [profile, setProfile] = useState<IUserProfile>(() =>
    ProfileService.getProfile(),
  );
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfile(ProfileService.getProfile());
      setShowPasswordForm(false);
      setMounted(true);
      const frame = requestAnimationFrame(() => setVisible(true));
      document.body.style.overflow = "hidden";
      return () => cancelAnimationFrame(frame);
    }

    setVisible(false);
    const timer = window.setTimeout(() => {
      setMounted(false);
      document.body.style.overflow = "";
    }, EXIT_MS);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const profileForm = useForm<ProfileFormData>({
    resolver: yupResolver(profileEditSchema) as never,
    values: {
      name: profile.name,
      department: profile.department ?? "",
      year: profile.year,
    },
  });

  const passwordForm = useForm<PasswordFormData>({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      // resize to max 200x200
      const MAX_SIZE = 200;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_SIZE) {
          height = (height * MAX_SIZE) / width;
          width = MAX_SIZE;
        }
      } else {
        if (height > MAX_SIZE) {
          width = (width * MAX_SIZE) / height;
          height = MAX_SIZE;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);

      // 0.7 = 70% quality, reduces size significantly
      const compressed = canvas.toDataURL("image/jpeg", 0.7);
      setNewAvatar(compressed);

      URL.revokeObjectURL(img.src); // cleanup
    };

    img.src = URL.createObjectURL(file);
  };
  const stat = ProfileService.getRoleStat(profile.role);
  const initials = ProfileService.getInitials(profile.name);
  const isStudent = profile.role === "student";

  const onSaveProfile = (formData: ProfileFormData) => {
    updateProfile({
      name: formData.name,
      avatar: newAvatar ?? undefined,
    });
  };

  const onChangePassword = (data: PasswordFormData) => {
    passwordForm.reset();
    setShowPasswordForm(false);
    changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-100"
      role="dialog"
      aria-modal="true"
      aria-label="Profile"
    >
      <div
        className={`absolute inset-0 bg-slate-900/40 transition-opacity duration-300 dark:bg-black/50 ${
          visible
            ? "opacity-100 backdrop-blur-sm"
            : "opacity-0 backdrop-blur-none"
        }`}
        onClick={closeProfile}
        aria-hidden
      />

      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-border bg-card shadow-2xl transition-transform duration-300 ease-out dark:shadow-black/40 ${
          visible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-lg font-bold text-heading">Profile</h2>
          <button
            type="button"
            onClick={closeProfile}
            className="interactive-hover rounded-lg p-2"
            aria-label="Close profile"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative w-20 h-20">
              {/* Avatar */}
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br truncate from-brand to-brand-light text-2xl font-bold text-white shadow-lg shadow-blue-500/25">
                {newAvatar || data?.avatar ? (
                  <img
                    className="w-full h-full object-cover rounded-full"
                    src={newAvatar ?? data?.avatar} // ✅ newAvatar takes priority
                  />
                ) : (
                  initials
                )}
              </div>

              {/* Upload button */}
              <button
                type="button"
                onClick={() => document.getElementById("avatar-input")?.click()}
                className="absolute bottom-0 right-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 hover:bg-orange-600 transition-colors shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </button>

              {/* Hidden file input */}
              <input
                id="avatar-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </div>
            <h3 className="mt-4 text-xl font-bold text-heading">
              {data?.name}
            </h3>
            <p className="mt-1 text-sm text-muted">{data?.email}</p>
            <span className="mt-3 inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-brand dark:bg-blue-500/15 dark:text-brand-light">
              {data?.role}
            </span>
          </div>

          <div className="card-surface mt-6 flex items-center justify-between p-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted">
                {stat.label}
              </p>
              <p className="mt-1 text-2xl font-bold text-heading">
                8
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-brand">
              <User size={20} />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs text-muted">
            <Calendar size={14} />
            <span>
              Member since{" "}
              {new Date(profile.joinedAt).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <form
            onSubmit={profileForm.handleSubmit(onSaveProfile)}
            className="mt-8 space-y-4"
          >
            <p className="text-sm font-semibold text-heading">Personal info</p>
            <Input
              label="Full name"
              className="max-w-full"
              error={profileForm.formState.errors.name?.message}
              {...profileForm.register("name")}
            />

            <Input
              label="Email"
              value={data?.email ?? ""}
              className="max-w-full"
              readOnly
              disabled
            />
            {isStudent && (
              <>
                <Input
                  disabled
                  readOnly
                  className="max-w-full"
                  label="Department"
                  error={profileForm.formState.errors.department?.message}
                  {...profileForm.register("department")}
                />
                <Input
                  disabled
                  readOnly
                  className="max-w-full"
                  label="Year"
                  type="number"
                  error={profileForm.formState.errors.year?.message}
                  {...profileForm.register("year", { valueAsNumber: true })}
                />
              </>
            )}
            <Button
              text={isPending ? "Saving..." : "Save changes"}
              type="submit"
              disabled={isPending}
              className="w-full justify-center"
            />
          </form>

          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-brand" />
              <p className="text-sm font-semibold text-heading">Security</p>
            </div>

            {!showPasswordForm ? (
              <Button
                text="Change password"
                variant="secondary"
                type="button"
                className="w-full justify-center"
                onClick={() => setShowPasswordForm(true)}
              />
            ) : (
              <form
                onSubmit={passwordForm.handleSubmit(onChangePassword)}
                className="card-surface space-y-4 p-4"
              >
                <PasswordInput
                  label="Current password"
                  error={passwordForm.formState.errors.currentPassword?.message}
                  {...passwordForm.register("currentPassword")}
                />
                <PasswordInput
                  label="New password"
                  error={passwordForm.formState.errors.newPassword?.message}
                  {...passwordForm.register("newPassword")}
                />
                <PasswordInput
                  label="Confirm password"
                  error={passwordForm.formState.errors.confirmPassword?.message}
                  {...passwordForm.register("confirmPassword")}
                />
                <div className="flex gap-2">
                  <Button
                    text="Cancel"
                    variant="ghost"
                    type="button"
                    className="flex-1 justify-center"
                    onClick={() => {
                      setShowPasswordForm(false);
                      passwordForm.reset();
                    }}
                  />
                  <Button
                    text={isChangingPassword ? "Saving..." : "Save changes"}
                    type="submit"
                    disabled={isChangingPassword}
                    className="flex-1 justify-center"
                  />
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-border p-5">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200/80 py-2.5 text-sm font-semibold text-red-500 transition-all duration-300 hover:bg-red-50 dark:border-red-500/20 dark:hover:bg-red-500/10"
          >
            <LogOut size={18} />
            Log out
          </button>
        </div>
      </aside>
    </div>,
    document.body,
  );
};

export default ProfileSlideOver;
