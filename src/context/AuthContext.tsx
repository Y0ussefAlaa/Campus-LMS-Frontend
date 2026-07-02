import { createContext, useContext, useState, type ReactNode } from "react";
import CookiesService from "../Services/CookiesService";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isAuth: boolean;
  role: string;
  handleLogin: (token: string, userRole: string) => void;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState(!!CookiesService.getCookie("jwt"));
  const [role, setRole] = useState(CookiesService.getCookie("role") ?? "");
  const navigate = useNavigate();

  const handleLogin = (token: string, userRole: string) => {
    CookiesService.setCookie("jwt", token);
    CookiesService.setCookie("role", userRole);
    setIsAuth(true);
    setRole(userRole);
  };

  const handleLogout = () => {
    CookiesService.removeCookie("jwt");
    CookiesService.removeCookie("role");
    setIsAuth(false);
    setRole("");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isAuth, role, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
