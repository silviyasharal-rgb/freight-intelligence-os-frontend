"use client"

import { useState } from "react"
import { Lock, User } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PageIntro } from "@/components/dashboard/kit"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!email || !password) {
      setError("Please enter email and password.")
      return
    }

    setLoading(true)
    try {
      // Demo frontend-only auth: store a simple token locally.
      // Replace with real API call to authenticate against a backend.
      const token = btoa(`${email}:${Date.now()}`)
      localStorage.setItem("authToken", token)
      // optionally store user info
      localStorage.setItem("authUser", JSON.stringify({ email }))
      router.push("/")
    } catch (err) {
      setError("Sign-in failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center relative">
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-lg shadow-black/40 relative z-10 text-white">
        <PageIntro
          title="Welcome Back"
          description="Sign in to access your freight intelligence dashboard and assistant tools."
        />

        <Card className="mt-6 bg-gradient-to-br from-white/80 via-purple-100/60 to-purple-600/20 border border-white/10 text-black">
          <CardHeader className="text-black">
            <CardTitle className="text-black">Login to your account</CardTitle>
            <CardDescription className="text-black">Enter your email and password to continue.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <form onSubmit={handleSignIn} className="space-y-3">
              <label className="flex flex-col gap-2 text-sm font-medium text-muted-foreground">
                Email address
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-muted-foreground">
                Password
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>

              {error ? <p className="text-sm text-destructive">{error}</p> : null}

              <Button type="submit" className="w-full gap-2 bg-purple-600 text-white hover:bg-purple-700" disabled={loading}>
                <Lock className="size-4" />
                {loading ? "Signing in…" : "Sign in"}
              </Button>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <button type="button" className="text-left text-primary hover:underline" onClick={() => alert('Password reset flow not implemented yet')}>Forgot password?</button>
                <button type="button" className="text-right text-secondary hover:underline" onClick={() => alert('Account creation not implemented yet')}>Create account</button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-6 rounded-3xl border border-indigo-600/40 bg-indigo-900/40 p-4 text-sm text-slate-200">
          <div className="flex items-center gap-2 font-semibold text-indigo-300">
            <User className="size-4" />
            Demo access
          </div>
          <p className="mt-2 text-sm text-slate-300">
            Use any email and password — this stores a local demo token. Connect to a real auth API to replace this.
          </p>
        </div>
      </div>
    </div>
  )
}
