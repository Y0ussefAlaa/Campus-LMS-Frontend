import {  useParams } from "react-router-dom";
import CustomModal from "../../Components/ui/CustomModal";
import { useCustomModal } from "../../hooks/useCustomModal";
import NavBar from "../../Layouts/NavBar";
import MaterialBox from "../../Components/MaterialBox";
import { useDeleteMaterialModal } from "../../hooks/useDeleteMaterialModal";
import { useAuth } from "../../context/AuthContext";
import {
  useStudentGetCourses,
  useStudentGetMaterial,
} from "../../hooks/useStudent";
import CourseBoxSkeleton from "../../Components/CourseBoxSkeleton";
import type { ICourse, IMaterial } from "../../interfaces";
import CircularProgress from "@mui/material/CircularProgress";
import ChatbaseWidget from "../../Components/ChatBase";

const CourseMaterial = () => {
  const { handleLogout } = useAuth();
  const { id } = useParams();
  const { data, isPending } = useStudentGetMaterial(id!);
  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();
  const { setMaterialIdToDelete, setIsDelelteMaterialModalOpen } =
    useDeleteMaterialModal();
  const { data: studentCourses, isLoading: isLoadingCourses } =
    useStudentGetCourses();

  if (isPending)
    return (
      <div className="m-5 sm:m-10 flex flex-col space-y-3">
        {Array.from({ length: 10 }, (_, idx) => (
          <CourseBoxSkeleton key={idx} />
        ))}
      </div>
    );
  let name;
  if (!isLoadingCourses) {
    const course: ICourse = studentCourses.courses.filter(
      (course: ICourse) => course._id === id,
    )[0];
    name = course.name;
  } else {
    name = <CircularProgress />;
  }
  
  return (
    <div className="page-shell">
      <NavBar
        description=""
        mainMessage={name}
        onLogout={() => setIsCustomModalOpen(true)}
      />
      <div className="mt-18 md:ml-5 space-y-5 ">
        <div className="mt-10 flex flex-col space-y-3">
          {data.materials.map((item: IMaterial) => (
            <MaterialBox
            file={item.file}
              key={item._id}
              isDeleting={isPending}
              setMaterialIdToDelete={setMaterialIdToDelete}
              role={"student"}
              setIsDelelteMaterialModalOpen={setIsDelelteMaterialModalOpen}
              txt={item.title}
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
      <ChatbaseWidget />
    </div>
  );
};

export default CourseMaterial;
