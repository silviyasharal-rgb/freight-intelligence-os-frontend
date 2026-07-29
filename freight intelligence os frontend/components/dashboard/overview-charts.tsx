"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  revenueExpenseSeries,
  costBreakdown,
  demandForecast,
  laneProfitability,
} from "@/lib/mock-data"

const revenueConfig = {
  revenue: { label: "Revenue (₹L)", color: "var(--chart-2)" },
  expense: { label: "Expense (₹L)", color: "var(--chart-1)" },
} satisfies ChartConfig

export function RevenueChart() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Revenue vs. Expense</CardTitle>
        <CardDescription>Monthly performance in ₹ lakhs · trailing 12 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={revenueConfig} className="h-[280px] w-full">
          <AreaChart data={revenueExpenseSeries} margin={{ left: 4, right: 4 }}>
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-expense)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--color-expense)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} width={32} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Area
              dataKey="revenue"
              type="monotone"
              fill="url(#fillRevenue)"
              stroke="var(--color-revenue)"
              strokeWidth={2}
            />
            <Area
              dataKey="expense"
              type="monotone"
              fill="url(#fillExpense)"
              stroke="var(--color-expense)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

const costConfig = {
  value: { label: "Share" },
  fuel: { label: "Fuel", color: "var(--chart-1)" },
  driver: { label: "Driver Pay", color: "var(--chart-2)" },
  tolls: { label: "Tolls", color: "var(--chart-3)" },
  maintenance: { label: "Maintenance", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
} satisfies ChartConfig

export function CostBreakdownChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost Structure</CardTitle>
        <CardDescription>Operating cost distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={costConfig} className="mx-auto aspect-square h-[240px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="category" />} />
            <Pie
              data={costBreakdown}
              dataKey="value"
              nameKey="category"
              innerRadius={55}
              strokeWidth={2}
            >
              {costBreakdown.map((entry) => (
                <Cell key={entry.category} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend
              content={<ChartLegendContent nameKey="category" />}
              className="flex-wrap gap-2"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

const forecastConfig = {
  forecast: { label: "Demand (trips)", color: "var(--chart-1)" },
  capacity: { label: "Capacity", color: "var(--chart-2)" },
} satisfies ChartConfig

export function DemandForecastChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Demand Forecast</CardTitle>
        <CardDescription>Predicted load demand vs. fleet capacity</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={forecastConfig} className="h-[240px] w-full">
          <LineChart data={demandForecast} margin={{ left: 4, right: 4 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
            <YAxis tickLine={false} axisLine={false} width={32} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              dataKey="forecast"
              type="monotone"
              stroke="var(--color-forecast)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="capacity"
              type="monotone"
              stroke="var(--color-capacity)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

const laneConfig = {
  margin: { label: "Margin %", color: "var(--chart-1)" },
} satisfies ChartConfig

export function LaneProfitChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Lane Profitability</CardTitle>
        <CardDescription>Net margin by trade lane</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={laneConfig} className="h-[240px] w-full">
          <BarChart
            data={laneProfitability}
            layout="vertical"
            margin={{ left: 8, right: 12 }}
          >
            <CartesianGrid horizontal={false} strokeDasharray="3 3" />
            <XAxis type="number" tickLine={false} axisLine={false} unit="%" />
            <YAxis
              type="category"
              dataKey="lane"
              tickLine={false}
              axisLine={false}
              width={110}
              tick={{ fontSize: 11 }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="margin" fill="var(--color-margin)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
