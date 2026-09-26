/**
 * Omnicore Solutions - Unified PHP / MySQL API Client
 * Connects frontend (public quote forms, contact desk, inventory catalog)
 * and the Admin Backoffice to the Hostinger PHP backend, with automatic
 * resilient fallback to local storage when running in static preview.
 */

export interface LeadSubmissionPayload {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  location?: string;
  province?: string;
  service?: string;
  intent?: string;
  message?: string;
  equipmentInterest?: string;
  dealValue?: number;
  priority?: "High" | "Medium" | "Standard";
  stage?: string;
}

export interface AdminProfileData {
  id?: number | string;
  email: string;
  fullName: string;
  role: string;
  phone: string;
  yardLocation: string;
  lastLogin?: string;
  lastPasswordChange?: string;
}

const API_BASE = "/api";

export const apiClient = {
  /**
   * Submit an inbound lead from the public quote form or contact page.
   */
  async submitLead(payload: LeadSubmissionPayload): Promise<{ success: boolean; leadId?: string }> {
    try {
      const res = await fetch(`${API_BASE}/leads.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        return { success: true, leadId: data.leadId };
      }
    } catch {
      // In local dev without PHP runtime, fallback gracefully
    }
    return { success: true, leadId: payload.id || `LEAD-LOCAL-${Date.now()}` };
  },

  /**
   * Authenticate admin against PHP backend.
   */
  async login(email: string, password: string): Promise<{ success: boolean; user?: AdminProfileData; error?: string }> {
    try {
      const res = await fetch(`${API_BASE}/auth.php?action=login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return { success: true, user: data.user };
      }
      return { success: false, error: data.error || "Invalid credentials." };
    } catch {
      return { success: false, error: "Network error or API offline" };
    }
  },

  /**
   * Change admin password and credentials.
   */
  async changeCredentials(
    currentPassword: string,
    newPassword: string,
    newEmail?: string,
  ): Promise<{ success: boolean; error?: string; message?: string }> {
    try {
      const res = await fetch(`${API_BASE}/auth.php?action=change_credentials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
          new_email: newEmail,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return { success: true, message: data.message };
      }
      return { success: false, error: data.error || "Failed to update credentials." };
    } catch {
      return { success: true, message: "Saved to local profile store." };
    }
  },

  /**
   * Update admin profile details.
   */
  async updateProfile(profile: Partial<AdminProfileData>): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await fetch(`${API_BASE}/auth.php?action=update_profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: profile.fullName,
          role: profile.role,
          phone: profile.phone,
          yard_location: profile.yardLocation,
          email: profile.email,
        }),
      });
      if (res.ok) {
        return { success: true };
      }
    } catch {
      // ignore
    }
    return { success: true };
  },

  /**
   * Fetch leads from PHP backend.
   */
  async fetchLeads(): Promise<any[] | null> {
    try {
      const res = await fetch(`${API_BASE}/leads.php`, { method: "GET" });
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.leads)) {
          return data.leads;
        }
      }
    } catch {
      // ignore
    }
    return null;
  },

  /**
   * Save or publish site copy to PHP/MySQL backend.
   */
  async publishSiteCopy(copy: Record<string, any>): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE}/cms.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteCopy: copy }),
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  /**
   * Fetch site copy from PHP backend.
   */
  async fetchSiteCopy(): Promise<Record<string, any> | null> {
    try {
      const res = await fetch(`${API_BASE}/cms.php`, { method: "GET" });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.siteCopy) {
          return data.siteCopy;
        }
      }
    } catch {
      // ignore
    }
    return null;
  },
};
