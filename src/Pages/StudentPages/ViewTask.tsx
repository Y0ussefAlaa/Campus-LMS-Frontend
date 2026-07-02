import CustomModal from "../../Components/ui/CustomModal";
import { useCustomModal } from "../../hooks/useCustomModal";
import NavBar from "../../Layouts/NavBar";
import MaterialBox from "../../Components/MaterialBox";
import { useDeleteMaterialModal } from "../../hooks/useDeleteMaterialModal";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { useStudentGetSubmission } from "../../hooks/useTasks";
import InputSkeleton from "../../Components/ui/InputSkeleton";
import ChatbaseWidget from "../../Components/ChatBase";

const ViewStudentTask = () => {
  const { handleLogout } = useAuth();
  const { id } = useParams();
  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();
  const { data, isLoading } = useStudentGetSubmission(id!);
  const { setIsDelelteMaterialModalOpen } = useDeleteMaterialModal();
  if (isLoading)
    return (
      <div className="sm:m-15">
        {Array.from({ length: 2 }, (_, idx) => (
          <InputSkeleton key={idx} />
        ))}
      </div>
    );

  return (
    <div className="page-shell">
      <NavBar
        description=""
        mainMessage="CCNA Lec3"
        onLogout={() => setIsCustomModalOpen(true)}
      />

      <div className="mt-15 sm:ml-10">
        <MaterialBox
          setMaterialIdToDelete={() => ""}
          role="student"
          file={data.submission.submittedFile}
          txt={data.submission.submittedFileOriginalName}
          setIsDelelteMaterialModalOpen={setIsDelelteMaterialModalOpen}
        />
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

export default ViewStudentTask;
