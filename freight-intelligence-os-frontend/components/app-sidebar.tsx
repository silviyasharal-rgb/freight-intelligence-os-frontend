"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Truck } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { company } from "@/lib/mock-data"
import { navGroups } from "@/lib/navigation"
import { Button } from "@/components/ui/button"

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-3 px-2 py-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Truck className="size-5" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base font-bold text-sidebar-foreground">{company.name}</span>
            <span className="text-xs text-sidebar-foreground/60">{company.tagline}</span>
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {navGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href)
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        isActive={active}
                        tooltip={item.title}
                        render={<Link href={item.href} />}
                        className={
                          item.href === "/assistant"
                            ? "bg-teal-700 text-white hover:bg-teal-600 data-active:bg-teal-700"
                            : undefined
                        }
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                      {item.badge ? (
                        <SidebarMenuBadge
                          className={
                            item.href === "/assistant"
                              ? "bg-teal-600 text-white"
                              : "bg-sidebar-primary text-sidebar-primary-foreground"
                          }
                        >
                          {item.badge}
                        </SidebarMenuBadge>
                      ) : null}
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-2">
          <Avatar className="size-9">
            <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground text-xs font-semibold">
              RS
            </AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-sm font-medium text-sidebar-foreground">
              {company.fleetName}
            </span>
            <span className="truncate text-xs text-sidebar-foreground/60">Fleet Owner · Admin</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                try {
                  localStorage.removeItem("authToken")
                  localStorage.removeItem("authUser")
                } catch (e) {
                  // ignore
                }
                location.href = "/login"
              }}
            >
              Sign out
            </Button>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
