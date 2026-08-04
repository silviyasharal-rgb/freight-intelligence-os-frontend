"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function AddDriverPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [licenseNo, setLicenseNo] = useState("")
  const [status, setStatus] = useState("idle")

  async function saveDriver() {
    await fetch("/api/drivers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        licenseNo,
        status,
      }),
    })

    router.push("/drivers")
  }

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Add Driver</h1>

      <div className="space-y-4">
        <input
          className="border p-2 rounded w-full"
          placeholder="Driver Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 rounded w-full"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="border p-2 rounded w-full"
          placeholder="License Number"
          value={licenseNo}
          onChange={(e) => setLicenseNo(e.target.value)}
        />

        <input
          className="border p-2 rounded w-full"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />

        <Button onClick={saveDriver}>
          Save Driver
        </Button>
      </div>
    </div>
  )
}