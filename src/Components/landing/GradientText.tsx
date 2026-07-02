import type { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  as?: "span" | "h1" | "h2" | "p";
  className?: string;
}

const GradientText = ({
  children,
  as: Tag = "span",
  className = "",
}: GradientTextProps) => {
  return (
    <Tag className={`animate-gradient-text ${className}`}>{children}</Tag>
  );
};

export default GradientText;
