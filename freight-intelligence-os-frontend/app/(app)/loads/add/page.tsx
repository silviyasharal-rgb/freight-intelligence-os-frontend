"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function AddLoadPage() {
  const router = useRouter()

  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [rate, setRate] = useState("")
  const [status, setStatus] = useState("Open")

  async function addLoad() {
    await fetch("/api/loads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
        rate: Number(rate),
        status,
      }),
    })

    router.push("/loads")
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Add Load</h1>

      <div className="mt-6 space-y-4">
        <input
          className="border p-2 rounded w-full"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />

        <input
          className="border p-2 rounded w-full"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        <input
          className="border p-2 rounded w-full"
          placeholder="Rate"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />

        <input
          className="border p-2 rounded w-full"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />

        <Button onClick={addLoad}>
          Save Load
        </Button>
      </div>
    </div>
  )
}