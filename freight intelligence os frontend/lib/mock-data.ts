// Centralized mock data for the Rutari Freight Intelligence OS prototype.
// All values are illustrative sample data for a frontend prototype.

export function inr(n: number): string {
  return "₹" + n.toLocaleString("en-IN")
}

export const company = {
  name: "Rutari",
  tagline: "Freight Intelligence OS",
  fleetName: "Sharma Roadlines Pvt. Ltd.",
}

export type TrendDirection = "up" | "down" | "flat"

export interface Kpi {
  id: string
  label: string
  value: string
  delta: string
  trend: TrendDirection
  positive: boolean
  hint: string
}

export const dashboardKpis: Kpi[] = [
  {
    id: "revenue",
    label: "Monthly Revenue",
    value: "₹1.84 Cr",
    delta: "+12.4%",
    trend: "up",
    positive: true,
    hint: "vs. last month",
  },
  {
    id: "profit",
    label: "Net Profit Margin",
    value: "23.6%",
    delta: "+3.1 pts",
    trend: "up",
    positive: true,
    hint: "AI-optimized routes",
  },
  {
    id: "utilization",
    label: "Fleet Utilization",
    value: "87%",
    delta: "+5.2%",
    trend: "up",
    positive: true,
    hint: "42 of 48 active",
  },
  {
    id: "cost-per-km",
    label: "Cost / Km",
    value: "₹38.20",
    delta: "-6.8%",
    trend: "down",
    positive: true,
    hint: "fuel + tolls + ops",
  },
  {
    id: "on-time",
    label: "On-Time Delivery",
    value: "94.2%",
    delta: "+1.7%",
    trend: "up",
    positive: true,
    hint: "last 30 days",
  },
  {
    id: "idle",
    label: "Idle Vehicles",
    value: "6",
    delta: "+2",
    trend: "up",
    positive: false,
    hint: "awaiting loads",
  },
]

export const revenueExpenseSeries = [
  { month: "Jan", revenue: 128, expense: 101, profit: 27 },
  { month: "Feb", revenue: 135, expense: 104, profit: 31 },
  { month: "Mar", revenue: 149, expense: 112, profit: 37 },
  { month: "Apr", revenue: 141, expense: 108, profit: 33 },
  { month: "May", revenue: 158, expense: 118, profit: 40 },
  { month: "Jun", revenue: 166, expense: 121, profit: 45 },
  { month: "Jul", revenue: 172, expense: 124, profit: 48 },
  { month: "Aug", revenue: 169, expense: 126, profit: 43 },
  { month: "Sep", revenue: 178, expense: 129, profit: 49 },
  { month: "Oct", revenue: 184, expense: 133, profit: 51 },
  { month: "Nov", revenue: 191, expense: 136, profit: 55 },
  { month: "Dec", revenue: 184, expense: 132, profit: 52 },
]

export const costBreakdown = [
  { category: "Fuel", value: 46, fill: "var(--color-fuel)" },
  { category: "Driver Pay", value: 21, fill: "var(--color-driver)" },
  { category: "Tolls", value: 14, fill: "var(--color-tolls)" },
  { category: "Maintenance", value: 11, fill: "var(--color-maintenance)" },
  { category: "Other", value: 8, fill: "var(--color-other)" },
]

export const utilizationSeries = [
  { week: "W1", utilization: 78, idle: 22 },
  { week: "W2", utilization: 82, idle: 18 },
  { week: "W3", utilization: 80, idle: 20 },
  { week: "W4", utilization: 85, idle: 15 },
  { week: "W5", utilization: 88, idle: 12 },
  { week: "W6", utilization: 87, idle: 13 },
]

export interface AiInsight {
  id: string
  severity: "critical" | "opportunity" | "info"
  title: string
  detail: string
  impact: string
}

export const aiInsights: AiInsight[] = [
  {
    id: "1",
    severity: "opportunity",
    title: "Reroute Mumbai–Delhi lane via NH48",
    detail:
      "AI predicts 8% fuel savings by shifting 6 weekly trips to NH48 during off-peak windows.",
    impact: "≈ ₹1.9L / month",
  },
  {
    id: "2",
    severity: "critical",
    title: "Possible fuel siphoning on MH-12-GK-4471",
    detail:
      "Fuel drop of 34L recorded while stationary near Nashik at 02:14 with no refuel logged.",
    impact: "≈ ₹3,000 loss",
  },
  {
    id: "3",
    severity: "opportunity",
    title: "3 return-load matches for Pune-bound empties",
    detail:
      "Backhaul loads available for TN-38-BK-9012 and 2 others returning empty from Chennai.",
    impact: "+ ₹86,000 revenue",
  },
  {
    id: "4",
    severity: "info",
    title: "Maintenance due for 4 vehicles this week",
    detail:
      "Predictive model flags brake-pad wear and tyre rotation across 4 trucks before failure risk.",
    impact: "Avoids ₹2.4L breakdown cost",
  },
]

