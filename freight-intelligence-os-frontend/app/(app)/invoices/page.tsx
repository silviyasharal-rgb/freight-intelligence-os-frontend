import { FileSpreadsheet, IndianRupee, Clock, AlertTriangle } from "lucide-react"

import { PageIntro, StatCard } from "@/components/dashboard/kit"
import { invoices, gstSummary, inr } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const statusVariant: Record<string, "default" | "secondary" | "destructive"> = {
  paid: "secondary",
  pending: "default",
  overdue: "destructive",
}

export default function InvoicesPage() {
  const outstanding = invoices
    .filter((i) => i.status !== "paid")
    .reduce((a, i) => a + i.amount, 0)
  const overdue = invoices.filter((i) => i.status === "overdue").length

  return (
    <div className="flex flex-col gap-6">
      <PageIntro
        title="Invoices &amp; GST"
        description="Automated GST-compliant invoicing, e-way bills and filing readiness."
        actions={<Button>New invoice</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Outstanding" value={inr(outstanding)} icon={IndianRupee} hint="to collect" />
        <StatCard label="Total GST (MTD)" value={gstSummary.totalGst} icon={FileSpreadsheet} hint="collected" />
        <StatCard label="Overdue invoices" value={String(overdue)} icon={AlertTriangle} hint="follow up" />
        <StatCard label="Avg collection" value="18 days" icon={Clock} delta="3 days" positive hint="faster" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Invoices</CardTitle>
            <CardDescription>Recent billing across customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">GST</TableHead>
                    <TableHead>Due</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((i) => (
                    <TableRow key={i.id}>
                      <TableCell className="font-mono text-xs font-medium">{i.id}</TableCell>
                      <TableCell>{i.customer}</TableCell>
                      <TableCell className="text-right font-mono">{inr(i.amount)}</TableCell>
                      <TableCell className="text-right font-mono text-muted-foreground">
                        {inr(i.gst)}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{i.dueDate}</TableCell>
                      <TableCell>
                        <Badge variant={statusVariant[i.status]} className="capitalize">
                          {i.status}
                        </Badge>
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
            <CardTitle>GST summary</CardTitle>
            <CardDescription>{gstSummary.filingStatus}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {[
              ["Taxable value", gstSummary.taxableValue],
              ["CGST", gstSummary.cgst],
              ["SGST", gstSummary.sgst],
              ["IGST", gstSummary.igst],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{k}</span>
                <span className="font-mono font-medium">{v}</span>
              </div>
            ))}
            <Separator />
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total GST</span>
              <span className="font-mono text-lg font-semibold text-accent">
                {gstSummary.totalGst}
              </span>
            </div>
            <Button className="mt-2 w-full">Prepare GSTR-1</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
