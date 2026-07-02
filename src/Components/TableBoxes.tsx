import { Archive, Pencil, Trash } from "lucide-react";
import { NavLink } from "react-router-dom";
import { txtSlicer } from "../utils";

interface IProps {
  personalPhoto: string;
  name: string;
  email: string;
  onClickDeleteIcon: () => void;
  editLink: string;
  isCoursesTable: boolean;
  isStudentFromTeacher: boolean;
  isDepartmentTable: boolean;
}

const TableBoxes = ({
  personalPhoto,
  name,
  email,
  onClickDeleteIcon,
  editLink,
  isCoursesTable,
  isDepartmentTable,
  isStudentFromTeacher,
}: IProps) => {
  return (
    <div className="card-surface rounded-2xl p-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <img className="w-10 h-10 rounded-full" src={personalPhoto} alt="" />
        <div>
          <p className="font-semibold text-heading">{txtSlicer(name, 20)}</p>
          <p className="text-sm text-muted">{txtSlicer(email, 25)}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {!isCoursesTable && !isStudentFromTeacher && !isDepartmentTable && (
          <NavLink to={editLink}>
            <Pencil size={18} />
          </NavLink>
        )}
        {!isCoursesTable && (
          <button onClick={onClickDeleteIcon} className="cursor-pointer">
            <Trash size={18} />
          </button>
        )}

        {isCoursesTable && (
          <button className="p-1 rounded hover:bg-gray-200 cursor-pointer">
            <Archive size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TableBoxes;
