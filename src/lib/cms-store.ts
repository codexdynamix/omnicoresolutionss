import { useState, useEffect } from "react";
import { equipment as initialEquipment, site as initialSite, type Equipment } from "@/data/site";
import { apiClient } from "@/lib/api-client";

export type CRMClient = {
  id: string;
  name: string;
  organization: string;
  phone: string;
  email: string;
  location: string;
  province: string;
  service: string;
  equipmentInterest: string;
  intent: "Buy" | "Hire" | "Both" | "Consultation";
  stage: "Lead" | "Discovery" | "Tender Quoted" | "Negotiation" | "Won" | "Lost";
  priority: "High" | "Medium" | "Normal";
  dealValue: number;
  dealValueDisplay: string;
  lastContact: string;
  nextFollowUp: string;
  notes: string;
  timeline: { date: string; note: string; author: string }[];
};

export type ExtendedEquipment = Equipment & {
  sku?: string;
  stockStatus?: "In Yard Cranborne" | "In Transit (Beitbridge)" | "Active on Site" | "Special Order";
  throughput?: string;
  powerOption?: string;
  priceUSD?: string;
  condition?: "New" | "Refurbished / Certified";
  warrantyMonths?: number;
  detailedNotes?: string;
};

export type RecycleBinKind = "client" | "product";

export type RecycleBinItem = {
  binId: string;
  kind: RecycleBinKind;
  deletedAt: string;
  title: string;
  subtitle: string;
  snapshot: CRMClient | ExtendedEquipment;
};

export type SiteCopyContent = {
  // Brand & Identity
  name: string;
  shortName: string;
  tagline: string;
  foundedYear: string;
  companyReg: string;

  // Hero Section
  heroBadge: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroBannerAnnouncement: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  heroCtaTertiary: string;

  // Hero Quick Stats (4 cards)
  stat1Label: string;
  stat1Detail: string;
  stat2Label: string;
  stat2Detail: string;
  stat3Label: string;
  stat3Detail: string;
  stat4Label: string;
  stat4Detail: string;

  // Yard & Physical Location
  yardAddressLine1: string;
  yardAddressLine2: string;
  yardCity: string;
  yardCountry: string;
  googleMapsUrl: string;
  yardDirectionsNote: string;

  // Contact Channels
  primaryPhone: string;
  primaryPhoneTel: string;
  secondaryPhone: string;
  secondaryPhoneTel: string;
  whatsappNumber: string;
  whatsappMessage: string;
  email: string;
  salesEmail: string;

  // Operating Hours & Service SLAs
  hoursWeekday: string;
  hoursSaturday: string;
  hoursSunday: string;
  afterHoursNotice: string;
  responseSLA: string;
  emergencyHotline: string;
  emergencyHotlineTel: string;
  dispatchTurnaround: string;
  warrantyNotice: string;
  termsNotice: string;
  paymentMethods: string;
  inspectionNotice: string;
  tendersNotice: string;

  // Social Links
  linkedinUrl: string;
  facebookUrl: string;

  // Division Eyebrows & Headlines
  miningEyebrow: string;
  miningHeadline: string;
  miningSubheadline: string;
  hardwareEyebrow: string;
  hardwareHeadline: string;
  hardwareSubheadline: string;
  hireEyebrow: string;
  hireHeadline: string;
  hireSubheadline: string;
  farmingEyebrow: string;
  farmingHeadline: string;
  farmingSubheadline: string;
  industryEyebrow: string;
  industryHeadline: string;
  industrySubheadline: string;

  // About & Pillars
  aboutHeadline: string;
  aboutMission: string;
  aboutStory: string;
  aboutPillar1: string;
  aboutPillar2: string;
  aboutPillar3: string;
  aboutPillar4: string;

  // Footer & Compliance
  footerAbout: string;
  footerCopyright: string;
};

