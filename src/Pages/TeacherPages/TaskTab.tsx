import { useCustomModal } from "../../hooks/useCustomModal";
import NavBar from "../../Layouts/NavBar";
import CustomModal from "../../Components/ui/CustomModal";
import AdvTable from "../../Components/AdvTable";
import Button from "../../Components/ui/Button";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useGetTeacherTasks } from "../../hooks/useTasks";
import TableSkeleton from "../../Components/TableSkeleton";

const TaskTab = () => {
  const { handleLogout } = useAuth();
  const { data, isLoading } = useGetTeacherTasks();
  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();
  if (isLoading)
    return (
      <div className="sm:m-15">
        <TableSkeleton role="admin" />
      </div>
    );

  return (
    <div className="page-shell box-border overflow-x-hidden">
      <NavBar
        onLogout={() => setIsCustomModalOpen(true)}
        description=""
        mainMessage="Course Tasks"
      />
      <div className="mt-18 md:ml-5 space-y-5 ">
        <NavLink to={"/teacher/addTask"}>
          <Button text="Add Task" />
        </NavLink>
        <AdvTable teacherTasks={data.assignments} role="task" />
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

export default TaskTab;
