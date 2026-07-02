import { useCustomModal } from "../../hooks/useCustomModal";
import NavBar from "../../Layouts/NavBar";

import Table from "../../Components/Table";
import CustomModal from "../../Components/ui/CustomModal";
import { NavLink } from "react-router-dom";
import Button from "../../Components/ui/Button";
import { Plus } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useAdminGetDepartments } from "../../hooks/useAdmin";

const DepartmentView = () => {
  const { handleLogout } = useAuth();

  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();
  const { data, isLoading } = useAdminGetDepartments();
  
  return (
    <div className="page-shell box-border overflow-x-hidden">
      <NavBar
        onLogout={() => setIsCustomModalOpen(true)}
        description=""
        mainMessage="Courses"
      />
      <div className="mt-12 md:ml-5 space-y-5 ">
        <NavLink to={"/admin/addDepartment"}>
          <Button text="Add Department" icon={<Plus size={18} />} />
        </NavLink>
        <Table role="department" isLoading={isLoading} departments={data?.departments}  />
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

export default DepartmentView;
