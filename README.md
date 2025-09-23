# Cloudflare Workers Status Page (Modern React)

A modern status page application built with React 18, Vite, and Cloudflare Pages Functions. This is a refactored version of the original Flareact-based status page.

## Features

- 🚀 Modern React 18 with Vite for fast development
- 🎨 Tailwind CSS for styling
- 🌙 Dark mode support
- 📱 Responsive design
- 🔍 Monitor filtering and search
- 📊 Status monitoring with histograms
- 🔔 Notifications (Slack, Telegram, Discord)
- ⚡ Cloudflare Pages Functions for serverless backend
- 📈 Real-time status updates

## Project Structure

```
src/
├── components/          # React components
│   ├── MonitorCard.jsx
│   ├── MonitorFilter.jsx
│   ├── MonitorHistogram.jsx
│   ├── MonitorStatusHeader.jsx
│   ├── MonitorStatusLabel.jsx
│   ├── MonitorDayAverage.jsx
│   └── ThemeSwitcher.jsx
├── functions/           # Cloudflare Functions
│   ├── cronTrigger.js
│   ├── helpers.js
│   └── locations.js
├── hooks/              # Custom React hooks
│   └── useKeyPress.js
├── store/              # State management
│   └── monitorStore.js
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

## Development

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

## Deployment

1. Configure your `wrangler.toml` with your Cloudflare settings
2. Deploy to Cloudflare Pages:
   ```bash
   npm run deploy
   ```

## Configuration

Update `config.yaml` with your monitors and settings:

```yaml
settings:
  title: "Status Page"
  url: "https://status.example.com"
  logo: "logo-192x192.png"
  daysInHistogram: 90
  collectResponseTimes: true

monitors:
  - id: "monitor-1"
    name: "Example Monitor"
    url: "https://example.com"
    method: "GET"
    expectedCodes: [200]
```

## Environment Variables

Set these in your Cloudflare Pages dashboard:

- `SECRET_SLACK_WEBHOOK_URL` - Slack webhook for notifications
- `SECRET_TELEGRAM_API_TOKEN` - Telegram bot token
- `SECRET_TELEGRAM_CHAT_ID` - Telegram chat ID
- `SECRET_DISCORD_WEBHOOK_URL` - Discord webhook URL

## Migration from Flareact

This project has been migrated from Flareact to modern React with Vite. Key changes:

- Replaced Flareact with React 18 + Vite
- Updated to Cloudflare Pages Functions
- Modernized component structure with JSX
- Replaced Laco with Zustand for state management
- Updated build and deployment configuration

## License

MIT License - see LICENSE file for details.