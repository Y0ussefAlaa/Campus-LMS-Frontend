import { Toaster } from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";

const ThemedToaster = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: isDark ? "#131c31" : "#F8FBFF",
          color: isDark ? "#f1f5f9" : "#0F172A",
          border: isDark
            ? "1px solid rgb(59 130 246 / 0.2)"
            : "1px solid rgb(59 130 246 / 0.15)",
          borderRadius: "12px",
          fontSize: "14px",
          fontWeight: 500,
        },
        success: {
          iconTheme: {
            primary: "#3B82F6",
            secondary: isDark ? "#131c31" : "#F8FBFF",
          },
        },
      }}
    />
  );
};

export default ThemedToaster;
