import { createClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/client';
import { NextRequest, NextResponse } from 'next/server';

const WORDPRESS_URL = process.env.WORDPRESS_URL || 'https://hoodacity.com';
const WORDPRESS_API_KEY = process.env.WORDPRESS_API_KEY;

interface WordPressUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action } = await request.json();

    if (action === 'sync') {
      // Sync user to WordPress
      const wpUser = await syncUserToWordPress(user.id, user.email);

      // Store WordPress sync info
      const { error: syncError } = await supabaseAdmin
        .from('wordpress_sync')
        .upsert({
          user_id: user.id,
          wordpress_user_id: wpUser.id,
          sync_status: 'synced',
          last_synced: new Date().toISOString(),
        });

      if (syncError) {
        console.error('Sync error:', syncError);
      }

      return NextResponse.json({
        message: 'User synced to WordPress',
        wordPressUserId: wpUser.id,
      });
    }

    if (action === 'enroll_course') {
      // Enroll user in LearnDash course
      const { courseId } = await request.json();
      // Implementation for LearnDash enrollment
      return NextResponse.json({ message: 'Enrolled in course' });
    }

    if (action === 'create_vendor') {
      // Create WCFM vendor for marketplace
      const { reason } = await request.json();
      // Implementation for WCFM vendor creation
      return NextResponse.json({ message: 'Vendor account created' });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('WordPress integration error:', error);
    return NextResponse.json(
      { error: 'WordPress integration failed' },
      { status: 500 }
    );
  }
}

async function syncUserToWordPress(
  userId: string,
  email: string
): Promise<WordPressUser> {
  const wpEndpoint = `${WORDPRESS_URL}/wp-json/wp/v2/users`;

  const response = await fetch(wpEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${WORDPRESS_API_KEY}`,
    },
    body: JSON.stringify({
      username: email.split('@')[0],
      email,
      password: Math.random().toString(36).slice(-8),
      meta: {
        hoodacity_user_id: userId,
      },
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create WordPress user');
  }

  return response.json();
}
