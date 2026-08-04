"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function ExpensesPage() {
  const router = useRouter()
  const [expenses, setExpenses] = useState<any[]>([])

  useEffect(() => {
    async function fetchExpenses() {
      const res = await fetch("/api/expenses")
      const data = await res.json()
      setExpenses(data)
    }

    fetchExpenses()
  }, [])

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Expenses</h1>

        <Button onClick={() => router.push("/expenses/add")}>
          Add Expense
        </Button>
      </div>

      <div className="mt-6 space-y-3">
        {expenses.length === 0 ? (
          <p>No expenses found.</p>
        ) : (
          expenses.map((expense: any) => (
            <div
              key={expense.id}
              className="border rounded p-4 flex justify-between"
            >
              <div>
                <p className="font-semibold">{expense.type}</p>
                <p>{expense.date}</p>
              </div>

              <p>₹{expense.amount}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}