"use client"

import { useEffect, useState } from "react"
import { Lock, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
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

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("authToken") ||
          localStorage.getItem("authUser") ||
          localStorage.getItem("user")
        : null

    if (token) {
      router.replace("/loads")
    }
  }, [router])

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!email || !password) {
      setError("Please enter email and password.")
      return
    }

    setLoading(true)
    try {
      console.log("Email:", email);
      console.log("Password:", password);
      // Demo frontend-only auth: store a simple token locally.
      // Replace with real API call to authenticate against a backend.
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      localStorage.setItem("authToken", userCredential.user.uid);
      localStorage.setItem("authUser", JSON.stringify(userCredential.user));
      localStorage.setItem("user", JSON.stringify(userCredential.user));
      console.log("Logged in:", userCredential.user.email);
      console.log("Login Success");

      router.push("/");
    } catch (err: any) {
  console.error("Firebase Error:", err);
  console.error("Error Code:", err.code);
  console.error("Error Message:", err.message);

  setError(err.code);
} finally {
  setLoading(false);
}
}   // <-- handleSignIn function ends here

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
                <button
  type="button"
  className="text-right text-secondary hover:underline"
  onClick={() => router.push("/signup")}
>
  Create account
</button>
</div>
</form>
          </CardContent>        </Card>

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
