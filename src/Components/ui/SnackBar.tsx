import Snackbar from "@mui/material/Snackbar";

interface IProps {
  open: boolean;
  setIsOpen: (value: boolean) => void;
  message: string;
  vertical: "top" | "bottom";
  horizontal: "left" | "center" | "right";
}

export default function PositionedSnackbar({
  open,
  setIsOpen,
  message,
  vertical,
  horizontal,
}: IProps) {
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      message={message}
    />
  );
}
