"use client"

import { Fuel, AlertTriangle, TrendingDown, Gauge } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import { PageIntro, StatCard } from "@/components/dashboard/kit"
import { fuelLogs, fuelTrend, inr } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartConfig = {
  cost: { label: "Fuel cost (₹L)", color: "var(--chart-1)" },
  average: { label: "Fleet avg", color: "var(--chart-2)" },
} satisfies ChartConfig

export default function FuelPage() {
  const flagged = fuelLogs.filter((f) => f.flagged)
  const totalSpend = fuelLogs.reduce((a, f) => a + f.amount, 0)

  return (
    <div className="flex flex-col gap-6">
      <PageIntro
        title="Fuel &amp; Expense Intelligence"
        description="Track fuel consumption, mileage and expenses with AI-powered theft and anomaly detection."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Fuel spend (MTD)" value={inr(totalSpend)} icon={Fuel} delta="4.2%" positive={false} hint="vs last month" />
        <StatCard label="Avg mileage" value="3.9 km/L" icon={Gauge} delta="1.8%" positive hint="improving" />
        <StatCard label="Anomalies flagged" value={String(flagged.length)} icon={AlertTriangle} hint="needs review" />
        <StatCard label="Est. savings" value="₹1.24L" icon={TrendingDown} delta="9.1%" positive hint="AI routing" />
      </div>

      {flagged.length > 0 ? (
        <Alert variant="destructive">
          <AlertTriangle />
          <AlertTitle>{flagged.length} fuel anomalies detected</AlertTitle>
          <AlertDescription>
            AI fraud detection flagged suspicious fuel activity. Review the highlighted rows below.
          </AlertDescription>
        </Alert>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent fuel logs</CardTitle>
            <CardDescription>Latest transactions across the fleet</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Station</TableHead>
                    <TableHead className="text-right">Liters</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">km/L</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fuelLogs.map((f) => (
                    <TableRow key={f.id} className={f.flagged ? "bg-destructive/5" : undefined}>
                      <TableCell className="font-mono text-xs">{f.vehicle}</TableCell>
                      <TableCell className="max-w-[200px]">
                        <div className="truncate">{f.station}</div>
                        {f.note ? (
                          <div className="truncate text-xs text-destructive">{f.note}</div>
                        ) : null}
                      </TableCell>
                      <TableCell className="text-right font-mono">{f.liters}</TableCell>
                      <TableCell className="text-right font-mono">{inr(f.amount)}</TableCell>
                      <TableCell className="text-right font-mono">{f.mileage || "—"}</TableCell>
                      <TableCell>
                        {f.flagged ? (
                          <Badge variant="destructive">Flagged</Badge>
                        ) : (
                          <Badge variant="secondary">Normal</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fuel cost trend</CardTitle>
            <CardDescription>Monthly spend vs fleet average (₹ lakh)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[260px] w-full">
              <LineChart data={fuelTrend} margin={{ left: 4, right: 8, top: 8 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} width={30} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line dataKey="cost" stroke="var(--color-cost)" strokeWidth={2} dot={false} />
                <Line
                  dataKey="average"
                  stroke="var(--color-average)"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
