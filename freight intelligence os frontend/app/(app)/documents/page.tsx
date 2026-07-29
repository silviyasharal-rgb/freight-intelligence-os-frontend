import { FileText, Download, CheckCircle2, Clock3 } from "lucide-react"

import { PageIntro, StatCard } from "@/components/dashboard/kit"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DocumentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageIntro
        title="Documents"
        description="Access permits, invoices, contracts, and compliance files in one place."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total files" value="128" icon={FileText} hint="stored" />
        <StatCard label="Uploaded today" value="12" icon={Download} hint="recent" />
        <StatCard label="Pending review" value="4" icon={Clock3} hint="needs action" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent documents</CardTitle>
          <CardDescription>Latest uploaded files and their status.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { title: "GST invoice", status: "Verified" },
            { title: "Permit copy", status: "Pending" },
            { title: "Insurance certificate", status: "Verified" },
          ].map((item) => (
            <div key={item.title} className="flex items-center justify-between rounded-lg border border-border bg-background/70 p-3">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">Stored in operations vault</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="size-4" />
                {item.status}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
