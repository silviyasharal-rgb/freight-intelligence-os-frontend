"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { MessageCircle, Mic, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PageIntro } from "@/components/dashboard/kit"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
  audioUrl?: string
}

const initialMessages: ChatMessage[] = [
  {
    role: "assistant",
    content:
      "Hello! I can help with fleet, routes, drivers, and operational intelligence. Ask me anything.",
  },
]

const languages = [
  { value: "auto", label: "Auto detect" },
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "zh", label: "Chinese" },
  { value: "ar", label: "Arabic" },
  { value: "pt", label: "Portuguese" },
  { value: "ru", label: "Russian" },
]

export default function AssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [input, setInput] = useState("")
  const [language, setLanguage] = useState("auto")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [recording, setRecording] = useState(false)
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null)
  const [speakResponses, setSpeakResponses] = useState(true)
  const [geoData, setGeoData] = useState<string | null>(null)
  const [motionData, setMotionData] = useState<string | null>(null)
  const [motionActive, setMotionActive] = useState(false)
  const [sensorError, setSensorError] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<BlobPart[]>([])
  const motionListenerRef = useRef<(event: DeviceMotionEvent) => void | null>(null)

  useEffect(() => {
    return () => {
      if (recordedUrl) {
        URL.revokeObjectURL(recordedUrl)
      }
    }
  }, [recordedUrl])

  useEffect(() => {
    if (!speakResponses) return
    if (typeof window === "undefined") return
    const utterance = new SpeechSynthesisUtterance()
    const lastMessage = messages[messages.length - 1]
    if (!lastMessage || lastMessage.role !== "assistant") return

    utterance.text = lastMessage.content
    utterance.lang = language === "auto" ? "en-US" : language
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }, [messages, speakResponses, language])

  const selectedLanguage = languages.find((lang) => lang.value === language)?.label ?? "Auto detect"

  const conversation = useMemo(
    () => [
      {
        role: "system",
        content:
          language === "auto"
            ? "You are an AI assistant for freight operations. Answer in the user's language when possible."
            : `You are an AI assistant for freight operations. Answer in ${selectedLanguage}.`,
      },
      ...messages.map((message) => ({ role: message.role, content: message.content })),
    ],
    [language, messages, selectedLanguage],
  )

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: "user" as const, content: input.trim() }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...conversation, userMessage] }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "Failed to get assistant response.")
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.message }])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  async function handleVoiceRecording() {
    if (recording) {
      mediaRecorderRef.current?.stop()
      setRecording(false)
      return
    }

    setError(null)

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      audioChunksRef.current = []
      const recorder = new MediaRecorder(stream)
      mediaRecorderRef.current = recorder

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      recorder.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" })
        const audioUrl = URL.createObjectURL(blob)
        setRecordedUrl(audioUrl)

        const formData = new FormData()
        formData.append("file", blob, "voice.webm")
        formData.append("messages", JSON.stringify(conversation))
        if (language !== "auto") {
          formData.append("language", language)
        }

        setLoading(true)
        try {
          const response = await fetch("/api/assistant-voice", {
            method: "POST",
            body: formData,
          })

          const data = await response.json()
          if (!response.ok) {
            throw new Error(data.error || "Voice assistant request failed.")
          }

          setMessages((prev) => [
            ...prev,
            {
              role: "user",
              content: data.transcript,
              audioUrl,
            },
            {
              role: "assistant",
              content: data.message,
            },
          ])
        } catch (err) {
          setError(err instanceof Error ? err.message : "Unknown error")
        } finally {
          setLoading(false)
        }
      }

      recorder.start()
      setRecording(true)
    } catch (err) {
      setError("Voice recording is not supported or permission was denied.")
    }
  }

  function startMotionTracking() {
    setSensorError(null)
    if (motionActive) return

    if (!window.DeviceMotionEvent) {
      setSensorError("Device motion is not available in this browser.")
      return
    }

    const handler = (event: DeviceMotionEvent) => {
      const acc = event.accelerationIncludingGravity
      if (!acc) return

      const payload = {
        x: acc.x?.toFixed(2) ?? 0,
        y: acc.y?.toFixed(2) ?? 0,
        z: acc.z?.toFixed(2) ?? 0,
        interval: event.interval,
      }
      setMotionData(JSON.stringify(payload))
    }

    motionListenerRef.current = handler
    window.addEventListener("devicemotion", handler)
    setMotionActive(true)
  }

  function stopMotionTracking() {
    if (motionListenerRef.current) {
      window.removeEventListener("devicemotion", motionListenerRef.current)
      motionListenerRef.current = null
    }
    setMotionActive(false)
  }

  function requestGeolocation() {
    setSensorError(null)
    if (!navigator.geolocation) {
      setSensorError("Geolocation is not available in this browser.")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = position.coords
        setGeoData(`lat:${coords.latitude.toFixed(5)} lon:${coords.longitude.toFixed(5)} acc:${coords.accuracy.toFixed(1)}`)
      },
      (err) => {
        setSensorError(err.message || "Unable to get location.")
      },
    )
  }

  function sendSensorData() {
    const sensorMessage = [`Geolocation: ${geoData ?? "not available"}`, `Motion: ${motionData ?? "not available"}`].join("\n")
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: `Sensor data:\n${sensorMessage}`,
      },
    ])
  }

  return (
    <div className="flex flex-col gap-6 rounded-3xl bg-teal-50/80 p-6">
      <PageIntro
        title="Freight Operations AI Assistant"
        description="Ask operational questions, get recommendations, or explore intelligent insights across your freight network."
        actions={
          <Button variant="secondary" className="gap-2 bg-teal-600 text-white hover:bg-teal-700" disabled={loading}>
            <Sparkles className="size-4" />
            {loading ? "Thinking…" : "Ask a question"}
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <Card className="min-h-[480px] border border-teal-200 bg-teal-50/80 shadow-sm">
          <CardHeader>
            <CardTitle>Chat</CardTitle>
            <CardDescription>Start a conversation with the AI assistant.</CardDescription>
          </CardHeader>
          <CardContent className="flex h-[560px] flex-col gap-4 p-4">
            <div className="flex-1 space-y-4 overflow-y-auto pr-2">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`rounded-2xl p-4 ${
                    message.role === "assistant"
                      ? "bg-secondary/10 text-foreground"
                      : "bg-primary/10 text-foreground"
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                    {message.role}
                  </p>
                  <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                  {message.audioUrl ? (
                    <audio
                      controls
                      className="mt-3 w-full rounded-xl border border-border bg-background p-1"
                      src={message.audioUrl}
                    />
                  ) : null}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="grid gap-3 sm:grid-cols-[1fr_180px_auto]">
                <Input
                  placeholder="Ask about routes, drivers, costs, or loads"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                />
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger size="sm" className="w-full">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="submit" disabled={loading || !input.trim()} className="gap-2">
                  <MessageCircle className="size-4" />
                  Send
                </Button>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                  Voice and chat support languages: {selectedLanguage}.
                </p>
                <label className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Speak responses</span>
                  <Switch
                    checked={speakResponses}
                    onCheckedChange={(value) => setSpeakResponses(Boolean(value))}
                    size="sm"
                  />
                </label>
              </div>
              <Button
                type="button"
                variant="outline"
                className="mt-2 gap-2"
                onClick={handleVoiceRecording}
                disabled={loading}
              >
                <Mic className="size-4" />
                {recording ? "Stop recording" : "Record voice message"}
              </Button>
              {error ? <p className="text-sm text-destructive">{error}</p> : null}
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sensor Options</CardTitle>
              <CardDescription>Collect device sensor data on demand.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">Geolocation</span>
                  <Button type="button" size="sm" className="bg-slate-800 text-white hover:bg-slate-900" onClick={requestGeolocation}>
                    Get location
                  </Button>
                </div>
                <p className="rounded-xl border border-border bg-background/80 p-3 text-xs text-foreground">{geoData ?? "No location captured yet."}</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">Motion tracking</span>
                  <Button
                    type="button"
                    size="sm"
                    className="bg-slate-800 text-white hover:bg-slate-900"
                    onClick={motionActive ? stopMotionTracking : startMotionTracking}
                  >
                    {motionActive ? "Stop motion" : "Start motion"}
                  </Button>
                </div>
                <p className="rounded-xl border border-border bg-background/80 p-3 text-xs text-foreground">{motionData ?? "No motion data captured yet."}</p>
              </div>
              <Button type="button" className="w-full gap-2" onClick={sendSensorData} disabled={!geoData && !motionData}>
                Send sensor data to assistant
              </Button>
              {sensorError ? <p className="text-sm text-destructive">{sensorError}</p> : null}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Usage Tips</CardTitle>
              <CardDescription>Try these example prompts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>• Which loads should be prioritized this week?</p>
              <p>• Summarize the risk for vehicles in maintenance.</p>
              <p>• What are the best backhaul opportunities from Delhi?</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>How it works</CardTitle>
              <CardDescription>Powered by OpenAI via a backend API route.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                Set `OPENAI_API_KEY` in your environment, then reload the page. The assistant sends your query to OpenAI and returns the response here.
              </p>
              <p>
                Keep prompts specific to fleet operations for the best responses.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
