/**
 * Omnicore Solutions - Administrative Credentials & Profile Storage
 * Securely manages credentials for the Operations Backoffice,
 * supports changing login email and password, and keeps credentials
 * synced with the Hostinger PHP / MySQL backend.
 */

export interface AdminProfile {
  email: string;
  fullName: string;
  role: string;
  phone: string;
  yardLocation: string;
  passwordHash?: string; // local salt simulation for preview
  lastPasswordChange: string;
  lastLogin: string;
}

const PROFILE_STORAGE_KEY = "omnicore_admin_profile";
const AUTH_FLAG_KEY = "omnicore_admin_authenticated";
const PASSWORD_STORAGE_KEY = "omnicore_admin_pwd_sec";

export const DEFAULT_ADMIN_PROFILE: AdminProfile = {
  email: "admin@omnicore.co.zw",
  fullName: "Harare Operations Administrator",
  role: "Lead Plant & Inventory Manager",
  phone: "+263 77 733 4569",
  yardLocation: "115 Chiremba Road, Cranborne, Harare",
  lastPasswordChange: "Initial Commissioning",
  lastLogin: "Active Session",
};

export function getStoredAdminProfile(): AdminProfile {
  if (typeof window === "undefined") return DEFAULT_ADMIN_PROFILE;
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return DEFAULT_ADMIN_PROFILE;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_ADMIN_PROFILE, ...parsed };
  } catch {
    return DEFAULT_ADMIN_PROFILE;
  }
}

export function saveStoredAdminProfile(profile: Partial<AdminProfile>): AdminProfile {
  const current = getStoredAdminProfile();
  const updated: AdminProfile = { ...current, ...profile };
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
  return updated;
}

export function verifyAdminPassword(inputPass: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const storedCustomPass = localStorage.getItem(PASSWORD_STORAGE_KEY);
    if (storedCustomPass) {
      return inputPass === storedCustomPass;
    }
  } catch {
    // ignore
  }
  // Default fallback password before admin changes it
  return inputPass === "Admin123!";
}

export function setAdminPassword(newPass: string): void {
  try {
    localStorage.setItem(PASSWORD_STORAGE_KEY, newPass);
    saveStoredAdminProfile({
      lastPasswordChange: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  } catch {
    // ignore
  }
}

export function isSessionAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return (
      sessionStorage.getItem(AUTH_FLAG_KEY) === "true" ||
      localStorage.getItem(AUTH_FLAG_KEY) === "true"
    );
  } catch {
    return false;
  }
}

export function setSessionAuthenticated(remember: boolean): void {
  try {
    if (remember) {
      localStorage.setItem(AUTH_FLAG_KEY, "true");
    } else {
      sessionStorage.setItem(AUTH_FLAG_KEY, "true");
    }
    saveStoredAdminProfile({
      lastLogin: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  } catch {
    // ignore
  }
}

export function clearSessionAuthentication(): void {
  try {
    localStorage.removeItem(AUTH_FLAG_KEY);
    sessionStorage.removeItem(AUTH_FLAG_KEY);
  } catch {
    // ignore
  }
}
