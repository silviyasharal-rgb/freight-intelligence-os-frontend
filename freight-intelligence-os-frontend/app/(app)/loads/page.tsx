"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"
import {
  ArrowRight,
  Boxes,
  IndianRupee,
  MapPin,
  Package,
  Sparkles,
  Weight,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { PageIntro, StatCard } from "@/components/dashboard/kit"
import { loads, vehicles } from "@/lib/mock-data"

const statusMeta: Record<string, string> = {
  "in-transit": "border-emerald-500/40 bg-emerald-500/10 text-emerald-600",
  assigned: "border-sky-500/40 bg-sky-500/10 text-sky-600",
  available: "border-amber-500/40 bg-amber-500/10 text-amber-600",
  delivered: "border-border bg-secondary text-muted-foreground",
}

function matchColor(score: number) {
  if (score >= 92) return "text-emerald-600"
  if (score >= 85) return "text-amber-600"
  return "text-muted-foreground"
}

export default function LoadsPage() {
  const router = useRouter();
  const available = loads.filter((l) => l.status === "available")
  const active = loads.filter((l) => l.status !== "available")
  const idleTrucks = vehicles.filter((v) => v.status === "idle").length
  const totalValue = loads.reduce((s, l) => s + l.rate, 0)

  return (
    <div className="flex flex-col gap-6">
      <PageIntro
        title="AI Load Matching"
        description="Our engine scores every open load against your available trucks by lane, rate, deadhead, and driver fit — surfacing the most profitable matches first."
        actions={
          <Button className="gap-2">
            <Sparkles className="size-4" />
            Auto-match all
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Open Loads" value={String(available.length)} icon={Boxes} hint="on the board" />
        <StatCard label="Idle Trucks" value={String(idleTrucks)} icon={Package} hint="ready to assign" />
        <StatCard label="Board Value" value={`₹${(totalValue / 100000).toFixed(1)}L`} icon={IndianRupee} hint="total freight" />
        <StatCard label="Avg Match Score" value="90%" positive delta="+4%" icon={Sparkles} hint="AI confidence" />
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Recommended matches</h3>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {available.map((load) => (
            <Card key={load.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={statusMeta[load.status]}>
                    {load.status}
                  </Badge>
                  <span className="font-mono text-xs text-muted-foreground">{load.id}</span>
                </div>
                <CardTitle className="flex items-center gap-2 pt-1 text-base">
                  <span>{load.origin}</span>
                  <ArrowRight className="size-4 text-muted-foreground" />
                  <span>{load.destination}</span>
                </CardTitle>
                <CardDescription>{load.customer}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <Detail icon={Package} label="Goods" value={load.goods} />
                  <Detail icon={Weight} label="Weight" value={load.weight} />
                  <Detail icon={MapPin} label="Distance" value={`${load.distance} km`} />
                  <Detail icon={IndianRupee} label="Rate" value={`₹${load.rate.toLocaleString()}`} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Sparkles className="size-3" /> AI Match
                    </span>
                    <span className={`font-semibold ${matchColor(load.matchScore)}`}>
                      {load.matchScore}%
                    </span>
                  </div>
                  <Progress value={load.matchScore} className="h-1.5" />
                </div>
                <div className="mt-auto flex gap-2">
                  <Button size="sm" className="flex-1">
                    Assign truck
                  </Button>
                  <Button size="sm" variant="outline">
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">Active & assigned loads</CardTitle>
          <Button variant="outline" size="sm" render={<Link href="/routes" />}>
            View routes
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {active.map((load) => (
            <div
              key={load.id}
              className="flex flex-col gap-2 rounded-lg border border-border bg-background/60 p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  {load.origin} <ArrowRight className="size-3.5 text-muted-foreground" /> {load.destination}
                </div>
                <span className="text-xs text-muted-foreground">
                  {load.id} · {load.customer} · {load.goods}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-muted-foreground">
                  {load.vehicle ?? "unassigned"}
                </span>
                <span className="font-mono text-sm text-foreground">
                  ₹{load.rate.toLocaleString()}
                </span>
                <Badge variant="outline" className={statusMeta[load.status]}>
                  {load.status}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function Detail({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Package
  label: string
  value: string
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="flex items-center gap-1 text-xs text-muted-foreground">
        <Icon className="size-3" /> {label}
      </span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  )
}
