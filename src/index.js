import { processCronTrigger } from './functions/cronTrigger'

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    
    // Handle API routes
    if (url.pathname.startsWith('/api/')) {
      return handleApiRequest(request, env, ctx)
    }
    
    // For all other requests, serve static assets
    return env.ASSETS.fetch(request)
  },

  async scheduled(event, env, ctx) {
    // Handle scheduled cron triggers
    try {
      await processCronTrigger(event, env)
      console.log('Cron trigger processed successfully')
    } catch (error) {
      console.error('Error processing cron trigger:', error)
      throw error
    }
  }
}

async function handleApiRequest(request, env, ctx) {
  const url = new URL(request.url)
  
  // Handle manual cron trigger endpoint
  if (url.pathname === '/api/cron' && request.method === 'POST') {
    try {
      // Simulate cron event for manual trigger
      const event = {
        scheduledTime: Date.now(),
        cron: '*/2 * * * *'
      }
      
      await processCronTrigger(event, env)
      
      return new Response(JSON.stringify({ success: true, message: 'Cron trigger executed' }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }
  }

  // Handle monitor data endpoint
  if (url.pathname === '/api/monitors' && request.method === 'GET') {
    try {
      const kvData = await env.KV_STATUS_PAGE.get('monitors_data_v1_1', 'json')
      
      return new Response(JSON.stringify(kvData || { monitors: {}, lastUpdate: {} }), {
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=30',
          'Access-Control-Allow-Origin': '*'
        }
      })
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }
  }

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    })
  }

  return new Response('Not Found', { status: 404 })
}