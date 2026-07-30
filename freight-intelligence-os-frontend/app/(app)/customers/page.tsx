import { Building2, Star, IndianRupee, Boxes } from "lucide-react"

import { PageIntro, StatCard } from "@/components/dashboard/kit"
import { customers, inr } from "@/lib/mock-data"
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

export default function CustomersPage() {
  const outstanding = customers.reduce((a, c) => a + c.outstanding, 0)
  const activeLoads = customers.reduce((a, c) => a + c.activeLoads, 0)

  return (
    <div className="flex flex-col gap-6">
      <PageIntro
        title="Customers"
        description="Manage shippers, track receivables and monitor relationship health."
        actions={<Button>Add customer</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total customers" value={String(customers.length)} icon={Building2} hint="active accounts" />
        <StatCard label="Active loads" value={String(activeLoads)} icon={Boxes} hint="in progress" />
        <StatCard label="Total outstanding" value={inr(outstanding)} icon={IndianRupee} hint="receivables" />
        <StatCard label="Avg rating" value="4.7" icon={Star} hint="satisfaction" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer directory</CardTitle>
          <CardDescription>All shippers and their account status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead className="text-right">Active</TableHead>
                  <TableHead className="text-right">Business</TableHead>
                  <TableHead className="text-right">Outstanding</TableHead>
                  <TableHead className="text-right">Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>
                      <div className="font-medium">{c.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {c.contact} · since {c.since}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{c.city}</TableCell>
                    <TableCell className="text-right font-mono">{c.activeLoads}</TableCell>
                    <TableCell className="text-right font-mono">{c.totalBusiness}</TableCell>
                    <TableCell className="text-right">
                      {c.outstanding > 0 ? (
                        <span className="font-mono text-destructive">{inr(c.outstanding)}</span>
                      ) : (
                        <Badge variant="secondary">Clear</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="inline-flex items-center gap-1 font-mono">
                        <Star className="size-3.5 fill-amber-400 text-amber-400" />
                        {c.rating}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
