import { i as __toESM } from "../_runtime.mjs";
import { d as whatsappUrl } from "./site-NmzgmCl5.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as ArchiveRestore, A as KeyRound, B as Clock, D as LogOut, E as Mail, F as FileText, G as ChevronRight, H as CircleAlert, I as Eye, J as Check, K as ChevronLeft, L as EyeOff, N as ImagePlus, O as Lock, P as Globe, R as ExternalLink, T as MapPin, U as ChevronsRight, V as CircleCheck, W as ChevronsLeft, Y as Building2, _ as Phone, a as Users, b as Package, c as TriangleAlert, d as Sparkles, f as ShieldCheck, g as Plus, h as Recycle, j as Kanban, k as LayoutGrid, l as Trash2, m as RotateCcw, o as Upload, p as Search, r as X, s as Truck, t as ZoomIn, u as Table, w as Maximize2, y as PenLine, z as Database } from "../_libs/lucide-react.mjs";
import { E as WhatsAppIcon, _ as saveStoredSiteCopy, a as DEFAULT_DEPLOYMENTS, c as getStoredDeployments, d as getStoredSiteCopy, f as resetStoredSiteCopy, g as saveStoredRecycleBin, h as saveStoredEquipment, l as getStoredEquipment, m as saveStoredDeployments, p as saveStoredCRMClients, s as getStoredCRMClients, u as getStoredRecycleBin, v as toRecycleClient, x as apiClient, y as toRecycleProduct } from "./router-DUSCuKUA.mjs";
import { t as ProductPhotoLightbox } from "./product-photo-lightbox-9HwvvrXG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-BLrmYfph.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PROFILE_STORAGE_KEY = "omnicore_admin_profile";
var AUTH_FLAG_KEY = "omnicore_admin_authenticated";
var PASSWORD_STORAGE_KEY = "omnicore_admin_pwd_sec";
var DEFAULT_ADMIN_PROFILE = {
	email: "admin@omnicore.co.zw",
	fullName: "Harare Operations Administrator",
	role: "Lead Plant & Inventory Manager",
	phone: "+263 77 733 4569",
	yardLocation: "115 Chiremba Road, Cranborne, Harare",
	lastPasswordChange: "Initial Commissioning",
	lastLogin: "Active Session"
};
function getStoredAdminProfile() {
	if (typeof window === "undefined") return DEFAULT_ADMIN_PROFILE;
	try {
		const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
		if (!raw) return DEFAULT_ADMIN_PROFILE;
		const parsed = JSON.parse(raw);
		return {
			...DEFAULT_ADMIN_PROFILE,
			...parsed
		};
	} catch {
		return DEFAULT_ADMIN_PROFILE;
	}
}
function saveStoredAdminProfile(profile) {
	const updated = {
		...getStoredAdminProfile(),
		...profile
	};
	try {
		localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updated));
	} catch {}
	return updated;
}
function verifyAdminPassword(inputPass) {
	if (typeof window === "undefined") return false;
	try {
		const storedCustomPass = localStorage.getItem(PASSWORD_STORAGE_KEY);
		if (storedCustomPass) return inputPass === storedCustomPass;
	} catch {}
	return inputPass === "Admin123!";
}
function setAdminPassword(newPass) {
	try {
		localStorage.setItem(PASSWORD_STORAGE_KEY, newPass);
		saveStoredAdminProfile({ lastPasswordChange: (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "short",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		}) });
	} catch {}
}
function isSessionAuthenticated() {
	if (typeof window === "undefined") return false;
	try {
		return sessionStorage.getItem(AUTH_FLAG_KEY) === "true" || localStorage.getItem(AUTH_FLAG_KEY) === "true";
	} catch {
		return false;
	}
}
function setSessionAuthenticated(remember) {
	try {
		if (remember) localStorage.setItem(AUTH_FLAG_KEY, "true");
		else sessionStorage.setItem(AUTH_FLAG_KEY, "true");
		saveStoredAdminProfile({ lastLogin: (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "short",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit"
		}) });
	} catch {}
}
function clearSessionAuthentication() {
	try {
		localStorage.removeItem(AUTH_FLAG_KEY);
		sessionStorage.removeItem(AUTH_FLAG_KEY);
	} catch {}
}
var STAGES = [
	"Lead",
	"Discovery",
	"Tender Quoted",
	"Negotiation",
	"Won",
	"Lost"
];
var PROVINCES = [
	"All Zimbabwe",
	"Harare",
	"Mashonaland West",
	"Mashonaland Central",
	"Mashonaland East",
	"Midlands",
	"Matabeleland North",
	"Matabeleland South",
	"Manicaland",
	"Masvingo"
];
var YARD_PHOTO_PRESETS = [
	{
		label: "Jaw Crusher",
		src: "/images/jaw-crusher.jpg",
		category: "mining",
		spec: "5–15 TPH Primary Crush",
		badge: "Gold Ore Circuit"
	},
	{
		label: "Ball Mill",
		src: "/images/ball-mill.jpg",
		category: "mining",
		spec: "Continuous Wet Grinding",
		badge: "Milling Circuit"
	},
	{
		label: "Mining Hammer Mill",
		src: "/images/hammer-mill.jpg",
		category: "mining",
		spec: "1.5–3.0 TPH High Speed",
		badge: "Fine Reduction"
	},
	{
		label: "Gold Separator",
		src: "/images/gold-separator.jpg",
		category: "mining",
		spec: "Centrifugal Concentrator",
		badge: "Free Gold"
	},
	{
		label: "Trommel Wash Plant",
		src: "/images/trommel.jpg",
		category: "mining",
		spec: "15–30 TPH Scrub & Screen",
		badge: "Alluvial Gold"
	},
	{
		label: "Shaking Table",
		src: "/images/shaking-table.jpg",
		category: "mining",
		spec: "6-S Deck Gravity Separator",
		badge: "Concentrate Clean"
	},
	{
		label: "Slurry Pump",
		src: "/images/slurry-pump.jpg",
		category: "mining",
		spec: "High-Head Heavy Slurry",
		badge: "Tailings / Circuit"
	},
	{
		label: "CAT 320D Excavator",
		src: "/images/excavator.jpg",
		category: "hire",
		spec: "20-Tonne Digger · 1.0m³ Bucket",
		badge: "Wet / Dry Fleet"
	},
	{
		label: "37m Concrete Boom Pump",
		src: "/images/concrete-pump.jpg",
		category: "hire",
		spec: "37m Vertical · 125m³/h",
		badge: "Boom Pump Fleet"
	},
	{
		label: "Self-Loading Mixer",
		src: "/images/self-loading-mixer.jpg",
		category: "hire",
		spec: "4.0m³ Batch · 4x4 Off-Road",
		badge: "Mobile Batching"
	},
	{
		label: "TLB Backhoe",
		src: "/images/tlb.jpg",
		category: "hire",
		spec: "4x4 Turbo Heavy Backhoe",
		badge: "Trench & Civils"
	},
	{
		label: "Motor Grader",
		src: "/images/grader.jpg",
		category: "hire",
		spec: "140hp · 12ft Heavy Blade",
		badge: "Haul Roads"
	},
	{
		label: "Farm Hammer Mill",
		src: "/images/farm-hammer-mill.jpg",
		category: "farming",
		spec: "Maize & Grain 1–2 TPH",
		badge: "Stockfeed Milling"
	},
	{
		label: "Feed Mixer (Vertical)",
		src: "/images/feed-mixer.jpg",
		category: "farming",
		spec: "500kg – 1-Tonne Batch",
		badge: "Poultry & Dairy"
	},
	{
		label: "Feed Mixer 3-Tonne",
		src: "/images/feed-mixer-3t.jpg",
		category: "farming",
		spec: "3-Tonne Commercial Batch",
		badge: "Commercial Feedlot"
	},
	{
		label: "Ice Block Plant",
		src: "/images/ice-block.jpg",
		category: "farming",
		spec: "1–5 Tonne / 24h Blocks",
		badge: "Cold Chain Storage"
	},
	{
		label: "Electric Fence Machine",
		src: "/images/electric-fence.jpg",
		category: "hardware",
		spec: "Automated Diamond Mesh",
		badge: "Wire Weaving"
	},
	{
		label: "Barbed Wire Machine",
		src: "/images/barbed-wire.jpg",
		category: "hardware",
		spec: "High-Speed Dual Strand",
		badge: "Perimeter Security"
	},
	{
		label: "Diesel Fence Machine",
		src: "/images/diesel-fence.jpg",
		category: "hardware",
		spec: "Independent Generator Drive",
		badge: "Off-Grid Production"
	},
	{
		label: "Double-Twist Fence",
		src: "/images/double-fence.jpg",
		category: "hardware",
		spec: "Heavy Hexagonal Mesh",
		badge: "Mining & Game Fence"
	},
	{
		label: "3-Phase Electric Motor",
		src: "/images/electric-motor.jpg",
		category: "industry",
		spec: "7.5kW to 55kW 380V",
		badge: "Heavy Duty Drive"
	},
	{
		label: "Diesel Generator Kit",
		src: "/images/generator.jpg",
		category: "industry",
		spec: "15kVA to 150kVA Silent",
		badge: "Standby Power"
	},
	{
		label: "Industrial Air Compressor",
		src: "/images/compressor.jpg",
		category: "industry",
		spec: "8–12 Bar Heavy Duty",
		badge: "Pneumatic Power"
	}
];
function RecordPager({ index, total, title, subtitle, onBack, backLabel, onPrev, onNext }) {
	const atStart = index <= 0;
	const atEnd = index < 0 || index >= total - 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3 min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onBack,
				className: "mt-0.5 inline-flex h-11 shrink-0 items-center gap-1 rounded-full border border-black/[0.08] bg-white px-3.5 text-xs font-medium text-[#1D1D1F] shadow-2xs hover:bg-[#F5F5F7]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), backLabel]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "truncate text-lg font-semibold tracking-tight text-[#1D1D1F]",
					children: title
				}), subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-xs text-[#86868B]",
					children: subtitle
				}) : null]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1.5 self-end sm:self-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onPrev,
					disabled: atStart,
					className: "inline-flex h-11 items-center gap-1 rounded-full border border-black/[0.08] bg-white px-3.5 text-xs font-medium text-[#1D1D1F] shadow-2xs hover:bg-[#F5F5F7] disabled:pointer-events-none disabled:opacity-30",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), "Previous"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-16 px-2 text-center text-xs font-medium text-[#6E6E73]",
					children: index < 0 ? "—" : `${index + 1} of ${total}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: onNext,
					disabled: atEnd,
					className: "inline-flex h-11 items-center gap-1 rounded-full border border-black/[0.08] bg-white px-3.5 text-xs font-medium text-[#1D1D1F] shadow-2xs hover:bg-[#F5F5F7] disabled:pointer-events-none disabled:opacity-30",
					children: ["Next", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
				})
			]
		})]
	});
}
function RowCheck({ checked, indeterminate, onChange, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type: "checkbox",
		"aria-label": label,
		checked,
		ref: (el) => {
			if (el) el.indeterminate = Boolean(indeterminate && !checked);
		},
		onChange: (e) => onChange(e.target.checked),
		className: "size-4 shrink-0 cursor-pointer rounded border-black/25 accent-[#1D1D1F]"
	});
}
function ConfirmModal({ title, body, confirmLabel, tone = "danger", onCancel, onConfirm }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[70] flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm",
		onClick: onCancel,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-2xl border border-black/[0.08] bg-white p-5 shadow-2xl",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `flex size-10 shrink-0 items-center justify-center rounded-xl ${tone === "danger" ? "bg-red-50 text-red-600" : "bg-black/[0.05] text-[#1D1D1F]"}`,
					children: tone === "danger" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Recycle, { className: "size-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-base font-semibold text-[#1D1D1F]",
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs leading-relaxed text-[#6E6E73]",
						children: body
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex justify-end gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onCancel,
					className: "inline-flex h-11 items-center rounded-full border border-black/[0.08] bg-white px-4 text-xs font-medium text-[#1D1D1F] hover:bg-[#F5F5F7]",
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onConfirm,
					className: `inline-flex h-11 items-center rounded-full px-4 text-xs font-semibold text-white ${tone === "danger" ? "bg-red-600 hover:bg-red-700" : "bg-[#1D1D1F] hover:bg-black"}`,
					children: confirmLabel
				})]
			})]
		})
	});
}
function formatBinDate(iso) {
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return iso;
	return d.toLocaleString("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	});
}
function stageChipClass(stage) {
	if (stage === "Won") return "bg-[#E8F8EE] text-[#1B833E]";
	if (stage === "Tender Quoted") return "bg-[#FFF4E5] text-[#B25E00]";
	if (stage === "Negotiation") return "bg-purple-50 text-purple-700";
	if (stage === "Lead") return "bg-blue-50 text-blue-700";
	if (stage === "Lost") return "bg-red-50 text-red-700";
	return "bg-black/[0.05] text-[#1D1D1F]";
}
function AdminBackoffice() {
	const [isAuthenticated, setIsAuthenticated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setIsAuthenticated(isSessionAuthenticated());
	}, []);
	const [adminProfile, setAdminProfile] = (0, import_react.useState)(getStoredAdminProfile);
	const [profileName, setProfileName] = (0, import_react.useState)(adminProfile.fullName);
	const [profileEmail, setProfileEmail] = (0, import_react.useState)(adminProfile.email);
	const [profileRole, setProfileRole] = (0, import_react.useState)(adminProfile.role);
	const [profilePhone, setProfilePhone] = (0, import_react.useState)(adminProfile.phone);
	const [profileLocation, setProfileLocation] = (0, import_react.useState)(adminProfile.yardLocation);
	const [currentPassword, setCurrentPassword] = (0, import_react.useState)("");
	const [newPassword, setNewPassword] = (0, import_react.useState)("");
	const [confirmPassword, setConfirmPassword] = (0, import_react.useState)("");
	const [showCurrentPass, setShowCurrentPass] = (0, import_react.useState)(false);
	const [showNewPass, setShowNewPass] = (0, import_react.useState)(false);
	const [isUpdatingCredentials, setIsUpdatingCredentials] = (0, import_react.useState)(false);
	const [credentialSuccessMsg, setCredentialSuccessMsg] = (0, import_react.useState)(null);
	const [credentialErrorMsg, setCredentialErrorMsg] = (0, import_react.useState)(null);
	const [loginEmail, setLoginEmail] = (0, import_react.useState)("");
	const [loginPassword, setLoginPassword] = (0, import_react.useState)("");
	const [showLoginPassword, setShowLoginPassword] = (0, import_react.useState)(false);
	const [loginRemember, setLoginRemember] = (0, import_react.useState)(true);
	const [loginError, setLoginError] = (0, import_react.useState)(null);
	const [isSubmittingLogin, setIsSubmittingLogin] = (0, import_react.useState)(false);
	function handleLogin(e) {
		e.preventDefault();
		setLoginError(null);
		setIsSubmittingLogin(true);
		const inputUser = loginEmail.trim().toLowerCase();
		const inputPass = loginPassword.trim();
		const profile = getStoredAdminProfile();
		if ((inputUser === profile.email.toLowerCase() || inputUser === "admin" || inputUser === "admin@omnicore.co.zw" || inputUser === "admin@omnisolutions.local") && verifyAdminPassword(inputPass)) setTimeout(() => {
			setSessionAuthenticated(loginRemember);
			setIsAuthenticated(true);
			setIsSubmittingLogin(false);
			triggerToast("Welcome back! Verified Omnicore Operations Desk.");
			apiClient.login(inputUser, inputPass).catch(() => {});
		}, 300);
		else apiClient.login(inputUser, inputPass).then((res) => {
			if (res.success && res.user) {
				setSessionAuthenticated(loginRemember);
				setIsAuthenticated(true);
				const updated = saveStoredAdminProfile({
					email: res.user.email,
					fullName: res.user.fullName || profile.fullName
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
	function handleLogout() {
		clearSessionAuthentication();
		setIsAuthenticated(false);
		setLoginPassword("");
		triggerToast("Logged out of Operations Backoffice");
	}
	function handleSaveProfileDetails(e) {
		e.preventDefault();
		const updated = saveStoredAdminProfile({
			fullName: profileName.trim(),
			email: profileEmail.trim(),
			role: profileRole.trim(),
			phone: profilePhone.trim(),
			yardLocation: profileLocation.trim()
		});
		setAdminProfile(updated);
		apiClient.updateProfile(updated).catch(() => {});
		triggerToast("Administrator profile details updated successfully!");
	}
	async function handleUpdateCredentials(e) {
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
				setAdminProfile((prev) => ({
					...prev,
					email: profileEmail.trim()
				}));
			}
			await apiClient.changeCredentials(currentPassword.trim(), newPassword.trim(), profileEmail.trim());
			setCredentialSuccessMsg("Credentials updated securely! Your new password is now active.");
			triggerToast("Administrator credentials changed successfully!");
			setCurrentPassword("");
			setNewPassword("");
			setConfirmPassword("");
		} catch (err) {
			setCredentialErrorMsg(err?.message || "Failed to update credentials.");
		} finally {
			setIsUpdatingCredentials(false);
		}
	}
	const [activeTab, setActiveTab] = (0, import_react.useState)("crm");
	const [clients, setClients] = (0, import_react.useState)(getStoredCRMClients);
	const [equipmentList, setEquipmentList] = (0, import_react.useState)(getStoredEquipment);
	const [siteCopy, setSiteCopy] = (0, import_react.useState)(getStoredSiteCopy);
	const [crmSearch, setCrmSearch] = (0, import_react.useState)("");
	const [crmStageFilter, setCrmStageFilter] = (0, import_react.useState)("All");
	const [crmProvinceFilter, setCrmProvinceFilter] = (0, import_react.useState)("All Zimbabwe");
	const [peekClientId, setPeekClientId] = (0, import_react.useState)(null);
	const [profileClientId, setProfileClientId] = (0, import_react.useState)(null);
	const [clientDraft, setClientDraft] = (0, import_react.useState)(null);
	const [showAddClientModal, setShowAddClientModal] = (0, import_react.useState)(false);
	const [newClientName, setNewClientName] = (0, import_react.useState)("");
	const [newClientOrg, setNewClientOrg] = (0, import_react.useState)("");
	const [newClientPhone, setNewClientPhone] = (0, import_react.useState)("+263 ");
	const [newClientEmail, setNewClientEmail] = (0, import_react.useState)("");
	const [newClientLocation, setNewClientLocation] = (0, import_react.useState)("Harare");
	const [newClientProvince, setNewClientProvince] = (0, import_react.useState)("Harare");
	const [newClientService, setNewClientService] = (0, import_react.useState)("Mining Equipment");
	const [newClientInterest, setNewClientInterest] = (0, import_react.useState)("");
	const [newClientIntent, setNewClientIntent] = (0, import_react.useState)("Buy");
	const [newClientDealValue, setNewClientDealValue] = (0, import_react.useState)("12000");
	const [newClientPriority, setNewClientPriority] = (0, import_react.useState)("High");
	const [newClientNotes, setNewClientNotes] = (0, import_react.useState)("");
	const [newTimelineNote, setNewTimelineNote] = (0, import_react.useState)("");
	const [productSearch, setProductSearch] = (0, import_react.useState)("");
	const [productCategoryFilter, setProductCategoryFilter] = (0, import_react.useState)("all");
	const [peekProductId, setPeekProductId] = (0, import_react.useState)(null);
	const [productProfileOpen, setProductProfileOpen] = (0, import_react.useState)(false);
	const [editingProduct, setEditingProduct] = (0, import_react.useState)(null);
	const [showAddProductModal, setShowAddProductModal] = (0, import_react.useState)(false);
	const [newProdName, setNewProdName] = (0, import_react.useState)("");
	const [newProdCategory, setNewProdCategory] = (0, import_react.useState)("mining");
	const [newProdThroughput, setNewProdThroughput] = (0, import_react.useState)("");
	const [newProdPower, setNewProdPower] = (0, import_react.useState)("");
	const [newProdPrice, setNewProdPrice] = (0, import_react.useState)("");
	const [newProdBlurb, setNewProdBlurb] = (0, import_react.useState)("");
	const [newProdImage, setNewProdImage] = (0, import_react.useState)("/images/jaw-crusher.jpg");
	const [newProdGallery, setNewProdGallery] = (0, import_react.useState)([]);
	const [isCmsPreviewOpen, setIsCmsPreviewOpen] = (0, import_react.useState)(true);
	const [deploymentsList, setDeploymentsList] = (0, import_react.useState)(getStoredDeployments);
	const [deploymentSearch, setDeploymentSearch] = (0, import_react.useState)("");
	const [deploymentStatusFilter, setDeploymentStatusFilter] = (0, import_react.useState)("all");
	const [deploymentProvinceFilter, setDeploymentProvinceFilter] = (0, import_react.useState)("all");
	const [deploymentCategoryFilter, setDeploymentCategoryFilter] = (0, import_react.useState)("all");
	const [deploymentSortBy, setDeploymentSortBy] = (0, import_react.useState)("return-soon");
	const [deploymentViewMode, setDeploymentViewMode] = (0, import_react.useState)("table");
	const [deploymentPage, setDeploymentPage] = (0, import_react.useState)(1);
	const [deploymentPageSize, setDeploymentPageSize] = (0, import_react.useState)(10);
	const [showDeployModal, setShowDeployModal] = (0, import_react.useState)(false);
	const [editingDeployment, setEditingDeployment] = (0, import_react.useState)(null);
	const [deployMachineId, setDeployMachineId] = (0, import_react.useState)("");
	const [deployPlant, setDeployPlant] = (0, import_react.useState)("");
	const [deployCategory, setDeployCategory] = (0, import_react.useState)("hire");
	const [deploySku, setDeploySku] = (0, import_react.useState)("");
	const [deployImage, setDeployImage] = (0, import_react.useState)("/images/cat-excavator.jpg");
	const [deployClient, setDeployClient] = (0, import_react.useState)("");
	const [deploySite, setDeploySite] = (0, import_react.useState)("");
	const [deployProvince, setDeployProvince] = (0, import_react.useState)("Harare");
	const [deployOperator, setDeployOperator] = (0, import_react.useState)("Wet Rate (With Certified Operator)");
	const [deployRate, setDeployRate] = (0, import_react.useState)("$480 / day");
	const [deployStatus, setDeployStatus] = (0, import_react.useState)("Active on Site");
	const [deployStartDate, setDeployStartDate] = (0, import_react.useState)((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [deployReturnDate, setDeployReturnDate] = (0, import_react.useState)("");
	const [deployContractRef, setDeployContractRef] = (0, import_react.useState)(`CNT-${(/* @__PURE__ */ new Date()).getFullYear()}-${Math.floor(100 + Math.random() * 900)}`);
	const [deployContactPerson, setDeployContactPerson] = (0, import_react.useState)("");
	const [deployContactPhone, setDeployContactPhone] = (0, import_react.useState)("+263 ");
	const [deployNotes, setDeployNotes] = (0, import_react.useState)("");
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
		setDeployStartDate((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
		setDeployReturnDate("");
		setDeployContractRef(`CNT-${(/* @__PURE__ */ new Date()).getFullYear()}-${Math.floor(100 + Math.random() * 900)}`);
		setDeployContactPerson("");
		setDeployContactPhone("+263 ");
		setDeployNotes("");
	}
	function openCreateDeployment() {
		setEditingDeployment(null);
		resetDeployForm();
		setShowDeployModal(true);
	}
	function openEditDeployment(dep) {
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
	function handleSaveDeployment(e) {
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
			const updated = {
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
				notes: deployNotes.trim()
			};
			const nextList = deploymentsList.map((d) => d.id === editingDeployment.id ? updated : d);
			setDeploymentsList(nextList);
			saveStoredDeployments(nextList);
			triggerToast(`Updated ${updated.plant} (${updated.id})`);
		} else {
			const nextNum = deploymentsList.length + 1;
			const newRecord = {
				id: `DEP-${String(nextNum).padStart(2, "0")}`,
				productId: deployMachineId || void 0,
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
				startDate: deployStartDate || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				scheduledReturn: deployReturnDate || new Date(Date.now() + 2592e6).toISOString().slice(0, 10),
				contractRef: deployContractRef.trim() || `CNT-${(/* @__PURE__ */ new Date()).getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
				contactPerson: deployContactPerson.trim(),
				contactPhone: deployContactPhone.trim(),
				notes: deployNotes.trim()
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
	function handleDeleteDeployment(id) {
		const target = deploymentsList.find((d) => d.id === id);
		if (!target) return;
		setPendingAction({
			type: "delete-deployment",
			id,
			name: `${target.plant} (${target.client})`
		});
	}
	function handleConfirmDeleteDeployment(id) {
		const nextList = deploymentsList.filter((d) => d.id !== id);
		setDeploymentsList(nextList);
		saveStoredDeployments(nextList);
		triggerToast(`Deleted deployment ${id}`);
	}
	function handleQuickStatusChange(id, newStatus) {
		const nextList = deploymentsList.map((d) => d.id === id ? {
			...d,
			status: newStatus
		} : d);
		setDeploymentsList(nextList);
		saveStoredDeployments(nextList);
		triggerToast(`Deployment ${id} status set to "${newStatus}"`);
	}
	function handleResetDefaultDeployments() {
		setDeploymentsList(DEFAULT_DEPLOYMENTS);
		saveStoredDeployments(DEFAULT_DEPLOYMENTS);
		triggerToast("Reset field deployments to factory defaults");
	}
	function handleDeployImageUpload(e) {
		const files = e.target.files;
		if (!files || files.length === 0) return;
		const f = files[0];
		if (f.size > 12582912) {
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
	function handleImageUpload(e, isEditing = false, asGalleryItem = false) {
		const files = e.target.files;
		if (!files || files.length === 0) return;
		const fileList = [];
		for (let i = 0; i < files.length; i++) {
			const f = files[i];
			if (f.size > 12582912) triggerToast(`${f.name} is too large (>12MB)`);
			else fileList.push(f);
		}
		if (fileList.length === 0) return;
		let loaded = 0;
		const loadedUrls = [];
		fileList.forEach((file) => {
			const reader = new FileReader();
			reader.onload = (event) => {
				const result = event.target?.result;
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
									gallery: [...currentGallery, ...rest]
								});
								triggerToast(`Updated primary photo and added ${rest.length} photo(s) to gallery`);
							} else {
								setEditingProduct({
									...editingProduct,
									gallery: [...currentGallery, ...loadedUrls]
								});
								triggerToast(`Added ${loadedUrls.length} photo(s) to product gallery`);
							}
						} else {
							setEditingProduct({
								...editingProduct,
								image: loadedUrls[0]
							});
							triggerToast("Primary photo updated successfully!");
						}
					} else if (asGalleryItem || loadedUrls.length > 1) {
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
			};
			reader.readAsDataURL(file);
		});
	}
	function handleAddGalleryUrl(url, isEditing = false) {
		if (!url.trim()) return;
		if (isEditing && editingProduct) {
			const currentGallery = editingProduct.gallery || [];
			if (!currentGallery.includes(url.trim())) {
				setEditingProduct({
					...editingProduct,
					gallery: [...currentGallery, url.trim()]
				});
				triggerToast("Added photo to product gallery");
			}
		} else if (!newProdGallery.includes(url.trim())) {
			setNewProdGallery((prev) => [...prev, url.trim()]);
			triggerToast("Added photo to product gallery");
		}
	}
	function handleRemoveGalleryPhoto(index, isEditing = false) {
		if (isEditing && editingProduct) {
			const currentGallery = [...editingProduct.gallery || []];
			currentGallery.splice(index, 1);
			setEditingProduct({
				...editingProduct,
				gallery: currentGallery
			});
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
	function handleCreateProduct(e) {
		e.preventDefault();
		if (!newProdName.trim()) return;
		const newEquip = {
			id: newProdName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
			name: newProdName.trim(),
			category: newProdCategory,
			intent: newProdCategory === "hire" ? "hire" : "sale",
			blurb: newProdBlurb.trim() || "Heavy machinery engineered for Zimbabwean site conditions.",
			image: newProdImage || "/images/jaw-crusher.jpg",
			imageAlt: newProdName,
			gallery: newProdGallery.length > 0 ? newProdGallery : void 0,
			spec: newProdThroughput.trim() || "Heavy-duty specification",
			sku: `OMNI-${newProdCategory.toUpperCase().slice(0, 3)}-${Math.floor(100 + Math.random() * 900)}`,
			stockStatus: "In Yard Cranborne",
			throughput: newProdThroughput.trim() || "Site Rated",
			powerOption: newProdPower.trim() || "Electric 3-Phase / Diesel",
			priceUSD: newProdPrice.trim() || "Tender on Request",
			condition: "New",
			warrantyMonths: 12,
			detailedNotes: "Full parts backup and field commissioning from Cranborne yard."
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
	const [crmPage, setCrmPage] = (0, import_react.useState)(1);
	const [crmPageSize, setCrmPageSize] = (0, import_react.useState)(5);
	const [productPage, setProductPage] = (0, import_react.useState)(1);
	const [productPageSize, setProductPageSize] = (0, import_react.useState)(6);
	const [cmsForm, setCmsForm] = (0, import_react.useState)(siteCopy);
	const [cmsCategory, setCmsCategory] = (0, import_react.useState)("hero");
	const [cmsSearch, setCmsSearch] = (0, import_react.useState)("");
	const [cmsPreviewTab, setCmsPreviewTab] = (0, import_react.useState)("hero");
	const [cmsLayoutMode, setCmsLayoutMode] = (0, import_react.useState)("full");
	const [hasUnsavedChanges, setHasUnsavedChanges] = (0, import_react.useState)(false);
	const [newPresetCategoryFilter, setNewPresetCategoryFilter] = (0, import_react.useState)("all");
	const [newPhotoPresetSearch, setNewPhotoPresetSearch] = (0, import_react.useState)("");
	const [zoomedPhoto, setZoomedPhoto] = (0, import_react.useState)(null);
	const [productLightbox, setProductLightbox] = (0, import_react.useState)(null);
	function openProductLightbox(item, initialIndex = 0) {
		const images = [item.image, ...item.gallery || []].filter((img) => Boolean(img));
		setProductLightbox({
			isOpen: true,
			title: item.name,
			category: item.category,
			spec: item.spec,
			price: item.price,
			sku: item.sku || item.id,
			images: images.length > 0 ? images : ["/images/hero.jpg"],
			initialIndex
		});
	}
	const [toastMessage, setToastMessage] = (0, import_react.useState)(null);
	const [recycleBin, setRecycleBin] = (0, import_react.useState)(getStoredRecycleBin);
	const [selectedClientIds, setSelectedClientIds] = (0, import_react.useState)([]);
	const [selectedProductIds, setSelectedProductIds] = (0, import_react.useState)([]);
	const [selectedBinIds, setSelectedBinIds] = (0, import_react.useState)([]);
	const [recycleFilter, setRecycleFilter] = (0, import_react.useState)("all");
	const [recycleSearch, setRecycleSearch] = (0, import_react.useState)("");
	const [pendingAction, setPendingAction] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
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
	function triggerToast(msg) {
		setToastMessage(msg);
		setTimeout(() => setToastMessage(null), 3200);
	}
	function updateClientStage(id, stage) {
		const updated = clients.map((c) => {
			if (c.id === id) {
				const newTimeline = [{
					date: "Today",
					note: `Deal stage updated to "${stage}"`,
					author: "Technical Desk"
				}, ...c.timeline];
				return {
					...c,
					stage,
					timeline: newTimeline
				};
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
			author: "Technical Desk"
		};
		const updated = clients.map((c) => c.id === clientDraft.id ? {
			...c,
			timeline: [noteEntry, ...c.timeline]
		} : c);
		setClients(updated);
		saveStoredCRMClients(updated);
		setClientDraft((prev) => prev ? {
			...prev,
			timeline: [noteEntry, ...prev.timeline]
		} : null);
		setNewTimelineNote("");
		triggerToast("Activity note logged");
	}
	function handleCreateClient(e) {
		e.preventDefault();
		if (!newClientName.trim()) return;
		const valNum = parseFloat(newClientDealValue.replace(/[^0-9.]/g, "")) || 0;
		const newRecord = {
			id: `CRM-${Math.floor(1e3 + Math.random() * 9e3)}`,
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
			timeline: [{
				date: "Today",
				note: "Client record created in Omnicore CRM.",
				author: "Technical Desk"
			}]
		};
		const updated = [newRecord, ...clients];
		setClients(updated);
		saveStoredCRMClients(updated);
		setShowAddClientModal(false);
		setPeekClientId(null);
		setProfileClientId(newRecord.id);
		setClientDraft(newRecord);
		triggerToast(`Client ${newRecord.name} added to pipeline`);
		setNewClientName("");
		setNewClientOrg("");
		setNewClientInterest("");
		setNewClientNotes("");
	}
	function handleSaveClient(e) {
		e.preventDefault();
		if (!clientDraft) return;
		const valNum = Number(clientDraft.dealValue) || 0;
		const next = {
			...clientDraft,
			dealValue: valNum,
			dealValueDisplay: `$${valNum.toLocaleString()}`
		};
		const updated = clients.map((c) => c.id === next.id ? next : c);
		setClients(updated);
		saveStoredCRMClients(updated);
		setClientDraft(next);
		triggerToast(`Saved ${next.name}`);
	}
	function handleSaveProduct(e) {
		e.preventDefault();
		if (!editingProduct) return;
		const updated = equipmentList.map((item) => item.id === editingProduct.id ? editingProduct : item);
		setEquipmentList(updated);
		saveStoredEquipment(updated);
		triggerToast(`Updated ${editingProduct.name}`);
	}
	function handleDeleteProduct(id) {
		setPendingAction({
			type: "delete-products",
			ids: [id]
		});
	}
	function moveClientsToBin(ids) {
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
		triggerToast(toBin.length === 1 ? `${toBin[0].name} moved to recycle bin` : `${toBin.length} clients moved to recycle bin`);
	}
	function moveProductsToBin(ids) {
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
		triggerToast(toBin.length === 1 ? `${toBin[0].name} moved to recycle bin` : `${toBin.length} machines moved to recycle bin`);
	}
	function restoreBinItems(binIds) {
		if (binIds.length === 0) return;
		const idSet = new Set(binIds);
		const toRestore = recycleBin.filter((item) => idSet.has(item.binId));
		const remainingBin = recycleBin.filter((item) => !idSet.has(item.binId));
		let nextClients = clients;
		let nextEquip = equipmentList;
		for (const item of toRestore) if (item.kind === "client") {
			const snap = item.snapshot;
			const exists = nextClients.some((c) => c.id === snap.id);
			nextClients = [{
				...snap,
				id: exists ? `${snap.id}-R` : snap.id
			}, ...nextClients];
		} else {
			const snap = item.snapshot;
			const exists = nextEquip.some((p) => p.id === snap.id);
			nextEquip = [{
				...snap,
				id: exists ? `${snap.id}-restored` : snap.id
			}, ...nextEquip];
		}
		setRecycleBin(remainingBin);
		saveStoredRecycleBin(remainingBin);
		setClients(nextClients);
		saveStoredCRMClients(nextClients);
		setEquipmentList(nextEquip);
		saveStoredEquipment(nextEquip);
		setSelectedBinIds((prev) => prev.filter((id) => !idSet.has(id)));
		triggerToast(toRestore.length === 1 ? `Restored ${toRestore[0].title}` : `Restored ${toRestore.length} records`);
	}
	function destroyBinItems(binIds) {
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
	function handleToggleStockStatus(id) {
		const updated = equipmentList.map((item) => {
			if (item.id === id) {
				const nextStatus = item.stockStatus === "In Yard Cranborne" ? "In Transit (Beitbridge)" : item.stockStatus === "In Transit (Beitbridge)" ? "Active on Site" : "In Yard Cranborne";
				return {
					...item,
					stockStatus: nextStatus
				};
			}
			return item;
		});
		setEquipmentList(updated);
		saveStoredEquipment(updated);
		triggerToast("Stock status updated");
	}
	function handleSaveSiteCopy(e) {
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
	function updateCmsField(field, value) {
		setCmsForm((prev) => ({
			...prev,
			[field]: value
		}));
		setHasUnsavedChanges(true);
	}
	const filteredClients = (0, import_react.useMemo)(() => {
		const q = crmSearch.toLowerCase().trim();
		return clients.filter((c) => {
			const matchSearch = !q || c.name.toLowerCase().includes(q) || c.organization.toLowerCase().includes(q) || c.phone.includes(q) || c.location.toLowerCase().includes(q) || c.equipmentInterest.toLowerCase().includes(q) || c.id.toLowerCase().includes(q);
			const matchStage = crmStageFilter === "All" || c.stage === crmStageFilter;
			const matchProvince = crmProvinceFilter === "All Zimbabwe" || c.province === crmProvinceFilter;
			return matchSearch && matchStage && matchProvince;
		});
	}, [
		clients,
		crmSearch,
		crmStageFilter,
		crmProvinceFilter
	]);
	const pipelineMetrics = (0, import_react.useMemo)(() => {
		return {
			totalPipelineValue: clients.filter((c) => c.stage !== "Lost").reduce((sum, c) => sum + c.dealValue, 0),
			wonValue: clients.filter((c) => c.stage === "Won").reduce((sum, c) => sum + c.dealValue, 0),
			activeDeals: clients.filter((c) => c.stage === "Lead" || c.stage === "Discovery" || c.stage === "Tender Quoted" || c.stage === "Negotiation").length,
			wonDeals: clients.filter((c) => c.stage === "Won").length,
			highPriorityCount: clients.filter((c) => c.priority === "High" && c.stage !== "Lost").length
		};
	}, [clients]);
	const filteredProducts = (0, import_react.useMemo)(() => {
		const q = productSearch.toLowerCase().trim();
		return equipmentList.filter((item) => {
			const matchCat = productCategoryFilter === "all" || item.category === productCategoryFilter;
			const matchQuery = !q || item.name.toLowerCase().includes(q) || (item.spec?.toLowerCase().includes(q) ?? false) || item.sku && item.sku.toLowerCase().includes(q) || item.throughput && item.throughput.toLowerCase().includes(q);
			return matchCat && matchQuery;
		});
	}, [
		equipmentList,
		productSearch,
		productCategoryFilter
	]);
	const filteredRecycleItems = (0, import_react.useMemo)(() => {
		const q = recycleSearch.toLowerCase().trim();
		return recycleBin.filter((item) => {
			const matchKind = recycleFilter === "all" || item.kind === recycleFilter;
			const matchQuery = !q || item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q) || item.binId.toLowerCase().includes(q);
			return matchKind && matchQuery;
		});
	}, [
		recycleBin,
		recycleFilter,
		recycleSearch
	]);
	const pendingConfirm = (0, import_react.useMemo)(() => {
		if (!pendingAction) return null;
		if (pendingAction.type === "delete-clients") {
			const n = pendingAction.ids.length;
			return {
				title: n === 1 ? "Move client to recycle bin?" : `Move ${n} clients to recycle bin?`,
				body: "They will leave the CRM pipeline and can be restored from Recycle Bin. Public records stay hidden until restored.",
				confirmLabel: "Move to recycle bin",
				tone: "danger"
			};
		}
		if (pendingAction.type === "delete-products") {
			const n = pendingAction.ids.length;
			return {
				title: n === 1 ? "Move machine to recycle bin?" : `Move ${n} machines to recycle bin?`,
				body: "They will be removed from Cranborne inventory and the public catalogue until restored.",
				confirmLabel: "Move to recycle bin",
				tone: "danger"
			};
		}
		if (pendingAction.type === "delete-deployment") return {
			title: `Delete deployment ${pendingAction.id}?`,
			body: `Are you sure you want to remove "${pendingAction.name}" from active field deployments?`,
			confirmLabel: "Delete deployment",
			tone: "danger"
		};
		if (pendingAction.type === "restore") {
			const n = pendingAction.binIds.length;
			return {
				title: n === 1 ? "Restore this record?" : `Restore ${n} records?`,
				body: "Restored clients return to the CRM pipeline. Restored machines reappear in inventory and the public catalogue.",
				confirmLabel: "Restore",
				tone: "neutral"
			};
		}
		if (pendingAction.type === "destroy") {
			const n = pendingAction.binIds.length;
			return {
				title: n === 1 ? "Permanently delete this record?" : `Permanently delete ${n} records?`,
				body: "This cannot be undone. The snapshot will be removed from the recycle bin forever.",
				confirmLabel: "Delete forever",
				tone: "danger"
			};
		}
		return {
			title: "Empty recycle bin?",
			body: `Permanently delete all ${recycleBin.length} records. This cannot be undone.`,
			confirmLabel: "Empty bin",
			tone: "danger"
		};
	}, [pendingAction, recycleBin.length]);
	const crmTotalPages = Math.max(1, Math.ceil(filteredClients.length / crmPageSize));
	const paginatedClients = (0, import_react.useMemo)(() => {
		const start = (crmPage - 1) * crmPageSize;
		return filteredClients.slice(start, start + crmPageSize);
	}, [
		filteredClients,
		crmPage,
		crmPageSize
	]);
	(0, import_react.useEffect)(() => {
		setCrmPage(1);
	}, [
		crmSearch,
		crmStageFilter,
		crmProvinceFilter,
		crmPageSize
	]);
	const productTotalPages = Math.max(1, Math.ceil(filteredProducts.length / productPageSize));
	const paginatedProducts = (0, import_react.useMemo)(() => {
		const start = (productPage - 1) * productPageSize;
		return filteredProducts.slice(start, start + productPageSize);
	}, [
		filteredProducts,
		productPage,
		productPageSize
	]);
	(0, import_react.useEffect)(() => {
		setProductPage(1);
	}, [
		productSearch,
		productCategoryFilter,
		productPageSize
	]);
	const filteredDeployments = (0, import_react.useMemo)(() => {
		return deploymentsList.filter((d) => {
			const q = deploymentSearch.trim().toLowerCase();
			const matchesSearch = !q || d.id.toLowerCase().includes(q) || d.plant.toLowerCase().includes(q) || d.client.toLowerCase().includes(q) || d.site.toLowerCase().includes(q) || d.province.toLowerCase().includes(q) || d.operator.toLowerCase().includes(q) || d.contractRef.toLowerCase().includes(q) || d.contactPerson && d.contactPerson.toLowerCase().includes(q) || d.notes && d.notes.toLowerCase().includes(q);
			const matchesStatus = deploymentStatusFilter === "all" || d.status === deploymentStatusFilter;
			const matchesProvince = deploymentProvinceFilter === "all" || d.province === deploymentProvinceFilter;
			const matchesCategory = deploymentCategoryFilter === "all" || d.category === deploymentCategoryFilter;
			return matchesSearch && matchesStatus && matchesProvince && matchesCategory;
		}).sort((a, b) => {
			if (deploymentSortBy === "return-soon") return new Date(a.scheduledReturn).getTime() - new Date(b.scheduledReturn).getTime();
			if (deploymentSortBy === "newest") return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
			if (deploymentSortBy === "rate-high") return (b.dailyRateUSD || 0) - (a.dailyRateUSD || 0);
			if (deploymentSortBy === "plant-az") return a.plant.localeCompare(b.plant);
			return 0;
		});
	}, [
		deploymentsList,
		deploymentSearch,
		deploymentStatusFilter,
		deploymentProvinceFilter,
		deploymentCategoryFilter,
		deploymentSortBy
	]);
	const deploymentTotalPages = Math.max(1, Math.ceil(filteredDeployments.length / deploymentPageSize));
	const paginatedDeployments = (0, import_react.useMemo)(() => {
		if (deploymentPageSize >= 999) return filteredDeployments;
		const start = (deploymentPage - 1) * deploymentPageSize;
		return filteredDeployments.slice(start, start + deploymentPageSize);
	}, [
		filteredDeployments,
		deploymentPage,
		deploymentPageSize
	]);
	(0, import_react.useEffect)(() => {
		setDeploymentPage(1);
	}, [
		deploymentSearch,
		deploymentStatusFilter,
		deploymentProvinceFilter,
		deploymentCategoryFilter,
		deploymentPageSize
	]);
	const deploymentMetrics = (0, import_react.useMemo)(() => {
		return {
			total: deploymentsList.length,
			activeOnSite: deploymentsList.filter((d) => d.status === "Active on Site").length,
			scheduled: deploymentsList.filter((d) => d.status === "Scheduled Mobilization").length,
			demobilizingOrService: deploymentsList.filter((d) => d.status === "Demobilizing / In Transit" || d.status === "Routine Service / Standby").length,
			returnedYard: deploymentsList.filter((d) => d.status === "Returned to Cranborne Yard").length,
			totalDailyRunRate: deploymentsList.filter((d) => d.status === "Active on Site").reduce((sum, d) => sum + (d.dailyRateUSD || 0), 0)
		};
	}, [deploymentsList]);
	const peekClient = peekClientId ? clients.find((c) => c.id === peekClientId) ?? null : null;
	const peekProduct = peekProductId ? equipmentList.find((p) => p.id === peekProductId) ?? null : null;
	const clientNavIndex = profileClientId ? filteredClients.findIndex((c) => c.id === profileClientId) : -1;
	const productNavIndex = editingProduct ? filteredProducts.findIndex((p) => p.id === editingProduct.id) : -1;
	(0, import_react.useEffect)(() => {
		if (!profileClientId) {
			setClientDraft(null);
			return;
		}
		const live = clients.find((c) => c.id === profileClientId);
		setClientDraft(live ?? null);
	}, [profileClientId]);
	function stepClient(delta) {
		if (clientNavIndex < 0) return;
		const next = filteredClients[clientNavIndex + delta];
		if (next) setProfileClientId(next.id);
	}
	function stepProduct(delta) {
		if (productNavIndex < 0 || !editingProduct) return;
		const next = filteredProducts[productNavIndex + delta];
		if (next) setEditingProduct(next);
	}
	function openClientProfile(id) {
		setPeekClientId(null);
		setProfileClientId(id);
	}
	function openProductProfile(item) {
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
	(0, import_react.useEffect)(() => {
		function onKey(e) {
			const typing = e.target?.closest("input, textarea, select");
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#F5F5F7] text-[#1D1D1F] font-sans antialiased selection:bg-[#1D1D1F] selection:text-white",
		children: [toastMessage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "fixed top-5 inset-x-0 mx-auto z-50 flex w-fit items-center gap-2 rounded-full border border-black/[0.06] bg-white px-5 py-2.5 text-xs font-semibold text-[#1D1D1F] shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md animate-in fade-in slide-in-from-top-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-[#34C759]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: toastMessage })]
		}), !isAuthenticated ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#F5F5F7] via-[#ECECEE] to-[#E5E5E8] px-4 py-8 sm:px-6 sm:py-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex w-full max-w-5xl items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex items-center gap-2.5 group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/mark.png",
							alt: "",
							className: "size-8 object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold tracking-tight text-[#1D1D1F]",
							children: "Omnicore Solutions"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "inline-flex items-center gap-1 text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Return to Public Website" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto w-full max-w-[420px] py-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-black/[0.08] bg-white p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.06)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#1D1D1F] text-white shadow-md",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-6 text-white" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-xl font-bold tracking-tight text-[#1D1D1F]",
									children: "Omnicore Backoffice"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-xs text-[#6E6E73] leading-relaxed",
									children: "Authorized Operations & Technical CRM Access · Cranborne Yard, Harare"
								})]
							}),
							loginError && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50/80 p-3.5 text-xs text-red-800 animate-in fade-in",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-4 shrink-0 text-red-600 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-1 font-medium",
									children: loginError
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleLogin,
								className: "mt-6 space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "block text-xs font-semibold text-[#1D1D1F] mb-1.5",
										children: "Username / Administrator Email"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											autoComplete: "username",
											required: true,
											value: loginEmail,
											onChange: (e) => setLoginEmail(e.target.value),
											placeholder: "Enter authorized administrator email",
											className: "w-full rounded-xl border border-black/15 bg-[#F9F9FB] px-3.5 py-2.5 text-sm text-[#1D1D1F] placeholder:text-[#A1A1A6] focus:border-[#1D1D1F] focus:bg-white focus:outline-none transition-all shadow-2xs"
										})
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center justify-between mb-1.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-xs font-semibold text-[#1D1D1F]",
											children: "Password"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: showLoginPassword ? "text" : "password",
											autoComplete: "current-password",
											required: true,
											value: loginPassword,
											onChange: (e) => setLoginPassword(e.target.value),
											placeholder: "Enter administrator password",
											className: "w-full rounded-xl border border-black/15 bg-[#F9F9FB] px-3.5 pr-10 py-2.5 text-sm text-[#1D1D1F] placeholder:text-[#A1A1A6] focus:border-[#1D1D1F] focus:bg-white focus:outline-none transition-all shadow-2xs"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setShowLoginPassword(!showLoginPassword),
											className: "absolute right-3 top-1/2 -translate-y-1/2 text-[#86868B] hover:text-[#1D1D1F] cursor-pointer",
											title: showLoginPassword ? "Hide password" : "Show password",
											children: showLoginPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
										})]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center justify-between pt-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex items-center gap-2 text-xs text-[#6E6E73] cursor-pointer select-none",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: loginRemember,
												onChange: (e) => setLoginRemember(e.target.checked),
												className: "size-4 rounded border-black/25 accent-[#1D1D1F]"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Remember on this device" })]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										disabled: isSubmittingLogin,
										className: "mt-2 w-full inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#1D1D1F] text-sm font-semibold text-white shadow-sm hover:bg-black active:scale-[0.99] disabled:opacity-60 transition-all cursor-pointer",
										children: isSubmittingLogin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Verifying Credentials..." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-4 text-white/80" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Authenticate & Open Backoffice" })] })
									})
								]
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center text-xs text-[#86868B] py-2",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Omnicore Solutions · Cranborne Yard, Harare, Zimbabwe"
					]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			productLightbox && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductPhotoLightbox, {
				isOpen: productLightbox.isOpen,
				onClose: () => setProductLightbox(null),
				title: productLightbox.title,
				category: productLightbox.category,
				spec: productLightbox.spec,
				price: productLightbox.price,
				sku: productLightbox.sku,
				images: productLightbox.images,
				initialIndex: productLightbox.initialIndex ?? 0
			}),
			zoomedPhoto && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductPhotoLightbox, {
				isOpen: Boolean(zoomedPhoto),
				onClose: () => setZoomedPhoto(null),
				title: zoomedPhoto.title,
				images: [zoomedPhoto.src]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 border-b border-black/[0.06] bg-white/85 backdrop-blur-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-[1720px] w-full items-center justify-between px-4 sm:px-6 lg:px-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin",
							className: "flex items-center gap-2.5 group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-8 items-center justify-center rounded-xl bg-[#1D1D1F] text-white text-xs font-bold shadow-xs",
								children: "O"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-semibold tracking-tight text-[#1D1D1F]",
									children: "Omnicore Backoffice"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full bg-black/[0.05] px-2 py-0.5 text-[10px] font-medium text-[#6E6E73]",
									children: "Harare Operations"
								})]
							}) })]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setActiveTab("profile"),
								className: `hidden sm:flex items-center gap-2 rounded-full border border-black/[0.08] px-3 py-1 text-xs transition-all cursor-pointer ${activeTab === "profile" ? "bg-[#1D1D1F] text-white" : "bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#EBEBEB]"}`,
								title: "Manage Administrator Profile & Credentials",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-emerald-500" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `font-medium ${activeTab === "profile" ? "text-white/90" : "text-[#6E6E73]"}`,
										children: adminProfile.email
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `rounded px-1.5 py-0.5 text-[10px] font-semibold ${activeTab === "profile" ? "bg-white/20 text-white" : "bg-black/[0.06] text-[#1D1D1F]"}`,
										children: "Profile"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: handleLogout,
								className: "inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-red-600 shadow-2xs hover:bg-red-50 transition-all active:scale-95",
								title: "Sign out of Operations Backoffice",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sign Out" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								className: "inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-4 py-1.5 text-xs font-medium text-[#1D1D1F] shadow-2xs hover:bg-[#F5F5F7] transition-all active:scale-95",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Public Website" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3 text-[#86868B]" })]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-[1720px] w-full px-4 sm:px-6 lg:px-8 pb-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "inline-flex w-full sm:w-auto items-center overflow-x-auto rounded-xl bg-black/[0.05] p-1 text-xs",
						children: [
							{
								id: "crm",
								label: "Clients & CRM Pipeline",
								icon: Users,
								count: filteredClients.length
							},
							{
								id: "products",
								label: "Machinery Inventory",
								icon: Package,
								count: equipmentList.length
							},
							{
								id: "cms",
								label: "Site Content & Copy",
								icon: FileText
							},
							{
								id: "hire",
								label: "Field Deployments",
								icon: Truck
							},
							{
								id: "recycle",
								label: "Recycle Bin",
								icon: Recycle,
								count: recycleBin.length
							},
							{
								id: "profile",
								label: "Profile & Security",
								icon: ShieldCheck
							}
						].map((tab) => {
							const Icon = tab.icon;
							const isActive = activeTab === tab.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									setActiveTab(tab.id);
									setPeekClientId(null);
									setProfileClientId(null);
									setPeekProductId(null);
									setProductProfileOpen(false);
									setEditingProduct(null);
									setSelectedClientIds([]);
									setSelectedProductIds([]);
									setSelectedBinIds([]);
								},
								className: `flex flex-1 sm:flex-initial items-center justify-center gap-2 rounded-lg px-4 py-1.5 font-medium transition-all ${isActive ? "bg-white text-[#1D1D1F] shadow-xs font-semibold" : "text-[#6E6E73] hover:text-[#1D1D1F]"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tab.label }),
									tab.count !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `rounded-full px-1.5 py-0.2 text-[10px] ${isActive ? "bg-black/[0.06] text-[#1D1D1F]" : "bg-black/[0.04] text-[#86868B]"}`,
										children: tab.count
									})
								]
							}, tab.id);
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-[1720px] w-full px-4 py-6 sm:px-6 lg:px-8",
				children: [
					activeTab === "crm" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							profileClientId && clientDraft ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleSaveClient,
								className: "space-y-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordPager, {
									index: clientNavIndex,
									total: filteredClients.length,
									title: clientDraft.name,
									subtitle: `${clientDraft.organization} · ${clientDraft.id}`,
									onBack: closeClientProfile,
									backLabel: "All clients",
									onPrev: () => stepClient(-1),
									onNext: () => stepClient(1)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 gap-5 lg:grid-cols-12",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-4 lg:col-span-7",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.03)]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mb-4 flex flex-wrap items-center gap-2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: `rounded-full px-2.5 py-1 text-[11px] font-semibold ${stageChipClass(clientDraft.stage)}`,
															children: clientDraft.stage
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: `rounded-full px-2.5 py-1 text-[11px] font-medium ${clientDraft.priority === "High" ? "bg-red-50 text-red-600" : clientDraft.priority === "Medium" ? "bg-amber-50 text-amber-700" : "bg-black/[0.04] text-[#86868B]"}`,
															children: [clientDraft.priority, " priority"]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-sm font-semibold text-[#1D1D1F]",
															children: clientDraft.dealValueDisplay
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "mb-1 block font-medium text-[#1D1D1F]",
															children: "Client name"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															required: true,
															value: clientDraft.name,
															onChange: (e) => setClientDraft({
																...clientDraft,
																name: e.target.value
															}),
															className: "h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "mb-1 block font-medium text-[#1D1D1F]",
															children: "Organization"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: clientDraft.organization,
															onChange: (e) => setClientDraft({
																...clientDraft,
																organization: e.target.value
															}),
															className: "h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "mb-1 block font-medium text-[#1D1D1F]",
															children: "Phone / WhatsApp"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: clientDraft.phone,
															onChange: (e) => setClientDraft({
																...clientDraft,
																phone: e.target.value
															}),
															className: "h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "mb-1 block font-medium text-[#1D1D1F]",
															children: "Email"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "email",
															value: clientDraft.email,
															onChange: (e) => setClientDraft({
																...clientDraft,
																email: e.target.value
															}),
															className: "h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "mb-1 block font-medium text-[#1D1D1F]",
															children: "Site location"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: clientDraft.location,
															onChange: (e) => setClientDraft({
																...clientDraft,
																location: e.target.value
															}),
															className: "h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "mb-1 block font-medium text-[#1D1D1F]",
															children: "Province"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
															value: clientDraft.province,
															onChange: (e) => setClientDraft({
																...clientDraft,
																province: e.target.value
															}),
															className: "h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none",
															children: PROVINCES.filter((p) => p !== "All Zimbabwe").map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: p,
																children: p
															}, p))
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "mb-1 block font-medium text-[#1D1D1F]",
															children: "Division"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
															value: clientDraft.service,
															onChange: (e) => setClientDraft({
																...clientDraft,
																service: e.target.value
															}),
															className: "h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "Mining Equipment",
																	children: "Mining Equipment"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "Construction Machinery Hire",
																	children: "Machinery Hire"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "Hardware & Construction",
																	children: "Hardware & Fence"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "Farming Machinery",
																	children: "Farming Plant"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "Industry & Manufacturing",
																	children: "Industrial Plant"
																})
															]
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "mb-1 block font-medium text-[#1D1D1F]",
															children: "Deal type"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
															value: clientDraft.intent,
															onChange: (e) => setClientDraft({
																...clientDraft,
																intent: e.target.value
															}),
															className: "h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "Buy",
																	children: "Outright Purchase"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "Hire",
																	children: "Plant Hire"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "Both",
																	children: "Both"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "Consultation",
																	children: "Technical Consult"
																})
															]
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "mb-1 block font-medium text-[#1D1D1F]",
															children: "Stage"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
															value: clientDraft.stage,
															onChange: (e) => updateClientStage(clientDraft.id, e.target.value),
															className: "h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none",
															children: STAGES.map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: st,
																children: st
															}, st))
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "mb-1 block font-medium text-[#1D1D1F]",
															children: "Priority"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
															value: clientDraft.priority,
															onChange: (e) => setClientDraft({
																...clientDraft,
																priority: e.target.value
															}),
															className: "h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "High",
																	children: "High"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "Medium",
																	children: "Medium"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "Normal",
																	children: "Normal"
																})
															]
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "sm:col-span-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																className: "mb-1 block font-medium text-[#1D1D1F]",
																children: "Estimated value ($)"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																type: "text",
																value: String(clientDraft.dealValue),
																onChange: (e) => setClientDraft({
																	...clientDraft,
																	dealValue: Number(e.target.value.replace(/[^0-9.]/g, "")) || 0
																}),
																className: "h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "sm:col-span-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																className: "mb-1 block font-medium text-[#1D1D1F]",
																children: "Equipment required"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																type: "text",
																value: clientDraft.equipmentInterest,
																onChange: (e) => setClientDraft({
																	...clientDraft,
																	equipmentInterest: e.target.value
																}),
																className: "h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "sm:col-span-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																className: "mb-1 block font-medium text-[#1D1D1F]",
																children: "Internal notes"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
																rows: 3,
																value: clientDraft.notes,
																onChange: (e) => setClientDraft({
																	...clientDraft,
																	notes: e.target.value
																}),
																className: "w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] p-3 leading-relaxed text-[#1D1D1F] focus:bg-white focus:outline-none"
															})]
														})
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-4 flex justify-end gap-2 border-t border-black/[0.06] pt-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														type: "button",
														onClick: () => setPendingAction({
															type: "delete-clients",
															ids: [clientDraft.id]
														}),
														className: "inline-flex h-11 items-center gap-1.5 rounded-full border border-red-200 bg-white px-4 text-xs font-semibold text-red-600 hover:bg-red-50",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), "Move to bin"]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "submit",
														className: "inline-flex h-11 items-center rounded-full bg-[#1D1D1F] px-5 text-xs font-semibold text-white hover:bg-black",
														children: "Save profile"
													})]
												})
											]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-4 lg:col-span-5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.03)]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "mb-2 block text-[10px] font-semibold uppercase tracking-wider text-[#86868B]",
													children: "Fast technical response (WhatsApp)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "grid grid-cols-1 gap-1.5 text-xs",
													children: [
														{
															label: "Formal tender rate ready",
															text: `Good day ${clientDraft.name}. Following up from Omnicore Solutions Harare regarding ${clientDraft.equipmentInterest}. We have prepared the indicative FOB Harare quotation and specifications for your review.`
														},
														{
															label: "Cranborne yard inspection",
															text: `Hello ${clientDraft.name}, your requested machinery (${clientDraft.equipmentInterest}) is available for physical inspection at our Cranborne yard (115 Chiremba Rd, Harare). What time works best for you?`
														},
														{
															label: "Freight & delivery schedule",
															text: `Good day ${clientDraft.name}. We can arrange direct lowbed delivery to your site in ${clientDraft.location}. Please confirm site access for heavy plant haulage.`
														},
														{
															label: "Commissioning & warranty",
															text: `Hello ${clientDraft.name}, all Omnicore plant includes on-site field commissioning and 12-month parts backup from Cranborne. Let us finalize the mobilization date.`
														}
													].map((tmpl, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: whatsappUrl(tmpl.text),
														target: "_blank",
														rel: "noopener noreferrer",
														className: "flex items-center justify-between rounded-lg border border-black/[0.06] bg-white p-2.5 text-left text-[11px] font-medium text-[#1D1D1F] hover:border-[#1fa855] hover:bg-emerald-50/30",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tmpl.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "ml-1 size-3 shrink-0 text-[#1fa855]" })]
													}, idx))
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-3 flex gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: `tel:${clientDraft.phone}`,
														className: "inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full border border-black/[0.08] bg-[#F5F5F7] text-xs font-medium text-[#1D1D1F]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-3.5" }), "Call"]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: `mailto:${clientDraft.email}`,
														className: "inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full border border-black/[0.08] bg-[#F5F5F7] text-xs font-medium text-[#1D1D1F]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3.5" }), "Email"]
													})]
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.03)]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "mb-2 block text-[10px] font-semibold uppercase tracking-wider text-[#86868B]",
													children: [
														"Activity log (",
														clientDraft.timeline.length,
														")"
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "max-h-56 space-y-1.5 overflow-y-auto pr-1",
													children: clientDraft.timeline.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "rounded-lg bg-[#F5F5F7] p-2 text-[11px] text-[#6E6E73]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex justify-between font-medium text-[#1D1D1F]",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.author }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[#86868B]",
																children: item.date
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "mt-0.5",
															children: item.note
														})]
													}, i))
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex gap-1.5 pt-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: newTimelineNote,
														onChange: (e) => setNewTimelineNote(e.target.value),
														placeholder: "Log phone call, site inspection, deposit...",
														className: "h-11 flex-1 rounded-lg border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs text-[#1D1D1F] placeholder-[#86868B] focus:bg-white focus:outline-none"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: handleAddTimelineNote,
														className: "h-11 rounded-lg bg-[#1D1D1F] px-4 text-xs font-medium text-white hover:bg-black",
														children: "Add"
													})]
												})
											]
										})]
									})]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-2xl border border-black/[0.04] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] font-medium text-[#86868B] uppercase tracking-wider",
												children: "Active Tender Pipeline"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-1.5 flex items-baseline gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F]",
													children: ["$", pipelineMetrics.totalPipelineValue.toLocaleString()]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs text-[#34C759] font-medium",
													children: [pipelineMetrics.activeDeals, " deals"]
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-2xl border border-black/[0.04] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] font-medium text-[#86868B] uppercase tracking-wider",
												children: "Closed / Won Revenue"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-1.5 flex items-baseline gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F]",
													children: ["$", pipelineMetrics.wonValue.toLocaleString()]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs text-[#34C759] font-medium",
													children: [pipelineMetrics.wonDeals, " orders"]
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-2xl border border-black/[0.04] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] font-medium text-[#86868B] uppercase tracking-wider",
												children: "High Priority Tenders"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-1.5 flex items-baseline gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F]",
													children: pipelineMetrics.highPriorityCount
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-[#FF9500] font-medium",
													children: "urgent"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-2xl border border-black/[0.04] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.02)]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] font-medium text-[#86868B] uppercase tracking-wider",
												children: "Client Base in Zimbabwe"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-1.5 flex items-baseline gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F]",
													children: clients.length
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs text-[#86868B]",
													children: "accounts"
												})]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1",
										children: ["All", ...STAGES].map((st) => {
											const count = st === "All" ? clients.length : clients.filter((c) => c.stage === st).length;
											const isCurrent = crmStageFilter === st;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => setCrmStageFilter(st),
												className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all ${isCurrent ? "bg-[#1D1D1F] text-white shadow-xs" : "bg-white text-[#6E6E73] hover:text-[#1D1D1F] border border-black/[0.06]"}`,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: st }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `text-[10px] ${isCurrent ? "text-white/80" : "text-[#86868B]"}`,
													children: count
												})]
											}, st);
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-[#86868B]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													value: crmSearch,
													onChange: (e) => setCrmSearch(e.target.value),
													placeholder: "Search client, syndicate, plant...",
													className: "h-9 w-44 sm:w-60 rounded-full border border-black/[0.08] bg-white pl-9 pr-3 text-xs text-[#1D1D1F] placeholder-[#86868B] shadow-2xs focus:outline-none focus:ring-1 focus:ring-black/20"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
												value: crmProvinceFilter,
												onChange: (e) => setCrmProvinceFilter(e.target.value),
												className: "h-9 rounded-full border border-black/[0.08] bg-white px-3 text-xs text-[#1D1D1F] shadow-2xs focus:outline-none focus:ring-1 focus:ring-black/20",
												children: PROVINCES.map((prov) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: prov,
													children: prov
												}, prov))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => setShowAddClientModal(true),
												className: "inline-flex items-center gap-1.5 rounded-full bg-[#1D1D1F] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-black transition-all active:scale-95",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "New Client" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => setActiveTab("recycle"),
												className: "inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-3 py-2 text-xs font-medium text-[#1D1D1F] shadow-2xs hover:bg-[#F5F5F7]",
												title: "Open recycle bin",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Recycle, { className: "size-3.5 text-[#6E6E73]" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "hidden sm:inline",
														children: "Bin"
													}),
													recycleBin.filter((i) => i.kind === "client").length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded-full bg-black/[0.06] px-1.5 text-[10px] font-semibold",
														children: recycleBin.filter((i) => i.kind === "client").length
													})
												]
											})
										]
									})]
								}),
								selectedClientIds.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#1D1D1F]/10 bg-[#1D1D1F] px-4 py-2.5 text-white shadow-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-semibold",
										children: [
											selectedClientIds.length,
											" client",
											selectedClientIds.length === 1 ? "" : "s",
											" selected"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setSelectedClientIds([]),
											className: "rounded-full px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/10",
											children: "Clear"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setPendingAction({
												type: "delete-clients",
												ids: selectedClientIds
											}),
											className: "inline-flex items-center gap-1.5 rounded-full bg-red-500 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-red-400",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), "Move to recycle bin"]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.03)]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "overflow-x-auto",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
											className: "w-full text-left text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
												className: "border-b border-black/[0.06] bg-[#FBFBFC] text-[11px] font-semibold text-[#86868B] uppercase tracking-wider",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "w-10 py-3 pl-4 pr-1",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowCheck, {
															label: "Select all clients on this page",
															checked: paginatedClients.length > 0 && paginatedClients.every((c) => selectedClientIds.includes(c.id)),
															indeterminate: paginatedClients.some((c) => selectedClientIds.includes(c.id)) && !paginatedClients.every((c) => selectedClientIds.includes(c.id)),
															onChange: (next) => {
																const pageIds = paginatedClients.map((c) => c.id);
																setSelectedClientIds((prev) => next ? [.../* @__PURE__ */ new Set([...prev, ...pageIds])] : prev.filter((id) => !pageIds.includes(id)));
															}
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "py-3 px-4",
														children: "Client / Organization"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "py-3 px-3",
														children: "Location"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "py-3 px-3",
														children: "Equipment Required"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "py-3 px-3",
														children: "Stage"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "py-3 px-3 text-right",
														children: "Deal Value"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "py-3 px-3 text-center",
														children: "Priority"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "py-3 px-3 text-right",
														children: "Actions"
													})
												]
											}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
												className: "divide-y divide-black/[0.04]",
												children: filteredClients.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													colSpan: 8,
													className: "py-12 text-center text-[#86868B]",
													children: "No client records match the current filters."
												}) }) : paginatedClients.map((client) => {
													const isSelected = peekClientId === client.id;
													const isChecked = selectedClientIds.includes(client.id);
													return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
														onClick: () => setPeekClientId(client.id),
														className: `transition-colors cursor-pointer ${isChecked ? "bg-[#F3F8FF]" : isSelected ? "bg-[#F5F5F7] font-medium" : "hover:bg-black/[0.015]"}`,
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
																className: "w-10 py-3 pl-4 pr-1",
																onClick: (e) => e.stopPropagation(),
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowCheck, {
																	label: `Select ${client.name}`,
																	checked: isChecked,
																	onChange: (next) => setSelectedClientIds((prev) => next ? [...prev, client.id] : prev.filter((id) => id !== client.id))
																})
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
																className: "py-3 px-4",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-semibold text-[#1D1D1F] block",
																	children: client.name
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[11px] text-[#6E6E73] block truncate max-w-[160px]",
																	children: client.organization
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
																className: "py-3 px-3 text-[#6E6E73]",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "block text-[#1D1D1F]",
																	children: client.location
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[10px] text-[#86868B]",
																	children: client.province
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
																className: "py-3 px-3",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[#1D1D1F] font-medium block truncate max-w-[180px]",
																	children: client.equipmentInterest
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "rounded bg-black/[0.04] px-1.5 py-0.2 text-[10px] text-[#6E6E73]",
																	children: client.intent
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
																className: "py-3 px-3",
																onClick: (e) => e.stopPropagation(),
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
																	value: client.stage,
																	onChange: (e) => updateClientStage(client.id, e.target.value),
																	className: `rounded-full px-2.5 py-1 text-[11px] font-semibold border-0 focus:ring-1 focus:ring-black/20 ${client.stage === "Won" ? "bg-[#E8F8EE] text-[#1B833E]" : client.stage === "Tender Quoted" ? "bg-[#FFF4E5] text-[#B25E00]" : client.stage === "Negotiation" ? "bg-purple-50 text-purple-700" : client.stage === "Lead" ? "bg-blue-50 text-blue-700" : client.stage === "Lost" ? "bg-red-50 text-red-700" : "bg-black/[0.05] text-[#1D1D1F]"}`,
																	children: STAGES.map((st) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																		value: st,
																		children: st
																	}, st))
																})
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
																className: "py-3 px-3 text-right font-semibold text-[#1D1D1F]",
																children: client.dealValueDisplay
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
																className: "py-3 px-3 text-center",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: `inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${client.priority === "High" ? "bg-red-50 text-red-600" : client.priority === "Medium" ? "bg-amber-50 text-amber-700" : "bg-black/[0.04] text-[#86868B]"}`,
																	children: client.priority
																})
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
																className: "py-3 px-3 text-right",
																onClick: (e) => e.stopPropagation(),
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex items-center justify-end gap-1",
																	children: [
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
																			href: whatsappUrl(`Hello ${client.name}, following up from Omnicore Harare regarding your inquiry for ${client.equipmentInterest}.`),
																			target: "_blank",
																			rel: "noopener noreferrer",
																			className: "flex size-7 items-center justify-center rounded-lg text-[#1fa855] hover:bg-[#1fa855]/10",
																			title: "WhatsApp Client",
																			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "size-3.5" })
																		}),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
																			href: `tel:${client.phone}`,
																			className: "flex size-7 items-center justify-center rounded-lg text-[#1D1D1F] hover:bg-black/[0.05]",
																			title: "Call",
																			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-3.5 text-[#6E6E73]" })
																		}),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																			type: "button",
																			onClick: () => setPendingAction({
																				type: "delete-clients",
																				ids: [client.id]
																			}),
																			className: "flex size-7 items-center justify-center rounded-lg text-red-600 hover:bg-red-50",
																			title: "Move to recycle bin",
																			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
																		})
																	]
																})
															})
														]
													}, client.id);
												})
											})]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-black/[0.06] bg-[#FBFBFC] px-4 py-3 text-xs text-[#6E6E73]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Showing" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-[#1D1D1F]",
													children: filteredClients.length === 0 ? 0 : (crmPage - 1) * crmPageSize + 1
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "to" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-[#1D1D1F]",
													children: Math.min(crmPage * crmPageSize, filteredClients.length)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "of" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-[#1D1D1F]",
													children: filteredClients.length
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "clients" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "mx-1 text-black/20",
													children: "|"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Per page:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
														value: crmPageSize,
														onChange: (e) => {
															setCrmPageSize(Number(e.target.value));
															setCrmPage(1);
														},
														className: "rounded-lg border border-black/[0.08] bg-white px-2 py-0.5 text-xs text-[#1D1D1F] focus:outline-none",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: 5,
																children: "5"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: 10,
																children: "10"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: 20,
																children: "20"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: 50,
																children: "50"
															})
														]
													})]
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1 self-end sm:self-auto",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setCrmPage(1),
													disabled: crmPage <= 1,
													className: "rounded-lg p-1 text-[#6E6E73] hover:bg-black/[0.05] hover:text-[#1D1D1F] disabled:opacity-30 disabled:pointer-events-none transition-colors",
													title: "First page",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsLeft, { className: "size-4" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setCrmPage((p) => Math.max(1, p - 1)),
													disabled: crmPage <= 1,
													className: "rounded-lg p-1 text-[#6E6E73] hover:bg-black/[0.05] hover:text-[#1D1D1F] disabled:opacity-30 disabled:pointer-events-none transition-colors",
													title: "Previous page",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex items-center gap-1 px-1",
													children: Array.from({ length: crmTotalPages }, (_, i) => i + 1).map((pageNum) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => setCrmPage(pageNum),
														className: `min-w-6 h-6 rounded-md px-1.5 text-xs font-medium transition-all ${crmPage === pageNum ? "bg-[#1D1D1F] text-white font-semibold shadow-xs" : "text-[#6E6E73] hover:bg-black/[0.05] hover:text-[#1D1D1F]"}`,
														children: pageNum
													}, pageNum))
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setCrmPage((p) => Math.min(crmTotalPages, p + 1)),
													disabled: crmPage >= crmTotalPages,
													className: "rounded-lg p-1 text-[#6E6E73] hover:bg-black/[0.05] hover:text-[#1D1D1F] disabled:opacity-30 disabled:pointer-events-none transition-colors",
													title: "Next page",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setCrmPage(crmTotalPages),
													disabled: crmPage >= crmTotalPages,
													className: "rounded-lg p-1 text-[#6E6E73] hover:bg-black/[0.05] hover:text-[#1D1D1F] disabled:opacity-30 disabled:pointer-events-none transition-colors",
													title: "Last page",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsRight, { className: "size-4" })
												})
											]
										})]
									})]
								})
							] }),
							peekClient && !profileClientId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm",
								onClick: () => setPeekClientId(null),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-full max-w-md rounded-2xl border border-black/[0.08] bg-white p-5 shadow-2xl",
									onClick: (e) => e.stopPropagation(),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-wrap items-center gap-1.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "font-mono text-[11px] text-[#86868B]",
																children: peekClient.id
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: `rounded-full px-2 py-0.5 text-[10px] font-semibold ${stageChipClass(peekClient.stage)}`,
																children: peekClient.stage
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: `rounded-full px-2 py-0.5 text-[10px] font-medium ${peekClient.priority === "High" ? "bg-red-50 text-red-600" : peekClient.priority === "Medium" ? "bg-amber-50 text-amber-700" : "bg-black/[0.04] text-[#86868B]"}`,
																children: peekClient.priority
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "mt-1 text-base font-semibold text-[#1D1D1F]",
														children: peekClient.name
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-[#6E6E73]",
														children: peekClient.organization
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setPeekClientId(null),
												className: "rounded-full p-2 text-[#86868B] hover:bg-[#F5F5F7] hover:text-[#1D1D1F]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 grid grid-cols-2 gap-2 text-xs",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-xl bg-[#F5F5F7] p-2.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "block text-[10px] uppercase text-[#86868B]",
														children: "Deal value"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold text-[#1D1D1F]",
														children: peekClient.dealValueDisplay
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-xl bg-[#F5F5F7] p-2.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "block text-[10px] uppercase text-[#86868B]",
														children: "Location"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "block truncate font-semibold text-[#1D1D1F]",
														children: peekClient.location
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "col-span-2 rounded-xl bg-[#F5F5F7] p-2.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "block text-[10px] uppercase text-[#86868B]",
														children: "Requirement"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-medium text-[#1D1D1F]",
														children: peekClient.equipmentInterest
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-xl bg-[#F5F5F7] p-2.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "block text-[10px] uppercase text-[#86868B]",
														children: "Phone"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold text-[#1D1D1F]",
														children: peekClient.phone
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-xl bg-[#F5F5F7] p-2.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "block text-[10px] uppercase text-[#86868B]",
														children: "Intent"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold text-[#1D1D1F]",
														children: peekClient.intent
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 flex gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													type: "button",
													onClick: () => openClientProfile(peekClient.id),
													className: "inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full bg-[#1D1D1F] text-xs font-semibold text-white hover:bg-black",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "size-3.5" }), "Edit profile"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
													href: whatsappUrl(`Hello ${peekClient.name}, following up from Omnicore Harare regarding your inquiry for ${peekClient.equipmentInterest}.`),
													target: "_blank",
													rel: "noopener noreferrer",
													className: "inline-flex h-11 items-center justify-center rounded-full border border-black/[0.08] px-4 text-[#1fa855] hover:bg-emerald-50",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "size-4" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setPendingAction({
														type: "delete-clients",
														ids: [peekClient.id]
													}),
													className: "inline-flex h-11 items-center justify-center rounded-full border border-red-200 px-4 text-red-600 hover:bg-red-50",
													title: "Move to recycle bin",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
												})
											]
										})
									]
								})
							}),
							showAddClientModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-full max-w-xl rounded-2xl border border-black/[0.08] bg-white p-6 shadow-2xl",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between border-b border-black/[0.06] pb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-sm font-semibold text-[#1D1D1F]",
											children: "Create New Client / Tender Lead"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setShowAddClientModal(false),
											className: "rounded-full p-1 text-[#86868B] hover:bg-[#F5F5F7]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										onSubmit: handleCreateClient,
										className: "mt-4 space-y-3.5 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "font-medium text-[#1D1D1F] block mb-1",
													children: "Client Full Name *"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													required: true,
													value: newClientName,
													onChange: (e) => setNewClientName(e.target.value),
													placeholder: "e.g. Tendai Mashingaidze",
													className: "w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 focus:bg-white focus:outline-none"
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "font-medium text-[#1D1D1F] block mb-1",
													children: "Company / Mining Syndicate"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													value: newClientOrg,
													onChange: (e) => setNewClientOrg(e.target.value),
													placeholder: "e.g. Mberengwa Chrome JV",
													className: "w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 focus:bg-white focus:outline-none"
												})] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "font-medium text-[#1D1D1F] block mb-1",
													children: "WhatsApp / Phone *"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													required: true,
													value: newClientPhone,
													onChange: (e) => setNewClientPhone(e.target.value),
													placeholder: "+263 77...",
													className: "w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 focus:bg-white focus:outline-none"
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "font-medium text-[#1D1D1F] block mb-1",
													children: "Email Address"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "email",
													value: newClientEmail,
													onChange: (e) => setNewClientEmail(e.target.value),
													placeholder: "client@syndicate.co.zw",
													className: "w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 focus:bg-white focus:outline-none"
												})] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "font-medium text-[#1D1D1F] block mb-1",
													children: "Site Location"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													value: newClientLocation,
													onChange: (e) => setNewClientLocation(e.target.value),
													placeholder: "e.g. Kadoma / Golden Valley",
													className: "w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 focus:bg-white focus:outline-none"
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "font-medium text-[#1D1D1F] block mb-1",
													children: "Province in Zimbabwe"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
													value: newClientProvince,
													onChange: (e) => setNewClientProvince(e.target.value),
													className: "w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 focus:bg-white focus:outline-none",
													children: PROVINCES.filter((p) => p !== "All Zimbabwe").map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: p,
														children: p
													}, p))
												})] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-1 sm:grid-cols-4 gap-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "font-medium text-[#1D1D1F] block mb-1",
														children: "Division"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
														value: newClientService,
														onChange: (e) => setNewClientService(e.target.value),
														className: "w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-2.5 focus:bg-white focus:outline-none",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Mining Equipment",
																children: "Mining Equipment"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Construction Machinery Hire",
																children: "Machinery Hire"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Hardware & Construction",
																children: "Hardware & Fence"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Farming Machinery",
																children: "Farming Plant"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Industry & Manufacturing",
																children: "Industrial Plant"
															})
														]
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "font-medium text-[#1D1D1F] block mb-1",
														children: "Deal Type"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
														value: newClientIntent,
														onChange: (e) => setNewClientIntent(e.target.value),
														className: "w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-2.5 focus:bg-white focus:outline-none",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Buy",
																children: "Outright Purchase"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Hire",
																children: "Plant Hire"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Both",
																children: "Both"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Consultation",
																children: "Technical Consult"
															})
														]
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "font-medium text-[#1D1D1F] block mb-1",
														children: "Priority"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
														value: newClientPriority,
														onChange: (e) => setNewClientPriority(e.target.value),
														className: "w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-2.5 focus:bg-white focus:outline-none",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "High",
																children: "High"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Medium",
																children: "Medium"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Normal",
																children: "Normal"
															})
														]
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "font-medium text-[#1D1D1F] block mb-1",
														children: "Estimated Value ($)"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: newClientDealValue,
														onChange: (e) => setNewClientDealValue(e.target.value),
														placeholder: "e.g. 15000",
														className: "w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 focus:bg-white focus:outline-none"
													})] })
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "font-medium text-[#1D1D1F] block mb-1",
												children: "Equipment Specification Required"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: newClientInterest,
												onChange: (e) => setNewClientInterest(e.target.value),
												placeholder: "e.g. 200x300 Jaw crusher with diesel motor option",
												className: "w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 focus:bg-white focus:outline-none"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "font-medium text-[#1D1D1F] block mb-1",
												children: "Initial Notes"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												rows: 2,
												value: newClientNotes,
												onChange: (e) => setNewClientNotes(e.target.value),
												placeholder: "Project timelines, access constraints, payment structure...",
												className: "w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] p-2.5 focus:bg-white focus:outline-none"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-end gap-2 pt-2 border-t border-black/[0.06]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setShowAddClientModal(false),
													className: "rounded-full bg-[#F5F5F7] px-4 py-1.5 text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F]",
													children: "Cancel"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "submit",
													className: "rounded-full bg-[#1D1D1F] px-4 py-1.5 text-xs font-semibold text-white hover:bg-black",
													children: "Save Client Record"
												})]
											})
										]
									})]
								})
							})
						]
					}),
					activeTab === "products" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							productProfileOpen && editingProduct ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: handleSaveProduct,
								className: "space-y-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordPager, {
									index: productNavIndex,
									total: filteredProducts.length,
									title: editingProduct.name,
									subtitle: editingProduct.sku || editingProduct.id,
									onBack: closeProductProfile,
									backLabel: "All machines",
									onPrev: () => stepProduct(-1),
									onNext: () => stepProduct(1)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-1 gap-5 lg:grid-cols-12",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-6 lg:col-span-8",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-3xl border border-black/[0.06] bg-white p-5 sm:p-7 shadow-xs space-y-6",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-col sm:flex-row sm:items-center justify-between border-b border-black/[0.06] pb-4 gap-3",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "flex size-8 items-center justify-center rounded-xl bg-black/[0.05] text-[#1D1D1F]",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4.5" })
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
																className: "font-semibold text-[#1D1D1F] text-base",
																children: "Equipment Visual & Yard Photo Studio"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-xs text-[#86868B] mt-0.5",
																children: "High-resolution photography shown across public catalogue, division pages, client WhatsApp spec sheets, and tender documents."
															})] })]
														}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "flex items-center gap-2 self-start sm:self-auto",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: `rounded-full px-3 py-1 text-xs font-semibold ${editingProduct.stockStatus === "In Yard Cranborne" ? "bg-[#E8F8EE] text-[#1B833E]" : editingProduct.stockStatus === "In Transit (Beitbridge)" ? "bg-[#FFF4E5] text-[#B25E00]" : "bg-black/[0.04] text-[#6E6E73]"}`,
																children: editingProduct.stockStatus || "In Yard Cranborne"
															})
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-4",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center justify-between",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-xs font-semibold text-[#1D1D1F] block",
																children: "Product Multi-Photo Gallery"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-[11px] text-[#86868B] mt-0.5",
																children: "Post several photos per machine. Drag or click any thumbnail to set it as the primary photo."
															})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "rounded-full bg-black/[0.05] px-2.5 py-0.5 text-[11px] font-semibold text-[#1D1D1F]",
																children: [
																	(editingProduct.gallery?.length || 0) + 1,
																	" ",
																	(editingProduct.gallery?.length || 0) + 1 === 1 ? "Photo" : "Photos"
																]
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex flex-wrap items-center gap-3 p-3 rounded-2xl bg-[#F9F9FA] border border-black/[0.06]",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	role: "button",
																	tabIndex: 0,
																	onClick: () => openProductLightbox(editingProduct, 0),
																	onKeyDown: (e) => {
																		if (e.key === "Enter" || e.key === " ") {
																			e.preventDefault();
																			openProductLightbox(editingProduct, 0);
																		}
																	},
																	className: "relative group/primary rounded-xl overflow-hidden border-2 border-[#1FA855] p-0.5 bg-white shadow-xs cursor-pointer hover:border-black transition-all",
																	title: "Click to preview primary photo in large screen",
																	children: [
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																			src: editingProduct.image || "/images/jaw-crusher.jpg",
																			alt: "Primary",
																			className: "size-16 sm:size-20 rounded-lg object-cover"
																		}),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																			className: "absolute inset-0 bg-black/35 opacity-0 group-hover/primary:opacity-100 transition-opacity flex items-center justify-center rounded-lg",
																			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "size-4.5 text-white drop-shadow-md" })
																		}),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "absolute bottom-1 inset-x-1 rounded bg-[#1FA855] text-white text-[9px] font-bold text-center py-0.5 shadow-xs",
																			children: "Primary"
																		})
																	]
																}),
																(editingProduct.gallery || []).map((photoUrl, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "relative group rounded-xl overflow-hidden border border-black/10 p-0.5 bg-white shadow-2xs hover:border-[#1D1D1F] transition-all",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																		src: photoUrl,
																		alt: `Gallery ${idx + 1}`,
																		className: "size-16 sm:size-20 rounded-lg object-cover"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-between p-1 rounded-lg",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																			className: "flex items-center justify-between w-full",
																			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																				type: "button",
																				onClick: () => openProductLightbox(editingProduct, idx + 1),
																				className: "rounded-full bg-black/75 p-1 text-white hover:bg-white hover:text-black shadow-xs cursor-pointer transition-colors",
																				title: "View this photo on large screen",
																				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "size-2.5" })
																			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																				type: "button",
																				onClick: () => handleRemoveGalleryPhoto(idx, true),
																				className: "rounded-full bg-red-600 p-1 text-white hover:bg-red-700 shadow-xs cursor-pointer",
																				title: "Remove photo",
																				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-2.5" })
																			})]
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																			type: "button",
																			onClick: () => {
																				const oldPrimary = editingProduct.image;
																				const nextGallery = [...editingProduct.gallery || []];
																				nextGallery[idx] = oldPrimary;
																				setEditingProduct({
																					...editingProduct,
																					image: photoUrl,
																					gallery: nextGallery
																				});
																				triggerToast("Swapped as primary photo");
																			},
																			className: "w-full rounded bg-white/95 text-[#1D1D1F] text-[9px] font-semibold py-0.5 hover:bg-white cursor-pointer",
																			children: "Make Primary"
																		})]
																	})]
																}, idx)),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
																	className: "flex flex-col items-center justify-center size-16 sm:size-20 rounded-xl border border-dashed border-black/20 bg-white hover:border-[#1D1D1F] hover:bg-[#F5F5F7] cursor-pointer transition-all text-[#6E6E73] hover:text-[#1D1D1F] shrink-0",
																	children: [
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-5 mb-0.5 text-[#1D1D1F]" }),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-[10px] font-semibold",
																			children: "+ Add Photo"
																		}),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																			type: "file",
																			accept: "image/*",
																			onChange: (e) => handleImageUpload(e, true, true),
																			className: "hidden"
																		})
																	]
																})
															]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "grid grid-cols-1 lg:grid-cols-12 gap-5 items-start",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "lg:col-span-7 space-y-3",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																role: "button",
																tabIndex: 0,
																onClick: () => openProductLightbox(editingProduct, 0),
																onKeyDown: (e) => {
																	if (e.key === "Enter" || e.key === " ") {
																		e.preventDefault();
																		openProductLightbox(editingProduct, 0);
																	}
																},
																className: "relative w-full h-64 sm:h-76 md:h-84 rounded-2xl overflow-hidden bg-black/[0.05] border border-black/[0.08] shadow-sm group cursor-pointer",
																title: "Click to open photos in full-screen large preview",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																		src: editingProduct.image || "/images/jaw-crusher.jpg",
																		alt: editingProduct.name,
																		className: "size-full object-cover object-center transition-transform duration-500 group-hover:scale-105",
																		onError: (e) => {
																			e.target.src = "/images/hero.jpg";
																		}
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																			className: "rounded-full bg-black/75 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md flex items-center gap-2 shadow-md",
																			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-[#1FA855] animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Active Primary Photo" })]
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																			type: "button",
																			onClick: (e) => {
																				e.stopPropagation();
																				openProductLightbox(editingProduct, 0);
																			},
																			className: "pointer-events-auto rounded-full bg-black/60 hover:bg-black p-2 text-white shadow-md backdrop-blur-md transition-all active:scale-90 cursor-pointer",
																			title: "Zoom & Inspect HD Image in Large Screen (Z)",
																			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "size-4" })
																		})]
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																		className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-10 text-white",
																		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																			className: "flex items-center justify-between gap-2",
																			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																				className: "min-w-0",
																				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																					className: "text-sm font-semibold truncate leading-tight",
																					children: editingProduct.name
																				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																					className: "flex items-center gap-2 mt-1 text-xs text-white/80",
																					children: [
																						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																							className: "capitalize font-medium",
																							children: [editingProduct.category, " Division"]
																						}),
																						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
																						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																							className: "font-mono text-[11px]",
																							children: editingProduct.sku || editingProduct.id
																						})
																					]
																				})]
																			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																				className: "shrink-0 rounded-full bg-white/20 backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold text-white group-hover:bg-[#1FA855] transition-all",
																				children: "View Large Screen ↗"
																			})]
																		})
																	})
																]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex flex-wrap items-center justify-between gap-2 text-xs text-[#86868B]",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "flex items-center gap-1.5",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-[#1B833E]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Live high-resolution preview connected" })]
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																	type: "button",
																	onClick: () => openProductLightbox(editingProduct, 0),
																	className: "font-medium text-[#1D1D1F] hover:underline inline-flex items-center gap-1 cursor-pointer",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Inspect HD Fullscreen" })]
																})]
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "lg:col-span-5 space-y-4 rounded-2xl bg-[#F9F9FA] p-4.5 border border-black/[0.06]",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-xs font-semibold text-[#1D1D1F] block",
																	children: "Upload Additional or Primary Photos"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	className: "text-[11px] text-[#86868B] mt-0.5",
																	children: "Upload from device or enter URL. You can upload as many photos as needed."
																})] }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "grid grid-cols-2 gap-2",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
																		className: "flex flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-black/[0.15] bg-white p-3 hover:border-black/30 hover:bg-[#F5F5F7] cursor-pointer transition-all text-center",
																		children: [
																			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4 text-[#1D1D1F]" }),
																			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																				className: "text-[11px] font-semibold text-[#1D1D1F]",
																				children: "Set Primary"
																			}),
																			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																				className: "text-[9px] text-[#86868B]",
																				children: "Replace hero"
																			}),
																			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																				type: "file",
																				accept: "image/*",
																				onChange: (e) => handleImageUpload(e, true, false),
																				className: "hidden"
																			})
																		]
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
																		className: "flex flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/50 p-3 hover:border-emerald-500 hover:bg-emerald-50 cursor-pointer transition-all text-center",
																		children: [
																			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-4 text-emerald-700" }),
																			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																				className: "text-[11px] font-semibold text-emerald-900",
																				children: "Add to Gallery"
																			}),
																			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																				className: "text-[9px] text-emerald-700/80",
																				children: "Extra photo"
																			}),
																			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																				type: "file",
																				accept: "image/*",
																				onChange: (e) => handleImageUpload(e, true, true),
																				className: "hidden"
																			})
																		]
																	})]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "space-y-1.5",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
																		className: "text-xs font-medium text-[#1D1D1F] flex items-center justify-between",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Primary Photo URL / Path:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-[10px] text-[#86868B] font-mono",
																			children: "/images/..."
																		})]
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																		type: "text",
																		value: editingProduct.image,
																		onChange: (e) => setEditingProduct({
																			...editingProduct,
																			image: e.target.value
																		}),
																		placeholder: "/images/... or https://...",
																		className: "w-full h-8.5 rounded-xl border border-black/[0.08] bg-white px-3 text-xs text-[#1D1D1F] focus:outline-none focus:ring-1 focus:ring-black/20 font-mono text-[11px]"
																	})]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	className: "pt-1",
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
																		onSubmit: (e) => {
																			e.preventDefault();
																			const input = e.currentTarget.elements.namedItem("extraUrl");
																			if (input && input.value) {
																				handleAddGalleryUrl(input.value, true);
																				input.value = "";
																			}
																		},
																		className: "flex items-center gap-1.5",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																			type: "text",
																			name: "extraUrl",
																			placeholder: "Paste extra photo URL...",
																			className: "flex-1 h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-[11px] font-mono focus:outline-none focus:ring-1 focus:ring-black/20"
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																			type: "submit",
																			className: "h-8 px-3 rounded-lg bg-[#1D1D1F] text-white text-[11px] font-semibold hover:bg-black transition-all shrink-0 cursor-pointer",
																			children: "+ Add URL"
																		})]
																	})
																})
															]
														})]
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.03)] space-y-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "font-semibold text-[#1D1D1F] text-sm border-b border-black/[0.06] pb-3",
													children: "Model & Commercial Identity"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "sm:col-span-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																className: "mb-1 block font-medium text-[#1D1D1F]",
																children: "Equipment Model / Name *"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																type: "text",
																required: true,
																value: editingProduct.name,
																onChange: (e) => setEditingProduct({
																	...editingProduct,
																	name: e.target.value
																}),
																placeholder: "e.g. 250x400 Jaw Crusher or Cat 320D Excavator",
																className: "h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "mb-1 block font-medium text-[#1D1D1F]",
															children: "Division"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
															value: editingProduct.category,
															onChange: (e) => setEditingProduct({
																...editingProduct,
																category: e.target.value
															}),
															className: "h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "mining",
																	children: "Mining Equipment"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "hire",
																	children: "Construction Machinery Hire"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "hardware",
																	children: "Hardware & Construction"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "farming",
																	children: "Farming Machinery"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "industry",
																	children: "Industry & Manufacturing"
																})
															]
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "mb-1 block font-medium text-[#1D1D1F]",
															children: "Commercial Deal Type"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
															value: editingProduct.intent,
															onChange: (e) => setEditingProduct({
																...editingProduct,
																intent: e.target.value
															}),
															className: "h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "sale",
																children: "Outright Sale"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "hire",
																children: "Plant Hire / Rental"
															})]
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "mb-1 block font-medium text-[#1D1D1F]",
															children: "Indicative Rate / Price USD"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: editingProduct.priceUSD || editingProduct.price || "",
															onChange: (e) => setEditingProduct({
																...editingProduct,
																priceUSD: e.target.value,
																price: e.target.value
															}),
															placeholder: "e.g. $4,800 USD or $180/hr dry",
															className: "h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "mb-1 block font-medium text-[#1D1D1F]",
															children: "Price Note / Terms"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: editingProduct.priceNote || "",
															onChange: (e) => setEditingProduct({
																...editingProduct,
																priceNote: e.target.value
															}),
															placeholder: "e.g. FOB Cranborne Yard or Wet / Dry Options",
															className: "h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "mb-1 block font-medium text-[#1D1D1F]",
															children: "Cranborne Yard Stock Status"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
															value: editingProduct.stockStatus || "In Yard Cranborne",
															onChange: (e) => setEditingProduct({
																...editingProduct,
																stockStatus: e.target.value
															}),
															className: "h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none font-medium",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "In Yard Cranborne",
																	children: "In Yard Cranborne"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "In Transit (Beitbridge)",
																	children: "In Transit (Beitbridge)"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "Active on Site",
																	children: "Active on Site"
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																	value: "Special Order",
																	children: "Special Order"
																})
															]
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "mb-1 block font-medium text-[#1D1D1F]",
															children: "SKU / Model Identifier"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: editingProduct.sku || editingProduct.id,
															onChange: (e) => setEditingProduct({
																...editingProduct,
																sku: e.target.value
															}),
															placeholder: "e.g. OMNI-MIN-402",
															className: "h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none font-mono"
														})] })
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.03)] space-y-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "font-semibold text-[#1D1D1F] text-sm border-b border-black/[0.06] pb-3",
													children: "Technical Specifications & Power Engineering"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "mb-1 block font-medium text-[#1D1D1F]",
															children: "Hourly Throughput / Operating Capacity"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: editingProduct.throughput || "",
															onChange: (e) => setEditingProduct({
																...editingProduct,
																throughput: e.target.value
															}),
															placeholder: "e.g. 5–8 Tonnes / Hour or 37m Boom Reach",
															className: "h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "mb-1 block font-medium text-[#1D1D1F]",
															children: "Power Drive / Motor Configuration"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: editingProduct.powerOption || "",
															onChange: (e) => setEditingProduct({
																...editingProduct,
																powerOption: e.target.value
															}),
															placeholder: "e.g. 15kW 3-Phase Electric or 22HP Diesel Kit",
															className: "h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "sm:col-span-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																className: "mb-1 block font-medium text-[#1D1D1F]",
																children: "Quick Specification Tagline"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																type: "text",
																value: editingProduct.spec || "",
																onChange: (e) => setEditingProduct({
																	...editingProduct,
																	spec: e.target.value
																}),
																placeholder: "e.g. Primary crush · gold & chrome circuits",
																className: "h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "mb-1 block font-medium text-[#1D1D1F]",
															children: "Equipment Condition"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
															value: editingProduct.condition || "New",
															onChange: (e) => setEditingProduct({
																...editingProduct,
																condition: e.target.value
															}),
															className: "h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "New",
																children: "Brand New (Factory Direct)"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Refurbished / Certified",
																children: "Refurbished / Harare Certified"
															})]
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "mb-1 block font-medium text-[#1D1D1F]",
															children: "Warranty Period (Months)"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "number",
															min: 0,
															max: 60,
															value: editingProduct.warrantyMonths ?? 12,
															onChange: (e) => setEditingProduct({
																...editingProduct,
																warrantyMonths: Number(e.target.value) || 0
															}),
															className: "h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "sm:col-span-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																className: "mb-1 block font-medium text-[#1D1D1F]",
																children: "Catalogue Badge / Highlight Tag"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																type: "text",
																value: editingProduct.badge || "",
																onChange: (e) => setEditingProduct({
																	...editingProduct,
																	badge: e.target.value
																}),
																placeholder: "e.g. Processing, In Stock, Immediate Delivery, Heavy Fleet",
																className: "h-9 w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-[#1D1D1F] focus:bg-white focus:outline-none"
															})]
														})
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.03)] space-y-4",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "font-semibold text-[#1D1D1F] text-sm border-b border-black/[0.06] pb-3",
														children: "Catalogue Copy & Field Engineering Notes"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-3 text-xs",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "mb-1 block font-medium text-[#1D1D1F]",
															children: "Catalogue Overview & Application Summary *"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
															rows: 3,
															required: true,
															value: editingProduct.blurb,
															onChange: (e) => setEditingProduct({
																...editingProduct,
																blurb: e.target.value
															}),
															placeholder: "Clear, punchy operational overview for miners, farmers, or contractors.",
															className: "w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] p-3 leading-relaxed text-[#1D1D1F] focus:bg-white focus:outline-none"
														})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "mb-1 block font-medium text-[#1D1D1F]",
															children: "Detailed Technical Notes & Commissioning Details"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
															rows: 4,
															value: editingProduct.detailedNotes || "",
															onChange: (e) => setEditingProduct({
																...editingProduct,
																detailedNotes: e.target.value
															}),
															placeholder: "Liner manganese rating, discharge mesh settings, electrical starter box type, recommended generator kVA, and field commissioning protocol.",
															className: "w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] p-3 leading-relaxed text-[#1D1D1F] focus:bg-white focus:outline-none"
														})] })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-black/[0.06] pt-4",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: closeProductProfile,
															className: "inline-flex h-11 items-center rounded-full border border-black/[0.08] bg-[#F5F5F7] px-5 text-xs font-medium text-[#1D1D1F] hover:bg-black/[0.06] transition-colors",
															children: "Cancel"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
															type: "submit",
															className: "inline-flex h-11 items-center gap-2 rounded-full bg-[#1D1D1F] px-6 text-xs font-semibold text-white hover:bg-black transition-all active:scale-95 shadow-xs",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Save Specifications" })]
														})]
													})
												]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-5 lg:col-span-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.03)] space-y-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "block text-[10px] font-semibold uppercase tracking-wider text-[#86868B]",
															children: "Client WhatsApp Quotation"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "rounded-full bg-[#E8F8EE] px-2 py-0.5 text-[9px] font-bold text-[#1B833E]",
															children: "Live Spec Card"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-[#6E6E73] leading-relaxed",
														children: "Share these verified machinery specs and photo directly with clients inquiring on WhatsApp."
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "rounded-xl border border-black/[0.06] bg-[#F9F9FA] p-3 text-[11px] space-y-2 font-mono text-[#1D1D1F]",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "relative h-36 w-full rounded-lg overflow-hidden bg-black/[0.05] border border-black/[0.05]",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																	src: editingProduct.image || "/images/jaw-crusher.jpg",
																	alt: editingProduct.name,
																	className: "size-full object-cover",
																	onError: (e) => {
																		e.target.src = "/images/hero.jpg";
																	}
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "absolute top-1.5 left-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[9px] font-medium text-white backdrop-blur-xs font-sans capitalize",
																	children: editingProduct.category
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "font-semibold text-xs font-sans text-[#1D1D1F]",
																children: editingProduct.name
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																className: "text-[#6E6E73] text-[10px]",
																children: ["SKU: ", editingProduct.sku || editingProduct.id]
															})] }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "border-t border-black/[0.06] pt-1.5 space-y-1 text-[11px]",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
																		"• ",
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-[#86868B]",
																			children: "Throughput:"
																		}),
																		" ",
																		editingProduct.throughput || editingProduct.spec || "Site Rated"
																	] }),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
																		"• ",
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-[#86868B]",
																			children: "Drive:"
																		}),
																		" ",
																		editingProduct.powerOption || "Electric / Diesel"
																	] }),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
																		"• ",
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-[#86868B]",
																			children: "Yard:"
																		}),
																		" ",
																		editingProduct.stockStatus || "In Yard Cranborne"
																	] }),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
																		"• ",
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-[#86868B]",
																			children: "Rate:"
																		}),
																		" ",
																		editingProduct.priceUSD || editingProduct.price || "Tender on Request"
																	] })
																]
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: whatsappUrl(`Hello from Omnicore Solutions Harare. Regarding ${editingProduct.name} (${editingProduct.sku || editingProduct.id}):\n• Capacity: ${editingProduct.throughput || editingProduct.spec || "Site Rated"}\n• Power: ${editingProduct.powerOption || "Electric 3-Phase / Diesel"}\n• Availability: ${editingProduct.stockStatus || "In Yard Cranborne"}\n• Rate: ${editingProduct.priceUSD || editingProduct.price || "Tender on Request"}\n\nInspections welcome at 115 Chiremba Rd, Cranborne, Harare.`),
														target: "_blank",
														rel: "noopener noreferrer",
														className: "inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#1fa855] text-xs font-semibold text-white shadow-xs hover:bg-[#1b934b] transition-all",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Send Client Spec Sheet" })]
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.03)] space-y-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "block text-[10px] font-semibold uppercase tracking-wider text-[#86868B]",
														children: "Yard Management & Quick Actions"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														type: "button",
														onClick: () => handleToggleStockStatus(editingProduct.id),
														className: "inline-flex h-10 w-full items-center justify-between rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3.5 text-xs font-medium text-[#1D1D1F] hover:bg-black/[0.06] transition-colors",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Rotate Stock Status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "rounded-md bg-white px-2 py-0.5 text-[10px] font-semibold text-[#1D1D1F] shadow-2xs border border-black/[0.04]",
															children: editingProduct.stockStatus || "In Yard Cranborne"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-col gap-2 pt-1 text-xs",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
															to: "/catalogue",
															className: "inline-flex h-10 items-center justify-between rounded-xl border border-black/[0.08] bg-white px-3.5 font-medium text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Open Public Catalogue" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5 text-[#86868B]" })]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
															to: "/services/$slug",
															params: { slug: editingProduct.category },
															className: "inline-flex h-10 items-center justify-between rounded-xl border border-black/[0.08] bg-white px-3.5 font-medium text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "capitalize",
																children: [
																	"View ",
																	editingProduct.category,
																	" Division"
																]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5 text-[#86868B]" })]
														})]
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-2xl border border-red-200 bg-red-50/40 p-5 shadow-xs space-y-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "block text-[10px] font-semibold uppercase tracking-wider text-red-700",
														children: "Catalogue Decommissioning"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-red-600/90 leading-relaxed",
														children: "Move this machinery listing to the recycle bin. It will disappear from Cranborne inventory and the public catalogue until restored."
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														type: "button",
														onClick: () => handleDeleteProduct(editingProduct.id),
														className: "inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-full border border-red-200 bg-white text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Move to Recycle Bin" })]
													})
												]
											})
										]
									})]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-xl font-semibold tracking-tight text-[#1D1D1F]",
										children: "Machinery & Catalogue Inventory"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-[#86868B] mt-0.5",
										children: "Manage technical specifications, throughput, power drives, and stock status across Cranborne yard."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-[#86868B]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													value: productSearch,
													onChange: (e) => setProductSearch(e.target.value),
													placeholder: "Search model, throughput, SKU...",
													className: "h-9 w-48 sm:w-64 rounded-full border border-black/[0.08] bg-white pl-9 pr-3 text-xs text-[#1D1D1F] placeholder-[#86868B] shadow-2xs focus:outline-none"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												value: productCategoryFilter,
												onChange: (e) => setProductCategoryFilter(e.target.value),
												className: "h-9 rounded-full border border-black/[0.08] bg-white px-3 text-xs text-[#1D1D1F] shadow-2xs focus:outline-none",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "all",
														children: "All Divisions"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "mining",
														children: "Mining"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "hire",
														children: "Hire Plant"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "hardware",
														children: "Hardware & Fence"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "farming",
														children: "Farming"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "industry",
														children: "Industrial"
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => setShowAddProductModal(true),
												className: "inline-flex items-center gap-1.5 rounded-full bg-[#1D1D1F] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-black transition-all active:scale-95",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Add Machine" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => setActiveTab("recycle"),
												className: "inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-3 py-2 text-xs font-medium text-[#1D1D1F] shadow-2xs hover:bg-[#F5F5F7]",
												title: "Open recycle bin",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Recycle, { className: "size-3.5 text-[#6E6E73]" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "hidden sm:inline",
														children: "Bin"
													}),
													recycleBin.filter((i) => i.kind === "product").length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded-full bg-black/[0.06] px-1.5 text-[10px] font-semibold",
														children: recycleBin.filter((i) => i.kind === "product").length
													})
												]
											})
										]
									})]
								}),
								selectedProductIds.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#1D1D1F]/10 bg-[#1D1D1F] px-4 py-2.5 text-white shadow-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-semibold",
										children: [
											selectedProductIds.length,
											" machine",
											selectedProductIds.length === 1 ? "" : "s",
											" selected"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setSelectedProductIds([]),
											className: "rounded-full px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/10",
											children: "Clear"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setPendingAction({
												type: "delete-products",
												ids: selectedProductIds
											}),
											className: "inline-flex items-center gap-1.5 rounded-full bg-red-500 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-red-400",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), "Move to recycle bin"]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.03)]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "overflow-x-auto",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
											className: "w-full text-left text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
												className: "border-b border-black/[0.06] bg-[#FBFBFC] text-[11px] font-semibold text-[#86868B] uppercase tracking-wider",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "w-10 py-3 pl-4 pr-1",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowCheck, {
															label: "Select all machines on this page",
															checked: paginatedProducts.length > 0 && paginatedProducts.every((p) => selectedProductIds.includes(p.id)),
															indeterminate: paginatedProducts.some((p) => selectedProductIds.includes(p.id)) && !paginatedProducts.every((p) => selectedProductIds.includes(p.id)),
															onChange: (next) => {
																const pageIds = paginatedProducts.map((p) => p.id);
																setSelectedProductIds((prev) => next ? [.../* @__PURE__ */ new Set([...prev, ...pageIds])] : prev.filter((id) => !pageIds.includes(id)));
															}
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "py-3 px-4",
														children: "SKU / Equipment Name"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "py-3 px-3",
														children: "Division"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "py-3 px-3",
														children: "Throughput & Drive"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "py-3 px-3",
														children: "Yard Stock Status"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "py-3 px-3",
														children: "Indicative Rate"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
														className: "py-3 px-3 text-right",
														children: "Actions"
													})
												]
											}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
												className: "divide-y divide-black/[0.04]",
												children: filteredProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													colSpan: 7,
													className: "py-12 text-center text-[#86868B]",
													children: "No machinery records match the current filter."
												}) }) : paginatedProducts.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
													onClick: () => setPeekProductId(item.id),
													className: `cursor-pointer transition-colors ${selectedProductIds.includes(item.id) ? "bg-[#F3F8FF]" : peekProductId === item.id ? "bg-[#F5F5F7]" : "hover:bg-black/[0.015]"}`,
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "w-10 py-3 pl-4 pr-1",
															onClick: (e) => e.stopPropagation(),
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowCheck, {
																label: `Select ${item.name}`,
																checked: selectedProductIds.includes(item.id),
																onChange: (next) => setSelectedProductIds((prev) => next ? [...prev, item.id] : prev.filter((id) => id !== item.id))
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "py-3 px-4",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center gap-3",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	className: "size-11 rounded-xl overflow-hidden bg-black/[0.04] border border-black/[0.06] shrink-0 shadow-2xs",
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																		src: item.image || "/images/hero.jpg",
																		alt: item.name,
																		className: "size-full object-cover",
																		onError: (e) => {
																			e.target.src = "/images/hero.jpg";
																		}
																	})
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-semibold text-[#1D1D1F] block",
																	children: item.name
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[10px] font-mono text-[#86868B]",
																	children: item.sku || item.id
																})] })]
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "py-3 px-3",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "rounded-full bg-black/[0.04] px-2 py-0.5 text-[10px] font-medium text-[#6E6E73] uppercase tracking-wide",
																children: item.category
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
															className: "py-3 px-3 text-[#6E6E73]",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[#1D1D1F] font-medium block",
																children: item.throughput || item.spec
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[10px] text-[#86868B] block truncate max-w-[200px]",
																children: item.powerOption || "Electric 380V / Diesel"
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "py-3 px-3",
															onClick: (e) => e.stopPropagation(),
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																onClick: () => handleToggleStockStatus(item.id),
																className: `rounded-full px-2.5 py-0.5 text-[10px] font-medium transition-all ${item.stockStatus === "In Yard Cranborne" ? "bg-[#E8F8EE] text-[#1B833E]" : item.stockStatus === "In Transit (Beitbridge)" ? "bg-[#FFF4E5] text-[#B25E00]" : "bg-black/[0.04] text-[#6E6E73]"}`,
																children: item.stockStatus || "In Yard Cranborne"
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "py-3 px-3 font-semibold text-[#1D1D1F]",
															children: item.priceUSD || item.price || "Tender on Req"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "py-3 px-3 text-right",
															onClick: (e) => e.stopPropagation(),
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center justify-end gap-1",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																	onClick: () => openProductProfile(item),
																	className: "inline-flex h-11 items-center gap-1 rounded-full border border-black/[0.08] bg-white px-3 text-xs font-medium text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "size-3 text-[#6E6E73]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Edit Specs" })]
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																	type: "button",
																	onClick: () => setPendingAction({
																		type: "delete-products",
																		ids: [item.id]
																	}),
																	className: "inline-flex size-11 items-center justify-center rounded-full border border-red-200 bg-white text-red-600 hover:bg-red-50",
																	title: "Move to recycle bin",
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
																})]
															})
														})
													]
												}, item.id))
											})]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-black/[0.06] bg-[#FBFBFC] px-4 py-3 text-xs text-[#6E6E73]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Showing" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-[#1D1D1F]",
													children: filteredProducts.length === 0 ? 0 : (productPage - 1) * productPageSize + 1
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "to" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-[#1D1D1F]",
													children: Math.min(productPage * productPageSize, filteredProducts.length)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "of" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-[#1D1D1F]",
													children: filteredProducts.length
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "machinery models" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "mx-1 text-black/20",
													children: "|"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Per page:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
														value: productPageSize,
														onChange: (e) => {
															setProductPageSize(Number(e.target.value));
															setProductPage(1);
														},
														className: "rounded-lg border border-black/[0.08] bg-white px-2 py-0.5 text-xs text-[#1D1D1F] focus:outline-none",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: 6,
																children: "6"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: 12,
																children: "12"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: 24,
																children: "24"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: 50,
																children: "50"
															})
														]
													})]
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1 self-end sm:self-auto",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setProductPage(1),
													disabled: productPage <= 1,
													className: "rounded-lg p-1 text-[#6E6E73] hover:bg-black/[0.05] hover:text-[#1D1D1F] disabled:opacity-30 disabled:pointer-events-none transition-colors",
													title: "First page",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsLeft, { className: "size-4" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setProductPage((p) => Math.max(1, p - 1)),
													disabled: productPage <= 1,
													className: "rounded-lg p-1 text-[#6E6E73] hover:bg-black/[0.05] hover:text-[#1D1D1F] disabled:opacity-30 disabled:pointer-events-none transition-colors",
													title: "Previous page",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex items-center gap-1 px-1",
													children: Array.from({ length: productTotalPages }, (_, i) => i + 1).map((pageNum) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => setProductPage(pageNum),
														className: `min-w-6 h-6 rounded-md px-1.5 text-xs font-medium transition-all ${productPage === pageNum ? "bg-[#1D1D1F] text-white font-semibold shadow-xs" : "text-[#6E6E73] hover:bg-black/[0.05] hover:text-[#1D1D1F]"}`,
														children: pageNum
													}, pageNum))
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setProductPage((p) => Math.min(productTotalPages, p + 1)),
													disabled: productPage >= productTotalPages,
													className: "rounded-lg p-1 text-[#6E6E73] hover:bg-black/[0.05] hover:text-[#1D1D1F] disabled:opacity-30 disabled:pointer-events-none transition-colors",
													title: "Next page",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setProductPage(productTotalPages),
													disabled: productPage >= productTotalPages,
													className: "rounded-lg p-1 text-[#6E6E73] hover:bg-black/[0.05] hover:text-[#1D1D1F] disabled:opacity-30 disabled:pointer-events-none transition-colors",
													title: "Last page",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsRight, { className: "size-4" })
												})
											]
										})]
									})]
								})
							] }),
							peekProduct && !productProfileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm",
								onClick: () => setPeekProductId(null),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-full max-w-md rounded-2xl border border-black/[0.08] bg-white p-5 shadow-2xl",
									onClick: (e) => e.stopPropagation(),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex min-w-0 items-start gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "size-16 shrink-0 overflow-hidden rounded-xl border border-black/[0.06] bg-black/[0.04]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: peekProduct.image || "/images/hero.jpg",
														alt: peekProduct.name,
														className: "size-full object-cover",
														onError: (e) => {
															e.target.src = "/images/hero.jpg";
														}
													})
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "min-w-0",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "font-mono text-[11px] text-[#86868B]",
															children: peekProduct.sku || peekProduct.id
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
															className: "text-base font-semibold text-[#1D1D1F]",
															children: peekProduct.name
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-xs uppercase tracking-wide text-[#6E6E73]",
															children: peekProduct.category
														})
													]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setPeekProductId(null),
												className: "rounded-full p-2 text-[#86868B] hover:bg-[#F5F5F7] hover:text-[#1D1D1F]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 grid grid-cols-2 gap-2 text-xs",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-xl bg-[#F5F5F7] p-2.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "block text-[10px] uppercase text-[#86868B]",
														children: "Stock"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold text-[#1D1D1F]",
														children: peekProduct.stockStatus || "In Yard Cranborne"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-xl bg-[#F5F5F7] p-2.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "block text-[10px] uppercase text-[#86868B]",
														children: "Rate"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold text-[#1D1D1F]",
														children: peekProduct.priceUSD || peekProduct.price || "Tender on Req"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "col-span-2 rounded-xl bg-[#F5F5F7] p-2.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "block text-[10px] uppercase text-[#86868B]",
														children: "Throughput / drive"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "font-medium text-[#1D1D1F]",
														children: [
															peekProduct.throughput || peekProduct.spec,
															" · ",
															peekProduct.powerOption || "Electric / Diesel"
														]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "col-span-2 rounded-xl bg-[#F5F5F7] p-2.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "block text-[10px] uppercase text-[#86868B]",
														children: "Overview"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[#1D1D1F]",
														children: peekProduct.blurb
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => openProductProfile(peekProduct),
												className: "inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full bg-[#1D1D1F] text-xs font-semibold text-white hover:bg-black",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "size-3.5" }), "Edit specifications"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setPendingAction({
													type: "delete-products",
													ids: [peekProduct.id]
												}),
												className: "inline-flex h-11 items-center justify-center rounded-full border border-red-200 px-4 text-red-600 hover:bg-red-50",
												title: "Move to recycle bin",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
											})]
										})
									]
								})
							}),
							showAddProductModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-150",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-full max-w-xl rounded-2xl border border-black/[0.08] bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between border-b border-black/[0.06] pb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-sm font-semibold text-[#1D1D1F]",
											children: "Add Machinery to Cranborne Catalogue"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setShowAddProductModal(false),
											className: "rounded-full p-1 text-[#86868B] hover:bg-[#F5F5F7]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										onSubmit: handleCreateProduct,
										className: "mt-4 space-y-3.5 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-xl border border-black/[0.08] bg-[#FBFBFC] p-3.5 space-y-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex items-center justify-between",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold text-[#1D1D1F] block text-xs",
														children: "Equipment Photo & Live Preview"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[11px] text-[#86868B]",
														children: "Upload a photo from your device or select from Harare yard photo library."
													})] })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-col sm:flex-row gap-4 items-start",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														role: "button",
														tabIndex: 0,
														onClick: () => {
															setProductLightbox({
																isOpen: true,
																title: newProdName || "New Machinery Visual Preview",
																category: newProdCategory,
																price: newProdPrice,
																images: [newProdImage || "/images/jaw-crusher.jpg", ...newProdGallery].filter(Boolean),
																initialIndex: 0
															});
														},
														onKeyDown: (e) => {
															if (e.key === "Enter" || e.key === " ") {
																e.preventDefault();
																setProductLightbox({
																	isOpen: true,
																	title: newProdName || "New Machinery Visual Preview",
																	category: newProdCategory,
																	price: newProdPrice,
																	images: [newProdImage || "/images/jaw-crusher.jpg", ...newProdGallery].filter(Boolean),
																	initialIndex: 0
																});
															}
														},
														className: "relative size-28 sm:size-32 rounded-xl overflow-hidden bg-black/[0.05] border border-black/[0.08] shrink-0 shadow-xs group cursor-pointer",
														title: "Click to preview photo in large screen",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																src: newProdImage || "/images/jaw-crusher.jpg",
																alt: "Preview",
																className: "size-full object-cover object-center group-hover:scale-105 transition-transform",
																onError: (e) => {
																	e.target.src = "/images/hero.jpg";
																}
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-1",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "flex items-center gap-1 text-[9px] text-white font-medium bg-black/70 px-2 py-0.5 rounded-full",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "size-2.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View Large" })]
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
																	onClick: (e) => e.stopPropagation(),
																	className: "cursor-pointer text-white text-[9px] font-semibold bg-white/20 hover:bg-white hover:text-black px-2 py-0.5 rounded-md transition-colors",
																	children: ["Change", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																		type: "file",
																		accept: "image/*",
																		onChange: (e) => handleImageUpload(e, false),
																		className: "hidden"
																	})]
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-medium text-white backdrop-blur-xs",
																children: "Live Preview"
															})
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex-1 space-y-3 w-full",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex flex-wrap items-center justify-between gap-2",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
																	className: "inline-flex items-center gap-1.5 rounded-full border border-black/[0.1] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#1D1D1F] shadow-2xs hover:bg-[#F5F5F7] cursor-pointer transition-all active:scale-95",
																	children: [
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-3.5 text-[#1D1D1F]" }),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Upload Machine Image" }),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																			type: "file",
																			accept: "image/*",
																			onChange: (e) => handleImageUpload(e, false),
																			className: "hidden"
																		})
																	]
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "relative min-w-[180px]",
																	children: [
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-2 size-3 text-[#86868B]" }),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																			type: "text",
																			value: newPhotoPresetSearch,
																			onChange: (e) => setNewPhotoPresetSearch(e.target.value),
																			placeholder: "Search presets...",
																			className: "w-full h-7 rounded-full border border-black/[0.08] bg-[#F5F5F7] pl-7 pr-2.5 text-[11px] text-[#1D1D1F] focus:bg-white focus:outline-none"
																		}),
																		newPhotoPresetSearch && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																			type: "button",
																			onClick: () => setNewPhotoPresetSearch(""),
																			className: "absolute right-2 top-2 text-[#86868B] hover:text-[#1D1D1F]",
																			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
																		})
																	]
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "flex flex-wrap items-center gap-1",
																children: [
																	{
																		id: "all",
																		label: "All Fleet"
																	},
																	{
																		id: "mining",
																		label: "Mining"
																	},
																	{
																		id: "hire",
																		label: "Hire"
																	},
																	{
																		id: "farming",
																		label: "Farming"
																	},
																	{
																		id: "hardware",
																		label: "Hardware"
																	},
																	{
																		id: "industry",
																		label: "Industry"
																	}
																].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																	type: "button",
																	onClick: () => setNewPresetCategoryFilter(f.id),
																	className: `rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all ${newPresetCategoryFilter === f.id ? "bg-[#1D1D1F] text-white font-semibold shadow-2xs" : "bg-black/[0.04] text-[#6E6E73] hover:text-[#1D1D1F]"}`,
																	children: f.label
																}, f.id))
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-56 overflow-y-auto p-2 rounded-xl bg-[#F9F9FA] border border-black/[0.06]",
																children: YARD_PHOTO_PRESETS.filter((p) => {
																	const matchesCat = newPresetCategoryFilter === "all" || p.category === newPresetCategoryFilter;
																	const matchesSearch = !newPhotoPresetSearch || p.label.toLowerCase().includes(newPhotoPresetSearch.toLowerCase()) || p.spec.toLowerCase().includes(newPhotoPresetSearch.toLowerCase());
																	return matchesCat && matchesSearch;
																}).map((preset) => {
																	const isSelected = newProdImage === preset.src;
																	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																		type: "button",
																		onClick: () => setNewProdImage(preset.src),
																		className: `group relative flex flex-col text-left rounded-xl p-2 border transition-all ${isSelected ? "border-[#1D1D1F] bg-white ring-2 ring-[#1D1D1F] shadow-xs" : "border-black/[0.08] bg-white hover:border-black/[0.2]"}`,
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																			className: "relative h-20 w-full rounded-lg overflow-hidden bg-black/[0.04] mb-1.5",
																			children: [
																				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																					src: preset.src,
																					alt: preset.label,
																					className: "size-full object-cover transition-transform duration-300 group-hover:scale-105",
																					onError: (e) => {
																						e.target.src = "/images/hero.jpg";
																					}
																				}),
																				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																					className: "absolute top-1 left-1 rounded bg-black/70 px-1.5 py-0.5 text-[8px] font-semibold text-white uppercase tracking-wider backdrop-blur-xs",
																					children: preset.category
																				}),
																				isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																					className: "absolute top-1 right-1 size-5 rounded-full bg-[#1FA855] text-white flex items-center justify-center shadow-xs",
																					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3 stroke-[2.5]" })
																				})
																			]
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																			className: "min-w-0",
																			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																				className: "text-[11px] font-semibold text-[#1D1D1F] truncate group-hover:text-black",
																				children: preset.label
																			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																				className: "text-[10px] text-[#6E6E73] truncate",
																				children: preset.spec
																			})]
																		})]
																	}, preset.src);
																})
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center gap-2 pt-1",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[11px] font-medium text-[#1D1D1F] shrink-0",
																	children: "Custom URL / Path:"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																	type: "text",
																	value: newProdImage,
																	onChange: (e) => setNewProdImage(e.target.value),
																	placeholder: "/images/... or https://...",
																	className: "w-full h-8 rounded-xl border border-black/[0.08] bg-white px-3 text-xs text-[#1D1D1F] focus:outline-none font-mono text-[11px]"
																})]
															})
														]
													})]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "font-medium text-[#1D1D1F] block mb-1",
													children: "Equipment Model / Name *"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													required: true,
													value: newProdName,
													onChange: (e) => setNewProdName(e.target.value),
													placeholder: "e.g. 250x400 Jaw Crusher or Cat 320D",
													className: "w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 focus:bg-white focus:outline-none"
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "font-medium text-[#1D1D1F] block mb-1",
													children: "Division"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													value: newProdCategory,
													onChange: (e) => setNewProdCategory(e.target.value),
													className: "w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 focus:bg-white focus:outline-none",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "mining",
															children: "Mining Equipment"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "hire",
															children: "Construction Machinery Hire"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "hardware",
															children: "Hardware & Construction"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "farming",
															children: "Farming Machinery"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "industry",
															children: "Industry & Manufacturing"
														})
													]
												})] })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "font-medium text-[#1D1D1F] block mb-1",
														children: "Hourly Throughput"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: newProdThroughput,
														onChange: (e) => setNewProdThroughput(e.target.value),
														placeholder: "e.g. 5–15 TPH or 35m boom",
														className: "w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 focus:bg-white focus:outline-none"
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "font-medium text-[#1D1D1F] block mb-1",
														children: "Power / Motor Drive"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: newProdPower,
														onChange: (e) => setNewProdPower(e.target.value),
														placeholder: "e.g. 15kW 380V or 35HP diesel",
														className: "w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 focus:bg-white focus:outline-none"
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "font-medium text-[#1D1D1F] block mb-1",
														children: "Indicative Price / Rate"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: newProdPrice,
														onChange: (e) => setNewProdPrice(e.target.value),
														placeholder: "e.g. $18,500 FOB Harare",
														className: "w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 focus:bg-white focus:outline-none"
													})] })
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "font-medium text-[#1D1D1F] block mb-1",
												children: "Technical Overview / Tagline"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: newProdBlurb,
												onChange: (e) => setNewProdBlurb(e.target.value),
												placeholder: "Primary crushing for gold ore circuits. Heavy cast-steel eccentric shaft.",
												className: "w-full h-8 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 focus:bg-white focus:outline-none"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-end gap-2 pt-2 border-t border-black/[0.06]",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setShowAddProductModal(false),
													className: "rounded-full bg-[#F5F5F7] px-4 py-1.5 text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F]",
													children: "Cancel"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "submit",
													className: "rounded-full bg-[#1D1D1F] px-4 py-1.5 text-xs font-semibold text-white hover:bg-black",
													children: "Add to Inventory"
												})]
											})
										]
									})]
								})
							})
						]
					}),
					activeTab === "cms" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 rounded-3xl bg-white p-5 sm:p-6 border border-black/[0.06] shadow-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex size-7 items-center justify-center rounded-lg bg-black/[0.05] text-[#1D1D1F]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-amber-500" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-xl font-semibold tracking-tight text-[#1D1D1F]",
										children: "Website Copy, Brand & Content Management"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-[#86868B] mt-1 max-w-2xl",
									children: "Manage live headlines, Harare yard details, official contact channels, operating hours, and divisional messaging across Omnicore Solutions. Changes update in real-time nationwide."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative min-w-[200px] sm:min-w-[240px]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-2.5 size-3.5 text-[#86868B]" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													placeholder: "Search any copy or field...",
													value: cmsSearch,
													onChange: (e) => setCmsSearch(e.target.value),
													className: "w-full h-8.5 rounded-full border border-black/[0.08] bg-[#F5F5F7] pl-8.5 pr-3 text-xs focus:bg-white focus:outline-none transition-colors"
												}),
												cmsSearch && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setCmsSearch(""),
													className: "absolute right-2.5 top-2.5 text-[#86868B] hover:text-[#1D1D1F]",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: handleResetSiteCopy,
											className: "inline-flex h-8.5 items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-3.5 text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all active:scale-95",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5 text-[#86868B]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reset Defaults" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "inline-flex rounded-full bg-[#F5F5F7] p-0.5 border border-black/[0.08] text-xs",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => {
													setCmsLayoutMode("split");
													setIsCmsPreviewOpen(!isCmsPreviewOpen);
												},
												className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all ${isCmsPreviewOpen && cmsLayoutMode === "split" ? "bg-white text-[#1D1D1F] shadow-2xs font-semibold" : "text-[#6E6E73] hover:text-[#1D1D1F]"}`,
												title: "Toggle Live Interactive Visual Preview panel",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3.5 text-emerald-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isCmsPreviewOpen && cmsLayoutMode === "split" ? "Hide Live Preview" : "Show Live Preview" })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => {
													setCmsLayoutMode("full");
													setIsCmsPreviewOpen(false);
												},
												className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all ${cmsLayoutMode === "full" ? "bg-white text-[#1D1D1F] shadow-2xs font-semibold" : "text-[#6E6E73] hover:text-[#1D1D1F]"}`,
												title: "Expand across 100% of screen real estate with multi-column layouts",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Full-Width Editor" })]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: "/",
											target: "_blank",
											rel: "noopener noreferrer",
											className: "inline-flex h-8.5 items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-3.5 text-xs font-medium text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all active:scale-95",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5 text-[#86868B]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View Public Site" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => handleSaveSiteCopy(),
											className: `inline-flex h-8.5 items-center gap-1.5 rounded-full px-5 text-xs font-semibold text-white shadow-xs transition-all active:scale-95 ${hasUnsavedChanges ? "bg-[#1FA855] hover:bg-[#1B934B] animate-pulse" : "bg-[#1D1D1F] hover:bg-black"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: hasUnsavedChanges ? "Publish Changes Live *" : "Published Live" })]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap items-center gap-1.5 rounded-2xl bg-white p-2 border border-black/[0.06] shadow-2xs",
								children: [
									{
										id: "hero",
										label: "🌟 Hero & Brand",
										count: 12
									},
									{
										id: "yard",
										label: "📍 Yard, Facility & Delivery",
										count: 8
									},
									{
										id: "contact",
										label: "📞 Contact Channels & Hotlines",
										count: 10
									},
									{
										id: "hours",
										label: "⏰ Hours, Warranties & Terms",
										count: 10
									},
									{
										id: "divisions",
										label: "🚜 Division Copy (5 Sectors)",
										count: 15
									},
									{
										id: "about",
										label: "🏢 About & Corporate Pillars",
										count: 8
									},
									{
										id: "social",
										label: "⚖️ Social, Legal & Footer",
										count: 8
									},
									{
										id: "all",
										label: "📋 All Sections",
										count: 71
									}
								].map((cat) => {
									const isActive = cmsCategory === cat.id;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setCmsCategory(cat.id),
										className: `inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${isActive ? "bg-[#1D1D1F] text-white shadow-2xs font-semibold" : "text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: cat.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `rounded-full px-1.5 py-0.2 text-[10px] font-semibold ${isActive ? "bg-white/20 text-white" : "bg-black/[0.05] text-[#86868B]"}`,
											children: cat.count
										})]
									}, cat.id);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cmsLayoutMode === "split" && isCmsPreviewOpen ? "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" : "w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: cmsLayoutMode === "split" && isCmsPreviewOpen ? "lg:col-span-7 xl:col-span-7 space-y-6" : "w-full space-y-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										onSubmit: handleSaveSiteCopy,
										className: "space-y-6",
										children: [
											(cmsCategory === "hero" || cmsCategory === "all" || cmsSearch) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-3xl border border-black/[0.06] bg-white p-5 sm:p-7 shadow-xs space-y-5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between pb-3.5 border-b border-black/[0.05]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-2.5",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "flex size-8 items-center justify-center rounded-xl bg-amber-50 text-amber-700",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4.5" })
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
																className: "text-base font-semibold text-[#1D1D1F]",
																children: "Hero Banner & Brand Identity Messaging"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-xs text-[#86868B] mt-0.5",
																children: "Controls the primary landing headlines, yard announcement banner, call-to-actions, and key stats."
															})] })]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "rounded-full bg-amber-100/70 px-3 py-1 text-xs font-semibold text-amber-800",
															children: "Above The Fold"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
																children: "Company Legal Name"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																type: "text",
																value: cmsForm.name,
																onChange: (e) => updateCmsField("name", e.target.value),
																className: "w-full h-9 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none",
																placeholder: "Omnicore Solutions"
															})] }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
																children: "Brand Short Name"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																type: "text",
																value: cmsForm.shortName,
																onChange: (e) => updateCmsField("shortName", e.target.value),
																className: "w-full h-9 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none",
																placeholder: "Omnicore"
															})] }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "xl:col-span-2",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																	className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
																	children: "Company Tagline"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																	type: "text",
																	value: cmsForm.tagline,
																	onChange: (e) => updateCmsField("tagline", e.target.value),
																	className: "w-full h-9 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none",
																	placeholder: "Machinery for Zimbabwe's farms, mines and sites."
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
																children: "Founded Year"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																type: "text",
																value: cmsForm.foundedYear,
																onChange: (e) => updateCmsField("foundedYear", e.target.value),
																className: "w-full h-9 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none",
																placeholder: "2024"
															})] })
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "grid grid-cols-1 lg:grid-cols-2 gap-3.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
															children: "Top Yard & Operational Announcement Banner"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: cmsForm.heroBannerAnnouncement || "",
															onChange: (e) => updateCmsField("heroBannerAnnouncement", e.target.value),
															className: "w-full h-9 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none",
															placeholder: "Cranborne Yard Open Mon–Sat · Lowbed Deliveries Nationwide"
														})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
															children: "Cranborne Yard Badge Text (Top of Hero)"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: cmsForm.heroBadge,
															onChange: (e) => updateCmsField("heroBadge", e.target.value),
															className: "w-full h-9 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none",
															placeholder: "Cranborne yard · 115 Chiremba Road, Harare"
														})] })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-start",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "lg:col-span-6 space-y-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																className: "font-semibold text-[#1D1D1F] text-xs block",
																children: "Homepage Hero Headline"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																type: "text",
																value: cmsForm.heroHeadline,
																onChange: (e) => updateCmsField("heroHeadline", e.target.value),
																className: "w-full h-11 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3.5 text-sm font-semibold text-[#1D1D1F] focus:bg-white focus:outline-none",
																placeholder: "Plant for Zimbabwe’s mines, farms and pours."
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "lg:col-span-6 space-y-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center justify-between",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																	className: "font-semibold text-[#1D1D1F] text-xs",
																	children: "Hero Narrative Subheadline"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "text-[10px] text-[#86868B]",
																	children: [cmsForm.heroSubheadline.length, " chars"]
																})]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
																rows: 3,
																value: cmsForm.heroSubheadline,
																onChange: (e) => updateCmsField("heroSubheadline", e.target.value),
																className: "w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] p-3 text-xs leading-relaxed focus:bg-white focus:outline-none",
																placeholder: "Gold circuits, fence plant, self-loading mixers..."
															})]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "grid grid-cols-1 sm:grid-cols-3 gap-3.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
																children: "Primary CTA Button (WhatsApp Direct)"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																type: "text",
																value: cmsForm.heroCtaPrimary,
																onChange: (e) => updateCmsField("heroCtaPrimary", e.target.value),
																className: "w-full h-9 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none font-medium",
																placeholder: "Chat on WhatsApp"
															})] }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
																children: "Secondary CTA Button (Tender Quote)"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																type: "text",
																value: cmsForm.heroCtaSecondary,
																onChange: (e) => updateCmsField("heroCtaSecondary", e.target.value),
																className: "w-full h-9 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none font-medium",
																placeholder: "Request a firm quote"
															})] }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
																children: "Tertiary CTA Button (Catalogue Browse)"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																type: "text",
																value: cmsForm.heroCtaTertiary,
																onChange: (e) => updateCmsField("heroCtaTertiary", e.target.value),
																className: "w-full h-9 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none font-medium",
																placeholder: "Open the catalogue"
															})] })
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "pt-3 border-t border-black/[0.05]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "font-semibold text-[#1D1D1F] text-xs mb-2.5",
															children: "Homepage 4 Statistics Highlights"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "rounded-2xl border border-black/[0.06] bg-[#F9F9FA] p-3 space-y-2",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "text-[10px] font-bold text-[#86868B] uppercase tracking-wider",
																		children: "Stat 1"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "space-y-1.5",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																			type: "text",
																			placeholder: "Label (e.g. Harare hub)",
																			value: cmsForm.stat1Label,
																			onChange: (e) => updateCmsField("stat1Label", e.target.value),
																			className: "w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-semibold"
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																			type: "text",
																			placeholder: "Detail (e.g. Cranborne yard)",
																			value: cmsForm.stat1Detail,
																			onChange: (e) => updateCmsField("stat1Detail", e.target.value),
																			className: "w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#6E6E73]"
																		})]
																	})]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "rounded-2xl border border-black/[0.06] bg-[#F9F9FA] p-3 space-y-2",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "text-[10px] font-bold text-[#86868B] uppercase tracking-wider",
																		children: "Stat 2"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "space-y-1.5",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																			type: "text",
																			placeholder: "Label (e.g. 1–25 TPH)",
																			value: cmsForm.stat2Label,
																			onChange: (e) => updateCmsField("stat2Label", e.target.value),
																			className: "w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-semibold"
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																			type: "text",
																			placeholder: "Detail (e.g. Gold circuits)",
																			value: cmsForm.stat2Detail,
																			onChange: (e) => updateCmsField("stat2Detail", e.target.value),
																			className: "w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#6E6E73]"
																		})]
																	})]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "rounded-2xl border border-black/[0.06] bg-[#F9F9FA] p-3 space-y-2",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "text-[10px] font-bold text-[#86868B] uppercase tracking-wider",
																		children: "Stat 3"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "space-y-1.5",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																			type: "text",
																			placeholder: "Label (e.g. Wet & dry)",
																			value: cmsForm.stat3Label,
																			onChange: (e) => updateCmsField("stat3Label", e.target.value),
																			className: "w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-semibold"
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																			type: "text",
																			placeholder: "Detail (e.g. Plant hire)",
																			value: cmsForm.stat3Detail,
																			onChange: (e) => updateCmsField("stat3Detail", e.target.value),
																			className: "w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#6E6E73]"
																		})]
																	})]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "rounded-2xl border border-black/[0.06] bg-[#F9F9FA] p-3 space-y-2",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "text-[10px] font-bold text-[#86868B] uppercase tracking-wider",
																		children: "Stat 4"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "space-y-1.5",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																			type: "text",
																			placeholder: "Label (e.g. 10 provinces)",
																			value: cmsForm.stat4Label,
																			onChange: (e) => updateCmsField("stat4Label", e.target.value),
																			className: "w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-semibold"
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																			type: "text",
																			placeholder: "Detail (e.g. Lowbed delivery)",
																			value: cmsForm.stat4Detail,
																			onChange: (e) => updateCmsField("stat4Detail", e.target.value),
																			className: "w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#6E6E73]"
																		})]
																	})]
																})
															]
														})]
													})
												]
											}),
											(cmsCategory === "yard" || cmsCategory === "all" || cmsSearch) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-3xl border border-black/[0.06] bg-white p-5 sm:p-6 shadow-xs space-y-4",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between pb-3 border-b border-black/[0.05]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "flex size-7 items-center justify-center rounded-lg bg-blue-50 text-blue-700",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" })
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
																className: "text-sm font-semibold text-[#1D1D1F]",
																children: "Yard Location & Physical Presence"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-[11px] text-[#86868B]",
																children: "Physical demonstration yard, lowbed loading access, and Google Maps pin coordinates."
															})] })]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "rounded-full bg-blue-100/60 px-2 py-0.5 text-[10px] font-semibold text-blue-800",
															children: "Harare Hub"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "grid grid-cols-1 sm:grid-cols-2 gap-3.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
															children: "Street Address Line 1"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: cmsForm.yardAddressLine1,
															onChange: (e) => updateCmsField("yardAddressLine1", e.target.value),
															className: "w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none",
															placeholder: "115 Chiremba Road"
														})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
															children: "Suburb & Industrial Belt Line 2"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: cmsForm.yardAddressLine2,
															onChange: (e) => updateCmsField("yardAddressLine2", e.target.value),
															className: "w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none",
															placeholder: "Cranborne, Harare"
														})] })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "grid grid-cols-1 sm:grid-cols-2 gap-3.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
															children: "City / Metro"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: cmsForm.yardCity,
															onChange: (e) => updateCmsField("yardCity", e.target.value),
															className: "w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none",
															placeholder: "Harare"
														})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
															children: "Country"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: cmsForm.yardCountry,
															onChange: (e) => updateCmsField("yardCountry", e.target.value),
															className: "w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none",
															placeholder: "Zimbabwe"
														})] })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
														children: "Google Maps Pin URL"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "url",
														value: cmsForm.googleMapsUrl,
														onChange: (e) => updateCmsField("googleMapsUrl", e.target.value),
														className: "w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none font-mono text-[11px]",
														placeholder: "https://www.google.com/maps/search/?api=1&query=..."
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
														children: "Directions & Heavy Machinery Loading Guidance"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
														rows: 2,
														value: cmsForm.yardDirectionsNote,
														onChange: (e) => updateCmsField("yardDirectionsNote", e.target.value),
														className: "w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] p-3 text-xs leading-relaxed focus:bg-white focus:outline-none",
														placeholder: "Along Chiremba Road, close to major Harare arterial routes..."
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
														children: "Yard Inspection & Testing Policy"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: cmsForm.inspectionNotice,
														onChange: (e) => updateCmsField("inspectionNotice", e.target.value),
														className: "w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none",
														placeholder: "Physical yard mechanical inspections welcome Monday–Saturday at 115 Chiremba Rd, Cranborne."
													})] })
												]
											}),
											(cmsCategory === "contact" || cmsCategory === "all" || cmsSearch) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-3xl border border-black/[0.06] bg-white p-5 sm:p-6 shadow-xs space-y-4",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between pb-3 border-b border-black/[0.05]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "flex size-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "size-4" })
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
																className: "text-sm font-semibold text-[#1D1D1F]",
																children: "Contact Channels, Emergency Hotlines & WhatsApp Desk"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-[11px] text-[#86868B]",
																children: "Direct voice lines, 24/7 site breakdown hotlines, WhatsApp numbers, and official email inboxes."
															})] })]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "rounded-full bg-emerald-100/60 px-2 py-0.5 text-[10px] font-semibold text-emerald-800",
															children: "Direct Lines"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "grid grid-cols-1 sm:grid-cols-2 gap-3.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
															children: "Primary Phone (Display)"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: cmsForm.primaryPhone,
															onChange: (e) => updateCmsField("primaryPhone", e.target.value),
															className: "w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none",
															placeholder: "+263 77 733 4569"
														})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
															children: "Primary Phone (Dialable URL)"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: cmsForm.primaryPhoneTel,
															onChange: (e) => updateCmsField("primaryPhoneTel", e.target.value),
															className: "w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none font-mono text-[11px]",
															placeholder: "+263777334569"
														})] })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "grid grid-cols-1 sm:grid-cols-2 gap-3.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
															children: "Secondary Alternate Phone (Display)"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: cmsForm.secondaryPhone,
															onChange: (e) => updateCmsField("secondaryPhone", e.target.value),
															className: "w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none",
															placeholder: "+263 78 871 6082"
														})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
															children: "Secondary Phone (Dialable URL)"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: cmsForm.secondaryPhoneTel,
															onChange: (e) => updateCmsField("secondaryPhoneTel", e.target.value),
															className: "w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none font-mono text-[11px]",
															placeholder: "+263788716082"
														})] })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "grid grid-cols-1 sm:grid-cols-2 gap-3.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
															children: "Emergency 24/7 Breakdown Hotline (Display)"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: cmsForm.emergencyHotline,
															onChange: (e) => updateCmsField("emergencyHotline", e.target.value),
															className: "w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none",
															placeholder: "+263 77 733 4569"
														})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
															children: "Emergency Hotline (Dialable URL)"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: cmsForm.emergencyHotlineTel,
															onChange: (e) => updateCmsField("emergencyHotlineTel", e.target.value),
															className: "w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none font-mono text-[11px]",
															placeholder: "+263777334569"
														})] })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "grid grid-cols-1 sm:grid-cols-2 gap-3.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
															children: "WhatsApp Business Number (digits only)"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: cmsForm.whatsappNumber,
															onChange: (e) => updateCmsField("whatsappNumber", e.target.value),
															className: "w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none font-mono text-[11px]",
															placeholder: "263777334569"
														})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
															children: "Technical Desk Email"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "email",
															value: cmsForm.email,
															onChange: (e) => updateCmsField("email", e.target.value),
															className: "w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none",
															placeholder: "omnicore-solutions@outlook.com"
														})] })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
														children: "Sales & Tenders Email"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "email",
														value: cmsForm.salesEmail,
														onChange: (e) => updateCmsField("salesEmail", e.target.value),
														className: "w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none",
														placeholder: "sales@omnicoresolutions.co.zw"
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
														children: "Default WhatsApp Inbound Message Preset"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: cmsForm.whatsappMessage,
														onChange: (e) => updateCmsField("whatsappMessage", e.target.value),
														className: "w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none",
														placeholder: "Hello Omnicore Harare Desk — I would like an equipment quote."
													})] })
												]
											}),
											(cmsCategory === "hours" || cmsCategory === "all" || cmsSearch) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-3xl border border-black/[0.06] bg-white p-5 sm:p-6 shadow-xs space-y-4",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between pb-3 border-b border-black/[0.05]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "flex size-7 items-center justify-center rounded-lg bg-purple-50 text-purple-700",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4" })
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
																className: "text-sm font-semibold text-[#1D1D1F]",
																children: "Operating Hours, Dispatch Turnaround & SLAs"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-[11px] text-[#86868B]",
																children: "Demonstration times, loading schedules, after-hours hotlines, delivery turnarounds, and terms."
															})] })]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "rounded-full bg-purple-100/60 px-2 py-0.5 text-[10px] font-semibold text-purple-800",
															children: "SLA & Yard Times"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "grid grid-cols-1 sm:grid-cols-2 gap-3.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
															children: "Monday – Friday Hours"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: cmsForm.hoursWeekday,
															onChange: (e) => updateCmsField("hoursWeekday", e.target.value),
															className: "w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none",
															placeholder: "08:00 – 17:00"
														})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
															children: "Saturday Hours"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: cmsForm.hoursSaturday,
															onChange: (e) => updateCmsField("hoursSaturday", e.target.value),
															className: "w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none",
															placeholder: "08:00 – 13:00"
														})] })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "grid grid-cols-1 sm:grid-cols-2 gap-3.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
															children: "Sunday & Public Holiday Policy"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: cmsForm.hoursSunday,
															onChange: (e) => updateCmsField("hoursSunday", e.target.value),
															className: "w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none",
															placeholder: "Closed · WhatsApp desk monitored"
														})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
															children: "Quotation & Price SLA Statement"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: cmsForm.responseSLA,
															onChange: (e) => updateCmsField("responseSLA", e.target.value),
															className: "w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none",
															placeholder: "Average tender & pricing turnaround under 15 minutes during yard hours."
														})] })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
														children: "Nationwide Dispatch & Delivery Lead Time"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: cmsForm.dispatchTurnaround,
														onChange: (e) => updateCmsField("dispatchTurnaround", e.target.value),
														className: "w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none",
														placeholder: "Same-day lowbed loading for in-stock plant; 24–48h nationwide delivery."
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
														children: "After-Hours & Breakdown Emergency Notice"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: cmsForm.afterHoursNotice,
														onChange: (e) => updateCmsField("afterHoursNotice", e.target.value),
														className: "w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none",
														placeholder: "Urgent site breakdown & pump dispatch hotline active 24/7 on WhatsApp."
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
														children: "Standard Factory Parts Warranty Statement"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: cmsForm.warrantyNotice,
														onChange: (e) => updateCmsField("warrantyNotice", e.target.value),
														className: "w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none",
														placeholder: "12-month factory parts warranty & Harare commissioning included."
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "grid grid-cols-1 sm:grid-cols-2 gap-3.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
															children: "Accepted Payment Currencies & Terms"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: cmsForm.termsNotice,
															onChange: (e) => updateCmsField("termsNotice", e.target.value),
															className: "w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none",
															placeholder: "All quotes issued in USD payable via Nostro, RTGS, or cash on collection."
														})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
															children: "Payment Channels Accepted"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: cmsForm.paymentMethods,
															onChange: (e) => updateCmsField("paymentMethods", e.target.value),
															className: "w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none",
															placeholder: "Bank Transfer, Nostro, USD Cash, EcoCash, ZIPIT"
														})] })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
														children: "Formal Tenders & PRAZ Procurement Notice"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: cmsForm.tendersNotice || "",
														onChange: (e) => updateCmsField("tendersNotice", e.target.value),
														className: "w-full h-9 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none",
														placeholder: "PRAZ Registered Supplier · Formal tenders, municipal quotes & mine procurement packs issued within 24h."
													})] })
												]
											}),
											(cmsCategory === "divisions" || cmsCategory === "all" || cmsSearch) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-3xl border border-black/[0.06] bg-white p-5 sm:p-7 shadow-xs space-y-5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between pb-3.5 border-b border-black/[0.05]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "flex size-8 items-center justify-center rounded-xl bg-orange-50 text-orange-700",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "size-4.5" })
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
															className: "text-base font-semibold text-[#1D1D1F]",
															children: "Specialized Division Headlines, Eyebrows & Narrative Copy"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-xs text-[#86868B] mt-0.5",
															children: "Custom positioning headlines, sector eyebrows, and sub-narratives across the 5 industrial division sections."
														})] })]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rounded-full bg-orange-100/70 px-3 py-1 text-xs font-semibold text-orange-800",
														children: "5 Sectors"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4.5",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "p-4 rounded-2xl bg-[#F9F9FA] border border-black/[0.05] space-y-2.5",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center justify-between",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-xs font-bold text-amber-800 uppercase tracking-wider",
																	children: "1. Mining Equipment"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[10px] font-medium text-[#86868B]",
																	children: "Gold & Chrome"
																})]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "space-y-2",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																		className: "text-[10px] font-medium text-[#86868B] block mb-1",
																		children: "Eyebrow"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																		type: "text",
																		value: cmsForm.miningEyebrow,
																		onChange: (e) => updateCmsField("miningEyebrow", e.target.value),
																		className: "w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-medium"
																	})] }),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																		className: "text-[10px] font-medium text-[#86868B] block mb-1",
																		children: "Headline"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																		type: "text",
																		value: cmsForm.miningHeadline,
																		onChange: (e) => updateCmsField("miningHeadline", e.target.value),
																		className: "w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-semibold text-[#1D1D1F]"
																	})] }),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																		className: "text-[10px] font-medium text-[#86868B] block mb-1",
																		children: "Narrative Subheadline"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
																		rows: 2,
																		value: cmsForm.miningSubheadline || "",
																		onChange: (e) => updateCmsField("miningSubheadline", e.target.value),
																		className: "w-full rounded-lg border border-black/[0.08] bg-white p-2 text-xs leading-relaxed",
																		placeholder: "Complete gravity and milling circuits engineered for small-scale and commercial miners..."
																	})] })
																]
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "p-4 rounded-2xl bg-[#F9F9FA] border border-black/[0.05] space-y-2.5",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center justify-between",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-xs font-bold text-blue-800 uppercase tracking-wider",
																	children: "2. Plant Hire Fleet"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[10px] font-medium text-[#86868B]",
																	children: "Yellow Metal"
																})]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "space-y-2",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																		className: "text-[10px] font-medium text-[#86868B] block mb-1",
																		children: "Eyebrow"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																		type: "text",
																		value: cmsForm.hireEyebrow,
																		onChange: (e) => updateCmsField("hireEyebrow", e.target.value),
																		className: "w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-medium"
																	})] }),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																		className: "text-[10px] font-medium text-[#86868B] block mb-1",
																		children: "Headline"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																		type: "text",
																		value: cmsForm.hireHeadline,
																		onChange: (e) => updateCmsField("hireHeadline", e.target.value),
																		className: "w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-semibold text-[#1D1D1F]"
																	})] }),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																		className: "text-[10px] font-medium text-[#86868B] block mb-1",
																		children: "Narrative Subheadline"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
																		rows: 2,
																		value: cmsForm.hireSubheadline || "",
																		onChange: (e) => updateCmsField("hireSubheadline", e.target.value),
																		className: "w-full rounded-lg border border-black/[0.08] bg-white p-2 text-xs leading-relaxed",
																		placeholder: "Late-model CAT diggers, 37m concrete boom pumps..."
																	})] })
																]
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "p-4 rounded-2xl bg-[#F9F9FA] border border-black/[0.05] space-y-2.5",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center justify-between",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-xs font-bold text-emerald-800 uppercase tracking-wider",
																	children: "3. Farming Machinery"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[10px] font-medium text-[#86868B]",
																	children: "Agro-Processing"
																})]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "space-y-2",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																		className: "text-[10px] font-medium text-[#86868B] block mb-1",
																		children: "Eyebrow"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																		type: "text",
																		value: cmsForm.farmingEyebrow,
																		onChange: (e) => updateCmsField("farmingEyebrow", e.target.value),
																		className: "w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-medium"
																	})] }),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																		className: "text-[10px] font-medium text-[#86868B] block mb-1",
																		children: "Headline"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																		type: "text",
																		value: cmsForm.farmingHeadline,
																		onChange: (e) => updateCmsField("farmingHeadline", e.target.value),
																		className: "w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-semibold text-[#1D1D1F]"
																	})] }),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																		className: "text-[10px] font-medium text-[#86868B] block mb-1",
																		children: "Narrative Subheadline"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
																		rows: 2,
																		value: cmsForm.farmingSubheadline || "",
																		onChange: (e) => updateCmsField("farmingSubheadline", e.target.value),
																		className: "w-full rounded-lg border border-black/[0.08] bg-white p-2 text-xs leading-relaxed",
																		placeholder: "Hammer mills, vertical feed mixers, and oil presses..."
																	})] })
																]
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "p-4 rounded-2xl bg-[#F9F9FA] border border-black/[0.05] space-y-2.5",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center justify-between",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-xs font-bold text-stone-800 uppercase tracking-wider",
																	children: "4. Hardware & Construction"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[10px] font-medium text-[#86868B]",
																	children: "Fencing & Civils"
																})]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "space-y-2",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																		className: "text-[10px] font-medium text-[#86868B] block mb-1",
																		children: "Eyebrow"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																		type: "text",
																		value: cmsForm.hardwareEyebrow,
																		onChange: (e) => updateCmsField("hardwareEyebrow", e.target.value),
																		className: "w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-medium"
																	})] }),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																		className: "text-[10px] font-medium text-[#86868B] block mb-1",
																		children: "Headline"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																		type: "text",
																		value: cmsForm.hardwareHeadline,
																		onChange: (e) => updateCmsField("hardwareHeadline", e.target.value),
																		className: "w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-semibold text-[#1D1D1F]"
																	})] }),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																		className: "text-[10px] font-medium text-[#86868B] block mb-1",
																		children: "Narrative Subheadline"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
																		rows: 2,
																		value: cmsForm.hardwareSubheadline || "",
																		onChange: (e) => updateCmsField("hardwareSubheadline", e.target.value),
																		className: "w-full rounded-lg border border-black/[0.08] bg-white p-2 text-xs leading-relaxed",
																		placeholder: "Diamond mesh, razor wire, block machines..."
																	})] })
																]
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "p-4 rounded-2xl bg-[#F9F9FA] border border-black/[0.05] space-y-2.5",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center justify-between",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-xs font-bold text-purple-800 uppercase tracking-wider",
																	children: "5. Industry & Manufacturing"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[10px] font-medium text-[#86868B]",
																	children: "Power & Motors"
																})]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "space-y-2",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																		className: "text-[10px] font-medium text-[#86868B] block mb-1",
																		children: "Eyebrow"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																		type: "text",
																		value: cmsForm.industryEyebrow,
																		onChange: (e) => updateCmsField("industryEyebrow", e.target.value),
																		className: "w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-medium"
																	})] }),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																		className: "text-[10px] font-medium text-[#86868B] block mb-1",
																		children: "Headline"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																		type: "text",
																		value: cmsForm.industryHeadline,
																		onChange: (e) => updateCmsField("industryHeadline", e.target.value),
																		className: "w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs font-semibold text-[#1D1D1F]"
																	})] }),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																		className: "text-[10px] font-medium text-[#86868B] block mb-1",
																		children: "Narrative Subheadline"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
																		rows: 2,
																		value: cmsForm.industrySubheadline || "",
																		onChange: (e) => updateCmsField("industrySubheadline", e.target.value),
																		className: "w-full rounded-lg border border-black/[0.08] bg-white p-2 text-xs leading-relaxed",
																		placeholder: "Heavy-duty electric motors, screw compressors..."
																	})] })
																]
															})]
														})
													]
												})]
											}),
											(cmsCategory === "about" || cmsCategory === "all" || cmsSearch) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-3xl border border-black/[0.06] bg-white p-5 sm:p-7 shadow-xs space-y-5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between pb-3.5 border-b border-black/[0.05]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-2.5",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "flex size-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-4.5" })
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
																className: "text-base font-semibold text-[#1D1D1F]",
																children: "Corporate Narrative, Mission & 4 Guarantees"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-xs text-[#86868B] mt-0.5",
																children: "Harare yard presence story, nationwide mission, and core operational guarantees across Zimbabwe."
															})] })]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "rounded-full bg-indigo-100/70 px-3 py-1 text-xs font-semibold text-indigo-800",
															children: "About & Mission"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "grid grid-cols-1 lg:grid-cols-2 gap-3.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
															children: "About Section Headline"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: cmsForm.aboutHeadline,
															onChange: (e) => updateCmsField("aboutHeadline", e.target.value),
															className: "w-full h-9 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none",
															placeholder: "Direct Importers & Stockists of Heavy Industrial Equipment"
														})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
															children: "Company Mission Statement"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
															rows: 2,
															value: cmsForm.aboutMission,
															onChange: (e) => updateCmsField("aboutMission", e.target.value),
															className: "w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] p-2.5 text-xs leading-relaxed focus:bg-white focus:outline-none",
															placeholder: "Supplying verified commercial machinery with local parts, field commissioning..."
														})] })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
														children: "Company Origin & Harare Physical Stock Narrative"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
														rows: 2,
														value: cmsForm.aboutStory || "",
														onChange: (e) => updateCmsField("aboutStory", e.target.value),
														className: "w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] p-3 text-xs leading-relaxed focus:bg-white focus:outline-none",
														placeholder: "Founded to bridge the equipment gap for Zimbabwean miners, contractors, and farmers, Omnicore Solutions maintains a fully-stocked Cranborne yard..."
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-3 pt-2 border-t border-black/[0.05]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-semibold text-xs text-[#1D1D1F] block",
															children: "4 Core Operational Guarantees"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "rounded-xl border border-black/[0.05] bg-[#F9F9FA] p-3 space-y-1",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																		className: "text-[10px] font-bold text-[#86868B] block uppercase tracking-wider",
																		children: "Pillar 1 · Yard Stock"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																		type: "text",
																		value: cmsForm.aboutPillar1,
																		onChange: (e) => updateCmsField("aboutPillar1", e.target.value),
																		className: "w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs focus:bg-white focus:outline-none font-medium"
																	})]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "rounded-xl border border-black/[0.05] bg-[#F9F9FA] p-3 space-y-1",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																		className: "text-[10px] font-bold text-[#86868B] block uppercase tracking-wider",
																		children: "Pillar 2 · Field Proven"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																		type: "text",
																		value: cmsForm.aboutPillar2,
																		onChange: (e) => updateCmsField("aboutPillar2", e.target.value),
																		className: "w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs focus:bg-white focus:outline-none font-medium"
																	})]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "rounded-xl border border-black/[0.05] bg-[#F9F9FA] p-3 space-y-1",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																		className: "text-[10px] font-bold text-[#86868B] block uppercase tracking-wider",
																		children: "Pillar 3 · Spares Back-up"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																		type: "text",
																		value: cmsForm.aboutPillar3,
																		onChange: (e) => updateCmsField("aboutPillar3", e.target.value),
																		className: "w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs focus:bg-white focus:outline-none font-medium"
																	})]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "rounded-xl border border-black/[0.05] bg-[#F9F9FA] p-3 space-y-1",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
																		className: "text-[10px] font-bold text-[#86868B] block uppercase tracking-wider",
																		children: "Pillar 4 · Logistics"
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																		type: "text",
																		value: cmsForm.aboutPillar4,
																		onChange: (e) => updateCmsField("aboutPillar4", e.target.value),
																		className: "w-full h-8 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs focus:bg-white focus:outline-none font-medium"
																	})]
																})
															]
														})]
													})
												]
											}),
											(cmsCategory === "social" || cmsCategory === "all" || cmsSearch) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-3xl border border-black/[0.06] bg-white p-5 sm:p-6 shadow-xs space-y-4",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between pb-3 border-b border-black/[0.05]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "flex size-7 items-center justify-center rounded-lg bg-teal-50 text-teal-700",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-4" })
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
																className: "text-sm font-semibold text-[#1D1D1F]",
																children: "Social Profiles & Footer Compliance"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-[11px] text-[#86868B]",
																children: "Official social channels, company overview, and bottom copyright statement."
															})] })]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "rounded-full bg-teal-100/60 px-2 py-0.5 text-[10px] font-semibold text-teal-800",
															children: "Channels"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "grid grid-cols-1 sm:grid-cols-2 gap-3.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
															children: "LinkedIn Company Profile URL"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "url",
															value: cmsForm.linkedinUrl,
															onChange: (e) => updateCmsField("linkedinUrl", e.target.value),
															className: "w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none font-mono text-[11px]",
															placeholder: "https://www.linkedin.com/company/..."
														})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
															children: "Facebook Page URL"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "url",
															value: cmsForm.facebookUrl,
															onChange: (e) => updateCmsField("facebookUrl", e.target.value),
															className: "w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none font-mono text-[11px]",
															placeholder: "https://www.facebook.com/..."
														})] })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "grid grid-cols-1 sm:grid-cols-2 gap-3.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
															children: "Founded Year"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: cmsForm.foundedYear,
															onChange: (e) => updateCmsField("foundedYear", e.target.value),
															className: "w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none",
															placeholder: "2024"
														})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
															children: "Registration & Scope Subtitle"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: cmsForm.companyReg,
															onChange: (e) => updateCmsField("companyReg", e.target.value),
															className: "w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none",
															placeholder: "Harare Industrial & Mining Machinery Supplier"
														})] })]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
														children: "Footer Brand & Mission Summary"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
														rows: 2,
														value: cmsForm.footerAbout,
														onChange: (e) => updateCmsField("footerAbout", e.target.value),
														className: "w-full rounded-xl border border-black/[0.08] bg-[#F5F5F7] p-3 text-xs leading-relaxed focus:bg-white focus:outline-none",
														placeholder: "Direct supply, equipment hire, and on-site plant commissioning..."
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "font-semibold text-[#1D1D1F] text-xs block mb-1",
														children: "Footer Copyright Notice"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: cmsForm.footerCopyright,
														onChange: (e) => updateCmsField("footerCopyright", e.target.value),
														className: "w-full h-8.5 rounded-xl border border-black/[0.08] bg-[#F5F5F7] px-3 text-xs focus:bg-white focus:outline-none",
														placeholder: "© 2026 Omnicore Solutions. All rights reserved..."
													})] })
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-2xl border border-black/[0.06] bg-white p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2 text-xs text-[#86868B]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-emerald-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Updates propagate instantaneously to all visitors and components across the site." })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: handleResetSiteCopy,
														className: "rounded-full border border-black/[0.08] bg-[#F5F5F7] px-4 py-2 text-xs font-medium text-[#6E6E73] hover:text-[#1D1D1F] transition-all",
														children: "Reset"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														type: "submit",
														className: "rounded-full bg-[#1D1D1F] px-6 py-2 text-xs font-semibold text-white shadow-xs hover:bg-black transition-all active:scale-95 flex items-center gap-1.5",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Publish All Changes Live" })]
													})]
												})]
											})
										]
									})
								}), cmsLayoutMode === "split" && isCmsPreviewOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "lg:col-span-5 xl:col-span-5 sticky top-20 space-y-4 animate-in fade-in duration-200",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-3xl border border-black/[0.06] bg-white p-5 shadow-xs space-y-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex size-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "text-sm font-semibold text-[#1D1D1F]",
														children: "Live Interactive Visual Preview"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[10px] text-[#86868B]",
														children: "Simulates real-time rendering as you type"
													})] })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "flex items-center gap-1 rounded-full bg-emerald-100/70 px-2 py-0.5 text-[10px] font-semibold text-emerald-800",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-emerald-600 animate-ping" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Live Sync" })]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => setIsCmsPreviewOpen(false),
														className: "rounded-full p-1 text-[#86868B] hover:text-[#1D1D1F] hover:bg-black/[0.05]",
														title: "Hide Live Preview",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
													})]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid grid-cols-3 sm:grid-cols-6 gap-1 rounded-xl bg-black/[0.04] p-1 text-[11px]",
												children: [
													{
														id: "hero",
														label: "Hero"
													},
													{
														id: "yard",
														label: "Yard"
													},
													{
														id: "whatsapp",
														label: "WhatsApp"
													},
													{
														id: "about",
														label: "About"
													},
													{
														id: "divisions",
														label: "Divisions"
													},
													{
														id: "footer",
														label: "Footer"
													}
												].map((mode) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => setCmsPreviewTab(mode.id),
													className: `rounded-lg py-1 font-medium transition-all text-center ${cmsPreviewTab === mode.id ? "bg-white text-[#1D1D1F] font-semibold shadow-2xs" : "text-[#6E6E73] hover:text-[#1D1D1F]"}`,
													children: mode.label
												}, mode.id))
											}),
											cmsPreviewTab === "hero" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-2xl bg-[#14110E] p-4 text-[#F3EFE6] border border-black/20 space-y-3 relative overflow-hidden shadow-inner",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex items-center gap-1.5",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] text-white/90",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-[#1FA855]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "truncate max-w-[200px]",
																children: cmsForm.heroBadge || "Cranborne yard"
															})]
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
														className: "text-base sm:text-lg font-semibold tracking-tight text-white leading-tight",
														children: cmsForm.heroHeadline || "Plant for Zimbabwe’s mines, farms and pours."
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[11px] leading-relaxed text-white/75 line-clamp-3",
														children: cmsForm.heroSubheadline || "Gold circuits, fence plant, self-loading mixers..."
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex flex-wrap gap-1.5 pt-1",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "inline-flex items-center gap-1 rounded-full bg-[#1FA855] px-3 py-1 text-[10px] font-semibold text-white",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "size-3" }), cmsForm.heroCtaPrimary || "WhatsApp"]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-[#14110E]",
																children: cmsForm.heroCtaSecondary || "Request Quote"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "rounded-full border border-white/20 px-2.5 py-1 text-[10px] text-white/80",
																children: cmsForm.heroCtaTertiary || "Catalogue"
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "grid grid-cols-2 gap-1.5 pt-2 border-t border-white/10 text-[10px]",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "bg-white/5 rounded-lg p-1.5",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	className: "font-semibold text-white truncate",
																	children: cmsForm.stat1Label || "Harare hub"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	className: "text-white/60 truncate",
																	children: cmsForm.stat1Detail || "Cranborne yard"
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "bg-white/5 rounded-lg p-1.5",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	className: "font-semibold text-white truncate",
																	children: cmsForm.stat2Label || "1–25 TPH"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	className: "text-white/60 truncate",
																	children: cmsForm.stat2Detail || "Gold circuits"
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "bg-white/5 rounded-lg p-1.5",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	className: "font-semibold text-white truncate",
																	children: cmsForm.stat3Label || "Wet & dry"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	className: "text-white/60 truncate",
																	children: cmsForm.stat3Detail || "Plant hire"
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "bg-white/5 rounded-lg p-1.5",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	className: "font-semibold text-white truncate",
																	children: cmsForm.stat4Label || "10 provinces"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																	className: "text-white/60 truncate",
																	children: cmsForm.stat4Detail || "Lowbed delivery"
																})]
															})
														]
													})
												]
											}),
											cmsPreviewTab === "yard" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-2xl bg-[#F5F5F7] p-4 border border-black/[0.06] space-y-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-0.5 text-[10px] font-semibold text-[#1D1D1F] border border-black/[0.05]",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3 text-[#0071E3]" }),
																cmsForm.yardCity || "Harare",
																" Yard Pin"
															]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] text-[#86868B]",
															children: cmsForm.yardCountry || "Zimbabwe"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
														className: "text-sm font-semibold text-[#1D1D1F]",
														children: cmsForm.yardAddressLine1 || "115 Chiremba Road"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-[#6E6E73]",
														children: cmsForm.yardAddressLine2 || "Cranborne, Harare"
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[11px] leading-relaxed text-[#86868B] bg-white rounded-xl p-2.5 border border-black/[0.04]",
														children: cmsForm.yardDirectionsNote || "Heavy machinery can be inspected, demonstrated, and loaded onto lowbeds directly from our yard."
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "space-y-1 text-[11px]",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center justify-between",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[#86868B]",
																	children: "Mon – Fri:"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-medium text-[#1D1D1F]",
																	children: cmsForm.hoursWeekday || "08:00 – 17:00"
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center justify-between",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[#86868B]",
																	children: "Saturday:"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-medium text-[#1D1D1F]",
																	children: cmsForm.hoursSaturday || "08:00 – 13:00"
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center justify-between",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-[#86868B]",
																	children: "Sunday:"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "font-medium text-[#1D1D1F]",
																	children: cmsForm.hoursSunday || "Closed"
																})]
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex gap-2 pt-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
															href: cmsForm.googleMapsUrl,
															target: "_blank",
															rel: "noopener noreferrer",
															className: "flex-1 rounded-xl bg-white border border-black/[0.08] py-1.5 text-center text-[10px] font-semibold text-[#1D1D1F] hover:bg-black/[0.02]",
															children: "Google Maps Pin ↗"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
															href: `tel:${cmsForm.primaryPhoneTel}`,
															className: "flex-1 rounded-xl bg-[#1D1D1F] py-1.5 text-center text-[10px] font-semibold text-white hover:bg-black",
															children: "Call Yard Desk"
														})]
													})
												]
											}),
											cmsPreviewTab === "whatsapp" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-2xl bg-[#E8F5E9] p-4 border border-[#A5D6A7] space-y-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-1.5",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "size-4 text-[#1FA855]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-xs font-bold text-[#1B5E20]",
																children: "Harare WhatsApp Desk"
															})]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-[10px] font-medium text-[#2E7D32]",
															children: ["Active · +", cmsForm.whatsappNumber]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "rounded-xl bg-white p-3 border border-[#C8E6C9] shadow-2xs space-y-1.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[9px] font-bold text-[#6E6E73] uppercase tracking-wide",
																children: "Pre-Filled User Message:"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "rounded-lg bg-[#F1F8E9] p-2 text-xs text-[#1B5E20] italic border-l-2 border-[#1FA855]",
																children: [
																	"\"",
																	cmsForm.whatsappMessage || "Hello Omnicore Harare Desk — I would like an equipment quote.",
																	"\""
																]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																className: "text-[10px] text-[#6E6E73]",
																children: ["SLA: ", cmsForm.responseSLA || "Average response < 15 mins"]
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between pt-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] text-[#6E6E73]",
															children: "Website Floating FAB:"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "inline-flex items-center gap-2 rounded-full bg-[#1FA855] px-3 py-1.5 text-white shadow-xs",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[10px] font-bold leading-tight",
																children: "WhatsApp Desk"
															})]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
														href: `https://wa.me/${cmsForm.whatsappNumber}?text=${encodeURIComponent(cmsForm.whatsappMessage)}`,
														target: "_blank",
														rel: "noopener noreferrer",
														className: "block w-full text-center rounded-xl bg-[#1FA855] py-2 text-xs font-semibold text-white shadow-xs hover:bg-[#1B934B] transition-all",
														children: "Test WhatsApp Link ↗"
													})
												]
											}),
											cmsPreviewTab === "about" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-2xl bg-[#F5F5F7] p-4 border border-black/[0.06] space-y-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-0.5 text-[10px] font-semibold text-[#1D1D1F] border border-black/[0.05]",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-3 text-indigo-600" }), "Company Value Proposition"]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] text-[#86868B]",
															children: "Harare Operations"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
														className: "text-sm font-semibold text-[#1D1D1F]",
														children: cmsForm.aboutHeadline || "Direct Importers & Stockists of Heavy Industrial Equipment"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-[#6E6E73] mt-1 leading-relaxed",
														children: cmsForm.aboutMission || "Supplying verified commercial machinery with local parts, field commissioning, and technical back-up across all 10 provinces of Zimbabwe."
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "pt-2 border-t border-black/[0.06] space-y-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] font-bold text-[#86868B] uppercase tracking-wider block",
															children: "4 Core Guarantees:"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "space-y-1.5 text-[11px]",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex items-start gap-1.5 bg-white p-2 rounded-xl border border-black/[0.04]",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-emerald-600 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "font-medium text-[#1D1D1F]",
																		children: cmsForm.aboutPillar1
																	})]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex items-start gap-1.5 bg-white p-2 rounded-xl border border-black/[0.04]",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-emerald-600 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "font-medium text-[#1D1D1F]",
																		children: cmsForm.aboutPillar2
																	})]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex items-start gap-1.5 bg-white p-2 rounded-xl border border-black/[0.04]",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-emerald-600 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "font-medium text-[#1D1D1F]",
																		children: cmsForm.aboutPillar3
																	})]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex items-start gap-1.5 bg-white p-2 rounded-xl border border-black/[0.04]",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-emerald-600 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "font-medium text-[#1D1D1F]",
																		children: cmsForm.aboutPillar4
																	})]
																})
															]
														})]
													})
												]
											}),
											cmsPreviewTab === "divisions" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-2xl bg-[#F5F5F7] p-4 border border-black/[0.06] space-y-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-0.5 text-[10px] font-semibold text-[#1D1D1F] border border-black/[0.05]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "size-3 text-orange-600" }), "5 Industrial Sectors"]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[10px] text-[#86868B]",
														children: "Live Headlines"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "space-y-2 text-xs",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "bg-white p-2.5 rounded-xl border border-black/[0.04]",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[10px] font-bold text-amber-700 uppercase tracking-wide block",
																children: cmsForm.miningEyebrow || "Mining"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "font-semibold text-[#1D1D1F] mt-0.5",
																children: cmsForm.miningHeadline
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "bg-white p-2.5 rounded-xl border border-black/[0.04]",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[10px] font-bold text-blue-700 uppercase tracking-wide block",
																children: cmsForm.hireEyebrow || "Hire Fleet"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "font-semibold text-[#1D1D1F] mt-0.5",
																children: cmsForm.hireHeadline
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "bg-white p-2.5 rounded-xl border border-black/[0.04]",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[10px] font-bold text-emerald-700 uppercase tracking-wide block",
																children: cmsForm.farmingEyebrow || "Farming"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "font-semibold text-[#1D1D1F] mt-0.5",
																children: cmsForm.farmingHeadline
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "bg-white p-2.5 rounded-xl border border-black/[0.04]",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[10px] font-bold text-zinc-700 uppercase tracking-wide block",
																children: cmsForm.hardwareEyebrow || "Hardware"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "font-semibold text-[#1D1D1F] mt-0.5",
																children: cmsForm.hardwareHeadline
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "bg-white p-2.5 rounded-xl border border-black/[0.04]",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[10px] font-bold text-purple-700 uppercase tracking-wide block",
																children: cmsForm.industryEyebrow || "Industry"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "font-semibold text-[#1D1D1F] mt-0.5",
																children: cmsForm.industryHeadline
															})]
														})
													]
												})]
											}),
											cmsPreviewTab === "footer" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-2xl bg-[#F5F5F7] p-4 border border-black/[0.06] space-y-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
															src: "/mark.png",
															alt: "Logo",
															className: "size-6 object-contain"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-xs font-bold text-[#1D1D1F]",
															children: cmsForm.name || "Omnicore Solutions"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[11px] leading-relaxed text-[#6E6E73]",
														children: cmsForm.footerAbout || "Direct supply, equipment hire, and on-site plant commissioning from Cranborne, Harare."
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "pt-2 border-t border-black/[0.06] space-y-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-[10px] text-[#86868B] font-mono",
															children: cmsForm.footerCopyright || `© 2026 Omnicore Solutions.`
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex gap-2 text-[10px] text-[#0071E3]",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "LinkedIn" }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Facebook" }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: cmsForm.email })
															]
														})]
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-xl bg-[#F5F5F7] p-3 text-[11px] text-[#6E6E73] space-y-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center justify-between text-[#1D1D1F] font-semibold text-xs",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sync Engine" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-emerald-600 font-mono text-[10px]",
															children: "Real-Time Event Broadcast"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[10px]",
														children: ["Storage Key: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
															className: "font-mono text-[9px] bg-black/[0.04] px-1 py-0.5 rounded",
															children: "omnicore_site_copy_v2"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[10px]",
														children: ["Connected components: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-medium text-[#1D1D1F]",
															children: "Homepage Hero, Yard Badges, Contact Channels, FAB Widget, Site Footer"
														})]
													})
												]
											})
										]
									})
								})]
							})
						]
					}),
					activeTab === "hire" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2.5 flex-wrap",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "text-xl font-semibold tracking-tight text-[#1D1D1F]",
											children: "Active Plant Hire Deployments"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "rounded-full bg-black/[0.05] px-2.5 py-0.5 text-xs font-semibold text-[#1D1D1F]",
											children: [deploymentsList.length, " Units"]
										}),
										filteredDeployments.length !== deploymentsList.length && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "rounded-full bg-blue-50 text-blue-700 border border-blue-200/60 px-2 py-0.5 text-[11px] font-medium",
											children: [filteredDeployments.length, " filtered"]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-[#86868B] mt-0.5",
									children: "Heavy machinery operating on contract across Zimbabwe infrastructure, mines, and farms."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 flex-wrap",
									children: [deploymentsList.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: handleResetDefaultDeployments,
										className: "inline-flex h-9 items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-3.5 text-xs font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Load Sample Fleet" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: openCreateDeployment,
										className: "inline-flex h-9 items-center gap-1.5 rounded-full bg-[#1D1D1F] px-4 text-xs font-semibold text-white shadow-sm hover:bg-black transition-all cursor-pointer active:scale-95",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Deploy Machinery" })]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-black/[0.06] bg-white p-3.5 shadow-2xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-medium text-[#86868B] uppercase tracking-wider block",
											children: "Total Fleet Out"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-1 flex items-baseline gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-2xl font-bold text-[#1D1D1F]",
												children: deploymentMetrics.total
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] text-[#86868B]",
												children: "machines"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-3.5 shadow-2xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-emerald-500 animate-pulse" }), "Active On Site"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-1 flex items-baseline gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-2xl font-bold text-emerald-950",
												children: deploymentMetrics.activeOnSite
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] text-emerald-700",
												children: "generating revenue"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-blue-200/80 bg-blue-50/40 p-3.5 shadow-2xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-semibold text-blue-800 uppercase tracking-wider block",
											children: "Mobilizing Soon"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-1 flex items-baseline gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-2xl font-bold text-blue-950",
												children: deploymentMetrics.scheduled
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] text-blue-700",
												children: "scheduled dispatch"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-purple-200/80 bg-purple-50/40 p-3.5 shadow-2xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-semibold text-purple-800 uppercase tracking-wider block",
											children: "Transit / Service"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-1 flex items-baseline gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-2xl font-bold text-purple-950",
												children: deploymentMetrics.demobilizingOrService
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] text-purple-700",
												children: "field tech / lowbed"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl border border-black/[0.06] bg-white p-3.5 shadow-2xs col-span-2 sm:col-span-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-medium text-[#86868B] uppercase tracking-wider block",
											children: "Active Daily Run Rate"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-1 flex items-baseline gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-2xl font-bold text-[#1FA855]",
												children: ["$", deploymentMetrics.totalDailyRunRate.toLocaleString()]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] text-[#86868B]",
												children: "/ day"
											})]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-3 rounded-2xl border border-black/[0.06] bg-white p-3.5 shadow-2xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col lg:flex-row lg:items-center justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative flex-1 min-w-[240px]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-2.5 size-4 text-[#86868B]" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: deploymentSearch,
												onChange: (e) => {
													setDeploymentSearch(e.target.value);
													setDeploymentPage(1);
												},
												placeholder: "Search plant, client, site, contract ref, operator, notes...",
												className: "w-full h-9 rounded-xl border border-black/[0.08] bg-[#F9F9FA] pl-9 pr-8 text-xs text-[#1D1D1F] placeholder:text-[#86868B] focus:border-black focus:bg-white focus:outline-none transition-all"
											}),
											deploymentSearch && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setDeploymentSearch(""),
												className: "absolute right-2.5 top-2.5 text-[#86868B] hover:text-[#1D1D1F] cursor-pointer",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1 rounded-xl bg-[#F5F5F7] p-1 self-start sm:self-auto shrink-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => setDeploymentViewMode("table"),
												className: `inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${deploymentViewMode === "table" ? "bg-white text-[#1D1D1F] shadow-2xs font-semibold" : "text-[#6E6E73] hover:text-[#1D1D1F]"}`,
												title: "Dense Table View (Conducive for large numbers of deployments)",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Table" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => setDeploymentViewMode("grid"),
												className: `inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${deploymentViewMode === "grid" ? "bg-white text-[#1D1D1F] shadow-2xs font-semibold" : "text-[#6E6E73] hover:text-[#1D1D1F]"}`,
												title: "Card Grid View",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cards" })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => setDeploymentViewMode("kanban"),
												className: `inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${deploymentViewMode === "kanban" ? "bg-white text-[#1D1D1F] shadow-2xs font-semibold" : "text-[#6E6E73] hover:text-[#1D1D1F]"}`,
												title: "Status Board / Kanban",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kanban, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Status Board" })]
											})
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-black/[0.04] text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[#86868B] font-medium text-[11px]",
													children: "Status:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													value: deploymentStatusFilter,
													onChange: (e) => {
														setDeploymentStatusFilter(e.target.value);
														setDeploymentPage(1);
													},
													className: "h-7.5 rounded-lg border border-black/[0.08] bg-white px-2 text-xs font-medium text-[#1D1D1F] focus:outline-none",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
															value: "all",
															children: [
																"All Statuses (",
																deploymentsList.length,
																")"
															]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
															value: "Active on Site",
															children: [
																"Active on Site (",
																deploymentsList.filter((d) => d.status === "Active on Site").length,
																")"
															]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
															value: "Scheduled Mobilization",
															children: [
																"Scheduled Mobilization (",
																deploymentsList.filter((d) => d.status === "Scheduled Mobilization").length,
																")"
															]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
															value: "Demobilizing / In Transit",
															children: [
																"Demobilizing / In Transit (",
																deploymentsList.filter((d) => d.status === "Demobilizing / In Transit").length,
																")"
															]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
															value: "Routine Service / Standby",
															children: [
																"Routine Service / Standby (",
																deploymentsList.filter((d) => d.status === "Routine Service / Standby").length,
																")"
															]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
															value: "Returned to Cranborne Yard",
															children: [
																"Returned to Cranborne Yard (",
																deploymentsList.filter((d) => d.status === "Returned to Cranborne Yard").length,
																")"
															]
														})
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[#86868B] font-medium text-[11px]",
													children: "Province:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													value: deploymentProvinceFilter,
													onChange: (e) => {
														setDeploymentProvinceFilter(e.target.value);
														setDeploymentPage(1);
													},
													className: "h-7.5 rounded-lg border border-black/[0.08] bg-white px-2 text-xs font-medium text-[#1D1D1F] focus:outline-none",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "all",
														children: "All Zimbabwe"
													}), PROVINCES.filter((p) => p !== "All Zimbabwe").map((prov) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: prov,
														children: prov
													}, prov))]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[#86868B] font-medium text-[11px]",
													children: "Division:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													value: deploymentCategoryFilter,
													onChange: (e) => {
														setDeploymentCategoryFilter(e.target.value);
														setDeploymentPage(1);
													},
													className: "h-7.5 rounded-lg border border-black/[0.08] bg-white px-2 text-xs font-medium text-[#1D1D1F] focus:outline-none",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "all",
															children: "All Divisions"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "hire",
															children: "Plant Hire"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "mining",
															children: "Mining"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "farming",
															children: "Farming"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "hardware",
															children: "Hardware"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "industry",
															children: "Industry"
														})
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[#86868B] font-medium text-[11px]",
													children: "Sort:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													value: deploymentSortBy,
													onChange: (e) => setDeploymentSortBy(e.target.value),
													className: "h-7.5 rounded-lg border border-black/[0.08] bg-white px-2 text-xs font-medium text-[#1D1D1F] focus:outline-none",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "return-soon",
															children: "Return Date (Soonest first)"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "newest",
															children: "Newest Contract"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "rate-high",
															children: "Highest Daily Rate"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "plant-az",
															children: "Machine Name (A-Z)"
														})
													]
												})]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 text-[11px] text-[#86868B]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											"Showing ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: filteredDeployments.length }),
											" of ",
											deploymentsList.length
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Per page:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												value: deploymentPageSize,
												onChange: (e) => {
													setDeploymentPageSize(Number(e.target.value));
													setDeploymentPage(1);
												},
												className: "h-6 rounded border border-black/[0.08] bg-white px-1 text-[11px] text-[#1D1D1F]",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: 10,
														children: "10"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: 25,
														children: "25"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: 50,
														children: "50"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: 999,
														children: "All"
													})
												]
											})]
										})]
									})]
								})]
							}),
							filteredDeployments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-black/[0.06] bg-white p-12 text-center space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "size-10 text-[#86868B] mx-auto opacity-40" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-base font-semibold text-[#1D1D1F]",
										children: "No deployments found"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-[#86868B] max-w-md mx-auto",
										children: deploymentSearch || deploymentStatusFilter !== "all" || deploymentProvinceFilter !== "all" || deploymentCategoryFilter !== "all" ? "Try adjusting your search terms or filters to locate active machinery contracts." : "No heavy machinery is currently deployed in the field. Deploy a machine to start tracking contracts."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pt-2 flex items-center justify-center gap-2",
										children: [(deploymentSearch || deploymentStatusFilter !== "all" || deploymentProvinceFilter !== "all" || deploymentCategoryFilter !== "all") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												setDeploymentSearch("");
												setDeploymentStatusFilter("all");
												setDeploymentProvinceFilter("all");
												setDeploymentCategoryFilter("all");
											},
											className: "rounded-full border border-black/[0.08] bg-white px-4 py-2 text-xs font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] cursor-pointer",
											children: "Reset Filters"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: openCreateDeployment,
											className: "rounded-full bg-[#1D1D1F] px-4 py-2 text-xs font-semibold text-white hover:bg-black cursor-pointer shadow-xs",
											children: "+ Deploy Machinery"
										})]
									})
								]
							}) : deploymentViewMode === "table" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-2xl border border-black/[0.08] bg-white shadow-sm overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "overflow-x-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
										className: "w-full text-left text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "border-b border-black/[0.06] bg-[#FBFBFC] text-[11px] font-semibold text-[#86868B] uppercase tracking-wider",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "py-3 pl-4 pr-3",
													children: "Machine / Plant"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "py-3 px-3",
													children: "Client & Site Location"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "py-3 px-3",
													children: "Contract & Operator"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "py-3 px-3",
													children: "Billing Rate"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "py-3 px-3",
													children: "Status"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "py-3 px-3",
													children: "Return Date"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "py-3 pl-3 pr-4 text-right",
													children: "Actions"
												})
											]
										}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
											className: "divide-y divide-black/[0.04]",
											children: paginatedDeployments.map((dep) => {
												const statusColors = dep.status === "Active on Site" ? "bg-[#E8F8EE] text-[#1B833E] border-emerald-200" : dep.status === "Scheduled Mobilization" ? "bg-[#EFF6FF] text-[#1D4ED8] border-blue-200" : dep.status === "Demobilizing / In Transit" ? "bg-[#FFFBEB] text-[#B45309] border-amber-200" : dep.status === "Routine Service / Standby" ? "bg-[#FAF5FF] text-[#7E22CE] border-purple-200" : "bg-[#F5F5F7] text-[#6E6E73] border-gray-200";
												const whatsappLink = `https://wa.me/${(dep.contactPhone || "+263772109441").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hello ${dep.contactPerson || dep.client}, this is Omnicore Solutions Harare regarding the ${dep.plant} on site at ${dep.site} (Contract Ref: ${dep.contractRef}).`)}`;
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
													className: "hover:bg-[#F9F9FA] transition-colors group",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "py-3 pl-4 pr-3",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center gap-3",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	role: "button",
																	tabIndex: 0,
																	onClick: () => openProductLightbox({
																		name: dep.plant,
																		category: dep.category,
																		spec: `${dep.client} · ${dep.site}`,
																		price: dep.rate,
																		sku: dep.sku || dep.id,
																		image: dep.image
																	}),
																	className: "relative size-12 rounded-xl overflow-hidden bg-black/[0.05] border border-black/[0.08] shrink-0 cursor-pointer group/thumb shadow-2xs",
																	title: "Click to preview on large screen",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
																		src: dep.image || "/images/cat-excavator.jpg",
																		alt: dep.plant,
																		className: "size-full object-cover transition-transform group-hover/thumb:scale-110",
																		onError: (e) => {
																			e.target.src = "/images/hero.jpg";
																		}
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																		className: "absolute inset-0 bg-black/30 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center transition-opacity",
																		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "size-3 text-white" })
																	})]
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "min-w-0 max-w-[200px] sm:max-w-[260px]",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																		className: "flex items-center gap-1.5 flex-wrap",
																		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "font-semibold text-[#1D1D1F] truncate block",
																			children: dep.plant
																		})
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "flex items-center gap-1.5 text-[10px] text-[#86868B] mt-0.5",
																		children: [
																			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																				className: "font-mono",
																				children: dep.id
																			}),
																			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
																			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																				className: "capitalize",
																				children: dep.category
																			}),
																			dep.sku && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																				className: "truncate",
																				children: dep.sku
																			})] })
																		]
																	})]
																})]
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "py-3 px-3",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "space-y-0.5 max-w-[220px]",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "font-semibold text-[#1D1D1F] block truncate",
																		children: dep.client
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "flex items-center gap-1 text-[11px] text-[#6E6E73] truncate",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3 text-[#86868B] shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "truncate",
																			children: dep.site
																		})]
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "text-[10px] text-[#86868B] block truncate",
																		children: dep.province
																	})
																]
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "py-3 px-3",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "space-y-0.5 max-w-[180px]",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "font-mono text-[11px] font-medium text-[#1D1D1F] block",
																		children: dep.contractRef
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "text-[10px] text-[#6E6E73] block truncate",
																		children: dep.operator
																	}),
																	dep.contactPerson && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																		className: "text-[10px] text-[#86868B] block truncate",
																		children: ["Contact: ", dep.contactPerson]
																	})
																]
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "py-3 px-3",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "space-y-0.5",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "inline-block rounded-md bg-[#F5F5F7] px-2 py-0.5 text-xs font-semibold text-[#1D1D1F]",
																	children: dep.rate
																}), dep.dailyRateUSD > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "text-[10px] text-[#1FA855] font-semibold block",
																	children: [
																		"$",
																		dep.dailyRateUSD,
																		"/day billing"
																	]
																})]
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "py-3 px-3",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "space-y-1",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: `inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${statusColors}`,
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `size-1.5 rounded-full ${dep.status === "Active on Site" ? "bg-emerald-500 animate-pulse" : dep.status === "Scheduled Mobilization" ? "bg-blue-500" : dep.status === "Demobilizing / In Transit" ? "bg-amber-500" : dep.status === "Routine Service / Standby" ? "bg-purple-500" : "bg-gray-400"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: dep.status })]
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
																	value: dep.status,
																	onChange: (e) => handleQuickStatusChange(dep.id, e.target.value),
																	className: "block h-5.5 text-[10px] rounded border border-black/[0.08] bg-white px-1 text-[#6E6E73] hover:text-[#1D1D1F] focus:outline-none cursor-pointer",
																	title: "Quick update status",
																	children: [
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																			value: "Active on Site",
																			children: "Active on Site"
																		}),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																			value: "Scheduled Mobilization",
																			children: "Scheduled Mobilization"
																		}),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																			value: "Demobilizing / In Transit",
																			children: "Demobilizing / In Transit"
																		}),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																			value: "Routine Service / Standby",
																			children: "Routine Service / Standby"
																		}),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																			value: "Returned to Cranborne Yard",
																			children: "Returned to Cranborne Yard"
																		})
																	]
																})]
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "py-3 px-3 whitespace-nowrap",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "space-y-0.5",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "text-xs font-medium text-[#1D1D1F] block",
																	children: dep.scheduledReturn || "Open-ended"
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																	className: "text-[10px] text-[#86868B] block",
																	children: ["Started: ", dep.startDate]
																})]
															})
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
															className: "py-3 pl-3 pr-4 text-right",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "flex items-center justify-end gap-1",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																		type: "button",
																		onClick: () => openProductLightbox({
																			name: dep.plant,
																			category: dep.category,
																			spec: `${dep.client} · ${dep.site}`,
																			price: dep.rate,
																			sku: dep.sku || dep.id,
																			image: dep.image
																		}),
																		className: "flex size-7.5 items-center justify-center rounded-lg border border-black/[0.06] bg-white text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all cursor-pointer",
																		title: "Preview Machinery Photo in HD Large Screen",
																		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "size-3.5" })
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																		type: "button",
																		onClick: () => openEditDeployment(dep),
																		className: "flex size-7.5 items-center justify-center rounded-lg border border-black/[0.06] bg-white text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all cursor-pointer",
																		title: "Edit Deployment Record",
																		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "size-3.5" })
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
																		href: whatsappLink,
																		target: "_blank",
																		rel: "noopener noreferrer",
																		className: "flex size-7.5 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-[#1B833E] hover:bg-emerald-100 transition-all cursor-pointer",
																		title: "WhatsApp Client Regarding Contract",
																		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "size-3.5" })
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																		type: "button",
																		onClick: () => handleDeleteDeployment(dep.id),
																		className: "flex size-7.5 items-center justify-center rounded-lg border border-red-200/60 bg-white text-red-600 hover:bg-red-50 transition-all cursor-pointer",
																		title: "Delete Deployment",
																		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
																	})
																]
															})
														})
													]
												}, dep.id);
											})
										})]
									})
								})
							}) : deploymentViewMode === "grid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4",
								children: paginatedDeployments.map((dep) => {
									const statusColors = dep.status === "Active on Site" ? "bg-[#E8F8EE] text-[#1B833E] border-emerald-200" : dep.status === "Scheduled Mobilization" ? "bg-[#EFF6FF] text-[#1D4ED8] border-blue-200" : dep.status === "Demobilizing / In Transit" ? "bg-[#FFFBEB] text-[#B45309] border-amber-200" : dep.status === "Routine Service / Standby" ? "bg-[#FAF5FF] text-[#7E22CE] border-purple-200" : "bg-[#F5F5F7] text-[#6E6E73] border-gray-200";
									const whatsappLink = `https://wa.me/${(dep.contactPhone || "+263772109441").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hello ${dep.contactPerson || dep.client}, this is Omnicore Solutions Harare regarding the ${dep.plant} on site at ${dep.site} (Contract Ref: ${dep.contractRef}).`)}`;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "group relative flex flex-col rounded-2xl border border-black/[0.08] bg-white p-4 shadow-sm hover:border-black/[0.15] hover:shadow-md transition-all",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex gap-3 items-start",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													role: "button",
													tabIndex: 0,
													onClick: () => openProductLightbox({
														name: dep.plant,
														category: dep.category,
														spec: `${dep.client} · ${dep.site}`,
														price: dep.rate,
														sku: dep.sku || dep.id,
														image: dep.image
													}),
													className: "relative size-16 sm:size-20 rounded-xl overflow-hidden bg-black/[0.05] border border-black/[0.08] shrink-0 cursor-pointer shadow-2xs group/pic",
													title: "Click to view photo in large screen",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: dep.image || "/images/cat-excavator.jpg",
														alt: dep.plant,
														className: "size-full object-cover transition-transform group-hover/pic:scale-105",
														onError: (e) => {
															e.target.src = "/images/hero.jpg";
														}
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "absolute inset-0 bg-black/35 opacity-0 group-hover/pic:opacity-100 transition-opacity flex items-center justify-center",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "size-4 text-white" })
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "min-w-0 flex-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center justify-between gap-1.5 mb-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "font-mono text-[10px] font-semibold text-[#86868B]",
																children: dep.id
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: `rounded-full border px-2 py-0.5 text-[9px] font-semibold ${statusColors}`,
																children: dep.status
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
															className: "text-sm font-semibold text-[#1D1D1F] line-clamp-1 leading-snug",
															children: dep.plant
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "text-xs text-[#6E6E73] truncate mt-0.5",
															children: ["Client: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
																className: "text-[#1D1D1F] font-semibold",
																children: dep.client
															})]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
															className: "text-[11px] text-[#86868B] truncate mt-0.5 flex items-center gap-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3 text-[#86868B] shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: dep.site })]
														})
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-3.5 grid grid-cols-2 gap-2 rounded-xl bg-[#F5F5F7] p-2.5 text-xs",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[9px] text-[#86868B] block uppercase tracking-wider",
														children: "Billing Rate"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold text-[#1D1D1F] block",
														children: dep.rate
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[9px] text-[#86868B] block uppercase tracking-wider",
														children: "Scheduled Return"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold text-[#1D1D1F] block truncate",
														children: dep.scheduledReturn || "Open"
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "col-span-2 pt-1 border-t border-black/[0.04]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[9px] text-[#86868B] block uppercase tracking-wider",
															children: "Contract & Operator"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-[#1D1D1F] truncate block font-medium",
															children: [
																dep.contractRef,
																" · ",
																dep.operator
															]
														})]
													})
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-3 pt-2.5 border-t border-black/[0.06] flex items-center justify-between gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[10px] font-medium text-[#86868B]",
													children: ["📍 ", dep.province]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1.5",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
															type: "button",
															onClick: () => openEditDeployment(dep),
															className: "inline-flex items-center gap-1 rounded-lg border border-black/[0.08] bg-white px-2.5 py-1 text-xs font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] cursor-pointer",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Edit" })]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
															href: whatsappLink,
															target: "_blank",
															rel: "noopener noreferrer",
															className: "inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-800 hover:bg-emerald-100",
															title: "WhatsApp client",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "size-3" })
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: () => handleDeleteDeployment(dep.id),
															className: "inline-flex size-7 items-center justify-center rounded-lg border border-red-200 bg-white text-red-600 hover:bg-red-50 cursor-pointer",
															title: "Delete",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" })
														})
													]
												})]
											})
										]
									}, dep.id);
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5 overflow-x-auto pb-2",
								children: [
									{
										id: "Active on Site",
										label: "Active on Site",
										color: "emerald",
										border: "border-emerald-200",
										bg: "bg-emerald-50/50"
									},
									{
										id: "Scheduled Mobilization",
										label: "Scheduled",
										color: "blue",
										border: "border-blue-200",
										bg: "bg-blue-50/50"
									},
									{
										id: "Demobilizing / In Transit",
										label: "In Transit",
										color: "amber",
										border: "border-amber-200",
										bg: "bg-amber-50/50"
									},
									{
										id: "Routine Service / Standby",
										label: "Service / Standby",
										color: "purple",
										border: "border-purple-200",
										bg: "bg-purple-50/50"
									},
									{
										id: "Returned to Cranborne Yard",
										label: "Returned to Yard",
										color: "gray",
										border: "border-gray-200",
										bg: "bg-gray-50/50"
									}
								].map((col) => {
									const itemsInCol = filteredDeployments.filter((d) => d.status === col.id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `flex flex-col rounded-2xl border ${col.border} ${col.bg} p-3 min-w-[240px]`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between pb-2.5 mb-2 border-b border-black/[0.06]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-semibold text-[#1D1D1F] truncate",
												children: col.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-[#1D1D1F] border border-black/[0.06]",
												children: itemsInCol.length
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "space-y-2.5 flex-1 min-h-[160px]",
											children: itemsInCol.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-28 rounded-xl border border-dashed border-black/[0.1] flex items-center justify-center text-[11px] text-[#86868B]",
												children: "No machines"
											}) : itemsInCol.map((dep) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-xl border border-black/[0.08] bg-white p-3 shadow-2xs space-y-2 hover:border-black/[0.18] transition-all",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-start justify-between gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-mono text-[10px] text-[#86868B]",
															children: dep.id
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] font-bold text-[#1D1D1F] bg-[#F5F5F7] px-1.5 py-0.5 rounded",
															children: dep.rate
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
															src: dep.image || "/images/cat-excavator.jpg",
															alt: dep.plant,
															className: "size-9 rounded-lg object-cover bg-black/[0.04] shrink-0",
															onError: (e) => {
																e.target.src = "/images/hero.jpg";
															}
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "min-w-0 flex-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
																className: "text-xs font-semibold text-[#1D1D1F] truncate leading-tight",
																children: dep.plant
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-[11px] text-[#6E6E73] truncate",
																children: dep.client
															})]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[10px] text-[#86868B] truncate",
														children: ["📍 ", dep.site]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "pt-2 border-t border-black/[0.04] flex items-center justify-between text-[10px]",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "text-[#86868B]",
															children: ["Due: ", dep.scheduledReturn || "Open"]
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																onClick: () => openEditDeployment(dep),
																className: "p-1 rounded text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]",
																title: "Edit",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { className: "size-3" })
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																onClick: () => handleDeleteDeployment(dep.id),
																className: "p-1 rounded text-red-600 hover:bg-red-50",
																title: "Delete",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3" })
															})]
														})]
													})
												]
											}, dep.id))
										})]
									}, col.id);
								})
							}),
							deploymentTotalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-black/[0.06] bg-white p-3 text-xs shadow-2xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] text-[#86868B]",
									children: [
										"Showing page ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: deploymentPage }),
										" of ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: deploymentTotalPages }),
										" (",
										filteredDeployments.length,
										" total)"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: deploymentPage <= 1,
											onClick: () => setDeploymentPage(1),
											className: "flex size-7.5 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-[#1D1D1F] hover:bg-[#F5F5F7] disabled:opacity-30 disabled:pointer-events-none cursor-pointer",
											title: "First page",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsLeft, { className: "size-3.5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: deploymentPage <= 1,
											onClick: () => setDeploymentPage((p) => Math.max(1, p - 1)),
											className: "flex size-7.5 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-[#1D1D1F] hover:bg-[#F5F5F7] disabled:opacity-30 disabled:pointer-events-none cursor-pointer",
											title: "Previous page",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-3.5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "px-3 py-1 text-xs font-semibold text-[#1D1D1F]",
											children: [
												deploymentPage,
												" / ",
												deploymentTotalPages
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: deploymentPage >= deploymentTotalPages,
											onClick: () => setDeploymentPage((p) => Math.min(deploymentTotalPages, p + 1)),
											className: "flex size-7.5 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-[#1D1D1F] hover:bg-[#F5F5F7] disabled:opacity-30 disabled:pointer-events-none cursor-pointer",
											title: "Next page",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: deploymentPage >= deploymentTotalPages,
											onClick: () => setDeploymentPage(deploymentTotalPages),
											className: "flex size-7.5 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-[#1D1D1F] hover:bg-[#F5F5F7] disabled:opacity-30 disabled:pointer-events-none cursor-pointer",
											title: "Last page",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsRight, { className: "size-3.5" })
										})
									]
								})]
							}),
							showDeployModal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-150",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "w-full max-w-2xl rounded-2xl border border-black/[0.08] bg-white p-6 shadow-2xl max-h-[92vh] overflow-y-auto",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between border-b border-black/[0.06] pb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-base font-semibold text-[#1D1D1F]",
											children: editingDeployment ? `Edit Field Deployment (${editingDeployment.id})` : "Deploy Machinery on Field Contract"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] text-[#86868B] mt-0.5",
											children: editingDeployment ? "Update site location, billing rate, status, return dates, or client details." : "Log a heavy machine dispatch from Cranborne yard to an infrastructure, mining, or farm site."
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setShowDeployModal(false),
											className: "rounded-full p-1 text-[#86868B] hover:bg-[#F5F5F7] cursor-pointer",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										onSubmit: handleSaveDeployment,
										className: "mt-4 space-y-4 text-xs",
										children: [
											!editingDeployment && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-xl border border-black/[0.08] bg-[#FBFBFC] p-3 space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "font-semibold text-[#1D1D1F] block text-xs",
													children: "Fast Select from Cranborne Yard Inventory (Optional)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
													value: deployMachineId,
													onChange: (e) => {
														const chosenId = e.target.value;
														setDeployMachineId(chosenId);
														const chosenProd = equipmentList.find((p) => p.id === chosenId);
														if (chosenProd) {
															setDeployPlant(chosenProd.name);
															setDeployCategory(chosenProd.category || "hire");
															if (chosenProd.sku) setDeploySku(chosenProd.sku);
															if (chosenProd.image) setDeployImage(chosenProd.image);
															if (chosenProd.price) setDeployRate(chosenProd.price);
														}
													},
													className: "w-full h-8.5 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#1D1D1F] focus:outline-none",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "",
														children: "-- Choose from Harare Inventory (or enter below) --"
													}), equipmentList.map((eq) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
														value: eq.id,
														children: [
															eq.name,
															" (",
															eq.sku || eq.id,
															") - ",
															eq.category.toUpperCase()
														]
													}, eq.id))]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-1 sm:grid-cols-2 gap-3.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "font-semibold text-[#1D1D1F] block mb-1",
														children: "Machinery / Plant Name *"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														required: true,
														value: deployPlant,
														onChange: (e) => setDeployPlant(e.target.value),
														placeholder: "e.g. 20-Tonne CAT 320D Excavator",
														className: "w-full h-8.5 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#1D1D1F] focus:border-black focus:outline-none"
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "font-semibold text-[#1D1D1F] block mb-1",
														children: "Division Category"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
														value: deployCategory,
														onChange: (e) => setDeployCategory(e.target.value),
														className: "w-full h-8.5 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#1D1D1F] focus:outline-none",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "hire",
																children: "Plant Hire"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "mining",
																children: "Mining"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "farming",
																children: "Farming"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "hardware",
																children: "Hardware"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "industry",
																children: "Industry"
															})
														]
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "font-semibold text-[#1D1D1F] block mb-1",
														children: "Asset SKU / Serial Number"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: deploySku,
														onChange: (e) => setDeploySku(e.target.value),
														placeholder: "e.g. OMNI-HIR-320D",
														className: "w-full h-8.5 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#1D1D1F] focus:border-black focus:outline-none font-mono"
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "font-semibold text-[#1D1D1F] block mb-1",
														children: "Machinery Photo URL or Upload"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex gap-2 items-center",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: deployImage,
															onChange: (e) => setDeployImage(e.target.value),
															placeholder: "/images/cat-excavator.jpg",
															className: "flex-1 h-8.5 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#1D1D1F] focus:border-black focus:outline-none"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
															className: "h-8.5 px-3 rounded-lg border border-black/[0.08] bg-[#F5F5F7] hover:bg-[#EBEBEB] text-[#1D1D1F] font-semibold text-[11px] inline-flex items-center gap-1 cursor-pointer shrink-0",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-3" }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Upload" }),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																	type: "file",
																	accept: "image/*",
																	onChange: handleDeployImageUpload,
																	className: "hidden"
																})
															]
														})]
													})] })
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-xl border border-black/[0.08] bg-[#FBFBFC] p-3.5 space-y-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold text-[#1D1D1F] text-xs",
														children: "Client & Site Deployment Details"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
														onChange: (e) => {
															const chosen = clients.find((c) => c.name === e.target.value);
															if (chosen) {
																setDeployClient(chosen.organization ? `${chosen.name} (${chosen.organization})` : chosen.name);
																if (chosen.phone) setDeployContactPhone(chosen.phone);
																if (chosen.province && chosen.province !== "All Zimbabwe") setDeployProvince(chosen.province);
																if (chosen.location) setDeploySite(chosen.location);
																setDeployContactPerson(chosen.name);
															}
														},
														className: "h-6 text-[10px] rounded border border-black/[0.08] bg-white px-1.5 text-[#6E6E73] focus:outline-none",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
															value: "",
															children: "Quick fill from CRM clients..."
														}), clients.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
															value: c.name,
															children: [
																c.name,
																" ",
																c.organization ? `(${c.organization})` : "",
																" - ",
																c.province
															]
														}, c.id))]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] block mb-1",
															children: "Client Organization / Individual *"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															required: true,
															value: deployClient,
															onChange: (e) => setDeployClient(e.target.value),
															placeholder: "e.g. Great Dyke Quarries Ltd",
															className: "w-full h-8.5 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#1D1D1F] focus:border-black focus:outline-none"
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] block mb-1",
															children: "Contract Reference #"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: deployContractRef,
															onChange: (e) => setDeployContractRef(e.target.value),
															placeholder: "e.g. CNT-2026-105",
															className: "w-full h-8.5 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#1D1D1F] focus:border-black focus:outline-none font-mono"
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] block mb-1",
															children: "Site Location / Mine / Farm *"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															required: true,
															value: deploySite,
															onChange: (e) => setDeploySite(e.target.value),
															placeholder: "e.g. Shamva Gold Claims, Mash Central",
															className: "w-full h-8.5 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#1D1D1F] focus:border-black focus:outline-none"
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] block mb-1",
															children: "Province in Zimbabwe"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
															value: deployProvince,
															onChange: (e) => setDeployProvince(e.target.value),
															className: "w-full h-8.5 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#1D1D1F] focus:outline-none",
															children: PROVINCES.filter((p) => p !== "All Zimbabwe").map((prov) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: prov,
																children: prov
															}, prov))
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] block mb-1",
															children: "Contact Person on Site"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: deployContactPerson,
															onChange: (e) => setDeployContactPerson(e.target.value),
															placeholder: "e.g. Eng. T. Masvingise",
															className: "w-full h-8.5 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#1D1D1F] focus:border-black focus:outline-none"
														})] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
															className: "font-semibold text-[#1D1D1F] block mb-1",
															children: "Contact Phone / WhatsApp"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "text",
															value: deployContactPhone,
															onChange: (e) => setDeployContactPhone(e.target.value),
															placeholder: "+263 77 210 9441",
															className: "w-full h-8.5 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#1D1D1F] focus:border-black focus:outline-none font-mono"
														})] })
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-1 sm:grid-cols-3 gap-3.5",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "font-semibold text-[#1D1D1F] block mb-1",
														children: "Operator Arrangement"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
														value: deployOperator,
														onChange: (e) => setDeployOperator(e.target.value),
														className: "w-full h-8.5 rounded-lg border border-black/[0.08] bg-white px-2 text-xs text-[#1D1D1F] focus:outline-none",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Wet Rate (With Certified Operator)",
																children: "Wet Rate (With Certified Operator)"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Dry Rate (Machine Only)",
																children: "Dry Rate (Machine Only)"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Wet Rate (Double Shift Crew)",
																children: "Wet Rate (Double Shift Crew)"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Wet Rate (With Plant Mechanic)",
																children: "Wet Rate (With Plant Mechanic)"
															})
														]
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "font-semibold text-[#1D1D1F] block mb-1",
														children: "Billing Rate"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: deployRate,
														onChange: (e) => setDeployRate(e.target.value),
														placeholder: "e.g. $480 / day",
														className: "w-full h-8.5 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#1D1D1F] focus:border-black focus:outline-none font-semibold text-[#1FA855]"
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "font-semibold text-[#1D1D1F] block mb-1",
														children: "Deployment Status"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
														value: deployStatus,
														onChange: (e) => setDeployStatus(e.target.value),
														className: "w-full h-8.5 rounded-lg border border-black/[0.08] bg-white px-2 text-xs text-[#1D1D1F] focus:outline-none font-semibold",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Active on Site",
																children: "Active on Site"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Scheduled Mobilization",
																children: "Scheduled Mobilization"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Demobilizing / In Transit",
																children: "Demobilizing / In Transit"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Routine Service / Standby",
																children: "Routine Service / Standby"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
																value: "Returned to Cranborne Yard",
																children: "Returned to Cranborne Yard"
															})
														]
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "font-semibold text-[#1D1D1F] block mb-1",
														children: "Contract Start Date"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "date",
														value: deployStartDate,
														onChange: (e) => setDeployStartDate(e.target.value),
														className: "w-full h-8.5 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#1D1D1F] focus:border-black focus:outline-none"
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "font-semibold text-[#1D1D1F] block mb-1",
														children: "Scheduled Return Date"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "date",
														value: deployReturnDate,
														onChange: (e) => setDeployReturnDate(e.target.value),
														className: "w-full h-8.5 rounded-lg border border-black/[0.08] bg-white px-2.5 text-xs text-[#1D1D1F] focus:border-black focus:outline-none"
													})] })
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "font-semibold text-[#1D1D1F] block mb-1",
												children: "Operational Scope & Mobilization Notes"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
												rows: 2,
												value: deployNotes,
												onChange: (e) => setDeployNotes(e.target.value),
												placeholder: "e.g. Overburden stripping on Reef 3. 250hr service completed on site by Cranborne field team.",
												className: "w-full rounded-lg border border-black/[0.08] bg-white p-2.5 text-xs text-[#1D1D1F] focus:border-black focus:outline-none"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between border-t border-black/[0.06] pt-3.5",
												children: [editingDeployment ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => {
														setShowDeployModal(false);
														handleDeleteDeployment(editingDeployment.id);
													},
													className: "text-xs font-semibold text-red-600 hover:text-red-700 cursor-pointer",
													children: "Delete Deployment"
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => setShowDeployModal(false),
														className: "rounded-lg border border-black/[0.08] bg-white px-4 py-2 text-xs font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] cursor-pointer",
														children: "Cancel"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "submit",
														className: "rounded-lg bg-[#1D1D1F] px-5 py-2 text-xs font-semibold text-white hover:bg-black transition-all cursor-pointer shadow-xs",
														children: editingDeployment ? "Save Changes" : "Deploy Machine"
													})]
												})]
											})
										]
									})]
								})
							})
						]
					}),
					activeTab === "recycle" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl font-semibold tracking-tight text-[#1D1D1F]",
									children: "Recycle Bin"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-xs text-[#86868B]",
									children: "Clients and machines removed from the backoffice. Restore them, or delete forever."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									disabled: recycleBin.length === 0,
									onClick: () => setPendingAction({ type: "empty-bin" }),
									className: "inline-flex h-11 items-center gap-1.5 rounded-full border border-red-200 bg-white px-4 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:pointer-events-none disabled:opacity-40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), "Empty recycle bin"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap items-center gap-1.5",
									children: [
										{
											id: "all",
											label: "All",
											count: recycleBin.length
										},
										{
											id: "client",
											label: "Clients",
											count: recycleBin.filter((i) => i.kind === "client").length
										},
										{
											id: "product",
											label: "Machines",
											count: recycleBin.filter((i) => i.kind === "product").length
										}
									].map((f) => {
										const active = recycleFilter === f.id;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setRecycleFilter(f.id),
											className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all ${active ? "bg-[#1D1D1F] text-white shadow-xs" : "border border-black/[0.06] bg-white text-[#6E6E73] hover:text-[#1D1D1F]"}`,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: f.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `text-[10px] ${active ? "text-white/80" : "text-[#86868B]"}`,
												children: f.count
											})]
										}, f.id);
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-[#86868B]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: recycleSearch,
										onChange: (e) => setRecycleSearch(e.target.value),
										placeholder: "Search recycle bin...",
										className: "h-9 w-full rounded-full border border-black/[0.08] bg-white pl-9 pr-3 text-xs text-[#1D1D1F] placeholder-[#86868B] shadow-2xs focus:outline-none sm:w-64"
									})]
								})]
							}),
							selectedBinIds.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-[#1D1D1F] px-4 py-2.5 text-white shadow-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-semibold",
									children: [
										selectedBinIds.length,
										" record",
										selectedBinIds.length === 1 ? "" : "s",
										" selected"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setSelectedBinIds([]),
											className: "rounded-full px-3 py-1.5 text-xs font-medium text-white/80 hover:bg-white/10",
											children: "Clear"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setPendingAction({
												type: "restore",
												binIds: selectedBinIds
											}),
											className: "inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-[#1D1D1F]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchiveRestore, { className: "size-3.5" }), "Restore"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setPendingAction({
												type: "destroy",
												binIds: selectedBinIds
											}),
											className: "inline-flex items-center gap-1.5 rounded-full bg-red-500 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-red-400",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), "Delete forever"]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.03)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "overflow-x-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
										className: "w-full text-left text-xs",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "border-b border-black/[0.06] bg-[#FBFBFC] text-[11px] font-semibold uppercase tracking-wider text-[#86868B]",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "w-10 py-3 pl-4 pr-1",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowCheck, {
														label: "Select all visible recycle bin records",
														checked: filteredRecycleItems.length > 0 && filteredRecycleItems.every((i) => selectedBinIds.includes(i.binId)),
														indeterminate: filteredRecycleItems.some((i) => selectedBinIds.includes(i.binId)) && !filteredRecycleItems.every((i) => selectedBinIds.includes(i.binId)),
														onChange: (next) => {
															const ids = filteredRecycleItems.map((i) => i.binId);
															setSelectedBinIds((prev) => next ? [.../* @__PURE__ */ new Set([...prev, ...ids])] : prev.filter((id) => !ids.includes(id)));
														}
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "px-4 py-3",
													children: "Record"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "px-3 py-3",
													children: "Type"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "px-3 py-3",
													children: "Deleted"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "px-3 py-3 text-right",
													children: "Actions"
												})
											]
										}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
											className: "divide-y divide-black/[0.04]",
											children: filteredRecycleItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												colSpan: 5,
												className: "py-16 text-center",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mx-auto flex max-w-sm flex-col items-center gap-2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "flex size-12 items-center justify-center rounded-2xl bg-black/[0.04] text-[#86868B]",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Recycle, { className: "size-5" })
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-sm font-semibold text-[#1D1D1F]",
															children: "Recycle bin is empty"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
															className: "text-xs text-[#86868B]",
															children: "Deleted clients and machines will appear here so you can restore them."
														})
													]
												})
											}) }) : filteredRecycleItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
												className: "hover:bg-black/[0.015]",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "w-10 py-3 pl-4 pr-1",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowCheck, {
															label: `Select ${item.title}`,
															checked: selectedBinIds.includes(item.binId),
															onChange: (next) => setSelectedBinIds((prev) => next ? [...prev, item.binId] : prev.filter((id) => id !== item.binId))
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
														className: "px-4 py-3",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "block font-semibold text-[#1D1D1F]",
															children: item.title
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "block truncate text-[11px] text-[#6E6E73]",
															children: item.subtitle
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "px-3 py-3",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "rounded-full bg-black/[0.04] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#6E6E73]",
															children: item.kind === "client" ? "Client" : "Machine"
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "px-3 py-3 text-[#6E6E73]",
														children: formatBinDate(item.deletedAt)
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "px-3 py-3 text-right",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center justify-end gap-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
																type: "button",
																onClick: () => setPendingAction({
																	type: "restore",
																	binIds: [item.binId]
																}),
																className: "inline-flex h-11 items-center gap-1 rounded-full border border-black/[0.08] bg-white px-3 text-xs font-medium text-[#1D1D1F] hover:bg-[#F5F5F7]",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchiveRestore, { className: "size-3.5 text-[#6E6E73]" }), "Restore"]
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																type: "button",
																onClick: () => setPendingAction({
																	type: "destroy",
																	binIds: [item.binId]
																}),
																className: "inline-flex size-11 items-center justify-center rounded-full border border-red-200 bg-white text-red-600 hover:bg-red-50",
																title: "Delete forever",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
															})]
														})
													})
												]
											}, item.binId))
										})]
									})
								})
							})
						]
					}),
					activeTab === "profile" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-8 max-w-5xl mx-auto pb-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-black/[0.06] pb-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-bold tracking-tight text-[#1D1D1F]",
								children: "Administrator Profile & Security"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs sm:text-sm text-[#6E6E73]",
								children: "Manage operations credentials, change administrator password, and monitor Hostinger MySQL database sync."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "/api/setup.php",
									target: "_blank",
									rel: "noopener noreferrer",
									className: "inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all shadow-2xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "size-3.5 text-[#3D4F66]" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Hostinger DB Status" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3 text-[#86868B]" })
									]
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "lg:col-span-7 space-y-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-3xl border border-black/[0.08] bg-white p-6 sm:p-7 shadow-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-4 border-b border-black/[0.06] pb-5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex size-14 items-center justify-center rounded-2xl bg-[#1D1D1F] text-white text-lg font-bold shadow-xs",
											children: adminProfile.fullName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "AD"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-base font-bold text-[#1D1D1F]",
												children: adminProfile.fullName
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-[#6E6E73]",
												children: adminProfile.role
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-1.5 flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-emerald-600" }), "Primary Administrator"]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[11px] text-[#86868B]",
													children: "Cranborne Operations"
												})]
											})
										] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
										onSubmit: handleSaveProfileDetails,
										className: "mt-5 space-y-4 text-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "block font-semibold text-[#1D1D1F] mb-1",
														children: "Administrator Full Name"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														required: true,
														value: profileName,
														onChange: (e) => setProfileName(e.target.value),
														className: "w-full h-9.5 rounded-xl border border-black/[0.12] bg-[#F9F9FB] px-3 text-xs text-[#1D1D1F] focus:border-black focus:bg-white focus:outline-none transition-all"
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "block font-semibold text-[#1D1D1F] mb-1",
														children: "Administrative Email / Login ID"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "email",
														required: true,
														value: profileEmail,
														onChange: (e) => setProfileEmail(e.target.value),
														className: "w-full h-9.5 rounded-xl border border-black/[0.12] bg-[#F9F9FB] px-3 text-xs text-[#1D1D1F] focus:border-black focus:bg-white focus:outline-none transition-all"
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "block font-semibold text-[#1D1D1F] mb-1",
														children: "Department / Title"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: profileRole,
														onChange: (e) => setProfileRole(e.target.value),
														className: "w-full h-9.5 rounded-xl border border-black/[0.12] bg-[#F9F9FB] px-3 text-xs text-[#1D1D1F] focus:border-black focus:bg-white focus:outline-none transition-all"
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "block font-semibold text-[#1D1D1F] mb-1",
														children: "Direct Phone / WhatsApp"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "text",
														value: profilePhone,
														onChange: (e) => setProfilePhone(e.target.value),
														className: "w-full h-9.5 rounded-xl border border-black/[0.12] bg-[#F9F9FB] px-3 text-xs text-[#1D1D1F] focus:border-black focus:bg-white focus:outline-none transition-all"
													})] })
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "block font-semibold text-[#1D1D1F] mb-1",
												children: "Yard Location"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "text",
												value: profileLocation,
												onChange: (e) => setProfileLocation(e.target.value),
												className: "w-full h-9.5 rounded-xl border border-black/[0.12] bg-[#F9F9FB] px-3 text-xs text-[#1D1D1F] focus:border-black focus:bg-white focus:outline-none transition-all"
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "pt-2 flex justify-end",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "submit",
													className: "inline-flex h-9.5 items-center justify-center rounded-xl bg-[#1D1D1F] px-5 text-xs font-semibold text-white shadow-2xs hover:bg-black transition-all cursor-pointer",
													children: "Save Profile Details"
												})
											})
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-3xl border border-black/[0.08] bg-white p-6 sm:p-7 shadow-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3 border-b border-black/[0.06] pb-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex size-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700 border border-amber-200",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-5" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-sm font-bold text-[#1D1D1F]",
												children: "Change Administrator Credentials"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-[#6E6E73]",
												children: "Update your login password and security access key."
											})] })]
										}),
										credentialSuccessMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 flex items-center gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-3.5 text-xs text-emerald-800",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 shrink-0 text-emerald-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex-1 font-medium",
												children: credentialSuccessMsg
											})]
										}),
										credentialErrorMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-4 flex items-center gap-2.5 rounded-2xl border border-red-200 bg-red-50/80 p-3.5 text-xs text-red-800",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-4 shrink-0 text-red-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex-1 font-medium",
												children: credentialErrorMsg
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
											onSubmit: handleUpdateCredentials,
											className: "mt-5 space-y-4 text-xs",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "block font-semibold text-[#1D1D1F] mb-1",
													children: "Current Administrator Password *"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: showCurrentPass ? "text" : "password",
														required: true,
														value: currentPassword,
														onChange: (e) => setCurrentPassword(e.target.value),
														placeholder: "Enter current password to verify identity",
														className: "w-full h-9.5 rounded-xl border border-black/[0.12] bg-[#F9F9FB] px-3 pr-10 text-xs text-[#1D1D1F] focus:border-black focus:bg-white focus:outline-none transition-all"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => setShowCurrentPass(!showCurrentPass),
														className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-[#86868B] hover:text-[#1D1D1F] cursor-pointer",
														children: showCurrentPass ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
													})]
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "block font-semibold text-[#1D1D1F] mb-1",
														children: "New Administrator Password *"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "relative",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: showNewPass ? "text" : "password",
															required: true,
															value: newPassword,
															onChange: (e) => setNewPassword(e.target.value),
															placeholder: "Min. 8 characters",
															className: "w-full h-9.5 rounded-xl border border-black/[0.12] bg-[#F9F9FB] px-3 pr-10 text-xs text-[#1D1D1F] focus:border-black focus:bg-white focus:outline-none transition-all"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: () => setShowNewPass(!showNewPass),
															className: "absolute right-2.5 top-1/2 -translate-y-1/2 text-[#86868B] hover:text-[#1D1D1F] cursor-pointer",
															children: showNewPass ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
														})]
													})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "block font-semibold text-[#1D1D1F] mb-1",
														children: "Confirm New Password *"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "password",
														required: true,
														value: confirmPassword,
														onChange: (e) => setConfirmPassword(e.target.value),
														placeholder: "Re-type new password",
														className: "w-full h-9.5 rounded-xl border border-black/[0.12] bg-[#F9F9FB] px-3 text-xs text-[#1D1D1F] focus:border-black focus:bg-white focus:outline-none transition-all"
													})] })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-xl bg-[#F5F5F7] p-3 text-[11px] text-[#6E6E73] space-y-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "font-semibold text-[#1D1D1F]",
														children: "Password Guidelines:"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
														className: "list-disc pl-4 space-y-0.5",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
																className: newPassword.length >= 8 ? "text-emerald-700 font-medium" : "",
																children: "Minimum 8 characters"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
																className: /[A-Za-z]/.test(newPassword) && /[0-9]/.test(newPassword) ? "text-emerald-700 font-medium" : "",
																children: "Contains both letters and numbers"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
																className: newPassword && newPassword === confirmPassword ? "text-emerald-700 font-medium" : "",
																children: "New password and confirm password match"
															})
														]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "pt-2 flex justify-end",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														type: "submit",
														disabled: isUpdatingCredentials,
														className: "inline-flex h-9.5 items-center justify-center gap-2 rounded-xl bg-amber-600 px-5 text-xs font-semibold text-white shadow-2xs hover:bg-amber-700 active:scale-95 disabled:opacity-50 transition-all cursor-pointer",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isUpdatingCredentials ? "Updating Credentials..." : "Update Administrator Password" })]
													})
												})
											]
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "lg:col-span-5 space-y-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-3xl border border-black/[0.08] bg-white p-6 shadow-xs space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex size-10 items-center justify-center rounded-xl bg-[#3D4F66]/10 text-[#3D4F66]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Database, { className: "size-5" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-sm font-bold text-[#1D1D1F]",
												children: "Hostinger MySQL & PHP Backend"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-[#6E6E73]",
												children: "Cranborne Yard SQL Integration"
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-[#6E6E73] leading-relaxed",
											children: [
												"The backoffice seamlessly writes to Hostinger MySQL via the secure PHP API in ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
													className: "bg-black/[0.05] px-1 py-0.5 rounded text-[11px]",
													children: "/public/api/"
												}),
												". Inbound leads from the public Quote Form are immediately recorded into the SQL database."
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-2xl border border-black/[0.06] bg-[#F9F9FB] p-3.5 space-y-2.5 text-xs",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[#6E6E73]",
														children: "API Endpoints"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-mono text-[11px] text-emerald-700 font-semibold",
														children: "Active & Live"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[#6E6E73]",
														children: "Database Schema"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
														href: "/api/schema.sql",
														download: "schema.sql",
														className: "text-[11px] font-semibold text-blue-700 hover:underline flex items-center gap-1",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Download schema.sql" })
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[#6E6E73]",
														children: "1-Click Diagnostic"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: "/api/setup.php",
														target: "_blank",
														rel: "noreferrer",
														className: "text-[11px] font-semibold text-purple-700 hover:underline flex items-center gap-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Open /api/setup.php" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })]
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "border-t border-black/[0.06] pt-3 text-[11px] text-[#86868B] space-y-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-semibold text-[#1D1D1F]",
													children: "Configured Tables:"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													"• ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
														className: "text-[#1D1D1F]",
														children: "omnicore_admin_users"
													}),
													": Credentials & profile"
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													"• ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
														className: "text-[#1D1D1F]",
														children: "omnicore_crm_leads"
													}),
													": Public website quote leads"
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													"• ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
														className: "text-[#1D1D1F]",
														children: "omnicore_equipment"
													}),
													": Machinery catalogue inventory"
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													"• ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
														className: "text-[#1D1D1F]",
														children: "omnicore_deployments"
													}),
													": Machine hire contracts"
												] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													"• ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
														className: "text-[#1D1D1F]",
														children: "omnicore_site_copy"
													}),
													": Live website text & phones"
												] })
											]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-3xl border border-black/[0.08] bg-white p-6 shadow-xs space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "text-sm font-bold text-[#1D1D1F]",
												children: "Session & Security Audit"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-[#6E6E73]",
												children: "Access Status & Authentication Log"
											})] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2 text-xs",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-between py-1.5 border-b border-black/[0.04]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[#6E6E73]",
														children: "Authenticated User"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold text-[#1D1D1F]",
														children: adminProfile.email
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-between py-1.5 border-b border-black/[0.04]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[#6E6E73]",
														children: "Session State"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold text-emerald-700",
														children: "Active & Verified"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-between py-1.5 border-b border-black/[0.04]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[#6E6E73]",
														children: "Last Password Change"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-medium text-[#1D1D1F]",
														children: adminProfile.lastPasswordChange
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-between py-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[#6E6E73]",
														children: "Last Login Recorded"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-medium text-[#1D1D1F]",
														children: adminProfile.lastLogin
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "pt-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: handleLogout,
												className: "w-full flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50/50 py-2.5 text-xs font-semibold text-red-700 hover:bg-red-100/60 transition-all cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sign Out from Backoffice" })]
											})
										})
									]
								})]
							})]
						})]
					})
				]
			}),
			pendingConfirm && pendingAction && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmModal, {
				title: pendingConfirm.title,
				body: pendingConfirm.body,
				confirmLabel: pendingConfirm.confirmLabel,
				tone: pendingConfirm.tone,
				onCancel: () => setPendingAction(null),
				onConfirm: runPendingAction
			})
		] })]
	});
}
//#endregion
export { AdminBackoffice as component };
