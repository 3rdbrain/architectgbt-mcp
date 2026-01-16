# ArchitectGBT MCP Server

**Model Context Protocol (MCP) server for AI model recommendations and code templates.**

Get instant AI model recommendations for your projects directly in Cursor IDE or Claude Desktop. Compare **50+ models** from OpenAI, Anthropic, Google, Meta, and Mistral with pricing, capabilities, and production-ready code templates.

[![npm version](https://img.shields.io/npm/v/architectgbt-mcp.svg)](https://www.npmjs.com/package/architectgbt-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

### 🎯 AI Model Recommendations
- **Personalized suggestions** based on your project description
- **Budget optimization** (low/medium/high/unlimited)
- **Priority matching** (cost/speed/quality/balanced)
- **Smart analysis** with reasoning, pros/cons, and alternatives
- **Cost estimates** with realistic token usage calculations

### 📊 Model Database
- **50+ AI models** across all major providers
- **Real-time pricing** per 1M tokens (input/output)
- **Detailed specs** (context windows, capabilities, speed rankings)
- **Provider filtering** (OpenAI, Anthropic, Google, Meta, Mistral)

### 💻 Code Templates
- **Production-ready integrations** for Anthropic, OpenAI, and Google
- **TypeScript and Python** support
- **Complete examples** with installation, env setup, and usage
- **Best practices** including error handling and streaming

## Installation

### Cursor IDE

1. Create `.cursor/mcp.json` in your project:
```json
{
  "mcpServers": {
    "architectgbt": {
      "command": "npx",
      "args": ["-y", "architectgbt-mcp@latest"]
    }
  }
}
```

2. Restart Cursor

3. Ask Claude:
   - "Recommend an AI model for a customer support chatbot"
   - "Show me all available AI models"
   - "Give me Claude Sonnet code in TypeScript"

### Claude Desktop

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "architectgbt": {
      "command": "npx",
      "args": ["-y", "architectgbt-mcp@latest"]
    }
  }
}
```

### VS Code (with Continue or other MCP extensions)

Install an MCP-compatible extension, then add to settings:

```json
{
  "mcp.servers": {
    "architectgbt": {
      "command": "npx",
      "args": ["-y", "architectgbt-mcp@latest"]
    }
  }
}
```

### Zed Editor

Add to `~/.config/zed/settings.json`:

```json
{
  "context_servers": {
    "architectgbt": {
      "command": "npx",
      "args": ["-y", "architectgbt-mcp@latest"]
    }
  }
}
```

### Any MCP-Compatible Client

This server follows the [Model Context Protocol](https://modelcontextprotocol.io) standard and works with any MCP-compatible client. Run it via stdio:

```bash
npx architectgbt-mcp@latest
```

### With API Key (Unlimited Access)

Add your API key to any config above:

```json
{
  "mcpServers": {
    "architectgbt": {
      "command": "npx",
      "args": ["-y", "architectgbt-mcp@latest"],
      "env": {
        "ARCHITECTGBT_API_KEY": "agbt_your_key_here"
      }
    }
  }
}
```

## Pricing

| Tier | Recommendations | Cost | API Key |
|------|----------------|------|---------|
| **Free** | 3/day | $0 | Not needed |
| **Pro** | Unlimited | $15/month | Required |

[Get your API key →](https://architectgbt.com/dashboard/settings)

## Tools

### `list_models`
Lists all 50+ available AI models with pricing.

```
User: "Show me all AI models"

Response:
Available AI Models (50 total)
======================================================================

Anthropic:
  • Claude Haiku 4.5      $  0.80 / $  4.00 (in/out per 1M tokens)
  • Claude Sonnet 4.5     $  3.00 / $ 15.00 (in/out per 1M tokens)
  ...
```

**Parameters:**
- `provider` (optional): Filter by "OpenAI" | "Anthropic" | "Google" | "Meta" | "Mistral"
- `limit` (optional): Number of models (default: 50)

### `get_ai_recommendation`
Get personalized AI model recommendations.

```
User: "I need an AI for a chatbot handling 10k requests/day"

Response:
🎯 AI Model Recommendation — Analysis Complete!

✨ TOP MATCH (94% match)

Claude Haiku 4.5
Provider: Anthropic
Estimated Cost: $0.0240
Context Window: 200,000 tokens

💡 Why this model?
Perfect for customer support with fast responses, strong reasoning...

✅ Pros:
  • Extremely fast (sub-second)
  • Cost-effective at scale
  ...
```

**Parameters:**
- `prompt` (required): Your project description
- `budget` (optional): "low" | "medium" | "high" | "unlimited"
- `priority` (optional): "cost" | "speed" | "quality" | "balanced"

- `language` (required): "typescript" | "python"

## Environment Variables

- `ARCHITECTGBT_API_KEY` - Your API key for unlimited access (optional)
- `ARCHITECTGBT_API_URL` - Custom API URL (default: https://architectgbt.com)

## Troubleshooting

### "Daily Limit Reached"
You've used 3 free recommendations. Options:
1. Wait for daily reset (midnight UTC)
2. [Get API key](https://architectgbt.com/dashboard/settings) for unlimited access

### "API Key Invalid"
1. Check key starts with `agbt_`
2. Regenerate from [Settings](https://architectgbt.com/dashboard/settings)
3. Ensure it's in the `env` section of your config

### Models Not Showing
1. Check internet connection
2. Verify: https://architectgbt.com/api/models
3. Try: `npx architectgbt-mcp@latest` manually

### MCP Not Loading
1. Node.js >= 18.0.0 required
2. Check config JSON syntax
3. Restart Cursor after changes

## Development

```bash
git clone https://github.com/yourusername/architectgbt-mcp.git
cd architectgbt-mcp
npm install
npm run build
npm run dev
```

## Links

- **Website**: [architectgbt.com](https://architectgbt.com)
- **Docs**: [architectgbt.com/docs/mcp-integration](https://architectgbt.com/docs/mcp-integration)
- **API Keys**: [architectgbt.com/dashboard/settings](https://architectgbt.com/dashboard/settings)
- **NPM**: [npmjs.com/package/architectgbt-mcp](https://www.npmjs.com/package/architectgbt-mcp)

## Support

- **Email**: hello@architectgbt.com
- **Issues**: [GitHub](https://github.com/yourusername/architectgbt-mcp/issues)

## License

MIT © ArchitectGBT

---

**Built with ❤️ for developers who ship fast**
