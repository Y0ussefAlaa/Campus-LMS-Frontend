import NavBar from "../../Layouts/NavBar";
import CustomModal from "../../Components/ui/CustomModal";
import { useCustomModal } from "../../hooks/useCustomModal";
import CourseBox from "../../Components/CourseBox";
import { teacherCourseContentList } from "../../data";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTeacherGetCourses } from "../../hooks/useTeacher";
import CourseBoxSkeleton from "../../Components/CourseBoxSkeleton";
import type { ICourse } from "../../interfaces";

const CourseContent = () => {
  const { handleLogout } = useAuth();
  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();
  const { id } = useParams();
  const { data, isLoading } = useTeacherGetCourses();

  const arrayToLoop = teacherCourseContentList;
  if (isLoading)
    return (
      <div className=" m-5 sm:m-20 flex flex-col space-y-5">
        <CourseBoxSkeleton />
        <CourseBoxSkeleton />
        <CourseBoxSkeleton />
        <CourseBoxSkeleton />
      </div>
    );
  const course: ICourse = data.courses.filter(
    (course: ICourse) => course._id === id,
  )[0];
  const { name, students, quizzesCount, materialsCount, tasksCount } = course;

  return (
    <div className="page-shell">
      <NavBar
        description=""
        mainMessage={name}
        onLogout={() => setIsCustomModalOpen(true)}
      />
      <div className="mt-15 flex flex-col space-y-4">
        {arrayToLoop.map((box) => (
          <CourseBox
            key={box.id}
            courseId={course._id}
            icon={box.icon}
            number={
              box.txt == "course students"
                ? students!.length
                : box.txt == "material"
                  ? materialsCount
                  : box.txt == "Quizes"
                    ? quizzesCount
                    : tasksCount
            }
            txt={box.txt}
            link={box.linkOfNextPage}
          />
        ))}
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

export default CourseContent;
