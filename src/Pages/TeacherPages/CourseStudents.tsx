import { useCustomModal } from "../../hooks/useCustomModal";
import NavBar from "../../Layouts/NavBar";
import Table from "../../Components/Table";
import CustomModal from "../../Components/ui/CustomModal";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { useTeacherGetCourseStudents } from "../../hooks/useTeacher";
import TableSkeleton from "../../Components/TableSkeleton";

// interface Props {}
// {}: IProps
const CourseStudents = () => {
  const { handleLogout } = useAuth();
  const { id } = useParams();
  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();
  const {data , isLoading} =useTeacherGetCourseStudents(id!)
  if(isLoading) return <div className="sm:m-15"><TableSkeleton role="admin" /></div>
  
  return (
    <div className="page-shell box-border overflow-x-hidden">
      <NavBar
        onLogout={() => setIsCustomModalOpen(true)}
        description=""
        mainMessage="Course Students"
      />
      <div className="mt-18 md:ml-5 space-y-5 ">
        <Table users={data.students} role="studentFromTeacher" />
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

export default CourseStudents;
