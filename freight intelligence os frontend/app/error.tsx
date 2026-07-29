"use client"

import Link from 'next/link'
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(248,113,113,0.14),_transparent_55%)] px-4 py-16">
      <Card className="w-full max-w-lg border-border/60 shadow-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="size-6" />
          </div>
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Something went wrong
          </p>
          <CardTitle className="text-3xl sm:text-4xl">
            We hit an unexpected error
          </CardTitle>
          <CardDescription className="text-base">
            {error.message || 'Please try again or return to the dashboard.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button className="gap-2" onClick={() => reset()}>
            <RefreshCw className="size-4" />
            Try again
          </Button>
          <Button variant="outline" render={<Link href="/" />}>
            <ArrowLeft className="size-4" />
            Back to dashboard
          </Button>
        </CardContent>
      </Card>
    </main>
  )
}
