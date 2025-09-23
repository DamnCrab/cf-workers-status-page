import { useEffect, useState } from 'react'
import { useMonitorStore } from './store/monitorStore'
import { useKeyPress } from './hooks/useKeyPress'
import config from '../config.yaml'
import MonitorCard from './components/MonitorCard'
import MonitorFilter from './components/MonitorFilter'
import MonitorStatusHeader from './components/MonitorStatusHeader'
import ThemeSwitcher from './components/ThemeSwitcher'

// Mock data fetching function - will be replaced with actual API calls
const fetchMonitorData = async () => {
  // This would normally fetch from your Cloudflare Worker API
  return {
    monitors: {},
    lastUpdate: {
      allOperational: true,
      time: Date.now(),
      loc: 'SJC'
    }
  }
}

function App() {
  const { visible, filterByTerm } = useMonitorStore()
  const slash = useKeyPress('/')
  const [kvMonitors, setKvMonitors] = useState({})
  const [kvMonitorsLastUpdate, setKvMonitorsLastUpdate] = useState({})

  useEffect(() => {
    // Initialize theme
    const initTheme = () => {
      const query = window.matchMedia('(prefers-color-scheme: dark)')
      const savedTheme = localStorage.getItem('theme')
      
      if (['dark', 'light'].includes(savedTheme)) {
        document.documentElement.classList.add(savedTheme)
      } else {
        document.documentElement.classList.add(query.matches ? 'dark' : 'light')
      }
    }

    initTheme()

    // Fetch initial data
    const loadData = async () => {
      try {
        const data = await fetchMonitorData()
        setKvMonitors(data.monitors)
        setKvMonitorsLastUpdate(data.lastUpdate)
      } catch (error) {
        console.error('Failed to fetch monitor data:', error)
      }
    }

    loadData()

    // Set up periodic data refresh
    const interval = setInterval(loadData, 30000) // Refresh every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-row justify-between items-center mb-8">
          <div className="flex flex-row items-center">
            <img className="h-8 w-auto" src={config.settings.logo} alt="Logo" />
            <h1 className="ml-4 text-3xl font-bold">{config.settings.title}</h1>
          </div>
          <div className="flex flex-row items-center">
            <ThemeSwitcher />
            <MonitorFilter active={slash} callback={filterByTerm} />
          </div>
        </div>
        
        <MonitorStatusHeader kvMonitorsLastUpdate={kvMonitorsLastUpdate} />
        
        <div className="space-y-4">
          {visible.map((monitor, key) => (
            <MonitorCard
              key={monitor.id}
              monitor={monitor}
              data={kvMonitors[monitor.id]}
            />
          ))}
        </div>
        
        <div className="flex flex-row justify-between mt-8 text-sm text-gray-500 dark:text-gray-400">
          <div>
            Powered by{' '}
            <a 
              href="https://workers.cloudflare.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Cloudflare Workers
            </a>
            {' & '}
            <a 
              href="https://react.dev/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              React
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App