interface CustomModalProps {
  open: boolean;
  setIsOpen: (value: boolean) => void;
  onConfirm: () => void;
  mainTxt: string;
  cancelTxt: string;
  confirmTxt: string;
}

const CustomModal = ({
  open,
  setIsOpen,
  onConfirm,
  cancelTxt = "No",
  confirmTxt = "Yes",
  mainTxt,
}: CustomModalProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm modal-backdrop dark:bg-black/60"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-2xl shadow-blue-500/10 dark:shadow-black/40 modal-slide-in">
        <p className="text-base font-semibold text-heading">{mainTxt}</p>
        <div className="mt-5 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-xl border border-border px-4 py-2 text-sm font-semibold text-muted transition-all duration-300 hover:bg-blue-50 hover:text-heading dark:hover:bg-blue-500/10"
          >
            {cancelTxt}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="btn-gradient rounded-xl px-4 py-2 text-sm font-semibold"
          >
            {confirmTxt}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
