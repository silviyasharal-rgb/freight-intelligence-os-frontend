import Link from "next/link"
import {
  AlertTriangle,
  ArrowRight,
  Lightbulb,
  Info,
  IndianRupee,
  Gauge,
  Truck,
  Clock,
  TrendingUp,
  CircleParking,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PageIntro, StatCard } from "@/components/dashboard/kit"
import {
  RevenueChart,
  CostBreakdownChart,
  DemandForecastChart,
  LaneProfitChart,
} from "@/components/dashboard/overview-charts"
import { dashboardKpis, aiInsights, vehicles } from "@/lib/mock-data"

const kpiIcons = {
  revenue: IndianRupee,
  profit: TrendingUp,
  utilization: Truck,
  "cost-per-km": Gauge,
  "on-time": Clock,
  idle: CircleParking,
} as const

const severityStyles = {
  critical: {
    icon: AlertTriangle,
    className: "border-destructive/30 bg-destructive/5",
    badge: "destructive" as const,
    label: "Critical",
  },
  opportunity: {
    icon: Lightbulb,
    className: "border-accent/30 bg-accent/5",
    badge: "default" as const,
    label: "Opportunity",
  },
  info: {
    icon: Info,
    className: "border-border bg-secondary/40",
    badge: "secondary" as const,
    label: "Info",
  },
}

const statusColor: Record<string, string> = {
  "on-trip": "bg-emerald-500",
  idle: "bg-amber-500",
  loading: "bg-sky-500",
  maintenance: "bg-destructive",
}

export default function CommandCenterPage() {
  const activeVehicles = vehicles.filter((v) => v.status === "on-trip")

  return (
    <div className="flex flex-col gap-6">
      <PageIntro
        title="Command Center"
        description="A unified, AI-driven view of your entire freight operation — revenue, fleet health, live movement, and cost-saving opportunities."
        actions={
          <Button className="gap-2" render={<Link href="/assistant" />}>
            Ask Freight Operations AI Assistant
            <ArrowRight className="size-4" />
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {dashboardKpis.map((kpi) => (
          <StatCard
            key={kpi.id}
            label={kpi.label}
            value={kpi.value}
            delta={kpi.delta}
            positive={kpi.positive}
            hint={kpi.hint}
            icon={kpiIcons[kpi.id as keyof typeof kpiIcons]}
          />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <RevenueChart />
        <CostBreakdownChart />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* AI Insights */}
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div className="flex flex-col gap-1">
              <CardTitle>AI Insights & Recommendations</CardTitle>
              <CardDescription>Generated from real-time operational data</CardDescription>
            </div>
            <Badge variant="secondary" className="gap-1">
              <Lightbulb className="size-3" />
              {aiInsights.length} new
            </Badge>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {aiInsights.map((insight) => {
              const s = severityStyles[insight.severity]
              const Icon = s.icon
              return (
                <div
                  key={insight.id}
                  className={`flex gap-3 rounded-lg border p-3 ${s.className}`}
                >
                  <Icon className="mt-0.5 size-4 shrink-0 text-foreground/70" />
                  <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-foreground">
                        {insight.title}
                      </span>
                      <Badge variant={s.badge} className="shrink-0 text-[10px]">
                        {s.label}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground text-pretty">{insight.detail}</p>
                    <span className="text-xs font-medium text-accent">{insight.impact}</span>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Live fleet snapshot */}
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <div className="flex flex-col gap-1">
              <CardTitle>Live Fleet Snapshot</CardTitle>
              <CardDescription>{activeVehicles.length} vehicles currently on-trip</CardDescription>
            </div>
            <Button variant="outline" size="sm" render={<Link href="/tracking" />}>
              Open map
            </Button>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {vehicles.slice(0, 6).map((v) => (
              <div
                key={v.id}
                className="flex items-center gap-3 rounded-lg border border-border bg-background/60 p-3"
              >
                <span className={`size-2.5 shrink-0 rounded-full ${statusColor[v.status]}`} />
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate font-mono text-sm font-medium text-foreground">
                    {v.regNo}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {v.driver} · {v.location}
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium text-foreground">{v.speed} km/h</span>
                  <span className="text-xs text-muted-foreground">Fuel {v.fuel}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <DemandForecastChart />
        <LaneProfitChart />
      </div>
    </div>
  )
}
