import NavBar from "../../Layouts/NavBar";
import { useCustomModal } from "../../hooks/useCustomModal";
import CustomModal from "../../Components/ui/CustomModal";
import { NavLink } from "react-router-dom";
import Button from "../../Components/ui/Button";
import SwtchButton from "../../Components/SwtchButton";
import { useState } from "react";
import CourseCard from "../../Components/CourseCard";
import { useDeleteCourseModal } from "../../hooks/useDeleteCourseModal";
import CookiesService from "../../Services/CookiesService";
import { useAuth } from "../../context/AuthContext";
import { useTeacherDeleteCourses } from "../../hooks/useTeacher";
import type { ICourse } from "../../interfaces";
import CourseCardSkeleton from "../../Components/CourseCardSkeleton";
import { useStudentGetCourses } from "../../hooks/useStudent";
import ChatbaseWidget from "../../Components/ChatBase";

const CoursesView = () => {
  const { handleLogout } = useAuth();
  const { data, isLoading } = useStudentGetCourses();

  const role = CookiesService.getCookie("role");
  const { mutate: DeleteCourse, isPending: isDeleting } =
    useTeacherDeleteCourses();
  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();
  const {
    isDelelteCourseModalOpen,
    idToDelete,
    setIdToDelete,
    setIsDelelteCourseModalOpen,
  } = useDeleteCourseModal();
  const [buttonValue, setButtonValue] = useState<"current" | "archived">(
    "current",
  );
  // const arrayToLoop =
  //   buttonValue == "current" ? currentCourses : archivedCourses;

  // ** Handlers

  const onConfirmDelteCourse = () => {
    DeleteCourse(idToDelete);
    setIsDelelteCourseModalOpen(false);
  };
  if (isLoading)
    return (
      <div className="m-5 sm:m-10 grid grid-cols-1 space-y-3.5 space-x-2 sm:grid-cols-2  md:grid-cols-3 xl:grid-cols-4 ">
        {Array.from({ length: 5 }, (_, idx) => (
          <CourseCardSkeleton key={idx} />
        ))}
      </div>
    );

  const studentCourses =
    buttonValue == "current"
      ? data?.courses.filter((course: ICourse) => course.isArchived === false)
      : data?.courses.filter((course: ICourse) => course.isArchived === true);

  return (
    <div className="page-shell">
      <NavBar
        onLogout={() => setIsCustomModalOpen(true)}
        description=""
        mainMessage="Courses"
      />
      <div className="w-full mt-8 flex flex-col space-y-7">
        <NavLink
          to={role == "teacher" ? "/teacher/addCourse" : "/student/joinCourse"}
        >
          <Button text={role == "teacher" ? "Add Course" : "Join Course"} />
        </NavLink>
        <SwtchButton
          activeButton={buttonValue}
          setButtonValue={setButtonValue}
        />
        <div className="grid grid-cols-1 space-y-3.5 space-x-2.5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 ">
          {studentCourses.map((course: ICourse) => (
            <CourseCard
              course={course}
              key={course._id}
              role={role}
              setIdToDelete={setIdToDelete}
              setIsDelelteCourseModalOpen={setIsDelelteCourseModalOpen}
              isDeleting={isDeleting}
            />
          ))}
        </div>
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
      {/*  */}
      <CustomModal
        cancelTxt="No"
        confirmTxt="Yes"
        mainTxt="Are you sure you want to delete this course ?"
        onConfirm={onConfirmDelteCourse}
        open={isDelelteCourseModalOpen}
        setIsOpen={setIsDelelteCourseModalOpen}
      />
      <ChatbaseWidget />
    </div>
  );
};

export default CoursesView;
