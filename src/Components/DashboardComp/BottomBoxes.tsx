interface BottomBoxesProps {
  text: string;
  number: number;
}

const BottomBoxes = ({ number, text }: BottomBoxesProps) => {
  return (
    <div className="flex h-16 items-center justify-between rounded-xl bg-linear-to-r from-brand to-brand-light px-5 shadow-md shadow-blue-500/15 sm:px-8">
      <p className="text-sm font-medium text-white/90 sm:text-base">{text}</p>
      <span className="text-lg font-bold text-white sm:text-xl">{number}%</span>
    </div>
  );
};

export default BottomBoxes;
