import { Pencil, Trash } from "lucide-react";
import { NavLink } from "react-router-dom";
import Button from "./ui/Button";
import type {
  IQuizResult,
  IQuizzes,
  ITask,
  ITaskResult,
  ITeacherQuiz,
  ITeacherTask,
} from "../interfaces";

type Role =
  | "quiz"
  | "quizresult"
  | "task"
  | "taskresult"
  | "studentquiz"
  | "studenttask";

interface IProps {
  role: Role;
  item:
    | ITeacherQuiz
    | ITeacherTask
    | IQuizResult
    | ITaskResult
    | IQuizzes
    | ITask;
  editLink?: string;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const StatusBadge = ({ status }: { status: string }) => {
  const normalized = status?.toLowerCase();
  const positive = ["published", "completed", "open"].includes(normalized);
  return (
    <span
      className={`shrink-0 text-xs font-medium px-2.5 py-0.5 rounded-full capitalize ${
        positive
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
    >
      {status}
    </span>
  );
};

const CardShell = ({
  title,
  subtitle,
  status,
  children,
  actions,
}: {
  title: string;
  subtitle?: string;
  status?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) => (
  <div className="card-surface rounded-2xl p-4 flex flex-col gap-3 border border-gray-200 bg-white">
    <div className="flex items-start justify-between gap-2">
      <div>
        <p className="text-sm font-medium text-heading leading-tight">
          {title}
        </p>
        {subtitle && <p className="text-xs text-muted mt-0.5">{subtitle}</p>}
      </div>
      {status && <StatusBadge status={status} />}
    </div>

    <div className="border-t border-gray-100 pt-3 grid grid-cols-3 gap-2">
      {children}
    </div>

    {actions && <div className="flex gap-2 mt-2">{actions}</div>}
  </div>
);

const MetaItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div>
    <p className="text-[10px] uppercase tracking-wide text-muted/70 mb-0.5">
      {label}
    </p>
    <p className="text-xs font-medium text-heading">{value ?? "——"}</p>
  </div>
);

const AdvTableBox = ({
  role,
  item,
  editLink,
  onDelete,
  isDeleting,
}: IProps) => {
  switch (role) {
    case "quiz": {
      const quiz = item as ITeacherQuiz;
      return (
        <CardShell
          title={quiz.title}
          subtitle={quiz.courseId?.name}
          status={quiz.status}
          actions={
            <>
              <NavLink
                to={editLink ?? `/teacher/editQuiz/${quiz._id}`}
                className="flex-1"
              >
                <button className="w-full flex items-center px-3 justify-center gap-1.5 py-1.5 rounded-lg border border-gray-300 text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">
                  <Pencil size={13} />
                  Edit
                </button>
              </NavLink>
              <button
                disabled={isDeleting}
                onClick={() => onDelete?.(quiz._id)}
                className="flex-1 flex items-center px-3 justify-center gap-1.5 py-1.5 rounded-lg border border-red-200 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <Trash size={13} />
                Delete
              </button>
            </>
          }
        >
          <MetaItem label="Due date" value={formatDate(quiz.dueDate)} />
          <MetaItem label="Questions" value={quiz.questionsCount} />
          <MetaItem label="Time limit" value={quiz.timeLimit} />
        </CardShell>
      );
    }

    case "task": {
      const task = item as ITeacherTask;
      return (
        <CardShell
          title={task.title}
          subtitle={task.courseId?._id}
          actions={
            <>
              <NavLink
                to={editLink ?? `/teacher/editTask/${task._id}`}
                className="flex-1"
              >
                <button className="w-full flex items-center px-3 justify-center gap-1.5 py-1.5 rounded-lg border border-gray-300 text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">
                  <Pencil size={13} />
                  Edit
                </button>
              </NavLink>
              <button
                disabled={isDeleting}
                onClick={() => onDelete?.(task._id)}
                className="flex-1 flex items-center px-3 justify-center gap-1.5 py-1.5 rounded-lg border border-red-200 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <Trash size={13} />
                Delete
              </button>
            </>
          }
        >
          <MetaItem label="Due date" value={formatDate(task.dueDate)} />
          <div className="col-span-2">
            <p className="text-[10px] uppercase tracking-wide text-muted/70 mb-0.5">
              Description
            </p>
            <p className="text-xs text-muted line-clamp-2">
              {task.description}
            </p>
          </div>
        </CardShell>
      );
    }

    case "quizresult": {
      const result = item as IQuizResult;
      return (
        <CardShell
          title={result.studentId?.name}
          subtitle={result.studentId?.email}
          status={result.completionStatus}
        >
          <MetaItem label="Score" value={result.score} />
        </CardShell>
      );
    }

    case "taskresult": {
      const result = item as ITaskResult;
      return (
        <CardShell
          title={result.studentId?.name}
          subtitle={result.studentId?.email}
          status={result.completionStatus}
          actions={
            <NavLink to={`/teacher/viewTask/${result._id}`} className="flex-1">
              <Button text="view task" className="w-full" />
            </NavLink>
          }
        >
          <div className="col-span-3">
            <p className="text-[10px] uppercase tracking-wide text-muted/70 mb-0.5">
              Submitted text
            </p>
            <p className="text-xs text-muted line-clamp-2">
              {result.submittedText}
            </p>
          </div>
        </CardShell>
      );
    }

    case "studentquiz": {
      const quiz = item as IQuizzes;
      const isCompleted = quiz.completionStatus === "completed";
      return (
        <CardShell
          title={quiz.title}
          status={quiz.status}
          actions={
            <NavLink to={`/student/takeQuiz/${quiz._id}`} className="flex-1">
              <Button
                disabled={isCompleted}
                className="w-full px-2!"
                text="take quiz"
              />
            </NavLink>
          }
        >
          <MetaItem label="Due date" value={formatDate(quiz.dueDate)} />
          <MetaItem label="Questions" value={quiz.questionsCount} />
          <MetaItem label="Time limit" value={quiz.timeLimit} />
          <MetaItem label="Score" value={quiz.score} />
          <MetaItem label="Status" value={quiz.completionStatus} />
        </CardShell>
      );
    }

    case "studenttask": {
      const task = item as ITask;
      const isClosed = task.status === "closed";
      return (
        <CardShell
          title={task.title}
          status={task.status}
          actions={
            <NavLink
              to={
                isClosed
                  ? `/student/viewSubmission/`
                  : `/student/submitTask/${task._id}`
              }
              className="flex-1"
            >
              <Button
                className="w-full"
                text={isClosed ? "view Submission" : "submit task"}
              />
            </NavLink>
          }
        >
          <MetaItem label="Due date" value={formatDate(task.dueDate)} />
          <div className="col-span-2">
            <p className="text-[10px] uppercase tracking-wide text-muted/70 mb-0.5">
              Description
            </p>
            <p className="text-xs text-muted line-clamp-2">
              {task.description}
            </p>
          </div>
        </CardShell>
      );
    }

    default:
      return null;
  }
};

export default AdvTableBox;
