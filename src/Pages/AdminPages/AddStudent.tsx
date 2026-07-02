import Button from "../../Components/ui/Button";
import Input from "../../Components/ui/Input";
import NavBar from "../../Layouts/NavBar";
import { useCustomModal } from "../../hooks/useCustomModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addAdminShcema } from "../../schema";
import CustomModal from "../../Components/ui/CustomModal";
import { useAuth } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import { useAdminAddUser } from "../../hooks/useAdmin";
import PasswordInput from "../../Components/ui/PasswordInput";

interface IFormData {
  name: string;
  email: string;
  password: string;
  role: string;
}

const AddStudent = () => {
  const { handleLogout } = useAuth();
  const { mutate: AddStudents, isPending } = useAdminAddUser();
  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addAdminShcema),
  });

  const onSubmit = (data: IFormData) => {
    reset();
    AddStudents(data);
  };

  return (
    <div className="page-shell">
      <NavBar
        description=""
        mainMessage="Add Student"
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
        <div className="flex flex-col space-y-0.5">
          <Input {...register("email")} label="email" />
          <p className="text-red-600 text-lg">{errors.email?.message}</p>
        </div>
        <PasswordInput
          {...register("password")}
          label="password"
          error={errors.password?.message}
        />
        <div className="flex flex-col space-y-0.5">
          <Input
            {...register("role")}
            label="role"
            value={"student"}
            disabled
            readOnly
          />
          <p className="text-red-600 text-lg">{errors.role?.message}</p>
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

export default AddStudent;
