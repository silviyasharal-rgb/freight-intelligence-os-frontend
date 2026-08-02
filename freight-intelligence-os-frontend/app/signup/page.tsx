"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "@/lib/firebase";
export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("driver");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
async function handleSignup(e: React.FormEvent) {
  e.preventDefault();
  setError("");

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  setLoading(true);

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await setDoc(doc(db, "users", userCredential.user.uid), {
      name,
      email,
      phone,
      role,
      createdAt: new Date().toISOString(),
    });

    alert("Account created successfully!");

    router.push("/login");
  } catch (error: any) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
}
 return (
  <div className="flex items-center justify-center min-h-screen">
    <form
      onSubmit={handleSignup}
      className="w-full max-w-md p-6 border rounded-lg shadow-lg space-y-4"
    >
      <h1 className="text-2xl font-bold text-center">Create Account</h1>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="driver">Driver</option>
        <option value="fleet_owner">Fleet Owner</option>
      </select>

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full border p-2 rounded"
      />

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  </div>
);
}
   