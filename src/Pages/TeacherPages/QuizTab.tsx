import { useCustomModal } from "../../hooks/useCustomModal";
import NavBar from "../../Layouts/NavBar";
import CustomModal from "../../Components/ui/CustomModal";
import AdvTable from "../../Components/AdvTable";
import Button from "../../Components/ui/Button";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTeacherQuizes } from "../../hooks/useQuizzes";
import TableSkeleton from "../../Components/TableSkeleton";

const QuizTab = () => {
  const { handleLogout } = useAuth();

  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();
  const { data, isLoading } = useTeacherQuizes();

  if(isLoading) return <div className="sm:m-12"><TableSkeleton role="admin" /></div>

  return (
    <div className="page-shell box-border overflow-x-hidden">
      <NavBar
        onLogout={() => setIsCustomModalOpen(true)}
        description=""
        mainMessage="Course Quizes"
      />
      <div className="mt-18 md:ml-5 space-y-5 ">
        <NavLink to={"/teacher/addQuiz"}>
          <Button text="Add Quiz" />
        </NavLink>
        <AdvTable role="quiz" teacherQuizzes={data.quizzes} />
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

export default QuizTab;
