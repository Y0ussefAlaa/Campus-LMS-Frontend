import { CircleArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface CourseBoxProps {
  txt: string;
  number: number;
  icon: ReactNode;
  courseId: string;
  link: string;
}

const CourseBox = ({ icon, number, txt, courseId, link }: CourseBoxProps) => {
  return (
    <NavLink to={`${link}/${courseId}`}>
      <div className="card-surface group flex h-24 max-w-200 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-50 p-2.5 text-brand dark:bg-blue-500/10">
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium capitalize text-muted">{txt}</p>
            <span className="text-lg font-bold text-heading">{number}</span>
          </div>
        </div>
        <div className="rounded-xl bg-blue-50 p-2 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white dark:bg-blue-500/10">
          <CircleArrowRight size={24} />
        </div>
      </div>
    </NavLink>
  );
};

export default CourseBox;