export interface Vehicle {
  id: string
  regNo: string
  type: string
  model: string
  status: "on-trip" | "idle" | "maintenance" | "loading"
  driver: string
  location: string
  lat: number
  lng: number
  speed: number
  fuel: number
  odometer: number
  healthScore: number
  currentLoad: string | null
}

export const vehicles: Vehicle[] = [
  {
    id: "v1",
    regNo: "MH-12-GK-4471",
    type: "32ft Multi-Axle",
    model: "Tata Signa 3521",
    status: "on-trip",
    driver: "Ravi Kumar",
    location: "Nashik, MH",
    lat: 19.9975,
    lng: 73.7898,
    speed: 62,
    fuel: 48,
    odometer: 284120,
    healthScore: 82,
    currentLoad: "LD-20481",
  },
  {
    id: "v2",
    regNo: "TN-38-BK-9012",
    type: "20ft Container",
    model: "Ashok Leyland 1920",
    status: "idle",
    driver: "Suresh Nair",
    location: "Chennai Port, TN",
    lat: 13.0827,
    lng: 80.2707,
    speed: 0,
    fuel: 71,
    odometer: 198340,
    healthScore: 91,
    currentLoad: null,
  },
  {
    id: "v3",
    regNo: "DL-01-LR-2288",
    type: "40ft Trailer",
    model: "BharatBenz 4223",
    status: "on-trip",
    driver: "Amarjeet Singh",
    location: "Jaipur, RJ",
    lat: 26.9124,
    lng: 75.7873,
    speed: 74,
    fuel: 33,
    odometer: 341890,
    healthScore: 68,
    currentLoad: "LD-20479",
  },
  {
    id: "v4",
    regNo: "GJ-05-MN-7756",
    type: "22ft Open Body",
    model: "Eicher Pro 6028",
    status: "loading",
    driver: "Kiran Patel",
    location: "Surat Hub, GJ",
    lat: 21.1702,
    lng: 72.8311,
    speed: 0,
    fuel: 88,
    odometer: 122450,
    healthScore: 88,
    currentLoad: "LD-20483",
  },
  {
    id: "v5",
    regNo: "KA-51-AC-1123",
    type: "32ft Multi-Axle",
    model: "Tata Signa 4825",
    status: "on-trip",
    driver: "Manoj Reddy",
    location: "Hubballi, KA",
    lat: 15.3647,
    lng: 75.124,
    speed: 58,
    fuel: 55,
    odometer: 267300,
    healthScore: 79,
    currentLoad: "LD-20477",
  },
  {
    id: "v6",
    regNo: "UP-32-DT-6690",
    type: "20ft Container",
    model: "Ashok Leyland 1920",
    status: "maintenance",
    driver: "Unassigned",
    location: "Lucknow Depot, UP",
    lat: 26.8467,
    lng: 80.9462,
    speed: 0,
    fuel: 24,
    odometer: 312780,
    healthScore: 44,
    currentLoad: null,
  },
  {
    id: "v7",
    regNo: "MH-04-EQ-8834",
    type: "40ft Trailer",
    model: "Scania R500",
    status: "on-trip",
    driver: "Deepak Jadhav",
    location: "Vadodara, GJ",
    lat: 22.3072,
    lng: 73.1812,
    speed: 66,
    fuel: 61,
    odometer: 156020,
    healthScore: 93,
    currentLoad: "LD-20480",
  },
  {
    id: "v8",
    regNo: "RJ-14-FP-3345",
    type: "22ft Open Body",
    model: "Eicher Pro 6019",
    status: "idle",
    driver: "Vikram Rathore",
    location: "Jodhpur, RJ",
    lat: 26.2389,
    lng: 73.0243,
    speed: 0,
    fuel: 42,
    odometer: 201560,
    healthScore: 74,
    currentLoad: null,
  },
]

