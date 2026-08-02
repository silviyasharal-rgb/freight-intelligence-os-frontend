"use client";

import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      <p className="mb-4 text-muted-foreground">
        Manage your account settings.
      </p>

      <Button>
        Logout
      </Button>
    </div>
  );
}