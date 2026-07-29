import { NextResponse } from "next/server"

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

export async function POST(request: Request) {
  if (!OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "Missing OPENAI_API_KEY. Set it in your environment variables." },
      { status: 500 },
    )
  }

  const formData = await request.formData().catch(() => null)
  if (!formData) {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 })
  }

  const file = formData.get("file")
  const messages = formData.get("messages")
  const language = formData.get("language")

  if (!(file instanceof Blob) || typeof messages !== "string") {
    return NextResponse.json({ error: "Missing file or messages." }, { status: 400 })
  }

  const transcriptResponse = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: (() => {
      const data = new FormData()
      data.append("file", file)
      data.append("model", "gpt-4o-mini-transcribe")
      if (typeof language === "string" && language !== "auto") {
        data.append("language", language)
      }
      return data
    })(),
  })

  const transcriptData = await transcriptResponse.json()
  if (!transcriptResponse.ok) {
    return NextResponse.json(
      { error: transcriptData.error?.message || "Transcription failed." },
      { status: transcriptResponse.status },
    )
  }

  const transcript = transcriptData.text

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [...JSON.parse(messages), { role: "user", content: transcript }],
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
  return NextResponse.json({ transcript, message: message ?? "No response from OpenAI." })
}