export interface Driver {
  id: string
  name: string
  phone: string
  license: string
  experience: number
  safetyScore: number
  onTimeRate: number
  status: "on-duty" | "resting" | "off-duty"
  assignedVehicle: string | null
  trips: number
  rating: number
}

export const drivers: Driver[] = [
  {
    id: "d1",
    name: "Ravi Kumar",
    phone: "+91 98220 11234",
    license: "MH1220190004471",
    experience: 12,
    safetyScore: 88,
    onTimeRate: 96,
    status: "on-duty",
    assignedVehicle: "MH-12-GK-4471",
    trips: 342,
    rating: 4.7,
  },
  {
    id: "d2",
    name: "Suresh Nair",
    phone: "+91 90030 55678",
    license: "TN3820160009012",
    experience: 9,
    safetyScore: 92,
    onTimeRate: 94,
    status: "resting",
    assignedVehicle: "TN-38-BK-9012",
    trips: 288,
    rating: 4.8,
  },
  {
    id: "d3",
    name: "Amarjeet Singh",
    phone: "+91 98110 22288",
    license: "DL0120150002288",
    experience: 15,
    safetyScore: 71,
    onTimeRate: 89,
    status: "on-duty",
    assignedVehicle: "DL-01-LR-2288",
    trips: 512,
    rating: 4.3,
  },
  {
    id: "d4",
    name: "Kiran Patel",
    phone: "+91 99250 77756",
    license: "GJ0520200007756",
    experience: 6,
    safetyScore: 85,
    onTimeRate: 97,
    status: "on-duty",
    assignedVehicle: "GJ-05-MN-7756",
    trips: 174,
    rating: 4.6,
  },
  {
    id: "d5",
    name: "Manoj Reddy",
    phone: "+91 97400 11123",
    license: "KA5120170001123",
    experience: 11,
    safetyScore: 80,
    onTimeRate: 92,
    status: "on-duty",
    assignedVehicle: "KA-51-AC-1123",
    trips: 401,
    rating: 4.5,
  },
  {
    id: "d6",
    name: "Deepak Jadhav",
    phone: "+91 98900 88834",
    license: "MH0420210008834",
    experience: 4,
    safetyScore: 95,
    onTimeRate: 98,
    status: "on-duty",
    assignedVehicle: "MH-04-EQ-8834",
    trips: 96,
    rating: 4.9,
  },
  {
    id: "d7",
    name: "Vikram Rathore",
    phone: "+91 94140 33345",
    license: "RJ1420180003345",
    experience: 8,
    safetyScore: 77,
    onTimeRate: 90,
    status: "off-duty",
    assignedVehicle: "RJ-14-FP-3345",
    trips: 265,
    rating: 4.2,
  },
]

export interface Load {
  id: string
  origin: string
  destination: string
  distance: number
  goods: string
  weight: string
  rate: number
  customer: string
  pickup: string
  status: "in-transit" | "assigned" | "available" | "delivered"
  matchScore: number
  vehicle: string | null
}

export const loads: Load[] = [
  {
    id: "LD-20481",
    origin: "Mumbai, MH",
    destination: "Delhi, DL",
    distance: 1420,
    goods: "FMCG Cartons",
    weight: "24 T",
    rate: 118000,
    customer: "Hindustan Traders",
    pickup: "Today, 14:00",
    status: "in-transit",
    matchScore: 96,
    vehicle: "MH-12-GK-4471",
  },
  {
    id: "LD-20484",
    origin: "Pune, MH",
    destination: "Bengaluru, KA",
    distance: 840,
    goods: "Auto Components",
    weight: "18 T",
    rate: 74000,
    customer: "Bosch Logistics",
    pickup: "Tomorrow, 08:00",
    status: "available",
    matchScore: 91,
    vehicle: null,
  },
  {
    id: "LD-20485",
    origin: "Ahmedabad, GJ",
    destination: "Kolkata, WB",
    distance: 1960,
    goods: "Textile Rolls",
    weight: "22 T",
    rate: 156000,
    customer: "Arvind Mills",
    pickup: "Tomorrow, 06:30",
    status: "available",
    matchScore: 88,
    vehicle: null,
  },
  {
    id: "LD-20479",
    origin: "Delhi, DL",
    destination: "Jaipur, RJ",
    distance: 280,
    goods: "Electronics",
    weight: "12 T",
    rate: 32000,
    customer: "Croma Retail",
    pickup: "Today, 09:00",
    status: "in-transit",
    matchScore: 94,
    vehicle: "DL-01-LR-2288",
  },
  {
    id: "LD-20486",
    origin: "Chennai, TN",
    destination: "Hyderabad, TG",
    distance: 630,
    goods: "Pharma (Cold)",
    weight: "9 T",
    rate: 68000,
    customer: "Dr. Reddy's",
    pickup: "Tomorrow, 05:00",
    status: "available",
    matchScore: 85,
    vehicle: null,
  },
  {
    id: "LD-20483",
    origin: "Surat, GJ",
    destination: "Nagpur, MH",
    distance: 720,
    goods: "Diamonds (Insured)",
    weight: "2 T",
    rate: 94000,
    customer: "Kiran Gems",
    pickup: "Today, 18:00",
    status: "assigned",
    matchScore: 97,
    vehicle: "GJ-05-MN-7756",
  },
]

