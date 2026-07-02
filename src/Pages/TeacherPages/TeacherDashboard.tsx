import NavBar from "../../Layouts/NavBar";
import { useCustomModal } from "../../hooks/useCustomModal";
import TopBox from "../../Components/DashboardComp/TopBox";
import { DashboardBottomBoxes, teacherDashboardTopBoxes } from "../../data";
import BottomBoxes from "../../Components/DashboardComp/BottomBoxes";
import CustomModal from "../../Components/ui/CustomModal";
import { useAuth } from "../../context/AuthContext";
import { useTeacherGetStats } from "../../hooks/useTeacher";
import CircularProgress from "@mui/material/CircularProgress";

const TeacherDashboard = () => {
  const { handleLogout } = useAuth();

  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();
  const { data, isLoading } = useTeacherGetStats();

  return (
    <div className="page-shell">
      <NavBar
        onLogout={() => setIsCustomModalOpen(true)}
        description="Welcome to the Learning Management System."
        mainMessage="dashboard"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:space-x-4.5 md:space-x-5 space-y-5  mt-10">
        {teacherDashboardTopBoxes.map((box) => (
          <TopBox
            color={box.iconBackGround}
            key={box.id}
            icon={box.icon}
            number={
              isLoading ? (
                <CircularProgress aria-label="Loading…" size={25} />
              ) : box.mainTxt == "Students" ? (
                data.stats.students
              ) : box.mainTxt == "Courses" ? (
                data.stats.courses
              ) : box.mainTxt == "Tasks" ? (
                data.stats.assignments
              ) : (
                data.stats.quizzes
              )
            }
            mainTxt={box.mainTxt}
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

export default TeacherDashboard;
