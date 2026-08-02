"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function SettingPage() {

  const router = useRouter();
async function handleLogout() {
  await signOut(auth);

  localStorage.removeItem("authToken");
  localStorage.removeItem("authUser");
  localStorage.removeItem("user");

  router.push("/login");
}
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      <Button onClick={handleLogout}>
  Logout
</Button>
    </div>
  );
}