export interface ReturnLoad {
  id: string
  vehicle: string
  emptyFrom: string
  suggestedLoad: string
  route: string
  extraRevenue: number
  deadheadSaved: number
  confidence: number
}

export const returnLoads: ReturnLoad[] = [
  {
    id: "RL-01",
    vehicle: "TN-38-BK-9012",
    emptyFrom: "Chennai, TN",
    suggestedLoad: "Cement bags → Bengaluru",
    route: "Chennai → Bengaluru (350 km)",
    extraRevenue: 42000,
    deadheadSaved: 350,
    confidence: 92,
  },
  {
    id: "RL-02",
    vehicle: "RJ-14-FP-3345",
    emptyFrom: "Jodhpur, RJ",
    suggestedLoad: "Marble slabs → Ahmedabad",
    route: "Jodhpur → Ahmedabad (450 km)",
    extraRevenue: 38000,
    deadheadSaved: 450,
    confidence: 87,
  },
  {
    id: "RL-03",
    vehicle: "MH-12-GK-4471",
    emptyFrom: "Delhi, DL",
    suggestedLoad: "Machinery → Mumbai",
    route: "Delhi → Mumbai (1400 km)",
    extraRevenue: 96000,
    deadheadSaved: 1400,
    confidence: 78,
  },
]

export interface Customer {
  id: string
  name: string
  contact: string
  city: string
  activeLoads: number
  totalBusiness: string
  outstanding: number
  rating: number
  since: string
}

export const customers: Customer[] = [
  {
    id: "c1",
    name: "Hindustan Traders",
    contact: "Rajesh Mehta",
    city: "Mumbai, MH",
    activeLoads: 4,
    totalBusiness: "₹42.6L",
    outstanding: 118000,
    rating: 4.6,
    since: "2019",
  },
  {
    id: "c2",
    name: "Bosch Logistics",
    contact: "Priya Sharma",
    city: "Pune, MH",
    activeLoads: 2,
    totalBusiness: "₹68.2L",
    outstanding: 0,
    rating: 4.9,
    since: "2020",
  },
  {
    id: "c3",
    name: "Arvind Mills",
    contact: "Nikhil Shah",
    city: "Ahmedabad, GJ",
    activeLoads: 3,
    totalBusiness: "₹54.1L",
    outstanding: 246000,
    rating: 4.4,
    since: "2018",
  },
  {
    id: "c4",
    name: "Dr. Reddy's",
    contact: "Anita Rao",
    city: "Hyderabad, TG",
    activeLoads: 1,
    totalBusiness: "₹31.9L",
    outstanding: 68000,
    rating: 4.7,
    since: "2021",
  },
  {
    id: "c5",
    name: "Kiran Gems",
    contact: "Bhavesh Kiran",
    city: "Surat, GJ",
    activeLoads: 2,
    totalBusiness: "₹88.4L",
    outstanding: 0,
    rating: 5.0,
    since: "2017",
  },
]

export interface FuelLog {
  id: string
  vehicle: string
  date: string
  liters: number
  amount: number
  station: string
  mileage: number
  flagged: boolean
  note: string | null
}

