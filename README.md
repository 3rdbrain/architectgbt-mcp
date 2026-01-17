# ArchitectGBT MCP Server

**Model Context Protocol (MCP) server for AI model recommendations and code templates.**

Get instant AI model recommendations for your projects directly in Cursor IDE or Claude Desktop. Compare **50+ models** from OpenAI, Anthropic, Google, Meta, and Mistral with pricing, capabilities, and production-ready code templates.

[![npm version](https://img.shields.io/npm/v/architectgbt-mcp.svg)](https://www.npmjs.com/package/architectgbt-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Quick Start (No Signup Required!)

**Just run it** - no API key, no signup, no configuration:

```bash
npx -y architectgbt-mcp
```

You get **3 free recommendations per day** instantly. Perfect for trying it out!

Want unlimited? [Upgrade to Pro](#pricing) ($15/month) and add an API key.

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

### Option 1: Anonymous (Free, No Setup)

**Works immediately** - no configuration, no API key, no signup:

#### Cursor IDE

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
3. Ask Claude: "Recommend an AI model for my chatbot"
4. ✅ **Works instantly** - 3 free recommendations/day

#### Claude Desktop

1. **Open config:**
   - **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
   - **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

2. **Add this:**

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

3. Restart Claude Desktop
4. ✅ **Works instantly** - 3 free recommendations/day

---

### Option 2: Pro (Unlimited with API Key)

Want unlimited recommendations? [Upgrade to Pro](https://architectgbt.com/pricing) then:

#### Cursor IDE (Pro)

1. Create `.cursor/mcp.json`:

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

2. Get API key from [Settings](https://architectgbt.com/dashboard/settings)
3. Replace `agbt_your_key_here` with your key
4. Restart Cursor
5. ✅ **Unlimited recommendations**

#### Claude Desktop (Pro)

1. **Open config:**
   - **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
   - **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`

2. **Edit the config:**

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

3. Get API key from [Settings](https://architectgbt.com/dashboard/settings)
4. Replace `agbt_your_key_here` with your key
5. Restart Claude Desktop
6. ✅ **Unlimited recommendations**

5. **Test it** - Look for 🔌 icon in bottom right, then ask:
   - "Show me all available AI models"

### VS Code (with Continue or other MCP extensions)

---

### Other Editors

#### VS Code (with Continue extension)

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

**For unlimited:** Add `"env": { "ARCHITECTGBT_API_KEY": "agbt_your_key" }` and [upgrade to Pro](https://architectgbt.com/pricing).

#### Zed Editor

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

**For unlimited:** Add `"env": { "ARCHITECTGBT_API_KEY": "agbt_your_key" }` and [upgrade to Pro](https://architectgbt.com/pricing).
```bash
npx architectgbt-mcp@latest
```
MCP Access | Cost | Setup Required |
|------|-----------|------|---------------|
| **Anonymous** | 3/day | $0 | None - works instantly |
| **Free Account** | 3/day + 10/month web | $0 | Signup only (no API key) |
| **Pro** | Unlimited | $15-29/month | API key required |

### Free Tier
- ✅ **No signup needed** - works immediately
- ✅ **3 recommendations/day** via MCP (IP-based)
- ✅ **No configuration** - just `npx -y architectgbt-mcp`
- 📈 Perfect for trying it out!

### Pro Tier
- ✅ **Unlimited recommendations** (MCP + web app)
- ✅ **API key access** (up to 5 keys)
- ✅ **Priority support**
- ✅ **Advanced features**
- 💳 [$15-29/month →](https://architectgbt.com/pricing)

**Getting the free tier limit?** [Upgrade to Pro](https://architectgbt.com/pricing) for unlimited access.
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

**Free tier:** You've used 3 free recommendations today.

**Options:**
1. ✅ Wait for reset (resets every 24 hours)
2. 📈 [Upgrade to Pro](https://architectgbt.com/pricing) for unlimited access

### "API Key Invalid" (Pro users)

1. Check key starts with `agbt_`
2. Regenerate from [Settings](https://architectgbt.com/dashboard/settings)
3. Make sure it's in the `env` section of your config
4. Verify you're on a Pro plan

### Not Working at All?

**First time user:**
- ✅ No API key needed for free tier
- ✅ Remove the `env` section from config if present
- ✅ Just use: `"args": ["-y", "architectgbt-mcp@latest"]`

**Pro user:**
- ❌ Check API key is valid
- ❌ Ensure you've upgraded to Pro at [architectgbt.com/pricing](https://architectgbt.com/pricing)
- ❌ Free accounts cannot use API keys

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
