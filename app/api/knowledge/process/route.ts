import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { embed } from 'ai'

// Chunk text into smaller pieces for embedding
function chunkText(text: string, chunkSize = 1000, overlap = 200): string[] {
  const chunks: string[] = []
  let start = 0

  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length)
    chunks.push(text.slice(start, end))
    start += chunkSize - overlap
  }

  return chunks
}

export async function POST(req: Request) {
  try {
    const { knowledgeId } = await req.json()

    if (!knowledgeId) {
      return NextResponse.json({ error: 'Missing knowledgeId' }, { status: 400 })
    }

    const supabase = await createClient()

    // Get the knowledge item
    const { data: knowledge, error: fetchError } = await supabase
      .from('knowledge')
      .select('*')
      .eq('id', knowledgeId)
      .single()

    if (fetchError || !knowledge) {
      return NextResponse.json({ error: 'Knowledge not found' }, { status: 404 })
    }

    // Get content to process
    let content = knowledge.content || ''

    // If it's a URL, fetch the content
    if (knowledge.source_type === 'url' && knowledge.source_url) {
      try {
        const res = await fetch(knowledge.source_url)
        const html = await res.text()
        // Basic HTML to text conversion (strip tags)
        content = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
      } catch (err) {
        console.error('Failed to fetch URL:', err)
      }
    }

    if (!content) {
      // Mark as processed with no content
      await supabase
        .from('knowledge')
        .update({ is_processed: true })
        .eq('id', knowledgeId)

      return NextResponse.json({ message: 'No content to process' })
    }

    // Chunk the content
    const chunks = chunkText(content)

    // Generate embeddings for each chunk
    const chunksWithEmbeddings = await Promise.all(
      chunks.map(async (chunk, index) => {
        const { embedding } = await embed({
          model: 'openai/text-embedding-3-small',
          value: chunk,
        })

        return {
          knowledge_id: knowledgeId,
          company_id: knowledge.company_id,
          content: chunk,
          embedding,
          chunk_index: index,
          metadata: {
            source_type: knowledge.source_type,
            title: knowledge.title,
          },
        }
      })
    )

    // Delete existing chunks for this knowledge
    await supabase
      .from('knowledge_chunks')
      .delete()
      .eq('knowledge_id', knowledgeId)

    // Insert new chunks
    const { error: insertError } = await supabase
      .from('knowledge_chunks')
      .insert(chunksWithEmbeddings)

    if (insertError) {
      console.error('Failed to insert chunks:', insertError)
      return NextResponse.json({ error: 'Failed to save embeddings' }, { status: 500 })
    }

    // Mark knowledge as processed
    await supabase
      .from('knowledge')
      .update({ is_processed: true, content })
      .eq('id', knowledgeId)

    return NextResponse.json({
      message: 'Knowledge processed successfully',
      chunks: chunks.length,
    })
  } catch (error) {
    console.error('Processing error:', error)
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
  }
}
