import { Wrench, Gauge, CalendarClock, ShieldCheck } from "lucide-react"

import { PageIntro, StatCard } from "@/components/dashboard/kit"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function MaintenancePage() {
  return (
    <div className="flex flex-col gap-6">
      <PageIntro
        title="Maintenance"
        description="Track service schedules, repair queues, and vehicle health checks."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="In service" value="11" icon={Wrench} hint="active repairs" />
        <StatCard label="Avg health" value="88%" icon={Gauge} hint="fleet score" />
        <StatCard label="Due this week" value="5" icon={CalendarClock} hint="service visits" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service board</CardTitle>
          <CardDescription>Upcoming checks and maintenance actions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { vehicle: "KA 01 AB 1234", task: "Brake inspection", status: "Scheduled" },
            { vehicle: "KA 05 CD 5678", task: "Oil service", status: "In progress" },
            { vehicle: "KA 09 EF 9012", task: "Tire replacement", status: "Ready" },
          ].map((item) => (
            <div key={item.vehicle} className="flex items-center justify-between rounded-lg border border-border bg-background/70 p-3">
              <div>
                <p className="font-medium">{item.vehicle}</p>
                <p className="text-sm text-muted-foreground">{item.task}</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="size-4" />
                {item.status}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
