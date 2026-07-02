import { useCustomModal } from "../../hooks/useCustomModal";
import NavBar from "../../Layouts/NavBar";

import Table from "../../Components/Table";
import CustomModal from "../../Components/ui/CustomModal";
import Button from "../../Components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import {
  useAdminArchiveAllCourses,
  useAdminGetCourses,
} from "../../hooks/useAdmin";
import CircularProgress from "@mui/material/CircularProgress";

// interface Props {}

// {}: IProps
const CoursesView = () => {
  const { handleLogout } = useAuth();

  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();
  const { data, isLoading } = useAdminGetCourses();


  const { mutate: ArchiveAll, isPending: isArchining } =
    useAdminArchiveAllCourses();

  const onArchiveAll = () => {
    ArchiveAll();
  };

  return (
    <div className="page-shell box-border overflow-x-hidden">
      <NavBar
        onLogout={() => setIsCustomModalOpen(true)}
        description=""
        mainMessage="Courses"
      />
      <div className="mt-12 md:ml-5 space-y-1 flex flex-col justify-end">
        <Button
          text={
            isArchining ? (
              <CircularProgress size={25} aria-label="Loading…" />
            ) : (
              "archive all"
            )
          }
          className="w-fit"
          onClick={onArchiveAll}
        />
        <Table role="course" courses={data?.courses} isLoading={isLoading} />
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

export default CoursesView;
