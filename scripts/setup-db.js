import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const sql = `
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
CREATE TABLE IF NOT EXISTS users (
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
CREATE TABLE IF NOT EXISTS user_tier_assignments (
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
CREATE TABLE IF NOT EXISTS subscriptions (
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
CREATE TABLE IF NOT EXISTS exchanges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  is_archived BOOLEAN DEFAULT false
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exchange_id UUID NOT NULL REFERENCES exchanges(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  role VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Agents table (custom AI agents created by entrepreneurs)
CREATE TABLE IF NOT EXISTS agents (
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
CREATE TABLE IF NOT EXISTS generators (
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
CREATE TABLE IF NOT EXISTS mint_agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  endpoint_url TEXT,
  config JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Mint generators (pre-built hosted generators available to entrepreneurs)
CREATE TABLE IF NOT EXISTS mint_generators (
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
CREATE TABLE IF NOT EXISTS agent_entitlements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id UUID NOT NULL REFERENCES mint_agents(id) ON DELETE CASCADE,
  entrepreneur_tier entrepreneur_tier,
  access_level VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Generator entitlements (which tiers can access which generators)
CREATE TABLE IF NOT EXISTS generator_entitlements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  generator_id UUID NOT NULL REFERENCES mint_generators(id) ON DELETE CASCADE,
  entrepreneur_tier entrepreneur_tier,
  access_level VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Vault items (stored generations and AI Twin outputs)
CREATE TABLE IF NOT EXISTS vault_items (
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
CREATE TABLE IF NOT EXISTS gallery_items (
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
CREATE TABLE IF NOT EXISTS affiliate_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  affiliate_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  unique_code VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Affiliate earnings
CREATE TABLE IF NOT EXISTS affiliate_earnings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  affiliate_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  referral_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2),
  transaction_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Client teams (for multi-seat plans)
CREATE TABLE IF NOT EXISTS client_teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  member_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- API usage tracking
CREATE TABLE IF NOT EXISTS api_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  endpoint VARCHAR(255),
  tokens_used INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Admin logs
CREATE TABLE IF NOT EXISTS admin_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action VARCHAR(255),
  target_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  details JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Marketplace listings (WCFM integration)
CREATE TABLE IF NOT EXISTS marketplace_listings (
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
CREATE TABLE IF NOT EXISTS wordpress_sync (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  wordpress_user_id INTEGER,
  sync_status VARCHAR(50),
  last_synced TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
`;

async function setupDatabase() {
  try {
    console.log('Setting up database schema...');
    const { data, error } = await supabase.rpc('exec_sql', { sql });
    
    if (error) {
      console.error('Database setup error:', error);
      process.exit(1);
    }
    
    console.log('Database schema created successfully!');
  } catch (error) {
    console.error('Failed to setup database:', error);
    process.exit(1);
  }
}

setupDatabase();
