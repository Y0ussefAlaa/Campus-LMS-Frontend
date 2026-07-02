import NavBar from "../../Layouts/NavBar";
import { useCustomModal } from "../../hooks/useCustomModal";
import CustomModal from "../../Components/ui/CustomModal";
import QuizQuestion from "../../Components/QuizQuestion";
import { type Key } from "react";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { useStudentGetQuizSubmission } from "../../hooks/useQuizzes";
import TakeQuizSkeleton from "../../Components/TakeQuizSkeleton";

const ViewQuestions = () => {
  const { handleLogout } = useAuth();

  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();
  const { id } = useParams();

  const { data, isLoading } = useStudentGetQuizSubmission(id!);

  if (isLoading) return <TakeQuizSkeleton />;

  return (
    <div className="page-shell">
      <NavBar
        onLogout={() => setIsCustomModalOpen(true)}
        mainMessage="CCNA Quiz"
        description=""
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:space-x-4.5 md:space-x-5 space-y-5 ml-10 mt-10">
        <p className="capitalize text-2xl font-semibold">
          final score : {data.submission.score}
        </p>
        <p className="capitalize text-2xl font-semibold">
          Total Question : {data.quiz.questionsCount}
        </p>
        <p className="capitalize text-2xl font-semibold">
          Total Time : {data.quiz.timeLimit}
        </p>
      </div>
      <div className="ml-10  mt-15">
        {data.submission.questions.map(
          (ques: {
            correctAnswer: string | undefined;
            _id: Key | null | undefined;
            text: string;
            studentAnswer: string | undefined;
            options: string[];
          }) => (
            <QuizQuestion
              role="view"
              answer={ques.correctAnswer}
              key={ques._id}
              question={ques.text}
              selectedOption={ques.studentAnswer}
              options={ques.options}
              onSelect={() => ""}
            />
          ),
        )}
      </div>

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

export default ViewQuestions;
