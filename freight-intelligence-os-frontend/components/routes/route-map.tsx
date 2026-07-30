"use client"

import dynamic from "next/dynamic"
import type { RouteStop } from "@/lib/mock-data"

const Inner = dynamic(() => import("@/components/routes/route-map-inner"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-muted text-sm text-muted-foreground">
      Loading route…
    </div>
  ),
})

export function RouteMap({ stops }: { stops: RouteStop[] }) {
  return <Inner stops={stops} />
}
