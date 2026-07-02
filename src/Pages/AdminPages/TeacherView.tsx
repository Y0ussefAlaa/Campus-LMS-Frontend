import { useCustomModal } from "../../hooks/useCustomModal";
import NavBar from "../../Layouts/NavBar";
import Button from "../../Components/ui/Button";
import { Plus } from "lucide-react";
import Table from "../../Components/Table";
import { NavLink } from "react-router-dom";
import CustomModal from "../../Components/ui/CustomModal";
import { useAuth } from "../../context/AuthContext";
import { useAdminGetUsers } from "../../hooks/useAdmin";
import type { IUser } from "../../interfaces";

const TeacherView = () => {
  const { handleLogout } = useAuth();
  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();
  const { data, isLoading } = useAdminGetUsers();
  const users = data?.users.filter((user: IUser) => user.role === "teacher");

  
  return (
    <div className="page-shell box-border overflow-x-hidden">
      <NavBar
        onLogout={() => setIsCustomModalOpen(true)}
        description=""
        mainMessage="Teachers"
      />
      <div className="mt-18 md:ml-5 space-y-5 ">
        <NavLink to={"/admin/addTeacher"}>
          <Button text="Add Teacher" icon={<Plus size={18} />} />
        </NavLink>
        <Table role="teacher" isLoading={isLoading} users={users} />
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

export default TeacherView;
