import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { content, role } = await request.json();

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    // Verify exchange ownership
    const { data: exchange, error: exchangeError } = await supabase
      .from('exchanges')
      .select('user_id')
      .eq('id', params.id)
      .single();

    if (exchangeError || !exchange || exchange.user_id !== user.id) {
      return NextResponse.json({ error: 'Exchange not found' }, { status: 404 });
    }

    // Create message
    const { data: message, error: messageError } = await supabase
      .from('messages')
      .insert({
        exchange_id: params.id,
        user_id: user.id,
        content,
        role: role || 'user',
      })
      .select()
      .single();

    if (messageError) {
      return NextResponse.json({ error: messageError.message }, { status: 400 });
    }

    // Update exchange updated_at
    await supabase
      .from('exchanges')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', params.id);

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error('Create message error:', error);
    return NextResponse.json(
      { error: 'An error occurred creating message' },
      { status: 500 }
    );
  }
}
