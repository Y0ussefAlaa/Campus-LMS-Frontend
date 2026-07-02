import CustomModal from "../../Components/ui/CustomModal";
import { useCustomModal } from "../../hooks/useCustomModal";
import NavBar from "../../Layouts/NavBar";
import Button from "../../Components/ui/Button";
import { useParams } from "react-router-dom";
import MaterialBox from "../../Components/MaterialBox";
import TextArea from "../../Components/ui/TextArea";
import { useAuth } from "../../context/AuthContext";
import InputSkeleton from "../../Components/ui/InputSkeleton";
import {
  useGetTeacherStudentSubmission,
  useTeacherApproveRejectTask,
} from "../../hooks/useTasks";

const ViewTask = () => {
  const { handleLogout } = useAuth();
  const { id } = useParams();
  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();
  const { mutate, isPending } = useTeacherApproveRejectTask();
  const { data, isLoading } = useGetTeacherStudentSubmission(id!);

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
      <form className="mt-12 sm:ml-5 space-y-10">
        <div className="flex flex-col space-y-0.5">
          <TextArea
            label="Message"
            disabled
            value={data.submission.submittedText}
          />
        </div>
        <MaterialBox
          setMaterialIdToDelete={() => ""}
          role="student"
          file={data.submission.submittedFile}
          txt={data.submission.submittedFileOriginalName}
          setIsDelelteMaterialModalOpen={() => ""}
        />

        <div className="flex space-x-2.5">
          <Button
            text="reject"
            type="button"
            onClick={() => {
              if (!id) return;
              mutate({ id, status: "rejected" });
            }}
            disabled={isPending}
          />
          <Button
            text="Approve"
            type="button"
            onClick={() => {
              if (!id) return;
              mutate({ id, status: "approved" });
            }}
            disabled={isPending}
          />
        </div>
      </form>
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

export default ViewTask;
