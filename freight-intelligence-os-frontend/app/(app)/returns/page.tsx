import { RefreshCw, TrendingUp, Route, Sparkles } from "lucide-react"

import { PageIntro, StatCard } from "@/components/dashboard/kit"
import { returnLoads, inr } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function ReturnsPage() {
  const totalRevenue = returnLoads.reduce((a, r) => a + r.extraRevenue, 0)
  const totalDeadhead = returnLoads.reduce((a, r) => a + r.deadheadSaved, 0)

  return (
    <div className="flex flex-col gap-6">
      <PageIntro
        title="Return Load Matching"
        description="Eliminate empty return trips. AI finds backhaul loads to turn deadhead kilometers into revenue."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Potential extra revenue" value={inr(totalRevenue)} icon={TrendingUp} hint="from backhauls" />
        <StatCard label="Deadhead km avoidable" value={`${totalDeadhead.toLocaleString("en-IN")} km`} icon={Route} hint="this week" />
        <StatCard label="Empty vehicles" value={String(returnLoads.length)} icon={RefreshCw} hint="awaiting match" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {returnLoads.map((r) => (
          <Card key={r.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-mono text-base">{r.vehicle}</CardTitle>
                <Badge variant="secondary" className="text-accent">
                  <Sparkles className="mr-1 size-3" />
                  {r.confidence}% match
                </Badge>
              </div>
              <CardDescription>Empty from {r.emptyFrom}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="rounded-lg bg-secondary p-3">
                <p className="text-sm font-medium text-foreground">{r.suggestedLoad}</p>
                <p className="text-xs text-muted-foreground">{r.route}</p>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Extra revenue</span>
                <span className="font-mono font-semibold text-emerald-600">
                  +{inr(r.extraRevenue)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Deadhead saved</span>
                <span className="font-mono font-medium">{r.deadheadSaved} km</span>
              </div>
              <div className="flex flex-col gap-1">
                <Progress value={r.confidence} />
              </div>
              <Button className="w-full">Assign backhaul</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
