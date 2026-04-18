import { supabaseAdmin } from '@/lib/supabase/client';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.metadata?.userId;
        const tier = session.metadata?.tier;
        const plan = session.metadata?.plan;

        if (userId && tier) {
          // Create or update subscription
          const { error: subError } = await supabaseAdmin
            .from('subscriptions')
            .upsert({
              user_id: userId,
              stripe_subscription_id: session.subscription,
              stripe_customer_id: session.customer,
              status: 'active',
              plan_type: plan || tier,
              current_period_start: new Date().toISOString(),
              current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            });

          if (subError) {
            console.error('Failed to create subscription:', subError);
          }

          // Update user tier
          const { error: tierError } = await supabaseAdmin
            .from('user_tier_assignments')
            .upsert({
              user_id: userId,
              tier: tier === 'entrepreneur' || tier === 'client' ? tier : 'student',
              entrepreneur_tier: tier === 'entrepreneur' ? plan : undefined,
              client_tier: tier === 'client' ? plan : undefined,
            });

          if (tierError) {
            console.error('Failed to update tier:', tierError);
          }
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        const subscriptionId = invoice.subscription;

        if (subscriptionId) {
          // Update subscription status
          await supabaseAdmin
            .from('subscriptions')
            .update({ status: 'active' })
            .eq('stripe_subscription_id', subscriptionId);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const subscriptionId = invoice.subscription;

        if (subscriptionId) {
          // Update subscription status
          await supabaseAdmin
            .from('subscriptions')
            .update({ status: 'inactive' })
            .eq('stripe_subscription_id', subscriptionId);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;

        // Update subscription status
        await supabaseAdmin
          .from('subscriptions')
          .update({ status: 'cancelled' })
          .eq('stripe_subscription_id', subscription.id);
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