export const defaultSiteCopy: SiteCopyContent = {
  // Brand & Identity
  name: initialSite.name,
  shortName: initialSite.shortName,
  tagline: initialSite.tagline,
  foundedYear: "2024",
  companyReg: "Harare Industrial & Mining Machinery Supplier",

  // Hero Section
  heroBadge: "Cranborne yard · 115 Chiremba Road, Harare",
  heroHeadline: "Plant for Zimbabwe’s mines, farms and pours.",
  heroSubheadline:
    "Gold circuits, fence plant, self-loading mixers, excavators and farm mills — specified in Harare, delivered nationwide, commissioned on the ground.",
  heroBannerAnnouncement: "Cranborne Yard Open Mon–Sat · Lowbed Deliveries to Midlands, Matabeleland, Manicaland & Mashonaland",
  heroCtaPrimary: "Chat on WhatsApp",
  heroCtaSecondary: "Request a firm quote",
  heroCtaTertiary: "Open the catalogue",

  // Hero Quick Stats
  stat1Label: "Harare hub",
  stat1Detail: "Cranborne yard",
  stat2Label: "1–25 TPH",
  stat2Detail: "Gold circuits",
  stat3Label: "Wet & dry",
  stat3Detail: "Plant hire",
  stat4Label: "10 provinces",
  stat4Detail: "Lowbed delivery",

  // Yard & Physical Location
  yardAddressLine1: initialSite.address.line1,
  yardAddressLine2: initialSite.address.line2,
  yardCity: "Harare",
  yardCountry: "Zimbabwe",
  googleMapsUrl: initialSite.address.maps,
  yardDirectionsNote: "5 minutes from Harare CBD along Chiremba Rd, Cranborne Industrial Belt. Lowbed and heavy truck access.",

  // Contact Channels
  primaryPhone: initialSite.phoneDisplay,
  primaryPhoneTel: initialSite.phoneTel,
  secondaryPhone: initialSite.phoneAltDisplay,
  secondaryPhoneTel: initialSite.phoneAltTel,
  whatsappNumber: initialSite.whatsappNumber,
  whatsappMessage: "Hello Omnicore Harare Desk — I would like an equipment quote.",
  email: initialSite.email,
  salesEmail: "sales@omnicoresolutions.co.zw",

  // Operating Hours & Service SLAs
  hoursWeekday: "08:00 – 17:00",
  hoursSaturday: "08:00 – 13:00",
  hoursSunday: "Closed · WhatsApp desk monitored",
  afterHoursNotice: "Urgent site breakdown & pump dispatch hotline active 24/7 on WhatsApp.",
  responseSLA: "Average tender & pricing turnaround under 15 minutes during yard hours.",
  emergencyHotline: "+263 77 733 4569",
  emergencyHotlineTel: "+263777334569",
  dispatchTurnaround: "Same-day lowbed loading for in-stock plant; 24–48h nationwide delivery.",
  warrantyNotice: "12-month factory parts warranty & Harare commissioning included.",
  termsNotice: "All quotes issued in USD payable via Nostro, RTGS at official bank rate, or cash on collection.",
  paymentMethods: "Bank Transfer, Nostro, USD Cash, EcoCash, ZIPIT",
  inspectionNotice: "Physical yard mechanical inspections welcome Monday–Saturday at 115 Chiremba Rd, Cranborne.",
  tendersNotice: "PRAZ Registered Supplier · Formal tenders, municipal quotes & mine procurement packs issued within 24h.",

  // Social Links
  linkedinUrl: initialSite.linkedin,
  facebookUrl: initialSite.facebook,

  // Division Eyebrows & Headlines
  miningEyebrow: "Gold · Chrome · Lithium",
  miningHeadline: "Plant that turns ore into cashflow.",
  miningSubheadline: "Complete gravity and milling circuits engineered for small-scale and commercial miners across Kadoma, Kwekwe, Gwanda, and Shamva.",
  hardwareEyebrow: "Build · Fence · Supply",
  hardwareHeadline: "The hardware that keeps a site moving.",
  hardwareSubheadline: "Diamond mesh, razor wire, block machines, and farm fencing hardware built to withstand rigorous Zimbabwean field conditions.",
  hireEyebrow: "Heavy Fleet · Harare Yard",
  hireHeadline: "Yellow plant on wet or dry rate without the downtime.",
  hireSubheadline: "Late-model CAT diggers, 37m concrete boom pumps, and self-loading mixers with certified operators ready for rapid mobilization.",
  farmingEyebrow: "Feed · Grind · Value Add",
  farmingHeadline: "Agro-processing machinery for commercial and smallholder farms.",
  farmingSubheadline: "Hammer mills, vertical feed mixers, and oil presses designed for commercial poultry, cattle pen-fattening, and crop processing.",
  industryEyebrow: "Power · Motors · Compressors",
  industryHeadline: "Industrial gear that doesn't buckle under load shedding.",
  industrySubheadline: "Heavy-duty electric motors, screw compressors, and diesel backup sets calibrated for uninterrupted industrial operation.",

  // About & Pillars
  aboutHeadline: "Direct Importers & Stockists of Heavy Industrial Equipment",
  aboutMission:
    "Supplying verified commercial machinery with local parts, field commissioning, and technical back-up across all 10 provinces of Zimbabwe.",
  aboutStory: "Founded to bridge the equipment gap for Zimbabwean miners, contractors, and farmers, Omnicore Solutions maintains a fully-stocked Cranborne yard with experienced mechanical engineers on site.",
  aboutPillar1: "Physical Harare Yard Stock — inspect before purchase at Cranborne",
  aboutPillar2: "Zimbabwe-Field Proven — built for local ore grades and rural power grids",
  aboutPillar3: "Spares & Technical Backup — OEM wear parts stocked in Harare",
  aboutPillar4: "Nationwide Logistics — lowbed and crane-truck delivery to your site",

  // Footer & Compliance
  footerAbout:
    "Direct supply, equipment hire, and on-site plant commissioning from Cranborne, Harare — delivering to claims, farms and project sites nationwide.",
  footerCopyright: `© ${new Date().getFullYear()} Omnicore Solutions. All rights reserved. Machinery & Plant Zimbabwe · Cranborne, Harare`,
};

