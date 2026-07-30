import { Radio } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { PageIntro } from "@/components/dashboard/kit"
import { TrackingView } from "@/components/tracking/tracking-view"

export default function TrackingPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageIntro
        title="Live GPS Tracking"
        description="Real-time position, speed, and fuel telemetry for every vehicle in your fleet, streamed onto a live map."
        actions={
          <Badge variant="secondary" className="gap-1.5">
            <Radio className="size-3 animate-pulse text-emerald-500" />
            Live · updated 4s ago
          </Badge>
        }
      />
      <TrackingView />
    </div>
  )
}
