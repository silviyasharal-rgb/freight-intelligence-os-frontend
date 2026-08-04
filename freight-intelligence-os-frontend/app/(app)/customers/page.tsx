"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Building2, Star, IndianRupee, Boxes } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PageIntro, StatCard } from "@/components/dashboard/kit"
import { inr } from "@/lib/mock-data"

export default function CustomersPage() {
  const router = useRouter()

  const [customers, setCustomers] = useState<any[]>([])

  useEffect(() => {
    async function fetchCustomers() {
      const res = await fetch("/api/customers")
      const data = await res.json()
      setCustomers(data)
    }

    fetchCustomers()
  }, [])

  const outstanding = 0
  const activeLoads = 0
  return (
    <div className="flex flex-col gap-6">
      <PageIntro
        title="Customers"
        description="Manage shippers, track receivables and monitor relationship health."
        actions={
  <Button onClick={() => router.push("/customers/add")}>
    Add Customer
  </Button>
}
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
    <TableHead>Company</TableHead>
    <TableHead>Phone</TableHead>
  </TableRow>
</TableHeader>
              <TableBody>
                {customers.map((c) => (
  <TableRow key={c.id}>
    <TableCell>{c.name}</TableCell>
    <TableCell>{c.company}</TableCell>
    <TableCell>{c.phone}</TableCell>
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
