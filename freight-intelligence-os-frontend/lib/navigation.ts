import {
  LayoutDashboard,
  Truck,
  MapPin,
  Boxes,
  Route,
  Fuel,
  Receipt,
  Wrench,
  Users,
  Building2,
  RefreshCw,
  Warehouse,
  FileText,
  FileSpreadsheet,
  Siren,
  Sparkles,
  type LucideIcon,
} from "lucide-react"

export interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  badge?: string
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export const navGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { title: "Command Center", href: "/", icon: LayoutDashboard },
      { title: "Freight Operations AI Assistant", href: "/assistant", icon: Sparkles, badge: "AI" },
    ],
  },
  {
    label: "Operations",
    items: [
      { title: "Fleet Management", href: "/fleet", icon: Truck },
      { title: "Live GPS Tracking", href: "/tracking", icon: MapPin },
      { title: "Load Matching", href: "/loads", icon: Boxes },
      { title: "Route Optimization", href: "/routes", icon: Route },
      { title: "Return Loads", href: "/returns", icon: RefreshCw },
      { title: "Warehouse Queue", href: "/warehouse", icon: Warehouse },
    ],
  },
  {
  
  label: "Finance",
  items: [
    { title: "Fuel", href: "/fuel", icon: Fuel },
    { title: "Expenses", href: "/expenses", icon: Receipt },
    { title: "Tolls & FASTag", href: "/tolls", icon: Receipt },
    { title: "Invoices & GST", href: "/invoices", icon: FileSpreadsheet },
  ],
},  
  {
    label: "People & Assets",
    items: [
      { title: "Drivers", href: "/drivers", icon: Users },
      { title: "Maintenance", href: "/maintenance", icon: Wrench },
      { title: "Customers", href: "/customers", icon: Building2 },
      { title: "Documents", href: "/documents", icon: FileText },
      { title: "Emergency", href: "/emergency", icon: Siren },
    ],
  },
]

export const allNavItems: NavItem[] = navGroups.flatMap((g) => g.items)