export const defaultCRMClients: CRMClient[] = [
  {
    id: "CRM-1001",
    name: "Tafadzwa Moyo",
    organization: "Golden Valley Gold Syndicate",
    phone: "+263 77 234 5678",
    email: "tmoyo@kadomamining.co.zw",
    location: "Kadoma / Golden Valley",
    province: "Mashonaland West",
    service: "Mining Equipment",
    equipmentInterest: "200x300 Jaw Crusher & 1200x2400 Ball Mill circuit",
    intent: "Buy",
    stage: "Tender Quoted",
    priority: "High",
    dealValue: 18500,
    dealValueDisplay: "$18,500",
    lastContact: "Today, 08:35",
    nextFollowUp: "Tomorrow, 10:00",
    notes: "Requires diesel engine drive configuration due to local grid instability. Ready for Cranborne yard mechanical inspection on Friday.",
    timeline: [
      { date: "26 Sep 2026", note: "Formal FOB Harare tender quotation issued with 35HP diesel option.", author: "Farai M. (Technical Desk)" },
      { date: "25 Sep 2026", note: "Inbound quote received through online site form.", author: "System" },
    ],
  },
  {
    id: "CRM-1002",
    name: "Farai Chitepo",
    organization: "Chitepo Infrastructure Civils",
    phone: "+263 71 890 1234",
    email: "farai@chitepoconstruction.co.zw",
    location: "Borrowdale West, Harare",
    province: "Harare",
    service: "Construction Machinery Hire",
    equipmentInterest: "37m Concrete Boom Pump + 2 Operators",
    intent: "Hire",
    stage: "Discovery",
    priority: "High",
    dealValue: 3600,
    dealValueDisplay: "$3,600",
    lastContact: "Yesterday, 16:15",
    nextFollowUp: "28 Sep, 09:00",
    notes: "Two-day raft foundation pour. Requires wet rate with certified operator and 80m pipeline extensions.",
    timeline: [
      { date: "25 Sep 2026", note: "Confirmed pump availability from Cranborne yard for next Tuesday.", author: "Blessing T." },
    ],
  },
  {
    id: "CRM-1003",
    name: "Blessing Hove",
    organization: "Mazowe Citrus & Cattle Estates",
    phone: "+263 78 456 7890",
    email: "blessing@mazowefarms.zw",
    location: "Mazowe Farming Belt",
    province: "Mashonaland Central",
    service: "Farming Machinery",
    equipmentInterest: "3-Tonne Vertical Feed Mixer + 15kW Motor",
    intent: "Buy",
    stage: "Negotiation",
    priority: "Medium",
    dealValue: 7200,
    dealValueDisplay: "$7,200",
    lastContact: "25 Sep, 11:20",
    nextFollowUp: "29 Sep, 14:00",
    notes: "Negotiating inclusion of magnetic trap and extra screen sets for maize and soy grinding.",
    timeline: [
      { date: "25 Sep 2026", note: "Client visited Cranborne yard to inspect mixer auger thickness.", author: "Farai M." },
    ],
  },
  {
    id: "CRM-1004",
    name: "Kudzai Ndlovu",
    organization: "Great Dyke Metals Ltd",
    phone: "+263 77 567 8901",
    email: "kudzai@greatdykemetals.zw",
    location: "Zvishavane Overburden Claims",
    province: "Midlands",
    service: "Construction Machinery Hire",
    equipmentInterest: "CAT 320D 20-Tonne Excavator (30 Days)",
    intent: "Hire",
    stage: "Won",
    priority: "High",
    dealValue: 14400,
    dealValueDisplay: "$14,400",
    lastContact: "24 Sep, 14:40",
    nextFollowUp: "15 Oct, 12:00",
    notes: "Contract signed, deposit cleared. Lowbed mobilized to Midlands site with dedicated operator.",
    timeline: [
      { date: "24 Sep 2026", note: "Signed hire agreement returned and lowbed dispatch scheduled.", author: "Logistics Desk" },
    ],
  },
  {
    id: "CRM-1005",
    name: "Sekai Matarise",
    organization: "Harare Perimeter Security Co.",
    phone: "+263 73 345 6789",
    email: "smatarise@securefencing.co.zw",
    location: "Msasa Industrial, Harare",
    province: "Harare",
    service: "Hardware & Construction",
    equipmentInterest: "Double-Twist Barbed Wire Manufacturing Plant",
    intent: "Buy",
    stage: "Tender Quoted",
    priority: "Medium",
    dealValue: 9500,
    dealValueDisplay: "$9,500",
    lastContact: "23 Sep, 09:15",
    nextFollowUp: "30 Sep, 11:00",
    notes: "Requires machine commissioning and coil wire supplier introductions in Harare.",
    timeline: [
      { date: "23 Sep 2026", note: "Sent equipment layout drawing and power specification (5.5kW).", author: "Technical Desk" },
    ],
  },
  {
    id: "CRM-1006",
    name: "Edmore Chinyanga",
    organization: "Shamva River Gold Claim",
    phone: "+263 77 654 3210",
    email: "edmore@shamvaalluvial.zw",
    location: "Shamva District",
    province: "Mashonaland Central",
    service: "Mining Equipment",
    equipmentInterest: "10 TPH Gold Wash Plant Trommel & Shaking Table",
    intent: "Buy",
    stage: "Lead",
    priority: "High",
    dealValue: 22000,
    dealValueDisplay: "$22,000",
    lastContact: "22 Sep, 15:30",
    nextFollowUp: "28 Sep, 10:00",
    notes: "Alluvial deposit along riverbank. Inquiring about water pump volume and sluice box sizing.",
    timeline: [
      { date: "22 Sep 2026", note: "Inbound WhatsApp inquiry logged.", author: "Farai M." },
    ],
  },
  {
    id: "CRM-1007",
    name: "Rutendo Mutasa",
    organization: "Mutasa Feedlot & Agro Services",
    phone: "+263 78 123 9876",
    email: "rmutasa@mutasafeedlot.co.zw",
    location: "Marondera Agro Corridor",
    province: "Mashonaland East",
    service: "Farming Machinery",
    equipmentInterest: "Farm Hammer Mill with 7.5kW Motor & Cyclone",
    intent: "Buy",
    stage: "Won",
    priority: "Normal",
    dealValue: 3850,
    dealValueDisplay: "$3,850",
    lastContact: "21 Sep, 13:00",
    nextFollowUp: "05 Oct, 09:00",
    notes: "Machine collected from Cranborne yard. Customer reported successful test milling.",
    timeline: [
      { date: "21 Sep 2026", note: "Full payment received and yard gate pass issued.", author: "Finance Desk" },
    ],
  },
  {
    id: "CRM-1008",
    name: "Munyaradzi Gumbo",
    organization: "Bulawayo Aggregates & Paving",
    phone: "+263 71 334 8899",
    email: "mgumbo@byoaggregates.zw",
    location: "Khami Road, Bulawayo",
    province: "Matabeleland North",
    service: "Construction Machinery Hire",
    equipmentInterest: "Self-Loading Concrete Mixer (4.0m³)",
    intent: "Hire",
    stage: "Discovery",
    priority: "Medium",
    dealValue: 5800,
    dealValueDisplay: "$5,800",
    lastContact: "20 Sep, 10:45",
    nextFollowUp: "29 Sep, 15:00",
    notes: "Evaluating freight cost from Cranborne Harare yard down to Bulawayo job site.",
    timeline: [
      { date: "20 Sep 2026", note: "Provided national lowbed mobilization rate schedule.", author: "Logistics Desk" },
    ],
  },
];

