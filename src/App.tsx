import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import AdminRoutes from "./routes/AdminRoutes";
import TeacherRoutes from "./routes/TeacherRoutes";
import StudentRoutes from "./routes/StudentRoutes";
import ProtectedRoute from "./Components/ProtectedRoute";
import StudentLayout from "./Layouts/StudentLayout";
import TeacherLayout from "./Layouts/TeacherLayout";
import Layout from "./Layouts/AdminLayout";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuth, role } = useAuth();

  const getRolePath = () => {
    if (role === "admin") return "/admin";
    if (role === "teacher") return "/teacher";
    if (role === "student") return "/student";
    return "/";
  };

  return (
    <Routes>
      {/* Public Landing Page */}
      <Route
        index
        element={
          !isAuth ? <LandingPage /> : <Navigate to={getRolePath()} replace />
        }
      />

      {/* ADMIN */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute
            redirectPath="/"
            isAuth={isAuth}
            allowedRole="admin"
            currentRole={role}
          >
            <Layout /> {/* layout lives here */}
          </ProtectedRoute>
        }
      >
        {AdminRoutes()}
      </Route>

      {/* TEACHER */}
      <Route
        path="/teacher/*"
        element={
          <ProtectedRoute
            redirectPath="/"
            isAuth={isAuth}
            allowedRole="teacher"
            currentRole={role}
          >
            <TeacherLayout />
          </ProtectedRoute>
        }
      >
        {TeacherRoutes()}
      </Route>

      {/* STUDENT */}
      <Route
        path="/student/*"
        element={
          <ProtectedRoute
            redirectPath="/"
            isAuth={isAuth}
            allowedRole="student"
            currentRole={role}
          >
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        {StudentRoutes()}
      </Route>
    </Routes>
  );
}

export default App;
