import NavBar from "../../Layouts/NavBar";
import { useCustomModal } from "../../hooks/useCustomModal";
import CustomModal from "../../Components/ui/CustomModal";
import { useAuth } from "../../context/AuthContext";
import { NavLink, useLocation } from "react-router-dom";
import Button from "../../Components/ui/Button";

const EndQuiz = () => {
  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();
  const { handleLogout } = useAuth();

  const { state } = useLocation();
  const { submission } = state;

  return (
    <div className="page-shell">
      <NavBar
        onLogout={() => setIsCustomModalOpen(true)}
        description=""
        mainMessage=""
      />
      <div className="mt-10  h-100 flex flex-col justify-center items-center space-y-5">
        <h1 className="text-4xl font-bold text-center"> End of CCNA Quiz !!</h1>
        <h2 className="text-3xl font-bold text-center">
          Your Score is {submission.score}
        </h2>
        <NavLink to={"/student/courseView"}>
          <Button text="Back to Course" />
        </NavLink>
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

export default EndQuiz;
