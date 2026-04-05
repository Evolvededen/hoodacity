import { streamText, convertToModelMessages, UIMessage } from 'ai'

const DEMO_RESPONSES = [
  "Welcome to Luxe Wellness Spa & Medical Center! I'm Zuri, your AI receptionist. How may I assist you today?",
  "I'd be happy to help you book an appointment. We offer Massage Therapy, Facial Treatments, Medical Consultations, Wellness Coaching, and IV Therapy. Which service interests you?",
  "Our business hours are Monday-Friday 8am-8pm, Saturday 9am-6pm, and Sunday 10am-4pm. Would you like to schedule a visit?",
  "To complete your booking, I'll need your full name, phone number, preferred service, and your ideal date and time. What works best for you?",
  "Thank you for your interest! Our team will follow up shortly to confirm your appointment. Is there anything else I can help you with?",
]

export async function POST(req: Request) {
  const { messages } = await req.json() as { messages: UIMessage[] }

  const systemPrompt = `You are a friendly and professional AI receptionist for a modern business called "Luxe Wellness Spa & Medical Center". 

Your role is to:
- Greet visitors warmly and professionally
- Help book appointments for various services
- Answer questions about services, pricing, and hours
- Collect visitor information when needed
- Direct complex inquiries to the appropriate human staff

Available Services:
- Massage Therapy ($80-150/session)
- Facial Treatments ($95-200)
- Medical Consultations ($150-300)
- Wellness Coaching ($120/hour)
- IV Therapy ($175-350)

Business Hours:
- Monday-Friday: 8am - 8pm
- Saturday: 9am - 6pm
- Sunday: 10am - 4pm

When booking appointments, collect:
1. Full name
2. Phone number
3. Preferred service
4. Preferred date/time
5. Any special requests

Be concise, helpful, and maintain a luxury brand voice. Use a warm but professional tone.`

  try {
    const result = streamText({
      model: 'openai/gpt-4o-mini',
      system: systemPrompt,
      messages: await convertToModelMessages(messages),
      temperature: 0.7,
      maxTokens: 500,
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    // Fallback to demo responses when AI Gateway is unavailable
    console.log('[v0] AI Gateway unavailable, using demo response')
    
    const messageCount = messages.length
    const demoResponse = DEMO_RESPONSES[Math.min(messageCount - 1, DEMO_RESPONSES.length - 1)]
    
    // Create a streaming response that mimics the AI SDK format
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        // Send the response as a proper UI message stream
        const messageData = {
          type: 'text',
          value: demoResponse,
        }
        controller.enqueue(encoder.encode(`0:${JSON.stringify(messageData)}\n`))
        
        // Send finish message
        const finishData = {
          type: 'finish',
          finishReason: 'stop',
        }
        controller.enqueue(encoder.encode(`d:${JSON.stringify(finishData)}\n`))
        controller.close()
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Vercel-AI-Data-Stream': 'v1',
      },
    })
  }
}
