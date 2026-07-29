import { Warehouse, Clock, Truck, LayoutGrid } from "lucide-react"

import { PageIntro, StatCard } from "@/components/dashboard/kit"
import { warehouses } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const statusStyles: Record<string, string> = {
  smooth: "text-emerald-600",
  congested: "text-amber-600",
  critical: "text-destructive",
}

const statusVariant: Record<string, "secondary" | "default" | "destructive"> = {
  smooth: "secondary",
  congested: "default",
  critical: "destructive",
}

export default function WarehousePage() {
  const totalQueue = warehouses.reduce((a, w) => a + w.queue, 0)
  const busy = warehouses.reduce((a, w) => a + w.docksBusy, 0)
  const total = warehouses.reduce((a, w) => a + w.docksTotal, 0)

  return (
    <div className="flex flex-col gap-6">
      <PageIntro
        title="Warehouse Queue"
        description="Live dock utilization and queue times across hubs, with AI slot recommendations to cut detention."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Vehicles queued" value={String(totalQueue)} icon={Truck} hint="across hubs" />
        <StatCard label="Dock utilization" value={`${Math.round((busy / total) * 100)}%`} icon={LayoutGrid} hint={`${busy}/${total} docks busy`} />
        <StatCard label="Avg wait time" value="1h 20m" icon={Clock} delta="12m" positive hint="improving" />
        <StatCard label="Active hubs" value={String(warehouses.length)} icon={Warehouse} hint="operational" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {warehouses.map((w) => (
          <Card key={w.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">{w.name}</CardTitle>
                  <CardDescription>{w.city}</CardDescription>
                </div>
                <Badge variant={statusVariant[w.status]} className="capitalize">
                  {w.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="flex flex-col">
                  <span className={cn("font-mono text-xl font-semibold", statusStyles[w.status])}>
                    {w.queue}
                  </span>
                  <span className="text-xs text-muted-foreground">in queue</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-xl font-semibold text-foreground">
                    {w.avgWait}
                  </span>
                  <span className="text-xs text-muted-foreground">avg wait</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-xl font-semibold text-foreground">
                    {w.docksBusy}/{w.docksTotal}
                  </span>
                  <span className="text-xs text-muted-foreground">docks</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Dock occupancy</span>
                  <span>{Math.round((w.docksBusy / w.docksTotal) * 100)}%</span>
                </div>
                <Progress value={(w.docksBusy / w.docksTotal) * 100} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
