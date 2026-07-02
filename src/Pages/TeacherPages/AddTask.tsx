import { useForm } from "react-hook-form";
import CustomModal from "../../Components/ui/CustomModal";
import { useCustomModal } from "../../hooks/useCustomModal";
import NavBar from "../../Layouts/NavBar";
import { yupResolver } from "@hookform/resolvers/yup";
import { addTaskShcema } from "../../schema";
import Input from "../../Components/ui/Input";
import type { InferType } from "yup";
import Button from "../../Components/ui/Button";

import Select from "../../Components/ui/Select";
import TextArea from "../../Components/ui/TextArea";
import { useAuth } from "../../context/AuthContext";
import { useCreateTask } from "../../hooks/useTasks";
import { useTeacherGetCourses } from "../../hooks/useTeacher";
import InputSkeleton from "../../Components/ui/InputSkeleton";
import type { ICourse } from "../../interfaces";
import CircularProgress from "@mui/material/CircularProgress";

type IFormData = InferType<typeof addTaskShcema>;
const AddTask = () => {
  const { handleLogout } = useAuth();

  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();
  const { data: courses, isLoading } = useTeacherGetCourses();
  const { mutate: AddTask, isPending } = useCreateTask();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addTaskShcema),
  });

  const onSubmit = (data: IFormData) => {
    AddTask(data);
    reset();
  };
  if (isLoading)
    return (
      <div className="sm:m-15">
        {Array.from({ length: 4 }, (_, idx) => (
          <InputSkeleton key={idx} />
        ))}
      </div>
    );
  const options = courses.courses.map((course: ICourse) => {
    const value = course._id;
    const label = course.name;
    return { label, value };
  });
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
          <Select
            options={options}
            {...register("courseId")}
            label="select course"
          />
          <p className="text-red-600 text-lg">{errors.courseId?.message}</p>
        </div>
        <div className="flex flex-col space-y-0.5">
          <Input {...register("title")} label="title" />
          <p className="text-red-600 text-lg">{errors.title?.message}</p>
        </div>
        <div className="flex flex-col space-y-0.5">
          <TextArea {...register("description")} label="Description" />
          <p className="text-red-600 text-lg">{errors.description?.message}</p>
        </div>
        <div className="flex flex-col space-y-0.5">
          <Input {...register("dueDate")} type="date" label="due date" />
          <p className="text-red-600 text-lg">{errors.dueDate?.message}</p>
        </div>

        <Button
          text={
            isPending ? (
              <CircularProgress size={25} aria-label="Loading…" />
            ) : (
              "Add Task"
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

export default AddTask;
