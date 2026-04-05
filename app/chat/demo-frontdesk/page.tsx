"use client"

import { useMemo, useState } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Send, ArrowLeft, Calendar, Clock, User } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function DemoFrontDeskPage() {
  const [input, setInput] = useState("")
  
  const transport = useMemo(() => new DefaultChatTransport({
    api: "/api/chat/demo",
  }), [])

  const { messages, sendMessage, status } = useChat({
    transport,
  })

  const isLoading = status === "streaming" || status === "submitted"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput("")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <Brain className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">Demo Front Desk</span>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-32 px-6">
        <div className="mx-auto max-w-2xl">
          {/* Info Cards */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Appointments</p>
                  <p className="font-semibold">Book & Manage</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 flex items-center gap-3">
                <Clock className="h-5 w-5 text-accent" />
                <div>
                  <p className="text-xs text-muted-foreground">Hours</p>
                  <p className="font-semibold">24/7 Available</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4 flex items-center gap-3">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">AI Agent</p>
                  <p className="font-semibold">Always Ready</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="border-b border-border/40">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                Virtual Receptionist
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 mb-4">
                      <Brain className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">Welcome to Our Front Desk</h3>
                    <p className="text-sm text-muted-foreground max-w-sm">
                      I can help you book appointments, answer questions about our services, 
                      or connect you with the right team member.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4 justify-center">
                      {["Book an appointment", "What services do you offer?", "Office hours?"].map((suggestion) => (
                        <Button
                          key={suggestion}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => {
                            setInput(suggestion)
                          }}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  messages.map((message) => {
                    const text = message.parts
                      ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
                      .map((p) => p.text)
                      .join("") || ""
                    
                    return (
                      <div
                        key={message.id}
                        className={cn(
                          "flex",
                          message.role === "user" ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[80%] rounded-2xl px-4 py-2",
                            message.role === "user"
                              ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                              : "bg-muted"
                          )}
                        >
                          <p className="text-sm whitespace-pre-wrap">{text}</p>
                        </div>
                      </div>
                    )
                  })
                )}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl px-4 py-2">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Input */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border/40 bg-background/80 backdrop-blur-xl p-4">
        <form onSubmit={handleSubmit} className="mx-auto max-w-2xl flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-card/50"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
