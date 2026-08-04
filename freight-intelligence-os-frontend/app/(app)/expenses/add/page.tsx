"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function AddExpensePage() {
  const router = useRouter()

  const [type, setType] = useState("")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState("")

  async function addExpense() {
    const res = await fetch("/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        amount,
        date,
      }),
    })

    if (res.ok) {
      router.push("/expenses")
    } else {
      alert("Failed to save expense")
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Add Expense</h1>

      <div className="mt-6 space-y-4">
        <input
          className="border p-2 rounded w-full"
          placeholder="Expense Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />

        <input
          className="border p-2 rounded w-full"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="date"
          className="border p-2 rounded w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <Button onClick={addExpense}>
          Save Expense
        </Button>
      </div>
    </div>
  )
}