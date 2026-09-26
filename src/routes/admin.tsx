import { useState, useEffect, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Search,
  Plus,
  ExternalLink,
  X,
  Phone,
  Mail,
  Truck,
  Users,
  Package,
  FileText,
  Edit3,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Upload,
  Check,
  Trash2,
  RotateCcw,
  Sparkles,
  MapPin,
  Clock,
  Globe,
  Eye,
  EyeOff,
  CheckCircle2,
  ZoomIn,
  Building2,
  Maximize2,
  Recycle,
  ArchiveRestore,
  AlertTriangle,
  Lock,
  LogOut,
  KeyRound,
  AlertCircle,
  ImagePlus,
  Table,
  LayoutGrid,
  Kanban,
  ShieldCheck,
  Database,
} from "lucide-react";
import {
  CRMClient,
  ExtendedEquipment,
  SiteCopyContent,
  getStoredCRMClients,
  saveStoredCRMClients,
  getStoredEquipment,
  saveStoredEquipment,
  getStoredSiteCopy,
  saveStoredSiteCopy,
  resetStoredSiteCopy,
  RecycleBinItem,
  getStoredRecycleBin,
  saveStoredRecycleBin,
  toRecycleClient,
  toRecycleProduct,
  DeploymentRecord,
  DeploymentStatus,
  getStoredDeployments,
  saveStoredDeployments,
  DEFAULT_DEPLOYMENTS,
} from "@/lib/cms-store";
import { WhatsAppIcon } from "@/components/ui/official-badges";
import { whatsappUrl } from "@/data/site";
import { ProductPhotoLightbox } from "@/components/product-photo-lightbox";
import {
  getStoredAdminProfile,
  saveStoredAdminProfile,
  verifyAdminPassword,
  setAdminPassword,
  setSessionAuthenticated,
  clearSessionAuthentication,
  isSessionAuthenticated,
  type AdminProfile,
} from "@/lib/admin-auth";
import { apiClient } from "@/lib/api-client";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Operations & CRM Backoffice · Omnicore Harare" },
      { name: "description", content: "Client CRM, machinery inventory, and site content management." },
      { property: "og:title", content: "Backoffice · Omnicore Harare" },
    ],
  }),
  component: AdminBackoffice,
});

type Tab = "crm" | "products" | "cms" | "hire" | "recycle" | "profile";

const STAGES: CRMClient["stage"][] = [
  "Lead",
  "Discovery",
  "Tender Quoted",
  "Negotiation",
  "Won",
  "Lost",
];

const PROVINCES = [
  "All Zimbabwe",
  "Harare",
  "Mashonaland West",
  "Mashonaland Central",
  "Mashonaland East",
  "Midlands",
  "Matabeleland North",
  "Matabeleland South",
  "Manicaland",
  "Masvingo",
];

export type YardPhotoPreset = {
  label: string;
  src: string;
  category: "mining" | "hire" | "farming" | "hardware" | "industry";
  spec: string;
  badge: string;
};

const YARD_PHOTO_PRESETS: YardPhotoPreset[] = [
  { label: "Jaw Crusher", src: "/images/jaw-crusher.jpg", category: "mining", spec: "5–15 TPH Primary Crush", badge: "Gold Ore Circuit" },
  { label: "Ball Mill", src: "/images/ball-mill.jpg", category: "mining", spec: "Continuous Wet Grinding", badge: "Milling Circuit" },
  { label: "Mining Hammer Mill", src: "/images/hammer-mill.jpg", category: "mining", spec: "1.5–3.0 TPH High Speed", badge: "Fine Reduction" },
  { label: "Gold Separator", src: "/images/gold-separator.jpg", category: "mining", spec: "Centrifugal Concentrator", badge: "Free Gold" },
  { label: "Trommel Wash Plant", src: "/images/trommel.jpg", category: "mining", spec: "15–30 TPH Scrub & Screen", badge: "Alluvial Gold" },
  { label: "Shaking Table", src: "/images/shaking-table.jpg", category: "mining", spec: "6-S Deck Gravity Separator", badge: "Concentrate Clean" },
  { label: "Slurry Pump", src: "/images/slurry-pump.jpg", category: "mining", spec: "High-Head Heavy Slurry", badge: "Tailings / Circuit" },
  { label: "CAT 320D Excavator", src: "/images/excavator.jpg", category: "hire", spec: "20-Tonne Digger · 1.0m³ Bucket", badge: "Wet / Dry Fleet" },
  { label: "37m Concrete Boom Pump", src: "/images/concrete-pump.jpg", category: "hire", spec: "37m Vertical · 125m³/h", badge: "Boom Pump Fleet" },
  { label: "Self-Loading Mixer", src: "/images/self-loading-mixer.jpg", category: "hire", spec: "4.0m³ Batch · 4x4 Off-Road", badge: "Mobile Batching" },
  { label: "TLB Backhoe", src: "/images/tlb.jpg", category: "hire", spec: "4x4 Turbo Heavy Backhoe", badge: "Trench & Civils" },
  { label: "Motor Grader", src: "/images/grader.jpg", category: "hire", spec: "140hp · 12ft Heavy Blade", badge: "Haul Roads" },
  { label: "Farm Hammer Mill", src: "/images/farm-hammer-mill.jpg", category: "farming", spec: "Maize & Grain 1–2 TPH", badge: "Stockfeed Milling" },
  { label: "Feed Mixer (Vertical)", src: "/images/feed-mixer.jpg", category: "farming", spec: "500kg – 1-Tonne Batch", badge: "Poultry & Dairy" },
  { label: "Feed Mixer 3-Tonne", src: "/images/feed-mixer-3t.jpg", category: "farming", spec: "3-Tonne Commercial Batch", badge: "Commercial Feedlot" },
  { label: "Ice Block Plant", src: "/images/ice-block.jpg", category: "farming", spec: "1–5 Tonne / 24h Blocks", badge: "Cold Chain Storage" },
  { label: "Electric Fence Machine", src: "/images/electric-fence.jpg", category: "hardware", spec: "Automated Diamond Mesh", badge: "Wire Weaving" },
  { label: "Barbed Wire Machine", src: "/images/barbed-wire.jpg", category: "hardware", spec: "High-Speed Dual Strand", badge: "Perimeter Security" },
  { label: "Diesel Fence Machine", src: "/images/diesel-fence.jpg", category: "hardware", spec: "Independent Generator Drive", badge: "Off-Grid Production" },
  { label: "Double-Twist Fence", src: "/images/double-fence.jpg", category: "hardware", spec: "Heavy Hexagonal Mesh", badge: "Mining & Game Fence" },
  { label: "3-Phase Electric Motor", src: "/images/electric-motor.jpg", category: "industry", spec: "7.5kW to 55kW 380V", badge: "Heavy Duty Drive" },
  { label: "Diesel Generator Kit", src: "/images/generator.jpg", category: "industry", spec: "15kVA to 150kVA Silent", badge: "Standby Power" },
  { label: "Industrial Air Compressor", src: "/images/compressor.jpg", category: "industry", spec: "8–12 Bar Heavy Duty", badge: "Pneumatic Power" },
];

