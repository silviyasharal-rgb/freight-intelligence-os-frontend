import { Receipt, Wallet, AlertCircle, TrendingUp } from "lucide-react"

import { PageIntro, StatCard } from "@/components/dashboard/kit"
import { tollTxns, fastagAccounts, inr } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  active: "secondary",
  "low-balance": "default",
  blocked: "destructive",
}

export default function TollsPage() {
  const monthlyToll = fastagAccounts.reduce((a, f) => a + f.monthlySpend, 0)
  const lowBalance = fastagAccounts.filter((f) => f.status !== "active").length

  return (
    <div className="flex flex-col gap-6">
      <PageIntro
        title="Tolls &amp; FASTag"
        description="Automated toll reconciliation and FASTag balance monitoring across every vehicle."
        actions={<Button variant="outline">Recharge all</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Toll spend (MTD)" value={inr(monthlyToll)} icon={Receipt} delta="6.4%" positive={false} hint="vs last month" />
        <StatCard label="FASTag balance" value={inr(fastagAccounts.reduce((a, f) => a + f.balance, 0))} icon={Wallet} hint="across fleet" />
        <StatCard label="Low / blocked tags" value={String(lowBalance)} icon={AlertCircle} hint="need recharge" />
        <StatCard label="Avg toll / trip" value="₹1,840" icon={TrendingUp} delta="2.1%" positive hint="optimized" />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>FASTag accounts</CardTitle>
            <CardDescription>Live balances and monthly spend</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {fastagAccounts.map((f) => (
              <div
                key={f.vehicle}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div className="flex flex-col">
                  <span className="font-mono text-sm font-medium">{f.vehicle}</span>
                  <span className="text-xs text-muted-foreground">
                    {inr(f.monthlySpend)}/mo spend
                  </span>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-mono text-sm font-semibold">{inr(f.balance)}</span>
                  <Badge variant={statusVariant[f.status]} className="capitalize">
                    {f.status.replace("-", " ")}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent toll transactions</CardTitle>
            <CardDescription>Auto-captured at plazas via FASTag</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Plaza</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tollTxns.map((t) => (
                    <TableRow key={t.id}>
                      <TableCell className="font-mono text-xs">{t.vehicle}</TableCell>
                      <TableCell>{t.plaza}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{t.date}</TableCell>
                      <TableCell className="text-right font-mono">{inr(t.amount)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
