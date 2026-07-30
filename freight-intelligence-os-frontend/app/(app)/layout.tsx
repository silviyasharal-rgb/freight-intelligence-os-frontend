import type { ReactNode } from "react"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import AuthGuard from "@/components/auth/auth-guard"

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <AuthGuard>
          <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">{children}</main>
        </AuthGuard>
      </SidebarInset>
    </SidebarProvider>
  )
}
