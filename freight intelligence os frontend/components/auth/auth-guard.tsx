"use client"

import { ReactNode, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

export default function AuthGuard({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const publicPaths = ["/login", "/_next", "/api"]
    // allow next internal assets and api routes
    if (publicPaths.some((p) => pathname?.startsWith(p))) return

    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null
    if (!token) {
      router.push("/login")
    }
  }, [pathname, router])

  return <>{children}</>
}
