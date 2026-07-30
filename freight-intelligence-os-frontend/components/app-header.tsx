"use client"

import { usePathname } from "next/navigation"
import { Bell, Search, ChevronDown } from "lucide-react"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { allNavItems } from "@/lib/navigation"

const roles = ["Admin", "Fleet Owner", "Dispatcher", "Driver"]

export function AppHeader() {
  const pathname = usePathname()
  const current = allNavItems.find((i) =>
    i.href === "/" ? pathname === "/" : pathname.startsWith(i.href),
  )

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b border-border bg-card/80 px-4 backdrop-blur">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-1 h-5" />
      <div className="flex flex-col leading-tight">
        <h1 className="text-sm font-semibold text-foreground md:text-base">
          {current?.title ?? "Command Center"}
        </h1>
        <p className="hidden text-xs text-muted-foreground sm:block">
          Real-time freight intelligence
        </p>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search loads, trucks, drivers…"
            className="w-56 bg-background pl-9 lg:w-72"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button variant="outline" size="sm" className="gap-1">
                Admin
                <ChevronDown className="size-3.5" />
              </Button>
            }
          />
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Switch role view</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {roles.map((role) => (
                  <DropdownMenuItem key={role}>{role}</DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="icon" className="relative">
          <Bell className="size-4" />
          <Badge className="absolute -right-1 -top-1 size-4 justify-center rounded-full p-0 text-[10px]">
            3
          </Badge>
          <span className="sr-only">Notifications</span>
        </Button>
      </div>
    </header>
  )
}
