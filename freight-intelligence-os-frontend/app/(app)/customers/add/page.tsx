"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function AddCustomerPage() {
  const router = useRouter()

  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [phone, setPhone] = useState("")

 async function addCustomer() {
  const res = await fetch("/api/customers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      company,
      phone,
    }),
  })

  console.log("Status:", res.status)

  const data = await res.json()
  console.log("Response:", data)

  if (res.ok) {
    router.push("/customers")
  } else {
    alert("Failed to save customer")
  }
} 

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Add Customer</h1>

      <div className="mt-6 space-y-4">
        <input
          className="border p-2 rounded w-full"
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border p-2 rounded w-full"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <input
          className="border p-2 rounded w-full"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <Button onClick={addCustomer}>
          Save Customer
        </Button>
      </div>
    </div>
  )
}