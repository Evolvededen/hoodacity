import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET',
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ? 'SET' : 'NOT SET',
    allEnv: Object.keys(process.env)
      .filter(k => k.includes('SUPABASE') || k.includes('NEXT_PUBLIC'))
      .map(k => ({ key: k, value: process.env[k]?.substring(0, 10) + '...' }))
  })
}
