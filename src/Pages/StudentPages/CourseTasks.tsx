// interface IProps  {}
import CustomModal from "../../Components/ui/CustomModal";
import { useCustomModal } from "../../hooks/useCustomModal";
import NavBar from "../../Layouts/NavBar";
import { useDeleteMaterialModal } from "../../hooks/useDeleteMaterialModal";
import AdvTable from "../../Components/AdvTable";
import { useAuth } from "../../context/AuthContext";
import { useGetTasks } from "../../hooks/useTasks";
import { useParams } from "react-router-dom";
import TableSkeleton from "../../Components/TableSkeleton";
import { useStudentGetCourses } from "../../hooks/useStudent";
import type { ICourse } from "../../interfaces";
import CircularProgress from "@mui/material/CircularProgress";
import ChatbaseWidget from "../../Components/ChatBase";

// {} : IProps
const StudentCourseTasks = () => {
  const { handleLogout } = useAuth();

  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();
  const { isDelelteMaterialModalOpen, setIsDelelteMaterialModalOpen } =
    useDeleteMaterialModal();
  // ** Handelrs
  const onConfirmDeleteMaterial = () => {
    setIsDelelteMaterialModalOpen(false);
  };
  const { id } = useParams();

  const { data, isLoading } = useGetTasks(id!);

  const { data: studentCourses, isLoading: isLoadingCourses } =
    useStudentGetCourses();
  let name;
  if (!isLoadingCourses) {
    const course: ICourse = studentCourses.courses.filter(
      (course: ICourse) => course._id === id,
    )[0];
    name = course.name;
  } else {
    name = <CircularProgress />;
  }
  if (isLoading)
    return (
      <div className="sm:m-12">
        <TableSkeleton role="admin" />
      </div>
    );
    
  return (
    <div className="page-shell">
      <NavBar
        description=""
        mainMessage={name}
        onLogout={() => setIsCustomModalOpen(true)}
      />
      <div className="mt-18 md:ml-5 space-y-5 ">
        <AdvTable role="studenttask" studentTasks={data.assignments} />
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
      {/* DELETE MATERIAL MODAL */}
      <CustomModal
        cancelTxt="No"
        confirmTxt="Yes"
        mainTxt="Are you sure you want to Delete this item?"
        onConfirm={onConfirmDeleteMaterial}
        open={isDelelteMaterialModalOpen}
        setIsOpen={setIsDelelteMaterialModalOpen}
      />
      <ChatbaseWidget />
    </div>

  );
};

export default StudentCourseTasks;
