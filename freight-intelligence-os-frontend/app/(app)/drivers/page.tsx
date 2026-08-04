"use client"
import { useEffect, useState } from "react"
import { Users, ShieldCheck, Clock3, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { PageIntro, StatCard } from "@/components/dashboard/kit"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DriversPage() {
  const router = useRouter()

const [drivers, setDrivers] = useState<any[]>([])

useEffect(() => {
  async function fetchDrivers() {
    const res = await fetch("/api/drivers")
    const data = await res.json()
    setDrivers(data)
  }

  fetchDrivers()
}, [])
  return (
    <div className="flex flex-col gap-6">
      <PageIntro
        title="Drivers"
        description="Monitor driver availability, compliance status, and active assignments from one place."
        actions={
  <Button onClick={() => router.push("/drivers/add")}>
    Add Driver
  </Button>
}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Active drivers" value="24" icon={Users} hint="on shift" />
        <StatCard label="Compliant" value="22" icon={ShieldCheck} hint="ready to dispatch" />
        <StatCard label="Pending checks" value="2" icon={Clock3} hint="today" />
      </div>

      <Card>
  <CardHeader>
    <CardTitle>Driver roster</CardTitle>
    <CardDescription>
      Keep dispatch and compliance information current.
    </CardDescription>
  </CardHeader>

  <CardContent className="space-y-3">
    {drivers.map((driver) => (
      <div
        key={driver.id}
        className="flex items-center justify-between rounded-lg border border-border bg-background/70 p-3"
      >
        <div>
          <p className="font-medium">{driver.name}</p>
          <p className="text-sm text-muted-foreground">
            {driver.phone}
          </p>
          <p className="text-sm text-muted-foreground">
            License: {driver.licenseNo}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <AlertCircle className="size-4" />
          {driver.status}
        </div>
      </div>
    ))}
  </CardContent>
</Card>
    </div>
  )
}
