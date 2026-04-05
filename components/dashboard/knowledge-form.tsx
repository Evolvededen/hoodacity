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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileText, Link as LinkIcon, Type, Loader2, Upload } from 'lucide-react'

interface KnowledgeFormProps {
  intelligences: { id: string; name: string }[]
}

export function KnowledgeForm({ intelligences }: KnowledgeFormProps) {
  const [sourceType, setSourceType] = useState<'text' | 'url' | 'document'>('text')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [sourceUrl, setSourceUrl] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [intelligenceId, setIntelligenceId] = useState('')
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

      let finalContent = content
      let filePath = null

      // Handle file upload
      if (sourceType === 'document' && file) {
        const formData = new FormData()
        formData.append('file', file)

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (!uploadRes.ok) throw new Error('Failed to upload file')

        const { pathname, content: extractedContent } = await uploadRes.json()
        filePath = pathname
        finalContent = extractedContent || ''
      }

      // Create knowledge entry
      const { data: knowledge, error: insertError } = await supabase
        .from('knowledge')
        .insert({
          company_id: profile.company_id,
          intelligence_id: intelligenceId || null,
          title,
          content: finalContent,
          source_type: sourceType,
          source_url: sourceUrl || null,
          file_path: filePath,
          is_processed: false,
        })
        .select()
        .single()

      if (insertError) throw insertError

      // Process knowledge for embeddings
      await fetch('/api/knowledge/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ knowledgeId: knowledge.id }),
      })

      router.push('/dashboard/knowledge')
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
          <CardTitle>Source Type</CardTitle>
          <CardDescription>
            Choose how you want to add knowledge
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={sourceType} onValueChange={(v) => setSourceType(v as typeof sourceType)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="text" className="gap-2">
                <Type className="h-4 w-4" />
                Text
              </TabsTrigger>
              <TabsTrigger value="url" className="gap-2">
                <LinkIcon className="h-4 w-4" />
                URL
              </TabsTrigger>
              <TabsTrigger value="document" className="gap-2">
                <FileText className="h-4 w-4" />
                Document
              </TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="FAQ about our products"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Enter your knowledge content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={10}
                  required
                />
              </div>
            </TabsContent>

            <TabsContent value="url" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="url-title">Title</Label>
                <Input
                  id="url-title"
                  placeholder="Documentation page"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sourceUrl">URL</Label>
                <Input
                  id="sourceUrl"
                  type="url"
                  placeholder="https://example.com/docs"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  required={sourceType === 'url'}
                />
                <p className="text-xs text-muted-foreground">
                  We&apos;ll fetch and process the content from this URL
                </p>
              </div>
            </TabsContent>

            <TabsContent value="document" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="doc-title">Title</Label>
                <Input
                  id="doc-title"
                  placeholder="Product Manual"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Upload Document</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    accept=".txt,.md,.pdf,.docx"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {file ? file.name : 'Click to upload'}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      TXT, MD, PDF, or DOCX (max 10MB)
                    </span>
                  </label>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Link to Intelligence</CardTitle>
          <CardDescription>
            Optionally link this knowledge to a specific AI agent
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Select value={intelligenceId} onValueChange={setIntelligenceId}>
            <SelectTrigger>
              <SelectValue placeholder="Select an intelligence (optional)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All intelligences</SelectItem>
              {intelligences.map((int) => (
                <SelectItem key={int.id} value={int.id}>
                  {int.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground mt-2">
            If linked, only this intelligence will have access to this knowledge
          </p>
        </CardContent>
      </Card>

      {error && (
        <div className="text-destructive text-sm">{error}</div>
      )}

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={loading || !title.trim()}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : (
            'Add Knowledge'
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
