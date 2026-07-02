import Skeleton from "@mui/material/Skeleton";

const InputSkeleton = () => {
  return (
    <div className={`flex flex-col space-y-1  `}>
      <Skeleton width={200} height={50} />
      <Skeleton height={80}/>
    </div>
  );
};

export default InputSkeleton;
