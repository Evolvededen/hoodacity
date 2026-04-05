'use client'

import { useEffect, useState } from 'react'

export default function DBTestPage() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tableData, setTableData] = useState<Record<string, any>>({})

  useEffect(() => {
    async function testConnection() {
      try {
        const res = await fetch('/api/admin/db-explorer')
        const data = await res.json()
        console.log('[v0] DB Explorer result:', data)
        setResult(data)
        
        // Try to fetch ris_citizen table
        const citizenRes = await fetch('/api/admin/db-explorer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ table: 'ris_citizen', action: 'list' })
        })
        const citizenData = await citizenRes.json()
        console.log('[v0] ris_citizen data:', citizenData)
        setTableData(prev => ({ ...prev, ris_citizen: citizenData }))
        
      } catch (err) {
        console.error('[v0] Test error:', err)
        setError(String(err))
      } finally {
        setLoading(false)
      }
    }
    
    testConnection()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Testing database connection...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-2xl font-bold mb-6">Database Connection Test</h1>
      
      {error && (
        <div className="bg-red-900/50 border border-red-500 p-4 rounded mb-6">
          <p className="text-red-300">Error: {error}</p>
        </div>
      )}
      
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">Connection Result</h2>
          <pre className="bg-zinc-900 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(result, null, 2)}
          </pre>
        </section>
        
        {tableData.ris_citizen && (
          <section>
            <h2 className="text-xl font-semibold mb-2">
              ris_citizen Table ({tableData.ris_citizen.count} rows)
            </h2>
            <pre className="bg-zinc-900 p-4 rounded overflow-auto text-sm max-h-96">
              {JSON.stringify(tableData.ris_citizen.data, null, 2)}
            </pre>
          </section>
        )}
      </div>
    </div>
  )
}
