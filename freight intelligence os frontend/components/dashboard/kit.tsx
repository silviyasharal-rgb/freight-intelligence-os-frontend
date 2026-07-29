import type { ReactNode } from "react"
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

export function PageIntro({
  title,
  description,
  actions,
}: {
  title: string
  description: string
  actions?: ReactNode
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-bold tracking-tight text-foreground text-balance md:text-2xl">
          {title}
        </h2>
        <p className="max-w-2xl text-sm text-muted-foreground text-pretty">{description}</p>
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  )
}

export function StatCard({
  label,
  value,
  delta,
  positive,
  hint,
  icon: Icon,
}: {
  label: string
  value: string
  delta?: string
  positive?: boolean
  hint?: string
  icon?: LucideIcon
}) {
  return (
    <Card>
      <CardContent className="flex flex-col gap-2 p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          {Icon ? (
            <span className="flex size-8 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
              <Icon className="size-4" />
            </span>
          ) : null}
        </div>
        <div className="flex items-end gap-2">
          <span className="font-mono text-2xl font-semibold tracking-tight text-foreground">
            {value}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {delta ? (
            <span
              className={cn(
                "flex items-center gap-0.5 text-xs font-medium",
                positive ? "text-emerald-600" : "text-destructive",
              )}
            >
              {positive ? (
                <ArrowUpRight className="size-3.5" />
              ) : (
                <ArrowDownRight className="size-3.5" />
              )}
              {delta}
            </span>
          ) : null}
          {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
        </div>
      </CardContent>
    </Card>
  )
}
