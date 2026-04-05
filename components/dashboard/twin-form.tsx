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
import { Badge } from '@/components/ui/badge'
import { Loader2, X } from 'lucide-react'
import type { Twin } from '@/lib/types'

interface TwinFormProps {
  twin?: Twin
}

const PERSONALITY_TRAITS = [
  'Friendly', 'Professional', 'Casual', 'Formal', 'Empathetic',
  'Direct', 'Humorous', 'Serious', 'Patient', 'Enthusiastic',
  'Analytical', 'Creative', 'Supportive', 'Confident', 'Approachable'
]

const COMMUNICATION_STYLES = [
  'Conversational', 'Technical', 'Storytelling', 'Educational',
  'Consultative', 'Supportive', 'Brief', 'Detailed'
]

export function TwinForm({ twin }: TwinFormProps) {
  const [name, setName] = useState(twin?.name || '')
  const [bio, setBio] = useState(twin?.bio || '')
  const [tone, setTone] = useState(twin?.personality?.tone || '')
  const [style, setStyle] = useState(twin?.personality?.style || '')
  const [traits, setTraits] = useState<string[]>(twin?.personality?.traits || [])
  const [background, setBackground] = useState(twin?.cheat_sheet?.background || '')
  const [expertise, setExpertise] = useState<string[]>(twin?.cheat_sheet?.expertise || [])
  const [newExpertise, setNewExpertise] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const router = useRouter()
  const supabase = createClient()

  const toggleTrait = (trait: string) => {
    setTraits(prev =>
      prev.includes(trait)
        ? prev.filter(t => t !== trait)
        : [...prev, trait]
    )
  }

  const addExpertise = () => {
    if (newExpertise.trim() && !expertise.includes(newExpertise.trim())) {
      setExpertise([...expertise, newExpertise.trim()])
      setNewExpertise('')
    }
  }

  const removeExpertise = (item: string) => {
    setExpertise(expertise.filter(e => e !== item))
  }

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
        bio: bio || null,
        personality: { tone, style, traits },
        cheat_sheet: { background, expertise },
        profile_id: user.id,
        company_id: profile.company_id,
      }

      if (twin) {
        const { error } = await supabase
          .from('twins')
          .update(payload)
          .eq('id', twin.id)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('twins')
          .insert(payload)
        if (error) throw error
      }

      router.push('/dashboard/twins')
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
            Give your AI twin a name and bio
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Sarah Johnson"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Senior Sales Manager with 10 years of experience..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personality</CardTitle>
          <CardDescription>
            Define how your AI twin communicates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="warm">Warm & Welcoming</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual & Relaxed</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="energetic">Energetic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Communication Style</Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a style" />
                </SelectTrigger>
                <SelectContent>
                  {COMMUNICATION_STYLES.map(s => (
                    <SelectItem key={s} value={s.toLowerCase()}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Personality Traits (Select up to 5)</Label>
            <div className="flex flex-wrap gap-2">
              {PERSONALITY_TRAITS.map(trait => (
                <Badge
                  key={trait}
                  variant={traits.includes(trait) ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => {
                    if (traits.length < 5 || traits.includes(trait)) {
                      toggleTrait(trait)
                    }
                  }}
                >
                  {trait}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cheat Sheet</CardTitle>
          <CardDescription>
            Background information for more authentic responses
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="background">Background</Label>
            <Textarea
              id="background"
              placeholder="Started career at XYZ Corp, specializes in enterprise sales..."
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Areas of Expertise</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add expertise area"
                value={newExpertise}
                onChange={(e) => setNewExpertise(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExpertise())}
              />
              <Button type="button" variant="outline" onClick={addExpertise}>
                Add
              </Button>
            </div>
            {expertise.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {expertise.map(item => (
                  <Badge key={item} variant="secondary" className="gap-1">
                    {item}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => removeExpertise(item)}
                    />
                  </Badge>
                ))}
              </div>
            )}
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
              {twin ? 'Saving...' : 'Creating...'}
            </>
          ) : (
            twin ? 'Save Changes' : 'Create AI Twin'
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
