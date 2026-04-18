import { createClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  try {
    const { email, password, username } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: false,
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    // Hash password for our records
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in users table
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .insert({
        id: authData.user.id,
        email,
        username: username || email.split('@')[0],
        password_hash: hashedPassword,
        user_tier: 'student',
        is_active: true,
      })
      .select()
      .single();

    if (userError) {
      // Delete auth user if profile creation fails
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      return NextResponse.json({ error: userError.message }, { status: 400 });
    }

    // Assign student tier by default
    const { error: tierError } = await supabaseAdmin
      .from('user_tier_assignments')
      .insert({
        user_id: authData.user.id,
        tier: 'student',
      });

    if (tierError) {
      console.error('Tier assignment error:', tierError);
    }

    return NextResponse.json(
      {
        user: userData,
        message: 'Signup successful. Please check your email to confirm.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'An error occurred during signup' },
      { status: 500 }
    );
  }
}
