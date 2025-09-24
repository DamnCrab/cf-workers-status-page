# Cloudflare Workers Status Page (Modern React)

[中文版](README_zh.md) | English

A modern status page application built with React 18, Vite, and Cloudflare Workers. This is a completely refactored version using modern technology stack and architecture.

## Features

- 🚀 Modern development experience with React 18 and Vite
- 🎨 Styled with Tailwind CSS
- 🌙 Dark mode support
- 📱 Responsive design, perfect for mobile devices
- 🔍 Monitor filtering and search functionality
- 📊 Status monitoring and historical data visualization
- 🔔 Multi-platform notification support (Slack, Telegram, Discord)
- ⚡ Cloudflare Workers serverless backend
- 📈 Real-time status updates
- 🗂️ KV storage data persistence
- ⏰ Scheduled tasks for automatic monitoring
- 📝 Workers logging

## Project Architecture

```
src/
├── components/          # React components
│   ├── MonitorCard.jsx         # Monitor card component
│   ├── MonitorFilter.jsx       # Monitor filter
│   ├── MonitorHistogram.jsx    # Monitor history chart
│   ├── MonitorStatusHeader.jsx # Status header
│   ├── MonitorStatusLabel.jsx  # Status label
│   ├── MonitorDayAverage.jsx   # Daily average statistics
│   └── ThemeSwitcher.jsx       # Theme switcher
├── functions/           # Cloudflare Workers functions
│   ├── cronTrigger.js          # Scheduled task handler
│   ├── helpers.js              # Utility functions
│   └── locations.js            # Geolocation handling
├── hooks/              # Custom React Hooks
│   └── useKeyPress.js          # Key press listener Hook
├── store/              # State management
│   └── monitorStore.js         # Monitor data state management
├── cli/                # Command line tools
│   └── gcMonitors.js           # KV data cleanup tool
├── config.js           # Configuration file (converted from config.yaml)
├── index.js            # Workers main entry file
├── App.jsx             # Main application component
├── main.jsx            # Frontend application entry
└── index.css           # Global styles
```

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview build results:
   ```bash
   npm run preview
   ```

## Deployment

### Deploy using Wrangler CLI

1. Configure `wrangler.toml` file:
   ```toml
   name = "your-status-page"
   compatibility_date = "2024-01-01"
   main = "src/index.js"
   
   # Enable Workers logging
   [observability]
   enabled = true
   
   # KV namespace configuration
   [[kv_namespaces]]
   binding = "KV_STATUS_PAGE"
   id = "your-kv-namespace-id"
   
   # Scheduled task configuration (runs every 2 minutes)
   [triggers]
   crons = ["*/2 * * * *"]
   
   # Build configuration
   [build]
   command = "npm run build"
   
   # Static assets configuration
   [assets]
   directory = "./dist"
   ```

2. Deploy to Cloudflare Workers:
   ```bash
   npx wrangler deploy
   ```

### KV Namespace Setup

1. Create KV namespace:
   ```bash
   npx wrangler kv:namespace create "KV_STATUS_PAGE"
   ```

2. Add the returned namespace ID to `wrangler.toml`

## Configuration

### Monitor Configuration

Configure your monitors in `src/config.js`:

```javascript
const config = {
  settings: {
    title: 'Status Page',
    url: 'https://status.example.com/',
    logo: 'logo.png',
    daysInHistogram: 90,
    collectResponseTimes: true,
    allmonitorsOperational: 'All Systems Operational',
    notAllmonitorsOperational: 'Some Systems Down',
    monitorLabelOperational: 'Operational',
    monitorLabelNotOperational: 'Down',
    monitorLabelNoData: 'No Data'
  },
  monitors: [
    {
      id: 'website',
      name: 'Main Website',
      url: 'https://example.com',
      method: 'GET',
      expectStatus: 200,
      linkable: true,
      followRedirect: true
    },
    {
      id: 'api',
      name: 'API Service',
      url: 'https://api.example.com/health',
      method: 'GET',
      expectStatus: 200,
      linkable: false,
      followRedirect: false
    }
  ]
}
```

### Notification Configuration

Set in Cloudflare Workers environment variables:

- `SECRET_SLACK_WEBHOOK_URL` - Slack notification Webhook URL
- `SECRET_TELEGRAM_API_TOKEN` - Telegram bot Token
- `SECRET_TELEGRAM_CHAT_ID` - Telegram chat ID
- `SECRET_DISCORD_WEBHOOK_URL` - Discord Webhook URL

## API Endpoints

- `GET /api/monitors` - Get all monitor data
- `POST /api/cron` - Manually trigger monitor checks

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview build results
- `npm run deploy` - Deploy to Cloudflare Pages (deprecated, use wrangler deploy)
- `npm run kv-gc` - Clean expired data from KV storage
- `npm run format` - Format code
- `npm run lint` - Code linting

## Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Zustand
- **Backend**: Cloudflare Workers
- **Storage**: Cloudflare KV
- **Deployment**: Cloudflare Workers + Assets
- **Monitoring**: Scheduled Tasks (Cron Triggers)
- **Notifications**: Slack, Telegram, Discord

## Migration from Legacy Version

This project has been completely refactored from the Flareact-based version, main changes:

- Replaced Flareact with React 18 + Vite
- Use Cloudflare Workers instead of Pages Functions
- Modernized component structure and JSX syntax
- Use Zustand instead of Laco for state management
- Updated build and deployment configuration
- Configuration file converted from YAML to JavaScript module

## Troubleshooting

### Common Issues

1. **Deployment fails**: Ensure `wrangler.toml` configuration is correct and KV namespace ID is valid
2. **Monitor data not updating**: Check if scheduled tasks are running properly, view Workers logs
3. **Configuration import errors**: Ensure all components import from `config.js` instead of `config.yaml`

### View Logs

```bash
npx wrangler tail
```

### Manually Trigger Monitoring

```bash
curl -X POST https://your-domain.com/api/cron
```

## License

MIT License - see LICENSE file for details