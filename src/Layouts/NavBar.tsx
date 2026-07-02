import { ArrowLeft, LogOut, Mail, Settings } from "lucide-react";
import ThemeToggle from "../Components/ui/ThemeToggle";
import { useProfilePanel } from "../context/ProfilePanelContext";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

interface NavBarProps {
  mainMessage: string | ReactNode;
  description: string;
  onLogout: () => void;
}

const NavBar = ({ description, mainMessage, onLogout }: NavBarProps) => {
  const { openProfile } = useProfilePanel();

  const navigate = useNavigate();

  const onBackClick = () => {
    navigate(-1);
  };

  return (
    <nav className="flex w-full items-center justify-between">
      <div className="flex space-x-2 sm:space-x-5 items-center">
        <button
          type="button"
          className="interactive-hover relative rounded-xl p-2 cursor-pointer"
          aria-label="Messages"
          onClick={onBackClick}
        >
          <ArrowLeft size={20} />
        </button>
        <div className=" space-y-1">
          <h2 className="text-xl font-bold capitalize text-heading md:text-3xl">
            {mainMessage}
          </h2>
          {description && (
            <p className="hidden text-sm text-muted md:block">{description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 md:gap-2">
        <ThemeToggle />
        <button
          type="button"
          className="interactive-hover relative rounded-xl p-2.5 cursor-pointer"
          aria-label="Messages"
        >
          <Mail size={20} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand " />
        </button>
        <button
          type="button"
          onClick={openProfile}
          className="interactive-hover rounded-xl p-2.5 cursor-pointer"
          aria-label="Open profile settings"
        >
          <Settings size={20} />
        </button>
        <button
          type="button"
          onClick={onLogout}
          className="rounded-xl p-2.5 text-muted cursor-pointer transition-all duration-300 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          aria-label="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
