import { useForm } from "react-hook-form";
import CustomModal from "../../Components/ui/CustomModal";
import { useCustomModal } from "../../hooks/useCustomModal";
import NavBar from "../../Layouts/NavBar";
import { yupResolver } from "@hookform/resolvers/yup";
import { editTaskShcema } from "../../schema";
import Input from "../../Components/ui/Input";
import type { InferType } from "yup";
import Button from "../../Components/ui/Button";
import {  useParams } from "react-router-dom";
import TextArea from "../../Components/ui/TextArea";
import { useAuth } from "../../context/AuthContext";
import { useEditTask } from "../../hooks/useTasks";
import CircularProgress from "@mui/material/CircularProgress";

type IFormData = InferType<typeof editTaskShcema>;
const EditTask = () => {
  const { handleLogout } = useAuth();
  const { id } = useParams();
  const { mutate: EditTask, isPending } = useEditTask();
  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editTaskShcema),
  });

  const onSubmit = (data: IFormData) => {
    if (!id) return;
    EditTask({ id, data });
    reset();
  };

  return (
    <div className="page-shell">
      <NavBar
        description=""
        mainMessage="Add Task"
        onLogout={() => setIsCustomModalOpen(true)}
      />
      <form
        className="mt-12 sm:ml-5 space-y-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col space-y-0.5">
          <Input {...register("title")} label="title" />
          <p className="text-red-600 text-lg">{errors.title?.message}</p>
        </div>
        <div className="flex flex-col space-y-0.5">
          <TextArea {...register("description")} label="Description" />
          <p className="text-red-600 text-lg">{errors.description?.message}</p>
        </div>
        <div className="flex flex-col space-y-0.5">
          <Input {...register("duedate")} type="date" label="due date" />
          <p className="text-red-600 text-lg">{errors.duedate?.message}</p>
        </div>

        <Button  text={
                    isPending ? (
                      <CircularProgress size={25} aria-label="Loading…" />
                    ) : (
                      "Update Task"
                    )
                  }/>
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

export default EditTask;
