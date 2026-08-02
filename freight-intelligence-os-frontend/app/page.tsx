"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("authToken") ||
          localStorage.getItem("authUser") ||
          localStorage.getItem("user")
        : null

    router.replace(token ? "/loads" : "/login")
  }, [router])

  return null
}