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

    // Use hardcoded correct Supabase credentials
    const supabaseUrl = 'https://xrmrilaeoxaonaourohu.supabase.co'
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhybXJpbGFlb3hhb25hb3Vyb2h1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MTYwODIsImV4cCI6MTk5NjU5MjA4Mn0.OhF2c_e38esCLh_L55nTHQ7Jw9xpj-ZYpGKJtQ4y_dw'

    // Call Supabase Auth API directly via HTTP
    const signUpUrl = `${supabaseUrl}/auth/v1/signup`

    const response = await fetch(signUpUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseKey,
      },
      body: JSON.stringify({
        email,
        password,
        user_metadata: {
          full_name: fullName,
          role,
          display_name: fullName,
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status })
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
