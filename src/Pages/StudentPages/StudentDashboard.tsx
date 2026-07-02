import NavBar from "../../Layouts/NavBar";
import { useCustomModal } from "../../hooks/useCustomModal";
import TopBox from "../../Components/DashboardComp/TopBox";
import { DashboardBottomBoxes, studentDashboardTopBoxes } from "../../data";
import BottomBoxes from "../../Components/DashboardComp/BottomBoxes";
import CustomModal from "../../Components/ui/CustomModal";
import { useAuth } from "../../context/AuthContext";
import { useStudentGetDashboard } from "../../hooks/useStudent";
import CircularProgress from "@mui/material/CircularProgress";
import ChatbaseWidget from "../../Components/ChatBase";

const StudentDashboard = () => {
  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();
  const { data, isLoading } = useStudentGetDashboard();
  
  const { handleLogout } = useAuth();
  return (
    <div className="page-shell">
      <NavBar
        onLogout={() => setIsCustomModalOpen(true)}
        description="Welcome to CAMPUS"
        mainMessage="dashboard"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:space-x-4.5 md:space-x-5 space-y-5  mt-10">
        {studentDashboardTopBoxes.map((box) => (
          <TopBox
            color={box.iconBackGround}
            key={box.id}
            icon={box.icon}
            number={
              isLoading ? (
                <CircularProgress aria-label="Loading…" size={25} />
              ) : box.mainTxt == "Courses" ? (
                data.stats.enrolledCourses
              ) : box.mainTxt == "Tasks" ? (
                data.stats.tasks
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
      <ChatbaseWidget />
    </div>
  );
};

export default StudentDashboard;