export const fuelLogs: FuelLog[] = [
  {
    id: "f1",
    vehicle: "MH-12-GK-4471",
    date: "2026-07-26",
    liters: 220,
    amount: 20460,
    station: "IOCL Nashik",
    mileage: 4.1,
    flagged: false,
    note: null,
  },
  {
    id: "f2",
    vehicle: "MH-12-GK-4471",
    date: "2026-07-25",
    liters: 0,
    amount: 0,
    station: "— (stationary drop 34L)",
    mileage: 0,
    flagged: true,
    note: "AI: fuel level dropped 34L while parked, no refuel logged",
  },
  {
    id: "f3",
    vehicle: "DL-01-LR-2288",
    date: "2026-07-26",
    liters: 260,
    amount: 24180,
    station: "HPCL Jaipur",
    mileage: 3.6,
    flagged: false,
    note: null,
  },
  {
    id: "f4",
    vehicle: "KA-51-AC-1123",
    date: "2026-07-25",
    liters: 190,
    amount: 17670,
    station: "BPCL Hubballi",
    mileage: 4.4,
    flagged: false,
    note: null,
  },
  {
    id: "f5",
    vehicle: "UP-32-DT-6690",
    date: "2026-07-24",
    liters: 145,
    amount: 13485,
    station: "IOCL Lucknow",
    mileage: 2.9,
    flagged: true,
    note: "AI: mileage 34% below fleet average, possible engine issue",
  },
]

export const fuelTrend = [
  { month: "Feb", cost: 8.1, average: 8.4 },
  { month: "Mar", cost: 8.6, average: 8.5 },
  { month: "Apr", cost: 8.3, average: 8.5 },
  { month: "May", cost: 9.1, average: 8.7 },
  { month: "Jun", cost: 8.8, average: 8.7 },
  { month: "Jul", cost: 8.4, average: 8.6 },
]

export interface TollTxn {
  id: string
  vehicle: string
  plaza: string
  date: string
  amount: number
  balance: number
}

export const tollTxns: TollTxn[] = [
  { id: "t1", vehicle: "MH-12-GK-4471", plaza: "Kharedi Toll, NH48", date: "2026-07-26 11:20", amount: 620, balance: 4380 },
  { id: "t2", vehicle: "DL-01-LR-2288", plaza: "Manoharpur Plaza, NH48", date: "2026-07-26 08:45", amount: 540, balance: 2110 },
  { id: "t3", vehicle: "KA-51-AC-1123", plaza: "Tumakuru Toll, NH48", date: "2026-07-26 07:10", amount: 480, balance: 6220 },
  { id: "t4", vehicle: "MH-04-EQ-8834", plaza: "Bharuch Plaza, NH48", date: "2026-07-25 22:05", amount: 710, balance: 1290 },
  { id: "t5", vehicle: "GJ-05-MN-7756", plaza: "Kim Toll, NH48", date: "2026-07-25 19:40", amount: 560, balance: 8940 },
]

export interface FastagAccount {
  vehicle: string
  balance: number
  monthlySpend: number
  status: "active" | "low-balance" | "blocked"
}

export const fastagAccounts: FastagAccount[] = [
  { vehicle: "MH-12-GK-4471", balance: 4380, monthlySpend: 18600, status: "active" },
  { vehicle: "DL-01-LR-2288", balance: 2110, monthlySpend: 21400, status: "low-balance" },
  { vehicle: "KA-51-AC-1123", balance: 6220, monthlySpend: 16800, status: "active" },
  { vehicle: "MH-04-EQ-8834", balance: 1290, monthlySpend: 24100, status: "low-balance" },
  { vehicle: "GJ-05-MN-7756", balance: 8940, monthlySpend: 14200, status: "active" },
  { vehicle: "UP-32-DT-6690", balance: 0, monthlySpend: 0, status: "blocked" },
]

export interface MaintenanceItem {
  id: string
  vehicle: string
  component: string
  type: "predictive" | "scheduled" | "repair"
  status: "due" | "overdue" | "in-progress" | "done"
  dueIn: string
  estCost: number
  risk: "high" | "medium" | "low"
}

export const maintenance: MaintenanceItem[] = [
  { id: "m1", vehicle: "DL-01-LR-2288", component: "Brake pads (front)", type: "predictive", status: "due", dueIn: "In 3 days", estCost: 8400, risk: "high" },
  { id: "m2", vehicle: "UP-32-DT-6690", component: "Clutch assembly", type: "repair", status: "in-progress", dueIn: "Now", estCost: 42000, risk: "high" },
  { id: "m3", vehicle: "KA-51-AC-1123", component: "Tyre rotation", type: "scheduled", status: "due", dueIn: "In 5 days", estCost: 3200, risk: "medium" },
  { id: "m4", vehicle: "MH-12-GK-4471", component: "Engine oil + filter", type: "scheduled", status: "due", dueIn: "In 6 days", estCost: 6800, risk: "low" },
  { id: "m5", vehicle: "RJ-14-FP-3345", component: "Suspension check", type: "predictive", status: "overdue", dueIn: "2 days ago", estCost: 15600, risk: "high" },
  { id: "m6", vehicle: "MH-04-EQ-8834", component: "AdBlue refill", type: "scheduled", status: "done", dueIn: "Done", estCost: 2400, risk: "low" },
]

