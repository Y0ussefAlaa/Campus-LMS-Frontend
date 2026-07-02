interface SwtchButtonProps {
  activeButton: "current" | "archived";
  setButtonValue: (value: "current" | "archived") => void;
}

const SwtchButton = ({
  activeButton = "current",
  setButtonValue,
}: SwtchButtonProps) => {
  return (
    <div className="flex h-12 w-fit rounded-xl border border-border bg-card p-1 shadow-sm">
      <button
        type="button"
        className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 sm:px-5 ${
          activeButton === "current"
            ? "bg-linear-to-r from-brand to-brand-light text-white shadow-sm"
            : "text-muted hover:text-heading"
        }`}
        onClick={() => setButtonValue("current")}
      >
        Current Courses
      </button>
      <button
        type="button"
        className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-300 sm:px-5 ${
          activeButton === "archived"
            ? "bg-linear-to-r from-brand to-brand-light text-white shadow-sm"
            : "text-muted hover:text-heading"
        }`}
        onClick={() => setButtonValue("archived")}
      >
        Archived Courses
      </button>
    </div>
  );
};

export default SwtchButton;
