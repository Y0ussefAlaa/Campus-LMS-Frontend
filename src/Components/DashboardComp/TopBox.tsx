import { type ReactNode } from "react";

interface TopBoxProps {
  mainTxt: string;
  icon: ReactNode;
  number: number | string | ReactNode;
  color: string;
}

const TopBox = ({ icon, number, mainTxt, color }: TopBoxProps) => {
  return (
    <div className="card-surface flex h-44 flex-col justify-between p-5">
      <div className="flex w-full items-center justify-between">
        <p className="text-xl font-semibold  text-muted capitalize">{mainTxt}</p>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl shadow-sm"
          style={{ background: color }}
        >
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold text-heading">{number}</p>
    </div>
  );
};

export default TopBox;
