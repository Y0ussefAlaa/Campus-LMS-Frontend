import { type ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface IProps {
  isAuth: boolean;
  children?: ReactNode;
  redirectPath: string;
  allowedRole?: "student" | "teacher" | "admin";
  currentRole?: string;
}

const ProtectedRoute = ({
  isAuth,
  allowedRole,
  currentRole,
  redirectPath = "/",
  children,
}: IProps) => {
  if (!isAuth) return <Navigate to={redirectPath} replace />;
  if (allowedRole && currentRole !== allowedRole)
    return <Navigate to={`/${currentRole}`} replace />;

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;