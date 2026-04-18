export type UserTier = 'affiliate' | 'client' | 'student' | 'entrepreneur' | 'admin';
export type ClientTier = 'founder' | 'team' | 'corporation';
export type EntrepreneurTier = 'studio' | 'premium' | 'concierge';
export type SubscriptionStatus = 'active' | 'inactive' | 'paused' | 'cancelled';
export type ContentType = 'agent' | 'generator' | 'other';

export interface User {
  id: string;
  email: string;
  username?: string;
  user_tier: UserTier;
  profile_data: Record<string, any>;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  last_login?: string;
}

export interface UserTierAssignment {
  id: string;
  user_id: string;
  tier: UserTier;
  client_tier?: ClientTier;
  entrepreneur_tier?: EntrepreneurTier;
  assigned_at: string;
  expires_at?: string;
  metadata: Record<string, any>;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_subscription_id?: string;
  stripe_customer_id?: string;
  status: SubscriptionStatus;
  plan_type: string;
  price_monthly: number;
  current_period_start: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
}

export interface Exchange {
  id: string;
  user_id: string;
  title?: string;
  created_at: string;
  updated_at: string;
  is_archived: boolean;
}

export interface Message {
  id: string;
  exchange_id: string;
  user_id: string;
  content: string;
  role?: string;
  created_at: string;
}

export interface Agent {
  id: string;
  creator_id: string;
  name: string;
  description?: string;
  config: Record<string, any>;
  is_public: boolean;
  is_for_sale: boolean;
  price?: number;
  created_at: string;
  updated_at: string;
}

export interface Generator {
  id: string;
  creator_id: string;
  name: string;
  description?: string;
  generator_type: string;
  config: Record<string, any>;
  is_public: boolean;
  is_for_sale: boolean;
  price?: number;
  created_at: string;
  updated_at: string;
}

export interface VaultItem {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  content_type: ContentType;
  file_url?: string;
  storage_path?: string;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: string;
  creator_id: string;
  title: string;
  description?: string;
  thumbnail_url?: string;
  content_urls: string[];
  is_published: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface AffiliateLink {
  id: string;
  affiliate_id: string;
  unique_code: string;
  created_at: string;
  updated_at: string;
}

export interface AffiliatEarnings {
  id: string;
  affiliate_id: string;
  referral_user_id?: string;
  amount: number;
  transaction_type: string;
  created_at: string;
}
