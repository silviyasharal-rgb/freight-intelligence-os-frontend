"use client"
import { useEffect, useState } from "react"
import { Plus, Truck, Activity, CircleParking, Wrench } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PageIntro, StatCard } from "@/components/dashboard/kit"
import { FleetView } from "@/components/fleet/fleet-view"

export default function FleetPage() {
  const router = useRouter()
  const [vehicles, setVehicles] = useState<any[]>([])
  useEffect(() => {

  async function fetchVehicles() {

    const res = await fetch("/api/vehicles")

    const data = await res.json()

    setVehicles(data)

  }

  fetchVehicles()

}, [])
  const total = vehicles.length
  const onTrip = vehicles.filter((v) => v.status === "on-trip").length
  const idle = vehicles.filter((v) => v.status === "idle").length
  const maint = vehicles.filter((v) => v.status === "maintenance").length
  const avgHealth = total
  ? Math.round(
      vehicles.reduce((s, v) => s + (v.healthScore || 0), 0) / total
    )
  : 0
  return (
    <div className="flex flex-col gap-6">
      <PageIntro
        title="Fleet Management"
        description="Track every vehicle's status, health, assignment, and utilization across your fleet in one place."
        actions={
          <Button 
  className="gap-2"
  onClick={() => router.push("/fleet/add")}
>
  <Plus className="size-4" />
  Add Vehicle
</Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Total Vehicles" value={String(total)} hint={`avg health ${avgHealth}`} icon={Truck} />
        <StatCard label="On Trip" value={String(onTrip)} positive delta={`${Math.round((onTrip / total) * 100)}%`} hint="utilization" icon={Activity} />
        <StatCard label="Idle" value={String(idle)} icon={CircleParking} hint="awaiting loads" />
        <StatCard label="In Maintenance" value={String(maint)} icon={Wrench} hint="off road" />
      </div>

      <FleetView />
    </div>
  )
}
