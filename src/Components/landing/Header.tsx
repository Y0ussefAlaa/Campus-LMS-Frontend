import { GraduationCap } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";

interface HeaderProps {
  onOpenAuth: (mode: "login" | "signup") => void;
}

const Header = ({ onOpenAuth }: HeaderProps) => {
  return (
    <header className="surface-header sticky top-0 z-50 border-b backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-brand to-brand-light text-white shadow-md shadow-blue-500/20">
            <GraduationCap size={20} strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold tracking-tight text-heading">
            Campus
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-muted transition-colors duration-200 hover:text-brand dark:hover:text-brand-light"
          >
            Features
          </a>
          <a
            href="#preview"
            className="text-sm font-medium text-muted transition-colors duration-200 hover:text-brand dark:hover:text-brand-light"
          >
            Preview
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => onOpenAuth("login")}
            className="btn-gradient rounded-full px-5 py-2.5 text-sm font-semibold shadow-md shadow-blue-500/20"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
