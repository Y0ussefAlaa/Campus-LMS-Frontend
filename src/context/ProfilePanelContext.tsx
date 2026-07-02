import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface ProfilePanelContextValue {
  isOpen: boolean;
  profileVersion: number;
  openProfile: () => void;
  closeProfile: () => void;
  refreshProfile: () => void;
}

const ProfilePanelContext = createContext<ProfilePanelContextValue | null>(null);

export function ProfilePanelProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [profileVersion, setProfileVersion] = useState(0);

  const openProfile = useCallback(() => setIsOpen(true), []);
  const closeProfile = useCallback(() => setIsOpen(false), []);
  const refreshProfile = useCallback(() => {
    setProfileVersion((v) => v + 1);
  }, []);

  return (
    <ProfilePanelContext.Provider
      value={{ isOpen, profileVersion, openProfile, closeProfile, refreshProfile }}
    >
      {children}
    </ProfilePanelContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProfilePanel() {
  const ctx = useContext(ProfilePanelContext);
  if (!ctx) {
    throw new Error("useProfilePanel must be used within ProfilePanelProvider");
  }
  return ctx;
}