export const defaultExtendedEquipment: ExtendedEquipment[] = initialEquipment.map((item, idx) => ({
  ...item,
  sku: `OMNI-${item.category.toUpperCase().slice(0, 3)}-${100 + idx}`,
  stockStatus: "In Yard Cranborne",
  throughput: item.category === "mining" ? "5 – 15 TPH" : item.category === "farming" ? "1.5 – 3 TPH" : "Site Rated",
  powerOption: "Electric 3-Phase / Diesel Engine Option",
  priceUSD: item.category === "hire" ? "Daily Rate on Tender" : "Direct Yard Quote",
  condition: "New",
  warrantyMonths: 12,
  detailedNotes: `Heavy-duty specification engineered for continuous African field operation. Supported by Cranborne yard spare parts and Harare field commissioning team.`,
}));

const STORAGE_KEY_CRM = "omnicore_crm_clients_v2";
const STORAGE_KEY_EQUIPMENT = "omnicore_equipment_inventory_v2";
const STORAGE_KEY_SITE_COPY = "omnicore_site_copy_v2";
const STORAGE_KEY_RECYCLE = "omnicore_recycle_bin_v1";

export function getStoredCRMClients(): CRMClient[] {
  if (typeof window === "undefined") return defaultCRMClients;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CRM);
    if (!raw) return defaultCRMClients;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : defaultCRMClients;
  } catch {
    return defaultCRMClients;
  }
}

