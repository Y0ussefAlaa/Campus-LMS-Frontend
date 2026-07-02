import Skeleton from "@mui/material/Skeleton";

const CourseBoxSkeleton = () => {
  return (
    <div className="card-surface group flex h-24 max-w-200 items-center justify-between px-4 sm:px-8">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-blue-50 p-2.5 text-brand dark:bg-blue-500/10">
          <Skeleton width={25}  height={25} />
        </div>
        <div>
          <Skeleton width={150} />
          <Skeleton />
        </div>
      </div>
      <div className="rounded-xl bg-blue-50 p-2 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white dark:bg-blue-500/10">
        <Skeleton width={25} height={25} />
      </div>
    </div>
  );
};

export default CourseBoxSkeleton;
