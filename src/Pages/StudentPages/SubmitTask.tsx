import { useForm } from "react-hook-form";
import CustomModal from "../../Components/ui/CustomModal";
import { useCustomModal } from "../../hooks/useCustomModal";
import NavBar from "../../Layouts/NavBar";
import { yupResolver } from "@hookform/resolvers/yup";
import { taskUploadSchema } from "../../schema";
import type { InferType } from "yup";
import Button from "../../Components/ui/Button";
import CustomFileInput from "../../Components/ui/CustomFileInput";
import TextArea from "../../Components/ui/TextArea";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { useSubmitTask } from "../../hooks/useTasks";
import CircularProgress from "@mui/material/CircularProgress";

type IFormData = InferType<typeof taskUploadSchema>;
const SubmitTask = () => {
  const { handleLogout } = useAuth();
  const { id } = useParams();
  const { mutate: SubmitTask, isPending } = useSubmitTask();
  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(taskUploadSchema),
  });



  // **Handlers

  const onSubmit = (data: IFormData) => {
    if (!id) return;
    const formData = new FormData();

    formData.append("submittedText", data.submittedText);

    if (data.file?.length) {
      formData.append("file", data.file[0]);
    }

    SubmitTask({ id, formData });
    reset();
  };


  return (
    <div className="page-shell">
      <NavBar
        description=""
        mainMessage=" CCNA Lec3 Task"
        onLogout={() => setIsCustomModalOpen(true)}
      />
      <form
        className="mt-12 sm:ml-5 space-y-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col space-y-0.5">
          <TextArea
            {...register("submittedText")}
            label="Type a message here"
          />
          <p className="text-red-600 text-lg">
            {errors.submittedText?.message}
          </p>
        </div>
        <div className="flex flex-col space-y-0.5">
          <CustomFileInput {...register("file")} type="file" label="file" />
          <p className="text-red-600 text-lg">{errors.file?.message}</p>
        </div>
        <Button
          text={
            isPending ? (
              <CircularProgress size={25} aria-label="Loading…" />
            ) : (
              "submit"
            )
          }
        />
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

export default SubmitTask;
