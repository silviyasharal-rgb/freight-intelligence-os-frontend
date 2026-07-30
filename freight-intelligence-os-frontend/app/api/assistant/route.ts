import { NextResponse } from "next/server"

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

export async function POST(request: Request) {
  if (!OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "Missing OPENAI_API_KEY. Set it in your environment variables." },
      { status: 500 },
    )
  }

  const body = await request.json().catch(() => null)
  const messages = body?.messages

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: "Request must include a messages array." },
      { status: 400 },
    )
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.2,
        max_tokens: 450,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message || "OpenAI request failed." },
        { status: response.status },
      )
    }

    const message = data.choices?.[0]?.message?.content

    return NextResponse.json({ message: message ?? "No response from OpenAI." })
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to contact OpenAI service.",
      },
      { status: 500 },
    )
  }
}
