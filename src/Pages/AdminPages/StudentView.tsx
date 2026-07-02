import { useCustomModal } from "../../hooks/useCustomModal";
import NavBar from "../../Layouts/NavBar";
import Button from "../../Components/ui/Button";
import { Plus } from "lucide-react";
import Table from "../../Components/Table";
import { NavLink } from "react-router-dom";
import CustomModal from "../../Components/ui/CustomModal";
import { useAuth } from "../../context/AuthContext";
import type { IUser } from "../../interfaces";
import { useAdminGetUsers } from "../../hooks/useAdmin";

// interface Props {}
// {}: IProps
const StudentView = () => {
  const { handleLogout } = useAuth();

  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();
  const { data, isLoading } = useAdminGetUsers();
  const users = data?.users.filter((user: IUser) => user.role === "student");

  return (
    <div className="page-shell box-border overflow-x-hidden">
      <NavBar
        onLogout={() => setIsCustomModalOpen(true)}
        description=""
        mainMessage="Students"
      />
      <div className="mt-18 md:ml-5 space-y-5 ">
        <NavLink to={"/admin/addStudent"}>
          <Button text="Add Student" icon={<Plus size={18} />} />
        </NavLink>
        <Table role="student" isLoading={isLoading} users={users} />
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

export default StudentView;