export function saveStoredCRMClients(clients: CRMClient[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_CRM, JSON.stringify(clients));
    window.dispatchEvent(new CustomEvent("omnicore-crm-updated"));
  } catch {
    // ignore
  }
}

export function addInboundLeadToCRM(lead: {
  name: string;
  phone: string;
  email?: string;
  location?: string;
  service?: string;
  intent?: string;
  message?: string;
}) {
  const current = getStoredCRMClients();
  const id = `CRM-WEB-${Math.floor(1000 + Math.random() * 9000)}`;
  const newClient: CRMClient = {
    id,
    name: lead.name || "Inbound Client",
    organization: "Website Inbound Tender Request",
    phone: lead.phone || "+263 ",
    email: lead.email || "",
    location: lead.location || "Harare",
    province: "Harare",
    service: lead.service || "Mining Equipment",
    equipmentInterest: lead.message ? `${lead.service || "Plant"}: ${lead.message.slice(0, 50)}` : (lead.service || "General Inquiry"),
    intent: (lead.intent === "Hire" ? "Hire" : lead.intent === "Both" ? "Both" : "Buy"),
    stage: "Lead",
    priority: "High",
    dealValue: 12500,
    dealValueDisplay: "$12,500",
    lastContact: "Just Now",
    nextFollowUp: "Today, 16:00",
    notes: lead.message || "Submitted through website quote desk.",
    timeline: [
      {
        date: "Today",
        note: `Website quote requirement logged: ${lead.service || "Machinery"} (${lead.intent || "Buy"}). Message: "${lead.message || "Direct request"}"`,
        author: "Web Desk Intake",
      },
    ],
  };

  const updated = [newClient, ...current];
  saveStoredCRMClients(updated);

  // Sync to PHP / MySQL backend
  apiClient.submitLead({
    id,
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    location: lead.location,
    service: lead.service,
    intent: lead.intent,
    message: lead.message,
    equipmentInterest: newClient.equipmentInterest,
    priority: "High",
    stage: "Lead",
    dealValue: 12500,
  }).catch(() => {});
}

export function getStoredEquipment(): ExtendedEquipment[] {
  if (typeof window === "undefined") return defaultExtendedEquipment;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_EQUIPMENT);
    if (!raw) return defaultExtendedEquipment;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : defaultExtendedEquipment;
  } catch {
    return defaultExtendedEquipment;
  }
}

export function saveStoredEquipment(items: ExtendedEquipment[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_EQUIPMENT, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("omnicore-equipment-updated"));
  } catch {
    // ignore
  }
}

export function getStoredSiteCopy(): SiteCopyContent {
  if (typeof window === "undefined") return defaultSiteCopy;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SITE_COPY);
    if (!raw) return defaultSiteCopy;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? { ...defaultSiteCopy, ...parsed } : defaultSiteCopy;
  } catch {
    return defaultSiteCopy;
  }
}

export function saveStoredSiteCopy(copy: SiteCopyContent) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_SITE_COPY, JSON.stringify(copy));
    window.dispatchEvent(new CustomEvent("omnicore-copy-updated"));
  } catch {
    // ignore
  }
}

export function resetStoredSiteCopy(): SiteCopyContent {
  if (typeof window === "undefined") return defaultSiteCopy;
  try {
    localStorage.setItem(STORAGE_KEY_SITE_COPY, JSON.stringify(defaultSiteCopy));
    window.dispatchEvent(new CustomEvent("omnicore-copy-updated"));
    return defaultSiteCopy;
  } catch {
    return defaultSiteCopy;
  }
}

