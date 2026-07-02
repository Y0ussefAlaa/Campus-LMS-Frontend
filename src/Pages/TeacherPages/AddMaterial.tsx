import { useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomModal from "../../Components/ui/CustomModal";
import { useCustomModal } from "../../hooks/useCustomModal";
import NavBar from "../../Layouts/NavBar";
import { yupResolver } from "@hookform/resolvers/yup";
import { materialUploadSchema } from "../../schema";
import Input from "../../Components/ui/Input";
import type { InferType } from "yup";
import Button from "../../Components/ui/Button";
import CustomFileInput from "../../Components/ui/CustomFileInput";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { useTeacherAddMaterial } from "../../hooks/useTeacher";
import CircularProgress from "@mui/material/CircularProgress";

type IFormData = InferType<typeof materialUploadSchema>;

const AddMaterial = () => {
  const { handleLogout } = useAuth();
  const { id } = useParams();
  const { mutate: addMaterial, isPending } = useTeacherAddMaterial();
  const { isCustomModalOpen, setIsCustomModalOpen } = useCustomModal();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(materialUploadSchema),
  });

  // **Effects
  useEffect(() => {
    if (id) {
      setValue("courseId", id, { shouldValidate: true });
    }
  }, [id, setValue]);

  // **Handlers
  const onSubmit = (data: IFormData) => {
    const formData = new FormData();
    formData.append("courseId", data.courseId);
    formData.append("title", data.title);
    if (data.file?.length) {
      formData.append("file", data.file[0]);
    }
    addMaterial(formData);
    reset();
  };

  return (
    <div className="page-shell">
      <NavBar
        description=""
        mainMessage="Add Material"
        onLogout={() => setIsCustomModalOpen(true)}
      />
      <form
        className="mt-12 sm:ml-5 space-y-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col space-y-0.5">
          <Input
            {...register("courseId")}
            disabled
            readOnly
            label="course iD"
          />
          <p className="text-red-600 text-lg">{errors.courseId?.message}</p>
        </div>

        <div className="flex flex-col space-y-0.5">
          <Input {...register("title")} label="name" />
          <p className="text-red-600 text-lg">{errors.title?.message}</p>
        </div>

        <div className="flex flex-col space-y-0.5">
          <CustomFileInput
            type="file"
            label="file"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setValue("file", e.target.files ?? undefined, {
                shouldValidate: true,
              });
            }}
          />
          <p className="text-red-600 text-lg">{errors.file?.message}</p>
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

export default AddMaterial;
