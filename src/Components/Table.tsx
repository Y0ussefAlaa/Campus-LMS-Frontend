import { v4 as uuidv4 } from "uuid";
import personalPhoto from "../assets/Ballon d'Or.jpg";
import { txtSlicer } from "../utils";
import { Pencil, Trash } from "lucide-react";
import { NavLink } from "react-router-dom";

import CustomModal from "./ui/CustomModal";
import TableBoxes from "./TableBoxes";
import { useCustomModal } from "../hooks/useCustomModal";
import TableSkeleton from "./TableSkeleton";
import type { ICourse, IUser } from "../interfaces";
import {
  useAdminArchiveCourses,
  useAdminDeleteDepartments,
  useAdminDeleteUser,
  useAdminUNArchiveCourses,
} from "../hooks/useAdmin";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "./ui/Button";

interface IProps {
  role:
    | "teacher"
    | "student"
    | "admin"
    | "course"
    | "studentFromTeacher"
    | "department";
  isLoading?: boolean;
  isError?: boolean;
  users?: IUser[];
  courses?: ICourse[];
  departments?: { _id: string; name: string }[];
}

const Table = ({
  role,
  isLoading,
  users = [],
  courses = [],
  departments = [],
}: IProps) => {
  const editLink =
    role == "admin"
      ? "/admin/editAdmin/"
      : role == "teacher"
        ? "/admin/editTeacher"
        : "/admin/editStudent";

  const personsHead =
    role == "course"
      ? [
          { id: uuidv4(), text: "course name" },
          { id: uuidv4(), text: "created by" },
          { id: uuidv4(), text: "" },
        ]
      : role == "department"
        ? [
            { id: uuidv4(), text: "departmemt" },
            { id: uuidv4(), text: "" },
          ]
        : [
            { id: uuidv4(), text: "name" },
            { id: uuidv4(), text: "email" },
            { id: uuidv4(), text: "" },
          ];
  const { mutate: DeleteUser, isPending: isDeletingUSer } =
    useAdminDeleteUser();
  const { mutate: DeleteDepartment, isPending: isDeletingDepartment } =
    useAdminDeleteDepartments();
  const {
    mutate: ArchiveCourse,
    isPending: isArchining,
    variables: archivingId,
  } = useAdminArchiveCourses();
  const {
    mutate: UnArchiveCourse,
    isPending: isUnArchiving,
    variables: unarchivingId,
  } = useAdminUNArchiveCourses();

  // ** Handlers
  const { setIsCustomModalOpen, idToDelete, setIdToDelete, isCustomModalOpen } =
    useCustomModal();
  const onClickDeleteIcon = (id: string) => {
    setIsCustomModalOpen(true);
    setIdToDelete(id);
  };

  const onConfirmDelete = () => {
    if (!idToDelete) return;

    if (role === "department") {
      DeleteDepartment(idToDelete);
    } else {
      DeleteUser(idToDelete);
    }

    setIsCustomModalOpen(false);
  };

  const onArchiveClick = (isArchived: boolean, id: string) => {
    if (!isArchived) ArchiveCourse(id);
    else UnArchiveCourse(id);
  };

  const isCoursesTable = role === "course";
  const isDepartmentTable = role === "department";
  const isStudentFromTeacher = role === "studentFromTeacher";

  if (isLoading) return <TableSkeleton role={role} />;

  return (
    <>
      {/* DESKTOP TABLE */}
      <div className="hidden md:block w-[75%] mt-7 overflow-hidden rounded-2xl border border-blue-100/60">
        <table className="w-full table-fixed bg-card">
          <thead className="h-10 bg-surface">
            <tr>
              {personsHead.map((item) => (
                <th key={item.id} className="px-3 capitalize text-muted">
                  {item.text}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isCoursesTable
              ? courses.map((course) => (
                  <tr className="h-15" key={course._id}>
                    <td className="text-center px-2">
                      {txtSlicer(course.name, 20)}
                    </td>
                    <td className="px-2 text-center font-semibold text-heading">
                      {txtSlicer(course.createdBy?.name, 25)}
                    </td>
                    <td className="text-center">
                      <div className="flex items-center justify-center space-x-1.5">
                        <Button
                          text={
                            (isArchining && archivingId === course._id) ||
                            (isUnArchiving && unarchivingId === course._id) ? (
                              <CircularProgress
                                size={25}
                                aria-label="Loading…"
                              />
                            ) : course.isArchived ? (
                              "un-archive"
                            ) : (
                              "archive"
                            )
                          }
                          onClick={() =>
                            onArchiveClick(course.isArchived, course._id)
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))
              : isDepartmentTable
                ? departments.map((department) => (
                    <tr className="h-15" key={department._id}>
                      <td className="text-center px-2">
                        {txtSlicer(department.name, 20)}
                      </td>
                      <td className="text-center">
                        <div className="flex items-center justify-center space-x-1.5">
                          <button
                            className="p-1 rounded hover:bg-gray-200 cursor-pointer"
                            onClick={() => onClickDeleteIcon(department._id)}
                            disabled={isDeletingDepartment}
                          >
                            <Trash size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                : users.map((user) => (
                    <tr className="h-15" key={user._id}>
                      <td className="text-center px-2">
                        {txtSlicer(user.name, 20)}
                      </td>
                      <td className="px-2 text-center font-semibold text-heading">
                        {txtSlicer(user.email, 25)}
                      </td>
                      {!(role == "studentFromTeacher") && (
                        <td className="text-center">
                          <div className="flex items-center justify-center space-x-1.5">
                            <NavLink to={`${editLink}/${user._id}`}>
                              <Pencil size={18} />
                            </NavLink>
                            <button
                              className="p-1 rounded hover:bg-gray-200 cursor-pointer"
                              onClick={() => onClickDeleteIcon(user._id)}
                              disabled={isDeletingUSer}
                            >
                              <Trash size={18} />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:hidden mt-7">
        {isCoursesTable
          ? courses.map((course) => (
              <TableBoxes
                isDepartmentTable={false}
                isCoursesTable={isCoursesTable}
                isStudentFromTeacher={isStudentFromTeacher}
                key={course._id}
                editLink={editLink}
                name={course.name}
                onClickDeleteIcon={() => onClickDeleteIcon(course._id)}
                personalPhoto={personalPhoto}
                email={""}
              />
            ))
          : isDepartmentTable
            ? departments.map((department) => (
                <TableBoxes
                  isDepartmentTable={true}
                  isCoursesTable={isCoursesTable}
                  isStudentFromTeacher={isStudentFromTeacher}
                  key={department._id}
                  editLink={editLink}
                  name={department.name}
                  onClickDeleteIcon={() => onClickDeleteIcon(department._id)}
                  personalPhoto={personalPhoto}
                  email={""}
                />
              ))
            : users.map((user) => (
                <TableBoxes
                  isDepartmentTable={false}
                  isCoursesTable={isCoursesTable}
                  isStudentFromTeacher={isStudentFromTeacher}
                  key={user._id}
                  editLink={editLink}
                  email={user.email}
                  name={user.name}
                  onClickDeleteIcon={() => onClickDeleteIcon(user._id)}
                  personalPhoto={user.avatar || personalPhoto}
                />
              ))}
      </div>

      {/* DELETE MODAL */}
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

export default Table;
