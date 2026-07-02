import CustomModal from "../../Components/ui/CustomModal";
import { useCustomModal } from "../../hooks/useCustomModal";
import NavBar from "../../Layouts/NavBar";
import MaterialBox from "../../Components/MaterialBox";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { useGetTasks } from "../../hooks/useTasks";
import CourseBoxSkeleton from "../../Components/CourseBoxSkeleton";
import type { ITask } from "../../interfaces";

const CourseTasks = () => {
  const { handleLogout } = useAuth();
  const { id } = useParams();
  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();
  const { data, isLoading } = useGetTasks(id!);
  if (isLoading)
    return (
      <div className="m-5 sm:m-12 flex flex-col space-y-1.5">
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
        <p className="text-2xl font-semibold">Course Tasks</p>
        <div className="mt-10 flex flex-col space-y-3">
          {data.assignments.map((task:ITask) => (
            <MaterialBox
              isDeleting={false}
              setMaterialIdToDelete={() => ""}
              quizId=""
              taskId={task._id}
              role={"teachertask"}
              key={task._id}
              setIsDelelteMaterialModalOpen={() => false}
              txt={task.title}
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

export default CourseTasks;
