import NavBar from "../../Layouts/NavBar";
import { useCustomModal } from "../../hooks/useCustomModal";
import CustomModal from "../../Components/ui/CustomModal";
import QuizQuestion from "../../Components/QuizQuestion";
import { useState } from "react";
import Button from "../../Components/ui/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSubmitQuiz, useTakeQuiz } from "../../hooks/useQuizzes";
import TakeQuizSkeleton from "../../Components/TakeQuizSkeleton";
import Countdown from "react-countdown";
import CircularProgress from "@mui/material/CircularProgress";
import toast from "react-hot-toast";
const TakeQuiz = () => {
  const { handleLogout } = useAuth();
  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();
  const [quesNumber, setQuesNumber] = useState<number>(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const { id: quizId } = useParams();
  const { data, isLoading } = useTakeQuiz(quizId!);
  const navigate = useNavigate();

  const onNextClick = () => setQuesNumber((prev) => prev + 1);
  const onBackClick = () => setQuesNumber((prev) => prev - 1);

  const handleSelect = (option: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion._id]: option }));
  };

  const { mutate: SubmitQuiz, isPending } = useSubmitQuiz();

  const onFinish = () => {
    const payload = {
      answers: Object.entries(answers).map(([questionId, answer]) => ({
        questionId,
        answer,
      })),
    };

    SubmitQuiz(
      { id: quizId!, data: payload },
      {
        onSuccess: (data) => {
          navigate("/student/endQuiz", {
            state: { submission: data.submission },
          });
        },
        onError: () => {
          toast.error("Submit Failed");
        },
      },
    );
  };

  if (isLoading) return <TakeQuizSkeleton />;

  const TOTAL = data.quiz.questionsCount;
  const currentQuestion = data.questions[quesNumber - 1];

  return (
    <div className="page-shell">
      <NavBar
        onLogout={() => setIsCustomModalOpen(true)}
        mainMessage="CCNA Quiz"
        description=""
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:space-x-4.5 md:space-x-5 space-y-5 ml-10 mt-10">
        <p className="capitalize text-2xl font-semibold">
          Question no. : {quesNumber}
        </p>
        <p className="capitalize text-2xl font-semibold">
          Total Question : {TOTAL}
        </p>
        <p className="capitalize text-2xl font-semibold">
          Total Time : {data.quiz.timeLimit}
        </p>
        <div className="capitalize text-2xl font-semibold">
          <Countdown
            // eslint-disable-next-line react-hooks/purity
            date={Date.now() + data.quiz.timeLimit * 60 * 1000}
            onComplete={onFinish}
            renderer={({ minutes, seconds }) => (
              <p
                className={`capitalize text-2xl font-semibold ${minutes === 0 && seconds <= 60 ? "text-red-600" : ""}`}
              >
                Remaining time : {String(minutes).padStart(2, "0")}:
                {String(seconds).padStart(2, "0")}
              </p>
            )}
          />
        </div>
      </div>

      <div className="ml-10 mt-10">
        <QuizQuestion
          role="take"
          key={currentQuestion._id}
          question={currentQuestion.text}
          selectedOption={answers[currentQuestion._id] ?? ""}
          options={currentQuestion.options}
          onSelect={handleSelect}
        />
      </div>

      <div className="flex space-x-2 ml-10 mt-8">
        {quesNumber > 1 && (
          <Button text="back" type="button" onClick={onBackClick} />
        )}
        {quesNumber < TOTAL && (
          <Button text="next" type="button" onClick={onNextClick} />
        )}
        {quesNumber === TOTAL && (
          <Button
            text={
              isPending ? (
                <CircularProgress size={25} aria-label="Loading…" />
              ) : (
                "finish"
              )
            }
            type="button"
            onClick={onFinish}
          />
        )}
      </div>

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

export default TakeQuiz;
