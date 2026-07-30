import { Siren, PhoneCall, ShieldAlert, LifeBuoy } from "lucide-react"

import { PageIntro, StatCard } from "@/components/dashboard/kit"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function EmergencyPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageIntro
        title="Emergency"
        description="Coordinate incidents, dispatch assistance, and keep response contacts ready."
        actions={<Button variant="destructive">Raise alert</Button>}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Open alerts" value="2" icon={Siren} hint="active incidents" />
        <StatCard label="Support contacts" value="8" icon={PhoneCall} hint="available" />
        <StatCard label="Response ready" value="97%" icon={ShieldAlert} hint="coverage" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Incident response</CardTitle>
          <CardDescription>Fast access to escalation contacts and next steps.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { label: "Roadside assistance", detail: "Call center · 24/7" },
            { label: "Medical support", detail: "Nearest clinic · 15 min" },
            { label: "Operations desk", detail: "Dispatch coordination" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between rounded-lg border border-border bg-background/70 p-3">
              <div>
                <p className="font-medium">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.detail}</p>
              </div>
              <LifeBuoy className="size-4 text-muted-foreground" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