export const vehicleHealthSeries = [
  { name: "MH-12-GK-4471", health: 82 },
  { name: "TN-38-BK-9012", health: 91 },
  { name: "DL-01-LR-2288", health: 68 },
  { name: "GJ-05-MN-7756", health: 88 },
  { name: "KA-51-AC-1123", health: 79 },
  { name: "UP-32-DT-6690", health: 44 },
  { name: "MH-04-EQ-8834", health: 93 },
  { name: "RJ-14-FP-3345", health: 74 },
]

export interface Invoice {
  id: string
  customer: string
  load: string
  amount: number
  gst: number
  date: string
  dueDate: string
  status: "paid" | "pending" | "overdue"
}

export const invoices: Invoice[] = [
  { id: "INV-4821", customer: "Hindustan Traders", load: "LD-20481", amount: 118000, gst: 5900, date: "2026-07-20", dueDate: "2026-08-04", status: "pending" },
  { id: "INV-4820", customer: "Bosch Logistics", load: "LD-20470", amount: 74000, gst: 3700, date: "2026-07-18", dueDate: "2026-08-02", status: "paid" },
  { id: "INV-4819", customer: "Arvind Mills", load: "LD-20465", amount: 156000, gst: 7800, date: "2026-07-10", dueDate: "2026-07-25", status: "overdue" },
  { id: "INV-4818", customer: "Kiran Gems", load: "LD-20461", amount: 94000, gst: 4700, date: "2026-07-16", dueDate: "2026-07-31", status: "paid" },
  { id: "INV-4817", customer: "Dr. Reddy's", load: "LD-20458", amount: 68000, gst: 3400, date: "2026-07-08", dueDate: "2026-07-23", status: "overdue" },
  { id: "INV-4816", customer: "Croma Retail", load: "LD-20479", amount: 32000, gst: 1600, date: "2026-07-22", dueDate: "2026-08-06", status: "pending" },
]

export const gstSummary = {
  taxableValue: "₹5.42 Cr",
  cgst: "₹13.55 L",
  sgst: "₹13.55 L",
  igst: "₹9.20 L",
  totalGst: "₹36.30 L",
  filingStatus: "GSTR-1 due in 4 days",
}

export interface DocItem {
  id: string
  name: string
  type: "RC" | "Insurance" | "Permit" | "PUC" | "Invoice" | "E-Way Bill" | "License"
  entity: string
  expiry: string | null
  status: "valid" | "expiring" | "expired"
  uploaded: string
}

export const documents: DocItem[] = [
  { id: "doc1", name: "RC — MH-12-GK-4471", type: "RC", entity: "MH-12-GK-4471", expiry: "2029-03-14", status: "valid", uploaded: "2024-03-14" },
  { id: "doc2", name: "Insurance — DL-01-LR-2288", type: "Insurance", entity: "DL-01-LR-2288", expiry: "2026-08-09", status: "expiring", uploaded: "2025-08-09" },
  { id: "doc3", name: "National Permit — KA-51-AC-1123", type: "Permit", entity: "KA-51-AC-1123", expiry: "2026-07-19", status: "expired", uploaded: "2025-07-19" },
  { id: "doc4", name: "PUC — GJ-05-MN-7756", type: "PUC", entity: "GJ-05-MN-7756", expiry: "2026-11-02", status: "valid", uploaded: "2026-05-02" },
  { id: "doc5", name: "E-Way Bill — LD-20481", type: "E-Way Bill", entity: "LD-20481", expiry: null, status: "valid", uploaded: "2026-07-26" },
  { id: "doc6", name: "Driving License — Amarjeet Singh", type: "License", entity: "Amarjeet Singh", expiry: "2026-09-01", status: "expiring", uploaded: "2016-09-01" },
]

