import { createClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json(
      { error: 'No authorization code provided' },
      { status: 400 }
    );
  }

  try {
    const supabase = await createClient();

    const { data: sessionData, error: sessionError } = await supabase.auth.exchangeCodeForSession(code);

    if (sessionError || !sessionData.user) {
      return NextResponse.json({ error: sessionError?.message || 'Failed to exchange code' }, { status: 400 });
    }

    // Check if user exists in our users table
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', sessionData.user.id)
      .single();

    if (!existingUser) {
      // Create user profile for OAuth signup
      const { error: createError } = await supabaseAdmin
        .from('users')
        .insert({
          id: sessionData.user.id,
          email: sessionData.user.email!,
          username: sessionData.user.user_metadata?.name || sessionData.user.email?.split('@')[0],
          avatar_url: sessionData.user.user_metadata?.avatar_url,
          user_tier: 'student',
          is_active: true,
        });

      if (createError) {
        console.error('Failed to create user profile:', createError);
      }

      // Assign student tier
      await supabaseAdmin
        .from('user_tier_assignments')
        .insert({
          user_id: sessionData.user.id,
          tier: 'student',
        });
    }

    // Redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url), {
      status: 302,
    });
  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.json(
      { error: 'An error occurred during OAuth callback' },
      { status: 500 }
    );
  }
}
