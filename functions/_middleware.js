import { processCronTrigger } from '../src/functions/cronTrigger'

export async function onRequest(context) {
  const { request, env } = context
  const url = new URL(request.url)

  // Handle API routes
  if (url.pathname.startsWith('/api/')) {
    return handleApiRequest(context)
  }

  // For all other requests, serve the static files
  return context.next()
}

async function handleApiRequest(context) {
  const { request, env } = context
  const url = new URL(request.url)

  // Handle cron trigger endpoint
  if (url.pathname === '/api/cron' && request.method === 'POST') {
    try {
      // Simulate cron event
      const event = {
        scheduledTime: Date.now(),
        cron: '*/2 * * * *'
      }
      
      await processCronTrigger(event, env)
      
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' }
      })
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
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
          'Cache-Control': 'public, max-age=30'
        }
      })
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      })
    }
  }

  return new Response('Not Found', { status: 404 })
}