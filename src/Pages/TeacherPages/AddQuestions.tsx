import { useForm } from "react-hook-form";
import CustomModal from "../../Components/ui/CustomModal";
import { useCustomModal } from "../../hooks/useCustomModal";
import NavBar from "../../Layouts/NavBar";
import { yupResolver } from "@hookform/resolvers/yup";
import { addQuestuinsShcema } from "../../schema";
import Input from "../../Components/ui/Input";
import type { InferType } from "yup";
import Button from "../../Components/ui/Button";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useQuiz } from "../../context/QuizContext";
import { useNavigate } from "react-router-dom";
import { useCreateQuiz } from "../../hooks/useQuizzes";
import CircularProgress from "@mui/material/CircularProgress";
import ChatbaseWidget from "../../Components/ChatBase";

type IFormData = InferType<typeof addQuestuinsShcema>;

const AddQuestions = () => {
  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const { quiz } = useQuiz();
  const { mutate: AddQuiz, isPending } = useCreateQuiz();
  const [quesNumber, setQuesNumber] = useState<number>(1);
  const [questions, setQuestions] = useState<IFormData[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addQuestuinsShcema),
  });

  useEffect(() => {
    setValue("questionnum", quesNumber);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quesNumber]);

  if (!quiz) {
    navigate("/teacher/addQuiz");
    return null;
  }
  const TOTAL_QUESTIONS = quiz?.questionsNumber ?? 0;

  //** Handlers

  const saveCurrentQuestion = (data: IFormData) => {
    setQuestions((prev) => {
      const exists = prev.find((q) => q.questionnum === quesNumber);
      if (exists) {
        return prev.map((q) =>
          q.questionnum === quesNumber ? { ...q, ...data } : q,
        );
      }
      return [...prev, { ...data, questionnum: quesNumber }];
    });
  };

  // Validates current inputs, only moves forward if valid
  const onNextClick = handleSubmit((data) => {
    saveCurrentQuestion(data);
    setQuesNumber((prev) => prev + 1);
    reset({ questionnum: quesNumber + 1 } as IFormData);
  });

  const onBackClick = () => {
    // save before going back
    const currentData = getValues(); // add getValues from useForm
    saveCurrentQuestion(currentData as IFormData);

    const prevNum = quesNumber - 1;
    const saved = questions.find((q) => q.questionnum === prevNum);
    setQuesNumber(prevNum);
    reset(saved ?? ({ questionnum: prevNum } as IFormData)); // restore saved data
  };

  const onSubmit = handleSubmit((data) => {
    const finalQuestions = (() => {
      const exists = questions.find((q) => q.questionnum === quesNumber);
      if (exists) {
        return questions.map((q) =>
          q.questionnum === quesNumber ? { ...q, ...data } : q,
        );
      }
      return [...questions, { ...data, questionnum: quesNumber }];
    })();

    // ✅ Map to API shape
    const mappedQuestions = finalQuestions.map((q) => ({
      text: q.question,
      options: [q.opt1, q.opt2, q.opt3, q.opt4],
      correctAnswer: q.answer,
      points: q.points,
    }));

    const payload = {
      ...quiz,
      questions: mappedQuestions,
    };

    AddQuiz(payload);
  });
  return (
    <div className="page-shell">
      <NavBar
        description=""
        mainMessage="Add Questions  "
        onLogout={() => setIsCustomModalOpen(true)}
      />
      <form className="mt-12 sm:ml-5 space-y-10" onSubmit={onSubmit}>
        <div className="flex space-x-10">
          <div className="flex flex-col space-y-0.5 w-[60%]">
            <Input
              {...register("question")}
              label="question"
              className="max-w-full"
            />
            <p className="text-red-600 text-lg">{errors.question?.message}</p>
          </div>
          <div className="flex flex-col space-y-0.5  w-[10%]">
            <Input
              disabled
              {...register("questionnum")}
              label="question number"
            />
            <p className="text-red-600 text-lg">
              {errors.questionnum?.message}
            </p>
          </div>
        </div>
        <div className="flex space-x-10">
          <div className="flex flex-col space-y-0.5 w-[60%]">
            <Input
              {...register("opt1")}
              label="option 1"
              className="max-w-full"
            />
            <p className="text-red-600 text-lg">{errors.opt1?.message}</p>
          </div>
          <div className="flex flex-col space-y-0.5 w-[10%]">
            <Input {...register("points")} label="points" />
            <p className="text-red-600 text-lg">{errors.points?.message}</p>
          </div>
        </div>
        <div className="flex flex-col space-y-0.5">
          <Input {...register("opt2")} label="option 2" />
          <p className="text-red-600 text-lg">{errors.opt2?.message}</p>
        </div>
        <div className="flex flex-col space-y-0.5">
          <Input {...register("opt3")} label="option 3" />
          <p className="text-red-600 text-lg">{errors.opt3?.message}</p>
        </div>
        <div className="flex flex-col space-y-0.5">
          <Input {...register("opt4")} label="option 4" />
          <p className="text-red-600 text-lg">{errors.opt4?.message}</p>
        </div>
        <div className="flex flex-col space-y-0.5">
          <Input {...register("answer")} label="answer" />
          <p className="text-red-600 text-lg">{errors.answer?.message}</p>
        </div>

        <div className="flex space-x-2">
          {quesNumber > 1 && (
            <Button text="back" type="button" onClick={onBackClick} />
          )}

          {quesNumber < TOTAL_QUESTIONS && (
            <Button text="next" type="button" onClick={onNextClick} />
          )}

          {quesNumber === TOTAL_QUESTIONS && (
            <Button
              text={
                isPending ? (
                  <CircularProgress size={25} aria-label="Loading…" />
                ) : (
                  "Finish"
                )
              }
              type="submit"
            />
          )}
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
      <ChatbaseWidget />
    </div>
  );
};

export default AddQuestions;
