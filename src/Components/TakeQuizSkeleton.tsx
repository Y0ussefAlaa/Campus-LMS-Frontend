
import Skeleton from "@mui/material/Skeleton";

const TakeQuizSkeleton = () => {
  return (
    <div className="page-shell">
      <div className="grid grid-cols-1 sm:grid-cols-2  sm:space-x-4.5 md:space-x-5 space-y-5 ml-10  mt-10">
        <Skeleton width={400} height={50}/>
        <Skeleton width={400} height={50}/>
        <Skeleton width={400} height={50}/>
        <Skeleton width={400} height={50}/>
      </div>
      <div className="ml-10  mt-10">
        <Skeleton width={550} height={60} />
        <Skeleton width={300} height={50}/>
        <Skeleton width={300} height={50}/>
        <Skeleton width={300} height={50}/>
        <Skeleton width={300} height={50}/>
      </div>
      <div className="flex space-x-2 ml-10 mt-8">
        <Skeleton width={90} height={80} />
      </div>
    </div>
  );
};

export default TakeQuizSkeleton;
