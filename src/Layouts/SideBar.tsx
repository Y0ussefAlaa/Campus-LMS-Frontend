import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import {
  adminSideBarList,
  studentSideBarList,
  teacherSideBarList,
} from "../data";
import { useProfilePanel } from "../context/ProfilePanelContext";
import ProfileService from "../Services/ProfileService";

interface SideBarProps {
  role: string;
}

const SideBar = ({ role }: SideBarProps) => {
  const { openProfile, profileVersion } = useProfilePanel();
  const profile = useMemo(
    () => ProfileService.getProfile(),
    [profileVersion],
  );
  const initials = ProfileService.getInitials(profile.name);

  const arrayToMap =
    role === "admin"
      ? adminSideBarList
      : role === "teacher"
        ? teacherSideBarList
        : studentSideBarList;

  return (
    <aside className="surface-sidebar relative flex min-h-screen w-18 shrink-0 flex-col border-r backdrop-blur-xl lg:w-60 pt-5">
      <div className="flex h-16 items-center gap-2.5 px-4 lg:px-6">
        <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-brand to-brand-light text-white shadow-md shadow-blue-500/20 lg:mx-0">
          <GraduationCap size={18} strokeWidth={2.5} />
        </div>
        <p className="hidden text-lg font-bold tracking-tight text-heading lg:block">
          Campus
        </p>
      </div>

      <div className="mx-4 hidden h-px bg-border lg:block" />
      <div className="mx-auto my-4 h-px w-8 bg-border lg:hidden" />

      <ul className="flex flex-1 flex-col gap-1 px-2 lg:px-3 lg:pt-4">
        {arrayToMap.map((item) => (
          <NavLink key={item.id} to={item.path} end>
            <li className="interactive-hover mb-1 flex items-center justify-center gap-2.5 rounded-xl p-3 text-muted lg:justify-start lg:px-4">
              <span className="shrink-0">{item.icon}</span>
              <p className="hidden text-sm font-semibold capitalize lg:block">
                {item.name}
              </p>
            </li>
          </NavLink>
        ))}
      </ul>

      <div className="border-t border-border p-3 lg:p-4">
        <button
          type="button"
          onClick={openProfile}
          className="interactive-hover flex w-full items-center justify-center gap-2.5 rounded-xl p-2 lg:justify-start"
          aria-label="Open profile"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-brand to-brand-light text-sm font-bold text-white lg:h-11 lg:w-11">
            {initials}
          </div>
          <div className="hidden min-w-0 text-left lg:block">
            <p className="truncate text-sm font-semibold text-heading">
              {profile.name}
            </p>
            <p className="truncate text-xs text-muted capitalize">{profile.role}</p>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
