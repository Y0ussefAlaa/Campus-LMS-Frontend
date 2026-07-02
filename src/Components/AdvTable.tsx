import { txtSlicer } from "../utils";
import { Pencil, Trash } from "lucide-react";
import { NavLink } from "react-router-dom";

import CustomModal from "./ui/CustomModal";
import { useCustomModal } from "../hooks/useCustomModal";
import AdvTableBox from "./AdvTableBox";

import { advTableHeads } from "../data";

import Button from "./ui/Button";
import type {
  IQuizResult,
  IQuizzes,
  ITask,
  ITaskResult,
  ITeacherQuiz,
  ITeacherTask,
} from "../interfaces";
import { useDeleteQuiz } from "../hooks/useQuizzes";
import { useDeleteTask } from "../hooks/useTasks";

interface IProps {
  role:
    | "quiz"
    | "quizresult"
    | "task"
    | "taskresult"
    | "studentquiz"
    | "studenttask";

  quizzes?: IQuizzes[];
  teacherQuizzes?: ITeacherQuiz[];
  studentTasks?: ITask[];
  teacherTasks?: ITeacherTask[];
  quizResults?: IQuizResult[];
  taskResults?: ITaskResult[];
}

const AdvTable = ({
  role,
  quizzes = [],
  teacherQuizzes = [],
  studentTasks = [],
  teacherTasks = [],
  quizResults = [],
  taskResults = [],
}: IProps) => {
  const { mutate: DeleteQuiz, isPending } = useDeleteQuiz();
  const { mutate: DeleteTask, isPending: isDeletingTask } = useDeleteTask();

  const isQuiz = role === "quiz";
  const isTask = role === "task";
  const isQuizResults = role === "quizresult";
  const isTaskResults = role === "taskresult";
  const isStudentQuiz = role === "studentquiz";
  const isStudentTask = role === "studenttask";

  const {
    quizTableHead,
    quizResultsTableHead,
    taskTableHead,
    taskResultsTableHead,
    studentQuizTableHead,
    studentTaskTableHead,
  } = advTableHeads;

  const tableHead = isQuiz
    ? quizTableHead
    : isQuizResults
      ? quizResultsTableHead
      : isTask
        ? taskTableHead
        : isTaskResults
          ? taskResultsTableHead
          : isStudentQuiz
            ? studentQuizTableHead
            : studentTaskTableHead;

  const { setIsCustomModalOpen, isCustomModalOpen, idToDelete, setIdToDelete } =
    useCustomModal();

  const onClickDeleteIcon = (id: string) => {
    setIsCustomModalOpen(true);
    setIdToDelete(id);
  };

  const onConfirmDelete = () => {
    if (isQuiz) DeleteQuiz(idToDelete);
    if (isTask) DeleteTask(idToDelete);
    setIsCustomModalOpen(false);
  };

  return (
    <>
      <div className="hidden md:block xl:w-[80%] mt-7 overflow-hidden rounded-2xl border border-blue-100/60">
        <table className="w-full table-fixed bg-card">
          <thead className="h-12 bg-surface">
            <tr>
              {tableHead.map((item) => (
                <th
                  key={item.id}
                  className="px-3 text-center capitalize text-muted"
                >
                  {item.text}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isQuiz &&
              teacherQuizzes.map((item: ITeacherQuiz) => (
                <tr className="h-15 border-t border-blue-100/20" key={item._id}>
                  <td className="text-center px-3 truncate">
                    {txtSlicer(item.title, 15)}
                  </td>

                  <td className="text-center px-3 truncate">
                    {txtSlicer(item.courseId.name, 15)}
                  </td>

                  <td className="text-center px-3">{item.timeLimit}</td>

                  <td className="text-center px-3">
                    {new Date(item.dueDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>

                  <td className="text-center px-3">{item.questionsCount}</td>

                  <td className="text-center px-3">{item.status}</td>

                  <td>
                    <div className="flex justify-center items-center gap-2">
                      <NavLink to={`/teacher/editQuiz/${item._id}`}>
                        <Pencil size={18} />
                      </NavLink>

                      <button
                        disabled={isPending}
                        onClick={() => onClickDeleteIcon(item._id)}
                        className="p-1 rounded hover:bg-gray-200 cursor-pointer"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

            {isTask &&
              teacherTasks.map((item) => (
                <tr key={item._id} className="h-15 border-t border-blue-100/20">
                  <td className="text-center px-3 truncate">
                    {txtSlicer(item.title, 15)}
                  </td>

                  <td className="text-center px-3 truncate">
                    {item.courseId.name}
                  </td>

                  <td className="text-center px-3">
                    {new Date(item.dueDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>

                  <td className="text-center px-3 truncate">
                    {txtSlicer(item.description, 25)}
                  </td>

                  <td>
                    <div className="flex items-center justify-center gap-2">
                      <NavLink to={`/teacher/editTask/${item._id}`}>
                        <Pencil size={18} />
                      </NavLink>

                      <button
                        disabled={isDeletingTask}
                        onClick={() => onClickDeleteIcon(`${item._id}`)}
                        className="p-1 rounded hover:bg-gray-200"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

            {isQuizResults &&
              quizResults.map((item) => (
                <tr key={item._id} className="h-15 border-t border-blue-100/20">
                  <td className="text-center px-3">
                    {txtSlicer(item.studentId.name, 20)}
                  </td>

                  <td className="text-center px-3">
                    {txtSlicer(item.studentId.email, 30)}
                  </td>

                  <td className="text-center px-3">{item.completionStatus}</td>

                  <td className="text-center px-3">{item.score}</td>
                </tr>
              ))}

            {isTaskResults &&
              taskResults.map((item) => (
                <tr key={item._id} className="h-15 border-t border-blue-100/20">
                  <td className="text-center px-3">
                    {txtSlicer(item.studentId.name, 20)}
                  </td>

                  <td className="text-center px-3">
                    {txtSlicer(item.studentId.email, 17)}
                  </td>

                  <td className="text-center px-3 capitalize">
                    {item.completionStatus}
                  </td>

                  <td className="text-center px-3">{item.submittedText}</td>

                  <td>
                    <NavLink to={`/teacher/viewTask/${item._id}`}>
                      <Button text="view task" />
                    </NavLink>
                  </td>
                </tr>
              ))}

            {isStudentQuiz &&
              quizzes.map((item: IQuizzes) => (
                <tr key={item._id} className="h-15 border-t border-blue-100/20">
                  <td className="text-center px-3">{item.title}</td>

                  <td className="text-center px-3">{item.timeLimit}</td>

                  <td className="text-center px-3">
                    {new Date(item.dueDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>
                  <td className="text-center px-3">{item.questionsCount}</td>
                  <td className="text-center px-3">{item.status}</td>
                  <td className="text-center px-3">{item.score}</td>
                  <td className="text-center px-3">{item.completionStatus}</td>
                  <td className="text-center px-3">
                    <NavLink
                      to={
                        item.completionStatus === "completed"
                          ? `/student/viewQuestions/${item._id}`
                          : `/student/takeQuiz/${item._id}`
                      }
                    >
                      <Button
                        className="p-2.5!"
                        text={
                          item.completionStatus === "completed"
                            ? "view quiz"
                            : "take quiz"
                        }
                      />
                    </NavLink>
                  </td>
                </tr>
              ))}

            {isStudentTask &&
              studentTasks.map((item: ITask) => (
                <tr key={item._id} className="h-15 border-t border-blue-100/20">
                  <td className="text-center px-3">{item.title}</td>

                  <td className="text-center px-3">{item.description}</td>

                  <td className="text-center px-3">
                    {new Date(item.dueDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </td>

                  <td className="text-center px-3">
                    {item.isSubmitted ? "Submitted" : "Not Submitted"}
                  </td>

                  <td className="text-center px-3">{item.completionStatus}</td>

                  <td>
                    <NavLink
                      to={
                        item.isSubmitted
                          ? `/student/viewSubmission/${item._id}`
                          : `/student/submitTask/${item._id}`
                      }
                    >
                      <Button
                        text={
                          item.isSubmitted ? "view Submission" : "submit task"
                        }
                      />
                    </NavLink>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:hidden mt-7">
        {isQuiz &&
          teacherQuizzes.map((item) => (
            <AdvTableBox
              key={item._id}
              role="quiz"
              item={item}
              editLink={`/teacher/editQuiz/${item._id}`}
              onDelete={onClickDeleteIcon}
              isDeleting={isPending}
            />
          ))}

        {isTask &&
          teacherTasks.map((item) => (
            <AdvTableBox
              key={item._id}
              role="task"
              item={item}
              editLink={`/teacher/editTask/${item._id}`}
              onDelete={onClickDeleteIcon}
              isDeleting={isDeletingTask}
            />
          ))}

        {isQuizResults &&
          quizResults.map((item) => (
            <AdvTableBox key={item._id} role="quizresult" item={item} />
          ))}

        {isTaskResults &&
          taskResults.map((item) => (
            <AdvTableBox key={item._id} role="taskresult" item={item} />
          ))}

        {isStudentQuiz &&
          quizzes.map((item) => (
            <AdvTableBox key={item._id} role="studentquiz" item={item} />
          ))}

        {isStudentTask &&
          studentTasks.map((item) => (
            <AdvTableBox key={item._id} role="studenttask" item={item} />
          ))}
      </div>

      <CustomModal
        cancelTxt="No"
        confirmTxt="Yes"
        mainTxt="Are you sure you want to delete it"
        onConfirm={onConfirmDelete}
        open={isCustomModalOpen}
        setIsOpen={setIsCustomModalOpen}
      />
    </>
  );
};

export default AdvTable;
