'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { QrCode, Code, Link as LinkIcon, Loader2 } from 'lucide-react'

interface DeploymentFormProps {
  intelligences: { id: string; name: string }[]
  defaultIntelligenceId?: string
}

const channels = [
  {
    id: 'qr',
    name: 'QR Code',
    description: 'Generate a QR code for physical locations',
    icon: QrCode,
  },
  {
    id: 'embed',
    name: 'Website Embed',
    description: 'Embed a chat widget on your website',
    icon: Code,
  },
  {
    id: 'link',
    name: 'Direct Link',
    description: 'Share a direct link to the chat',
    icon: LinkIcon,
  },
]

function generateAccessCode() {
  return Math.random().toString(36).substring(2, 10).toUpperCase()
}

export function DeploymentForm({ intelligences, defaultIntelligenceId }: DeploymentFormProps) {
  const [name, setName] = useState('')
  const [intelligenceId, setIntelligenceId] = useState(defaultIntelligenceId || '')
  const [channel, setChannel] = useState('link')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { data: profile } = await supabase
        .from('profiles')
        .select('company_id')
        .eq('id', user.id)
        .single()

      if (!profile?.company_id) throw new Error('No company found')

      const accessCode = generateAccessCode()

      const { data: deployment, error: insertError } = await supabase
        .from('deployments')
        .insert({
          name,
          intelligence_id: intelligenceId,
          company_id: profile.company_id,
          channel,
          access_code: accessCode,
          is_active: true,
          config: {},
        })
        .select()
        .single()

      if (insertError) throw insertError

      router.push(`/dashboard/deployments/${deployment.id}`)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Deployment Details</CardTitle>
          <CardDescription>
            Choose which intelligence to deploy and how
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Deployment Name</Label>
            <Input
              id="name"
              placeholder="Office Lobby QR"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="intelligence">Intelligence</Label>
            <Select value={intelligenceId} onValueChange={setIntelligenceId} required>
              <SelectTrigger>
                <SelectValue placeholder="Select an intelligence" />
              </SelectTrigger>
              <SelectContent>
                {intelligences.map((int) => (
                  <SelectItem key={int.id} value={int.id}>
                    {int.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {intelligences.length === 0 && (
              <p className="text-xs text-muted-foreground">
                No published intelligences found. Publish one first.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Channel</CardTitle>
          <CardDescription>
            How users will access this deployment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={channel} onValueChange={setChannel} className="grid gap-4">
            {channels.map((ch) => (
              <div key={ch.id} className="flex items-center space-x-4">
                <RadioGroupItem value={ch.id} id={ch.id} />
                <Label
                  htmlFor={ch.id}
                  className="flex flex-1 items-center gap-4 cursor-pointer"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <ch.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{ch.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {ch.description}
                    </p>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {error && (
        <div className="text-destructive text-sm">{error}</div>
      )}

      <div className="flex items-center gap-4">
        <Button
          type="submit"
          disabled={loading || !name.trim() || !intelligenceId}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </>
          ) : (
            'Create Deployment'
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
