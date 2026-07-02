// interface IProps  {}
import CustomModal from "../../Components/ui/CustomModal";
import { useCustomModal } from "../../hooks/useCustomModal";
import NavBar from "../../Layouts/NavBar";
import MaterialBox from "../../Components/MaterialBox";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import CourseBoxSkeleton from "../../Components/CourseBoxSkeleton";
import { useCourseQuizes } from "../../hooks/useQuizzes";
import type {  IQuizzes } from "../../interfaces";

const CourseQuizes = () => {
  const { handleLogout } = useAuth();
  const { id } = useParams();
  const { data, isLoading } = useCourseQuizes(id!);

  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();

  if (isLoading)
    return (
      <div className="m-5 sm:m-12 flex flex-col space-y-2.5">
        {Array.from({ length: 3 }, (_, idx) => (
          <CourseBoxSkeleton key={idx} />
        ))}
      </div>
    );

    
  return (
    <div className="page-shell">
      <NavBar
        description=""
        mainMessage="CCNA Course"
        onLogout={() => setIsCustomModalOpen(true)}
      />
      <div className="mt-18 md:ml-5 space-y-5 ">
        <p className="text-2xl font-semibold">Course Quizes</p>
        <div className="mt-10 flex flex-col space-y-3">
          {data.quizzes.map((quiz:IQuizzes) => (
            <MaterialBox
              quizId={quiz._id  }
              isDeleting={false}
              setMaterialIdToDelete={() => ""}
              role={"teacherquiz"}
              key={quiz._id}
              setIsDelelteMaterialModalOpen={() => ""}
              txt={quiz.title}
            />
          ))}
        </div>
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

export default CourseQuizes;
