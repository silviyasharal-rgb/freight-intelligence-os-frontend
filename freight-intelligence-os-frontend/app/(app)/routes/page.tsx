import { Route, Fuel, Clock, IndianRupee, Sparkles } from "lucide-react"

import { PageIntro, StatCard } from "@/components/dashboard/kit"
import { RouteMap } from "@/components/routes/route-map"
import { optimizedRoute } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function RoutesPage() {
  const r = optimizedRoute
  return (
    <div className="flex flex-col gap-6">
      <PageIntro
        title="AI Route Optimization"
        description="Fuel-, toll- and time-optimized routing with live rerouting for weather, traffic and restrictions."
        actions={
          <Button>
            <Sparkles data-icon="inline-start" />
            Re-optimize
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Distance saved" value="32 km" icon={Route} hint="vs. default route" />
        <StatCard label="Fuel saved" value={r.fuelSaved} icon={Fuel} hint="₹2,890 est." />
        <StatCard label="Time saved" value={r.timeSaved} icon={Clock} hint="faster ETA" />
        <StatCard label="Toll saved" value={r.tollSaved} icon={IndianRupee} hint="alt. corridor" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="overflow-hidden lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {r.from} → {r.to}
            </CardTitle>
            <CardDescription>
              Load {r.load} · Vehicle {r.vehicle} · {r.optimizedDistance} km optimized
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[420px] w-full">
              <RouteMap stops={r.stops} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stop schedule</CardTitle>
            <CardDescription>Sequenced with rest and refuel stops</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="flex flex-col gap-0">
              {r.stops.map((s, i) => (
                <li key={s.name} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span
                      className={cn(
                        "flex size-7 items-center justify-center rounded-full border text-xs font-semibold",
                        s.status === "done" && "border-emerald-500 bg-emerald-500/10 text-emerald-600",
                        s.status === "current" && "border-accent bg-accent text-accent-foreground",
                        s.status === "upcoming" && "border-border bg-secondary text-muted-foreground",
                      )}
                    >
                      {i + 1}
                    </span>
                    {i < r.stops.length - 1 ? <span className="my-1 w-px flex-1 bg-border" /> : null}
                  </div>
                  <div className="flex flex-1 items-start justify-between pb-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">{s.name}</span>
                      <span className="text-xs text-muted-foreground">ETA {s.eta}</span>
                    </div>
                    {s.status === "current" ? (
                      <Badge variant="secondary" className="text-accent">
                        En route
                      </Badge>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
