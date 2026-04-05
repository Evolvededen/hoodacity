import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createAdminClient()
    
    // List all tables in public schema
    const { data: tables, error: tablesError } = await supabase
      .from('information_schema.tables' as any)
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_type', 'BASE TABLE')
    
    if (tablesError) {
      // Try raw SQL query instead
      const { data: rawTables, error: rawError } = await supabase.rpc('get_tables' as any)
      
      if (rawError) {
        // Fallback: try to query known tables
        const knownTables = ['ris_citizen', 'profiles', 'companies', 'intelligences']
        const results: Record<string, any> = {}
        
        for (const table of knownTables) {
          const { data, error, count } = await supabase
            .from(table)
            .select('*', { count: 'exact', head: false })
            .limit(5)
          
          if (!error) {
            results[table] = { count, sample: data }
          }
        }
        
        return NextResponse.json({ 
          method: 'fallback',
          tables: results 
        })
      }
      
      return NextResponse.json({ tables: rawTables })
    }
    
    return NextResponse.json({ tables })
  } catch (error) {
    console.error('[v0] DB Explorer error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { table, action, query } = await request.json()
    const supabase = createAdminClient()
    
    if (action === 'list') {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact' })
        .limit(100)
      
      if (error) throw error
      return NextResponse.json({ data, count })
    }
    
    if (action === 'schema') {
      // Get column info for a table
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1)
      
      if (error) throw error
      
      const columns = data && data[0] ? Object.keys(data[0]) : []
      return NextResponse.json({ columns, sample: data?.[0] })
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('[v0] DB Explorer POST error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
