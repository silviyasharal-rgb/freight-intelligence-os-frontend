"use client"

import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { vehicles, type Vehicle } from "@/lib/mock-data"

const statusMeta: Record<Vehicle["status"], { label: string; className: string }> = {
  "on-trip": { label: "On Trip", className: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600" },
  idle: { label: "Idle", className: "border-amber-500/40 bg-amber-500/10 text-amber-600" },
  loading: { label: "Loading", className: "border-sky-500/40 bg-sky-500/10 text-sky-600" },
  maintenance: { label: "Maintenance", className: "border-destructive/40 bg-destructive/10 text-destructive" },
}

const filters = [
  { value: "all", label: "All" },
  { value: "on-trip", label: "On Trip" },
  { value: "idle", label: "Idle" },
  { value: "loading", label: "Loading" },
  { value: "maintenance", label: "Maintenance" },
]

function healthColor(score: number) {
  if (score >= 80) return "text-emerald-600"
  if (score >= 60) return "text-amber-600"
  return "text-destructive"
}

export function FleetView() {
  const [filter, setFilter] = useState("all")
  const rows = filter === "all" ? vehicles : vehicles.filter((v) => v.status === filter)

  return (
    <Card>
      <CardHeader className="gap-4 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="text-base">Vehicles</CardTitle>
        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList>
            {filters.map((f) => (
              <TabsTrigger key={f.value} value={f.value}>
                {f.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Fuel</TableHead>
                <TableHead className="w-40">Health</TableHead>
                <TableHead>Load</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((v) => (
                <TableRow key={v.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-mono text-sm font-medium text-foreground">{v.regNo}</span>
                      <span className="text-xs text-muted-foreground">{v.model}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusMeta[v.status].className}>
                      {statusMeta[v.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{v.driver}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{v.location}</TableCell>
                  <TableCell className="text-right font-mono text-sm">{v.fuel}%</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={v.healthScore} className="h-1.5" />
                      <span className={cn("w-8 text-right text-xs font-medium", healthColor(v.healthScore))}>
                        {v.healthScore}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {v.currentLoad ?? "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
