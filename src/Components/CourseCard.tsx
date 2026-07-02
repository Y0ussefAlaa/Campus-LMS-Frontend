import type { ICourse } from "../interfaces";
import { Pencil, Trash } from "lucide-react";
import { NavLink } from "react-router-dom";
import CourseDefault from "../assets/course-default.jpeg";

interface CourseCardProps {
  role: "teacher" | "student";
  course: ICourse;
  setIsDelelteCourseModalOpen: (value: boolean) => void;
  setIdToDelete: (id: string) => void;
  isDeleting: boolean;
}

export default function CourseCard({
  course,
  role,
  setIsDelelteCourseModalOpen,
  setIdToDelete,
  isDeleting,
}: CourseCardProps) {
  const { department, name, quizes, tasks, year, _id } = course;

  return (
    <div className="card-surface group overflow-hidden">
      <NavLink
        to={
          role === "teacher"
            ? `/teacher/courseContent/${_id}`
            : `/student/courseContent/${_id}`
        }
      >
        <div className="relative h-36 overflow-hidden bg-linear-to-br from-blue-500/10 to-sky-400/20 dark:from-blue-500/20 dark:to-indigo-600/15">
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={CourseDefault}
              alt="Course Cover"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-card/90 to-transparent" />
        </div>
        <div className="space-y-1 p-4 text-center">
          <h3 className="text-base font-bold text-heading">{name}</h3>
          <p className="text-xs text-muted">Department: {department}</p>
          <p className="text-xs text-muted">Year: {year}</p>
          <div className="flex justify-center gap-4 pt-1">
            <span className="text-xs font-medium text-brand">
              {quizes} Quizzes
            </span>
            <span className="text-xs font-medium text-brand">
              {tasks} Tasks
            </span>
          </div>
        </div>
      </NavLink>
      {role === "teacher" && (
        <div className="flex justify-end gap-1 border-t border-border px-3 py-2">
          <NavLink to={`/teacher/editCourse/${_id}`}>
            <button type="button" className="interactive-hover rounded-lg p-2">
              <Pencil size={16} />
            </button>
          </NavLink>
          <button
            disabled={isDeleting}
            type="button"
            className="rounded-lg p-2 text-muted transition-all duration-300 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 dark:hover:text-red-400"
            onClick={() => {
              setIsDelelteCourseModalOpen(true);
              setIdToDelete(_id);
            }}
          >
            <Trash size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
