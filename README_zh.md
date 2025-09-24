# Cloudflare Workers Status Page (Modern React)

中文版 | [English](README.md)

一个基于 React 18、Vite 和 Cloudflare Workers 构建的现代化状态页面应用。这是一个完全重构的版本，使用现代化的技术栈和架构。

## 特性

- 🚀 基于 React 18 和 Vite 的现代化开发体验
- 🎨 使用 Tailwind CSS 进行样式设计
- 🌙 支持深色模式
- 📱 响应式设计，完美适配移动端
- 🔍 监控项过滤和搜索功能
- 📊 状态监控和历史数据可视化
- 🔔 多平台通知支持 (Slack, Telegram, Discord)
- ⚡ Cloudflare Workers 无服务器后端
- 📈 实时状态更新
- 🗂️ KV 存储数据持久化
- ⏰ 定时任务自动监控
- 📝 Workers 日志记录

## 项目架构

```
src/
├── components/          # React 组件
│   ├── MonitorCard.jsx         # 监控卡片组件
│   ├── MonitorFilter.jsx       # 监控过滤器
│   ├── MonitorHistogram.jsx    # 监控历史图表
│   ├── MonitorStatusHeader.jsx # 状态头部
│   ├── MonitorStatusLabel.jsx  # 状态标签
│   ├── MonitorDayAverage.jsx   # 日平均统计
│   └── ThemeSwitcher.jsx       # 主题切换器
├── functions/           # Cloudflare Workers 函数
│   ├── cronTrigger.js          # 定时任务处理
│   ├── helpers.js              # 工具函数
│   └── locations.js            # 地理位置处理
├── hooks/              # 自定义 React Hooks
│   └── useKeyPress.js          # 按键监听 Hook
├── store/              # 状态管理
│   └── monitorStore.js         # 监控数据状态管理
├── cli/                # 命令行工具
│   └── gcMonitors.js           # KV 数据清理工具
├── config.js           # 配置文件 (从 config.yaml 转换)
├── index.js            # Workers 主入口文件
├── App.jsx             # 主应用组件
├── main.jsx            # 前端应用入口
└── index.css           # 全局样式
```

## 开发环境设置

1. 安装依赖：
   ```bash
   npm install
   ```

2. 启动开发服务器：
   ```bash
   npm run dev
   ```

3. 构建生产版本：
   ```bash
   npm run build
   ```

4. 预览构建结果：
   ```bash
   npm run preview
   ```

## 部署

### 使用 Wrangler CLI 部署

1. 配置 `wrangler.toml` 文件：
   ```toml
   name = "your-status-page"
   compatibility_date = "2024-01-01"
   main = "src/index.js"
   
   # 启用 Workers 日志
   [observability]
   enabled = true
   
   # KV 命名空间配置
   [[kv_namespaces]]
   binding = "KV_STATUS_PAGE"
   id = "your-kv-namespace-id"
   
   # 定时任务配置 (每2分钟执行一次)
   [triggers]
   crons = ["*/2 * * * *"]
   
   # 构建配置
   [build]
   command = "npm run build"
   
   # 静态资源配置
   [assets]
   directory = "./dist"
   ```

2. 部署到 Cloudflare Workers：
   ```bash
   npx wrangler deploy
   ```

### KV 命名空间设置

1. 创建 KV 命名空间：
   ```bash
   npx wrangler kv:namespace create "KV_STATUS_PAGE"
   ```

2. 将返回的命名空间 ID 添加到 `wrangler.toml` 中

## 配置

### 监控配置

在 `src/config.js` 中配置你的监控项：

```javascript
const config = {
  settings: {
    title: '状态页面',
    url: 'https://status.example.com/',
    logo: 'logo.png',
    daysInHistogram: 90,
    collectResponseTimes: true,
    allmonitorsOperational: '全部系统在线',
    notAllmonitorsOperational: '部分系统宕机',
    monitorLabelOperational: '在线',
    monitorLabelNotOperational: '宕机',
    monitorLabelNoData: '暂无数据'
  },
  monitors: [
    {
      id: 'website',
      name: '主网站',
      url: 'https://example.com',
      method: 'GET',
      expectStatus: 200,
      linkable: true,
      followRedirect: true
    },
    {
      id: 'api',
      name: 'API 服务',
      url: 'https://api.example.com/health',
      method: 'GET',
      expectStatus: 200,
      linkable: false,
      followRedirect: false
    }
  ]
}
```

### 通知配置

在 Cloudflare Workers 环境变量中设置：

- `SECRET_SLACK_WEBHOOK_URL` - Slack 通知 Webhook URL
- `SECRET_TELEGRAM_API_TOKEN` - Telegram 机器人 Token
- `SECRET_TELEGRAM_CHAT_ID` - Telegram 聊天 ID
- `SECRET_DISCORD_WEBHOOK_URL` - Discord Webhook URL

## API 端点

- `GET /api/monitors` - 获取所有监控数据
- `POST /api/cron` - 手动触发监控检查

## 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run preview` - 预览构建结果
- `npm run deploy` - 部署到 Cloudflare Pages (已弃用，请使用 wrangler deploy)
- `npm run kv-gc` - 清理 KV 存储中的过期数据
- `npm run format` - 格式化代码
- `npm run lint` - 代码检查

## 技术栈

- **前端**: React 18, Vite, Tailwind CSS, Zustand
- **后端**: Cloudflare Workers
- **存储**: Cloudflare KV
- **部署**: Cloudflare Workers + Assets
- **监控**: 定时任务 (Cron Triggers)
- **通知**: Slack, Telegram, Discord

## 从旧版本迁移

本项目已从基于 Flareact 的版本完全重构，主要变化：

- 替换 Flareact 为 React 18 + Vite
- 使用 Cloudflare Workers 替代 Pages Functions
- 现代化的组件结构和 JSX 语法
- 使用 Zustand 替代 Laco 进行状态管理
- 更新构建和部署配置
- 配置文件从 YAML 转换为 JavaScript 模块

## 故障排除

### 常见问题

1. **部署失败**: 确保 `wrangler.toml` 配置正确，KV 命名空间 ID 有效
2. **监控数据不更新**: 检查定时任务是否正常运行，查看 Workers 日志
3. **配置导入错误**: 确保所有组件都从 `config.js` 而不是 `config.yaml` 导入配置

### 查看日志

```bash
npx wrangler tail
```

### 手动触发监控

```bash
curl -X POST https://your-domain.com/api/cron
```

## 许可证

MIT License - 详见 LICENSE 文件