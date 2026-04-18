import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName, role } = await request.json()

    if (!email || !password || !fullName || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create Supabase client with service role key for server-side signup
    const supabaseUrl = 'https://xrmrilaeoxaonaourohu.supabase.co'
    const supabaseServiceKey = process.env.SUPABASE_JWT_SECRET || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhybXJpbGFlb3hhb25hb3Vyb2h1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwOTgxNjA4MiwiZXhwIjoxOTk2NTkyMDgyfQ.3X1R3K3v-vZYLJ5X9pYqL3K6X9pYqL3K6X9pYqL3K6E'
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Sign up user with service role
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        full_name: fullName,
        role,
        display_name: fullName,
      },
      email_confirm: false,
    })

    if (error) {
      console.error('[v0] Signup error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      user: data.user,
    })
  } catch (error) {
    console.error('[v0] Signup error:', error)
    const message = error instanceof Error ? error.message : 'An error occurred'
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}
