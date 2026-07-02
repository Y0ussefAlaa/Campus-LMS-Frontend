import { Paperclip, Trash } from "lucide-react";
import Button from "./ui/Button";
import { NavLink } from "react-router-dom";
import type { MouseEvent } from "react";

interface MaterialBoxProps {
  setIsDelelteMaterialModalOpen: (value: boolean) => void;
  txt: string;
  role: "teacher" | "student" | "teacherquiz" | "teachertask";
  setMaterialIdToDelete: (id: string) => void;
  isDeleting?: boolean;
  quizId?: string;
  taskId?: string;
  materialId?: string;
  file?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

const MaterialBox = ({
  setIsDelelteMaterialModalOpen,
  setMaterialIdToDelete,
  txt,
  file,
  role,
  isDeleting,
  materialId = "",
  quizId,
  taskId,
}: MaterialBoxProps) => {
  const resultsLink =
    role === "teacherquiz"
      ? `/teacher/quizResults/${quizId}`
      : `/teacher/taskResults/${taskId}`;

  const getFullUrl = () => {
    if (!file) return "";
    return file.startsWith("http") ? file : `${API_BASE_URL}${file}`;
  };

  const onDownlodClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!file) return;

    const fullUrl = getFullUrl();

    const link = document.createElement("a");
    link.href = fullUrl;
    link.download = file.split("/").pop() || "file";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="card-surface flex h-16 max-w-200 items-center justify-between px-4 sm:px-8">
      <div className="flex items-center gap-3">
        <Paperclip size={18} className="text-brand" strokeWidth={1.5} />
        <p className="text-sm font-semibold text-heading">{txt}</p>
      </div>

      {role === "teacher" ? (
        <button
          type="button"
          className="rounded-lg p-2 text-muted transition-all duration-300 hover:bg-red-50 hover:text-red-500"
          onClick={() => {
            setIsDelelteMaterialModalOpen(true);
            setMaterialIdToDelete(materialId);
          }}
          disabled={isDeleting}
        >
          <Trash size={16} />
        </button>
      ) : role === "teacherquiz" || role == "teachertask" ? (
        <NavLink to={resultsLink}>
          <Button text="view results" variant="secondary" />
        </NavLink>
      ) : (
        <Button text="Download" variant="secondary" onClick={onDownlodClick} />
      )}
    </div>
  );
};

export default MaterialBox;
