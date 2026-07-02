import { useCustomModal } from "../../hooks/useCustomModal";
import NavBar from "../../Layouts/NavBar";
import CustomModal from "../../Components/ui/CustomModal";
import AdvTable from "../../Components/AdvTable";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { useGetTasksSubmissions } from "../../hooks/useTasks";
import TableSkeleton from "../../Components/TableSkeleton";

const TaskResults = () => {
  const { handleLogout } = useAuth();

  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();
  const { id } = useParams();
  const { data, isLoading } = useGetTasksSubmissions(id!);
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
        mainMessage="CCNA Course"
      />
      <div className="mt-18 md:ml-5 space-y-5 ">
        <p className="text-2xl font-semibold">CCNA Lec 3</p>
        <AdvTable role="taskresult" taskResults={data.submissions} />
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

export default TaskResults;
