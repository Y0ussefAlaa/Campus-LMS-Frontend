import Skeleton from "@mui/material/Skeleton";

export default function CourseCardSkeleton() {
  return (
    <div className="card-surface group overflow-hidden w-75 h-90">
      <div className="relative h-36 overflow-hidden bg-linear-to-br from-blue-500/10 to-sky-400/20 dark:from-blue-500/20 dark:to-indigo-600/15">
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton />
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-card/90 to-transparent" />
      </div>
      <div className="space-y-1 p-4 text-center">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <div className="flex justify-center gap-4 pt-1">
          <span className="text-xs font-medium text-brand">
            <Skeleton />
          </span>
          <Skeleton />
        </div>
      </div>
    </div>
  );
}
