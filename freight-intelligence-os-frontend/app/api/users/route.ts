import { NextResponse } from "next/server"

export async function POST() {
  return NextResponse.json({
    success: true,
    message: "User sync is disabled in the frontend-only demo mode.",
  })
}