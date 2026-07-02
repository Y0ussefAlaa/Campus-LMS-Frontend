import Button from "../../Components/ui/Button";
import Input from "../../Components/ui/Input";
import NavBar from "../../Layouts/NavBar";
import { useCustomModal } from "../../hooks/useCustomModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editQuizShcema } from "../../schema";
import CustomModal from "../../Components/ui/CustomModal";
import Select from "../../Components/ui/Select";
import { useAuth } from "../../context/AuthContext";
import { useEditQuiz } from "../../hooks/useQuizzes";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

interface IFormData {
  title: string;
  dueDate: string;
  timeLimit: number;
  status: string;
}

const EditQuiz = () => {
  const { handleLogout } = useAuth();
  const { mutate: EditQuiz, isPending } = useEditQuiz();
  const { id } = useParams();
  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editQuizShcema),
  });

  const onSubmit = (data: IFormData) => {
    if (!id) return;
    EditQuiz({ id, data });
    reset();
  };

  return (
    <div className="page-shell">
      <NavBar
        description=""
        mainMessage="Edit Quiz"
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
          <Input {...register("dueDate")} type="date" label="due-date" />
          <p className="text-red-600 text-lg">{errors.dueDate?.message}</p>
        </div>
        <div className="flex flex-col space-y-0.5">
          <Input {...register("timeLimit")} label="time limit" />
          <p className="text-red-600 text-lg">{errors.timeLimit?.message}</p>
        </div>
        <div className="flex flex-col space-y-0.5">
          <Select
            options={[
              { label: "active", value: "active" },
              { label: "closed", value: "closed" },
            ]}
            {...register("status")}
            label="status"
          />
          <p className="text-red-600 text-lg">{errors.status?.message}</p>
        </div>

        <Button
          text={
            isPending ? (
              <CircularProgress size={25} aria-label="Loading…" />
            ) : (
              "Update"
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

export default EditQuiz;
