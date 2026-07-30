import Link from 'next/link'
import { ArrowLeft, Compass } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.14),_transparent_55%)] px-4 py-16">
      <Card className="w-full max-w-lg border-border/60 shadow-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Compass className="size-6" />
          </div>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
            404
          </p>
          <CardTitle className="text-3xl sm:text-4xl">
            This page could not be found
          </CardTitle>
          <CardDescription className="text-base">
            The route you entered may be outdated or unavailable in this workspace.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button className="gap-2" render={<Link href="/" />}>
            <ArrowLeft className="size-4" />
            Back to dashboard
          </Button>
          <Button variant="outline" render={<Link href="/tracking" />}>
            Open tracking
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
