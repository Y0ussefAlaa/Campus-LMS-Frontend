import { useState } from "react";

export function useDeleteCourseModal() {
  // ** States
  const [isDelelteCourseModalOpen, setIsDelelteCourseModalOpen] =
    useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState<string>("");

  // ** Handlers

  return {
    // ** States
    idToDelete,
    setIdToDelete,
    isDelelteCourseModalOpen,
    setIsDelelteCourseModalOpen,
  };
}
