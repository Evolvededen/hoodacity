'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Copy, Check } from 'lucide-react'

interface DeploymentEmbedProps {
  accessCode: string
}

export function DeploymentEmbed({ accessCode }: DeploymentEmbedProps) {
  const [copied, setCopied] = useState(false)

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
  
  const iframeCode = `<iframe
  src="${baseUrl}/embed/${accessCode}"
  width="400"
  height="600"
  frameborder="0"
  style="border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
></iframe>`

  const scriptCode = `<script>
  (function() {
    var script = document.createElement('script');
    script.src = '${baseUrl}/embed.js';
    script.dataset.accessCode = '${accessCode}';
    document.body.appendChild(script);
  })();
</script>`

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Embed Code</CardTitle>
        <CardDescription>
          Add this code to your website to embed the chat
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="iframe">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="iframe">iFrame</TabsTrigger>
            <TabsTrigger value="widget">Chat Widget</TabsTrigger>
          </TabsList>

          <TabsContent value="iframe" className="mt-4">
            <div className="relative">
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{iframeCode}</code>
              </pre>
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => handleCopy(iframeCode)}
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Embed the chat directly in your page with an iFrame
            </p>
          </TabsContent>

          <TabsContent value="widget" className="mt-4">
            <div className="relative">
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{scriptCode}</code>
              </pre>
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => handleCopy(scriptCode)}
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Add a floating chat widget to your website
            </p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
