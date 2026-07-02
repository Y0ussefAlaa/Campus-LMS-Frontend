import { useForm } from "react-hook-form";
import CustomModal from "../../Components/ui/CustomModal";
import { useCustomModal } from "../../hooks/useCustomModal";
import NavBar from "../../Layouts/NavBar";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { addQuizShcema } from "../../schema";
import Input from "../../Components/ui/Input";
import type { InferType } from "yup";
import Button from "../../Components/ui/Button";
import { useNavigate } from "react-router-dom";
import Select from "../../Components/ui/Select";
import { useAuth } from "../../context/AuthContext";
import { useQuiz } from "../../context/QuizContext";
import { useTeacherGetCourses } from "../../hooks/useTeacher";
import InputSkeleton from "../../Components/ui/InputSkeleton";
import type { ICourse } from "../../interfaces";

type IFormData = InferType<typeof addQuizShcema>;
const AddQuiz = () => {
  const { handleLogout } = useAuth();
  const { setQuiz } = useQuiz();
  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();
  const { data: courses, isLoading } = useTeacherGetCourses();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addQuizShcema),
  });

  const onSubmit = (data: IFormData) => {
    const payload = {
      courseId: data.selectcourse, // use actual id from backend
      title: data.title,
      dueDate: data.duedate,
      timeLimit: Number(data.timelimit),
      questionsNumber: Number(data.quesnum),
      questions: [],
    };

    setQuiz(payload);

    navigate(`/teacher/addQuestions/`);

    reset();

    toast("Added Successfully");
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
        mainMessage="Add Quiz"
        onLogout={() => setIsCustomModalOpen(true)}
      />
      <form
        className="mt-12 sm:ml-5 space-y-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col space-y-0.5">
          <Select
            options={options}
            {...register("selectcourse")}
            label="select course"
          />
          <p className="text-red-600 text-lg">{errors.selectcourse?.message}</p>
        </div>
        <div className="flex flex-col space-y-0.5">
          <Input {...register("title")} label="title" />
          <p className="text-red-600 text-lg">{errors.title?.message}</p>
        </div>
        <div className="flex flex-col space-y-0.5">
          <Input {...register("quesnum")} label="Question numbers" />
          <p className="text-red-600 text-lg">{errors.quesnum?.message}</p>
        </div>
        <div className="flex flex-col space-y-0.5">
          <Input {...register("duedate")} type="date" label="due date" />
          <p className="text-red-600 text-lg">{errors.duedate?.message}</p>
        </div>
        <div className="flex flex-col space-y-0.5">
          <Input {...register("timelimit")} label="time limit (number)" />
          <p className="text-red-600 text-lg">{errors.timelimit?.message}</p>
        </div>

        <Button text="Add Questions" type="submit" />
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

export default AddQuiz;
