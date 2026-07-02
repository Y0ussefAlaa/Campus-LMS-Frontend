import { useState } from "react";

export function useCustomModal() {
  // ** States
  const [isCustomModalOpen, setIsCustomModalOpen] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState<string>("");

  // ** Handlers

  return {
    // ** States

    isCustomModalOpen,
    setIsCustomModalOpen,
    setIdToDelete,
    idToDelete,
  };
}
