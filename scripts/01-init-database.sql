-- Initialize HoodaCity Database Schema

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create enum types
CREATE TYPE user_tier AS ENUM ('affiliate', 'client', 'student', 'entrepreneur', 'admin');
CREATE TYPE client_tier AS ENUM ('founder', 'team', 'corporation');
CREATE TYPE entrepreneur_tier AS ENUM ('studio', 'premium', 'concierge');
CREATE TYPE subscription_status AS ENUM ('active', 'inactive', 'paused', 'cancelled');
CREATE TYPE content_type AS ENUM ('agent', 'generator', 'other');

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE,
  password_hash VARCHAR(255),
  user_tier user_tier DEFAULT 'student',
  profile_data JSONB DEFAULT '{}',
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP
);

-- User tier assignments with details
CREATE TABLE user_tier_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tier user_tier NOT NULL,
  client_tier client_tier,
  entrepreneur_tier entrepreneur_tier,
  assigned_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP,
  metadata JSONB DEFAULT '{}'
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  stripe_subscription_id VARCHAR(255) UNIQUE,
  stripe_customer_id VARCHAR(255),
  status subscription_status DEFAULT 'active',
  plan_type VARCHAR(50),
  price_monthly DECIMAL(10, 2),
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Exchanges (chat sessions)
CREATE TABLE exchanges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  is_archived BOOLEAN DEFAULT false
);

-- Messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exchange_id UUID NOT NULL REFERENCES exchanges(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  role VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Agents table (custom AI agents created by entrepreneurs)
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  config JSONB,
  is_public BOOLEAN DEFAULT false,
  is_for_sale BOOLEAN DEFAULT false,
  price DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Generators table (custom generators created by entrepreneurs)
CREATE TABLE generators (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  generator_type VARCHAR(50),
  config JSONB,
  is_public BOOLEAN DEFAULT false,
  is_for_sale BOOLEAN DEFAULT false,
  price DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Mint agents (pre-built hosted agents available to entrepreneurs)
CREATE TABLE mint_agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  endpoint_url TEXT,
  config JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Mint generators (pre-built hosted generators available to entrepreneurs)
CREATE TABLE mint_generators (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  generator_type VARCHAR(50),
  endpoint_url TEXT,
  config JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Agent entitlements (which tiers can access which agents)
CREATE TABLE agent_entitlements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID NOT NULL REFERENCES mint_agents(id) ON DELETE CASCADE,
  entrepreneur_tier entrepreneur_tier,
  access_level VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Generator entitlements (which tiers can access which generators)
CREATE TABLE generator_entitlements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  generator_id UUID NOT NULL REFERENCES mint_generators(id) ON DELETE CASCADE,
  entrepreneur_tier entrepreneur_tier,
  access_level VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Vault items (stored generations and AI Twin outputs)
CREATE TABLE vault_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  description TEXT,
  content_type content_type,
  file_url TEXT,
  storage_path TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Gallery items (showcased creations)
CREATE TABLE gallery_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  description TEXT,
  thumbnail_url TEXT,
  content_urls TEXT[],
  is_published BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Affiliate links
CREATE TABLE affiliate_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  affiliate_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  unique_code VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Affiliate earnings
CREATE TABLE affiliate_earnings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  affiliate_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  referral_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2),
  transaction_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Client teams (for multi-seat plans)
CREATE TABLE client_teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- API usage tracking
CREATE TABLE api_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  endpoint VARCHAR(255),
  tokens_used INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Admin logs
CREATE TABLE admin_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action VARCHAR(255),
  target_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  details JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Marketplace listings (WCFM integration)
CREATE TABLE marketplace_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vendor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID,
  title VARCHAR(255),
  description TEXT,
  price DECIMAL(10, 2),
  wcfm_product_id VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- WordPress sync tracking
CREATE TABLE wordpress_sync (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  wordpress_user_id INTEGER,
  sync_status VARCHAR(50),
  last_synced TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_tier ON users(user_tier);
CREATE INDEX idx_exchanges_user_id ON exchanges(user_id);
CREATE INDEX idx_messages_exchange_id ON messages(exchange_id);
CREATE INDEX idx_agents_creator_id ON agents(creator_id);
CREATE INDEX idx_generators_creator_id ON generators(creator_id);
CREATE INDEX idx_vault_items_user_id ON vault_items(user_id);
CREATE INDEX idx_gallery_items_creator_id ON gallery_items(creator_id);
CREATE INDEX idx_affiliate_earnings_affiliate_id ON affiliate_earnings(affiliate_id);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE exchanges ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE vault_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE generators ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Users can view own exchanges
CREATE POLICY "Users can view own exchanges" ON exchanges
  FOR SELECT USING (auth.uid() = user_id);

-- Users can view own messages
CREATE POLICY "Users can view own messages" ON messages
  FOR SELECT USING (auth.uid() = user_id);

-- Users can view own vault items
CREATE POLICY "Users can view own vault" ON vault_items
  FOR SELECT USING (auth.uid() = user_id);

-- Users can view own agents
CREATE POLICY "Users can view own agents" ON agents
  FOR SELECT USING (auth.uid() = creator_id OR is_public = true);

-- Users can view own generators
CREATE POLICY "Users can view own generators" ON generators
  FOR SELECT USING (auth.uid() = creator_id OR is_public = true);

-- Public galleries can be viewed
CREATE POLICY "Anyone can view published galleries" ON gallery_items
  FOR SELECT USING (is_published = true);

-- Creators can manage own galleries
CREATE POLICY "Creators can manage own galleries" ON gallery_items
  FOR ALL USING (auth.uid() = creator_id);

COMMIT;
