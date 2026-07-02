// interface IProps  {}

import { NavLink, useParams } from "react-router-dom";
import CustomModal from "../../Components/ui/CustomModal";
import { useCustomModal } from "../../hooks/useCustomModal";
import NavBar from "../../Layouts/NavBar";
import { Plus } from "lucide-react";
import Button from "../../Components/ui/Button";
import MaterialBox from "../../Components/MaterialBox";
import { useDeleteMaterialModal } from "../../hooks/useDeleteMaterialModal";
import CookiesService from "../../Services/CookiesService";
import { useAuth } from "../../context/AuthContext";
import {
  useTeacherDeleteMaterial,
  useTeacherGetCourseMaterial,
} from "../../hooks/useTeacher";
import CourseBoxSkeleton from "../../Components/CourseBoxSkeleton";
import type { IMaterial } from "../../interfaces";

// {} : IProps
const CourseMaterial = () => {
  const { handleLogout } = useAuth();
  const { id } = useParams();
  const role = CookiesService.getCookie("role");
  const { mutate: DeleteMaterial, isPending } = useTeacherDeleteMaterial();
  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();
  const {
    isDelelteMaterialModalOpen,
    materialIdToDelete,
    setMaterialIdToDelete,
    setIsDelelteMaterialModalOpen,
  } = useDeleteMaterialModal();
  // ** Handelrs
  const onConfirmDeleteMaterial = () => {
    DeleteMaterial(materialIdToDelete);
    setIsDelelteMaterialModalOpen(false);
  };

  const { data, isLoading } = useTeacherGetCourseMaterial(id!);
  if (isLoading)
    return (
      <div className="m-5 sm:m-10 flex flex-col space-y-3">
        {Array.from({ length: 10 }, (_, idx) => (
          <CourseBoxSkeleton key={idx} />
        ))}
      </div>
    );

  return (
    <div className="page-shell">
      <NavBar
        description=""
        mainMessage="Course Material"
        onLogout={() => setIsCustomModalOpen(true)}
      />
      <div className="mt-18 md:ml-5 space-y-5 ">
        <NavLink to={`/teacher/addMaterial/${id}`}>
          <Button text="Upload Material" icon={<Plus size={18} />} />
        </NavLink>
        <div className="mt-10 flex flex-col space-y-2.5">
          {data.materials.map((material: IMaterial) => (
            <MaterialBox
              isDeleting={isPending}
              setMaterialIdToDelete={setMaterialIdToDelete}
              role={role}
              materialId={material._id}
              setIsDelelteMaterialModalOpen={setIsDelelteMaterialModalOpen}
              txt={material.title}
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
      {/* DELETE MATERIAL MODAL */}
      <CustomModal
        cancelTxt="No"
        confirmTxt="Yes"
        mainTxt="Are you sure you want to Delete this item?"
        onConfirm={onConfirmDeleteMaterial}
        open={isDelelteMaterialModalOpen}
        setIsOpen={setIsDelelteMaterialModalOpen}
      />
    </div>
  );
};

export default CourseMaterial;
