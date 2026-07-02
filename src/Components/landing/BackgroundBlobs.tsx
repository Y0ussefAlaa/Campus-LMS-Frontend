interface BackgroundBlobsProps {
  variant?: "hero" | "subtle";
}

const BackgroundBlobs = ({ variant = "hero" }: BackgroundBlobsProps) => {
  const opacity =
    variant === "hero"
      ? "opacity-40 dark:opacity-20"
      : "opacity-20 dark:opacity-10";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className={`absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-400/30 blur-3xl dark:bg-blue-600/20 ${opacity}`}
      />
      <div
        className={`absolute top-1/4 -right-24 h-80 w-80 rounded-full bg-sky-300/40 blur-3xl dark:bg-indigo-600/15 ${opacity}`}
      />
      <div
        className={`absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-indigo-300/25 blur-3xl dark:bg-blue-800/15 ${opacity}`}
      />
      {variant === "hero" && (
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200/20 blur-3xl opacity-30 dark:bg-blue-500/10 dark:opacity-20" />
      )}
    </div>
  );
};

export default BackgroundBlobs;
