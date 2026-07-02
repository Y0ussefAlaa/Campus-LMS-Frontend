import { useState } from "react";

export function useDeleteMaterialModal() {
  // ** States
  const [isDelelteMaterialModalOpen, setIsDelelteMaterialModalOpen] =
    useState<boolean>(false);
  const [materialIdToDelete, setMaterialIdToDelete] = useState<string>("");
  // ** Handlers

  return {
    // ** States
    setMaterialIdToDelete,
    materialIdToDelete,
    isDelelteMaterialModalOpen,
    setIsDelelteMaterialModalOpen,
  };
}
