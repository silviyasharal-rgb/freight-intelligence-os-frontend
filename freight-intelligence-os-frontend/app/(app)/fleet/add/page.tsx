"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function AddVehiclePage() {
  const router = useRouter()

  const [regNo, setRegNo] = useState("")
  const [driver, setDriver] = useState("")
  const [status, setStatus] = useState("idle")

  async function addVehicle() {
    await fetch("/api/vehicles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        regNo,
        driver,
        status,
      }),
    })

    router.push("/fleet")
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Add Vehicle</h1>

      <div className="mt-6 space-y-4">
        <input
          className="border p-2 rounded w-full"
          placeholder="Vehicle Number"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
        />

        <input
          className="border p-2 rounded w-full"
          placeholder="Driver Name"
          value={driver}
          onChange={(e) => setDriver(e.target.value)}
        />

        <input
          className="border p-2 rounded w-full"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />

        <Button onClick={addVehicle}>
          Save Vehicle
        </Button>
      </div>
    </div>
  )
}