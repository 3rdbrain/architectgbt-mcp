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

### 💻 Code Templates (Pro Only)
- **Production-ready integrations** for Anthropic, OpenAI, and Google
- **TypeScript and Python** support
- **Complete examples** with installation, env setup, and usage
- **Best practices** including error handling and streaming
- **Requires Pro subscription** ($15/month)

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

---

## Usage & Prompting Guide

**ArchitectGBT has 3 tools** - here's how to use each one effectively:

### 🎯 Get AI Recommendations (Rate Limited)

**What it does:** AI-powered analysis to recommend the best model for your project.

**Free tier limit:** 3 per day (anonymous users)

**How to prompt:**
```
✅ "Recommend an AI model for building a customer support chatbot"
✅ "What's the best model for analyzing legal documents with 50k context?"
✅ "I need a fast, cheap model for sentiment analysis - recommend one"
✅ "Use get_ai_recommendation to find a model for my project"
```

**What triggers it:**
- Asking for "recommendations" or "best model for..."
- Describing a project and asking "what model should I use?"
- Explicitly saying "get_ai_recommendation"

---

### 💻 Get Code Templates (Pro Only)

**What it does:** Returns production-ready code snippets for integrating specific AI models.

**Tier requirement:** Pro subscription required

**How to prompt:**
```
✅ "Give me code to integrate Claude in TypeScript"
✅ "Show me how to use GPT-4 in Python"
✅ "Get me a template for Gemini integration"
✅ "I need example code for calling Anthropic's API"
```

**What triggers it:**
- Asking for "code", "template", "example", "integration"
- Mentioning a specific model + language
- Wanting implementation help

---

### 📊 List All Models (Unlimited)

**What it does:** Shows all 50+ AI models with pricing and specs.

**Free tier limit:** Unlimited (public endpoint)

**How to prompt:**
```
✅ "Show me all AI models"
✅ "List models from Anthropic"
✅ "What models are available?"
✅ "Show me all OpenAI models with pricing"
```

**What triggers it:**
- Asking to "list", "show all", "browse" models
- Wanting to see pricing/specs
- Exploring available options

---

**💡 Pro tip:** Only `get_ai_recommendation` counts toward your daily limit. Browse models and get code templates unlimited!

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

### `list_models` ✅ Unlimited & Free

Browse all 50+ available AI models with real-time pricing and specs.

**✨ No rate limits** - use as much as you want!

**How to use:**
```
You: "Show me all AI models from Anthropic"

Claude will use: list_models

Response:
Available AI Models (8 total)
======================================================================

Anthropic:
  • Claude Haiku 4.5      $  0.80 / $  4.00 (in/out per 1M tokens)
  • Claude Sonnet 4.5     $  3.00 / $ 15.00 (in/out per 1M tokens)
  • Claude Opus 4         $ 15.00 / $ 75.00 (in/out per 1M tokens)
  ...
```

**Parameters:**
- `provider` (optional): Filter by "OpenAI" | "Anthropic" | "Google" | "Meta" | "Mistral"
- `limit` (optional): Number of models (default: 50)

---

### `get_code_template` 🔒 Pro Feature

Get production-ready code for integrating specific AI models.

**⚠️ Requires API key** - Pro subscription ($15/month)

**How to use:**
```
You: "Give me TypeScript code to integrate Claude"

Claude will use: get_code_template

Response:
📝 Code Template: Claude (TypeScript)

### Installation
```bash
npm install @anthropic-ai/sdk
```

### Environment Variables
```
ANTHROPIC_API_KEY=your_api_key_here
```

### Code
```typescript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const message = await client.messages.create({
  model: 'claude-sonnet-4-20250514',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello!' }],
});
```

### Usage Example
```typescript
// Full implementation with error handling...
```
```

**Parameters:**
- `model` (required): AI model name (e.g., "Claude", "GPT-4", "Gemini")
- `language` (optional): "typescript" or "python" (default: typescript)

### `get_ai_recommendation` ⚡ Rate Limited (3/day free)

Get personalized AI model recommendations with budget optimization and detailed analysis.

**⚠️ This is the only rate-limited tool** - counts toward your 3/day limit.

**How to use:**
```
You: "Recommend an AI model for a customer support chatbot handling 10k requests/day"

Claude will use: get_ai_recommendation

Response:
🎯 AI Model Recommendation — Analysis Complete!

✨ TOP MATCH (94% match)

Claude Haiku 4.5
Provider: Anthropic
Estimated Cost: $0.0240/day
Context Window: 200,000 tokens

💡 Why this model?
Perfect for customer support with fast responses, strong reasoning...

✅ Pros:
  • Extremely fast (sub-second)
  • Cost-effective at scale
  ...

---
📊 Free Tier: 2/3 recommendations remaining today
💎 Get unlimited access at https://architectgbt.com
```

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
