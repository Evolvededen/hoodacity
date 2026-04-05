import { put } from '@vercel/blob'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large. Max 10MB.' }, { status: 400 })
    }

    // Upload to Vercel Blob
    const blob = await put(`knowledge/${Date.now()}-${file.name}`, file, {
      access: 'private',
    })

    // Extract text content from file
    let content = ''
    const fileType = file.name.split('.').pop()?.toLowerCase()

    if (fileType === 'txt' || fileType === 'md') {
      content = await file.text()
    } else if (fileType === 'pdf' || fileType === 'docx') {
      // For PDF and DOCX, we'll process them server-side
      // For now, return empty content - the process endpoint will handle it
      content = ''
    }

    return NextResponse.json({
      pathname: blob.pathname,
      url: blob.url,
      content,
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
