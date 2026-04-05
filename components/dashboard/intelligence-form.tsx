'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Loader2 } from 'lucide-react'
import type { Intelligence } from '@/lib/types'

interface IntelligenceFormProps {
  teams: { id: string; name: string }[]
  twins: { id: string; name: string }[]
  intelligence?: Intelligence
}

const MODELS = [
  { value: 'openai/gpt-4o', label: 'GPT-4o (Recommended)' },
  { value: 'openai/gpt-4o-mini', label: 'GPT-4o Mini (Fast)' },
  { value: 'anthropic/claude-3-5-sonnet', label: 'Claude 3.5 Sonnet' },
  { value: 'google/gemini-pro', label: 'Gemini Pro' },
]

export function IntelligenceForm({ teams, twins, intelligence }: IntelligenceFormProps) {
  const [name, setName] = useState(intelligence?.name || '')
  const [description, setDescription] = useState(intelligence?.description || '')
  const [systemPrompt, setSystemPrompt] = useState(intelligence?.system_prompt || '')
  const [model, setModel] = useState(intelligence?.model || 'openai/gpt-4o')
  const [temperature, setTemperature] = useState(intelligence?.temperature || 0.7)
  const [teamId, setTeamId] = useState(intelligence?.team_id || '')
  const [twinId, setTwinId] = useState(intelligence?.twin_id || '')
  const [isPublished, setIsPublished] = useState(intelligence?.is_published || false)
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

      const payload = {
        name,
        description: description || null,
        system_prompt: systemPrompt || null,
        model,
        temperature,
        team_id: teamId || null,
        twin_id: twinId || null,
        is_published: isPublished,
        company_id: profile.company_id,
        created_by: user.id,
      }

      if (intelligence) {
        const { error } = await supabase
          .from('intelligences')
          .update(payload)
          .eq('id', intelligence.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('intelligences')
          .insert(payload)

        if (error) throw error
      }

      router.push('/dashboard/intelligences')
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
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Give your intelligence a name and description
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Customer Support Agent"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="An AI agent that helps customers with common questions..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AI Configuration</CardTitle>
          <CardDescription>
            Configure the AI model and behavior
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="systemPrompt">System Prompt</Label>
            <Textarea
              id="systemPrompt"
              placeholder="You are a helpful customer support agent for..."
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              rows={6}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Instructions that define how the AI should behave
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {MODELS.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Temperature: {temperature}</Label>
              <Slider
                value={[temperature]}
                onValueChange={([v]) => setTemperature(v)}
                min={0}
                max={1}
                step={0.1}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground">
                Higher = more creative, Lower = more focused
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Organization</CardTitle>
          <CardDescription>
            Assign to a team or link to an AI twin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="team">Team (Optional)</Label>
              <Select value={teamId} onValueChange={setTeamId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No team</SelectItem>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="twin">AI Twin (Optional)</Label>
              <Select value={twinId} onValueChange={setTwinId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a twin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No twin</SelectItem>
                  {twins.map((twin) => (
                    <SelectItem key={twin.id} value={twin.id}>
                      {twin.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Publishing</CardTitle>
          <CardDescription>
            Control the visibility of this intelligence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="published">Published</Label>
              <p className="text-sm text-muted-foreground">
                Published intelligences can be deployed and accessed by users
              </p>
            </div>
            <Switch
              id="published"
              checked={isPublished}
              onCheckedChange={setIsPublished}
            />
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="text-destructive text-sm">{error}</div>
      )}

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={loading || !name.trim()}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {intelligence ? 'Saving...' : 'Creating...'}
            </>
          ) : (
            intelligence ? 'Save Changes' : 'Create Intelligence'
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
