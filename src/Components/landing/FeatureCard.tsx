import type { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="card-surface group flex flex-col gap-4 p-6 md:p-7">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-500/10 to-sky-400/10 text-brand transition-colors duration-300 group-hover:from-blue-500/20 group-hover:to-sky-400/20">
        {icon}
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-heading">{title}</h3>
        <p className="text-sm leading-relaxed text-muted">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