export function useSiteCopy(): SiteCopyContent {
  const [copy, setCopy] = useState<SiteCopyContent>(getStoredSiteCopy);

  useEffect(() => {
    function onUpdate() {
      setCopy(getStoredSiteCopy());
    }
    window.addEventListener("omnicore-copy-updated", onUpdate);
    return () => {
      window.removeEventListener("omnicore-copy-updated", onUpdate);
    };
  }, []);

  return copy;
}

function makeBinId(kind: RecycleBinKind, sourceId: string) {
  return `bin-${kind}-${sourceId}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

export function toRecycleClient(client: CRMClient): RecycleBinItem {
  return {
    binId: makeBinId("client", client.id),
    kind: "client",
    deletedAt: new Date().toISOString(),
    title: client.name,
    subtitle: `${client.organization} · ${client.id}`,
    snapshot: client,
  };
}

export function toRecycleProduct(item: ExtendedEquipment): RecycleBinItem {
  return {
    binId: makeBinId("product", item.id),
    kind: "product",
    deletedAt: new Date().toISOString(),
    title: item.name,
    subtitle: `${item.sku || item.id} · ${item.category}`,
    snapshot: item,
  };
}

export function getStoredRecycleBin(): RecycleBinItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RECYCLE);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveStoredRecycleBin(items: RecycleBinItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_RECYCLE, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("omnicore-recycle-updated"));
  } catch {
    // ignore
  }
}

// ============================================================================
// PLANT HIRE DEPLOYMENTS & FIELD FLEET STORE
// ============================================================================
export const STORAGE_KEY_DEPLOYMENTS = "omnicore_field_deployments_v2";

export type DeploymentStatus =
  | "Active on Site"
  | "Scheduled Mobilization"
  | "Demobilizing / In Transit"
  | "Routine Service / Standby"
  | "Returned to Cranborne Yard";

export type DeploymentRecord = {
  id: string;
  productId?: string;
  plant: string;
  category: "hire" | "mining" | "farming" | "hardware" | "industry";
  image: string;
  sku: string;
  client: string;
  site: string;
  province: string;
  operator: string;
  rate: string;
  dailyRateUSD: number;
  status: DeploymentStatus;
  startDate: string;
  scheduledReturn: string;
  contractRef: string;
  contactPerson?: string;
  contactPhone?: string;
  notes?: string;
};

export const DEFAULT_DEPLOYMENTS: DeploymentRecord[] = [
  {
    id: "DEP-01",
    productId: "cat-320d-excavator",
    plant: "20-Tonne CAT 320D Excavator",
    category: "hire",
    image: "/images/cat-excavator.jpg",
    sku: "OMNI-HIR-320D",
    client: "Great Dyke Quarries Ltd",
    site: "Shamva Gold Claims, Mash Central",
    province: "Mashonaland Central",
    operator: "Wet Rate (With Certified Operator)",
    rate: "$480 / day",
    dailyRateUSD: 480,
    status: "Active on Site",
    startDate: "2026-09-01",
    scheduledReturn: "2026-10-15",
    contractRef: "CNT-2026-088",
    contactPerson: "Eng. T. Masvingise",
    contactPhone: "+263 77 210 9441",
    notes: "Overburden stripping on Reef 3. 250hr service completed on site by Cranborne field team.",
  },
  {
    id: "DEP-02",
    productId: "37m-concrete-boom-pump",
    plant: "37m Concrete Boom Pump (Isuzu 6x4)",
    category: "hire",
    image: "/images/concrete-pump.jpg",
    sku: "OMNI-HIR-37M",
    client: "Terracotta Projects",
    site: "Highland Park Extension, Harare",
    province: "Harare",
    operator: "Wet Rate (With Certified Operator)",
    rate: "$1,800 / pour",
    dailyRateUSD: 1800,
    status: "Active on Site",
    startDate: "2026-09-20",
    scheduledReturn: "2026-09-28",
    contractRef: "CNT-2026-092",
    contactPerson: "Farai Chitepo",
    contactPhone: "+263 71 833 0019",
    notes: "Basement slab and column pour. Pipe wash-out station verified at Cranborne yard prior to dispatch.",
  },
  {
    id: "DEP-03",
    productId: "tlb-backhoe-loader",
    plant: "TLB Backhoe Loader (4x4 Turbo 100HP)",
    category: "hire",
    image: "/images/tlb-loader.jpg",
    sku: "OMNI-HIR-TLB",
    client: "Zim-Agro Holdings",
    site: "Chinhoyi Farm Block 4",
    province: "Mashonaland West",
    operator: "Dry Rate (Machine Only)",
    rate: "$240 / day",
    dailyRateUSD: 240,
    status: "Active on Site",
    startDate: "2026-09-10",
    scheduledReturn: "2026-10-02",
    contractRef: "CNT-2026-079",
    contactPerson: "D. Van Der Merwe",
    contactPhone: "+263 77 409 1182",
    notes: "Irrigation trenching and dam wall maintenance. Fuel supplied on farm.",
  },
  {
    id: "DEP-04",
    productId: "shantui-160hp-grader",
    plant: "Motor Grader (Shantui 160HP)",
    category: "hire",
    image: "/images/motor-grader.jpg",
    sku: "OMNI-HIR-GRD",
    client: "Norton Municipality Subcontractor",
    site: "Norton Ring Road Phase 2",
    province: "Mashonaland West",
    operator: "Wet Rate (With Certified Operator)",
    rate: "$520 / day",
    dailyRateUSD: 520,
    status: "Scheduled Mobilization",
    startDate: "2026-10-01",
    scheduledReturn: "2026-10-25",
    contractRef: "CNT-2026-101",
    contactPerson: "Blessing Moyo",
    contactPhone: "+263 77 392 4851",
    notes: "Subgrade leveling and storm drain profiling. Lowbed booked for 01 Oct 06:00 mobilization from Cranborne.",
  },
  {
    id: "DEP-05",
    productId: "tipper-truck-20t",
    plant: "20-Tonne Tipper Truck (SinoTruk 371)",
    category: "hire",
    image: "/images/tipper-truck.jpg",
    sku: "OMNI-HIR-TIP20",
    client: "Midlands Chrome Consortium",
    site: "Shurugwi Chrome Pit 7",
    province: "Midlands",
    operator: "Wet Rate (Double Shift Crew)",
    rate: "$360 / day",
    dailyRateUSD: 360,
    status: "Active on Site",
    startDate: "2026-08-15",
    scheduledReturn: "2026-11-15",
    contractRef: "CNT-2026-064",
    contactPerson: "K. Sibanda",
    contactPhone: "+263 77 554 9912",
    notes: "Hauling run-of-mine chrome ore from pit face to wash plant. 90-day seasonal hire contract.",
  },
  {
    id: "DEP-06",
    productId: "jaw-crusher-mobile",
    plant: "Mobile Tracked Jaw Crusher (30 TPH)",
    category: "mining",
    image: "/images/jaw-crusher.jpg",
    sku: "OMNI-MIN-CRU30",
    client: "Goromonzi Lithium Ventures",
    site: "Goromonzi Lithium Hard-Rock Claim",
    province: "Mashonaland East",
    operator: "Wet Rate (With Plant Mechanic)",
    rate: "$950 / day",
    dailyRateUSD: 950,
    status: "Active on Site",
    startDate: "2026-09-05",
    scheduledReturn: "2026-10-30",
    contractRef: "CNT-2026-085",
    contactPerson: "L. Zhou",
    contactPhone: "+263 78 440 2291",
    notes: "Primary pegmatite reduction down to -40mm. Includes spare manganese jaw plates stored on site container.",
  },
  {
    id: "DEP-07",
    productId: "perkins-50kva-generator",
    plant: "50kVA Perkins Silent Diesel Generator",
    category: "hardware",
    image: "/images/generator.jpg",
    sku: "OMNI-HDW-GEN50",
    client: "Beatrice Dairies & Agro",
    site: "Beatrice Central Cold-Chain Unit",
    province: "Mashonaland East",
    operator: "Dry Rate (Machine Only)",
    rate: "$140 / day",
    dailyRateUSD: 140,
    status: "Active on Site",
    startDate: "2026-09-12",
    scheduledReturn: "2026-10-12",
    contractRef: "CNT-2026-090",
    contactPerson: "Grace Munemo",
    contactPhone: "+263 77 114 7730",
    notes: "Standby backup for milk cooling tanks during national grid load shedding.",
  },
  {
    id: "DEP-08",
    productId: "self-loading-mixer",
    plant: "Self-Loading Concrete Mixer (3.5m³)",
    category: "hire",
    image: "/images/concrete-mixer.jpg",
    sku: "OMNI-HIR-SLM35",
    client: "Mbare Urban Infrastructure Trust",
    site: "Mbare Drainage & Paving Project",
    province: "Harare",
    operator: "Wet Rate (With Certified Operator)",
    rate: "$380 / day",
    dailyRateUSD: 380,
    status: "Active on Site",
    startDate: "2026-09-18",
    scheduledReturn: "2026-10-08",
    contractRef: "CNT-2026-094",
    contactPerson: "T. Gumbo",
    contactPhone: "+263 77 882 1044",
    notes: "High-mobility 4WD mixer operating in dense urban streets without central batching plant.",
  },
  {
    id: "DEP-09",
    productId: "d6-bulldozer",
    plant: "CAT D6R Bulldozer (Semi-U Blade)",
    category: "hire",
    image: "/images/cat-excavator.jpg",
    sku: "OMNI-HIR-D6R",
    client: "Hwange Coal Roadways Ltd",
    site: "Hwange West Haul Road Strip",
    province: "Matabeleland North",
    operator: "Wet Rate (With Certified Operator)",
    rate: "$650 / day",
    dailyRateUSD: 650,
    status: "Active on Site",
    startDate: "2026-08-01",
    scheduledReturn: "2026-11-01",
    contractRef: "CNT-2026-052",
    contactPerson: "J. Ndlovu",
    contactPhone: "+263 77 620 3388",
    notes: "Haul road pioneering and spoil dump shaping. Rippers serviced before handover.",
  },
  {
    id: "DEP-10",
    productId: "roller-10t",
    plant: "10-Tonne Single Drum Vibratory Roller",
    category: "hire",
    image: "/images/roller.jpg",
    sku: "OMNI-HIR-ROL10",
    client: "Kwekwe Civil Contractors",
    site: "Kwekwe CBD Industrial Bypass",
    province: "Midlands",
    operator: "Dry Rate (Machine Only)",
    rate: "$280 / day",
    dailyRateUSD: 280,
    status: "Demobilizing / In Transit",
    startDate: "2026-09-01",
    scheduledReturn: "2026-09-26",
    contractRef: "CNT-2026-081",
    contactPerson: "Maxwell Chuma",
    contactPhone: "+263 77 901 2244",
    notes: "Contract completed. Cranborne lowbed truck en route for pickup back to Harare.",
  },
  {
    id: "DEP-11",
    productId: "farm-tractor-90hp",
    plant: "90HP 4WD Agricultural Tractor",
    category: "farming",
    image: "/images/tractor.jpg",
    sku: "OMNI-FRM-TRC90",
    client: "Mazowe Citrus & Soya Estate",
    site: "Mazowe Valley Sector C",
    province: "Mashonaland Central",
    operator: "Dry Rate (Machine Only)",
    rate: "$190 / day",
    dailyRateUSD: 190,
    status: "Routine Service / Standby",
    startDate: "2026-09-14",
    scheduledReturn: "2026-10-14",
    contractRef: "CNT-2026-091",
    contactPerson: "P. Ruzive",
    contactPhone: "+263 77 319 8840",
    notes: "Scheduled 500-hour hydraulic filter and transmission oil service being conducted by mobile field technician.",
  },
  {
    id: "DEP-12",
    productId: "wheel-loader-5t",
    plant: "XCMG 5-Tonne Front Wheel Loader",
    category: "hire",
    image: "/images/wheel-loader.jpg",
    sku: "OMNI-HIR-WL50",
    client: "Border Timbers Mutare",
    site: "Nyakamete Industrial Area, Mutare",
    province: "Manicaland",
    operator: "Wet Rate (With Certified Operator)",
    rate: "$420 / day",
    dailyRateUSD: 420,
    status: "Returned to Cranborne Yard",
    startDate: "2026-08-10",
    scheduledReturn: "2026-09-22",
    contractRef: "CNT-2026-068",
    contactPerson: "Simba Mutasa",
    contactPhone: "+263 71 229 0041",
    notes: "Contract successfully completed. Full post-hire inspection passed at Cranborne yard. Ready for re-hire.",
  },
];

export function getStoredDeployments(): DeploymentRecord[] {
  if (typeof window === "undefined") return DEFAULT_DEPLOYMENTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DEPLOYMENTS);
    if (!raw) return DEFAULT_DEPLOYMENTS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_DEPLOYMENTS;
  } catch {
    return DEFAULT_DEPLOYMENTS;
  }
}

export function saveStoredDeployments(deployments: DeploymentRecord[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_DEPLOYMENTS, JSON.stringify(deployments));
    window.dispatchEvent(new CustomEvent("omnicore-deployments-updated"));
  } catch {
    // ignore
  }
}