export interface WarehouseBay {
  id: string
  name: string
  city: string
  queue: number
  avgWait: string
  docksBusy: number
  docksTotal: number
  status: "smooth" | "congested" | "critical"
}

export const warehouses: WarehouseBay[] = [
  { id: "w1", name: "Bhiwandi Mega Hub", city: "Bhiwandi, MH", queue: 12, avgWait: "2h 40m", docksBusy: 9, docksTotal: 10, status: "critical" },
  { id: "w2", name: "Gurugram DC", city: "Gurugram, HR", queue: 4, avgWait: "45m", docksBusy: 5, docksTotal: 12, status: "smooth" },
  { id: "w3", name: "Whitefield FC", city: "Bengaluru, KA", queue: 7, avgWait: "1h 20m", docksBusy: 8, docksTotal: 10, status: "congested" },
  { id: "w4", name: "Sanand Warehouse", city: "Ahmedabad, GJ", queue: 3, avgWait: "35m", docksBusy: 4, docksTotal: 8, status: "smooth" },
]

export interface EmergencyEvent {
  id: string
  vehicle: string
  driver: string
  type: "breakdown" | "accident" | "medical" | "sos" | "theft"
  location: string
  time: string
  status: "active" | "responding" | "resolved"
}

export const emergencyEvents: EmergencyEvent[] = [
  { id: "e1", vehicle: "UP-32-DT-6690", driver: "Unassigned", type: "breakdown", location: "NH27 near Kanpur", time: "12 min ago", status: "responding" },
  { id: "e2", vehicle: "RJ-14-FP-3345", driver: "Vikram Rathore", type: "sos", location: "Jodhpur bypass", time: "1 hr ago", status: "resolved" },
  { id: "e3", vehicle: "DL-01-LR-2288", driver: "Amarjeet Singh", type: "medical", location: "NH48, Manoharpur", time: "3 hr ago", status: "resolved" },
]

export const emergencyContacts = [
  { label: "National Highway Helpline", number: "1033" },
  { label: "Fleet Control Room", number: "+91 99999 00000" },
  { label: "Roadside Assistance", number: "+91 88888 11111" },
  { label: "Insurance Claims Desk", number: "+91 77777 22222" },
]

export interface RouteStop {
  name: string
  city: string
  eta: string
  status: "done" | "current" | "upcoming"
  lat: number
  lng: number
}

export const optimizedRoute = {
  load: "LD-20481",
  vehicle: "MH-12-GK-4471",
  from: "Mumbai, MH",
  to: "Delhi, DL",
  distance: 1420,
  optimizedDistance: 1388,
  fuelSaved: "34 L",
  timeSaved: "3h 20m",
  tollSaved: "₹1,240",
  stops: [
    { name: "Mumbai (Origin)", city: "Mumbai", eta: "Departed 14:00", status: "done", lat: 19.076, lng: 72.8777 },
    { name: "Nashik", city: "Nashik", eta: "18:20", status: "current", lat: 19.9975, lng: 73.7898 },
    { name: "Dhule (Rest + Fuel)", city: "Dhule", eta: "21:40", status: "upcoming", lat: 20.9042, lng: 74.7749 },
    { name: "Indore", city: "Indore", eta: "03:10", status: "upcoming", lat: 22.7196, lng: 75.8577 },
    { name: "Gwalior", city: "Gwalior", eta: "10:30", status: "upcoming", lat: 26.2183, lng: 78.1828 },
    { name: "Delhi (Destination)", city: "Delhi", eta: "16:45", status: "upcoming", lat: 28.7041, lng: 77.1025 },
  ] as RouteStop[],
}

export const demandForecast = [
  { month: "Aug", forecast: 196, capacity: 210 },
  { month: "Sep", forecast: 214, capacity: 210 },
  { month: "Oct", forecast: 238, capacity: 210 },
  { month: "Nov", forecast: 262, capacity: 224 },
  { month: "Dec", forecast: 248, capacity: 224 },
  { month: "Jan", forecast: 205, capacity: 224 },
]

export const laneProfitability = [
  { lane: "Mumbai–Delhi", margin: 28, trips: 46 },
  { lane: "Chennai–Hyderabad", margin: 22, trips: 38 },
  { lane: "Pune–Bengaluru", margin: 31, trips: 52 },
  { lane: "Ahmedabad–Kolkata", margin: 18, trips: 24 },
  { lane: "Surat–Nagpur", margin: 34, trips: 29 },
]
