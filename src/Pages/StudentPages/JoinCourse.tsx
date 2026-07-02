import Button from "../../Components/ui/Button";
import CustomModal from "../../Components/ui/CustomModal";
import { useCustomModal } from "../../hooks/useCustomModal";
import NavBar from "../../Layouts/NavBar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { joinCourseSchema } from "../../schema";
import Input from "../../Components/ui/Input";
import { useAuth } from "../../context/AuthContext";
import { useStudentJoinCourse } from "../../hooks/useStudent";
import CircularProgress from "@mui/material/CircularProgress";
import ChatbaseWidget from "../../Components/ChatBase";

interface IFormData {
  coursecode: string;
}

const JoinCourse = () => {
  const { handleLogout } = useAuth();
  const { mutate: JoinCourse, isPending } = useStudentJoinCourse();
  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(joinCourseSchema),
  });

  const onSubmit = (data: IFormData) => {
    JoinCourse(data);
    reset();
  };

  return (
    <div className="page-shell">
      <NavBar
        description=""
        mainMessage="Join Course"
        onLogout={() => setIsCustomModalOpen(true)}
      />
      <form
        className="mt-12 sm:ml-5 space-y-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col space-y-0.5">
          <Input {...register("coursecode")} label="Course Name" />
          <p className="text-red-600 text-lg">{errors.coursecode?.message}</p>
        </div>

        <Button
          text={
            isPending ? (
              <CircularProgress size={25} aria-label="Loading…" />
            ) : (
              "Joindd"
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
      <ChatbaseWidget />
    </div>
  );
};

export default JoinCourse;
