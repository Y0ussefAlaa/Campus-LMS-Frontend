import type { ReactNode } from "react";
import { ProfilePanelProvider } from "../context/ProfilePanelContext";
import ProfileSlideOver from "../Components/profile/ProfileSlideOver";
import SideBar from "./SideBar";

interface DashboardLayoutProps {
  role: string;
  children: ReactNode;
}

const DashboardLayout = ({ role, children }: DashboardLayoutProps) => {
  return (
    <ProfilePanelProvider>
      <div className="flex min-h-screen bg-surface">
        <SideBar role={role} />
        <main className="flex-1 overflow-x-hidden">{children}</main>
        <ProfileSlideOver />
      </div>
    </ProfilePanelProvider>
  );
};

export default DashboardLayout;
