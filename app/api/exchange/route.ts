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

    // Get all exchanges for the user
    const { data: exchanges, error } = await supabase
      .from('exchanges')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(exchanges);
  } catch (error) {
    console.error('Get exchanges error:', error);
    return NextResponse.json(
      { error: 'An error occurred fetching exchanges' },
      { status: 500 }
    );
  }
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

    const { title } = await request.json();

    // Create new exchange
    const { data: exchange, error } = await supabase
      .from('exchanges')
      .insert({
        user_id: user.id,
        title: title || 'New Exchange',
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(exchange, { status: 201 });
  } catch (error) {
    console.error('Create exchange error:', error);
    return NextResponse.json(
      { error: 'An error occurred creating exchange' },
      { status: 500 }
    );
  }
}
