import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
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

    // Get exchange by ID (verify ownership)
    const { data: exchange, error: exchangeError } = await supabase
      .from('exchanges')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', user.id)
      .single();

    if (exchangeError) {
      return NextResponse.json({ error: 'Exchange not found' }, { status: 404 });
    }

    // Get messages for this exchange
    const { data: messages, error: messagesError } = await supabase
      .from('messages')
      .select('*')
      .eq('exchange_id', params.id)
      .order('created_at', { ascending: true });

    if (messagesError) {
      return NextResponse.json({ error: messagesError.message }, { status: 400 });
    }

    return NextResponse.json({
      exchange,
      messages,
    });
  } catch (error) {
    console.error('Get exchange detail error:', error);
    return NextResponse.json(
      { error: 'An error occurred fetching exchange' },
      { status: 500 }
    );
  }
}

export async function PATCH(
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

    const { title, is_archived } = await request.json();

    // Update exchange (verify ownership)
    const { data: exchange, error } = await supabase
      .from('exchanges')
      .update({
        title,
        is_archived,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(exchange);
  } catch (error) {
    console.error('Update exchange error:', error);
    return NextResponse.json(
      { error: 'An error occurred updating exchange' },
      { status: 500 }
    );
  }
}

export async function DELETE(
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

    // Delete exchange (verify ownership)
    const { error } = await supabase
      .from('exchanges')
      .delete()
      .eq('id', params.id)
      .eq('user_id', user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Exchange deleted' });
  } catch (error) {
    console.error('Delete exchange error:', error);
    return NextResponse.json(
      { error: 'An error occurred deleting exchange' },
      { status: 500 }
    );
  }
}
