import NavBar from "../../Layouts/NavBar";
import CustomModal from "../../Components/ui/CustomModal";
import Button from "../../Components/ui/Button";
import Input from "../../Components/ui/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCustomModal } from "../../hooks/useCustomModal";
import { editAdminShcema } from "../../schema";
import { useAuth } from "../../context/AuthContext";
import { useAdminEditUser } from "../../hooks/useAdmin";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import PasswordInput from "../../Components/ui/PasswordInput";

interface IFormData {
  name: string;
  email: string;
  password: string;
}

const EditTeacher = () => {
  const { handleLogout } = useAuth();
  const { mutate: EditTeacher, isPending } = useAdminEditUser();
  const { id } = useParams();

  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editAdminShcema),
  });
  const onSubmit = (data: IFormData) => {
    if (!id) return;
    EditTeacher({ id, data });
    reset();
  };
  return (
    <div className="page-shell">
      <NavBar
        description=""
        mainMessage="Update Teacher"
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
        <Button
          type="submit"
          text={
            isPending ? (
              <CircularProgress size={25} aria-label="Loading…" />
            ) : (
              "update"
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

export default EditTeacher;
