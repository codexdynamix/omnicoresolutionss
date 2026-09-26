import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-NmzgmCl5.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var site = {
	name: "Omnicore Solutions",
	shortName: "Omnicore",
	tagline: "Machinery for Zimbabwe's farms, mines and sites.",
	description: "Harare-based supplier of mining equipment, construction machinery hire, hardware, farming plant and industrial machines. Sale, hire and commissioning — nationwide.",
	founded: 2024,
	address: {
		line1: "115 Chiremba Road",
		line2: "Cranborne, Harare",
		country: "Zimbabwe",
		maps: "https://www.google.com/maps/search/?api=1&query=115+Chiremba+Road+Cranborne+Harare+Zimbabwe"
	},
	hours: [
		{
			day: "Monday – Friday",
			time: "08:00 – 17:00"
		},
		{
			day: "Saturday",
			time: "08:00 – 13:00"
		},
		{
			day: "Sunday",
			time: "Closed · WhatsApp monitored"
		}
	],
	phoneDisplay: "+263 77 733 4569",
	phoneTel: "+263777334569",
	phoneAltDisplay: "+263 78 871 6082",
	phoneAltTel: "+263788716082",
	whatsappNumber: "263777334569",
	email: "omnicore-solutions@outlook.com",
	facebook: "https://www.facebook.com/61564314670198",
	linkedin: "https://www.linkedin.com/company/omnicore-solutions-zw/"
};
function whatsappUrl(message) {
	const base = `https://wa.me/${site.whatsappNumber}`;
	if (!message) return base;
	return `${base}?text=${encodeURIComponent(message)}`;
}
var nav = [
	{
		label: "Services",
		href: "/services"
	},
	{
		label: "Catalogue",
		href: "/catalogue"
	},
	{
		label: "Hire",
		href: "/services/hire"
	},
	{
		label: "Projects",
		href: "/projects"
	},
	{
		label: "Insights",
		href: "/insights"
	},
	{
		label: "Contact",
		href: "/contact"
	}
];
var services = [
	{
		slug: "mining",
		title: "Mining Equipment",
		navLabel: "Mining",
		eyebrow: "Gold · Chrome · Lithium",
		headline: "Plant that turns ore into cashflow.",
		summary: "Jaw crushers, hammer mills, ball mills, gold separators, trommels and wash plants — specified for Zimbabwe’s small and mid-scale mines, then delivered and commissioned.",
		seoTitle: "Gold Mining Equipment Zimbabwe | Crushers, Mills & Plants | Omnicore",
		seoDescription: "Buy gold and chrome processing equipment in Zimbabwe. Jaw crushers, ball mills, hammer mills, trommels and wash plants. Harare supply, nationwide delivery.",
		image: "/images/mining.jpg",
		imageAlt: "Gold processing plant with crushers and mills on a Zimbabwe mine site",
		bullets: [
			"Complete 1–20 TPH gold circuits, not just a machine on a pallet",
			"Geological introductions and licensed claim / JV sourcing",
			"Spare parts, motors, slurry pumps and generators as a kit",
			"Commissioning support so the first tonne actually ships"
		],
		keywords: [
			"gold mining equipment Zimbabwe",
			"jaw crusher Harare",
			"ball mill Zimbabwe"
		],
		equipment: [
			"Jaw crushers",
			"Hammer mills",
			"Ball mills",
			"Gold separators",
			"Trommels",
			"Shaking tables",
			"Spiral classifiers",
			"Slurry pumps",
			"Jack hammers",
			"Compressors",
			"Winches",
			"Generators"
		],
		faqs: [
			{
				q: "Can you supply a complete gold processing plant?",
				a: "Yes. We spec crushing, milling, classification and recovery as one circuit — typically 1 to 20 tonnes per hour — then source, deliver and help commission. Send ore type, target TPH and power availability on WhatsApp."
			},
			{
				q: "Do you help with mines for sale or joint ventures?",
				a: "We introduce licensed gold, chrome, lithium, copper and related claims across Zimbabwe for outright sale or JV. Listings move quickly, so current opportunities are quoted directly."
			},
			{
				q: "Is the equipment new or used?",
				a: "Both, depending on payback. We will say which, with condition notes, before you send a deposit. No mystery containers."
			}
		]
	},
	{
		slug: "hardware",
		title: "Hardware & Construction",
		navLabel: "Hardware",
		eyebrow: "Build · Fence · Supply",
		headline: "The hardware that keeps a site moving.",
		summary: "Fence-making machines, block plant, site hardware and construction consumables — priced for Zimbabwe yards that need to produce, not wait on imports.",
		seoTitle: "Fence Making Machines & Construction Hardware Zimbabwe | Omnicore",
		seoDescription: "Fence making machines, barbed wire plant and construction hardware in Harare. Manual, electric and diesel machines with nationwide delivery.",
		image: "/images/hardware.jpg",
		imageAlt: "Diamond mesh fence making machine producing wire rolls in a warehouse",
		bullets: [
			"Manual, electric and diesel fence machines in stock or inbound",
			"Barbed-wire plant for yards that want a second income line",
			"Construction hardware kitted with the machines they serve",
			"Clear USD indicative prices, confirmed on WhatsApp before you pay"
		],
		keywords: ["fence making machine Zimbabwe", "barbed wire machine Harare"],
		equipment: [
			"Manual fence machines",
			"Electric diamond-mesh machines",
			"Diesel fence machines",
			"Barbed wire machines",
			"Block-making plant",
			"Site hardware"
		],
		faqs: [{
			q: "How many rolls can a fence machine produce per day?",
			a: "Manual single-mould machines typically do about two rolls a day. Double-mould units about three. Electric and diesel diamond-mesh machines around nine rolls a day on three-phase power."
		}, {
			q: "Do you deliver outside Harare?",
			a: "Yes. Nationwide delivery is available. Freight is quoted with the machine so you see landed cost, not yard cost."
		}]
	},
	{
		slug: "hire",
		title: "Construction Machinery Hire",
		navLabel: "Hire",
		eyebrow: "Wet & dry hire",
		headline: "The pump is on site. The pour doesn’t wait.",
		summary: "Self-loading mixers, concrete pumps, excavators, TLBs and graders — wet or dry hire for Harare builds, dams, roads and mine civils. Rates on request, plant that shows up.",
		seoTitle: "Concrete Pump Hire Zimbabwe | Mixer & Excavator Hire Harare | Omnicore",
		seoDescription: "Wet and dry hire for concrete pumps, self-loading mixers, excavators and graders in Zimbabwe. Harare desk, nationwide deployment.",
		image: "/images/hire.jpg",
		imageAlt: "Self-loading concrete mixer and pump on a Harare building site",
		bullets: [
			"Self-loading mixers at 10 m³/h and concrete pumps at 50 m³/h",
			"Wet hire with operator, or dry hire for crews that already run plant",
			"Earthmoving: excavators, TLBs, graders, tippers, rollers, bowsers",
			"Quoted for the pour or the week — not a vague ‘call for prices’ loop"
		],
		keywords: [
			"concrete pump hire Zimbabwe",
			"excavator hire Harare",
			"self loading mixer hire"
		],
		equipment: [
			"Self-loading concrete mixers",
			"Concrete pumps",
			"Excavators",
			"TLBs / backhoes",
			"Graders",
			"Tipper trucks",
			"Rollers",
			"Water bowsers"
		],
		faqs: [
			{
				q: "What is wet hire versus dry hire?",
				a: "Dry hire is the machine only — your operator, your fuel, your liability window. Wet hire includes a qualified operator and is the faster way to get a pump or mixer producing on a short pour. We quote both."
			},
			{
				q: "How far do you deploy from Harare?",
				a: "Harare is the desk. Plant deploys nationwide when the job justifies mobilisation. Tell us the site, the dates and the pour volume."
			},
			{
				q: "Can I hire for a single day?",
				a: "Yes for pumps and mixers around a pour. Earthmoving is usually a minimum of a few days once mobilisation is in. We will be direct about what makes commercial sense."
			}
		]
	},
	{
		slug: "farming",
		title: "Farming Machinery",
		navLabel: "Farming",
		eyebrow: "Feed · Grain · Ice",
		headline: "Stop buying expensive feed. Start milling it.",
		summary: "Hammer mills, feed mixers and pellet lines that cut feed costs by up to 40%, plus ice-block machines for farm and trading yards. Built for Zimbabwe seasons, not brochure climates.",
		seoTitle: "Hammer Mill & Feed Mixer Zimbabwe | Farm Machinery | Omnicore",
		seoDescription: "Hammer mills, feed mixers and ice block machines for Zimbabwe farms. Cut feed costs, mill on site, nationwide delivery from Harare.",
		image: "/images/farming.jpg",
		imageAlt: "Hammer mill and feed mixer beside a Zimbabwe farm shed",
		bullets: [
			"Feed mixers from 500 kg to 3 tonnes, with indicative USD prices",
			"Hammer mills sized to the herd or the milling business you want",
			"Ice-block machines from 80 kg to 300 kg daily capacity",
			"A second income stream: mill for neighbours when your own ration is done"
		],
		keywords: [
			"hammer mill Zimbabwe",
			"feed mixer Harare",
			"ice block machine Zimbabwe"
		],
		equipment: [
			"Hammer mills",
			"Feed mixers",
			"Pellet mills",
			"Ice block machines",
			"Grain handling"
		],
		faqs: [{
			q: "Will a mixer actually cut my feed bill?",
			a: "Farms that mix their own ration typically report around 40% lower feed cost versus bagged complete feed, because you buy ingredients and control the formula. Payback depends on herd size — send numbers and we will be honest."
		}, {
			q: "Do you have prices on the site?",
			a: "Indicative USD prices for mixers and ice machines are listed in the catalogue. Confirm on WhatsApp before paying — freight, power spec and stock move the number."
		}]
	},
	{
		slug: "industry",
		title: "Industry & Manufacturing",
		navLabel: "Industry",
		eyebrow: "Power · Motors · Plant",
		headline: "The machines behind the machines.",
		summary: "Generators, electric motors, compressors, transformers and manufacturing plant for workshops, factories and mine support yards that cannot sit idle on a breakdown.",
		seoTitle: "Industrial Machinery Zimbabwe | Generators, Motors, Compressors | Omnicore",
		seoDescription: "Generators, electric motors, piston compressors and manufacturing machinery supplied from Harare. Industrial plant for Zimbabwe workshops and mines.",
		image: "/images/industry.jpg",
		imageAlt: "Industrial workshop with generators, motors and compressors on pallets",
		bullets: [
			"Generators sized to the plant they must keep alive",
			"Electric motors, transformers and piston compressors as a set",
			"Import and local supply — we say which, with lead times",
			"Workshop and light-manufacturing lines, not only heavy yellow plant"
		],
		keywords: [
			"generator Zimbabwe",
			"industrial machinery Harare",
			"compressor sale Zimbabwe"
		],
		equipment: [
			"Generators",
			"Electric motors",
			"Piston compressors",
			"Transformers",
			"Workshop plant"
		],
		faqs: [{
			q: "Can you match a motor or generator to an existing mill?",
			a: "Yes. Send the nameplate data — kW, voltage, phase, RPM — plus photos. Guessing horsepower from a WhatsApp voice note is how workshops buy the wrong frame."
		}, {
			q: "Do you import on order?",
			a: "We hold fast-moving items and import the rest. Lead times are quoted in writing with the machine, not after the deposit."
		}]
	}
];
function getService(slug) {
	return services.find((s) => s.slug === slug);
}
var equipment = [
	{
		id: "jaw-crusher",
		name: "Jaw Crusher",
		category: "mining",
		intent: "sale",
		blurb: "Primary crushing for gold and chrome circuits. Sized to the TPH you actually run, not a catalogue fantasy.",
		image: "/images/jaw-crusher.jpg",
		imageAlt: "Heavy duty jaw crusher for rock and ore crushing",
		spec: "Primary crush · gold & chrome",
		badge: "Processing"
	},
	{
		id: "ball-mill",
		name: "Ball Mill",
		category: "mining",
		intent: "sale",
		blurb: "Fine grind before recovery. Specced with the classifier and motor so the circuit balances.",
		image: "/images/ball-mill.jpg",
		imageAlt: "Industrial rotating drum ball mill for gold ore pulverizing",
		spec: "Fine grind · gold circuits",
		badge: "Processing"
	},
	{
		id: "hammer-mill-mining",
		name: "Mining Hammer Mill",
		category: "mining",
		intent: "sale",
		blurb: "The workhorse of small gold plants. Fast to run, honest about liners and power.",
		image: "/images/hammer-mill.jpg",
		imageAlt: "Mining hammer mill in an active gold processing circuit",
		spec: "1–10 TPH class",
		badge: "Processing"
	},
	{
		id: "gold-separator",
		name: "Gold Separator",
		category: "mining",
		intent: "sale",
		blurb: "Concentrators and catching mats that sit at the end of the circuit — where the payback is.",
		image: "/images/gold-separator.jpg",
		imageAlt: "Centrifugal gold separator and mineral concentrator",
		spec: "Recovery · concentrators"
	},
	{
		id: "trommel",
		name: "Trommel Screen",
		category: "mining",
		intent: "sale",
		blurb: "Wash and classify alluvium before it hits the table. Built for dirty water and long days.",
		image: "/images/trommel.jpg",
		imageAlt: "Trommel rotary screen and wash plant on a mine site",
		spec: "Wash · classify"
	},
	{
		id: "shaking-table",
		name: "Shaking Table",
		category: "mining",
		intent: "sale",
		blurb: "Fine gold recovery after milling. A table that is levelled properly earns its keep.",
		image: "/images/shaking-table.jpg",
		imageAlt: "Fine mineral processing shaking table",
		spec: "Fine gold recovery"
	},
	{
		id: "slurry-pump",
		name: "Slurry Pump",
		category: "mining",
		intent: "sale",
		blurb: "Move pulp without eating the impeller in a week. Matched to head and solids.",
		image: "/images/slurry-pump.jpg",
		imageAlt: "Heavy horizontal centrifugal slurry pump for mineral pulp",
		spec: "Pulp transfer"
	},
	{
		id: "jack-hammer",
		name: "Jack Hammer",
		category: "mining",
		intent: "sale",
		blurb: "Development and breaking tools for small underground and quarry work.",
		image: "/images/jack-hammer.jpg",
		imageAlt: "Pneumatic rock drill and breaking tools",
		spec: "Breaking · development"
	},
	{
		id: "self-loading-mixer",
		name: "Self-Loading Concrete Mixer",
		category: "hire",
		intent: "hire",
		blurb: "10 cubic metres an hour, on your pour. Wet or dry hire, operator optional.",
		image: "/images/self-loading-mixer.jpg",
		imageAlt: "Rough terrain 4x4 self-loading mobile concrete mixer truck",
		spec: "10 m³/h · wet & dry",
		badge: "Hire",
		priceNote: "Rates on request"
	},
	{
		id: "concrete-pump",
		name: "Concrete Pump",
		category: "hire",
		intent: "hire",
		blurb: "50 cubic metres an hour to the deck, the dam, or the distant pour. The machine the programme actually depends on.",
		image: "/images/concrete-pump.jpg",
		imageAlt: "Truck-mounted boom concrete placing pump",
		spec: "50 m³/h · wet & dry",
		badge: "Hire",
		priceNote: "Rates on request"
	},
	{
		id: "excavator-hire",
		name: "Excavator",
		category: "hire",
		intent: "hire",
		blurb: "Foundations, trenches, pits and stockpiles. Wet hire with operator or dry for your own crew.",
		image: "/images/excavator.jpg",
		imageAlt: "20-tonne hydraulic crawler excavator",
		spec: "Earthmoving · wet & dry",
		badge: "Hire",
		priceNote: "Rates on request"
	},
	{
		id: "tlb-hire",
		name: "TLB / Backhoe",
		category: "hire",
		intent: "hire",
		blurb: "The utility machine of Zimbabwe sites — load, trench, backfill, move on.",
		image: "/images/tlb.jpg",
		imageAlt: "Yellow tractor loader backhoe TLB working on site",
		spec: "Utility earthmoving",
		priceNote: "Rates on request"
	},
	{
		id: "grader-hire",
		name: "Grader",
		category: "hire",
		intent: "hire",
		blurb: "Haul roads, farm roads and site platforms. A grader that is there for the rain window.",
		image: "/images/grader.jpg",
		imageAlt: "Heavy duty motor grader blading gravel haul road",
		spec: "Roads · platforms",
		priceNote: "Rates on request"
	},
	{
		id: "manual-fence",
		name: "Manual Fence Machine",
		category: "hardware",
		intent: "sale",
		blurb: "Single-mould starter plant. About two rolls a day — a real business from a small yard.",
		image: "/images/manual-fence.jpg",
		imageAlt: "Manual diamond mesh fence making machine",
		spec: "~2 rolls/day",
		price: "From USD 130",
		badge: "In demand"
	},
	{
		id: "double-fence",
		name: "Double-Mould Fence Machine",
		category: "hardware",
		intent: "sale",
		blurb: "Chicken mesh and standard fence on one frame. About three rolls a day.",
		image: "/images/double-fence.jpg",
		imageAlt: "Dual-mould chain link fence machine",
		spec: "~3 rolls/day · dual mould",
		price: "From USD 180"
	},
	{
		id: "electric-fence",
		name: "Electric Diamond Fence Machine",
		category: "hardware",
		intent: "sale",
		blurb: "Nine rolls a day on electric power. The step from a side hustle to a yard.",
		image: "/images/electric-fence.jpg",
		imageAlt: "Electric automated diamond mesh fence machine",
		spec: "~9 rolls/day · electric",
		price: "From USD 550"
	},
	{
		id: "diesel-fence",
		name: "Diesel Fence Machine",
		category: "hardware",
		intent: "sale",
		blurb: "Same output as electric, off a diesel engine — for sites without stable three-phase.",
		image: "/images/diesel-fence.jpg",
		imageAlt: "Diesel driven diamond wire mesh weaving machine",
		spec: "~9 rolls/day · diesel",
		price: "From USD 750"
	},
	{
		id: "barbed-wire",
		name: "Barbed Wire Machine",
		category: "hardware",
		intent: "sale",
		blurb: "Three-phase plant, about ten rolls a day. A serious wire business, not a hobby.",
		image: "/images/barbed-wire.jpg",
		imageAlt: "Automated barbed wire twisting and spooling machine",
		spec: "~10 rolls/day · 3-phase",
		price: "USD 6,200",
		priceNote: "Ex-Harare, late-stock unit as advertised"
	},
	{
		id: "farm-hammer-mill",
		name: "Farm Hammer Mill",
		category: "farming",
		intent: "sale",
		blurb: "Mill maize, hay and mix ingredients on the farm. The first machine in a cheaper ration.",
		image: "/images/farm-hammer-mill.jpg",
		imageAlt: "Agricultural hammer mill for maize and grain grinding",
		spec: "Grain & forage milling",
		badge: "Seasonal"
	},
	{
		id: "feed-mixer-500",
		name: "Feed Mixer · 500 kg",
		category: "farming",
		intent: "sale",
		blurb: "Entry mixer for small herds and start-up milling businesses.",
		image: "/images/feed-mixer.jpg",
		imageAlt: "500kg vertical feed mixer machine with auger",
		spec: "500 kg batch",
		price: "USD 1,850"
	},
	{
		id: "feed-mixer-1t",
		name: "Feed Mixer · 1 tonne",
		category: "farming",
		intent: "sale",
		blurb: "The size most mixed-ration farms actually live on.",
		image: "/images/feed-mixer-1t.jpg",
		imageAlt: "1-tonne commercial livestock feed mixer",
		spec: "1,000 kg batch",
		price: "USD 2,400"
	},
	{
		id: "feed-mixer-3t",
		name: "Feed Mixer · 3 tonne",
		category: "farming",
		intent: "sale",
		blurb: "Production mixer — mill for the farm and sell surplus pellets.",
		image: "/images/feed-mixer-3t.jpg",
		imageAlt: "3-tonne heavy farm feed mixing and blending plant",
		spec: "3,000 kg batch",
		price: "USD 3,450",
		badge: "Production"
	},
	{
		id: "ice-block",
		name: "Ice Block Machine",
		category: "farming",
		intent: "sale",
		blurb: "80 kg to 300 kg class machines for farms, butcheries and trading yards.",
		image: "/images/ice-block.jpg",
		imageAlt: "Commercial brine tank ice block maker plant",
		spec: "80–300 kg class",
		price: "From USD 900"
	},
	{
		id: "generator",
		name: "Generator Sets",
		category: "industry",
		intent: "sale",
		blurb: "Keep the mill, the pump and the welder alive when ZESA is not. Sized to the load.",
		image: "/images/generator.jpg",
		imageAlt: "Heavy soundproof canopy industrial diesel generator",
		spec: "Standby & prime"
	},
	{
		id: "electric-motors",
		name: "Electric Motors",
		category: "industry",
		intent: "sale",
		blurb: "Replacement and spec-in motors for mills, crushers and workshop plant.",
		image: "/images/electric-motor.jpg",
		imageAlt: "Industrial three-phase electric motors with cast cooling fins",
		spec: "Matched to plant"
	},
	{
		id: "compressor",
		name: "Piston Compressor",
		category: "industry",
		intent: "sale",
		blurb: "Workshop and mine-support air. Honest about duty cycle.",
		image: "/images/compressor.jpg",
		imageAlt: "Industrial high pressure piston air compressor",
		spec: "Workshop & mine air"
	}
];
var projects = [
	{
		id: "gold-circuit",
		title: "Gold circuit, ready to mill",
		location: "Mashonaland",
		sector: "Mining",
		image: "/images/project-gold.jpg",
		imageAlt: "Commissioned gold processing plant in Zimbabwe",
		body: "Crushing, milling and recovery specified as one plant — not three separate WhatsApp deals. The test is the first concentrate, not the unboxing photo."
	},
	{
		id: "harare-pour",
		title: "Pour on a Harare frame",
		location: "Harare",
		sector: "Hire",
		image: "/images/project-pour.jpg",
		imageAlt: "Truck-mounted concrete pump on a Harare construction site",
		body: "Self-loading mixer and pump on a mid-rise pour. Wet hire, operator on the pump, programme held."
	},
	{
		id: "farm-feed",
		title: "On-farm feed line",
		location: "Highveld",
		sector: "Farming",
		image: "/images/project-farm.jpg",
		imageAlt: "Hammer mill and vertical feed mixer installed on a Zimbabwe farm",
		body: "Hammer mill and mixer installed beside the shed so the ration is mixed where the herd is — not bought by the bag in town."
	},
	{
		id: "fence-yard",
		title: "Fence production yard",
		location: "Harare",
		sector: "Hardware",
		image: "/images/project-fence.jpg",
		imageAlt: "Automated barbed wire and fence making machinery producing coils",
		body: "Electric diamond-mesh plant turning coils into rolls. A hardware business with a daily output you can count."
	},
	{
		id: "highveld-cut",
		title: "Cut and fill on the highveld",
		location: "Harare hinterland",
		sector: "Hire",
		image: "/images/project-cut.jpg",
		imageAlt: "Excavator working red earth on the Zimbabwe highveld",
		body: "Excavator on red earth, granite kopjes behind. Platform work before the rains — the window that makes or breaks a site."
	},
	{
		id: "workshop-kit",
		title: "Workshop power and air",
		location: "Harare",
		sector: "Industry",
		image: "/images/project-workshop.jpg",
		imageAlt: "Generators, motors and compressors supplied to a workshop",
		body: "Motors, a compressor and standby generation kitted for a fabrication shop that cannot wait on a burnt stator."
	}
];
var insights = [
	{
		slug: "wet-vs-dry-concrete-pump-hire",
		title: "Wet vs dry hire for a concrete pump in Zimbabwe",
		seoTitle: "Wet vs Dry Concrete Pump Hire Zimbabwe | Omnicore",
		description: "When to take a pump with an operator and when to run it yourself. A practical split for Harare pours, dams and mine civils.",
		date: "2026-08-12",
		read: "6 min",
		category: "Hire",
		image: "/images/insight-pour.jpg",
		imageAlt: "Self-loading concrete mixer and pump setup",
		kicker: "The pour does not care about your org chart.",
		body: [
			{ paragraphs: ["A concrete pump is not a bakkie. If it stops mid-pour you are not ‘a bit delayed’ — you have a cold joint, a wasted mixer queue, and a foreman who will not forget you. That is why the wet versus dry decision should be made on risk, not on the daily rate alone.", "Dry hire is the machine. You provide the operator, the fuel, the grease, and the liability for what happens when someone folds the boom into a slab edge. It is the right call when you already have a pump operator on the books and the pour is a known recipe."] },
			{
				heading: "When wet hire is cheaper, even when it looks dearer",
				paragraphs: ["Wet hire includes a person who has run that pump. On a one or two-day pour in Harare — a deck, a house raft, a small dam outlet — mobilisation plus an operator is usually less expensive than the delay of a crew learning the machine on your concrete.", "Ask for both numbers. A serious hire desk will quote wet and dry on the same WhatsApp thread, with mobilisation called out, not buried. If they will not, they are not pricing the job. They are pricing hope."]
			},
			{
				heading: "What to send us",
				paragraphs: ["Site (suburb or kilometre peg), pour volume in cubic metres, boom reach or horizontal run, dates, and whether you have a competent operator. We run 50 m³/h pumps and 10 m³/h self-loading mixers. That is enough information to give you a rate you can put in a tender."]
			}
		]
	},
	{
		slug: "farm-hammer-mill-this-season",
		title: "Signs your farm needs a hammer mill this season",
		seoTitle: "When to Buy a Hammer Mill in Zimbabwe | Omnicore",
		description: "Feed prices, herd size and the August–December milling window — a straight test for whether a hammer mill pays this season.",
		date: "2026-08-28",
		read: "5 min",
		category: "Farming",
		image: "/images/insight-mill.jpg",
		imageAlt: "Hammer mill and feed mixer on a Zimbabwe farm",
		kicker: "Bagged feed is a subscription. A mill is an asset.",
		body: [
			{ paragraphs: ["If you are still buying complete feed by the bag in September, you are paying someone else to mill grain you could have stored. Zimbabwe’s feed-price spike is not a mystery — it is logistics, forex and someone else’s margin stacked on maize.", "A hammer mill starts to make sense when you have grain (or can buy it in season), a herd or flock that eats every day, and a shed with power or a generator already earning its keep."] },
			{
				heading: "The 40 percent test",
				paragraphs: ["Farms that mix their own ration typically see feed costs drop by around 40 percent versus bagged complete feed. That is not a slogan from a brochure. It is the gap between buying ingredients and buying a finished product in town.", "Run the numbers on 90 days of feed. If the mill and a 500 kg or 1 tonne mixer cost less than the margin you are handing to the feed company over a season, buy the plant. If the herd is too small, wait — or mill for neighbours and sell the surplus."]
			},
			{
				heading: "This window, not ‘someday’",
				paragraphs: ["August to December is when grain is on the farm, cattle are being finished, and layers are in full lay. A mill that arrives in January has missed the season you already paid for. WhatsApp the herd size and the power you have. We will tell you 500 kg, 1 tonne, or not yet."]
			}
		]
	},
	{
		slug: "gold-processing-payback",
		title: "Gold processing gear: a payback you can defend",
		seoTitle: "Gold Processing Plant Payback Zimbabwe | Omnicore",
		description: "How to think about jaw crushers, hammer mills and recovery tables as a circuit with a payback period — not a shopping list.",
		date: "2026-09-04",
		read: "7 min",
		category: "Mining",
		image: "/images/insight-gold.jpg",
		imageAlt: "Ball mill and gold processing plant in Zimbabwe",
		kicker: "A crusher without recovery is a very expensive gravel maker.",
		body: [{ paragraphs: ["Zimbabwe’s small gold sector is full of men who own a crusher and wonder where the gold went. Payback does not live in the jaw. It lives in the circuit: crush, mill, classify, recover — balanced to the ore, the water and the power you actually have.", "Start from tonnes per hour you can feed by hand or by loader, not from a brochure TPH. Then work backwards: mill that can take that crush, table or concentrator that can take that pulp, motor and generator that can run it at 2 a.m. when ZESA is a rumour."] }, {
			heading: "What ‘complete plant’ should mean",
			paragraphs: ["It should mean the machines are specified together. A 1–5 TPH gold circuit for a small claim is a different animal from a 15–20 TPH chrome wash. If a supplier quotes a jaw crusher in isolation, you are being sold a part.", "We would rather lose a sale than commission a plant that cannot make concentrate. Send ore type, expected grade band, water source, and whether you have three-phase. The quote you get back will name the circuit, not just the steel."]
		}]
	},
	{
		slug: "rainy-season-construction-hire",
		title: "What to hire before the rains, not during them",
		seoTitle: "Rainy Season Construction Machinery Hire Zimbabwe | Omnicore",
		description: "Graders, pumps, bowsers and mixers — the plant that has to be on site before November, not when the first storm hits Harare.",
		date: "2026-09-18",
		read: "5 min",
		category: "Hire",
		image: "/images/insight-rains.jpg",
		imageAlt: "Motor grader earthmoving machinery on the Zimbabwe highveld",
		kicker: "The rain window is a calendar, not a surprise.",
		body: [{ paragraphs: ["Every September in Harare someone swears they will ‘sort the grader next week’. Then October is a dust bowl, November is a bog, and the haul road that should have been shaped is a drainage problem with a purchase order attached.", "Hire the grader and the bowser while the ground still grades. Hire the pump for the pours you must get in before the storms. Earthmoving after the first heavy rain is possible — it is just slower, dearer, and harder on the undercarriage you are paying for."] }, {
			heading: "A short list that actually moves dirt",
			paragraphs: ["For civils and mine roads: grader, excavator, tipper, water bowser. For structures: self-loading mixer and concrete pump, quoted wet if you do not have an operator. Tell us the site and the week you need them. Peak season is August through December. That is not a marketing calendar. That is when Zimbabwe builds."]
		}]
	},
	{
		slug: "feed-pellets-second-income",
		title: "Cut feed costs — then sell pellets to the next farm",
		seoTitle: "Feed Mixer and Pellet Mill Zimbabwe | Omnicore",
		description: "How a 1-tonne or 3-tonne mixer becomes both a cost cut and a second income line in Zimbabwe’s grain belt.",
		date: "2026-07-22",
		read: "5 min",
		category: "Farming",
		image: "/images/insight-pellets.jpg",
		imageAlt: "Feed mixer on a Zimbabwe farm",
		kicker: "The mixer should work after your own ration is in the trough.",
		body: [{ paragraphs: ["The quiet business on a well-run farm is not another crop. It is milling. Once a 1-tonne or 3-tonne mixer is paid for by your own herd, every extra batch is cash from neighbours who are still buying bags.", "Indicative prices: 500 kg mixer around USD 1,850, 1 tonne around USD 2,400, 3 tonne around USD 3,450. Those are yard numbers — confirm freight and stock on WhatsApp. The 3-tonne machine is the one that turns a farm workshop into a small feed business."] }, {
			heading: "Do not skip the mill",
			paragraphs: ["A mixer without a hammer mill is a very neat way of blending whole grain. Start with mill plus mixer. Add a pellet mill when you have a buyer who will pay for the convenience of a pellet. We will not up-sell you a pellet line because it photographs well."]
		}]
	},
	{
		slug: "fence-making-business-zimbabwe",
		title: "A fence-making business that fits in a Harare yard",
		seoTitle: "Fence Making Machine Business Zimbabwe 2026 | Omnicore",
		description: "Manual to diesel diamond-mesh machines, real daily output, and the USD prices we actually quote — a 2026 starter business that is not a course.",
		date: "2026-01-14",
		read: "6 min",
		category: "Hardware",
		image: "/images/insight-fence.jpg",
		imageAlt: "Diamond mesh fence making machine in a warehouse",
		kicker: "Two rolls a day is a business. Nine rolls a day is a yard.",
		body: [{ paragraphs: ["Fence is one of the few manufacturing businesses in Zimbabwe that still fits in a residential yard, runs on a known recipe, and sells to a market that never stops building. The machine is not the hard part. Showing up with rolls when the hardware shop is ‘waiting on the container’ is the hard part.", "We quote four rungs. Manual single-mould from USD 130 — about two rolls a day. Double-mould around USD 180 — about three, chicken and standard. Electric diamond-mesh around USD 550 — about nine rolls. Diesel around USD 750 for the same output off-grid. Barbed-wire plant is a different class: three-phase, about ten rolls, around USD 6,200 as last advertised in Harare."] }, {
			heading: "What you actually need besides the machine",
			paragraphs: ["Wire coil, a level slab, and a way to sell — hardware shops, farmers, site agents. Power spec matters: do not buy electric if the yard is on a shaky single-phase. We would rather sell you the diesel frame. Confirm current stock and freight on WhatsApp before you transfer. Prices move. The demand does not."]
		}]
	}
];
function getInsight(slug) {
	return insights.find((post) => post.slug === slug);
}
var hireRates = [
	{
		machine: "Self-loading concrete mixer",
		output: "10 m³/hour",
		wet: "Operator included",
		dry: "Machine only"
	},
	{
		machine: "Concrete pump",
		output: "50 m³/hour",
		wet: "Operator included",
		dry: "Machine only"
	},
	{
		machine: "Excavator",
		output: "By class",
		wet: "Operator included",
		dry: "Machine only"
	},
	{
		machine: "TLB / backhoe",
		output: "Utility",
		wet: "Operator included",
		dry: "Machine only"
	},
	{
		machine: "Grader",
		output: "Roads & platforms",
		wet: "Operator included",
		dry: "Machine only"
	}
];
//#endregion
export { hireRates as a, projects as c, whatsappUrl as d, getService as i, services as l, equipment as n, insights as o, getInsight as r, nav as s, cn as t, site as u };