function RecordPager({
  index,
  total,
  title,
  subtitle,
  onBack,
  backLabel,
  onPrev,
  onNext,
}: {
  index: number;
  total: number;
  title: string;
  subtitle?: string;
  onBack: () => void;
  backLabel: string;
  onPrev: () => void;
  onNext: () => void;
}) {
  const atStart = index <= 0;
  const atEnd = index < 0 || index >= total - 1;
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3 min-w-0">
        <button
          type="button"
          onClick={onBack}
          className="mt-0.5 inline-flex h-11 shrink-0 items-center gap-1 rounded-full border border-black/[0.08] bg-white px-3.5 text-xs font-medium text-[#1D1D1F] shadow-2xs hover:bg-[#F5F5F7]"
        >
          <ChevronLeft className="size-4" />
          {backLabel}
        </button>
        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold tracking-tight text-[#1D1D1F]">{title}</h2>
          {subtitle ? <p className="truncate text-xs text-[#86868B]">{subtitle}</p> : null}
        </div>
      </div>
      <div className="flex items-center gap-1.5 self-end sm:self-auto">
        <button
          type="button"
          onClick={onPrev}
          disabled={atStart}
          className="inline-flex h-11 items-center gap-1 rounded-full border border-black/[0.08] bg-white px-3.5 text-xs font-medium text-[#1D1D1F] shadow-2xs hover:bg-[#F5F5F7] disabled:pointer-events-none disabled:opacity-30"
        >
          <ChevronLeft className="size-4" />
          Previous
        </button>
        <span className="min-w-16 px-2 text-center text-xs font-medium text-[#6E6E73]">
          {index < 0 ? "—" : `${index + 1} of ${total}`}
        </span>
        <button
          type="button"
          onClick={onNext}
          disabled={atEnd}
          className="inline-flex h-11 items-center gap-1 rounded-full border border-black/[0.08] bg-white px-3.5 text-xs font-medium text-[#1D1D1F] shadow-2xs hover:bg-[#F5F5F7] disabled:pointer-events-none disabled:opacity-30"
        >
          Next
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

function RowCheck({
  checked,
  indeterminate,
  onChange,
  label,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (next: boolean) => void;
  label: string;
}) {
  return (
    <input
      type="checkbox"
      aria-label={label}
      checked={checked}
      ref={(el) => {
        if (el) el.indeterminate = Boolean(indeterminate && !checked);
      }}
      onChange={(e) => onChange(e.target.checked)}
      className="size-4 shrink-0 cursor-pointer rounded border-black/25 accent-[#1D1D1F]"
    />
  );
}

function ConfirmModal({
  title,
  body,
  confirmLabel,
  tone = "danger",
  onCancel,
  onConfirm,
}: {
  title: string;
  body: string;
  confirmLabel: string;
  tone?: "danger" | "neutral";
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-black/[0.08] bg-white p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3">
          <div
            className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
              tone === "danger" ? "bg-red-50 text-red-600" : "bg-black/[0.05] text-[#1D1D1F]"
            }`}
          >
            {tone === "danger" ? <AlertTriangle className="size-5" /> : <Recycle className="size-5" />}
          </div>
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-[#1D1D1F]">{title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-[#6E6E73]">{body}</p>
          </div>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-11 items-center rounded-full border border-black/[0.08] bg-white px-4 text-xs font-medium text-[#1D1D1F] hover:bg-[#F5F5F7]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`inline-flex h-11 items-center rounded-full px-4 text-xs font-semibold text-white ${
              tone === "danger" ? "bg-red-600 hover:bg-red-700" : "bg-[#1D1D1F] hover:bg-black"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function formatBinDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function stageChipClass(stage: CRMClient["stage"]) {
  if (stage === "Won") return "bg-[#E8F8EE] text-[#1B833E]";
  if (stage === "Tender Quoted") return "bg-[#FFF4E5] text-[#B25E00]";
  if (stage === "Negotiation") return "bg-purple-50 text-purple-700";
  if (stage === "Lead") return "bg-blue-50 text-blue-700";
  if (stage === "Lost") return "bg-red-50 text-red-700";
  return "bg-black/[0.05] text-[#1D1D1F]";
}

function AdminBackoffice() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(isSessionAuthenticated());
  }, []);

  const [adminProfile, setAdminProfile] = useState<AdminProfile>(getStoredAdminProfile);
  const [profileName, setProfileName] = useState(adminProfile.fullName);
  const [profileEmail, setProfileEmail] = useState(adminProfile.email);
  const [profileRole, setProfileRole] = useState(adminProfile.role);
  const [profilePhone, setProfilePhone] = useState(adminProfile.phone);
  const [profileLocation, setProfileLocation] = useState(adminProfile.yardLocation);

  // Security Credentials Form States
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [isUpdatingCredentials, setIsUpdatingCredentials] = useState(false);
  const [credentialSuccessMsg, setCredentialSuccessMsg] = useState<string | null>(null);
  const [credentialErrorMsg, setCredentialErrorMsg] = useState<string | null>(null);

  // Login form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginRemember, setLoginRemember] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError(null);
    setIsSubmittingLogin(true);

    const inputUser = loginEmail.trim().toLowerCase();
    const inputPass = loginPassword.trim();
    const profile = getStoredAdminProfile();

    const isMatch =
      (inputUser === profile.email.toLowerCase() ||
        inputUser === "admin" ||
        inputUser === "admin@omnicore.co.zw" ||
        inputUser === "admin@omnisolutions.local") &&
      verifyAdminPassword(inputPass);

    if (isMatch) {
      setTimeout(() => {
        setSessionAuthenticated(loginRemember);
        setIsAuthenticated(true);
        setIsSubmittingLogin(false);
        triggerToast("Welcome back! Verified Omnicore Operations Desk.");
        apiClient.login(inputUser, inputPass).catch(() => {});
      }, 300);
    } else {
      // Attempt backend verification if local failed
      apiClient.login(inputUser, inputPass).then((res) => {
        if (res.success && res.user) {
          setSessionAuthenticated(loginRemember);
          setIsAuthenticated(true);
          const updated = saveStoredAdminProfile({
            email: res.user.email,
            fullName: res.user.fullName || profile.fullName,
          });
          setAdminProfile(updated);
          setIsSubmittingLogin(false);
          triggerToast("Welcome back! Verified Omnicore Operations Desk.");
        } else {
          setIsSubmittingLogin(false);
          setLoginError("Invalid credentials. Please enter the authorized administrator email and password.");
        }
      }).catch(() => {
        setIsSubmittingLogin(false);
        setLoginError("Invalid credentials. Please enter the authorized administrator email and password.");
      });
    }
  }

  function handleLogout() {
    clearSessionAuthentication();
    setIsAuthenticated(false);
    setLoginPassword("");
    triggerToast("Logged out of Operations Backoffice");
  }

  function handleSaveProfileDetails(e: React.FormEvent) {
    e.preventDefault();
    const updated = saveStoredAdminProfile({
      fullName: profileName.trim(),
      email: profileEmail.trim(),
      role: profileRole.trim(),
      phone: profilePhone.trim(),
      yardLocation: profileLocation.trim(),
    });
    setAdminProfile(updated);
    apiClient.updateProfile(updated).catch(() => {});
    triggerToast("Administrator profile details updated successfully!");
  }

  async function handleUpdateCredentials(e: React.FormEvent) {
    e.preventDefault();
    setCredentialErrorMsg(null);
    setCredentialSuccessMsg(null);

    if (!currentPassword) {
      setCredentialErrorMsg("Please enter your current administrator password to confirm.");
      return;
    }

    if (!verifyAdminPassword(currentPassword.trim())) {
      setCredentialErrorMsg("Incorrect current password. Please enter your valid current password.");
      return;
    }

    if (newPassword.length < 8) {
      setCredentialErrorMsg("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setCredentialErrorMsg("New password and confirmation do not match.");
      return;
    }

    setIsUpdatingCredentials(true);

    try {
      setAdminPassword(newPassword.trim());

      if (profileEmail.trim() && profileEmail.trim() !== adminProfile.email) {
        saveStoredAdminProfile({ email: profileEmail.trim() });
        setAdminProfile((prev) => ({ ...prev, email: profileEmail.trim() }));
      }

      await apiClient.changeCredentials(currentPassword.trim(), newPassword.trim(), profileEmail.trim());

      setCredentialSuccessMsg("Credentials updated securely! Your new password is now active.");
      triggerToast("Administrator credentials changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      setCredentialErrorMsg(err?.message || "Failed to update credentials.");
    } finally {
      setIsUpdatingCredentials(false);
    }
  }

  const [activeTab, setActiveTab] = useState<Tab>("crm");
  const [clients, setClients] = useState<CRMClient[]>(getStoredCRMClients);
  const [equipmentList, setEquipmentList] = useState<ExtendedEquipment[]>(getStoredEquipment);
  const [siteCopy, setSiteCopy] = useState<SiteCopyContent>(getStoredSiteCopy);

  // CRM States
  const [crmSearch, setCrmSearch] = useState("");
  const [crmStageFilter, setCrmStageFilter] = useState<string>("All");
  const [crmProvinceFilter, setCrmProvinceFilter] = useState<string>("All Zimbabwe");
  const [peekClientId, setPeekClientId] = useState<string | null>(null);
  const [profileClientId, setProfileClientId] = useState<string | null>(null);
  const [clientDraft, setClientDraft] = useState<CRMClient | null>(null);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [newClientOrg, setNewClientOrg] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("+263 ");
  const [newClientEmail, setNewClientEmail] = useState("");
  const [newClientLocation, setNewClientLocation] = useState("Harare");
  const [newClientProvince, setNewClientProvince] = useState("Harare");
  const [newClientService, setNewClientService] = useState("Mining Equipment");
  const [newClientInterest, setNewClientInterest] = useState("");
  const [newClientIntent, setNewClientIntent] = useState<CRMClient["intent"]>("Buy");
  const [newClientDealValue, setNewClientDealValue] = useState("12000");
  const [newClientPriority, setNewClientPriority] = useState<CRMClient["priority"]>("High");
  const [newClientNotes, setNewClientNotes] = useState("");
  const [newTimelineNote, setNewTimelineNote] = useState("");

  // Product States
  const [productSearch, setProductSearch] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState("all");
  const [peekProductId, setPeekProductId] = useState<string | null>(null);
  const [productProfileOpen, setProductProfileOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ExtendedEquipment | null>(null);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProdName, setNewProdName] = useState("");
  const [newProdCategory, setNewProdCategory] = useState<ExtendedEquipment["category"]>("mining");
  const [newProdThroughput, setNewProdThroughput] = useState("");
  const [newProdPower, setNewProdPower] = useState("");
  const [newProdPrice, setNewProdPrice] = useState("");
  const [newProdBlurb, setNewProdBlurb] = useState("");
  const [newProdImage, setNewProdImage] = useState("/images/jaw-crusher.jpg");
  const [newProdGallery, setNewProdGallery] = useState<string[]>([]);
  const [isCmsPreviewOpen, setIsCmsPreviewOpen] = useState(true);

  // Field Deployments State (Search, Filter, Pagination, View Mode, Sorting)
  const [deploymentsList, setDeploymentsList] = useState<DeploymentRecord[]>(getStoredDeployments);
  const [deploymentSearch, setDeploymentSearch] = useState("");
  const [deploymentStatusFilter, setDeploymentStatusFilter] = useState("all");
  const [deploymentProvinceFilter, setDeploymentProvinceFilter] = useState("all");
  const [deploymentCategoryFilter, setDeploymentCategoryFilter] = useState("all");
  const [deploymentSortBy, setDeploymentSortBy] = useState<"return-soon" | "newest" | "rate-high" | "plant-az">("return-soon");
  const [deploymentViewMode, setDeploymentViewMode] = useState<"table" | "grid" | "kanban">("table");
  const [deploymentPage, setDeploymentPage] = useState(1);
  const [deploymentPageSize, setDeploymentPageSize] = useState(10);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [editingDeployment, setEditingDeployment] = useState<DeploymentRecord | null>(null);

  // Deploy Machinery Modal Form States
  const [deployMachineId, setDeployMachineId] = useState("");
  const [deployPlant, setDeployPlant] = useState("");
  const [deployCategory, setDeployCategory] = useState<DeploymentRecord["category"]>("hire");
  const [deploySku, setDeploySku] = useState("");
  const [deployImage, setDeployImage] = useState("/images/cat-excavator.jpg");
  const [deployClient, setDeployClient] = useState("");
  const [deploySite, setDeploySite] = useState("");
  const [deployProvince, setDeployProvince] = useState("Harare");
  const [deployOperator, setDeployOperator] = useState("Wet Rate (With Certified Operator)");
  const [deployRate, setDeployRate] = useState("$480 / day");
  const [deployStatus, setDeployStatus] = useState<DeploymentStatus>("Active on Site");
  const [deployStartDate, setDeployStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [deployReturnDate, setDeployReturnDate] = useState("");
  const [deployContractRef, setDeployContractRef] = useState(`CNT-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`);
  const [deployContactPerson, setDeployContactPerson] = useState("");
  const [deployContactPhone, setDeployContactPhone] = useState("+263 ");
  const [deployNotes, setDeployNotes] = useState("");

  function resetDeployForm() {
    setDeployMachineId("");
    setDeployPlant("");
    setDeployCategory("hire");
    setDeploySku(`OMNI-HIR-${Math.floor(100 + Math.random() * 900)}`);
    setDeployImage("/images/cat-excavator.jpg");
    setDeployClient("");
    setDeploySite("");
    setDeployProvince("Harare");
    setDeployOperator("Wet Rate (With Certified Operator)");
    setDeployRate("$480 / day");
    setDeployStatus("Active on Site");
    setDeployStartDate(new Date().toISOString().slice(0, 10));
    setDeployReturnDate("");
    setDeployContractRef(`CNT-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`);
    setDeployContactPerson("");
    setDeployContactPhone("+263 ");
    setDeployNotes("");
  }

  function openCreateDeployment() {
    setEditingDeployment(null);
    resetDeployForm();
    setShowDeployModal(true);
  }

  function openEditDeployment(dep: DeploymentRecord) {
    setEditingDeployment(dep);
    setDeployMachineId(dep.productId || "");
    setDeployPlant(dep.plant);
    setDeployCategory(dep.category);
    setDeploySku(dep.sku || "");
    setDeployImage(dep.image || "/images/cat-excavator.jpg");
    setDeployClient(dep.client);
    setDeploySite(dep.site);
    setDeployProvince(dep.province);
    setDeployOperator(dep.operator);
    setDeployRate(dep.rate);
    setDeployStatus(dep.status);
    setDeployStartDate(dep.startDate);
    setDeployReturnDate(dep.scheduledReturn);
    setDeployContractRef(dep.contractRef);
    setDeployContactPerson(dep.contactPerson || "");
    setDeployContactPhone(dep.contactPhone || "+263 ");
    setDeployNotes(dep.notes || "");
    setShowDeployModal(true);
  }

  function handleSaveDeployment(e: React.FormEvent) {
    e.preventDefault();
    if (!deployPlant.trim()) {
      triggerToast("Please provide machine or plant name");
      return;
    }
    if (!deployClient.trim()) {
      triggerToast("Please provide client name");
      return;
    }

    const numericMatch = deployRate.replace(/[^0-9.]/g, "");
    const numericDailyRate = parseFloat(numericMatch) || 0;

    if (editingDeployment) {
      const updated: DeploymentRecord = {
        ...editingDeployment,
        productId: deployMachineId || editingDeployment.productId,
        plant: deployPlant.trim(),
        category: deployCategory,
        sku: deploySku.trim() || editingDeployment.sku,
        image: deployImage || editingDeployment.image,
        client: deployClient.trim(),
        site: deploySite.trim() || editingDeployment.site,
        province: deployProvince,
        operator: deployOperator,
        rate: deployRate.trim(),
        dailyRateUSD: numericDailyRate || editingDeployment.dailyRateUSD,
        status: deployStatus,
        startDate: deployStartDate,
        scheduledReturn: deployReturnDate || editingDeployment.scheduledReturn,
        contractRef: deployContractRef.trim() || editingDeployment.contractRef,
        contactPerson: deployContactPerson.trim(),
        contactPhone: deployContactPhone.trim(),
        notes: deployNotes.trim(),
      };
      const nextList = deploymentsList.map((d) => (d.id === editingDeployment.id ? updated : d));
      setDeploymentsList(nextList);
      saveStoredDeployments(nextList);
      triggerToast(`Updated ${updated.plant} (${updated.id})`);
    } else {
      const nextNum = deploymentsList.length + 1;
      const newId = `DEP-${String(nextNum).padStart(2, "0")}`;
      const newRecord: DeploymentRecord = {
        id: newId,
        productId: deployMachineId || undefined,
        plant: deployPlant.trim(),
        category: deployCategory,
        sku: deploySku.trim() || `OMNI-HIR-${Math.floor(100 + Math.random() * 900)}`,
        image: deployImage || "/images/cat-excavator.jpg",
        client: deployClient.trim(),
        site: deploySite.trim() || "Harare Metro",
        province: deployProvince,
        operator: deployOperator,
        rate: deployRate.trim() || "$480 / day",
        dailyRateUSD: numericDailyRate || 480,
        status: deployStatus,
        startDate: deployStartDate || new Date().toISOString().slice(0, 10),
        scheduledReturn: deployReturnDate || new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
        contractRef: deployContractRef.trim() || `CNT-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
        contactPerson: deployContactPerson.trim(),
        contactPhone: deployContactPhone.trim(),
        notes: deployNotes.trim(),
      };
      const nextList = [newRecord, ...deploymentsList];
      setDeploymentsList(nextList);
      saveStoredDeployments(nextList);
      triggerToast(`Created deployment ${newRecord.id} for ${newRecord.plant}`);
    }

    setShowDeployModal(false);
    setEditingDeployment(null);
    resetDeployForm();
  }

  function handleDeleteDeployment(id: string) {
    const target = deploymentsList.find((d) => d.id === id);
    if (!target) return;
    setPendingAction({
      type: "delete-deployment",
      id,
      name: `${target.plant} (${target.client})`,
    });
  }

  function handleConfirmDeleteDeployment(id: string) {
    const nextList = deploymentsList.filter((d) => d.id !== id);
    setDeploymentsList(nextList);
    saveStoredDeployments(nextList);
    triggerToast(`Deleted deployment ${id}`);
  }

  function handleQuickStatusChange(id: string, newStatus: DeploymentStatus) {
    const nextList = deploymentsList.map((d) => (d.id === id ? { ...d, status: newStatus } : d));
    setDeploymentsList(nextList);
    saveStoredDeployments(nextList);
    triggerToast(`Deployment ${id} status set to "${newStatus}"`);
  }

  function handleResetDefaultDeployments() {
    setDeploymentsList(DEFAULT_DEPLOYMENTS);
    saveStoredDeployments(DEFAULT_DEPLOYMENTS);
    triggerToast("Reset field deployments to factory defaults");
  }

  function handleDeployImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const f = files[0];
    if (f.size > 12 * 1024 * 1024) {
      triggerToast("Image file is too large (>12MB)");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setDeployImage(reader.result);
        triggerToast("Machine image attached");
      }
    };
    reader.readAsDataURL(f);
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>, isEditing = false, asGalleryItem = false) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      if (f.size > 12 * 1024 * 1024) {
        triggerToast(`${f.name} is too large (>12MB)`);
      } else {
        fileList.push(f);
      }
    }
    if (fileList.length === 0) return;

    let loaded = 0;
    const loadedUrls: string[] = [];

    fileList.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        loadedUrls.push(result);
        loaded++;

        if (loaded === fileList.length) {
          if (isEditing && editingProduct) {
            if (asGalleryItem || loadedUrls.length > 1) {
              const currentGallery = editingProduct.gallery || [];
              if (!asGalleryItem && loadedUrls.length > 1) {
                const [first, ...rest] = loadedUrls;
                setEditingProduct({
                  ...editingProduct,
                  image: first,
                  gallery: [...currentGallery, ...rest],
                });
                triggerToast(`Updated primary photo and added ${rest.length} photo(s) to gallery`);
              } else {
                setEditingProduct({
                  ...editingProduct,
                  gallery: [...currentGallery, ...loadedUrls],
                });
                triggerToast(`Added ${loadedUrls.length} photo(s) to product gallery`);
              }
            } else {
              setEditingProduct({ ...editingProduct, image: loadedUrls[0] });
              triggerToast("Primary photo updated successfully!");
            }
          } else {
            if (asGalleryItem || loadedUrls.length > 1) {
              if (!asGalleryItem && loadedUrls.length > 1) {
                const [first, ...rest] = loadedUrls;
                setNewProdImage(first);
                setNewProdGallery((prev) => [...prev, ...rest]);
                triggerToast(`Updated primary photo and added ${rest.length} photo(s) to gallery`);
              } else {
                setNewProdGallery((prev) => [...prev, ...loadedUrls]);
                triggerToast(`Added ${loadedUrls.length} photo(s) to gallery`);
              }
            } else {
              setNewProdImage(loadedUrls[0]);
              triggerToast("Primary photo uploaded successfully!");
            }
          }
        }
      };
      reader.readAsDataURL(file);
    });
  }

  function handleAddGalleryUrl(url: string, isEditing = false) {
    if (!url.trim()) return;
    if (isEditing && editingProduct) {
      const currentGallery = editingProduct.gallery || [];
      if (!currentGallery.includes(url.trim())) {
        setEditingProduct({ ...editingProduct, gallery: [...currentGallery, url.trim()] });
        triggerToast("Added photo to product gallery");
      }
    } else {
      if (!newProdGallery.includes(url.trim())) {
        setNewProdGallery((prev) => [...prev, url.trim()]);
        triggerToast("Added photo to product gallery");
      }
    }
  }

  function handleRemoveGalleryPhoto(index: number, isEditing = false) {
    if (isEditing && editingProduct) {
      const currentGallery = [...(editingProduct.gallery || [])];
      currentGallery.splice(index, 1);
      setEditingProduct({ ...editingProduct, gallery: currentGallery });
      triggerToast("Removed photo from gallery");
    } else {
      setNewProdGallery((prev) => {
        const next = [...prev];
        next.splice(index, 1);
        return next;
      });
      triggerToast("Removed photo from gallery");
    }
  }

  function handleCreateProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!newProdName.trim()) return;
    const newId = newProdName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const newEquip: ExtendedEquipment = {
      id: newId,
      name: newProdName.trim(),
      category: newProdCategory,
      intent: newProdCategory === "hire" ? "hire" : "sale",
      blurb: newProdBlurb.trim() || "Heavy machinery engineered for Zimbabwean site conditions.",
      image: newProdImage || "/images/jaw-crusher.jpg",
      imageAlt: newProdName,
      gallery: newProdGallery.length > 0 ? newProdGallery : undefined,
      spec: newProdThroughput.trim() || "Heavy-duty specification",
      sku: `OMNI-${newProdCategory.toUpperCase().slice(0, 3)}-${Math.floor(100 + Math.random() * 900)}`,
      stockStatus: "In Yard Cranborne",
      throughput: newProdThroughput.trim() || "Site Rated",
      powerOption: newProdPower.trim() || "Electric 3-Phase / Diesel",
      priceUSD: newProdPrice.trim() || "Tender on Request",
      condition: "New",
      warrantyMonths: 12,
      detailedNotes: "Full parts backup and field commissioning from Cranborne yard.",
    };
    const updated = [newEquip, ...equipmentList];
    setEquipmentList(updated);
    saveStoredEquipment(updated);
    setShowAddProductModal(false);
    triggerToast(`Added ${newEquip.name} to catalogue`);
    setNewProdName("");
    setNewProdThroughput("");
    setNewProdPower("");
    setNewProdPrice("");
    setNewProdBlurb("");
    setNewProdImage("/images/jaw-crusher.jpg");
    setNewProdGallery([]);
  }

  // CRM Pagination
  const [crmPage, setCrmPage] = useState(1);
  const [crmPageSize, setCrmPageSize] = useState(5);

  // Product Pagination
  const [productPage, setProductPage] = useState(1);
  const [productPageSize, setProductPageSize] = useState(6);

  // CMS Form State
  const [cmsForm, setCmsForm] = useState<SiteCopyContent>(siteCopy);
  const [cmsCategory, setCmsCategory] = useState<"all" | "hero" | "yard" | "contact" | "hours" | "divisions" | "about" | "social">("hero");
  const [cmsSearch, setCmsSearch] = useState("");
  const [cmsPreviewTab, setCmsPreviewTab] = useState<"hero" | "yard" | "whatsapp" | "about" | "divisions" | "footer">("hero");
  const [cmsLayoutMode, setCmsLayoutMode] = useState<"full" | "split">("full");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [newPresetCategoryFilter, setNewPresetCategoryFilter] = useState<string>("all");
  const [newPhotoPresetSearch, setNewPhotoPresetSearch] = useState("");
  const [zoomedPhoto, setZoomedPhoto] = useState<{ src: string; title: string } | null>(null);
  const [productLightbox, setProductLightbox] = useState<{
    isOpen: boolean;
    title: string;
    category?: string;
    spec?: string;
    price?: string;
    sku?: string;
    images: string[];
    initialIndex?: number;
  } | null>(null);

  function openProductLightbox(
    item: { name: string; category?: string; spec?: string; price?: string; sku?: string; id?: string; image?: string; gallery?: string[] },
    initialIndex: number = 0
  ) {
    const images = [item.image, ...(item.gallery || [])].filter((img): img is string => Boolean(img));
    setProductLightbox({
      isOpen: true,
      title: item.name,
      category: item.category,
      spec: item.spec,
      price: item.price,
      sku: item.sku || item.id,
      images: images.length > 0 ? images : ["/images/hero.jpg"],
      initialIndex,
    });
  }

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Selection, recycle bin, confirmations
  const [recycleBin, setRecycleBin] = useState<RecycleBinItem[]>(getStoredRecycleBin);
  const [selectedClientIds, setSelectedClientIds] = useState<string[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [selectedBinIds, setSelectedBinIds] = useState<string[]>([]);
  const [recycleFilter, setRecycleFilter] = useState<"all" | "client" | "product">("all");
  const [recycleSearch, setRecycleSearch] = useState("");
  const [pendingAction, setPendingAction] = useState<
    | { type: "delete-clients"; ids: string[] }
    | { type: "delete-products"; ids: string[] }
    | { type: "delete-deployment"; id: string; name: string }
    | { type: "restore"; binIds: string[] }
    | { type: "destroy"; binIds: string[] }
    | { type: "empty-bin" }
    | null
  >(null);

  useEffect(() => {
    // Listen for cross-tab or component updates
    function handleStorageSync() {
      setClients(getStoredCRMClients());
      setEquipmentList(getStoredEquipment());
      setSiteCopy(getStoredSiteCopy());
      setCmsForm(getStoredSiteCopy());
      setRecycleBin(getStoredRecycleBin());
      setDeploymentsList(getStoredDeployments());
    }
    window.addEventListener("omnicore-crm-updated", handleStorageSync);
    window.addEventListener("omnicore-equipment-updated", handleStorageSync);
    window.addEventListener("omnicore-copy-updated", handleStorageSync);
    window.addEventListener("omnicore-recycle-updated", handleStorageSync);
    window.addEventListener("omnicore-deployments-updated", handleStorageSync);
    return () => {
      window.removeEventListener("omnicore-crm-updated", handleStorageSync);
      window.removeEventListener("omnicore-equipment-updated", handleStorageSync);
      window.removeEventListener("omnicore-copy-updated", handleStorageSync);
      window.removeEventListener("omnicore-recycle-updated", handleStorageSync);
      window.removeEventListener("omnicore-deployments-updated", handleStorageSync);
    };
  }, []);

  function triggerToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  }

  // CRM Handlers
  function updateClientStage(id: string, stage: CRMClient["stage"]) {
    const updated = clients.map((c) => {
      if (c.id === id) {
        const newTimeline = [
          {
            date: "Today",
            note: `Deal stage updated to "${stage}"`,
            author: "Technical Desk",
          },
          ...c.timeline,
        ];
        return { ...c, stage, timeline: newTimeline };
      }
      return c;
    });
    setClients(updated);
    saveStoredCRMClients(updated);
    if (clientDraft?.id === id) {
      const next = updated.find((c) => c.id === id);
      if (next) setClientDraft(next);
    }
    triggerToast(`Stage updated to ${stage}`);
  }

  function handleAddTimelineNote() {
    if (!newTimelineNote.trim() || !clientDraft) return;
    const noteEntry = {
      date: "Today",
      note: newTimelineNote.trim(),
      author: "Technical Desk",
    };
    const updated = clients.map((c) =>
      c.id === clientDraft.id ? { ...c, timeline: [noteEntry, ...c.timeline] } : c,
    );
    setClients(updated);
    saveStoredCRMClients(updated);
    setClientDraft((prev) => (prev ? { ...prev, timeline: [noteEntry, ...prev.timeline] } : null));
    setNewTimelineNote("");
    triggerToast("Activity note logged");
  }

  function handleCreateClient(e: React.FormEvent) {
    e.preventDefault();
    if (!newClientName.trim()) return;
    const valNum = parseFloat(newClientDealValue.replace(/[^0-9.]/g, "")) || 0;
    const newRecord: CRMClient = {
      id: `CRM-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newClientName.trim(),
      organization: newClientOrg.trim() || "Private Syndicate / Farm",
      phone: newClientPhone.trim(),
      email: newClientEmail.trim() || "client@omnicore.zw",
      location: newClientLocation.trim() || "Harare",
      province: newClientProvince,
      service: newClientService,
      equipmentInterest: newClientInterest.trim() || "Heavy machinery requirement",
      intent: newClientIntent,
      stage: "Lead",
      priority: newClientPriority,
      dealValue: valNum,
      dealValueDisplay: `$${valNum.toLocaleString()}`,
      lastContact: "Just now",
      nextFollowUp: "Tomorrow",
      notes: newClientNotes.trim() || "New inquiry logged directly into Harare backoffice.",
      timeline: [
        {
          date: "Today",
          note: "Client record created in Omnicore CRM.",
          author: "Technical Desk",
        },
      ],
    };
    const updated = [newRecord, ...clients];
    setClients(updated);
    saveStoredCRMClients(updated);
    setShowAddClientModal(false);
    setPeekClientId(null);
    setProfileClientId(newRecord.id);
    setClientDraft(newRecord);
    triggerToast(`Client ${newRecord.name} added to pipeline`);
    // Reset
    setNewClientName("");
    setNewClientOrg("");
    setNewClientInterest("");
    setNewClientNotes("");
  }

  function handleSaveClient(e: React.FormEvent) {
    e.preventDefault();
    if (!clientDraft) return;
    const valNum = Number(clientDraft.dealValue) || 0;
    const next: CRMClient = {
      ...clientDraft,
      dealValue: valNum,
      dealValueDisplay: `$${valNum.toLocaleString()}`,
    };
    const updated = clients.map((c) => (c.id === next.id ? next : c));
    setClients(updated);
    saveStoredCRMClients(updated);
    setClientDraft(next);
    triggerToast(`Saved ${next.name}`);
  }

  // Product Handlers
  function handleSaveProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!editingProduct) return;
    const updated = equipmentList.map((item) =>
      item.id === editingProduct.id ? editingProduct : item,
    );
    setEquipmentList(updated);
    saveStoredEquipment(updated);
    triggerToast(`Updated ${editingProduct.name}`);
  }

  function handleDeleteProduct(id: string) {
    setPendingAction({ type: "delete-products", ids: [id] });
  }

  function moveClientsToBin(ids: string[]) {
    if (ids.length === 0) return;
    const idSet = new Set(ids);
    const toBin = clients.filter((c) => idSet.has(c.id));
    const remaining = clients.filter((c) => !idSet.has(c.id));
    const nextBin = [...toBin.map(toRecycleClient), ...recycleBin];
    setRecycleBin(nextBin);
    saveStoredRecycleBin(nextBin);
    setClients(remaining);
    saveStoredCRMClients(remaining);
    setSelectedClientIds((prev) => prev.filter((id) => !idSet.has(id)));
    if (profileClientId && idSet.has(profileClientId)) {
      setProfileClientId(null);
      setClientDraft(null);
    }
    if (peekClientId && idSet.has(peekClientId)) setPeekClientId(null);
    triggerToast(
      toBin.length === 1
        ? `${toBin[0].name} moved to recycle bin`
        : `${toBin.length} clients moved to recycle bin`,
    );
  }

  function moveProductsToBin(ids: string[]) {
    if (ids.length === 0) return;
    const idSet = new Set(ids);
    const toBin = equipmentList.filter((item) => idSet.has(item.id));
    const remaining = equipmentList.filter((item) => !idSet.has(item.id));
    const nextBin = [...toBin.map(toRecycleProduct), ...recycleBin];
    setRecycleBin(nextBin);
    saveStoredRecycleBin(nextBin);
    setEquipmentList(remaining);
    saveStoredEquipment(remaining);
    setSelectedProductIds((prev) => prev.filter((id) => !idSet.has(id)));
    if (editingProduct && idSet.has(editingProduct.id)) {
      setProductProfileOpen(false);
      setEditingProduct(null);
    }
    if (peekProductId && idSet.has(peekProductId)) setPeekProductId(null);
    triggerToast(
      toBin.length === 1
        ? `${toBin[0].name} moved to recycle bin`
        : `${toBin.length} machines moved to recycle bin`,
    );
  }

  function restoreBinItems(binIds: string[]) {
    if (binIds.length === 0) return;
    const idSet = new Set(binIds);
    const toRestore = recycleBin.filter((item) => idSet.has(item.binId));
    const remainingBin = recycleBin.filter((item) => !idSet.has(item.binId));
    let nextClients = clients;
    let nextEquip = equipmentList;
    for (const item of toRestore) {
      if (item.kind === "client") {
        const snap = item.snapshot as CRMClient;
        const exists = nextClients.some((c) => c.id === snap.id);
        nextClients = [{ ...snap, id: exists ? `${snap.id}-R` : snap.id }, ...nextClients];
      } else {
        const snap = item.snapshot as ExtendedEquipment;
        const exists = nextEquip.some((p) => p.id === snap.id);
        nextEquip = [{ ...snap, id: exists ? `${snap.id}-restored` : snap.id }, ...nextEquip];
      }
    }
    setRecycleBin(remainingBin);
    saveStoredRecycleBin(remainingBin);
    setClients(nextClients);
    saveStoredCRMClients(nextClients);
    setEquipmentList(nextEquip);
    saveStoredEquipment(nextEquip);
    setSelectedBinIds((prev) => prev.filter((id) => !idSet.has(id)));
    triggerToast(
      toRestore.length === 1 ? `Restored ${toRestore[0].title}` : `Restored ${toRestore.length} records`,
    );
  }

  function destroyBinItems(binIds: string[]) {
    if (binIds.length === 0) return;
    const idSet = new Set(binIds);
    const remainingBin = recycleBin.filter((item) => !idSet.has(item.binId));
    const removed = recycleBin.length - remainingBin.length;
    setRecycleBin(remainingBin);
    saveStoredRecycleBin(remainingBin);
    setSelectedBinIds((prev) => prev.filter((id) => !idSet.has(id)));
    triggerToast(removed === 1 ? "Record permanently deleted" : `${removed} records permanently deleted`);
  }

  function emptyRecycleBin() {
    const count = recycleBin.length;
    setRecycleBin([]);
    saveStoredRecycleBin([]);
    setSelectedBinIds([]);
    triggerToast(count === 0 ? "Recycle bin already empty" : `Emptied recycle bin (${count} records)`);
  }

  function runPendingAction() {
    if (!pendingAction) return;
    if (pendingAction.type === "delete-clients") moveClientsToBin(pendingAction.ids);
    else if (pendingAction.type === "delete-products") moveProductsToBin(pendingAction.ids);
    else if (pendingAction.type === "delete-deployment") handleConfirmDeleteDeployment(pendingAction.id);
    else if (pendingAction.type === "restore") restoreBinItems(pendingAction.binIds);
    else if (pendingAction.type === "destroy") destroyBinItems(pendingAction.binIds);
    else if (pendingAction.type === "empty-bin") emptyRecycleBin();
    setPendingAction(null);
  }

  function handleToggleStockStatus(id: string) {
    const updated = equipmentList.map((item) => {
      if (item.id === id) {
        const nextStatus: ExtendedEquipment["stockStatus"] =
          item.stockStatus === "In Yard Cranborne"
            ? "In Transit (Beitbridge)"
            : item.stockStatus === "In Transit (Beitbridge)"
              ? "Active on Site"
              : "In Yard Cranborne";
        return { ...item, stockStatus: nextStatus };
      }
      return item;
    });
    setEquipmentList(updated);
    saveStoredEquipment(updated);
    triggerToast("Stock status updated");
  }

  // CMS Handlers
  function handleSaveSiteCopy(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setSiteCopy(cmsForm);
    saveStoredSiteCopy(cmsForm);
    setHasUnsavedChanges(false);
    triggerToast("Website content published live!");
  }

  function handleResetSiteCopy() {
    if (typeof window !== "undefined" && window.confirm("Reset all website copy and details to original defaults?")) {
      const def = resetStoredSiteCopy();
      setSiteCopy(def);
      setCmsForm(def);
      setHasUnsavedChanges(false);
      triggerToast("Website copy reset to factory defaults!");
    }
  }

  function updateCmsField<K extends keyof SiteCopyContent>(field: K, value: SiteCopyContent[K]) {
    setCmsForm((prev) => ({ ...prev, [field]: value }));
    setHasUnsavedChanges(true);
  }

  // Filtered CRM Clients
  const filteredClients = useMemo(() => {
    const q = crmSearch.toLowerCase().trim();
    return clients.filter((c) => {
      const matchSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.organization.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.equipmentInterest.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q);

      const matchStage = crmStageFilter === "All" || c.stage === crmStageFilter;
      const matchProvince =
        crmProvinceFilter === "All Zimbabwe" || c.province === crmProvinceFilter;

      return matchSearch && matchStage && matchProvince;
    });
  }, [clients, crmSearch, crmStageFilter, crmProvinceFilter]);

  // CRM Pipeline Metrics
  const pipelineMetrics = useMemo(() => {
    const totalPipelineValue = clients
      .filter((c) => c.stage !== "Lost")
      .reduce((sum, c) => sum + c.dealValue, 0);
    const wonValue = clients
      .filter((c) => c.stage === "Won")
      .reduce((sum, c) => sum + c.dealValue, 0);
    const activeDeals = clients.filter(
      (c) => c.stage === "Lead" || c.stage === "Discovery" || c.stage === "Tender Quoted" || c.stage === "Negotiation",
    ).length;
    const wonDeals = clients.filter((c) => c.stage === "Won").length;
    const highPriorityCount = clients.filter((c) => c.priority === "High" && c.stage !== "Lost").length;

    return { totalPipelineValue, wonValue, activeDeals, wonDeals, highPriorityCount };
  }, [clients]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    const q = productSearch.toLowerCase().trim();
    return equipmentList.filter((item) => {
      const matchCat = productCategoryFilter === "all" || item.category === productCategoryFilter;
      const matchQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        (item.spec?.toLowerCase().includes(q) ?? false) ||
        (item.sku && item.sku.toLowerCase().includes(q)) ||
        (item.throughput && item.throughput.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }, [equipmentList, productSearch, productCategoryFilter]);

  const filteredRecycleItems = useMemo(() => {
    const q = recycleSearch.toLowerCase().trim();
    return recycleBin.filter((item) => {
      const matchKind = recycleFilter === "all" || item.kind === recycleFilter;
      const matchQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.binId.toLowerCase().includes(q);
      return matchKind && matchQuery;
    });
  }, [recycleBin, recycleFilter, recycleSearch]);

  const pendingConfirm = useMemo(() => {
    if (!pendingAction) return null;
    if (pendingAction.type === "delete-clients") {
      const n = pendingAction.ids.length;
      return {
        title: n === 1 ? "Move client to recycle bin?" : `Move ${n} clients to recycle bin?`,
        body: "They will leave the CRM pipeline and can be restored from Recycle Bin. Public records stay hidden until restored.",
        confirmLabel: "Move to recycle bin",
        tone: "danger" as const,
      };
    }
    if (pendingAction.type === "delete-products") {
      const n = pendingAction.ids.length;
      return {
        title: n === 1 ? "Move machine to recycle bin?" : `Move ${n} machines to recycle bin?`,
        body: "They will be removed from Cranborne inventory and the public catalogue until restored.",
        confirmLabel: "Move to recycle bin",
        tone: "danger" as const,
      };
    }
    if (pendingAction.type === "delete-deployment") {
      return {
        title: `Delete deployment ${pendingAction.id}?`,
        body: `Are you sure you want to remove "${pendingAction.name}" from active field deployments?`,
        confirmLabel: "Delete deployment",
        tone: "danger" as const,
      };
    }
    if (pendingAction.type === "restore") {
      const n = pendingAction.binIds.length;
      return {
        title: n === 1 ? "Restore this record?" : `Restore ${n} records?`,
        body: "Restored clients return to the CRM pipeline. Restored machines reappear in inventory and the public catalogue.",
        confirmLabel: "Restore",
        tone: "neutral" as const,
      };
    }
    if (pendingAction.type === "destroy") {
      const n = pendingAction.binIds.length;
      return {
        title: n === 1 ? "Permanently delete this record?" : `Permanently delete ${n} records?`,
        body: "This cannot be undone. The snapshot will be removed from the recycle bin forever.",
        confirmLabel: "Delete forever",
        tone: "danger" as const,
      };
    }
    return {
      title: "Empty recycle bin?",
      body: `Permanently delete all ${recycleBin.length} records. This cannot be undone.`,
      confirmLabel: "Empty bin",
      tone: "danger" as const,
    };
  }, [pendingAction, recycleBin.length]);

  // CRM Pagination computation
  const crmTotalPages = Math.max(1, Math.ceil(filteredClients.length / crmPageSize));
  const paginatedClients = useMemo(() => {
    const start = (crmPage - 1) * crmPageSize;
    return filteredClients.slice(start, start + crmPageSize);
  }, [filteredClients, crmPage, crmPageSize]);

  useEffect(() => {
    setCrmPage(1);
  }, [crmSearch, crmStageFilter, crmProvinceFilter, crmPageSize]);

  // Product Pagination computation
  const productTotalPages = Math.max(1, Math.ceil(filteredProducts.length / productPageSize));
  const paginatedProducts = useMemo(() => {
    const start = (productPage - 1) * productPageSize;
    return filteredProducts.slice(start, start + productPageSize);
  }, [filteredProducts, productPage, productPageSize]);

  useEffect(() => {
    setProductPage(1);
  }, [productSearch, productCategoryFilter, productPageSize]);

  // Deployment computations (Search, Filter, Sort, Pagination, Metrics)
  const filteredDeployments = useMemo(() => {
    return deploymentsList
      .filter((d) => {
        const q = deploymentSearch.trim().toLowerCase();
        const matchesSearch =
          !q ||
          d.id.toLowerCase().includes(q) ||
          d.plant.toLowerCase().includes(q) ||
          d.client.toLowerCase().includes(q) ||
          d.site.toLowerCase().includes(q) ||
          d.province.toLowerCase().includes(q) ||
          d.operator.toLowerCase().includes(q) ||
          d.contractRef.toLowerCase().includes(q) ||
          (d.contactPerson && d.contactPerson.toLowerCase().includes(q)) ||
          (d.notes && d.notes.toLowerCase().includes(q));

        const matchesStatus = deploymentStatusFilter === "all" || d.status === deploymentStatusFilter;
        const matchesProvince = deploymentProvinceFilter === "all" || d.province === deploymentProvinceFilter;
        const matchesCategory = deploymentCategoryFilter === "all" || d.category === deploymentCategoryFilter;

        return matchesSearch && matchesStatus && matchesProvince && matchesCategory;
      })
      .sort((a, b) => {
        if (deploymentSortBy === "return-soon") {
          return new Date(a.scheduledReturn).getTime() - new Date(b.scheduledReturn).getTime();
        }
        if (deploymentSortBy === "newest") {
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        }
        if (deploymentSortBy === "rate-high") {
          return (b.dailyRateUSD || 0) - (a.dailyRateUSD || 0);
        }
        if (deploymentSortBy === "plant-az") {
          return a.plant.localeCompare(b.plant);
        }
        return 0;
      });
  }, [
    deploymentsList,
    deploymentSearch,
    deploymentStatusFilter,
    deploymentProvinceFilter,
    deploymentCategoryFilter,
    deploymentSortBy,
  ]);

  const deploymentTotalPages = Math.max(1, Math.ceil(filteredDeployments.length / deploymentPageSize));
  const paginatedDeployments = useMemo(() => {
    if (deploymentPageSize >= 999) return filteredDeployments;
    const start = (deploymentPage - 1) * deploymentPageSize;
    return filteredDeployments.slice(start, start + deploymentPageSize);
  }, [filteredDeployments, deploymentPage, deploymentPageSize]);

  useEffect(() => {
    setDeploymentPage(1);
  }, [deploymentSearch, deploymentStatusFilter, deploymentProvinceFilter, deploymentCategoryFilter, deploymentPageSize]);

  const deploymentMetrics = useMemo(() => {
    const total = deploymentsList.length;
    const activeOnSite = deploymentsList.filter((d) => d.status === "Active on Site").length;
    const scheduled = deploymentsList.filter((d) => d.status === "Scheduled Mobilization").length;
    const demobilizingOrService = deploymentsList.filter(
      (d) => d.status === "Demobilizing / In Transit" || d.status === "Routine Service / Standby"
    ).length;
    const returnedYard = deploymentsList.filter((d) => d.status === "Returned to Cranborne Yard").length;
    const totalDailyRunRate = deploymentsList
      .filter((d) => d.status === "Active on Site")
      .reduce((sum, d) => sum + (d.dailyRateUSD || 0), 0);

    return {
      total,
      activeOnSite,
      scheduled,
      demobilizingOrService,
      returnedYard,
      totalDailyRunRate,
    };
  }, [deploymentsList]);

  const peekClient = peekClientId ? (clients.find((c) => c.id === peekClientId) ?? null) : null;
  const peekProduct = peekProductId
    ? (equipmentList.find((p) => p.id === peekProductId) ?? null)
    : null;
  const clientNavIndex = profileClientId
    ? filteredClients.findIndex((c) => c.id === profileClientId)
    : -1;
  const productNavIndex = editingProduct
    ? filteredProducts.findIndex((p) => p.id === editingProduct.id)
    : -1;

  useEffect(() => {
    if (!profileClientId) {
      setClientDraft(null);
      return;
    }
    const live = clients.find((c) => c.id === profileClientId);
    setClientDraft(live ?? null);
    // Only re-seed the form when the record id changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileClientId]);

  function stepClient(delta: number) {
    if (clientNavIndex < 0) return;
    const next = filteredClients[clientNavIndex + delta];
    if (next) setProfileClientId(next.id);
  }

  function stepProduct(delta: number) {
    if (productNavIndex < 0 || !editingProduct) return;
    const next = filteredProducts[productNavIndex + delta];
    if (next) setEditingProduct(next);
  }

  function openClientProfile(id: string) {
    setPeekClientId(null);
    setProfileClientId(id);
  }

  function openProductProfile(item: ExtendedEquipment) {
    setPeekProductId(null);
    setEditingProduct(item);
    setProductProfileOpen(true);
  }

  function closeClientProfile() {
    setProfileClientId(null);
    setClientDraft(null);
  }

  function closeProductProfile() {
    setProductProfileOpen(false);
    setEditingProduct(null);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const typing = (e.target as HTMLElement | null)?.closest("input, textarea, select");
      if (e.key === "Escape") {
        setPeekClientId(null);
        setPeekProductId(null);
        return;
      }
      if (typing) return;
      if (e.key === "ArrowLeft") {
        if (profileClientId) stepClient(-1);
        else if (productProfileOpen) stepProduct(-1);
      }
      if (e.key === "ArrowRight") {
        if (profileClientId) stepClient(1);
        else if (productProfileOpen) stepProduct(1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans antialiased selection:bg-[#1D1D1F] selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 inset-x-0 mx-auto z-50 flex w-fit items-center gap-2 rounded-full border border-black/[0.06] bg-white px-5 py-2.5 text-xs font-semibold text-[#1D1D1F] shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md animate-in fade-in slide-in-from-top-3">
          <span className="size-2 rounded-full bg-[#34C759]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Authentication Gate */}
      {!isAuthenticated ? (
        <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#F5F5F7] via-[#ECECEE] to-[#E5E5E8] px-4 py-8 sm:px-6 sm:py-12">
          {/* Top minimal bar */}
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5 group">
              <img
                src="/mark.png"
                alt=""
                className="size-8 object-cover"
              />
              <span className="text-sm font-semibold tracking-tight text-[#1D1D1F]">
                Omnicore Solutions
              </span>
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition-colors"
            >
              <span>Return to Public Website</span>
              <ExternalLink className="size-3" />
            </Link>
          </div>

          {/* Login Card */}
          <div className="mx-auto w-full max-w-[420px] py-8">
            <div className="rounded-3xl border border-black/[0.08] bg-white p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
              {/* Header Icon */}
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#1D1D1F] text-white shadow-md">
                <Lock className="size-6 text-white" />
              </div>

              <div className="mt-5 text-center">
                <h1 className="text-xl font-bold tracking-tight text-[#1D1D1F]">
                  Omnicore Backoffice
                </h1>
                <p className="mt-1.5 text-xs text-[#6E6E73] leading-relaxed">
                  Authorized Operations & Technical CRM Access · Cranborne Yard, Harare
                </p>
              </div>

              {loginError && (
                <div className="mt-5 flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50/80 p-3.5 text-xs text-red-800 animate-in fade-in">
                  <AlertCircle className="size-4 shrink-0 text-red-600 mt-0.5" />
                  <div className="flex-1 font-medium">{loginError}</div>
                </div>
              )}

              <form onSubmit={handleLogin} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#1D1D1F] mb-1.5">
                    Username / Administrator Email
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      autoComplete="username"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="Enter authorized administrator email"
                      className="w-full rounded-xl border border-black/15 bg-[#F9F9FB] px-3.5 py-2.5 text-sm text-[#1D1D1F] placeholder:text-[#A1A1A6] focus:border-[#1D1D1F] focus:bg-white focus:outline-none transition-all shadow-2xs"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-[#1D1D1F]">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter administrator password"
                      className="w-full rounded-xl border border-black/15 bg-[#F9F9FB] px-3.5 pr-10 py-2.5 text-sm text-[#1D1D1F] placeholder:text-[#A1A1A6] focus:border-[#1D1D1F] focus:bg-white focus:outline-none transition-all shadow-2xs"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#86868B] hover:text-[#1D1D1F] cursor-pointer"
                      title={showLoginPassword ? "Hide password" : "Show password"}
                    >
                      {showLoginPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 text-xs text-[#6E6E73] cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={loginRemember}
                      onChange={(e) => setLoginRemember(e.target.checked)}
                      className="size-4 rounded border-black/25 accent-[#1D1D1F]"
                    />
                    <span>Remember on this device</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingLogin}
                  className="mt-2 w-full inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1D1D1F] text-sm font-semibold text-white shadow-sm hover:bg-black active:scale-[0.99] disabled:opacity-60 transition-all cursor-pointer"
                >
                  {isSubmittingLogin ? (
                    <span>Verifying Credentials...</span>
                  ) : (
                    <>
                      <KeyRound className="size-4 text-white/80" />
                      <span>Authenticate & Open Backoffice</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Footer note */}
          <div className="text-center text-xs text-[#86868B] py-2">
            © {new Date().getFullYear()} Omnicore Solutions · Cranborne Yard, Harare, Zimbabwe
          </div>
        </div>
      ) : (
        <>

      {/* HD Machinery Photo Lightbox Modal for Large Screens */}
      {productLightbox && (
        <ProductPhotoLightbox
          isOpen={productLightbox.isOpen}
          onClose={() => setProductLightbox(null)}
          title={productLightbox.title}
          category={productLightbox.category}
          spec={productLightbox.spec}
          price={productLightbox.price}
          sku={productLightbox.sku}
          images={productLightbox.images}
          initialIndex={productLightbox.initialIndex ?? 0}
        />
      )}
      {zoomedPhoto && (
        <ProductPhotoLightbox
          isOpen={Boolean(zoomedPhoto)}
          onClose={() => setZoomedPhoto(null)}
          title={zoomedPhoto.title}
          images={[zoomedPhoto.src]}
        />
      )}

      {/* Top Apple Bar */}
      <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1720px] w-full items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link to="/admin" className="flex items-center gap-2.5 group">
              <div className="flex size-8 items-center justify-center rounded-xl bg-[#1D1D1F] text-white text-xs font-bold shadow-xs">
                O
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold tracking-tight text-[#1D1D1F]">
                    Omnicore Backoffice
                  </span>
                  <span className="rounded-full bg-black/[0.05] px-2 py-0.5 text-[10px] font-medium text-[#6E6E73]">
                    Harare Operations
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className={`hidden sm:flex items-center gap-2 rounded-full border border-black/[0.08] px-3 py-1 text-xs transition-all cursor-pointer ${
                activeTab === "profile"
                  ? "bg-[#1D1D1F] text-white"
                  : "bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#EBEBEB]"
              }`}
              title="Manage Administrator Profile & Credentials"
            >
              <span className="size-2 rounded-full bg-emerald-500" />
              <span className={`font-medium ${activeTab === "profile" ? "text-white/90" : "text-[#6E6E73]"}`}>
                {adminProfile.email}
              </span>
              <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                activeTab === "profile" ? "bg-white/20 text-white" : "bg-black/[0.06] text-[#1D1D1F]"
              }`}>
                Profile
              </span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-red-600 shadow-2xs hover:bg-red-50 transition-all active:scale-95"
              title="Sign out of Operations Backoffice"
            >
              <LogOut className="size-3.5" />
              <span>Sign Out</span>
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-4 py-1.5 text-xs font-medium text-[#1D1D1F] shadow-2xs hover:bg-[#F5F5F7] transition-all active:scale-95"
            >
              <span>Public Website</span>
              <ExternalLink className="size-3 text-[#86868B]" />
            </Link>
          </div>
        </div>

        {/* Clean iOS Navigation Segmented Control */}
        <div className="mx-auto max-w-[1720px] w-full px-4 sm:px-6 lg:px-8 pb-3">
          <div className="inline-flex w-full sm:w-auto items-center overflow-x-auto rounded-xl bg-black/[0.05] p-1 text-xs">
            {[
              { id: "crm", label: "Clients & CRM Pipeline", icon: Users, count: filteredClients.length },
              { id: "products", label: "Machinery Inventory", icon: Package, count: equipmentList.length },
              { id: "cms", label: "Site Content & Copy", icon: FileText },
              { id: "hire", label: "Field Deployments", icon: Truck },
              { id: "recycle", label: "Recycle Bin", icon: Recycle, count: recycleBin.length },
              { id: "profile", label: "Profile & Security", icon: ShieldCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as Tab);
                    setPeekClientId(null);
                    setProfileClientId(null);
                    setPeekProductId(null);
                    setProductProfileOpen(false);
                    setEditingProduct(null);
                    setSelectedClientIds([]);
                    setSelectedProductIds([]);
                    setSelectedBinIds([]);
                  }}
                  className={`flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-lg px-4 py-1.5 font-medium transition-all ${
                    isActive
                      ? "bg-white text-[#1D1D1F] shadow-xs font-semibold"
                      : "text-[#6E6E73] hover:text-[#1D1D1F]"
                  }`}
                >
                  <Icon className="size-3.5" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                        isActive
                          ? "bg-black/[0.06] text-[#1D1D1F]"
                          : "bg-black/[0.04] text-[#86868B]"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="mx-auto max-w-[1720px] w-full px-4 py-6 sm:px-6 lg:px-8">
        {/* ========================================================================= */}
        {/* TAB 1: CLIENT CRM & PIPELINE TABLE */}
        {/* ========================================================================= */}
        {activeTab === "crm" && (
          <div className="space-y-6">
            {profileClientId && clientDraft ? (
              <form onSubmit={handleSaveClient} className="space-y-5">
                <RecordPager
                  index={clientNavIndex}
                  total={filteredClients.length}
                  title={clientDraft.name}
                  subtitle={`${clientDraft.organization} · ${clientDraft.id}`}
                  onBack={closeClientProfile}
                  backLabel="All clients"
                  onPrev={() => stepClient(-1)}
                  onNext={() => stepClient(1)}
                />

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
                  <div className="space-y-4 lg:col-span-7">
                    <div className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.03)]">
                      <div className="mb-4 flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${stageChipClass(clientDraft.stage)}`}>
                          {clientDraft.stage}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                            clientDraft.priority === "High"
                              ? "bg-red-50 text-red-600"
                              : clientDraft.priority === "Medium"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-black/[0.04] text-[#86868B]"
                          }`}
                        >
                          {clientDraft.priority} priority
                        </span>
                        <span className="text-sm font-semibold text-[#1D1D1F]">{clientDraft.dealValueDisplay}</span>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
                        <div>
                          <label className="mb-1 block font-medium text-[#1D1D1F]">Client name</label>
                          <input
                            type="text"
                            required
                            value={clientDraft.name}
                            onChange={(e) => setClientDraft({ ...clientDraft, name: e.target.value })}
                            className="h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block font-medium text-[#1D1D1F]">Organization</label>
                          <input
                            type="text"
                            value={clientDraft.organization}
                            onChange={(e) => setClientDraft({ ...clientDraft, organization: e.target.value })}
                            className="h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block font-medium text-[#1D1D1F]">Phone / WhatsApp</label>
                          <input
                            type="text"
                            value={clientDraft.phone}
                            onChange={(e) => setClientDraft({ ...clientDraft, phone: e.target.value })}
                            className="h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block font-medium text-[#1D1D1F]">Email</label>
                          <input
                            type="email"
                            value={clientDraft.email}
                            onChange={(e) => setClientDraft({ ...clientDraft, email: e.target.value })}
                            className="h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block font-medium text-[#1D1D1F]">Site location</label>
                          <input
                            type="text"
                            value={clientDraft.location}
                            onChange={(e) => setClientDraft({ ...clientDraft, location: e.target.value })}
                            className="h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block font-medium text-[#1D1D1F]">Province</label>
                          <select
                            value={clientDraft.province}
                            onChange={(e) => setClientDraft({ ...clientDraft, province: e.target.value })}
                            className="h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
                          >
                            {PROVINCES.filter((p) => p !== "All Zimbabwe").map((p) => (
                              <option key={p} value={p}>
                                {p}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="mb-1 block font-medium text-[#1D1D1F]">Division</label>
                          <select
                            value={clientDraft.service}
                            onChange={(e) => setClientDraft({ ...clientDraft, service: e.target.value })}
                            className="h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
                          >
                            <option value="Mining Equipment">Mining Equipment</option>
                            <option value="Construction Machinery Hire">Machinery Hire</option>
                            <option value="Hardware & Construction">Hardware & Fence</option>
                            <option value="Farming Machinery">Farming Plant</option>
                            <option value="Industry & Manufacturing">Industrial Plant</option>
                          </select>
                        </div>
                        <div>
                          <label className="mb-1 block font-medium text-[#1D1D1F]">Deal type</label>
                          <select
                            value={clientDraft.intent}
                            onChange={(e) =>
                              setClientDraft({ ...clientDraft, intent: e.target.value as CRMClient["intent"] })
                            }
                            className="h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
                          >
                            <option value="Buy">Outright Purchase</option>
                            <option value="Hire">Plant Hire</option>
                            <option value="Both">Both</option>
                            <option value="Consultation">Technical Consult</option>
                          </select>
                        </div>
                        <div>
                          <label className="mb-1 block font-medium text-[#1D1D1F]">Stage</label>
                          <select
                            value={clientDraft.stage}
                            onChange={(e) =>
                              updateClientStage(clientDraft.id, e.target.value as CRMClient["stage"])
                            }
                            className="h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
                          >
                            {STAGES.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="mb-1 block font-medium text-[#1D1D1F]">Priority</label>
                          <select
                            value={clientDraft.priority}
                            onChange={(e) =>
                              setClientDraft({
                                ...clientDraft,
                                priority: e.target.value as CRMClient["priority"],
                              })
                            }
                            className="h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
                          >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Normal">Normal</option>
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <label className="mb-1 block font-medium text-[#1D1D1F]">Estimated value ($)</label>
                          <input
                            type="text"
                            value={String(clientDraft.dealValue)}
                            onChange={(e) =>
                              setClientDraft({
                                ...clientDraft,
                                dealValue: Number(e.target.value.replace(/[^0-9.]/g, "")) || 0,
                              })
                            }
                            className="h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="mb-1 block font-medium text-[#1D1D1F]">Equipment required</label>
                          <input
                            type="text"
                            value={clientDraft.equipmentInterest}
                            onChange={(e) =>
                              setClientDraft({ ...clientDraft, equipmentInterest: e.target.value })
                            }
                            className="h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="mb-1 block font-medium text-[#1D1D1F]">Internal notes</label>
                          <textarea
                            rows={3}
                            value={clientDraft.notes}
                            onChange={(e) => setClientDraft({ ...clientDraft, notes: e.target.value })}
                            className="w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] p-3 leading-relaxed text-[#1D1D1F] focus:bg-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="mt-4 flex justify-end gap-2 border-t border-black/[0.06] pt-3">
                        <button
                          type="button"
                          onClick={() =>
                            setPendingAction({ type: "delete-clients", ids: [clientDraft.id] })
                          }
                          className="inline-flex h-11 items-center gap-1.5 rounded-full border border-red-200 bg-white px-4 text-xs font-semibold text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="size-3.5" />
                          Move to bin
                        </button>
                        <button
                          type="submit"
                          className="inline-flex h-11 items-center rounded-full bg-[#1D1D1F] px-5 text-xs font-semibold text-white hover:bg-black"
                        >
                          Save profile
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 lg:col-span-5">
                    <div className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.03)]">
                      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-[#86868B]">
                        Fast technical response (WhatsApp)
                      </span>
                      <div className="grid grid-cols-1 gap-1.5 text-xs">
                        {[
                          {
                            label: "Formal tender rate ready",
                            text: `Good day ${clientDraft.name}. Following up from Omnicore Solutions Harare regarding ${clientDraft.equipmentInterest}. We have prepared the indicative FOB Harare quotation and specifications for your review.`,
                          },
                          {
                            label: "Cranborne yard inspection",
                            text: `Hello ${clientDraft.name}, your requested machinery (${clientDraft.equipmentInterest}) is available for physical inspection at our Cranborne yard (115 Chiremba Rd, Harare). What time works best for you?`,
                          },
                          {
                            label: "Freight & delivery schedule",
                            text: `Good day ${clientDraft.name}. We can arrange direct lowbed delivery to your site in ${clientDraft.location}. Please confirm site access for heavy plant haulage.`,
                          },
                          {
                            label: "Commissioning & warranty",
                            text: `Hello ${clientDraft.name}, all Omnicore plant includes on-site field commissioning and 12-month parts backup from Cranborne. Let us finalize the mobilization date.`,
                          },
                        ].map((tmpl, idx) => (
                          <a
                            key={idx}
                            href={whatsappUrl(tmpl.text)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between rounded-lg border border-black/[0.06] bg-white p-2.5 text-left text-[11px] font-medium text-[#1D1D1F] hover:border-[#1fa855] hover:bg-emerald-50/30"
                          >
                            <span>{tmpl.label}</span>
                            <WhatsAppIcon className="ml-1 size-3 shrink-0 text-[#1fa855]" />
                          </a>
                        ))}
                      </div>
                      <div className="mt-3 flex gap-2">
                        <a
                          href={`tel:${clientDraft.phone}`}
                          className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full border border-black/[0.08] bg-[#F5F5F7] text-xs font-medium text-[#1D1D1F]"
                        >
                          <Phone className="size-3.5" />
                          Call
                        </a>
                        <a
                          href={`mailto:${clientDraft.email}`}
                          className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full border border-black/[0.08] bg-[#F5F5F7] text-xs font-medium text-[#1D1D1F]"
                        >
                          <Mail className="size-3.5" />
                          Email
                        </a>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.03)]">
                      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-[#86868B]">
                        Activity log ({clientDraft.timeline.length})
                      </span>
                      <div className="max-h-56 space-y-1.5 overflow-y-auto pr-1">
                        {clientDraft.timeline.map((item, i) => (
                          <div key={i} className="rounded-lg bg-[#F5F5F7] p-2 text-[11px] text-[#6E6E73]">
                            <div className="flex justify-between font-medium text-[#1D1D1F]">
                              <span>{item.author}</span>
                              <span className="text-[#86868B]">{item.date}</span>
                            </div>
                            <p className="mt-0.5">{item.note}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-1.5 pt-3">
                        <input
                          type="text"
                          value={newTimelineNote}
                          onChange={(e) => setNewTimelineNote(e.target.value)}
                          placeholder="Log phone call, site inspection, deposit..."
                          className="h-11 flex-1 rounded-lg border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs text-[#1D1D1F] placeholder-[#86868B] focus:bg-white focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleAddTimelineNote}
                          className="h-11 rounded-lg bg-[#1D1D1F] px-4 text-xs font-medium text-white hover:bg-black"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <>
            {/* KPI Executive Summary Strip */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-black/[0.04] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                <span className="text-[11px] font-medium text-[#86868B] uppercase tracking-wider">
                  Active Tender Pipeline
                </span>
                <div className="mt-1.5 flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F]">
                    ${pipelineMetrics.totalPipelineValue.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#34C759] font-medium">
                    {pipelineMetrics.activeDeals} deals
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-black/[0.04] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                <span className="text-[11px] font-medium text-[#86868B] uppercase tracking-wider">
                  Closed / Won Revenue
                </span>
                <div className="mt-1.5 flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F]">
                    ${pipelineMetrics.wonValue.toLocaleString()}
                  </span>
                  <span className="text-xs text-[#34C759] font-medium">
                    {pipelineMetrics.wonDeals} orders
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-black/[0.04] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                <span className="text-[11px] font-medium text-[#86868B] uppercase tracking-wider">
                  High Priority Tenders
                </span>
                <div className="mt-1.5 flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F]">
                    {pipelineMetrics.highPriorityCount}
                  </span>
                  <span className="text-xs text-[#FF9500] font-medium">urgent</span>
                </div>
              </div>

              <div className="rounded-2xl border border-black/[0.04] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
                <span className="text-[11px] font-medium text-[#86868B] uppercase tracking-wider">
                  Client Base in Zimbabwe
                </span>
                <div className="mt-1.5 flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F]">
                    {clients.length}
                  </span>
                  <span className="text-xs text-[#86868B]">accounts</span>
                </div>
              </div>
            </div>

            {/* Filter & Control Toolbar */}
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              {/* Stage Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
                {["All", ...STAGES].map((st) => {
                  const count =
                    st === "All" ? clients.length : clients.filter((c) => c.stage === st).length;
                  const isCurrent = crmStageFilter === st;
                  return (
                    <button
                      key={st}
                      onClick={() => setCrmStageFilter(st)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all ${
                        isCurrent
                          ? "bg-[#1D1D1F] text-white shadow-xs"
                          : "bg-white text-[#6E6E73] hover:text-[#1D1D1F] border border-black/[0.06]"
                      }`}
                    >
                      <span>{st}</span>
                      <span className={`text-[10px] ${isCurrent ? "text-white/80" : "text-[#86868B]"}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search, Province & New Lead Button */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-[#86868B]" />
                  <input
                    type="text"
                    value={crmSearch}
                    onChange={(e) => setCrmSearch(e.target.value)}
                    placeholder="Search client, syndicate, plant..."
                    className="h-9 w-44 sm:w-60 rounded-full border border-black/[0.08] bg-white pl-9 pr-3 text-xs text-[#1D1D1F] placeholder-[#86868B] shadow-2xs focus:outline-none focus:ring-1 focus:ring-black/20"
                  />
                </div>

                <select
                  value={crmProvinceFilter}
                  onChange={(e) => setCrmProvinceFilter(e.target.value)}
                  className="h-9 rounded-full border border-black/[0.08] bg-white px-3 text-xs text-[#1D1D1F] shadow-2xs focus:outline-none focus:ring-1 focus:ring-black/20"
                >
                  {PROVINCES.map((prov) => (
                    <option key={prov} value={prov}>
                      {prov}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => setShowAddClientModal(true)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#1D1D1F] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-black transition-all active:scale-95"
                >
                  <Plus className="size-3.5" />
                  <span>New Client</span>
                </button>
                <button
                  onClick={() => setActiveTab("recycle")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-3 py-2 text-xs font-medium text-[#1D1D1F] shadow-2xs hover:bg-[#F5F5F7]"
                  title="Open recycle bin"
                >
                  <Recycle className="size-3.5 text-[#6E6E73]" />
                  <span className="hidden sm:inline">Bin</span>
                  {recycleBin.filter((i) => i.kind === "client").length > 0 && (
                    <span className="rounded-full bg-black/[0.06] px-1.5 text-[10px] font-semibold">
                      {recycleBin.filter((i) => i.kind === "client").length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {selectedClientIds.length > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#1D1D1F]/10 bg-[#1D1D1F] px-4 py-2.5 text-white shadow-xs">
                <span className="text-xs font-semibold">
                  {selectedClientIds.length} client{selectedClientIds.length === 1 ? "" : "s"} selected
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedClientIds([])}
                    className="rounded-full px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/10"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => setPendingAction({ type: "delete-clients", ids: selectedClientIds })}
                    className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-red-400"
                  >
                    <Trash2 className="size-3.5" />
                    Move to recycle bin
                  </button>
                </div>
              </div>
            )}

            {/* Client table */}
            <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.03)]">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-black/[0.06] bg-[#FBFBFC] text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">
                        <th className="w-10 py-3 pl-4 pr-1">
                          <RowCheck
                            label="Select all clients on this page"
                            checked={
                              paginatedClients.length > 0 &&
                              paginatedClients.every((c) => selectedClientIds.includes(c.id))
                            }
                            indeterminate={
                              paginatedClients.some((c) => selectedClientIds.includes(c.id)) &&
                              !paginatedClients.every((c) => selectedClientIds.includes(c.id))
                            }
                            onChange={(next) => {
                              const pageIds = paginatedClients.map((c) => c.id);
                              setSelectedClientIds((prev) =>
                                next
                                  ? [...new Set([...prev, ...pageIds])]
                                  : prev.filter((id) => !pageIds.includes(id)),
                              );
                            }}
                          />
                        </th>
                        <th className="py-3 px-4">Client / Organization</th>
                        <th className="py-3 px-3">Location</th>
                        <th className="py-3 px-3">Equipment Required</th>
                        <th className="py-3 px-3">Stage</th>
                        <th className="py-3 px-3 text-right">Deal Value</th>
                        <th className="py-3 px-3 text-center">Priority</th>
                        <th className="py-3 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.04]">
                      {filteredClients.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-12 text-center text-[#86868B]">
                            No client records match the current filters.
                          </td>
                        </tr>
                      ) : (
                        paginatedClients.map((client) => {
                          const isSelected = peekClientId === client.id;
                          const isChecked = selectedClientIds.includes(client.id);
                          return (
                            <tr
                              key={client.id}
                              onClick={() => setPeekClientId(client.id)}
                              className={`transition-colors cursor-pointer ${
                                isChecked
                                  ? "bg-[#F3F8FF]"
                                  : isSelected
                                    ? "bg-[#F5F5F7] font-medium"
                                    : "hover:bg-black/[0.015]"
                              }`}
                            >
                              <td
                                className="w-10 py-3 pl-4 pr-1"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <RowCheck
                                  label={`Select ${client.name}`}
                                  checked={isChecked}
                                  onChange={(next) =>
                                    setSelectedClientIds((prev) =>
                                      next ? [...prev, client.id] : prev.filter((id) => id !== client.id),
                                    )
                                  }
                                />
                              </td>
                              <td className="py-3 px-4">
                                <span className="font-semibold text-[#1D1D1F] block">
                                  {client.name}
                                </span>
                                <span className="text-[11px] text-[#6E6E73] block truncate max-w-[160px]">
                                  {client.organization}
                                </span>
                              </td>

                              <td className="py-3 px-3 text-[#6E6E73]">
                                <span className="block text-[#1D1D1F]">{client.location}</span>
                                <span className="text-[10px] text-[#86868B]">{client.province}</span>
                              </td>

                              <td className="py-3 px-3">
                                <span className="text-[#1D1D1F] font-medium block truncate max-w-[180px]">
                                  {client.equipmentInterest}
                                </span>
                                <span className="rounded bg-black/[0.04] px-1.5 py-0.2 text-[10px] text-[#6E6E73]">
                                  {client.intent}
                                </span>
                              </td>

                              <td className="py-3 px-3" onClick={(e) => e.stopPropagation()}>
                                <select
                                  value={client.stage}
                                  onChange={(e) =>
                                    updateClientStage(client.id, e.target.value as CRMClient["stage"])
                                  }
                                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold border-0 focus:ring-1 focus:ring-black/20 ${
                                    client.stage === "Won"
                                      ? "bg-[#E8F8EE] text-[#1B833E]"
                                      : client.stage === "Tender Quoted"
                                      ? "bg-[#FFF4E5] text-[#B25E00]"
                                      : client.stage === "Negotiation"
                                      ? "bg-purple-50 text-purple-700"
                                      : client.stage === "Lead"
                                      ? "bg-blue-50 text-blue-700"
                                      : client.stage === "Lost"
                                      ? "bg-red-50 text-red-700"
                                      : "bg-black/[0.05] text-[#1D1D1F]"
                                  }`}
                                >
                                  {STAGES.map((st) => (
                                    <option key={st} value={st}>
                                      {st}
                                    </option>
                                  ))}
                                </select>
                              </td>

                              <td className="py-3 px-3 text-right font-semibold text-[#1D1D1F]">
                                {client.dealValueDisplay}
                              </td>

                              <td className="py-3 px-3 text-center">
                                <span
                                  className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${
                                    client.priority === "High"
                                      ? "bg-red-50 text-red-600"
                                      : client.priority === "Medium"
                                      ? "bg-amber-50 text-amber-700"
                                      : "bg-black/[0.04] text-[#86868B]"
                                  }`}
                                >
                                  {client.priority}
                                </span>
                              </td>

                              <td className="py-3 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-center justify-end gap-1">
                                  <a
                                    href={whatsappUrl(
                                      `Hello ${client.name}, following up from Omnicore Harare regarding your inquiry for ${client.equipmentInterest}.`,
                                    )}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex size-7 items-center justify-center rounded-lg text-[#1fa855] hover:bg-[#1fa855]/10"
                                    title="WhatsApp Client"
                                  >
                                    <WhatsAppIcon className="size-3.5" />
                                  </a>
                                  <a
                                    href={`tel:${client.phone}`}
                                    className="flex size-7 items-center justify-center rounded-lg text-[#1D1D1F] hover:bg-black/[0.05]"
                                    title="Call"
                                  >
                                    <Phone className="size-3.5 text-[#6E6E73]" />
                                  </a>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setPendingAction({ type: "delete-clients", ids: [client.id] })
                                    }
                                    className="flex size-7 items-center justify-center rounded-lg text-red-600 hover:bg-red-50"
                                    title="Move to recycle bin"
                                  >
                                    <Trash2 className="size-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* CRM Pagination Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-black/[0.06] bg-[#FBFBFC] px-4 py-3 text-xs text-[#6E6E73]">
                  <div className="flex flex-wrap items-center gap-2">
                    <span>Showing</span>
                    <span className="font-semibold text-[#1D1D1F]">
                      {filteredClients.length === 0 ? 0 : (crmPage - 1) * crmPageSize + 1}
                    </span>
                    <span>to</span>
                    <span className="font-semibold text-[#1D1D1F]">
                      {Math.min(crmPage * crmPageSize, filteredClients.length)}
                    </span>
                    <span>of</span>
                    <span className="font-semibold text-[#1D1D1F]">{filteredClients.length}</span>
                    <span>clients</span>

                    <span className="mx-1 text-black/20">|</span>

                    <div className="flex items-center gap-1.5">
                      <span>Per page:</span>
                      <select
                        value={crmPageSize}
                        onChange={(e) => {
                          setCrmPageSize(Number(e.target.value));
                          setCrmPage(1);
                        }}
                        className="rounded-lg border border-black/[0.08] bg-white px-2 py-0.5 text-xs text-[#1D1D1F] focus:outline-none"
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 self-end sm:self-auto">
                    <button
                      onClick={() => setCrmPage(1)}
                      disabled={crmPage <= 1}
                      className="rounded-lg p-1 text-[#6E6E73] hover:bg-black/[0.05] hover:text-[#1D1D1F] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      title="First page"
                    >
                      <ChevronsLeft className="size-4" />
                    </button>
                    <button
                      onClick={() => setCrmPage((p) => Math.max(1, p - 1))}
                      disabled={crmPage <= 1}
                      className="rounded-lg p-1 text-[#6E6E73] hover:bg-black/[0.05] hover:text-[#1D1D1F] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      title="Previous page"
                    >
                      <ChevronLeft className="size-4" />
                    </button>

                    <div className="flex items-center gap-1 px-1">
                      {Array.from({ length: crmTotalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => setCrmPage(pageNum)}
                          className={`min-w-6 h-6 rounded-md px-1.5 text-xs font-medium transition-all ${
                            crmPage === pageNum
                              ? "bg-[#1D1D1F] text-white font-semibold shadow-xs"
                              : "text-[#6E6E73] hover:bg-black/[0.05] hover:text-[#1D1D1F]"
                          }`}
                        >
                          {pageNum}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setCrmPage((p) => Math.min(crmTotalPages, p + 1))}
                      disabled={crmPage >= crmTotalPages}
                      className="rounded-lg p-1 text-[#6E6E73] hover:bg-black/[0.05] hover:text-[#1D1D1F] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      title="Next page"
                    >
                      <ChevronRight className="size-4" />
                    </button>
                    <button
                      onClick={() => setCrmPage(crmTotalPages)}
                      disabled={crmPage >= crmTotalPages}
                      className="rounded-lg p-1 text-[#6E6E73] hover:bg-black/[0.05] hover:text-[#1D1D1F] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                      title="Last page"
                    >
                      <ChevronsRight className="size-4" />
                    </button>
                  </div>
                </div>
              </div>

              </>
            )}

            {peekClient && !profileClientId && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
                onClick={() => setPeekClientId(null)}
              >
                <div
                  className="w-full max-w-md rounded-2xl border border-black/[0.08] bg-white p-5 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-mono text-[11px] text-[#86868B]">{peekClient.id}</span>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${stageChipClass(peekClient.stage)}`}>
                          {peekClient.stage}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            peekClient.priority === "High"
                              ? "bg-red-50 text-red-600"
                              : peekClient.priority === "Medium"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-black/[0.04] text-[#86868B]"
                          }`}
                        >
                          {peekClient.priority}
                        </span>
                      </div>
                      <h3 className="mt-1 text-base font-semibold text-[#1D1D1F]">{peekClient.name}</h3>
                      <p className="text-xs text-[#6E6E73]">{peekClient.organization}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPeekClientId(null)}
                      className="rounded-full p-2 text-[#86868B] hover:bg-[#F5F5F7] hover:text-[#1D1D1F]"
                    >
                      <X className="size-4" />
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-xl bg-[#F5F5F7] p-2.5">
                      <span className="block text-[10px] uppercase text-[#86868B]">Deal value</span>
                      <span className="font-semibold text-[#1D1D1F]">{peekClient.dealValueDisplay}</span>
                    </div>
                    <div className="rounded-xl bg-[#F5F5F7] p-2.5">
                      <span className="block text-[10px] uppercase text-[#86868B]">Location</span>
                      <span className="block truncate font-semibold text-[#1D1D1F]">
                        {peekClient.location}
                      </span>
                    </div>
                    <div className="col-span-2 rounded-xl bg-[#F5F5F7] p-2.5">
                      <span className="block text-[10px] uppercase text-[#86868B]">Requirement</span>
                      <span className="font-medium text-[#1D1D1F]">{peekClient.equipmentInterest}</span>
                    </div>
                    <div className="rounded-xl bg-[#F5F5F7] p-2.5">
                      <span className="block text-[10px] uppercase text-[#86868B]">Phone</span>
                      <span className="font-semibold text-[#1D1D1F]">{peekClient.phone}</span>
                    </div>
                    <div className="rounded-xl bg-[#F5F5F7] p-2.5">
                      <span className="block text-[10px] uppercase text-[#86868B]">Intent</span>
                      <span className="font-semibold text-[#1D1D1F]">{peekClient.intent}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() => openClientProfile(peekClient.id)}
                      className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full bg-[#1D1D1F] text-xs font-semibold text-white hover:bg-black"
                    >
                      <Edit3 className="size-3.5" />
                      Edit profile
                    </button>
                    <a
                      href={whatsappUrl(
                        `Hello ${peekClient.name}, following up from Omnicore Harare regarding your inquiry for ${peekClient.equipmentInterest}.`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center justify-center rounded-full border border-black/[0.08] px-4 text-[#1fa855] hover:bg-emerald-50"
                    >
                      <WhatsAppIcon className="size-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() =>
                        setPendingAction({ type: "delete-clients", ids: [peekClient.id] })
                      }
                      className="inline-flex h-11 items-center justify-center rounded-full border border-red-200 px-4 text-red-600 hover:bg-red-50"
                      title="Move to recycle bin"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

                        {/* Modal: New Client / Deal */}
            {showAddClientModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
                <div className="w-full max-w-xl rounded-2xl border border-black/[0.08] bg-white p-6 shadow-2xl">
                  <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
                    <h3 className="text-sm font-semibold text-[#1D1D1F]">
                      Create New Client / Tender Lead
                    </h3>
                    <button
                      onClick={() => setShowAddClientModal(false)}
                      className="rounded-full p-1 text-[#86868B] hover:bg-[#F5F5F7]"
                    >
                      <X className="size-4" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateClient} className="mt-4 space-y-3.5 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-medium text-[#1D1D1F] block mb-1">Client Full Name *</label>
                        <input
                          type="text"
                          required
                          value={newClientName}
                          onChange={(e) => setNewClientName(e.target.value)}
                          placeholder="e.g. Tendai Mashingaidze"
                          className="w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 focus:bg-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="font-medium text-[#1D1D1F] block mb-1">Company / Mining Syndicate</label>
                        <input
                          type="text"
                          value={newClientOrg}
                          onChange={(e) => setNewClientOrg(e.target.value)}
                          placeholder="e.g. Mberengwa Chrome JV"
                          className="w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-medium text-[#1D1D1F] block mb-1">WhatsApp / Phone *</label>
                        <input
                          type="text"
                          required
                          value={newClientPhone}
                          onChange={(e) => setNewClientPhone(e.target.value)}
                          placeholder="+263 77..."
                          className="w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 focus:bg-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="font-medium text-[#1D1D1F] block mb-1">Email Address</label>
                        <input
                          type="email"
                          value={newClientEmail}
                          onChange={(e) => setNewClientEmail(e.target.value)}
                          placeholder="client@syndicate.co.zw"
                          className="w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-medium text-[#1D1D1F] block mb-1">Site Location</label>
                        <input
                          type="text"
                          value={newClientLocation}
                          onChange={(e) => setNewClientLocation(e.target.value)}
                          placeholder="e.g. Kadoma / Golden Valley"
                          className="w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 focus:bg-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="font-medium text-[#1D1D1F] block mb-1">Province in Zimbabwe</label>
                        <select
                          value={newClientProvince}
                          onChange={(e) => setNewClientProvince(e.target.value)}
                          className="w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 focus:bg-white focus:outline-none"
                        >
                          {PROVINCES.filter((p) => p !== "All Zimbabwe").map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="font-medium text-[#1D1D1F] block mb-1">Division</label>
                        <select
                          value={newClientService}
                          onChange={(e) => setNewClientService(e.target.value)}
                          className="w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-2.5 focus:bg-white focus:outline-none"
                        >
                          <option value="Mining Equipment">Mining Equipment</option>
                          <option value="Construction Machinery Hire">Machinery Hire</option>
                          <option value="Hardware & Construction">Hardware & Fence</option>
                          <option value="Farming Machinery">Farming Plant</option>
                          <option value="Industry & Manufacturing">Industrial Plant</option>
                        </select>
                      </div>
                      <div>
                        <label className="font-medium text-[#1D1D1F] block mb-1">Deal Type</label>
                        <select
                          value={newClientIntent}
                          onChange={(e) => setNewClientIntent(e.target.value as CRMClient["intent"])}
                          className="w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-2.5 focus:bg-white focus:outline-none"
                        >
                          <option value="Buy">Outright Purchase</option>
                          <option value="Hire">Plant Hire</option>
                          <option value="Both">Both</option>
                          <option value="Consultation">Technical Consult</option>
                        </select>
                      </div>
                      <div>
                        <label className="font-medium text-[#1D1D1F] block mb-1">Priority</label>
                        <select
                          value={newClientPriority}
                          onChange={(e) => setNewClientPriority(e.target.value as CRMClient["priority"])}
                          className="w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-2.5 focus:bg-white focus:outline-none"
                        >
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Normal">Normal</option>
                        </select>
                      </div>
                      <div>
                        <label className="font-medium text-[#1D1D1F] block mb-1">Estimated Value ($)</label>
                        <input
                          type="text"
                          value={newClientDealValue}
                          onChange={(e) => setNewClientDealValue(e.target.value)}
                          placeholder="e.g. 15000"
                          className="w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-medium text-[#1D1D1F] block mb-1">Equipment Specification Required</label>
                      <input
                        type="text"
                        value={newClientInterest}
                        onChange={(e) => setNewClientInterest(e.target.value)}
                        placeholder="e.g. 200x300 Jaw crusher with diesel motor option"
                        className="w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="font-medium text-[#1D1D1F] block mb-1">Initial Notes</label>
                      <textarea
                        rows={2}
                        value={newClientNotes}
                        onChange={(e) => setNewClientNotes(e.target.value)}
                        placeholder="Project timelines, access constraints, payment structure..."
                        className="w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] p-2.5 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-black/[0.06]">
                      <button
                        type="button"
                        onClick={() => setShowAddClientModal(false)}
                        className="rounded-full bg-[#F5F5F7] px-4 py-1.5 text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-full bg-[#1D1D1F] px-4 py-1.5 text-xs font-semibold text-white hover:bg-black"
                      >
                        Save Client Record
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: MACHINERY INVENTORY & SPEC WRITER */}
        {/* ========================================================================= */}
        {activeTab === "products" && (
          <div className="space-y-6">
            {productProfileOpen && editingProduct ? (
              <form onSubmit={handleSaveProduct} className="space-y-5">
                <RecordPager
                  index={productNavIndex}
                  total={filteredProducts.length}
                  title={editingProduct.name}
                  subtitle={editingProduct.sku || editingProduct.id}
                  onBack={closeProductProfile}
                  backLabel="All machines"
                  onPrev={() => stepProduct(-1)}
                  onNext={() => stepProduct(1)}
                />

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
                  {/* Left Main Specifications Column */}
                  <div className="space-y-6 lg:col-span-8">
                    {/* Card 1: Equipment Visual & Harare Yard Photo Studio */}
                    <div className="rounded-3xl border border-black/[0.06] bg-white p-5 sm:p-7 shadow-xs space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-black/[0.06] pb-4 gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="flex size-8 items-center justify-center rounded-xl bg-black/[0.05] text-[#1D1D1F]">
                              <Eye className="size-4.5" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-[#1D1D1F] text-base">
                                Equipment Visual & Yard Photo Studio
                              </h3>
                              <p className="text-xs text-[#86868B] mt-0.5">
                                High-resolution photography shown across public catalogue, division pages, client WhatsApp spec sheets, and tender documents.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 self-start sm:self-auto">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              editingProduct.stockStatus === "In Yard Cranborne"
                                ? "bg-[#E8F8EE] text-[#1B833E]"
                                : editingProduct.stockStatus === "In Transit (Beitbridge)"
                                ? "bg-[#FFF4E5] text-[#B25E00]"
                                : "bg-black/[0.04] text-[#6E6E73]"
                            }`}
                          >
                            {editingProduct.stockStatus || "In Yard Cranborne"}
                          </span>
                        </div>
                      </div>

                      {/* Multi-Photo Gallery & Active Photo Workspace */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold text-[#1D1D1F] block">
                              Product Multi-Photo Gallery
                            </span>
                            <p className="text-[11px] text-[#86868B] mt-0.5">
                              Post several photos per machine. Drag or click any thumbnail to set it as the primary photo.
                            </p>
                          </div>
                          <span className="rounded-full bg-black/[0.05] px-2.5 py-0.5 text-[11px] font-semibold text-[#1D1D1F]">
                            {(editingProduct.gallery?.length || 0) + 1} {((editingProduct.gallery?.length || 0) + 1) === 1 ? "Photo" : "Photos"}
                          </span>
                        </div>

                        {/* Thumbnails row */}
                        <div className="flex flex-wrap items-center gap-3 p-3 rounded-2xl bg-[#F9F9FA] border border-black/[0.06]">
                          {/* Primary Photo Chip */}
                          <div
                            role="button"
                            tabIndex={0}
                            onClick={() => openProductLightbox(editingProduct, 0)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                openProductLightbox(editingProduct, 0);
                              }
                            }}
                            className="relative group/primary rounded-xl overflow-hidden border-2 border-[#1FA855] p-0.5 bg-white shadow-xs cursor-pointer hover:border-black transition-all"
                            title="Click to preview primary photo in large screen"
                          >
                            <img
                              src={editingProduct.image || "/images/jaw-crusher.jpg"}
                              alt="Primary"
                              className="size-16 sm:size-20 rounded-lg object-cover"
                            />
                            <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/primary:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                              <ZoomIn className="size-4.5 text-white drop-shadow-md" />
                            </div>
                            <span className="absolute bottom-1 inset-x-1 rounded bg-[#1FA855] text-white text-[9px] font-bold text-center py-0.5 shadow-xs">
                              Primary
                            </span>
                          </div>

                          {/* Additional Gallery Photos */}
                          {(editingProduct.gallery || []).map((photoUrl, idx) => (
                            <div
                              key={idx}
                              className="relative group rounded-xl overflow-hidden border border-black/10 p-0.5 bg-white shadow-2xs hover:border-[#1D1D1F] transition-all"
                            >
                              <img
                                src={photoUrl}
                                alt={`Gallery ${idx + 1}`}
                                className="size-16 sm:size-20 rounded-lg object-cover"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-between p-1 rounded-lg">
                                <div className="flex items-center justify-between w-full">
                                  <button
                                    type="button"
                                    onClick={() => openProductLightbox(editingProduct, idx + 1)}
                                    className="rounded-full bg-black/75 p-1 text-white hover:bg-white hover:text-black shadow-xs cursor-pointer transition-colors"
                                    title="View this photo on large screen"
                                  >
                                    <ZoomIn className="size-2.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveGalleryPhoto(idx, true)}
                                    className="rounded-full bg-red-600 p-1 text-white hover:bg-red-700 shadow-xs cursor-pointer"
                                    title="Remove photo"
                                  >
                                    <X className="size-2.5" />
                                  </button>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const oldPrimary = editingProduct.image;
                                    const nextGallery = [...(editingProduct.gallery || [])];
                                    nextGallery[idx] = oldPrimary;
                                    setEditingProduct({
                                      ...editingProduct,
                                      image: photoUrl,
                                      gallery: nextGallery,
                                    });
                                    triggerToast("Swapped as primary photo");
                                  }}
                                  className="w-full rounded bg-white/95 text-[#1D1D1F] text-[9px] font-semibold py-0.5 hover:bg-white cursor-pointer"
                                >
                                  Make Primary
                                </button>
                              </div>
                            </div>
                          ))}

                          {/* Upload More Photos Button */}
                          <label className="flex flex-col items-center justify-center size-16 sm:size-20 rounded-xl border border-dashed border-black/20 bg-white hover:border-[#1D1D1F] hover:bg-[#F5F5F7] cursor-pointer transition-all text-[#6E6E73] hover:text-[#1D1D1F] shrink-0">
                            <ImagePlus className="size-5 mb-0.5 text-[#1D1D1F]" />
                            <span className="text-[10px] font-semibold">+ Add Photo</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, true, true)}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>

                      {/* Main Photo Visual Workspace */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                        {/* Prominent High-Definition Preview Canvas (7 cols) */}
                        <div className="lg:col-span-7 space-y-3">
                          <div
                            role="button"
                            tabIndex={0}
                            onClick={() => openProductLightbox(editingProduct, 0)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                openProductLightbox(editingProduct, 0);
                              }
                            }}
                            className="relative w-full h-64 sm:h-76 md:h-84 rounded-2xl overflow-hidden bg-black/[0.05] border border-black/[0.08] shadow-sm group cursor-pointer"
                            title="Click to open photos in full-screen large preview"
                          >
                            <img
                              src={editingProduct.image || "/images/jaw-crusher.jpg"}
                              alt={editingProduct.name}
                              className="size-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/images/hero.jpg";
                              }}
                            />
                            {/* Top Badges Overlay */}
                            <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                              <span className="rounded-full bg-black/75 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md flex items-center gap-2 shadow-md">
                                <span className="size-2 rounded-full bg-[#1FA855] animate-pulse" />
                                <span>Active Primary Photo</span>
                              </span>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openProductLightbox(editingProduct, 0);
                                }}
                                className="pointer-events-auto rounded-full bg-black/60 hover:bg-black p-2 text-white shadow-md backdrop-blur-md transition-all active:scale-90 cursor-pointer"
                                title="Zoom & Inspect HD Image in Large Screen (Z)"
                              >
                                <ZoomIn className="size-4" />
                              </button>
                            </div>

                            {/* Bottom Identity Overlay */}
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-10 text-white">
                              <div className="flex items-center justify-between gap-2">
                                <div className="min-w-0">
                                  <p className="text-sm font-semibold truncate leading-tight">{editingProduct.name}</p>
                                  <div className="flex items-center gap-2 mt-1 text-xs text-white/80">
                                    <span className="capitalize font-medium">{editingProduct.category} Division</span>
                                    <span>•</span>
                                    <span className="font-mono text-[11px]">{editingProduct.sku || editingProduct.id}</span>
                                  </div>
                                </div>
                                <span className="shrink-0 rounded-full bg-white/20 backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold text-white group-hover:bg-[#1FA855] transition-all">
                                  View Large Screen ↗
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#86868B]">
                            <span className="flex items-center gap-1.5">
                              <CheckCircle2 className="size-3.5 text-[#1B833E]" />
                              <span>Live high-resolution preview connected</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => openProductLightbox(editingProduct, 0)}
                              className="font-medium text-[#1D1D1F] hover:underline inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Maximize2 className="size-3" />
                              <span>Inspect HD Fullscreen</span>
                            </button>
                          </div>
                        </div>

                        {/* Photo Controls, Upload & URL Input (5 cols) */}
                        <div className="lg:col-span-5 space-y-4 rounded-2xl bg-[#F9F9FA] p-4.5 border border-black/[0.06]">
                          <div>
                            <span className="text-xs font-semibold text-[#1D1D1F] block">
                              Upload Additional or Primary Photos
                            </span>
                            <p className="text-[11px] text-[#86868B] mt-0.5">
                              Upload from device or enter URL. You can upload as many photos as needed.
                            </p>
                          </div>

                          {/* Dual Upload Options */}
                          <div className="grid grid-cols-2 gap-2">
                            <label className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-black/[0.15] bg-white p-3 hover:border-black/30 hover:bg-[#F5F5F7] cursor-pointer transition-all text-center">
                              <Upload className="size-4 text-[#1D1D1F]" />
                              <span className="text-[11px] font-semibold text-[#1D1D1F]">
                                Set Primary
                              </span>
                              <span className="text-[9px] text-[#86868B]">Replace hero</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, true, false)}
                                className="hidden"
                              />
                            </label>

                            <label className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/50 p-3 hover:border-emerald-500 hover:bg-emerald-50 cursor-pointer transition-all text-center">
                              <ImagePlus className="size-4 text-emerald-700" />
                              <span className="text-[11px] font-semibold text-emerald-900">
                                Add to Gallery
                              </span>
                              <span className="text-[9px] text-emerald-700/80">Extra photo</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, true, true)}
                                className="hidden"
                              />
                            </label>
                          </div>

                          {/* Direct Path / URL Input */}
                          <div className="space-y-1.5">
                            <label className="text-xs font-medium text-[#1D1D1F] flex items-center justify-between">
                              <span>Primary Photo URL / Path:</span>
                              <span className="text-[10px] text-[#86868B] font-mono">/images/...</span>
                            </label>
                            <input
                              type="text"
                              value={editingProduct.image}
                              onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                              placeholder="/images/... or https://..."
                              className="w-full h-8.5 rounded-xl border border-black/[0.08] bg-white px-3 text-xs text-[#1D1D1F] focus:outline-none focus:ring-1 focus:ring-black/20 font-mono text-[11px]"
                            />
                          </div>

                          {/* Add extra URL directly to gallery */}
                          <div className="pt-1">
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                const form = e.currentTarget;
                                const input = form.elements.namedItem("extraUrl") as HTMLInputElement;
                                if (input && input.value) {
                                  handleAddGalleryUrl(input.value, true);
                                  input.value = "";
                                }
                              }}
                              className="flex items-center gap-1.5"
                            >
                              <input
                                type="text"
                                name="extraUrl"
                                placeholder="Paste extra photo URL..."
                                className="flex-1 h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-[11px] font-mono focus:outline-none focus:ring-1 focus:ring-black/20"
                              />
                              <button
                                type="submit"
                                className="h-8 px-3 rounded-lg bg-[#1D1D1F] text-white text-[11px] font-semibold hover:bg-black transition-all shrink-0 cursor-pointer"
                              >
                                + Add URL
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card 2: Model & Commercial Identity */}
                    <div className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.03)] space-y-4">
                      <h3 className="font-semibold text-[#1D1D1F] text-sm border-b border-black/[0.06] pb-3">
                        Model & Commercial Identity
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="sm:col-span-2">
                          <label className="mb-1 block font-medium text-[#1D1D1F]">
                            Equipment Model / Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={editingProduct.name}
                            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                            placeholder="e.g. 250x400 Jaw Crusher or Cat 320D Excavator"
                            className="h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block font-medium text-[#1D1D1F]">
                            Division
                          </label>
                          <select
                            value={editingProduct.category}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                category: e.target.value as ExtendedEquipment["category"],
                              })
                            }
                            className="h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
                          >
                            <option value="mining">Mining Equipment</option>
                            <option value="hire">Construction Machinery Hire</option>
                            <option value="hardware">Hardware & Construction</option>
                            <option value="farming">Farming Machinery</option>
                            <option value="industry">Industry & Manufacturing</option>
                          </select>
                        </div>

                        <div>
                          <label className="mb-1 block font-medium text-[#1D1D1F]">
                            Commercial Deal Type
                          </label>
                          <select
                            value={editingProduct.intent}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                intent: e.target.value as ExtendedEquipment["intent"],
                              })
                            }
                            className="h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
                          >
                            <option value="sale">Outright Sale</option>
                            <option value="hire">Plant Hire / Rental</option>
                          </select>
                        </div>

                        <div>
                          <label className="mb-1 block font-medium text-[#1D1D1F]">
                            Indicative Rate / Price USD
                          </label>
                          <input
                            type="text"
                            value={editingProduct.priceUSD || editingProduct.price || ""}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                priceUSD: e.target.value,
                                price: e.target.value,
                              })
                            }
                            placeholder="e.g. $4,800 USD or $180/hr dry"
                            className="h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block font-medium text-[#1D1D1F]">
                            Price Note / Terms
                          </label>
                          <input
                            type="text"
                            value={editingProduct.priceNote || ""}
                            onChange={(e) => setEditingProduct({ ...editingProduct, priceNote: e.target.value })}
                            placeholder="e.g. FOB Cranborne Yard or Wet / Dry Options"
                            className="h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block font-medium text-[#1D1D1F]">
                            Cranborne Yard Stock Status
                          </label>
                          <select
                            value={editingProduct.stockStatus || "In Yard Cranborne"}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                stockStatus: e.target.value as ExtendedEquipment["stockStatus"],
                              })
                            }
                            className="h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none font-medium"
                          >
                            <option value="In Yard Cranborne">In Yard Cranborne</option>
                            <option value="In Transit (Beitbridge)">In Transit (Beitbridge)</option>
                            <option value="Active on Site">Active on Site</option>
                            <option value="Special Order">Special Order</option>
                          </select>
                        </div>

                        <div>
                          <label className="mb-1 block font-medium text-[#1D1D1F]">
                            SKU / Model Identifier
                          </label>
                          <input
                            type="text"
                            value={editingProduct.sku || editingProduct.id}
                            onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                            placeholder="e.g. OMNI-MIN-402"
                            className="h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Card 3: Technical Specifications & Power Drive */}
                    <div className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.03)] space-y-4">
                      <h3 className="font-semibold text-[#1D1D1F] text-sm border-b border-black/[0.06] pb-3">
                        Technical Specifications & Power Engineering
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="mb-1 block font-medium text-[#1D1D1F]">
                            Hourly Throughput / Operating Capacity
                          </label>
                          <input
                            type="text"
                            value={editingProduct.throughput || ""}
                            onChange={(e) => setEditingProduct({ ...editingProduct, throughput: e.target.value })}
                            placeholder="e.g. 5–8 Tonnes / Hour or 37m Boom Reach"
                            className="h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block font-medium text-[#1D1D1F]">
                            Power Drive / Motor Configuration
                          </label>
                          <input
                            type="text"
                            value={editingProduct.powerOption || ""}
                            onChange={(e) => setEditingProduct({ ...editingProduct, powerOption: e.target.value })}
                            placeholder="e.g. 15kW 3-Phase Electric or 22HP Diesel Kit"
                            className="h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="mb-1 block font-medium text-[#1D1D1F]">
                            Quick Specification Tagline
                          </label>
                          <input
                            type="text"
                            value={editingProduct.spec || ""}
                            onChange={(e) => setEditingProduct({ ...editingProduct, spec: e.target.value })}
                            placeholder="e.g. Primary crush · gold & chrome circuits"
                            className="h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block font-medium text-[#1D1D1F]">
                            Equipment Condition
                          </label>
                          <select
                            value={editingProduct.condition || "New"}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                condition: e.target.value as ExtendedEquipment["condition"],
                              })
                            }
                            className="h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
                          >
                            <option value="New">Brand New (Factory Direct)</option>
                            <option value="Refurbished / Certified">Refurbished / Harare Certified</option>
                          </select>
                        </div>

                        <div>
                          <label className="mb-1 block font-medium text-[#1D1D1F]">
                            Warranty Period (Months)
                          </label>
                          <input
                            type="number"
                            min={0}
                            max={60}
                            value={editingProduct.warrantyMonths ?? 12}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                warrantyMonths: Number(e.target.value) || 0,
                              })
                            }
                            className="h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="mb-1 block font-medium text-[#1D1D1F]">
                            Catalogue Badge / Highlight Tag
                          </label>
                          <input
                            type="text"
                            value={editingProduct.badge || ""}
                            onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                            placeholder="e.g. Processing, In Stock, Immediate Delivery, Heavy Fleet"
                            className="h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Card 4: Detailed Overviews & Field Application Notes */}
                    <div className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.03)] space-y-4">
                      <h3 className="font-semibold text-[#1D1D1F] text-sm border-b border-black/[0.06] pb-3">
                        Catalogue Copy & Field Engineering Notes
                      </h3>

                      <div className="space-y-3 text-xs">
                        <div>
                          <label className="mb-1 block font-medium text-[#1D1D1F]">
                            Catalogue Overview & Application Summary *
                          </label>
                          <textarea
                            rows={3}
                            required
                            value={editingProduct.blurb}
                            onChange={(e) => setEditingProduct({ ...editingProduct, blurb: e.target.value })}
                            placeholder="Clear, punchy operational overview for miners, farmers, or contractors."
                            className="w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] p-3 leading-relaxed text-[#1D1D1F] focus:bg-white focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="mb-1 block font-medium text-[#1D1D1F]">
                            Detailed Technical Notes & Commissioning Details
                          </label>
                          <textarea
                            rows={4}
                            value={editingProduct.detailedNotes || ""}
                            onChange={(e) => setEditingProduct({ ...editingProduct, detailedNotes: e.target.value })}
                            placeholder="Liner manganese rating, discharge mesh settings, electrical starter box type, recommended generator kVA, and field commissioning protocol."
                            className="w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] p-3 leading-relaxed text-[#1D1D1F] focus:bg-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.06] pt-4">
                        <button
                          type="button"
                          onClick={closeProductProfile}
                          className="inline-flex h-11 items-center rounded-full border border-black/[0.08] bg-[#F5F5F7] px-5 text-xs font-medium text-[#1D1D1F] hover:bg-black/[0.06] transition-colors"
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          className="inline-flex h-11 items-center gap-2 rounded-full bg-[#1D1D1F] px-6 text-xs font-semibold text-white hover:bg-black transition-all active:scale-95 shadow-xs"
                        >
                          <Check className="size-4" />
                          <span>Save Specifications</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Actions & Live Tools Column */}
                  <div className="space-y-5 lg:col-span-4">
                    {/* Live WhatsApp Spec Card Generator */}
                    <div className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.03)] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#86868B]">
                          Client WhatsApp Quotation
                        </span>
                        <span className="rounded-full bg-[#E8F8EE] px-2 py-0.5 text-[9px] font-bold text-[#1B833E]">
                          Live Spec Card
                        </span>
                      </div>
                      <p className="text-xs text-[#6E6E73] leading-relaxed">
                        Share these verified machinery specs and photo directly with clients inquiring on WhatsApp.
                      </p>

                      <div className="rounded-xl border border-black/[0.06] bg-[#F9F9FA] p-3 text-[11px] space-y-2 font-mono text-[#1D1D1F]">
                        {/* Machine Visual Thumbnail */}
                        <div className="relative h-36 w-full rounded-lg overflow-hidden bg-black/[0.05] border border-black/[0.05]">
                          <img
                            src={editingProduct.image || "/images/jaw-crusher.jpg"}
                            alt={editingProduct.name}
                            className="size-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/images/hero.jpg";
                            }}
                          />
                          <span className="absolute top-1.5 left-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[9px] font-medium text-white backdrop-blur-xs font-sans capitalize">
                            {editingProduct.category}
                          </span>
                        </div>

                        <div>
                          <p className="font-semibold text-xs font-sans text-[#1D1D1F]">{editingProduct.name}</p>
                          <p className="text-[#6E6E73] text-[10px]">SKU: {editingProduct.sku || editingProduct.id}</p>
                        </div>
                        <div className="border-t border-black/[0.06] pt-1.5 space-y-1 text-[11px]">
                          <div>• <span className="text-[#86868B]">Throughput:</span> {editingProduct.throughput || editingProduct.spec || "Site Rated"}</div>
                          <div>• <span className="text-[#86868B]">Drive:</span> {editingProduct.powerOption || "Electric / Diesel"}</div>
                          <div>• <span className="text-[#86868B]">Yard:</span> {editingProduct.stockStatus || "In Yard Cranborne"}</div>
                          <div>• <span className="text-[#86868B]">Rate:</span> {editingProduct.priceUSD || editingProduct.price || "Tender on Request"}</div>
                        </div>
                      </div>

                      <a
                        href={whatsappUrl(
                          `Hello from Omnicore Solutions Harare. Regarding ${editingProduct.name} (${editingProduct.sku || editingProduct.id}):\n• Capacity: ${editingProduct.throughput || editingProduct.spec || "Site Rated"}\n• Power: ${editingProduct.powerOption || "Electric 3-Phase / Diesel"}\n• Availability: ${editingProduct.stockStatus || "In Yard Cranborne"}\n• Rate: ${editingProduct.priceUSD || editingProduct.price || "Tender on Request"}\n\nInspections welcome at 115 Chiremba Rd, Cranborne, Harare.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#1fa855] text-xs font-semibold text-white shadow-xs hover:bg-[#1b934b] transition-all"
                      >
                        <WhatsAppIcon className="size-4" />
                        <span>Send Client Spec Sheet</span>
                      </a>
                    </div>

                    {/* Yard & Availability Management */}
                    <div className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.03)] space-y-3">
                      <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#86868B]">
                        Yard Management & Quick Actions
                      </span>

                      <button
                        type="button"
                        onClick={() => handleToggleStockStatus(editingProduct.id)}
                        className="inline-flex h-10 w-full items-center justify-between rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3.5 text-xs font-medium text-[#1D1D1F] hover:bg-black/[0.06] transition-colors"
                      >
                        <span>Rotate Stock Status</span>
                        <span className="rounded-md bg-white px-2 py-0.5 text-[10px] font-semibold text-[#1D1D1F] shadow-2xs border border-black/[0.04]">
                          {editingProduct.stockStatus || "In Yard Cranborne"}
                        </span>
                      </button>

                      <div className="flex flex-col gap-2 pt-1 text-xs">
                        <Link
                          to="/catalogue"
                          className="inline-flex h-10 items-center justify-between rounded-xl border border-black/[0.08] bg-white px-3.5 font-medium text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
                        >
                          <span>Open Public Catalogue</span>
                          <ExternalLink className="size-3.5 text-[#86868B]" />
                        </Link>

                        <Link
                          to="/services/$slug"
                          params={{ slug: editingProduct.category }}
                          className="inline-flex h-10 items-center justify-between rounded-xl border border-black/[0.08] bg-white px-3.5 font-medium text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
                        >
                          <span className="capitalize">View {editingProduct.category} Division</span>
                          <ExternalLink className="size-3.5 text-[#86868B]" />
                        </Link>
                      </div>
                    </div>

                    {/* Recycle */}
                    <div className="rounded-2xl border border-red-200 bg-red-50/40 p-5 shadow-xs space-y-3">
                      <span className="block text-[10px] font-semibold uppercase tracking-wider text-red-700">
                        Catalogue Decommissioning
                      </span>
                      <p className="text-xs text-red-600/90 leading-relaxed">
                        Move this machinery listing to the recycle bin. It will disappear from Cranborne inventory and the public catalogue until restored.
                      </p>
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(editingProduct.id)}
                        className="inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-full border border-red-200 bg-white text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="size-3.5" />
                        <span>Move to Recycle Bin</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-[#1D1D1F]">
                  Machinery & Catalogue Inventory
                </h2>
                <p className="text-xs text-[#86868B] mt-0.5">
                  Manage technical specifications, throughput, power drives, and stock status across Cranborne yard.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-[#86868B]" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Search model, throughput, SKU..."
                    className="h-9 w-48 sm:w-64 rounded-full border border-black/[0.08] bg-white pl-9 pr-3 text-xs text-[#1D1D1F] placeholder-[#86868B] shadow-2xs focus:outline-none"
                  />
                </div>

                <select
                  value={productCategoryFilter}
                  onChange={(e) => setProductCategoryFilter(e.target.value)}
                  className="h-9 rounded-full border border-black/[0.08] bg-white px-3 text-xs text-[#1D1D1F] shadow-2xs focus:outline-none"
                >
                  <option value="all">All Divisions</option>
                  <option value="mining">Mining</option>
                  <option value="hire">Hire Plant</option>
                  <option value="hardware">Hardware & Fence</option>
                  <option value="farming">Farming</option>
                  <option value="industry">Industrial</option>
                </select>

                <button
                  onClick={() => setShowAddProductModal(true)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#1D1D1F] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-black transition-all active:scale-95"
                >
                  <Plus className="size-3.5" />
                  <span>Add Machine</span>
                </button>
                <button
                  onClick={() => setActiveTab("recycle")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-3 py-2 text-xs font-medium text-[#1D1D1F] shadow-2xs hover:bg-[#F5F5F7]"
                  title="Open recycle bin"
                >
                  <Recycle className="size-3.5 text-[#6E6E73]" />
                  <span className="hidden sm:inline">Bin</span>
                  {recycleBin.filter((i) => i.kind === "product").length > 0 && (
                    <span className="rounded-full bg-black/[0.06] px-1.5 text-[10px] font-semibold">
                      {recycleBin.filter((i) => i.kind === "product").length}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {selectedProductIds.length > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#1D1D1F]/10 bg-[#1D1D1F] px-4 py-2.5 text-white shadow-xs">
                <span className="text-xs font-semibold">
                  {selectedProductIds.length} machine{selectedProductIds.length === 1 ? "" : "s"} selected
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedProductIds([])}
                    className="rounded-full px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/10"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => setPendingAction({ type: "delete-products", ids: selectedProductIds })}
                    className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-red-400"
                  >
                    <Trash2 className="size-3.5" />
                    Move to recycle bin
                  </button>
                </div>
              </div>
            )}

            {/* Clean Products Table */}
            <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.03)]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-black/[0.06] bg-[#FBFBFC] text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">
                      <th className="w-10 py-3 pl-4 pr-1">
                        <RowCheck
                          label="Select all machines on this page"
                          checked={
                            paginatedProducts.length > 0 &&
                            paginatedProducts.every((p) => selectedProductIds.includes(p.id))
                          }
                          indeterminate={
                            paginatedProducts.some((p) => selectedProductIds.includes(p.id)) &&
                            !paginatedProducts.every((p) => selectedProductIds.includes(p.id))
                          }
                          onChange={(next) => {
                            const pageIds = paginatedProducts.map((p) => p.id);
                            setSelectedProductIds((prev) =>
                              next
                                ? [...new Set([...prev, ...pageIds])]
                                : prev.filter((id) => !pageIds.includes(id)),
                            );
                          }}
                        />
                      </th>
                      <th className="py-3 px-4">SKU / Equipment Name</th>
                      <th className="py-3 px-3">Division</th>
                      <th className="py-3 px-3">Throughput & Drive</th>
                      <th className="py-3 px-3">Yard Stock Status</th>
                      <th className="py-3 px-3">Indicative Rate</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.04]">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-[#86868B]">
                          No machinery records match the current filter.
                        </td>
                      </tr>
                    ) : (
                      paginatedProducts.map((item) => (
                        <tr
                          key={item.id}
                          onClick={() => setPeekProductId(item.id)}
                          className={`cursor-pointer transition-colors ${
                            selectedProductIds.includes(item.id)
                              ? "bg-[#F3F8FF]"
                              : peekProductId === item.id
                                ? "bg-[#F5F5F7]"
                                : "hover:bg-black/[0.015]"
                          }`}
                        >
                          <td
                            className="w-10 py-3 pl-4 pr-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <RowCheck
                              label={`Select ${item.name}`}
                              checked={selectedProductIds.includes(item.id)}
                              onChange={(next) =>
                                setSelectedProductIds((prev) =>
                                  next ? [...prev, item.id] : prev.filter((id) => id !== item.id),
                                )
                              }
                            />
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="size-11 rounded-xl overflow-hidden bg-black/[0.04] border border-black/[0.06] shrink-0 shadow-2xs">
                                <img
                                  src={item.image || "/images/hero.jpg"}
                                  alt={item.name}
                                  className="size-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/images/hero.jpg";
                                  }}
                                />
                              </div>
                              <div>
                                <span className="font-semibold text-[#1D1D1F] block">{item.name}</span>
                                <span className="text-[10px] font-mono text-[#86868B]">{item.sku || item.id}</span>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-3">
                            <span className="rounded-full bg-black/[0.04] px-2 py-0.5 text-[10px] font-medium text-[#6E6E73] uppercase tracking-wide">
                              {item.category}
                            </span>
                          </td>

                          <td className="py-3 px-3 text-[#6E6E73]">
                            <span className="text-[#1D1D1F] font-medium block">
                              {item.throughput || item.spec}
                            </span>
                            <span className="text-[10px] text-[#86868B] block truncate max-w-[200px]">
                              {item.powerOption || "Electric 380V / Diesel"}
                            </span>
                          </td>

                          <td className="py-3 px-3" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => handleToggleStockStatus(item.id)}
                              className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium transition-all ${
                                item.stockStatus === "In Yard Cranborne"
                                  ? "bg-[#E8F8EE] text-[#1B833E]"
                                  : item.stockStatus === "In Transit (Beitbridge)"
                                  ? "bg-[#FFF4E5] text-[#B25E00]"
                                  : "bg-black/[0.04] text-[#6E6E73]"
                              }`}
                            >
                              {item.stockStatus || "In Yard Cranborne"}
                            </button>
                          </td>

                          <td className="py-3 px-3 font-semibold text-[#1D1D1F]">
                            {item.priceUSD || item.price || "Tender on Req"}
                          </td>

                          <td className="py-3 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => openProductProfile(item)}
                                className="inline-flex h-11 items-center gap-1 rounded-full border border-black/[0.08] bg-white px-3 text-xs font-medium text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all"
                              >
                                <Edit3 className="size-3 text-[#6E6E73]" />
                                <span>Edit Specs</span>
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setPendingAction({ type: "delete-products", ids: [item.id] })
                                }
                                className="inline-flex size-11 items-center justify-center rounded-full border border-red-200 bg-white text-red-600 hover:bg-red-50"
                                title="Move to recycle bin"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Product Pagination Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-black/[0.06] bg-[#FBFBFC] px-4 py-3 text-xs text-[#6E6E73]">
                <div className="flex flex-wrap items-center gap-2">
                  <span>Showing</span>
                  <span className="font-semibold text-[#1D1D1F]">
                    {filteredProducts.length === 0 ? 0 : (productPage - 1) * productPageSize + 1}
                  </span>
                  <span>to</span>
                  <span className="font-semibold text-[#1D1D1F]">
                    {Math.min(productPage * productPageSize, filteredProducts.length)}
                  </span>
                  <span>of</span>
                  <span className="font-semibold text-[#1D1D1F]">{filteredProducts.length}</span>
                  <span>machinery models</span>

                  <span className="mx-1 text-black/20">|</span>

                  <div className="flex items-center gap-1.5">
                    <span>Per page:</span>
                    <select
                      value={productPageSize}
                      onChange={(e) => {
                        setProductPageSize(Number(e.target.value));
                        setProductPage(1);
                      }}
                      className="rounded-lg border border-black/[0.08] bg-white px-2 py-0.5 text-xs text-[#1D1D1F] focus:outline-none"
                    >
                      <option value={6}>6</option>
                      <option value={12}>12</option>
                      <option value={24}>24</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-1 self-end sm:self-auto">
                  <button
                    onClick={() => setProductPage(1)}
                    disabled={productPage <= 1}
                    className="rounded-lg p-1 text-[#6E6E73] hover:bg-black/[0.05] hover:text-[#1D1D1F] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    title="First page"
                  >
                    <ChevronsLeft className="size-4" />
                  </button>
                  <button
                    onClick={() => setProductPage((p) => Math.max(1, p - 1))}
                    disabled={productPage <= 1}
                    className="rounded-lg p-1 text-[#6E6E73] hover:bg-black/[0.05] hover:text-[#1D1D1F] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    title="Previous page"
                  >
                    <ChevronLeft className="size-4" />
                  </button>

                  <div className="flex items-center gap-1 px-1">
                    {Array.from({ length: productTotalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setProductPage(pageNum)}
                        className={`min-w-6 h-6 rounded-md px-1.5 text-xs font-medium transition-all ${
                          productPage === pageNum
                            ? "bg-[#1D1D1F] text-white font-semibold shadow-xs"
                            : "text-[#6E6E73] hover:bg-black/[0.05] hover:text-[#1D1D1F]"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setProductPage((p) => Math.min(productTotalPages, p + 1))}
                    disabled={productPage >= productTotalPages}
                    className="rounded-lg p-1 text-[#6E6E73] hover:bg-black/[0.05] hover:text-[#1D1D1F] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    title="Next page"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                  <button
                    onClick={() => setProductPage(productTotalPages)}
                    disabled={productPage >= productTotalPages}
                    className="rounded-lg p-1 text-[#6E6E73] hover:bg-black/[0.05] hover:text-[#1D1D1F] disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    title="Last page"
                  >
                    <ChevronsRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>

              </>
            )}

            {peekProduct && !productProfileOpen && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
                onClick={() => setPeekProductId(null)}
              >
                <div
                  className="w-full max-w-md rounded-2xl border border-black/[0.08] bg-white p-5 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="size-16 shrink-0 overflow-hidden rounded-xl border border-black/[0.06] bg-black/[0.04]">
                        <img
                          src={peekProduct.image || "/images/hero.jpg"}
                          alt={peekProduct.name}
                          className="size-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/hero.jpg";
                          }}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-mono text-[11px] text-[#86868B]">{peekProduct.sku || peekProduct.id}</p>
                        <h3 className="text-base font-semibold text-[#1D1D1F]">{peekProduct.name}</h3>
                        <p className="text-xs uppercase tracking-wide text-[#6E6E73]">{peekProduct.category}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPeekProductId(null)}
                      className="rounded-full p-2 text-[#86868B] hover:bg-[#F5F5F7] hover:text-[#1D1D1F]"
                    >
                      <X className="size-4" />
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div className="rounded-xl bg-[#F5F5F7] p-2.5">
                      <span className="block text-[10px] uppercase text-[#86868B]">Stock</span>
                      <span className="font-semibold text-[#1D1D1F]">{peekProduct.stockStatus || "In Yard Cranborne"}</span>
                    </div>
                    <div className="rounded-xl bg-[#F5F5F7] p-2.5">
                      <span className="block text-[10px] uppercase text-[#86868B]">Rate</span>
                      <span className="font-semibold text-[#1D1D1F]">{peekProduct.priceUSD || peekProduct.price || "Tender on Req"}</span>
                    </div>
                    <div className="col-span-2 rounded-xl bg-[#F5F5F7] p-2.5">
                      <span className="block text-[10px] uppercase text-[#86868B]">Throughput / drive</span>
                      <span className="font-medium text-[#1D1D1F]">
                        {peekProduct.throughput || peekProduct.spec} · {peekProduct.powerOption || "Electric / Diesel"}
                      </span>
                    </div>
                    <div className="col-span-2 rounded-xl bg-[#F5F5F7] p-2.5">
                      <span className="block text-[10px] uppercase text-[#86868B]">Overview</span>
                      <span className="text-[#1D1D1F]">{peekProduct.blurb}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() => openProductProfile(peekProduct)}
                      className="inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full bg-[#1D1D1F] text-xs font-semibold text-white hover:bg-black"
                    >
                      <Edit3 className="size-3.5" />
                      Edit specifications
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setPendingAction({ type: "delete-products", ids: [peekProduct.id] })
                      }
                      className="inline-flex h-11 items-center justify-center rounded-full border border-red-200 px-4 text-red-600 hover:bg-red-50"
                      title="Move to recycle bin"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

                        {/* Modal: Add New Equipment */}
            {showAddProductModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150">
                <div className="w-full max-w-xl rounded-2xl border border-black/[0.08] bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
                    <h3 className="text-sm font-semibold text-[#1D1D1F]">
                      Add Machinery to Cranborne Catalogue
                    </h3>
                    <button
                      onClick={() => setShowAddProductModal(false)}
                      className="rounded-full p-1 text-[#86868B] hover:bg-[#F5F5F7]"
                    >
                      <X className="size-4" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateProduct} className="mt-4 space-y-3.5 text-xs">
                    {/* Equipment Photo & Live Preview in Add Modal */}
                    <div className="rounded-xl border border-black/[0.08] bg-[#FBFBFC] p-3.5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-[#1D1D1F] block text-xs">
                            Equipment Photo & Live Preview
                          </span>
                          <span className="text-[11px] text-[#86868B]">
                            Upload a photo from your device or select from Harare yard photo library.
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 items-start">
                        {/* Live Photo Preview */}
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => {
                            setProductLightbox({
                              isOpen: true,
                              title: newProdName || "New Machinery Visual Preview",
                              category: newProdCategory,
                              price: newProdPrice,
                              images: [newProdImage || "/images/jaw-crusher.jpg", ...newProdGallery].filter(Boolean),
                              initialIndex: 0,
                            });
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setProductLightbox({
                                isOpen: true,
                                title: newProdName || "New Machinery Visual Preview",
                                category: newProdCategory,
                                price: newProdPrice,
                                images: [newProdImage || "/images/jaw-crusher.jpg", ...newProdGallery].filter(Boolean),
                                initialIndex: 0,
                              });
                            }
                          }}
                          className="relative size-28 sm:size-32 rounded-xl overflow-hidden bg-black/[0.05] border border-black/[0.08] shrink-0 shadow-xs group cursor-pointer"
                          title="Click to preview photo in large screen"
                        >
                          <img
                            src={newProdImage || "/images/jaw-crusher.jpg"}
                            alt="Preview"
                            className="size-full object-cover object-center group-hover:scale-105 transition-transform"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/images/hero.jpg";
                            }}
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-1">
                            <span className="flex items-center gap-1 text-[9px] text-white font-medium bg-black/70 px-2 py-0.5 rounded-full">
                              <ZoomIn className="size-2.5" />
                              <span>View Large</span>
                            </span>
                            <label
                              onClick={(e) => e.stopPropagation()}
                              className="cursor-pointer text-white text-[9px] font-semibold bg-white/20 hover:bg-white hover:text-black px-2 py-0.5 rounded-md transition-colors"
                            >
                              Change
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, false)}
                                className="hidden"
                              />
                            </label>
                          </div>
                          <span className="absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-medium text-white backdrop-blur-xs">
                            Live Preview
                          </span>
                        </div>

                        {/* Upload & Presets */}
                        <div className="flex-1 space-y-3 w-full">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <label className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.1] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#1D1D1F] shadow-2xs hover:bg-[#F5F5F7] cursor-pointer transition-all active:scale-95">
                              <Upload className="size-3.5 text-[#1D1D1F]" />
                              <span>Upload Machine Image</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, false)}
                                className="hidden"
                              />
                            </label>

                            {/* Instant Preset Search */}
                            <div className="relative min-w-[180px]">
                              <Search className="absolute left-2.5 top-2 size-3 text-[#86868B]" />
                              <input
                                type="text"
                                value={newPhotoPresetSearch}
                                onChange={(e) => setNewPhotoPresetSearch(e.target.value)}
                                placeholder="Search presets..."
                                className="w-full h-7 rounded-full border border-black/[0.08] bg-[#F5F5F7] pl-7 pr-2.5 text-[11px] text-[#1D1D1F] focus:bg-white focus:outline-none"
                              />
                              {newPhotoPresetSearch && (
                                <button
                                  type="button"
                                  onClick={() => setNewPhotoPresetSearch("")}
                                  className="absolute right-2 top-2 text-[#86868B] hover:text-[#1D1D1F]"
                                >
                                  <X className="size-3" />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Category Filter Pills for Add Modal */}
                          <div className="flex flex-wrap items-center gap-1">
                            {[
                              { id: "all", label: "All Fleet" },
                              { id: "mining", label: "Mining" },
                              { id: "hire", label: "Hire" },
                              { id: "farming", label: "Farming" },
                              { id: "hardware", label: "Hardware" },
                              { id: "industry", label: "Industry" },
                            ].map((f) => (
                              <button
                                key={f.id}
                                type="button"
                                onClick={() => setNewPresetCategoryFilter(f.id)}
                                className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${
                                  newPresetCategoryFilter === f.id
                                    ? "bg-[#1D1D1F] text-white font-semibold shadow-2xs"
                                    : "bg-black/[0.04] text-[#6E6E73] hover:text-[#1D1D1F]"
                                }`}
                              >
                                {f.label}
                              </button>
                            ))}
                          </div>

                          {/* Roomy Grid of Verified Preset Photo Cards */}
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto p-2 rounded-xl bg-[#F9F9FA] border border-black/[0.06]">
                            {YARD_PHOTO_PRESETS.filter((p) => {
                              const matchesCat = newPresetCategoryFilter === "all" || p.category === newPresetCategoryFilter;
                              const matchesSearch =
                                !newPhotoPresetSearch ||
                                p.label.toLowerCase().includes(newPhotoPresetSearch.toLowerCase()) ||
                                p.spec.toLowerCase().includes(newPhotoPresetSearch.toLowerCase());
                              return matchesCat && matchesSearch;
                            }).map((preset) => {
                              const isSelected = newProdImage === preset.src;
                              return (
                                <button
                                  type="button"
                                  key={preset.src}
                                  onClick={() => setNewProdImage(preset.src)}
                                  className={`group relative flex flex-col text-left rounded-xl p-2 border transition-all ${
                                    isSelected
                                      ? "border-[#1D1D1F] bg-white ring-2 ring-[#1D1D1F] shadow-xs"
                                      : "border-black/[0.08] bg-white hover:border-black/[0.2]"
                                  }`}
                                >
                                  <div className="relative h-20 w-full rounded-lg overflow-hidden bg-black/[0.04] mb-1.5">
                                    <img
                                      src={preset.src}
                                      alt={preset.label}
                                      className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = "/images/hero.jpg";
                                      }}
                                    />
                                    <span className="absolute top-1 left-1 rounded bg-black/70 px-1.5 py-0.5 text-[8px] font-semibold text-white uppercase tracking-wider backdrop-blur-xs">
                                      {preset.category}
                                    </span>
                                    {isSelected && (
                                      <div className="absolute top-1 right-1 size-5 rounded-full bg-[#1FA855] text-white flex items-center justify-center shadow-xs">
                                        <Check className="size-3 stroke-[2.5]" />
                                      </div>
                                    )}
                                  </div>

                                  <div className="min-w-0">
                                    <p className="text-[11px] font-semibold text-[#1D1D1F] truncate group-hover:text-black">
                                      {preset.label}
                                    </p>
                                    <p className="text-[10px] text-[#6E6E73] truncate">
                                      {preset.spec}
                                    </p>
                                  </div>
                                </button>
                              );
                            })}
                          </div>

                          <div className="flex items-center gap-2 pt-1">
                            <span className="text-[11px] font-medium text-[#1D1D1F] shrink-0">Custom URL / Path:</span>
                            <input
                              type="text"
                              value={newProdImage}
                              onChange={(e) => setNewProdImage(e.target.value)}
                              placeholder="/images/... or https://..."
                              className="w-full h-8 rounded-xl border border-black/[0.08] bg-white px-3 text-xs text-[#1D1D1F] focus:outline-none font-mono text-[11px]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-medium text-[#1D1D1F] block mb-1">Equipment Model / Name *</label>
                        <input
                          type="text"
                          required
                          value={newProdName}
                          onChange={(e) => setNewProdName(e.target.value)}
                          placeholder="e.g. 250x400 Jaw Crusher or Cat 320D"
                          className="w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 focus:bg-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="font-medium text-[#1D1D1F] block mb-1">Division</label>
                        <select
                          value={newProdCategory}
                          onChange={(e) =>
                            setNewProdCategory(e.target.value as ExtendedEquipment["category"])
                          }
                          className="w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 focus:bg-white focus:outline-none"
                        >
                          <option value="mining">Mining Equipment</option>
                          <option value="hire">Construction Machinery Hire</option>
                          <option value="hardware">Hardware & Construction</option>
                          <option value="farming">Farming Machinery</option>
                          <option value="industry">Industry & Manufacturing</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="font-medium text-[#1D1D1F] block mb-1">Hourly Throughput</label>
                        <input
                          type="text"
                          value={newProdThroughput}
                          onChange={(e) => setNewProdThroughput(e.target.value)}
                          placeholder="e.g. 5–15 TPH or 35m boom"
                          className="w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 focus:bg-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="font-medium text-[#1D1D1F] block mb-1">Power / Motor Drive</label>
                        <input
                          type="text"
                          value={newProdPower}
                          onChange={(e) => setNewProdPower(e.target.value)}
                          placeholder="e.g. 15kW 380V or 35HP diesel"
                          className="w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 focus:bg-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="font-medium text-[#1D1D1F] block mb-1">Indicative Price / Rate</label>
                        <input
                          type="text"
                          value={newProdPrice}
                          onChange={(e) => setNewProdPrice(e.target.value)}
                          placeholder="e.g. $18,500 FOB Harare"
                          className="w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-medium text-[#1D1D1F] block mb-1">Technical Overview / Tagline</label>
                      <input
                        type="text"
                        value={newProdBlurb}
                        onChange={(e) => setNewProdBlurb(e.target.value)}
                        placeholder="Primary crushing for gold ore circuits. Heavy cast-steel eccentric shaft."
                        className="w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2 border-t border-black/[0.06]">
                      <button
                        type="button"
                        onClick={() => setShowAddProductModal(false)}
                        className="rounded-full bg-[#F5F5F7] px-4 py-1.5 text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-full bg-[#1D1D1F] px-4 py-1.5 text-xs font-semibold text-white hover:bg-black"
                      >
                        Add to Inventory
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: SITE COPY & CMS WRITER */}
        {/* ========================================================================= */}
        {activeTab === "cms" && (
          <div className="w-full space-y-6">
            {/* Top Control Bar with Quick Actions */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 rounded-3xl bg-white p-5 sm:p-6 border border-black/[0.06] shadow-xs">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-black/[0.05] text-[#1D1D1F]">
                    <Sparkles className="size-4 text-amber-500" />
                  </div>
                  <h2 className="text-xl font-semibold tracking-tight text-[#1D1D1F]">
                    Website Copy, Brand & Content Management
                  </h2>
                </div>
                <p className="text-xs text-[#86868B] mt-1 max-w-2xl">
                  Manage live headlines, Harare yard details, official contact channels, operating hours, and divisional messaging across Omnicore Solutions. Changes update in real-time nationwide.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <div className="relative min-w-[200px] sm:min-w-[240px]">
                  <Search className="absolute left-3 top-2.5 size-3.5 text-[#86868B]" />
                  <input
                    type="text"
                    placeholder="Search any copy or field..."
                    value={cmsSearch}
                    onChange={(e) => setCmsSearch(e.target.value)}
                    className="w-full h-8.5 rounded-full border border-black/[0.08] bg-[#F5F5F7] pl-8.5 pr-3 text-xs focus:bg-white focus:outline-none transition-colors"
                  />
                  {cmsSearch && (
                    <button
                      type="button"
                      onClick={() => setCmsSearch("")}
                      className="absolute right-2.5 top-2.5 text-[#86868B] hover:text-[#1D1D1F]"
                    >
                      <X className="size-3.5" />
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleResetSiteCopy}
                  className="inline-flex h-8.5 items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-3.5 text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all active:scale-95"
                >
                  <RotateCcw className="size-3.5 text-[#86868B]" />
                  <span>Reset Defaults</span>
                </button>

                {/* View Layout Mode Switcher (Full Real Estate vs Split Studio vs Toggle Preview) */}
                <div className="inline-flex rounded-full bg-[#F5F5F7] p-0.5 border border-black/[0.08] text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setCmsLayoutMode("split");
                      setIsCmsPreviewOpen(!isCmsPreviewOpen);
                    }}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all ${
                      isCmsPreviewOpen && cmsLayoutMode === "split"
                        ? "bg-white text-[#1D1D1F] shadow-2xs font-semibold"
                        : "text-[#6E6E73] hover:text-[#1D1D1F]"
                    }`}
                    title="Toggle Live Interactive Visual Preview panel"
                  >
                    <Eye className="size-3.5 text-emerald-600" />
                    <span>{isCmsPreviewOpen && cmsLayoutMode === "split" ? "Hide Live Preview" : "Show Live Preview"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCmsLayoutMode("full");
                      setIsCmsPreviewOpen(false);
                    }}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all ${
                      cmsLayoutMode === "full"
                        ? "bg-white text-[#1D1D1F] shadow-2xs font-semibold"
                        : "text-[#6E6E73] hover:text-[#1D1D1F]"
                    }`}
                    title="Expand across 100% of screen real estate with multi-column layouts"
                  >
                    <Maximize2 className="size-3.5" />
                    <span>Full-Width Editor</span>
                  </button>
                </div>

                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-8.5 items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-3.5 text-xs font-medium text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all active:scale-95"
                >
                  <ExternalLink className="size-3.5 text-[#86868B]" />
                  <span>View Public Site</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleSaveSiteCopy()}
                  className={`inline-flex h-8.5 items-center gap-1.5 rounded-full px-5 text-xs font-semibold text-white shadow-xs transition-all active:scale-95 ${
                    hasUnsavedChanges
                      ? "bg-[#1FA855] hover:bg-[#1B934B] animate-pulse"
                      : "bg-[#1D1D1F] hover:bg-black"
                  }`}
                >
                  <Check className="size-3.5" />
                  <span>{hasUnsavedChanges ? "Publish Changes Live *" : "Published Live"}</span>
                </button>
              </div>
            </div>

            {/* Category Navigation Pills */}
            <div className="flex flex-wrap items-center gap-1.5 rounded-2xl bg-white p-2 border border-black/[0.06] shadow-2xs">
              {[
                { id: "hero", label: "🌟 Hero & Brand", count: 12 },
                { id: "yard", label: "📍 Yard, Facility & Delivery", count: 8 },
                { id: "contact", label: "📞 Contact Channels & Hotlines", count: 10 },
                { id: "hours", label: "⏰ Hours, Warranties & Terms", count: 10 },
                { id: "divisions", label: "🚜 Division Copy (5 Sectors)", count: 15 },
                { id: "about", label: "🏢 About & Corporate Pillars", count: 8 },
                { id: "social", label: "⚖️ Social, Legal & Footer", count: 8 },
                { id: "all", label: "📋 All Sections", count: 71 },
              ].map((cat) => {
                const isActive = cmsCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCmsCategory(cat.id as typeof cmsCategory)}
                    className={`inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                      isActive
                        ? "bg-[#1D1D1F] text-white shadow-2xs font-semibold"
                        : "text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] font-semibold ${
                        isActive ? "bg-white/20 text-white" : "bg-black/[0.05] text-[#86868B]"
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Main Content: Full-Width Studio or Split Live Preview */}
            <div className={cmsLayoutMode === "split" && isCmsPreviewOpen ? "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" : "w-full"}>
              {/* Field Editor Column */}
              <div className={cmsLayoutMode === "split" && isCmsPreviewOpen ? "lg:col-span-7 xl:col-span-7 space-y-6" : "w-full space-y-6"}>
                <form onSubmit={handleSaveSiteCopy} className="space-y-6">
                  {/* Category 1: Hero & Brand */}
                  {(cmsCategory === "hero" || cmsCategory === "all" || cmsSearch) && (
                    <div className="rounded-3xl border border-black/[0.06] bg-white p-5 sm:p-7 shadow-xs space-y-5">
                      <div className="flex items-center justify-between pb-3.5 border-b border-black/[0.05]">
                        <div className="flex items-center gap-2.5">
                          <div className="flex size-8 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                            <Sparkles className="size-4.5" />
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-[#1D1D1F]">
                              Hero Banner & Brand Identity Messaging
                            </h3>
                            <p className="text-xs text-[#86868B] mt-0.5">
                              Controls the primary landing headlines, yard announcement banner, call-to-actions, and key stats.
                            </p>
                          </div>
                        </div>
                        <span className="rounded-full bg-amber-100/70 px-3 py-1 text-xs font-semibold text-amber-800">
                          Above The Fold
                        </span>
                      </div>

                      {/* Brand Row: Multi-column */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            Company Legal Name
                          </label>
                          <input
                            type="text"
                            value={cmsForm.name}
                            onChange={(e) => updateCmsField("name", e.target.value)}
                            className="w-full h-9 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none"
                            placeholder="Omnicore Solutions"
                          />
                        </div>
                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            Brand Short Name
                          </label>
                          <input
                            type="text"
                            value={cmsForm.shortName}
                            onChange={(e) => updateCmsField("shortName", e.target.value)}
                            className="w-full h-9 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none"
                            placeholder="Omnicore"
                          />
                        </div>
                        <div className="xl:col-span-2">
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            Company Tagline
                          </label>
                          <input
                            type="text"
                            value={cmsForm.tagline}
                            onChange={(e) => updateCmsField("tagline", e.target.value)}
                            className="w-full h-9 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none"
                            placeholder="Machinery for Zimbabwe's farms, mines and sites."
                          />
                        </div>
                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            Founded Year
                          </label>
                          <input
                            type="text"
                            value={cmsForm.foundedYear}
                            onChange={(e) => updateCmsField("foundedYear", e.target.value)}
                            className="w-full h-9 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none"
                            placeholder="2024"
                          />
                        </div>
                      </div>

                      {/* Announcement & Yard Badge Row */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            Top Yard & Operational Announcement Banner
                          </label>
                          <input
                            type="text"
                            value={cmsForm.heroBannerAnnouncement || ""}
                            onChange={(e) => updateCmsField("heroBannerAnnouncement", e.target.value)}
                            className="w-full h-9 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none"
                            placeholder="Cranborne Yard Open Mon–Sat · Lowbed Deliveries Nationwide"
                          />
                        </div>
                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            Cranborne Yard Badge Text (Top of Hero)
                          </label>
                          <input
                            type="text"
                            value={cmsForm.heroBadge}
                            onChange={(e) => updateCmsField("heroBadge", e.target.value)}
                            className="w-full h-9 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none"
                            placeholder="Cranborne yard · 115 Chiremba Road, Harare"
                          />
                        </div>
                      </div>

                      {/* Headlines Row */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start">
                        <div className="lg:col-span-6 space-y-1">
                          <label className="font-semibold text-[#1D1D1F] text-xs block">
                            Homepage Hero Headline
                          </label>
                          <input
                            type="text"
                            value={cmsForm.heroHeadline}
                            onChange={(e) => updateCmsField("heroHeadline", e.target.value)}
                            className="w-full h-11 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3.5 text-sm font-semibold text-[#1D1D1F] focus:bg-white focus:outline-none"
                            placeholder="Plant for Zimbabwe’s mines, farms and pours."
                          />
                        </div>

                        <div className="lg:col-span-6 space-y-1">
                          <div className="flex items-center justify-between">
                            <label className="font-semibold text-[#1D1D1F] text-xs">
                              Hero Narrative Subheadline
                            </label>
                            <span className="text-[10px] text-[#86868B]">
                              {cmsForm.heroSubheadline.length} chars
                            </span>
                          </div>
                          <textarea
                            rows={3}
                            value={cmsForm.heroSubheadline}
                            onChange={(e) => updateCmsField("heroSubheadline", e.target.value)}
                            className="w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] p-3 text-xs leading-relaxed focus:bg-white focus:outline-none"
                            placeholder="Gold circuits, fence plant, self-loading mixers..."
                          />
                        </div>
                      </div>

                      {/* Action CTA Buttons */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            Primary CTA Button (WhatsApp Direct)
                          </label>
                          <input
                            type="text"
                            value={cmsForm.heroCtaPrimary}
                            onChange={(e) => updateCmsField("heroCtaPrimary", e.target.value)}
                            className="w-full h-9 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none font-medium"
                            placeholder="Chat on WhatsApp"
                          />
                        </div>
                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            Secondary CTA Button (Tender Quote)
                          </label>
                          <input
                            type="text"
                            value={cmsForm.heroCtaSecondary}
                            onChange={(e) => updateCmsField("heroCtaSecondary", e.target.value)}
                            className="w-full h-9 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none font-medium"
                            placeholder="Request a firm quote"
                          />
                        </div>
                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            Tertiary CTA Button (Catalogue Browse)
                          </label>
                          <input
                            type="text"
                            value={cmsForm.heroCtaTertiary}
                            onChange={(e) => updateCmsField("heroCtaTertiary", e.target.value)}
                            className="w-full h-9 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none font-medium"
                            placeholder="Open the catalogue"
                          />
                        </div>
                      </div>

                      {/* 4 Quick Stats Highlights - Full Responsive 4-Column Grid */}
                      <div className="pt-3 border-t border-black/[0.05]">
                        <p className="font-semibold text-[#1D1D1F] text-xs mb-2.5">
                          Homepage 4 Statistics Highlights
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          <div className="rounded-2xl border border-black/[0.06] bg-[#F9F9FA] p-3 space-y-2">
                            <span className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider">Stat 1</span>
                            <div className="space-y-1.5">
                              <input
                                type="text"
                                placeholder="Label (e.g. Harare hub)"
                                value={cmsForm.stat1Label}
                                onChange={(e) => updateCmsField("stat1Label", e.target.value)}
                                className="w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-semibold"
                              />
                              <input
                                type="text"
                                placeholder="Detail (e.g. Cranborne yard)"
                                value={cmsForm.stat1Detail}
                                onChange={(e) => updateCmsField("stat1Detail", e.target.value)}
                                className="w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#6E6E73]"
                              />
                            </div>
                          </div>

                          <div className="rounded-2xl border border-black/[0.06] bg-[#F9F9FA] p-3 space-y-2">
                            <span className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider">Stat 2</span>
                            <div className="space-y-1.5">
                              <input
                                type="text"
                                placeholder="Label (e.g. 1–25 TPH)"
                                value={cmsForm.stat2Label}
                                onChange={(e) => updateCmsField("stat2Label", e.target.value)}
                                className="w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-semibold"
                              />
                              <input
                                type="text"
                                placeholder="Detail (e.g. Gold circuits)"
                                value={cmsForm.stat2Detail}
                                onChange={(e) => updateCmsField("stat2Detail", e.target.value)}
                                className="w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#6E6E73]"
                              />
                            </div>
                          </div>

                          <div className="rounded-2xl border border-black/[0.06] bg-[#F9F9FA] p-3 space-y-2">
                            <span className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider">Stat 3</span>
                            <div className="space-y-1.5">
                              <input
                                type="text"
                                placeholder="Label (e.g. Wet & dry)"
                                value={cmsForm.stat3Label}
                                onChange={(e) => updateCmsField("stat3Label", e.target.value)}
                                className="w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-semibold"
                              />
                              <input
                                type="text"
                                placeholder="Detail (e.g. Plant hire)"
                                value={cmsForm.stat3Detail}
                                onChange={(e) => updateCmsField("stat3Detail", e.target.value)}
                                className="w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#6E6E73]"
                              />
                            </div>
                          </div>

                          <div className="rounded-2xl border border-black/[0.06] bg-[#F9F9FA] p-3 space-y-2">
                            <span className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider">Stat 4</span>
                            <div className="space-y-1.5">
                              <input
                                type="text"
                                placeholder="Label (e.g. 10 provinces)"
                                value={cmsForm.stat4Label}
                                onChange={(e) => updateCmsField("stat4Label", e.target.value)}
                                className="w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-semibold"
                              />
                              <input
                                type="text"
                                placeholder="Detail (e.g. Lowbed delivery)"
                                value={cmsForm.stat4Detail}
                                onChange={(e) => updateCmsField("stat4Detail", e.target.value)}
                                className="w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#6E6E73]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Category 2: Yard Location & Facility */}
                  {(cmsCategory === "yard" || cmsCategory === "all" || cmsSearch) && (
                    <div className="rounded-3xl border border-black/[0.06] bg-white p-5 sm:p-6 shadow-xs space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-black/[0.05]">
                        <div className="flex items-center gap-2">
                          <div className="flex size-7 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                            <MapPin className="size-4" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-[#1D1D1F]">
                              Yard Location & Physical Presence
                            </h3>
                            <p className="text-[11px] text-[#86868B]">
                              Physical demonstration yard, lowbed loading access, and Google Maps pin coordinates.
                            </p>
                          </div>
                        </div>
                        <span className="rounded-full bg-blue-100/60 px-2 py-0.5 text-[10px] font-semibold text-blue-800">
                          Harare Hub
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            Street Address Line 1
                          </label>
                          <input
                            type="text"
                            value={cmsForm.yardAddressLine1}
                            onChange={(e) => updateCmsField("yardAddressLine1", e.target.value)}
                            className="w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none"
                            placeholder="115 Chiremba Road"
                          />
                        </div>
                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            Suburb & Industrial Belt Line 2
                          </label>
                          <input
                            type="text"
                            value={cmsForm.yardAddressLine2}
                            onChange={(e) => updateCmsField("yardAddressLine2", e.target.value)}
                            className="w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none"
                            placeholder="Cranborne, Harare"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            City / Metro
                          </label>
                          <input
                            type="text"
                            value={cmsForm.yardCity}
                            onChange={(e) => updateCmsField("yardCity", e.target.value)}
                            className="w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none"
                            placeholder="Harare"
                          />
                        </div>
                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            Country
                          </label>
                          <input
                            type="text"
                            value={cmsForm.yardCountry}
                            onChange={(e) => updateCmsField("yardCountry", e.target.value)}
                            className="w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none"
                            placeholder="Zimbabwe"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                          Google Maps Pin URL
                        </label>
                        <input
                          type="url"
                          value={cmsForm.googleMapsUrl}
                          onChange={(e) => updateCmsField("googleMapsUrl", e.target.value)}
                          className="w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none font-mono text-[11px]"
                          placeholder="https://www.google.com/maps/search/?api=1&query=..."
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                          Directions & Heavy Machinery Loading Guidance
                        </label>
                        <textarea
                          rows={2}
                          value={cmsForm.yardDirectionsNote}
                          onChange={(e) => updateCmsField("yardDirectionsNote", e.target.value)}
                          className="w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] p-3 text-xs leading-relaxed focus:bg-white focus:outline-none"
                          placeholder="Along Chiremba Road, close to major Harare arterial routes..."
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                          Yard Inspection & Testing Policy
                        </label>
                        <input
                          type="text"
                          value={cmsForm.inspectionNotice}
                          onChange={(e) => updateCmsField("inspectionNotice", e.target.value)}
                          className="w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none"
                          placeholder="Physical yard mechanical inspections welcome Monday–Saturday at 115 Chiremba Rd, Cranborne."
                        />
                      </div>
                    </div>
                  )}

                  {/* Category 3: Contact Channels & WhatsApp */}
                  {(cmsCategory === "contact" || cmsCategory === "all" || cmsSearch) && (
                    <div className="rounded-3xl border border-black/[0.06] bg-white p-5 sm:p-6 shadow-xs space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-black/[0.05]">
                        <div className="flex items-center gap-2">
                          <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                            <Phone className="size-4" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-[#1D1D1F]">
                              Contact Channels, Emergency Hotlines & WhatsApp Desk
                            </h3>
                            <p className="text-[11px] text-[#86868B]">
                              Direct voice lines, 24/7 site breakdown hotlines, WhatsApp numbers, and official email inboxes.
                            </p>
                          </div>
                        </div>
                        <span className="rounded-full bg-emerald-100/60 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                          Direct Lines
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            Primary Phone (Display)
                          </label>
                          <input
                            type="text"
                            value={cmsForm.primaryPhone}
                            onChange={(e) => updateCmsField("primaryPhone", e.target.value)}
                            className="w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none"
                            placeholder="+263 77 733 4569"
                          />
                        </div>
                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            Primary Phone (Dialable URL)
                          </label>
                          <input
                            type="text"
                            value={cmsForm.primaryPhoneTel}
                            onChange={(e) => updateCmsField("primaryPhoneTel", e.target.value)}
                            className="w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none font-mono text-[11px]"
                            placeholder="+263777334569"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            Secondary Alternate Phone (Display)
                          </label>
                          <input
                            type="text"
                            value={cmsForm.secondaryPhone}
                            onChange={(e) => updateCmsField("secondaryPhone", e.target.value)}
                            className="w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none"
                            placeholder="+263 78 871 6082"
                          />
                        </div>
                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            Secondary Phone (Dialable URL)
                          </label>
                          <input
                            type="text"
                            value={cmsForm.secondaryPhoneTel}
                            onChange={(e) => updateCmsField("secondaryPhoneTel", e.target.value)}
                            className="w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none font-mono text-[11px]"
                            placeholder="+263788716082"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            Emergency 24/7 Breakdown Hotline (Display)
                          </label>
                          <input
                            type="text"
                            value={cmsForm.emergencyHotline}
                            onChange={(e) => updateCmsField("emergencyHotline", e.target.value)}
                            className="w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none"
                            placeholder="+263 77 733 4569"
                          />
                        </div>
                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            Emergency Hotline (Dialable URL)
                          </label>
                          <input
                            type="text"
                            value={cmsForm.emergencyHotlineTel}
                            onChange={(e) => updateCmsField("emergencyHotlineTel", e.target.value)}
                            className="w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none font-mono text-[11px]"
                            placeholder="+263777334569"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            WhatsApp Business Number (digits only)
                          </label>
                          <input
                            type="text"
                            value={cmsForm.whatsappNumber}
                            onChange={(e) => updateCmsField("whatsappNumber", e.target.value)}
                            className="w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none font-mono text-[11px]"
                            placeholder="263777334569"
                          />
                        </div>
                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            Technical Desk Email
                          </label>
                          <input
                            type="email"
                            value={cmsForm.email}
                            onChange={(e) => updateCmsField("email", e.target.value)}
                            className="w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none"
                            placeholder="omnicore-solutions@outlook.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                          Sales & Tenders Email
                        </label>
                        <input
                          type="email"
                          value={cmsForm.salesEmail}
                          onChange={(e) => updateCmsField("salesEmail", e.target.value)}
                          className="w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none"
                          placeholder="sales@omnicoresolutions.co.zw"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                          Default WhatsApp Inbound Message Preset
                        </label>
                        <input
                          type="text"
                          value={cmsForm.whatsappMessage}
                          onChange={(e) => updateCmsField("whatsappMessage", e.target.value)}
                          className="w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none"
                          placeholder="Hello Omnicore Harare Desk — I would like an equipment quote."
                        />
                      </div>
                    </div>
                  )}

                  {/* Category 4: Hours & SLAs */}
                  {(cmsCategory === "hours" || cmsCategory === "all" || cmsSearch) && (
                    <div className="rounded-3xl border border-black/[0.06] bg-white p-5 sm:p-6 shadow-xs space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-black/[0.05]">
                        <div className="flex items-center gap-2">
                          <div className="flex size-7 items-center justify-center rounded-lg bg-purple-50 text-purple-700">
                            <Clock className="size-4" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-[#1D1D1F]">
                              Operating Hours, Dispatch Turnaround & SLAs
                            </h3>
                            <p className="text-[11px] text-[#86868B]">
                              Demonstration times, loading schedules, after-hours hotlines, delivery turnarounds, and terms.
                            </p>
                          </div>
                        </div>
                        <span className="rounded-full bg-purple-100/60 px-2 py-0.5 text-[10px] font-semibold text-purple-800">
                          SLA & Yard Times
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            Monday – Friday Hours
                          </label>
                          <input
                            type="text"
                            value={cmsForm.hoursWeekday}
                            onChange={(e) => updateCmsField("hoursWeekday", e.target.value)}
                            className="w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none"
                            placeholder="08:00 – 17:00"
                          />
                        </div>
                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            Saturday Hours
                          </label>
                          <input
                            type="text"
                            value={cmsForm.hoursSaturday}
                            onChange={(e) => updateCmsField("hoursSaturday", e.target.value)}
                            className="w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none"
                            placeholder="08:00 – 13:00"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            Sunday & Public Holiday Policy
                          </label>
                          <input
                            type="text"
                            value={cmsForm.hoursSunday}
                            onChange={(e) => updateCmsField("hoursSunday", e.target.value)}
                            className="w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none"
                            placeholder="Closed · WhatsApp desk monitored"
                          />
                        </div>
                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            Quotation & Price SLA Statement
                          </label>
                          <input
                            type="text"
                            value={cmsForm.responseSLA}
                            onChange={(e) => updateCmsField("responseSLA", e.target.value)}
                            className="w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none"
                            placeholder="Average tender & pricing turnaround under 15 minutes during yard hours."
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                          Nationwide Dispatch & Delivery Lead Time
                        </label>
                        <input
                          type="text"
                          value={cmsForm.dispatchTurnaround}
                          onChange={(e) => updateCmsField("dispatchTurnaround", e.target.value)}
                          className="w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none"
                          placeholder="Same-day lowbed loading for in-stock plant; 24–48h nationwide delivery."
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                          After-Hours & Breakdown Emergency Notice
                        </label>
                        <input
                          type="text"
                          value={cmsForm.afterHoursNotice}
                          onChange={(e) => updateCmsField("afterHoursNotice", e.target.value)}
                          className="w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none"
                          placeholder="Urgent site breakdown & pump dispatch hotline active 24/7 on WhatsApp."
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                          Standard Factory Parts Warranty Statement
                        </label>
                        <input
                          type="text"
                          value={cmsForm.warrantyNotice}
                          onChange={(e) => updateCmsField("warrantyNotice", e.target.value)}
                          className="w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none"
                          placeholder="12-month factory parts warranty & Harare commissioning included."
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            Accepted Payment Currencies & Terms
                          </label>
                          <input
                            type="text"
                            value={cmsForm.termsNotice}
                            onChange={(e) => updateCmsField("termsNotice", e.target.value)}
                            className="w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none"
                            placeholder="All quotes issued in USD payable via Nostro, RTGS, or cash on collection."
                          />
                        </div>
                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            Payment Channels Accepted
                          </label>
                          <input
                            type="text"
                            value={cmsForm.paymentMethods}
                            onChange={(e) => updateCmsField("paymentMethods", e.target.value)}
                            className="w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none"
                            placeholder="Bank Transfer, Nostro, USD Cash, EcoCash, ZIPIT"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                          Formal Tenders & PRAZ Procurement Notice
                        </label>
                        <input
                          type="text"
                          value={cmsForm.tendersNotice || ""}
                          onChange={(e) => updateCmsField("tendersNotice", e.target.value)}
                          className="w-full h-9 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none"
                          placeholder="PRAZ Registered Supplier · Formal tenders, municipal quotes & mine procurement packs issued within 24h."
                        />
                      </div>
                    </div>
                  )}

                  {/* Category 5: Division Messaging */}
                  {(cmsCategory === "divisions" || cmsCategory === "all" || cmsSearch) && (
                    <div className="rounded-3xl border border-black/[0.06] bg-white p-5 sm:p-7 shadow-xs space-y-5">
                      <div className="flex items-center justify-between pb-3.5 border-b border-black/[0.05]">
                        <div className="flex items-center gap-2.5">
                          <div className="flex size-8 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
                            <Package className="size-4.5" />
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-[#1D1D1F]">
                              Specialized Division Headlines, Eyebrows & Narrative Copy
                            </h3>
                            <p className="text-xs text-[#86868B] mt-0.5">
                              Custom positioning headlines, sector eyebrows, and sub-narratives across the 5 industrial division sections.
                            </p>
                          </div>
                        </div>
                        <span className="rounded-full bg-orange-100/70 px-3 py-1 text-xs font-semibold text-orange-800">
                          5 Sectors
                        </span>
                      </div>

                      {/* Spacious Multi-Column Grid of 5 Industrial Divisions */}
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4.5">
                        {/* 1. Mining */}
                        <div className="p-4 rounded-2xl bg-[#F9F9FA] border border-black/[0.05] space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                              1. Mining Equipment
                            </span>
                            <span className="text-[10px] font-medium text-[#86868B]">Gold & Chrome</span>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <label className="text-[10px] font-medium text-[#86868B] block mb-1">Eyebrow</label>
                              <input
                                type="text"
                                value={cmsForm.miningEyebrow}
                                onChange={(e) => updateCmsField("miningEyebrow", e.target.value)}
                                className="w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-medium"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-medium text-[#86868B] block mb-1">Headline</label>
                              <input
                                type="text"
                                value={cmsForm.miningHeadline}
                                onChange={(e) => updateCmsField("miningHeadline", e.target.value)}
                                className="w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-semibold text-[#1D1D1F]"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-medium text-[#86868B] block mb-1">Narrative Subheadline</label>
                              <textarea
                                rows={2}
                                value={cmsForm.miningSubheadline || ""}
                                onChange={(e) => updateCmsField("miningSubheadline", e.target.value)}
                                className="w-full rounded-lg border border-black/[0.08] bg-white p-2 text-xs leading-relaxed"
                                placeholder="Complete gravity and milling circuits engineered for small-scale and commercial miners..."
                              />
                            </div>
                          </div>
                        </div>

                        {/* 2. Plant Hire */}
                        <div className="p-4 rounded-2xl bg-[#F9F9FA] border border-black/[0.05] space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">
                              2. Plant Hire Fleet
                            </span>
                            <span className="text-[10px] font-medium text-[#86868B]">Yellow Metal</span>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <label className="text-[10px] font-medium text-[#86868B] block mb-1">Eyebrow</label>
                              <input
                                type="text"
                                value={cmsForm.hireEyebrow}
                                onChange={(e) => updateCmsField("hireEyebrow", e.target.value)}
                                className="w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-medium"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-medium text-[#86868B] block mb-1">Headline</label>
                              <input
                                type="text"
                                value={cmsForm.hireHeadline}
                                onChange={(e) => updateCmsField("hireHeadline", e.target.value)}
                                className="w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-semibold text-[#1D1D1F]"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-medium text-[#86868B] block mb-1">Narrative Subheadline</label>
                              <textarea
                                rows={2}
                                value={cmsForm.hireSubheadline || ""}
                                onChange={(e) => updateCmsField("hireSubheadline", e.target.value)}
                                className="w-full rounded-lg border border-black/[0.08] bg-white p-2 text-xs leading-relaxed"
                                placeholder="Late-model CAT diggers, 37m concrete boom pumps..."
                              />
                            </div>
                          </div>
                        </div>

                        {/* 3. Farming Machinery */}
                        <div className="p-4 rounded-2xl bg-[#F9F9FA] border border-black/[0.05] space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                              3. Farming Machinery
                            </span>
                            <span className="text-[10px] font-medium text-[#86868B]">Agro-Processing</span>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <label className="text-[10px] font-medium text-[#86868B] block mb-1">Eyebrow</label>
                              <input
                                type="text"
                                value={cmsForm.farmingEyebrow}
                                onChange={(e) => updateCmsField("farmingEyebrow", e.target.value)}
                                className="w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-medium"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-medium text-[#86868B] block mb-1">Headline</label>
                              <input
                                type="text"
                                value={cmsForm.farmingHeadline}
                                onChange={(e) => updateCmsField("farmingHeadline", e.target.value)}
                                className="w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-semibold text-[#1D1D1F]"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-medium text-[#86868B] block mb-1">Narrative Subheadline</label>
                              <textarea
                                rows={2}
                                value={cmsForm.farmingSubheadline || ""}
                                onChange={(e) => updateCmsField("farmingSubheadline", e.target.value)}
                                className="w-full rounded-lg border border-black/[0.08] bg-white p-2 text-xs leading-relaxed"
                                placeholder="Hammer mills, vertical feed mixers, and oil presses..."
                              />
                            </div>
                          </div>
                        </div>

                        {/* 4. Hardware & Fence */}
                        <div className="p-4 rounded-2xl bg-[#F9F9FA] border border-black/[0.05] space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                              4. Hardware & Construction
                            </span>
                            <span className="text-[10px] font-medium text-[#86868B]">Fencing & Civils</span>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <label className="text-[10px] font-medium text-[#86868B] block mb-1">Eyebrow</label>
                              <input
                                type="text"
                                value={cmsForm.hardwareEyebrow}
                                onChange={(e) => updateCmsField("hardwareEyebrow", e.target.value)}
                                className="w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-medium"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-medium text-[#86868B] block mb-1">Headline</label>
                              <input
                                type="text"
                                value={cmsForm.hardwareHeadline}
                                onChange={(e) => updateCmsField("hardwareHeadline", e.target.value)}
                                className="w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-semibold text-[#1D1D1F]"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-medium text-[#86868B] block mb-1">Narrative Subheadline</label>
                              <textarea
                                rows={2}
                                value={cmsForm.hardwareSubheadline || ""}
                                onChange={(e) => updateCmsField("hardwareSubheadline", e.target.value)}
                                className="w-full rounded-lg border border-black/[0.08] bg-white p-2 text-xs leading-relaxed"
                                placeholder="Diamond mesh, razor wire, block machines..."
                              />
                            </div>
                          </div>
                        </div>

                        {/* 5. Industry & Power */}
                        <div className="p-4 rounded-2xl bg-[#F9F9FA] border border-black/[0.05] space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-purple-800 uppercase tracking-wider">
                              5. Industry & Manufacturing
                            </span>
                            <span className="text-[10px] font-medium text-[#86868B]">Power & Motors</span>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <label className="text-[10px] font-medium text-[#86868B] block mb-1">Eyebrow</label>
                              <input
                                type="text"
                                value={cmsForm.industryEyebrow}
                                onChange={(e) => updateCmsField("industryEyebrow", e.target.value)}
                                className="w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-medium"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-medium text-[#86868B] block mb-1">Headline</label>
                              <input
                                type="text"
                                value={cmsForm.industryHeadline}
                                onChange={(e) => updateCmsField("industryHeadline", e.target.value)}
                                className="w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-semibold text-[#1D1D1F]"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-medium text-[#86868B] block mb-1">Narrative Subheadline</label>
                              <textarea
                                rows={2}
                                value={cmsForm.industrySubheadline || ""}
                                onChange={(e) => updateCmsField("industrySubheadline", e.target.value)}
                                className="w-full rounded-lg border border-black/[0.08] bg-white p-2 text-xs leading-relaxed"
                                placeholder="Heavy-duty electric motors, screw compressors..."
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Category 6: About & Pillars */}
                  {(cmsCategory === "about" || cmsCategory === "all" || cmsSearch) && (
                    <div className="rounded-3xl border border-black/[0.06] bg-white p-5 sm:p-7 shadow-xs space-y-5">
                      <div className="flex items-center justify-between pb-3.5 border-b border-black/[0.05]">
                        <div className="flex items-center gap-2.5">
                          <div className="flex size-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                            <Building2 className="size-4.5" />
                          </div>
                          <div>
                            <h3 className="text-base font-semibold text-[#1D1D1F]">
                              Corporate Narrative, Mission & 4 Guarantees
                            </h3>
                            <p className="text-xs text-[#86868B] mt-0.5">
                              Harare yard presence story, nationwide mission, and core operational guarantees across Zimbabwe.
                            </p>
                          </div>
                        </div>
                        <span className="rounded-full bg-indigo-100/70 px-3 py-1 text-xs font-semibold text-indigo-800">
                          About & Mission
                        </span>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            About Section Headline
                          </label>
                          <input
                            type="text"
                            value={cmsForm.aboutHeadline}
                            onChange={(e) => updateCmsField("aboutHeadline", e.target.value)}
                            className="w-full h-9 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none"
                            placeholder="Direct Importers & Stockists of Heavy Industrial Equipment"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            Company Mission Statement
                          </label>
                          <textarea
                            rows={2}
                            value={cmsForm.aboutMission}
                            onChange={(e) => updateCmsField("aboutMission", e.target.value)}
                            className="w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] p-2.5 text-xs leading-relaxed focus:bg-white focus:outline-none"
                            placeholder="Supplying verified commercial machinery with local parts, field commissioning..."
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                          Company Origin & Harare Physical Stock Narrative
                        </label>
                        <textarea
                          rows={2}
                          value={cmsForm.aboutStory || ""}
                          onChange={(e) => updateCmsField("aboutStory", e.target.value)}
                          className="w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] p-3 text-xs leading-relaxed focus:bg-white focus:outline-none"
                          placeholder="Founded to bridge the equipment gap for Zimbabwean miners, contractors, and farmers, Omnicore Solutions maintains a fully-stocked Cranborne yard..."
                        />
                      </div>

                      <div className="space-y-3 pt-2 border-t border-black/[0.05]">
                        <span className="font-semibold text-xs text-[#1D1D1F] block">
                          4 Core Operational Guarantees
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          <div className="rounded-xl border border-black/[0.05] bg-[#F9F9FA] p-3 space-y-1">
                            <label className="text-[10px] font-bold text-[#86868B] block uppercase tracking-wider">Pillar 1 · Yard Stock</label>
                            <input
                              type="text"
                              value={cmsForm.aboutPillar1}
                              onChange={(e) => updateCmsField("aboutPillar1", e.target.value)}
                              className="w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs focus:bg-white focus:outline-none font-medium"
                            />
                          </div>
                          <div className="rounded-xl border border-black/[0.05] bg-[#F9F9FA] p-3 space-y-1">
                            <label className="text-[10px] font-bold text-[#86868B] block uppercase tracking-wider">Pillar 2 · Field Proven</label>
                            <input
                              type="text"
                              value={cmsForm.aboutPillar2}
                              onChange={(e) => updateCmsField("aboutPillar2", e.target.value)}
                              className="w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs focus:bg-white focus:outline-none font-medium"
                            />
                          </div>
                          <div className="rounded-xl border border-black/[0.05] bg-[#F9F9FA] p-3 space-y-1">
                            <label className="text-[10px] font-bold text-[#86868B] block uppercase tracking-wider">Pillar 3 · Spares Back-up</label>
                            <input
                              type="text"
                              value={cmsForm.aboutPillar3}
                              onChange={(e) => updateCmsField("aboutPillar3", e.target.value)}
                              className="w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs focus:bg-white focus:outline-none font-medium"
                            />
                          </div>
                          <div className="rounded-xl border border-black/[0.05] bg-[#F9F9FA] p-3 space-y-1">
                            <label className="text-[10px] font-bold text-[#86868B] block uppercase tracking-wider">Pillar 4 · Logistics</label>
                            <input
                              type="text"
                              value={cmsForm.aboutPillar4}
                              onChange={(e) => updateCmsField("aboutPillar4", e.target.value)}
                              className="w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs focus:bg-white focus:outline-none font-medium"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Category 7: Social & Legal */}
                  {(cmsCategory === "social" || cmsCategory === "all" || cmsSearch) && (
                    <div className="rounded-3xl border border-black/[0.06] bg-white p-5 sm:p-6 shadow-xs space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-black/[0.05]">
                        <div className="flex items-center gap-2">
                          <div className="flex size-7 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                            <Globe className="size-4" />
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold text-[#1D1D1F]">
                              Social Profiles & Footer Compliance
                            </h3>
                            <p className="text-[11px] text-[#86868B]">
                              Official social channels, company overview, and bottom copyright statement.
                            </p>
                          </div>
                        </div>
                        <span className="rounded-full bg-teal-100/60 px-2 py-0.5 text-[10px] font-semibold text-teal-800">
                          Channels
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            LinkedIn Company Profile URL
                          </label>
                          <input
                            type="url"
                            value={cmsForm.linkedinUrl}
                            onChange={(e) => updateCmsField("linkedinUrl", e.target.value)}
                            className="w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none font-mono text-[11px]"
                            placeholder="https://www.linkedin.com/company/..."
                          />
                        </div>
                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            Facebook Page URL
                          </label>
                          <input
                            type="url"
                            value={cmsForm.facebookUrl}
                            onChange={(e) => updateCmsField("facebookUrl", e.target.value)}
                            className="w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none font-mono text-[11px]"
                            placeholder="https://www.facebook.com/..."
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            Founded Year
                          </label>
                          <input
                            type="text"
                            value={cmsForm.foundedYear}
                            onChange={(e) => updateCmsField("foundedYear", e.target.value)}
                            className="w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none"
                            placeholder="2024"
                          />
                        </div>
                        <div>
                          <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                            Registration & Scope Subtitle
                          </label>
                          <input
                            type="text"
                            value={cmsForm.companyReg}
                            onChange={(e) => updateCmsField("companyReg", e.target.value)}
                            className="w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none"
                            placeholder="Harare Industrial & Mining Machinery Supplier"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                          Footer Brand & Mission Summary
                        </label>
                        <textarea
                          rows={2}
                          value={cmsForm.footerAbout}
                          onChange={(e) => updateCmsField("footerAbout", e.target.value)}
                          className="w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] p-3 text-xs leading-relaxed focus:bg-white focus:outline-none"
                          placeholder="Direct supply, equipment hire, and on-site plant commissioning..."
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-[#1D1D1F] text-xs block mb-1">
                          Footer Copyright Notice
                        </label>
                        <input
                          type="text"
                          value={cmsForm.footerCopyright}
                          onChange={(e) => updateCmsField("footerCopyright", e.target.value)}
                          className="w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none"
                          placeholder="© 2026 Omnicore Solutions. All rights reserved..."
                        />
                      </div>
                    </div>
                  )}

                  {/* Submit / Publish Action Bar */}
                  <div className="rounded-2xl border border-black/[0.06] bg-white p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-[#86868B]">
                      <CheckCircle2 className="size-4 text-emerald-600" />
                      <span>Updates propagate instantaneously to all visitors and components across the site.</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={handleResetSiteCopy}
                        className="rounded-full border border-black/[0.08] bg-[#F5F5F7] px-4 py-2 text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition-all"
                      >
                        Reset
                      </button>
                      <button
                        type="submit"
                        className="rounded-full bg-[#1D1D1F] px-6 py-2 text-xs font-semibold text-white shadow-xs hover:bg-black transition-all active:scale-95 flex items-center gap-1.5"
                      >
                        <Check className="size-3.5" />
                        <span>Publish All Changes Live</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Right Column: Live Interactive Visual Preview Studio (5 cols) */}
              {cmsLayoutMode === "split" && isCmsPreviewOpen && (
                <div className="lg:col-span-5 xl:col-span-5 sticky top-20 space-y-4 animate-in fade-in duration-200">
                  <div className="rounded-3xl border border-black/[0.06] bg-white p-5 shadow-xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex size-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                          <Eye className="size-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-[#1D1D1F]">
                            Live Interactive Visual Preview
                          </h3>
                          <p className="text-[10px] text-[#86868B]">
                            Simulates real-time rendering as you type
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 rounded-full bg-emerald-100/70 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                          <span className="size-1.5 rounded-full bg-emerald-600 animate-ping" />
                          <span>Live Sync</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsCmsPreviewOpen(false)}
                          className="rounded-full p-1 text-[#86868B] hover:text-[#1D1D1F] hover:bg-black/[0.05]"
                          title="Hide Live Preview"
                        >
                          <X className="size-3.5" />
                        </button>
                      </div>
                    </div>

                  {/* Preview Mode Selector */}
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 rounded-xl bg-black/[0.04] p-1 text-[11px]">
                    {[
                      { id: "hero", label: "Hero" },
                      { id: "yard", label: "Yard" },
                      { id: "whatsapp", label: "WhatsApp" },
                      { id: "about", label: "About" },
                      { id: "divisions", label: "Divisions" },
                      { id: "footer", label: "Footer" },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setCmsPreviewTab(mode.id as typeof cmsPreviewTab)}
                        className={`rounded-lg py-1 font-medium transition-all text-center ${
                          cmsPreviewTab === mode.id
                            ? "bg-white text-[#1D1D1F] font-semibold shadow-2xs"
                            : "text-[#6E6E73] hover:text-[#1D1D1F]"
                        }`}
                      >
                        {mode.label}
                      </button>
                    ))}
                  </div>

                  {/* PREVIEW CONTAINER 1: HERO BANNER */}
                  {cmsPreviewTab === "hero" && (
                    <div className="rounded-2xl bg-[#14110E] p-4 text-[#F3EFE6] border border-black/20 space-y-3 relative overflow-hidden shadow-inner">
                      <div className="flex items-center gap-1.5">
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] text-white/90">
                          <span className="size-1.5 rounded-full bg-[#1FA855]" />
                          <span className="truncate max-w-[200px]">{cmsForm.heroBadge || "Cranborne yard"}</span>
                        </div>
                      </div>

                      <h4 className="text-base sm:text-lg font-semibold tracking-tight text-white leading-tight">
                        {cmsForm.heroHeadline || "Plant for Zimbabwe’s mines, farms and pours."}
                      </h4>

                      <p className="text-[11px] leading-relaxed text-white/75 line-clamp-3">
                        {cmsForm.heroSubheadline || "Gold circuits, fence plant, self-loading mixers..."}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#1FA855] px-3 py-1 text-[10px] font-semibold text-white">
                          <WhatsAppIcon className="size-3" />
                          {cmsForm.heroCtaPrimary || "WhatsApp"}
                        </span>
                        <span className="rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-[#14110E]">
                          {cmsForm.heroCtaSecondary || "Request Quote"}
                        </span>
                        <span className="rounded-full border border-white/20 px-2.5 py-1 text-[10px] text-white/80">
                          {cmsForm.heroCtaTertiary || "Catalogue"}
                        </span>
                      </div>

                      {/* Stat chips */}
                      <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-white/10 text-[10px]">
                        <div className="bg-white/5 rounded-lg p-1.5">
                          <p className="font-semibold text-white truncate">{cmsForm.stat1Label || "Harare hub"}</p>
                          <p className="text-white/60 truncate">{cmsForm.stat1Detail || "Cranborne yard"}</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-1.5">
                          <p className="font-semibold text-white truncate">{cmsForm.stat2Label || "1–25 TPH"}</p>
                          <p className="text-white/60 truncate">{cmsForm.stat2Detail || "Gold circuits"}</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-1.5">
                          <p className="font-semibold text-white truncate">{cmsForm.stat3Label || "Wet & dry"}</p>
                          <p className="text-white/60 truncate">{cmsForm.stat3Detail || "Plant hire"}</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-1.5">
                          <p className="font-semibold text-white truncate">{cmsForm.stat4Label || "10 provinces"}</p>
                          <p className="text-white/60 truncate">{cmsForm.stat4Detail || "Lowbed delivery"}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PREVIEW CONTAINER 2: YARD CARD */}
                  {cmsPreviewTab === "yard" && (
                    <div className="rounded-2xl bg-[#F5F5F7] p-4 border border-black/[0.06] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-0.5 text-[10px] font-semibold text-[#1D1D1F] border border-black/[0.05]">
                          <MapPin className="size-3 text-[#0071E3]" />
                          {cmsForm.yardCity || "Harare"} Yard Pin
                        </span>
                        <span className="text-[10px] text-[#86868B]">{cmsForm.yardCountry || "Zimbabwe"}</span>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-[#1D1D1F]">
                          {cmsForm.yardAddressLine1 || "115 Chiremba Road"}
                        </h4>
                        <p className="text-xs text-[#6E6E73]">{cmsForm.yardAddressLine2 || "Cranborne, Harare"}</p>
                      </div>

                      <p className="text-[11px] leading-relaxed text-[#86868B] bg-white rounded-xl p-2.5 border border-black/[0.04]">
                        {cmsForm.yardDirectionsNote || "Heavy machinery can be inspected, demonstrated, and loaded onto lowbeds directly from our yard."}
                      </p>

                      <div className="space-y-1 text-[11px]">
                        <div className="flex items-center justify-between">
                          <span className="text-[#86868B]">Mon – Fri:</span>
                          <span className="font-medium text-[#1D1D1F]">{cmsForm.hoursWeekday || "08:00 – 17:00"}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#86868B]">Saturday:</span>
                          <span className="font-medium text-[#1D1D1F]">{cmsForm.hoursSaturday || "08:00 – 13:00"}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[#86868B]">Sunday:</span>
                          <span className="font-medium text-[#1D1D1F]">{cmsForm.hoursSunday || "Closed"}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-1">
                        <a
                          href={cmsForm.googleMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 rounded-xl bg-white border border-black/[0.08] py-1.5 text-center text-[10px] font-semibold text-[#1D1D1F] hover:bg-black/[0.02]"
                        >
                          Google Maps Pin ↗
                        </a>
                        <a
                          href={`tel:${cmsForm.primaryPhoneTel}`}
                          className="flex-1 rounded-xl bg-[#1D1D1F] py-1.5 text-center text-[10px] font-semibold text-white hover:bg-black"
                        >
                          Call Yard Desk
                        </a>
                      </div>
                    </div>
                  )}

                  {/* PREVIEW CONTAINER 3: WHATSAPP DESK */}
                  {cmsPreviewTab === "whatsapp" && (
                    <div className="rounded-2xl bg-[#E8F5E9] p-4 border border-[#A5D6A7] space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <WhatsAppIcon className="size-4 text-[#1FA855]" />
                          <span className="text-xs font-bold text-[#1B5E20]">Harare WhatsApp Desk</span>
                        </div>
                        <span className="text-[10px] font-medium text-[#2E7D32]">
                          Active · +{cmsForm.whatsappNumber}
                        </span>
                      </div>

                      <div className="rounded-xl bg-white p-3 border border-[#C8E6C9] shadow-2xs space-y-1.5">
                        <span className="text-[9px] font-bold text-[#6E6E73] uppercase tracking-wide">
                          Pre-Filled User Message:
                        </span>
                        <div className="rounded-lg bg-[#F1F8E9] p-2 text-xs text-[#1B5E20] italic border-l-2 border-[#1FA855]">
                          "{cmsForm.whatsappMessage || "Hello Omnicore Harare Desk — I would like an equipment quote."}"
                        </div>
                        <p className="text-[10px] text-[#6E6E73]">
                          SLA: {cmsForm.responseSLA || "Average response < 15 mins"}
                        </p>
                      </div>

                      {/* Floating pill preview */}
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-[#6E6E73]">Website Floating FAB:</span>
                        <div className="inline-flex items-center gap-2 rounded-full bg-[#1FA855] px-3 py-1.5 text-white shadow-xs">
                          <WhatsAppIcon className="size-3.5" />
                          <span className="text-[10px] font-bold leading-tight">WhatsApp Desk</span>
                        </div>
                      </div>

                      <a
                        href={`https://wa.me/${cmsForm.whatsappNumber}?text=${encodeURIComponent(cmsForm.whatsappMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center rounded-xl bg-[#1FA855] py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#1B934B] transition-all"
                      >
                        Test WhatsApp Link ↗
                      </a>
                    </div>
                  )}

                  {/* PREVIEW CONTAINER 4: ABOUT & 4 PILLARS */}
                  {cmsPreviewTab === "about" && (
                    <div className="rounded-2xl bg-[#F5F5F7] p-4 border border-black/[0.06] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-0.5 text-[10px] font-semibold text-[#1D1D1F] border border-black/[0.05]">
                          <Building2 className="size-3 text-indigo-600" />
                          Company Value Proposition
                        </span>
                        <span className="text-[10px] text-[#86868B]">Harare Operations</span>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold text-[#1D1D1F]">
                          {cmsForm.aboutHeadline || "Direct Importers & Stockists of Heavy Industrial Equipment"}
                        </h4>
                        <p className="text-xs text-[#6E6E73] mt-1 leading-relaxed">
                          {cmsForm.aboutMission || "Supplying verified commercial machinery with local parts, field commissioning, and technical back-up across all 10 provinces of Zimbabwe."}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-black/[0.06] space-y-2">
                        <span className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider block">
                          4 Core Guarantees:
                        </span>
                        <div className="space-y-1.5 text-[11px]">
                          <div className="flex items-start gap-1.5 bg-white p-2 rounded-xl border border-black/[0.04]">
                            <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="font-medium text-[#1D1D1F]">{cmsForm.aboutPillar1}</span>
                          </div>
                          <div className="flex items-start gap-1.5 bg-white p-2 rounded-xl border border-black/[0.04]">
                            <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="font-medium text-[#1D1D1F]">{cmsForm.aboutPillar2}</span>
                          </div>
                          <div className="flex items-start gap-1.5 bg-white p-2 rounded-xl border border-black/[0.04]">
                            <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="font-medium text-[#1D1D1F]">{cmsForm.aboutPillar3}</span>
                          </div>
                          <div className="flex items-start gap-1.5 bg-white p-2 rounded-xl border border-black/[0.04]">
                            <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="font-medium text-[#1D1D1F]">{cmsForm.aboutPillar4}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PREVIEW CONTAINER 5: DIVISIONS PREVIEW */}
                  {cmsPreviewTab === "divisions" && (
                    <div className="rounded-2xl bg-[#F5F5F7] p-4 border border-black/[0.06] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-0.5 text-[10px] font-semibold text-[#1D1D1F] border border-black/[0.05]">
                          <Package className="size-3 text-orange-600" />
                          5 Industrial Sectors
                        </span>
                        <span className="text-[10px] text-[#86868B]">Live Headlines</span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="bg-white p-2.5 rounded-xl border border-black/[0.04]">
                          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wide block">
                            {cmsForm.miningEyebrow || "Mining"}
                          </span>
                          <p className="font-semibold text-[#1D1D1F] mt-0.5">
                            {cmsForm.miningHeadline}
                          </p>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-black/[0.04]">
                          <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wide block">
                            {cmsForm.hireEyebrow || "Hire Fleet"}
                          </span>
                          <p className="font-semibold text-[#1D1D1F] mt-0.5">
                            {cmsForm.hireHeadline}
                          </p>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-black/[0.04]">
                          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide block">
                            {cmsForm.farmingEyebrow || "Farming"}
                          </span>
                          <p className="font-semibold text-[#1D1D1F] mt-0.5">
                            {cmsForm.farmingHeadline}
                          </p>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-black/[0.04]">
                          <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-wide block">
                            {cmsForm.hardwareEyebrow || "Hardware"}
                          </span>
                          <p className="font-semibold text-[#1D1D1F] mt-0.5">
                            {cmsForm.hardwareHeadline}
                          </p>
                        </div>
                        <div className="bg-white p-2.5 rounded-xl border border-black/[0.04]">
                          <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wide block">
                            {cmsForm.industryEyebrow || "Industry"}
                          </span>
                          <p className="font-semibold text-[#1D1D1F] mt-0.5">
                            {cmsForm.industryHeadline}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PREVIEW CONTAINER 6: FOOTER */}
                  {cmsPreviewTab === "footer" && (
                    <div className="rounded-2xl bg-[#F5F5F7] p-4 border border-black/[0.06] space-y-3">
                      <div className="flex items-center gap-2">
                        <img src="/mark.png" alt="Logo" className="size-6 object-contain" />
                        <span className="text-xs font-bold text-[#1D1D1F]">{cmsForm.name || "Omnicore Solutions"}</span>
                      </div>

                      <p className="text-[11px] leading-relaxed text-[#6E6E73]">
                        {cmsForm.footerAbout || "Direct supply, equipment hire, and on-site plant commissioning from Cranborne, Harare."}
                      </p>

                      <div className="pt-2 border-t border-black/[0.06] space-y-1">
                        <p className="text-[10px] text-[#86868B] font-mono">
                          {cmsForm.footerCopyright || `© 2026 Omnicore Solutions.`}
                        </p>
                        <div className="flex gap-2 text-[10px] text-[#0071E3]">
                          <span>LinkedIn</span>
                          <span>·</span>
                          <span>Facebook</span>
                          <span>·</span>
                          <span>{cmsForm.email}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Propagation Status Box */}
                  <div className="rounded-xl bg-[#F5F5F7] p-3 text-[11px] text-[#6E6E73] space-y-1">
                    <div className="flex items-center justify-between text-[#1D1D1F] font-semibold text-xs">
                      <span>Sync Engine</span>
                      <span className="text-emerald-600 font-mono text-[10px]">Real-Time Event Broadcast</span>
                    </div>
                    <p className="text-[10px]">
                      Storage Key: <code className="font-mono text-[9px] bg-black/[0.04] px-1 py-0.5 rounded">omnicore_site_copy_v2</code>
                    </p>
                    <p className="text-[10px]">
                      Connected components: <span className="font-medium text-[#1D1D1F]">Homepage Hero, Yard Badges, Contact Channels, FAB Widget, Site Footer</span>
                    </p>
                  </div>
                </div>
              </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: FIELD DEPLOYMENTS & HIRE FLEET */}
        {/* ========================================================================= */}
        {activeTab === "hire" && (
          <div className="space-y-6">
            {/* Header with Title & Primary Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="text-xl font-semibold tracking-tight text-[#1D1D1F]">
                    Active Plant Hire Deployments
                  </h2>
                  <span className="rounded-full bg-black/[0.05] px-2.5 py-0.5 text-xs font-semibold text-[#1D1D1F]">
                    {deploymentsList.length} Units
                  </span>
                  {filteredDeployments.length !== deploymentsList.length && (
                    <span className="rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 px-2 py-0.5 text-[11px] font-medium">
                      {filteredDeployments.length} filtered
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#86868B] mt-0.5">
                  Heavy machinery operating on contract across Zimbabwe infrastructure, mines, and farms.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {deploymentsList.length === 0 && (
                  <button
                    type="button"
                    onClick={handleResetDefaultDeployments}
                    className="inline-flex h-9 items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-3.5 text-xs font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] cursor-pointer"
                  >
                    <RotateCcw className="size-3.5" />
                    <span>Load Sample Fleet</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={openCreateDeployment}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[#1D1D1F] px-4 text-xs font-semibold text-white shadow-sm hover:bg-black transition-all cursor-pointer active:scale-95"
                >
                  <Plus className="size-3.5" />
                  <span>Deploy Machinery</span>
                </button>
              </div>
            </div>

            {/* KPI Metric Summary Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <div className="rounded-2xl border border-black/[0.06] bg-white p-3.5 shadow-2xs">
                <span className="text-[11px] font-medium text-[#86868B] uppercase tracking-wider block">
                  Total Fleet Out
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-[#1D1D1F]">{deploymentMetrics.total}</span>
                  <span className="text-[11px] text-[#86868B]">machines</span>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-3.5 shadow-2xs">
                <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  Active On Site
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-emerald-950">{deploymentMetrics.activeOnSite}</span>
                  <span className="text-[11px] text-emerald-700">generating revenue</span>
                </div>
              </div>

              <div className="rounded-2xl border border-blue-200/80 bg-blue-50/40 p-3.5 shadow-2xs">
                <span className="text-[11px] font-semibold text-blue-800 uppercase tracking-wider block">
                  Mobilizing Soon
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-blue-950">{deploymentMetrics.scheduled}</span>
                  <span className="text-[11px] text-blue-700">scheduled dispatch</span>
                </div>
              </div>

              <div className="rounded-2xl border border-purple-200/80 bg-purple-50/40 p-3.5 shadow-2xs">
                <span className="text-[11px] font-semibold text-purple-800 uppercase tracking-wider block">
                  Transit / Service
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-purple-950">{deploymentMetrics.demobilizingOrService}</span>
                  <span className="text-[11px] text-purple-700">field tech / lowbed</span>
                </div>
              </div>

              <div className="rounded-2xl border border-black/[0.06] bg-white p-3.5 shadow-2xs col-span-2 sm:col-span-1">
                <span className="text-[11px] font-medium text-[#86868B] uppercase tracking-wider block">
                  Active Daily Run Rate
                </span>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-[#1FA855]">
                    ${deploymentMetrics.totalDailyRunRate.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-[#86868B]">/ day</span>
                </div>
              </div>
            </div>

            {/* Filter Toolbar: Search, Filters, Sorters, View Switcher */}
            <div className="flex flex-col gap-3 rounded-2xl border border-black/[0.06] bg-white p-3.5 shadow-2xs">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                {/* Search Bar */}
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="absolute left-3 top-2.5 size-4 text-[#86868B]" />
                  <input
                    type="text"
                    value={deploymentSearch}
                    onChange={(e) => {
                      setDeploymentSearch(e.target.value);
                      setDeploymentPage(1);
                    }}
                    placeholder="Search plant, client, site, contract ref, operator, notes..."
                    className="w-full h-9 rounded-xl border border-black/[0.08] bg-[#F9F9FA] pl-9 pr-8 text-xs text-[#1D1D1F] placeholder:text-[#86868B] focus:border-black focus:bg-white focus:outline-none transition-all"
                  />
                  {deploymentSearch && (
                    <button
                      type="button"
                      onClick={() => setDeploymentSearch("")}
                      className="absolute right-2.5 top-2.5 text-[#86868B] hover:text-[#1D1D1F] cursor-pointer"
                    >
                      <X className="size-4" />
                    </button>
                  )}
                </div>

                {/* View Switcher: Table / Grid / Kanban */}
                <div className="flex items-center gap-1 rounded-xl bg-[#F5F5F7] p-1 self-start sm:self-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => setDeploymentViewMode("table")}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${
                      deploymentViewMode === "table"
                        ? "bg-white text-[#1D1D1F] shadow-2xs font-semibold"
                        : "text-[#6E6E73] hover:text-[#1D1D1F]"
                    }`}
                    title="Dense Table View (Conducive for large numbers of deployments)"
                  >
                    <Table className="size-3.5" />
                    <span>Table</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeploymentViewMode("grid")}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${
                      deploymentViewMode === "grid"
                        ? "bg-white text-[#1D1D1F] shadow-2xs font-semibold"
                        : "text-[#6E6E73] hover:text-[#1D1D1F]"
                    }`}
                    title="Card Grid View"
                  >
                    <LayoutGrid className="size-3.5" />
                    <span>Cards</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeploymentViewMode("kanban")}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${
                      deploymentViewMode === "kanban"
                        ? "bg-white text-[#1D1D1F] shadow-2xs font-semibold"
                        : "text-[#6E6E73] hover:text-[#1D1D1F]"
                    }`}
                    title="Status Board / Kanban"
                  >
                    <Kanban className="size-3.5" />
                    <span>Status Board</span>
                  </button>
                </div>
              </div>

              {/* Secondary Filter Row: Status, Province, Category, Sorting, Items per Page */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-black/[0.04] text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  {/* Status Dropdown */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#86868B] font-medium text-[11px]">Status:</span>
                    <select
                      value={deploymentStatusFilter}
                      onChange={(e) => {
                        setDeploymentStatusFilter(e.target.value);
                        setDeploymentPage(1);
                      }}
                      className="h-7.5 rounded-lg border border-black/[0.08] bg-white px-2 text-xs font-medium text-[#1D1D1F] focus:outline-none"
                    >
                      <option value="all">All Statuses ({deploymentsList.length})</option>
                      <option value="Active on Site">Active on Site ({deploymentsList.filter((d) => d.status === "Active on Site").length})</option>
                      <option value="Scheduled Mobilization">Scheduled Mobilization ({deploymentsList.filter((d) => d.status === "Scheduled Mobilization").length})</option>
                      <option value="Demobilizing / In Transit">Demobilizing / In Transit ({deploymentsList.filter((d) => d.status === "Demobilizing / In Transit").length})</option>
                      <option value="Routine Service / Standby">Routine Service / Standby ({deploymentsList.filter((d) => d.status === "Routine Service / Standby").length})</option>
                      <option value="Returned to Cranborne Yard">Returned to Cranborne Yard ({deploymentsList.filter((d) => d.status === "Returned to Cranborne Yard").length})</option>
                    </select>
                  </div>

                  {/* Province Filter */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#86868B] font-medium text-[11px]">Province:</span>
                    <select
                      value={deploymentProvinceFilter}
                      onChange={(e) => {
                        setDeploymentProvinceFilter(e.target.value);
                        setDeploymentPage(1);
                      }}
                      className="h-7.5 rounded-lg border border-black/[0.08] bg-white px-2 text-xs font-medium text-[#1D1D1F] focus:outline-none"
                    >
                      <option value="all">All Zimbabwe</option>
                      {PROVINCES.filter((p) => p !== "All Zimbabwe").map((prov) => (
                        <option key={prov} value={prov}>
                          {prov}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#86868B] font-medium text-[11px]">Division:</span>
                    <select
                      value={deploymentCategoryFilter}
                      onChange={(e) => {
                        setDeploymentCategoryFilter(e.target.value);
                        setDeploymentPage(1);
                      }}
                      className="h-7.5 rounded-lg border border-black/[0.08] bg-white px-2 text-xs font-medium text-[#1D1D1F] focus:outline-none"
                    >
                      <option value="all">All Divisions</option>
                      <option value="hire">Plant Hire</option>
                      <option value="mining">Mining</option>
                      <option value="farming">Farming</option>
                      <option value="hardware">Hardware</option>
                      <option value="industry">Industry</option>
                    </select>
                  </div>

                  {/* Sort Order */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#86868B] font-medium text-[11px]">Sort:</span>
                    <select
                      value={deploymentSortBy}
                      onChange={(e) => setDeploymentSortBy(e.target.value as any)}
                      className="h-7.5 rounded-lg border border-black/[0.08] bg-white px-2 text-xs font-medium text-[#1D1D1F] focus:outline-none"
                    >
                      <option value="return-soon">Return Date (Soonest first)</option>
                      <option value="newest">Newest Contract</option>
                      <option value="rate-high">Highest Daily Rate</option>
                      <option value="plant-az">Machine Name (A-Z)</option>
                    </select>
                  </div>
                </div>

                {/* Items Per Page & Count */}
                <div className="flex items-center gap-3 text-[11px] text-[#86868B]">
                  <span>
                    Showing <strong>{filteredDeployments.length}</strong> of {deploymentsList.length}
                  </span>
                  <div className="flex items-center gap-1">
                    <span>Per page:</span>
                    <select
                      value={deploymentPageSize}
                      onChange={(e) => {
                        setDeploymentPageSize(Number(e.target.value));
                        setDeploymentPage(1);
                      }}
                      className="h-6 rounded border border-black/[0.08] bg-white px-1 text-[11px] text-[#1D1D1F]"
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={999}>All</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Empty State when no results */}
            {filteredDeployments.length === 0 ? (
              <div className="rounded-2xl border border-black/[0.06] bg-white p-12 text-center space-y-3">
                <Truck className="size-10 text-[#86868B] mx-auto opacity-40" />
                <h3 className="text-base font-semibold text-[#1D1D1F]">No deployments found</h3>
                <p className="text-xs text-[#86868B] max-w-md mx-auto">
                  {deploymentSearch || deploymentStatusFilter !== "all" || deploymentProvinceFilter !== "all" || deploymentCategoryFilter !== "all"
                    ? "Try adjusting your search terms or filters to locate active machinery contracts."
                    : "No heavy machinery is currently deployed in the field. Deploy a machine to start tracking contracts."}
                </p>
                <div className="pt-2 flex items-center justify-center gap-2">
                  {(deploymentSearch || deploymentStatusFilter !== "all" || deploymentProvinceFilter !== "all" || deploymentCategoryFilter !== "all") && (
                    <button
                      type="button"
                      onClick={() => {
                        setDeploymentSearch("");
                        setDeploymentStatusFilter("all");
                        setDeploymentProvinceFilter("all");
                        setDeploymentCategoryFilter("all");
                      }}
                      className="rounded-full border border-black/[0.08] bg-white px-4 py-2 text-xs font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={openCreateDeployment}
                    className="rounded-full bg-[#1D1D1F] px-4 py-2 text-xs font-semibold text-white hover:bg-black cursor-pointer shadow-xs"
                  >
                    + Deploy Machinery
                  </button>
                </div>
              </div>
            ) : deploymentViewMode === "table" ? (
              /* =============================================================== */
              /* VIEW MODE 1: DENSE TABLE (CONDUCIVE FOR LARGE VOLUMES)           */
              /* =============================================================== */
              <div className="rounded-2xl border border-black/[0.08] bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-black/[0.06] bg-[#FBFBFC] text-[11px] font-semibold text-[#86868B] uppercase tracking-wider">
                        <th className="py-3 pl-4 pr-3">Machine / Plant</th>
                        <th className="py-3 px-3">Client & Site Location</th>
                        <th className="py-3 px-3">Contract & Operator</th>
                        <th className="py-3 px-3">Billing Rate</th>
                        <th className="py-3 px-3">Status</th>
                        <th className="py-3 px-3">Return Date</th>
                        <th className="py-3 pl-3 pr-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.04]">
                      {paginatedDeployments.map((dep) => {
                        const statusColors =
                          dep.status === "Active on Site"
                            ? "bg-[#E8F8EE] text-[#1B833E] border-emerald-200"
                            : dep.status === "Scheduled Mobilization"
                            ? "bg-[#EFF6FF] text-[#1D4ED8] border-blue-200"
                            : dep.status === "Demobilizing / In Transit"
                            ? "bg-[#FFFBEB] text-[#B45309] border-amber-200"
                            : dep.status === "Routine Service / Standby"
                            ? "bg-[#FAF5FF] text-[#7E22CE] border-purple-200"
                            : "bg-[#F5F5F7] text-[#6E6E73] border-gray-200";

                        const whatsappLink = `https://wa.me/${(dep.contactPhone || "+263772109441").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                          `Hello ${dep.contactPerson || dep.client}, this is Omnicore Solutions Harare regarding the ${dep.plant} on site at ${dep.site} (Contract Ref: ${dep.contractRef}).`
                        )}`;

                        return (
                          <tr key={dep.id} className="hover:bg-[#F9F9FA] transition-colors group">
                            {/* Plant Column */}
                            <td className="py-3 pl-4 pr-3">
                              <div className="flex items-center gap-3">
                                <div
                                  role="button"
                                  tabIndex={0}
                                  onClick={() =>
                                    openProductLightbox({
                                      name: dep.plant,
                                      category: dep.category,
                                      spec: `${dep.client} · ${dep.site}`,
                                      price: dep.rate,
                                      sku: dep.sku || dep.id,
                                      image: dep.image,
                                    })
                                  }
                                  className="relative size-12 rounded-xl overflow-hidden bg-black/[0.05] border border-black/[0.08] shrink-0 cursor-pointer group/thumb shadow-2xs"
                                  title="Click to preview on large screen"
                                >
                                  <img
                                    src={dep.image || "/images/cat-excavator.jpg"}
                                    alt={dep.plant}
                                    className="size-full object-cover transition-transform group-hover/thumb:scale-110"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = "/images/hero.jpg";
                                    }}
                                  />
                                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center transition-opacity">
                                    <ZoomIn className="size-3 text-white" />
                                  </div>
                                </div>
                                <div className="min-w-0 max-w-[200px] sm:max-w-[260px]">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="font-semibold text-[#1D1D1F] truncate block">
                                      {dep.plant}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1.5 text-[10px] text-[#86868B] mt-0.5">
                                    <span className="font-mono">{dep.id}</span>
                                    <span>·</span>
                                    <span className="capitalize">{dep.category}</span>
                                    {dep.sku && (
                                      <>
                                        <span>·</span>
                                        <span className="truncate">{dep.sku}</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Client & Site Location */}
                            <td className="py-3 px-3">
                              <div className="space-y-0.5 max-w-[220px]">
                                <span className="font-semibold text-[#1D1D1F] block truncate">
                                  {dep.client}
                                </span>
                                <div className="flex items-center gap-1 text-[11px] text-[#6E6E73] truncate">
                                  <MapPin className="size-3 text-[#86868B] shrink-0" />
                                  <span className="truncate">{dep.site}</span>
                                </div>
                                <span className="text-[10px] text-[#86868B] block truncate">
                                  {dep.province}
                                </span>
                              </div>
                            </td>

                            {/* Contract & Operator */}
                            <td className="py-3 px-3">
                              <div className="space-y-0.5 max-w-[180px]">
                                <span className="font-mono text-[11px] font-medium text-[#1D1D1F] block">
                                  {dep.contractRef}
                                </span>
                                <span className="text-[10px] text-[#6E6E73] block truncate">
                                  {dep.operator}
                                </span>
                                {dep.contactPerson && (
                                  <span className="text-[10px] text-[#86868B] block truncate">
                                    Contact: {dep.contactPerson}
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Billing Rate */}
                            <td className="py-3 px-3">
                              <div className="space-y-0.5">
                                <span className="inline-block rounded-md bg-[#F5F5F7] px-2 py-0.5 text-xs font-semibold text-[#1D1D1F]">
                                  {dep.rate}
                                </span>
                                {dep.dailyRateUSD > 0 && (
                                  <span className="text-[10px] text-[#1FA855] font-semibold block">
                                    ${dep.dailyRateUSD}/day billing
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Status with Quick Status Selector */}
                            <td className="py-3 px-3">
                              <div className="space-y-1">
                                <span
                                  className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${statusColors}`}
                                >
                                  <span
                                    className={`size-1.5 rounded-full ${
                                      dep.status === "Active on Site"
                                        ? "bg-emerald-500 animate-pulse"
                                        : dep.status === "Scheduled Mobilization"
                                        ? "bg-blue-500"
                                        : dep.status === "Demobilizing / In Transit"
                                        ? "bg-amber-500"
                                        : dep.status === "Routine Service / Standby"
                                        ? "bg-purple-500"
                                        : "bg-gray-400"
                                    }`}
                                  />
                                  <span>{dep.status}</span>
                                </span>
                                <select
                                  value={dep.status}
                                  onChange={(e) => handleQuickStatusChange(dep.id, e.target.value as DeploymentStatus)}
                                  className="block h-5.5 text-[10px] rounded border border-black/[0.08] bg-white px-1 text-[#6E6E73] hover:text-[#1D1D1F] focus:outline-none cursor-pointer"
                                  title="Quick update status"
                                >
                                  <option value="Active on Site">Active on Site</option>
                                  <option value="Scheduled Mobilization">Scheduled Mobilization</option>
                                  <option value="Demobilizing / In Transit">Demobilizing / In Transit</option>
                                  <option value="Routine Service / Standby">Routine Service / Standby</option>
                                  <option value="Returned to Cranborne Yard">Returned to Cranborne Yard</option>
                                </select>
                              </div>
                            </td>

                            {/* Return Date */}
                            <td className="py-3 px-3 whitespace-nowrap">
                              <div className="space-y-0.5">
                                <span className="text-xs font-medium text-[#1D1D1F] block">
                                  {dep.scheduledReturn || "Open-ended"}
                                </span>
                                <span className="text-[10px] text-[#86868B] block">
                                  Started: {dep.startDate}
                                </span>
                              </div>
                            </td>

                            {/* Actions Column */}
                            <td className="py-3 pl-3 pr-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  type="button"
                                  onClick={() =>
                                    openProductLightbox({
                                      name: dep.plant,
                                      category: dep.category,
                                      spec: `${dep.client} · ${dep.site}`,
                                      price: dep.rate,
                                      sku: dep.sku || dep.id,
                                      image: dep.image,
                                    })
                                  }
                                  className="flex size-7.5 items-center justify-center rounded-lg border border-black/[0.06] bg-white text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all cursor-pointer"
                                  title="Preview Machinery Photo in HD Large Screen"
                                >
                                  <ZoomIn className="size-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => openEditDeployment(dep)}
                                  className="flex size-7.5 items-center justify-center rounded-lg border border-black/[0.06] bg-white text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all cursor-pointer"
                                  title="Edit Deployment Record"
                                >
                                  <Edit3 className="size-3.5" />
                                </button>
                                <a
                                  href={whatsappLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex size-7.5 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-[#1B833E] hover:bg-emerald-100 transition-all cursor-pointer"
                                  title="WhatsApp Client Regarding Contract"
                                >
                                  <WhatsAppIcon className="size-3.5" />
                                </a>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteDeployment(dep.id)}
                                  className="flex size-7.5 items-center justify-center rounded-lg border border-red-200/60 bg-white text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                                  title="Delete Deployment"
                                >
                                  <Trash2 className="size-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : deploymentViewMode === "grid" ? (
              /* =============================================================== */
              /* VIEW MODE 2: CARDS GRID (POLISHED VISUAL OVERVIEW)              */
              /* =============================================================== */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {paginatedDeployments.map((dep) => {
                  const statusColors =
                    dep.status === "Active on Site"
                      ? "bg-[#E8F8EE] text-[#1B833E] border-emerald-200"
                      : dep.status === "Scheduled Mobilization"
                      ? "bg-[#EFF6FF] text-[#1D4ED8] border-blue-200"
                      : dep.status === "Demobilizing / In Transit"
                      ? "bg-[#FFFBEB] text-[#B45309] border-amber-200"
                      : dep.status === "Routine Service / Standby"
                      ? "bg-[#FAF5FF] text-[#7E22CE] border-purple-200"
                      : "bg-[#F5F5F7] text-[#6E6E73] border-gray-200";

                  const whatsappLink = `https://wa.me/${(dep.contactPhone || "+263772109441").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Hello ${dep.contactPerson || dep.client}, this is Omnicore Solutions Harare regarding the ${dep.plant} on site at ${dep.site} (Contract Ref: ${dep.contractRef}).`
                  )}`;

                  return (
                    <div
                      key={dep.id}
                      className="group relative flex flex-col rounded-2xl border border-black/[0.08] bg-white p-4 shadow-sm hover:border-black/[0.15] hover:shadow-md transition-all"
                    >
                      {/* Top Bar with Thumbnail & Badges */}
                      <div className="flex gap-3 items-start">
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() =>
                            openProductLightbox({
                              name: dep.plant,
                              category: dep.category,
                              spec: `${dep.client} · ${dep.site}`,
                              price: dep.rate,
                              sku: dep.sku || dep.id,
                              image: dep.image,
                            })
                          }
                          className="relative size-16 sm:size-20 rounded-xl overflow-hidden bg-black/[0.05] border border-black/[0.08] shrink-0 cursor-pointer shadow-2xs group/pic"
                          title="Click to view photo in large screen"
                        >
                          <img
                            src={dep.image || "/images/cat-excavator.jpg"}
                            alt={dep.plant}
                            className="size-full object-cover transition-transform group-hover/pic:scale-105"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/images/hero.jpg";
                            }}
                          />
                          <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/pic:opacity-100 transition-opacity flex items-center justify-center">
                            <ZoomIn className="size-4 text-white" />
                          </div>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1.5 mb-1">
                            <span className="font-mono text-[10px] font-semibold text-[#86868B]">
                              {dep.id}
                            </span>
                            <span
                              className={`rounded-full border px-2 py-0.5 text-[9px] font-semibold ${statusColors}`}
                            >
                              {dep.status}
                            </span>
                          </div>
                          <h3 className="text-sm font-semibold text-[#1D1D1F] line-clamp-1 leading-snug">
                            {dep.plant}
                          </h3>
                          <p className="text-xs text-[#6E6E73] truncate mt-0.5">
                            Client: <strong className="text-[#1D1D1F] font-semibold">{dep.client}</strong>
                          </p>
                          <p className="text-[11px] text-[#86868B] truncate mt-0.5 flex items-center gap-1">
                            <MapPin className="size-3 text-[#86868B] shrink-0" />
                            <span>{dep.site}</span>
                          </p>
                        </div>
                      </div>

                      {/* Middle Details Grid */}
                      <div className="mt-3.5 grid grid-cols-2 gap-2 rounded-xl bg-[#F5F5F7] p-2.5 text-xs">
                        <div>
                          <span className="text-[9px] text-[#86868B] block uppercase tracking-wider">
                            Billing Rate
                          </span>
                          <span className="font-semibold text-[#1D1D1F] block">{dep.rate}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-[#86868B] block uppercase tracking-wider">
                            Scheduled Return
                          </span>
                          <span className="font-semibold text-[#1D1D1F] block truncate">
                            {dep.scheduledReturn || "Open"}
                          </span>
                        </div>
                        <div className="col-span-2 pt-1 border-t border-black/[0.04]">
                          <span className="text-[9px] text-[#86868B] block uppercase tracking-wider">
                            Contract & Operator
                          </span>
                          <span className="text-[#1D1D1F] truncate block font-medium">
                            {dep.contractRef} · {dep.operator}
                          </span>
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="mt-3 pt-2.5 border-t border-black/[0.06] flex items-center justify-between gap-2">
                        <span className="text-[10px] font-medium text-[#86868B]">
                          📍 {dep.province}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEditDeployment(dep)}
                            className="inline-flex items-center gap-1 rounded-lg border border-black/[0.08] bg-white px-2.5 py-1 text-xs font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] cursor-pointer"
                          >
                            <Edit3 className="size-3" />
                            <span>Edit</span>
                          </button>
                          <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-800 hover:bg-emerald-100"
                            title="WhatsApp client"
                          >
                            <WhatsAppIcon className="size-3" />
                          </a>
                          <button
                            type="button"
                            onClick={() => handleDeleteDeployment(dep.id)}
                            className="inline-flex size-7 items-center justify-center rounded-lg border border-red-200 bg-white text-red-600 hover:bg-red-50 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="size-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* =============================================================== */
              /* VIEW MODE 3: KANBAN / STATUS BOARD                             */
              /* =============================================================== */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5 overflow-x-auto pb-2">
                {(
                  [
                    { id: "Active on Site", label: "Active on Site", color: "emerald", border: "border-emerald-200", bg: "bg-emerald-50/50" },
                    { id: "Scheduled Mobilization", label: "Scheduled", color: "blue", border: "border-blue-200", bg: "bg-blue-50/50" },
                    { id: "Demobilizing / In Transit", label: "In Transit", color: "amber", border: "border-amber-200", bg: "bg-amber-50/50" },
                    { id: "Routine Service / Standby", label: "Service / Standby", color: "purple", border: "border-purple-200", bg: "bg-purple-50/50" },
                    { id: "Returned to Cranborne Yard", label: "Returned to Yard", color: "gray", border: "border-gray-200", bg: "bg-gray-50/50" },
                  ] as const
                ).map((col) => {
                  const itemsInCol = filteredDeployments.filter((d) => d.status === col.id);
                  return (
                    <div
                      key={col.id}
                      className={`flex flex-col rounded-2xl border ${col.border} ${col.bg} p-3 min-w-[240px]`}
                    >
                      {/* Column Header */}
                      <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-black/[0.06]">
                        <span className="text-xs font-semibold text-[#1D1D1F] truncate">{col.label}</span>
                        <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-[#1D1D1F] border border-black/[0.06]">
                          {itemsInCol.length}
                        </span>
                      </div>

                      {/* Items Column Container */}
                      <div className="space-y-2.5 flex-1 min-h-[160px]">
                        {itemsInCol.length === 0 ? (
                          <div className="h-28 rounded-xl border border-dashed border-black/[0.1] flex items-center justify-center text-[11px] text-[#86868B]">
                            No machines
                          </div>
                        ) : (
                          itemsInCol.map((dep) => (
                            <div
                              key={dep.id}
                              className="rounded-xl border border-black/[0.08] bg-white p-3 shadow-2xs space-y-2 hover:border-black/[0.18] transition-all"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <span className="font-mono text-[10px] text-[#86868B]">{dep.id}</span>
                                <span className="text-[10px] font-bold text-[#1D1D1F] bg-[#F5F5F7] px-1.5 py-0.5 rounded">
                                  {dep.rate}
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <img
                                  src={dep.image || "/images/cat-excavator.jpg"}
                                  alt={dep.plant}
                                  className="size-9 rounded-lg object-cover bg-black/[0.04] shrink-0"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/images/hero.jpg";
                                  }}
                                />
                                <div className="min-w-0 flex-1">
                                  <h4 className="text-xs font-semibold text-[#1D1D1F] truncate leading-tight">
                                    {dep.plant}
                                  </h4>
                                  <p className="text-[11px] text-[#6E6E73] truncate">{dep.client}</p>
                                </div>
                              </div>

                              <p className="text-[10px] text-[#86868B] truncate">📍 {dep.site}</p>

                              <div className="pt-2 border-t border-black/[0.04] flex items-center justify-between text-[10px]">
                                <span className="text-[#86868B]">Due: {dep.scheduledReturn || "Open"}</span>
                                <div className="flex items-center gap-1">
                                  <button
                                    type="button"
                                    onClick={() => openEditDeployment(dep)}
                                    className="p-1 rounded text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]"
                                    title="Edit"
                                  >
                                    <Edit3 className="size-3" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteDeployment(dep.id)}
                                    className="p-1 rounded text-red-600 hover:bg-red-50"
                                    title="Delete"
                                  >
                                    <Trash2 className="size-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Pagination Controls */}
            {deploymentTotalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-black/[0.06] bg-white p-3 text-xs shadow-2xs">
                <span className="text-[11px] text-[#86868B]">
                  Showing page <strong>{deploymentPage}</strong> of <strong>{deploymentTotalPages}</strong> ({filteredDeployments.length} total)
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={deploymentPage <= 1}
                    onClick={() => setDeploymentPage(1)}
                    className="flex size-7.5 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-[#1D1D1F] hover:bg-[#F5F5F7] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    title="First page"
                  >
                    <ChevronsLeft className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={deploymentPage <= 1}
                    onClick={() => setDeploymentPage((p) => Math.max(1, p - 1))}
                    className="flex size-7.5 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-[#1D1D1F] hover:bg-[#F5F5F7] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    title="Previous page"
                  >
                    <ChevronLeft className="size-3.5" />
                  </button>
                  <span className="px-3 py-1 text-xs font-semibold text-[#1D1D1F]">
                    {deploymentPage} / {deploymentTotalPages}
                  </span>
                  <button
                    type="button"
                    disabled={deploymentPage >= deploymentTotalPages}
                    onClick={() => setDeploymentPage((p) => Math.min(deploymentTotalPages, p + 1))}
                    className="flex size-7.5 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-[#1D1D1F] hover:bg-[#F5F5F7] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    title="Next page"
                  >
                    <ChevronRight className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={deploymentPage >= deploymentTotalPages}
                    onClick={() => setDeploymentPage(deploymentTotalPages)}
                    className="flex size-7.5 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-[#1D1D1F] hover:bg-[#F5F5F7] disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    title="Last page"
                  >
                    <ChevronsRight className="size-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Modal: Add or Edit Field Deployment */}
            {showDeployModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-150">
                <div className="w-full max-w-2xl rounded-2xl border border-black/[0.08] bg-white p-6 shadow-2xl max-h-[92vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-black/[0.06] pb-3">
                    <div>
                      <h3 className="text-base font-semibold text-[#1D1D1F]">
                        {editingDeployment ? `Edit Field Deployment (${editingDeployment.id})` : "Deploy Machinery on Field Contract"}
                      </h3>
                      <p className="text-[11px] text-[#86868B] mt-0.5">
                        {editingDeployment
                          ? "Update site location, billing rate, status, return dates, or client details."
                          : "Log a heavy machine dispatch from Cranborne yard to an infrastructure, mining, or farm site."}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowDeployModal(false)}
                      className="rounded-full p-1 text-[#86868B] hover:bg-[#F5F5F7] cursor-pointer"
                    >
                      <X className="size-4" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveDeployment} className="mt-4 space-y-4 text-xs">
                    {/* Inventory Quick-Pick Preset */}
                    {!editingDeployment && (
                      <div className="rounded-xl border border-black/[0.08] bg-[#FBFBFC] p-3 space-y-1.5">
                        <label className="font-semibold text-[#1D1D1F] block text-xs">
                          Fast Select from Cranborne Yard Inventory (Optional)
                        </label>
                        <select
                          value={deployMachineId}
                          onChange={(e) => {
                            const chosenId = e.target.value;
                            setDeployMachineId(chosenId);
                            const chosenProd = equipmentList.find((p) => p.id === chosenId);
                            if (chosenProd) {
                              setDeployPlant(chosenProd.name);
                              setDeployCategory((chosenProd.category as any) || "hire");
                              if (chosenProd.sku) setDeploySku(chosenProd.sku);
                              if (chosenProd.image) setDeployImage(chosenProd.image);
                              if (chosenProd.price) setDeployRate(chosenProd.price);
                            }
                          }}
                          className="w-full h-8.5 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#1D1D1F] focus:outline-none"
                        >
                          <option value="">-- Choose from Harare Inventory (or enter below) --</option>
                          {equipmentList.map((eq) => (
                            <option key={eq.id} value={eq.id}>
                              {eq.name} ({eq.sku || eq.id}) - {eq.category.toUpperCase()}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Machinery Identification Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="font-semibold text-[#1D1D1F] block mb-1">
                          Machinery / Plant Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={deployPlant}
                          onChange={(e) => setDeployPlant(e.target.value)}
                          placeholder="e.g. 20-Tonne CAT 320D Excavator"
                          className="w-full h-8.5 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#1D1D1F] focus:border-black focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-[#1D1D1F] block mb-1">
                          Division Category
                        </label>
                        <select
                          value={deployCategory}
                          onChange={(e) => setDeployCategory(e.target.value as any)}
                          className="w-full h-8.5 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#1D1D1F] focus:outline-none"
                        >
                          <option value="hire">Plant Hire</option>
                          <option value="mining">Mining</option>
                          <option value="farming">Farming</option>
                          <option value="hardware">Hardware</option>
                          <option value="industry">Industry</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-semibold text-[#1D1D1F] block mb-1">
                          Asset SKU / Serial Number
                        </label>
                        <input
                          type="text"
                          value={deploySku}
                          onChange={(e) => setDeploySku(e.target.value)}
                          placeholder="e.g. OMNI-HIR-320D"
                          className="w-full h-8.5 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#1D1D1F] focus:border-black focus:outline-none font-mono"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-[#1D1D1F] block mb-1">
                          Machinery Photo URL or Upload
                        </label>
                        <div className="flex gap-2 items-center">
                          <input
                            type="text"
                            value={deployImage}
                            onChange={(e) => setDeployImage(e.target.value)}
                            placeholder="/images/cat-excavator.jpg"
                            className="flex-1 h-8.5 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#1D1D1F] focus:border-black focus:outline-none"
                          />
                          <label className="h-8.5 px-3 rounded-lg border border-black/[0.08] bg-[#F5F5F7] hover:bg-[#EBEBEB] text-[#1D1D1F] font-semibold text-[11px] inline-flex items-center gap-1 cursor-pointer shrink-0">
                            <Upload className="size-3" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleDeployImageUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Client & Contract Details */}
                    <div className="rounded-xl border border-black/[0.08] bg-[#FBFBFC] p-3.5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#1D1D1F] text-xs">
                          Client & Site Deployment Details
                        </span>
                        {/* Quick fill from CRM clients */}
                        <select
                          onChange={(e) => {
                            const chosen = clients.find((c) => c.name === e.target.value);
                            if (chosen) {
                              setDeployClient(chosen.organization ? `${chosen.name} (${chosen.organization})` : chosen.name);
                              if (chosen.phone) setDeployContactPhone(chosen.phone);
                              if (chosen.province && chosen.province !== "All Zimbabwe") setDeployProvince(chosen.province);
                              if (chosen.location) setDeploySite(chosen.location);
                              setDeployContactPerson(chosen.name);
                            }
                          }}
                          className="h-6 text-[10px] rounded border border-black/[0.08] bg-white px-1.5 text-[#6E6E73] focus:outline-none"
                        >
                          <option value="">Quick fill from CRM clients...</option>
                          {clients.map((c) => (
                            <option key={c.id} value={c.name}>
                              {c.name} {c.organization ? `(${c.organization})` : ""} - {c.province}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="font-semibold text-[#1D1D1F] block mb-1">
                            Client Organization / Individual *
                          </label>
                          <input
                            type="text"
                            required
                            value={deployClient}
                            onChange={(e) => setDeployClient(e.target.value)}
                            placeholder="e.g. Great Dyke Quarries Ltd"
                            className="w-full h-8.5 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#1D1D1F] focus:border-black focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-[#1D1D1F] block mb-1">
                            Contract Reference #
                          </label>
                          <input
                            type="text"
                            value={deployContractRef}
                            onChange={(e) => setDeployContractRef(e.target.value)}
                            placeholder="e.g. CNT-2026-105"
                            className="w-full h-8.5 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#1D1D1F] focus:border-black focus:outline-none font-mono"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-[#1D1D1F] block mb-1">
                            Site Location / Mine / Farm *
                          </label>
                          <input
                            type="text"
                            required
                            value={deploySite}
                            onChange={(e) => setDeploySite(e.target.value)}
                            placeholder="e.g. Shamva Gold Claims, Mash Central"
                            className="w-full h-8.5 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#1D1D1F] focus:border-black focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-[#1D1D1F] block mb-1">
                            Province in Zimbabwe
                          </label>
                          <select
                            value={deployProvince}
                            onChange={(e) => setDeployProvince(e.target.value)}
                            className="w-full h-8.5 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#1D1D1F] focus:outline-none"
                          >
                            {PROVINCES.filter((p) => p !== "All Zimbabwe").map((prov) => (
                              <option key={prov} value={prov}>
                                {prov}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="font-semibold text-[#1D1D1F] block mb-1">
                            Contact Person on Site
                          </label>
                          <input
                            type="text"
                            value={deployContactPerson}
                            onChange={(e) => setDeployContactPerson(e.target.value)}
                            placeholder="e.g. Eng. T. Masvingise"
                            className="w-full h-8.5 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#1D1D1F] focus:border-black focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="font-semibold text-[#1D1D1F] block mb-1">
                            Contact Phone / WhatsApp
                          </label>
                          <input
                            type="text"
                            value={deployContactPhone}
                            onChange={(e) => setDeployContactPhone(e.target.value)}
                            placeholder="+263 77 210 9441"
                            className="w-full h-8.5 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#1D1D1F] focus:border-black focus:outline-none font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Operational & Commercial Terms */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                      <div>
                        <label className="font-semibold text-[#1D1D1F] block mb-1">
                          Operator Arrangement
                        </label>
                        <select
                          value={deployOperator}
                          onChange={(e) => setDeployOperator(e.target.value)}
                          className="w-full h-8.5 rounded-lg border border-black/[0.08] bg-white px-2 text-xs text-[#1D1D1F] focus:outline-none"
                        >
                          <option value="Wet Rate (With Certified Operator)">Wet Rate (With Certified Operator)</option>
                          <option value="Dry Rate (Machine Only)">Dry Rate (Machine Only)</option>
                          <option value="Wet Rate (Double Shift Crew)">Wet Rate (Double Shift Crew)</option>
                          <option value="Wet Rate (With Plant Mechanic)">Wet Rate (With Plant Mechanic)</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-semibold text-[#1D1D1F] block mb-1">
                          Billing Rate
                        </label>
                        <input
                          type="text"
                          value={deployRate}
                          onChange={(e) => setDeployRate(e.target.value)}
                          placeholder="e.g. $480 / day"
                          className="w-full h-8.5 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#1D1D1F] focus:border-black focus:outline-none font-semibold text-[#1FA855]"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-[#1D1D1F] block mb-1">
                          Deployment Status
                        </label>
                        <select
                          value={deployStatus}
                          onChange={(e) => setDeployStatus(e.target.value as DeploymentStatus)}
                          className="w-full h-8.5 rounded-lg border border-black/[0.08] bg-white px-2 text-xs text-[#1D1D1F] focus:outline-none font-semibold"
                        >
                          <option value="Active on Site">Active on Site</option>
                          <option value="Scheduled Mobilization">Scheduled Mobilization</option>
                          <option value="Demobilizing / In Transit">Demobilizing / In Transit</option>
                          <option value="Routine Service / Standby">Routine Service / Standby</option>
                          <option value="Returned to Cranborne Yard">Returned to Cranborne Yard</option>
                        </select>
                      </div>

                      <div>
                        <label className="font-semibold text-[#1D1D1F] block mb-1">
                          Contract Start Date
                        </label>
                        <input
                          type="date"
                          value={deployStartDate}
                          onChange={(e) => setDeployStartDate(e.target.value)}
                          className="w-full h-8.5 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#1D1D1F] focus:border-black focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-[#1D1D1F] block mb-1">
                          Scheduled Return Date
                        </label>
                        <input
                          type="date"
                          value={deployReturnDate}
                          onChange={(e) => setDeployReturnDate(e.target.value)}
                          className="w-full h-8.5 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#1D1D1F] focus:border-black focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Operational Notes */}
                    <div>
                      <label className="font-semibold text-[#1D1D1F] block mb-1">
                        Operational Scope & Mobilization Notes
                      </label>
                      <textarea
                        rows={2}
                        value={deployNotes}
                        onChange={(e) => setDeployNotes(e.target.value)}
                        placeholder="e.g. Overburden stripping on Reef 3. 250hr service completed on site by Cranborne field team."
                        className="w-full rounded-lg border border-black/[0.08] bg-white p-2.5 text-xs text-[#1D1D1F] focus:border-black focus:outline-none"
                      />
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex items-center justify-between border-t border-black/[0.06] pt-3.5">
                      {editingDeployment ? (
                        <button
                          type="button"
                          onClick={() => {
                            setShowDeployModal(false);
                            handleDeleteDeployment(editingDeployment.id);
                          }}
                          className="text-xs font-semibold text-red-600 hover:text-red-700 cursor-pointer"
                        >
                          Delete Deployment
                        </button>
                      ) : (
                        <div />
                      )}

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setShowDeployModal(false)}
                          className="rounded-lg border border-black/[0.08] bg-white px-4 py-2 text-xs font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-lg bg-[#1D1D1F] px-5 py-2 text-xs font-semibold text-white hover:bg-black transition-all cursor-pointer shadow-xs"
                        >
                          {editingDeployment ? "Save Changes" : "Deploy Machine"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: RECYCLE BIN */}
        {/* ========================================================================= */}
        {activeTab === "recycle" && (
          <div className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-[#1D1D1F]">Recycle Bin</h2>
                <p className="mt-0.5 text-xs text-[#86868B]">
                  Clients and machines removed from the backoffice. Restore them, or delete forever.
                </p>
              </div>
              <button
                type="button"
                disabled={recycleBin.length === 0}
                onClick={() => setPendingAction({ type: "empty-bin" })}
                className="inline-flex h-11 items-center gap-1.5 rounded-full border border-red-200 bg-white px-4 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:pointer-events-none disabled:opacity-40"
              >
                <Trash2 className="size-3.5" />
                Empty recycle bin
              </button>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-1.5">
                {(
                  [
                    { id: "all", label: "All", count: recycleBin.length },
                    {
                      id: "client",
                      label: "Clients",
                      count: recycleBin.filter((i) => i.kind === "client").length,
                    },
                    {
                      id: "product",
                      label: "Machines",
                      count: recycleBin.filter((i) => i.kind === "product").length,
                    },
                  ] as const
                ).map((f) => {
                  const active = recycleFilter === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setRecycleFilter(f.id)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all ${
                        active
                          ? "bg-[#1D1D1F] text-white shadow-xs"
                          : "border border-black/[0.06] bg-white text-[#6E6E73] hover:text-[#1D1D1F]"
                      }`}
                    >
                      <span>{f.label}</span>
                      <span className={`text-[10px] ${active ? "text-white/80" : "text-[#86868B]"}`}>
                        {f.count}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[#86868B]" />
                <input
                  type="text"
                  value={recycleSearch}
                  onChange={(e) => setRecycleSearch(e.target.value)}
                  placeholder="Search recycle bin..."
                  className="h-9 w-full rounded-full border border-black/[0.08] bg-white pl-9 pr-3 text-xs text-[#1D1D1F] placeholder-[#86868B] shadow-2xs focus:outline-none sm:w-64"
                />
              </div>
            </div>

            {selectedBinIds.length > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-[#1D1D1F] px-4 py-2.5 text-white shadow-xs">
                <span className="text-xs font-semibold">
                  {selectedBinIds.length} record{selectedBinIds.length === 1 ? "" : "s"} selected
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedBinIds([])}
                    className="rounded-full px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/10"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => setPendingAction({ type: "restore", binIds: selectedBinIds })}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-[#1D1D1F]"
                  >
                    <ArchiveRestore className="size-3.5" />
                    Restore
                  </button>
                  <button
                    type="button"
                    onClick={() => setPendingAction({ type: "destroy", binIds: selectedBinIds })}
                    className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-red-400"
                  >
                    <Trash2 className="size-3.5" />
                    Delete forever
                  </button>
                </div>
              </div>
            )}

            <div className="overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.03)]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-black/[0.06] bg-[#FBFBFC] text-[11px] font-semibold uppercase tracking-wider text-[#86868B]">
                      <th className="w-10 py-3 pl-4 pr-1">
                        <RowCheck
                          label="Select all visible recycle bin records"
                          checked={
                            filteredRecycleItems.length > 0 &&
                            filteredRecycleItems.every((i) => selectedBinIds.includes(i.binId))
                          }
                          indeterminate={
                            filteredRecycleItems.some((i) => selectedBinIds.includes(i.binId)) &&
                            !filteredRecycleItems.every((i) => selectedBinIds.includes(i.binId))
                          }
                          onChange={(next) => {
                            const ids = filteredRecycleItems.map((i) => i.binId);
                            setSelectedBinIds((prev) =>
                              next ? [...new Set([...prev, ...ids])] : prev.filter((id) => !ids.includes(id)),
                            );
                          }}
                        />
                      </th>
                      <th className="px-4 py-3">Record</th>
                      <th className="px-3 py-3">Type</th>
                      <th className="px-3 py-3">Deleted</th>
                      <th className="px-3 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.04]">
                    {filteredRecycleItems.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-16 text-center">
                          <div className="mx-auto flex max-w-sm flex-col items-center gap-2">
                            <div className="flex size-12 items-center justify-center rounded-2xl bg-black/[0.04] text-[#86868B]">
                              <Recycle className="size-5" />
                            </div>
                            <p className="text-sm font-semibold text-[#1D1D1F]">Recycle bin is empty</p>
                            <p className="text-xs text-[#86868B]">
                              Deleted clients and machines will appear here so you can restore them.
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredRecycleItems.map((item) => (
                        <tr key={item.binId} className="hover:bg-black/[0.015]">
                          <td className="w-10 py-3 pl-4 pr-1">
                            <RowCheck
                              label={`Select ${item.title}`}
                              checked={selectedBinIds.includes(item.binId)}
                              onChange={(next) =>
                                setSelectedBinIds((prev) =>
                                  next ? [...prev, item.binId] : prev.filter((id) => id !== item.binId),
                                )
                              }
                            />
                          </td>
                          <td className="px-4 py-3">
                            <span className="block font-semibold text-[#1D1D1F]">{item.title}</span>
                            <span className="block truncate text-[11px] text-[#6E6E73]">{item.subtitle}</span>
                          </td>
                          <td className="px-3 py-3">
                            <span className="rounded-full bg-black/[0.04] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#6E6E73]">
                              {item.kind === "client" ? "Client" : "Machine"}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-[#6E6E73]">{formatBinDate(item.deletedAt)}</td>
                          <td className="px-3 py-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                type="button"
                                onClick={() => setPendingAction({ type: "restore", binIds: [item.binId] })}
                                className="inline-flex h-11 items-center gap-1 rounded-full border border-black/[0.08] bg-white px-3 text-xs font-medium text-[#1D1D1F] hover:bg-[#F5F5F7]"
                              >
                                <ArchiveRestore className="size-3.5 text-[#6E6E73]" />
                                Restore
                              </button>
                              <button
                                type="button"
                                onClick={() => setPendingAction({ type: "destroy", binIds: [item.binId] })}
                                className="inline-flex size-11 items-center justify-center rounded-full border border-red-200 bg-white text-red-600 hover:bg-red-50"
                                title="Delete forever"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: ADMIN PROFILE & CREDENTIALS */}
        {/* ========================================================================= */}
        {activeTab === "profile" && (
          <div className="space-y-8 max-w-5xl mx-auto pb-12">
            {/* Page Header */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-black/[0.06] pb-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-[#1D1D1F]">
                  Administrator Profile & Security
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-[#6E6E73]">
                  Manage operations credentials, change administrator password, and monitor Hostinger MySQL database sync.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="/api/setup.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all shadow-2xs"
                >
                  <Database className="size-3.5 text-[#3D4F66]" />
                  <span>Hostinger DB Status</span>
                  <ExternalLink className="size-3 text-[#86868B]" />
                </a>
              </div>
            </div>

            {/* Profile Details & Credentials Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Profile Card & Security Form */}
              <div className="lg:col-span-7 space-y-6">
                {/* Profile Card */}
                <div className="rounded-3xl border border-black/[0.08] bg-white p-6 sm:p-7 shadow-xs">
                  <div className="flex items-center gap-4 border-b border-black/[0.06] pb-5">
                    <div className="flex size-14 items-center justify-center rounded-2xl bg-[#1D1D1F] text-white text-lg font-bold shadow-xs">
                      {adminProfile.fullName
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase() || "AD"}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#1D1D1F]">{adminProfile.fullName}</h3>
                      <p className="text-xs text-[#6E6E73]">{adminProfile.role}</p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
                          <span className="size-1.5 rounded-full bg-emerald-600" />
                          Primary Administrator
                        </span>
                        <span className="text-[11px] text-[#86868B]">Cranborne Operations</span>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSaveProfileDetails} className="mt-5 space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-[#1D1D1F] mb-1">
                          Administrator Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={profileName}
                          onChange={(e) => setProfileName(e.target.value)}
                          className="w-full h-9.5 rounded-xl border border-black/[0.12] bg-[#F9F9FB] px-3 text-xs text-[#1D1D1F] focus:border-black focus:bg-white focus:outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-[#1D1D1F] mb-1">
                          Administrative Email / Login ID
                        </label>
                        <input
                          type="email"
                          required
                          value={profileEmail}
                          onChange={(e) => setProfileEmail(e.target.value)}
                          className="w-full h-9.5 rounded-xl border border-black/[0.12] bg-[#F9F9FB] px-3 text-xs text-[#1D1D1F] focus:border-black focus:bg-white focus:outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-[#1D1D1F] mb-1">
                          Department / Title
                        </label>
                        <input
                          type="text"
                          value={profileRole}
                          onChange={(e) => setProfileRole(e.target.value)}
                          className="w-full h-9.5 rounded-xl border border-black/[0.12] bg-[#F9F9FB] px-3 text-xs text-[#1D1D1F] focus:border-black focus:bg-white focus:outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-[#1D1D1F] mb-1">
                          Direct Phone / WhatsApp
                        </label>
                        <input
                          type="text"
                          value={profilePhone}
                          onChange={(e) => setProfilePhone(e.target.value)}
                          className="w-full h-9.5 rounded-xl border border-black/[0.12] bg-[#F9F9FB] px-3 text-xs text-[#1D1D1F] focus:border-black focus:bg-white focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-[#1D1D1F] mb-1">
                        Yard Location
                      </label>
                      <input
                        type="text"
                        value={profileLocation}
                        onChange={(e) => setProfileLocation(e.target.value)}
                        className="w-full h-9.5 rounded-xl border border-black/[0.12] bg-[#F9F9FB] px-3 text-xs text-[#1D1D1F] focus:border-black focus:bg-white focus:outline-none transition-all"
                      />
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex h-9.5 items-center justify-center rounded-xl bg-[#1D1D1F] px-5 text-xs font-semibold text-white shadow-2xs hover:bg-black transition-all cursor-pointer"
                      >
                        Save Profile Details
                      </button>
                    </div>
                  </form>
                </div>

                {/* Change Password Card */}
                <div className="rounded-3xl border border-black/[0.08] bg-white p-6 sm:p-7 shadow-xs">
                  <div className="flex items-center gap-3 border-b border-black/[0.06] pb-4">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                      <KeyRound className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#1D1D1F]">Change Administrator Credentials</h3>
                      <p className="text-[11px] text-[#6E6E73]">
                        Update your login password and security access key.
                      </p>
                    </div>
                  </div>

                  {credentialSuccessMsg && (
                    <div className="mt-4 flex items-center gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-3.5 text-xs text-emerald-800">
                      <CheckCircle2 className="size-4 shrink-0 text-emerald-600" />
                      <div className="flex-1 font-medium">{credentialSuccessMsg}</div>
                    </div>
                  )}

                  {credentialErrorMsg && (
                    <div className="mt-4 flex items-center gap-2.5 rounded-2xl border border-red-200 bg-red-50/80 p-3.5 text-xs text-red-800">
                      <AlertCircle className="size-4 shrink-0 text-red-600" />
                      <div className="flex-1 font-medium">{credentialErrorMsg}</div>
                    </div>
                  )}

                  <form onSubmit={handleUpdateCredentials} className="mt-5 space-y-4 text-xs">
                    <div>
                      <label className="block font-semibold text-[#1D1D1F] mb-1">
                        Current Administrator Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentPass ? "text" : "password"}
                          required
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="Enter current password to verify identity"
                          className="w-full h-9.5 rounded-xl border border-black/[0.12] bg-[#F9F9FB] px-3 pr-10 text-xs text-[#1D1D1F] focus:border-black focus:bg-white focus:outline-none transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPass(!showCurrentPass)}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#86868B] hover:text-[#1D1D1F] cursor-pointer"
                        >
                          {showCurrentPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-[#1D1D1F] mb-1">
                          New Administrator Password *
                        </label>
                        <div className="relative">
                          <input
                            type={showNewPass ? "text" : "password"}
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Min. 8 characters"
                            className="w-full h-9.5 rounded-xl border border-black/[0.12] bg-[#F9F9FB] px-3 pr-10 text-xs text-[#1D1D1F] focus:border-black focus:bg-white focus:outline-none transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPass(!showNewPass)}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#86868B] hover:text-[#1D1D1F] cursor-pointer"
                          >
                            {showNewPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block font-semibold text-[#1D1D1F] mb-1">
                          Confirm New Password *
                        </label>
                        <input
                          type="password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Re-type new password"
                          className="w-full h-9.5 rounded-xl border border-black/[0.12] bg-[#F9F9FB] px-3 text-xs text-[#1D1D1F] focus:border-black focus:bg-white focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Password requirements */}
                    <div className="rounded-xl bg-[#F5F5F7] p-3 text-[11px] text-[#6E6E73] space-y-1">
                      <div className="font-semibold text-[#1D1D1F]">Password Guidelines:</div>
                      <ul className="list-disc pl-4 space-y-0.5">
                        <li className={newPassword.length >= 8 ? "text-emerald-700 font-medium" : ""}>
                          Minimum 8 characters
                        </li>
                        <li className={/[A-Za-z]/.test(newPassword) && /[0-9]/.test(newPassword) ? "text-emerald-700 font-medium" : ""}>
                          Contains both letters and numbers
                        </li>
                        <li className={newPassword && newPassword === confirmPassword ? "text-emerald-700 font-medium" : ""}>
                          New password and confirm password match
                        </li>
                      </ul>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        type="submit"
                        disabled={isUpdatingCredentials}
                        className="inline-flex h-9.5 items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 text-xs font-semibold text-white shadow-2xs hover:bg-amber-700 active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
                      >
                        <KeyRound className="size-3.5" />
                        <span>{isUpdatingCredentials ? "Updating Credentials..." : "Update Administrator Password"}</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Right Column: Hostinger DB Sync & Security Audit */}
              <div className="lg:col-span-5 space-y-6">
                {/* Hostinger Database Integration Card */}
                <div className="rounded-3xl border border-black/[0.08] bg-white p-6 shadow-xs space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-[#3D4F66]/10 text-[#3D4F66]">
                      <Database className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#1D1D1F]">Hostinger MySQL & PHP Backend</h3>
                      <p className="text-[11px] text-[#6E6E73]">Cranborne Yard SQL Integration</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#6E6E73] leading-relaxed">
                    The backoffice seamlessly writes to Hostinger MySQL via the secure PHP API in <code className="bg-black/[0.05] px-1 py-0.5 rounded text-[11px]">/public/api/</code>. Inbound leads from the public Quote Form are immediately recorded into the SQL database.
                  </p>

                  <div className="rounded-2xl border border-black/[0.06] bg-[#F9F9FB] p-3.5 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[#6E6E73]">API Endpoints</span>
                      <span className="font-mono text-[11px] text-emerald-700 font-semibold">Active & Live</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#6E6E73]">Database Schema</span>
                      <a
                        href="/api/schema.sql"
                        download="schema.sql"
                        className="text-[11px] font-semibold text-blue-700 hover:underline flex items-center gap-1"
                      >
                        <span>Download schema.sql</span>
                      </a>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#6E6E73]">1-Click Diagnostic</span>
                      <a
                        href="/api/setup.php"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-semibold text-purple-700 hover:underline flex items-center gap-1"
                      >
                        <span>Open /api/setup.php</span>
                        <ExternalLink className="size-3" />
                      </a>
                    </div>
                  </div>

                  <div className="border-t border-black/[0.06] pt-3 text-[11px] text-[#86868B] space-y-1">
                    <div className="font-semibold text-[#1D1D1F]">Configured Tables:</div>
                    <div>• <code className="text-[#1D1D1F]">omnicore_admin_users</code>: Credentials & profile</div>
                    <div>• <code className="text-[#1D1D1F]">omnicore_crm_leads</code>: Public website quote leads</div>
                    <div>• <code className="text-[#1D1D1F]">omnicore_equipment</code>: Machinery catalogue inventory</div>
                    <div>• <code className="text-[#1D1D1F]">omnicore_deployments</code>: Machine hire contracts</div>
                    <div>• <code className="text-[#1D1D1F]">omnicore_site_copy</code>: Live website text & phones</div>
                  </div>
                </div>

                {/* Active Session & Audit Card */}
                <div className="rounded-3xl border border-black/[0.08] bg-white p-6 shadow-xs space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                      <ShieldCheck className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#1D1D1F]">Session & Security Audit</h3>
                      <p className="text-[11px] text-[#6E6E73]">Access Status & Authentication Log</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-black/[0.04]">
                      <span className="text-[#6E6E73]">Authenticated User</span>
                      <span className="font-semibold text-[#1D1D1F]">{adminProfile.email}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-black/[0.04]">
                      <span className="text-[#6E6E73]">Session State</span>
                      <span className="font-semibold text-emerald-700">Active & Verified</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-black/[0.04]">
                      <span className="text-[#6E6E73]">Last Password Change</span>
                      <span className="font-medium text-[#1D1D1F]">{adminProfile.lastPasswordChange}</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-[#6E6E73]">Last Login Recorded</span>
                      <span className="font-medium text-[#1D1D1F]">{adminProfile.lastLogin}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50/50 py-2.5 text-xs font-semibold text-red-700 hover:bg-red-100/60 transition-all cursor-pointer"
                    >
                      <LogOut className="size-3.5" />
                      <span>Sign Out from Backoffice</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {pendingConfirm && pendingAction && (
        <ConfirmModal
          title={pendingConfirm.title}
          body={pendingConfirm.body}
          confirmLabel={pendingConfirm.confirmLabel}
          tone={pendingConfirm.tone}
          onCancel={() => setPendingAction(null)}
          onConfirm={runPendingAction}
        />
      )}
        </>
      )}
    </div>
  );
}
