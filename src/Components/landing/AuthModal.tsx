import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { X } from "lucide-react";
import { loginSchema, signUpSchema } from "../../schema";
import Input from "../ui/Input";
import PasswordInput from "../ui/PasswordInput";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import { loginApi, registerApi } from "../../lib/user.api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

type AuthMode = "login" | "signup";
type LoginFormData = yup.InferType<typeof loginSchema>;
type SignUpFormData = yup.InferType<typeof signUpSchema>;

interface AuthModalProps {
  open: boolean;
  mode: AuthMode;
  onClose: () => void;
  onSwitchMode: (mode: AuthMode) => void;
}

const EXIT_MS = 300;

const AuthModal = ({ open, mode, onClose, onSwitchMode }: AuthModalProps) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
  }, [open]);

  const loginForm = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const signUpForm = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
  });
  const { mutate: Login, isPending: isLoging } = useMutation({
    mutationFn: loginApi,

    onSuccess: (res) => {
      toast.success("Successfully logged in");
      handleLogin(res.token, res.role); // updates state → triggers re-render
      onClose();
      navigate(`/${res.role}`);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onLoginSubmit = (data: LoginFormData) => {
    Login(data);
  };

  const { mutate: Register, isPending: isSigning } = useMutation({
    mutationFn: registerApi,

    onSuccess: (res) => {
      toast.success("Successfully signed up");
      navigate(`/${res?.role}`);
      onClose();
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const onSignUpSubmit = (data: SignUpFormData) => {
    Register(data as SignUpFormData);
    onClose();
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div
        className={`absolute inset-0 bg-slate-900/40 transition-opacity duration-300 ${
          visible
            ? "opacity-100 backdrop-blur-sm"
            : "opacity-0 backdrop-blur-none"
        }`}
        onClick={onClose}
        aria-hidden
      />

      <div
        className={`relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl shadow-blue-500/10 dark:shadow-black/30 transition-all duration-300 sm:p-8 ${
          visible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-5 scale-[0.97] opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className="interactive-hover absolute right-4 top-4 rounded-lg p-1.5"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="mb-6 space-y-1">
          <h2 id="auth-modal-title" className="text-2xl font-bold text-heading">
            {mode === "login" ? "Welcome back" : "Create account"}
          </h2>
          <p className="text-sm text-muted">
            {mode === "login"
              ? "Sign in to access your dashboard"
              : "Join Campus and start learning today"}
          </p>
        </div>

        <div className="mb-6 flex rounded-xl bg-surface p-1">
          {(["login", "signup"] as AuthMode[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => onSwitchMode(tab)}
              className={`flex-1 rounded-lg py-2 text-sm font-semibold capitalize transition-all duration-300 ${
                mode === tab
                  ? "bg-card text-brand shadow-sm dark:bg-surface-alt"
                  : "text-muted hover:text-heading"
              }`}
            >
              {tab === "login" ? "Login" : "Sign up"}
            </button>
          ))}
        </div>

        {mode === "login" ? (
          <form
            onSubmit={loginForm.handleSubmit(onLoginSubmit)}
            className="space-y-4"
          >
            <Input
              label="Email"
              type="email"
              className="max-w-full"
              placeholder="you@example.com"
              error={loginForm.formState.errors.email?.message}
              {...loginForm.register("email")}
            />
            <PasswordInput
              label="Password"
              className="max-w-full"
              placeholder="••••••••"
              error={loginForm.formState.errors.password?.message}
              {...loginForm.register("password")}
            />
            <Button
              text={
                isLoging ? (
                  <CircularProgress size={25} aria-label="Loading…" />
                ) : (
                  "Sign in"
                )
              }
              type="submit"
              className="w-full justify-center"
            />
          </form>
        ) : (
          <form
            onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}
            className="space-y-4"
          >
            <Input
              label="Username"
              className="max-w-full"
              placeholder="yourname"
              error={signUpForm.formState.errors.username?.message}
              {...signUpForm.register("username")}
            />
            <Input
              label="Email"
              className="max-w-full"
              type="email"
              placeholder="you@example.com"
              error={signUpForm.formState.errors.email?.message}
              {...signUpForm.register("email")}
            />
            <PasswordInput
              label="Password"
              className="max-w-full"
              placeholder="••••••••"
              error={signUpForm.formState.errors.password?.message}
              {...signUpForm.register("password")}
            />
            <Button
              text={
                isSigning ? (
                  <CircularProgress size={25} aria-label="Loading…" />
                ) : (
                  "Create account"
                )
              }
              type="submit"
              className="w-full justify-center"
            />
          </form>
        )}

        <p className="mt-5 text-center text-sm text-muted">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => onSwitchMode(mode === "login" ? "signup" : "login")}
            className="font-semibold text-brand transition-colors duration-200 hover:text-brand-dark"
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>,
    document.body,
  );
};

export default AuthModal;
