"use client"

import { useMemo, useState } from "react"
import dynamic from "next/dynamic"
import { Gauge, Fuel, Navigation, User, MapPin } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { vehicles, type Vehicle } from "@/lib/mock-data"

const FleetMap = dynamic(() => import("@/components/tracking/fleet-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-muted text-sm text-muted-foreground">
      Loading live map…
    </div>
  ),
})

const statusMeta: Record<Vehicle["status"], { label: string; dot: string; badge: string }> = {
  "on-trip": { label: "On Trip", dot: "bg-emerald-500", badge: "border-emerald-500/40 text-emerald-600" },
  idle: { label: "Idle", dot: "bg-amber-500", badge: "border-amber-500/40 text-amber-600" },
  loading: { label: "Loading", dot: "bg-sky-500", badge: "border-sky-500/40 text-sky-600" },
  maintenance: { label: "Maintenance", dot: "bg-destructive", badge: "border-destructive/40 text-destructive" },
}

export function TrackingView() {
  const [selected, setSelected] = useState<Vehicle | null>(vehicles[0])
  const sorted = useMemo(
    () => [...vehicles].sort((a, b) => a.status.localeCompare(b.status)),
    [],
  )

  return (
    <div className="grid gap-4 lg:grid-cols-[340px_1fr] xl:grid-cols-[380px_1fr]">
      <Card className="order-2 lg:order-1">
        <CardHeader>
          <CardTitle className="text-base">Fleet ({vehicles.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[300px] lg:h-[560px]">
            <div className="flex flex-col gap-1 px-3 pb-3">
              {sorted.map((v) => {
                const meta = statusMeta[v.status]
                return (
                  <button
                    key={v.id}
                    onClick={() => setSelected(v)}
                    className={cn(
                      "flex flex-col gap-1 rounded-lg border p-3 text-left transition-colors",
                      selected?.id === v.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-background hover:bg-secondary/60",
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-sm font-semibold text-foreground">
                        {v.regNo}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span className={cn("size-2 rounded-full", meta.dot)} />
                        {meta.label}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3" /> {v.location}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Navigation className="size-3" /> {v.speed} km/h
                      </span>
                      <span className="flex items-center gap-1">
                        <Fuel className="size-3" /> {v.fuel}%
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="order-1 flex flex-col gap-4 lg:order-2">
        <Card className="overflow-hidden">
          <div className="h-[360px] w-full lg:h-[420px]">
            <FleetMap vehicles={vehicles} selected={selected} onSelect={setSelected} />
          </div>
        </Card>

        {selected ? (
          <Card>
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="font-mono text-base">{selected.regNo}</CardTitle>
              <Badge variant="outline" className={statusMeta[selected.status].badge}>
                {statusMeta[selected.status].label}
              </Badge>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Detail icon={User} label="Driver" value={selected.driver} />
              <Detail icon={Navigation} label="Speed" value={`${selected.speed} km/h`} />
              <Detail icon={Fuel} label="Fuel" value={`${selected.fuel}%`} />
              <Detail icon={Gauge} label="Odometer" value={`${selected.odometer.toLocaleString()} km`} />
              <Detail icon={MapPin} label="Location" value={selected.location} />
              <Detail icon={Gauge} label="Health" value={`${selected.healthScore}/100`} />
              <Detail icon={Navigation} label="Type" value={selected.type} />
              <Detail icon={Navigation} label="Load" value={selected.currentLoad ?? "—"} />
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  )
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Gauge
  label: string
  value: string
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="flex items-center gap-1 text-xs text-muted-foreground">
        <Icon className="size-3" /> {label}
      </span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  )
}
