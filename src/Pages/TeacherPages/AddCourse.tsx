import Button from "../../Components/ui/Button";
import Input from "../../Components/ui/Input";
import NavBar from "../../Layouts/NavBar";
import { useCustomModal } from "../../hooks/useCustomModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addCourseShcema } from "../../schema";
import CustomModal from "../../Components/ui/CustomModal";
import { Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import CustomFileInput from "../../Components/ui/CustomFileInput";
import type { InferType } from "yup";
import { useAuth } from "../../context/AuthContext";
import { useTeacherAddCourses } from "../../hooks/useTeacher";
import CircularProgress from "@mui/material/CircularProgress";

type IFormData = InferType<typeof addCourseShcema>;

const AddCourse = () => {
  const { handleLogout } = useAuth();
  const { mutate: AddCourse, isPending } = useTeacherAddCourses();
  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addCourseShcema),
  });

  const onSubmit = (data: IFormData) => {
    AddCourse(data);
    reset();
  };

  const onAddCodeClick = () => {
    setValue("coursecode", uuidv4());
  };

  return (
    <div className="page-shell">
      <NavBar
        description=""
        mainMessage="Add Course"
        onLogout={() => setIsCustomModalOpen(true)}
      />
      <form
        className="mt-12 sm:ml-5 space-y-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col space-y-0.5">
          <Input {...register("coursename")} label="Course Name" />
          <p className="text-red-600 text-lg">{errors.coursename?.message}</p>
        </div>
        <div className="w-full flex flex-col space-y-0.5">
          <div className="flex justify-between items-end w-[60%]">
            <Input
              {...register("coursecode")}
              className="max-w-full"
              divClass="w-[90%]"
              label="course code"
            />
            <button
              className="p-1 bg-[#4281ED] hover:bg-[#3863ae] rounded cursor-pointer"
              onClick={onAddCodeClick} type="button"
            >
              <Plus color="white" />
            </button>
          </div>
          <p className="text-red-600 text-lg">{errors.coursecode?.message}</p>
        </div>
        <div className="flex flex-col space-y-0.5">
          <CustomFileInput
            {...register("image")}
            label="Course Image (Optional)"
            type="file"
          />
          <p className="text-red-600 text-lg">{errors.image?.message}</p>
        </div>
        <div className="flex flex-col space-y-0.5">
          <Input {...register("year")}  label="year" />
          <p className="text-red-600 text-lg">{errors.year?.message}</p>
        </div>
        <div className="flex flex-col space-y-0.5">
          <Input
            {...register("department")}
            label="department"
          />
          <p className="text-red-600 text-lg">{errors.department?.message}</p>
        </div>
        <Button text={isPending ? <CircularProgress size={25} aria-label="Loading…" /> : "Add"} />
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

export default AddCourse;
