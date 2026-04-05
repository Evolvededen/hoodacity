export interface Company {
  id: string
  name: string
  slug: string
  logo_url: string | null
  brand_colors: {
    primary: string
    secondary: string
    accent: string
  }
  settings: Record<string, unknown>
  plan: 'starter' | 'pro' | 'enterprise'
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  company_id: string | null
  email: string
  full_name: string | null
  avatar_url: string | null
  role: 'owner' | 'admin' | 'member'
  is_admin: boolean
  onboarding_completed: boolean
  metadata: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface Team {
  id: string
  company_id: string
  name: string
  description: string | null
  settings: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface Twin {
  id: string
  profile_id: string
  company_id: string
  name: string
  bio: string | null
  personality: {
    tone?: string
    style?: string
    traits?: string[]
  }
  cheat_sheet: {
    background?: string
    expertise?: string[]
    communication_style?: string
  }
  avatar_url: string | null
  voice_settings: Record<string, unknown>
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Intelligence {
  id: string
  company_id: string
  team_id: string | null
  twin_id: string | null
  created_by: string | null
  name: string
  description: string | null
  avatar_url: string | null
  system_prompt: string | null
  model: string
  temperature: number
  settings: Record<string, unknown>
  is_published: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Knowledge {
  id: string
  company_id: string
  intelligence_id: string | null
  title: string
  content: string | null
  source_type: 'document' | 'url' | 'text' | 'api'
  source_url: string | null
  file_path: string | null
  metadata: Record<string, unknown>
  is_processed: boolean
  created_at: string
  updated_at: string
}

export interface Deployment {
  id: string
  intelligence_id: string
  company_id: string
  channel: 'qr' | 'embed' | 'link' | 'api'
  name: string
  config: Record<string, unknown>
  access_code: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Conversation {
  id: string
  deployment_id: string | null
  intelligence_id: string
  company_id: string
  visitor_id: string | null
  metadata: Record<string, unknown>
  created_at: string
  updated_at: string
}

export interface Message {
  id: string
  conversation_id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  metadata: Record<string, unknown>
  created_at: string
}

export interface AnalyticsEvent {
  id: string
  company_id: string
  intelligence_id: string | null
  deployment_id: string | null
  event_type: string
  metadata: Record<string, unknown>
  created_at: string
}
