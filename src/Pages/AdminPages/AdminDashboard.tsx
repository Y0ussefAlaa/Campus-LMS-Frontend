import NavBar from "../../Layouts/NavBar";
import { useCustomModal } from "../../hooks/useCustomModal";
import TopBox from "../../Components/DashboardComp/TopBox";
import { DashboardBottomBoxes, adminDashboardTopBoxes } from "../../data";
import BottomBoxes from "../../Components/DashboardComp/BottomBoxes";
import CustomModal from "../../Components/ui/CustomModal";
import { useAuth } from "../../context/AuthContext";
import { useAdminDashboard } from "../../hooks/useAdmin";
import CircularProgress from "@mui/material/CircularProgress";
import { CircleX } from "lucide-react";

const AdminDashboard = () => {
  const { handleLogout } = useAuth();
  const { data, error, isLoading } = useAdminDashboard();

  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();

  return (
    <div className="page-shell">
      <NavBar
        onLogout={() => setIsCustomModalOpen(true)}
        description="Welcome to the Learning Management System."
        mainMessage="dashboard"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:space-x-4.5 md:space-x-5 space-y-5  mt-10">
        {adminDashboardTopBoxes.map((box) => (
          <TopBox
            color={box.iconBackGround}
            key={box.id}
            icon={box.icon}
            mainTxt={box.mainTxt}
            number={
              isLoading ? (
                <CircularProgress aria-label="Loading…" size={25} />
              ) : error ? (
                <CircleX />
              ) : box.mainTxt == "total Students" ? (
                data?.stats?.totalStudents
              ) : box.mainTxt == "total Teachers" ? (
                data?.stats?.totalTeachers
              ) : (
                data?.stats?.totalCourses
              )
            }
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 sm:space-x-4.5 md:space-x-5 space-y-5  mt-10">
        {DashboardBottomBoxes.map((box) => (
          <BottomBoxes number={box.number} text={box.text} key={box.id} />
        ))}
      </div>
      {/* LOGOUT MODAL */}
      <CustomModal
        cancelTxt="No"
        confirmTxt="Yes"
        mainTxt="Are you sure you want to logout ?"
        onConfirm={handleLogout}
        open={isCustomModalOpen}
        setIsOpen={setIsCustomModalOpen}
      />
    </div>
  );
};

export default AdminDashboard;
