import CookiesService from "./CookiesService";
import type { IUserProfile, UserRole } from "../interfaces";

const STORAGE_PREFIX = "campus-profile";

const ROLE_DEFAULTS: Record<
  UserRole,
  Pick<IUserProfile, "department" | "year"> & { statLabel: string; statValue: number }
> = {
  admin: { statLabel: "Users managed", statValue: 2120 },
  teacher: { statLabel: "Courses taught", statValue: 20 },
  student: { department: "IT", year: 2, statLabel: "Enrolled courses", statValue: 6 },
};

function formatNameFromEmail(email: string) {
  const local = email.split("@")[0] ?? "user";
  return local
    .replace(/[._-]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function buildDefaultProfile(email: string, role: UserRole): IUserProfile {
  const defaults = ROLE_DEFAULTS[role];
  return {
    name: formatNameFromEmail(email),
    email,
    role,
    department: defaults.department,
    year: defaults.year,
    joinedAt: "2024-09-01",
  };
}

class ProfileService {
  getProfile(): IUserProfile {
    const email = CookiesService.getCookie("email") as string | undefined;
    const role = (CookiesService.getCookie("role") as UserRole) || "student";

    if (!email) {
      return buildDefaultProfile("guest@campus.edu", role);
    }

    const stored = localStorage.getItem(`${STORAGE_PREFIX}-${email}`);
    if (stored) {
      try {
        return { ...buildDefaultProfile(email, role), ...JSON.parse(stored) };
      } catch {
        return buildDefaultProfile(email, role);
      }
    }

    return buildDefaultProfile(email, role);
  }

  saveProfile(updates: Partial<IUserProfile>) {
    const current = this.getProfile();
    const next = { ...current, ...updates, email: current.email, role: current.role };
    localStorage.setItem(`${STORAGE_PREFIX}-${current.email}`, JSON.stringify(next));
    return next;
  }

  getRoleStat(role: UserRole) {
    const { statLabel, statValue } = ROLE_DEFAULTS[role];
    return { label: statLabel, value: statValue };
  }

  getInitials(name: string) {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }
}

export default new ProfileService();
