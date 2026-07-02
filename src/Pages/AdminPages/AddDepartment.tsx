import Button from "../../Components/ui/Button";
import Input from "../../Components/ui/Input";
import NavBar from "../../Layouts/NavBar";
import { useCustomModal } from "../../hooks/useCustomModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDepartmentShcema } from "../../schema";
import CustomModal from "../../Components/ui/CustomModal";
import { useAuth } from "../../context/AuthContext";
import { useAdminAddDepartment } from "../../hooks/useAdmin";
import CircularProgress from "@mui/material/CircularProgress";

interface IFormData {
  name: string;
}

const AddDepartment = () => {
  const { handleLogout } = useAuth();
  const { mutate: AddDepartment, isPending } = useAdminAddDepartment();
  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addDepartmentShcema),
  });

  const onSubmit = (data: IFormData) => {
    AddDepartment(data);
    reset();
  };

  return (
    <div className="page-shell">
      <NavBar
        description=""
        mainMessage="Add Department"
        onLogout={() => setIsCustomModalOpen(true)}
      />
      <form
        className="mt-12 sm:ml-5 space-y-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col space-y-0.5">
          <Input {...register("name")} label="name" />
          <p className="text-red-600 text-lg">{errors.name?.message}</p>
        </div>
        <Button
          text={
            isPending ? (
              <CircularProgress size={25} aria-label="Loading…" />
            ) : (
              "Add"
            )
          }
        />
      </form>

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

export default AddDepartment;
