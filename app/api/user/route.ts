import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user profile
    const { data: userProfile, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 400 });
    }

    // Get user tier assignment
    const { data: tierAssignment, error: tierError } = await supabase
      .from('user_tier_assignments')
      .select('*')
      .eq('user_id', user.id)
      .order('assigned_at', { ascending: false })
      .limit(1)
      .single();

    if (tierError && tierError.code !== 'PGRST116') {
      console.error('Tier assignment error:', tierError);
    }

    // Get subscription info if user is entrepreneur or client
    let subscription = null;
    if (userProfile.user_tier === 'entrepreneur' || userProfile.user_tier === 'client') {
      const { data: sub } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .single();

      subscription = sub;
    }

    return NextResponse.json({
      user: userProfile,
      tierAssignment,
      subscription,
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'An error occurred fetching user' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { username, avatar_url, profile_data } = await request.json();

    // Update user profile
    const { data: updatedUser, error } = await supabase
      .from('users')
      .update({
        username,
        avatar_url,
        profile_data: profile_data || {},
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json(
      { error: 'An error occurred updating user' },
      { status: 500 }
    );
  }
}
