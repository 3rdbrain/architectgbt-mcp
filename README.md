# ArchitectGBT MCP Server

AI model recommendations directly in your IDE. Compare 50+ models, get code templates, and optimize costs without leaving Cursor or Claude Desktop.

**[Try it Free →](https://architectgbt.com)** · **[Get API Key →](https://architectgbt.com/dashboard/settings)** · **[View All Models →](https://architectgbt.com/models)**

**Resources:** [NPM Package](https://www.npmjs.com/package/architectgbt-mcp) · [GitHub Repository](https://github.com/3rdbrain/architectgbt-mcp)

[![npm version](https://img.shields.io/npm/v/architectgbt-mcp.svg)](https://www.npmjs.com/package/architectgbt-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## Quick Start

No signup, no API key, no configuration needed:

```bash
npx -y architectgbt-mcp
```

Get 3 free AI recommendations per day to try it out.

Want unlimited access + code templates + advanced features? **[Upgrade to Pro →](https://architectgbt.com/pricing)** (starts at $15/mo)

---

## What is ArchitectGBT?

Choosing the right AI model shouldn't take hours of research. ArchitectGBT analyzes your project requirements and recommends the best model with actual cost estimates, not marketing fluff.

Instead of manually comparing pricing tables across OpenAI, Anthropic, Google, Meta, and Mistral, you get:

- AI-powered recommendations based on your project requirements
- Cost optimization with realistic usage estimates
- Model comparison across 50+ models with real-time pricing
- Production-ready code in TypeScript and Python
- Direct IDE integration via Model Context Protocol (MCP)

This MCP server brings ArchitectGBT's intelligence directly into your IDE, so you never have to leave your coding flow.

**New to ArchitectGBT?** [Explore the full platform →](https://architectgbt.com)

---

## Why This vs Cursor's Auto?

Cursor's Auto feature is great for quick model switching, but it doesn't solve the research problem:

**ArchitectGBT solves:**
1. **Cost planning** - Get realistic estimates before you build, not surprise bills after
2. **Model discovery** - Find models you didn't know existed (Mistral, Cohere, specialized models)
3. **Requirements matching** - Match your specific use case (context window needs, latency requirements, budget constraints)
4. **Production templates** - Get working integration code, not just model names

**When to use Cursor Auto:** Switching between models you already know
**When to use ArchitectGBT:** Figuring out which model to use in the first place

Think of it as research before execution. ArchitectGBT helps you make the decision, Cursor Auto helps you execute it.

---

## Features

| Feature | Free | Pro |
|---------|------|-----|
| **Browse 50+ AI Models** | Unlimited | Unlimited |
| **AI Recommendations** | 3/day | Unlimited |
| **Code Templates** | No | Unlimited |
| **Cost Calculator** | No | Yes |
| **API Keys** | No | Up to 5 |
| **Priority Support** | No | Yes |

### AI Model Recommendations
Get intelligent, personalized suggestions for your specific use case:
- Smart analysis with detailed reasoning, pros/cons, and alternatives
- Budget optimization (low/medium/high/unlimited budgets)
- Priority matching (optimize for cost, speed, quality, or balanced)
- Real cost estimates based on realistic token usage
- Alternative suggestions if your top pick doesn't fit

### Model Database (Always Free)
- 50+ AI models from OpenAI, Anthropic, Google, Meta, Mistral
- Real-time pricing per 1M tokens (input + output)
- Detailed specs (context windows, speed rankings, capabilities)
- Provider filtering to compare similar models
- Always updated with the latest model releases

### Code Templates (Pro Only)
Production-ready integration code to ship faster:
- Copy-paste ready for Anthropic, OpenAI, Google Gemini
- TypeScript & Python support
- Complete examples with installation, env setup, and error handling
- Best practices including streaming, retries, and rate limiting
- Saves hours of reading API docs

**[View all features on ArchitectGBT →](https://architectgbt.com)**

---

## Installation

Choose your editor below. No API key needed to start — upgrade to Pro later for unlimited access.

### Cursor IDE

Cursor has native MCP support built-in.

#### Option 1: Free (No API Key)

1. Create `.cursor/mcp.json` in your project root:

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

2. Restart Cursor IDE
3. Test it — Look for the connection icon in the bottom right, then ask:
   - "Show me all available AI models"
   - "Recommend an AI model for my chatbot project"

You're done. You get 3 free recommendations/day.

#### Option 2: Pro (Unlimited)

**[Upgrade to Pro →](https://architectgbt.com/pricing)** then:

1. Get your API key from [ArchitectGBT Dashboard](https://architectgbt.com/dashboard/settings)
2. Edit `.cursor/mcp.json`:

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

3. Replace `agbt_your_key_here` with your actual API key
4. Restart Cursor IDE

Unlimited recommendations + code templates unlocked.

---

### Claude Desktop

#### Option 1: Free (No API Key)

1. Open config file:
   - **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
   - **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Linux:** `~/.config/Claude/claude_desktop_config.json`

2. Add this configuration:

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
4. Test it — Ask Claude:
   - "List all AI models from Anthropic"
   - "Recommend a model for document analysis"

You're set. You get 3 free recommendations/day.

#### Option 2: Pro (Unlimited)

**[Upgrade to Pro →](https://architectgbt.com/pricing)** then:

1. Get your API key from [ArchitectGBT Dashboard](https://architectgbt.com/dashboard/settings)
2. Edit the config file (same locations as above):

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

3. Replace `agbt_your_key_here` with your actual API key
4. Restart Claude Desktop

Unlimited access activated.

---

### Other Editors

#### VS Code (with Continue extension)

1. Install [Continue extension](https://marketplace.visualstudio.com/items?itemName=Continue.continue)
2. Add to settings:

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

**For Pro:** Add `"env": { "ARCHITECTGBT_API_KEY": "agbt_your_key" }` after [upgrading](https://architectgbt.com/pricing).

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

**For Pro:** Add `"env": { "ARCHITECTGBT_API_KEY": "agbt_your_key" }` after [upgrading](https://architectgbt.com/pricing).

#### Other MCP-Compatible Editors

Check [ArchitectGBT Documentation](https://architectgbt.com/docs/mcp-integration) for setup instructions.

---

## Usage Guide

ArchitectGBT provides 3 MCP tools that work directly in your IDE:

### 1. `list_models` — Browse Models (Always Free)

Shows all 50+ AI models with pricing, specs, and capabilities.

**Rate limit:** Unlimited (no restrictions)

**Example prompts:**
```
"Show me all AI models"
"List models from Anthropic with pricing"
"What OpenAI models are available?"
"Compare Claude models"
```

**Response includes:**
- Model name and provider
- Pricing per 1M tokens (input/output)
- Context window size
- Speed ranking
- Key capabilities

**Tip:** Start here to explore options before asking for a recommendation.

---

### 2. `get_ai_recommendation` — AI-Powered Suggestions

Analyzes your project and recommends the best model with detailed reasoning.

**Rate limit:** 
- **Free:** 3 per day (resets at midnight UTC)
- **Pro:** Unlimited

**Example prompts:**
```
"Recommend an AI model for a customer support chatbot handling 10k requests/day"
"What's the best model for analyzing legal documents with 50k tokens?"
"I need a fast, cheap model for sentiment analysis — recommend one"
"Find me a model with low latency and medium budget for a translation app"
```

**Response includes:**
- Top recommended model with match score
- Detailed reasoning (why it's perfect for your use case)
- Pros and cons
- Estimated daily cost
- Alternative suggestions
- Upgrade prompt if you hit the free limit

**Important:** This is the **only rate-limited tool**. Browse models (`list_models`) unlimited.

**Hit your limit?** 
1. Wait for daily reset (midnight UTC)
2. **[Upgrade to Pro →](https://architectgbt.com/pricing)** for unlimited access

---

### 3. `get_code_template` — Production Code (Pro Only)

Returns production-ready integration code for specific AI models.

**Rate limit:** 
- **Free:** Not available
- **Pro:** Unlimited

**Example prompts:**
```
"Give me TypeScript code to integrate Claude"
"Show me how to use GPT-4 in Python"
"Get me a Gemini integration template"
"I need example code for calling Anthropic's API with streaming"
```

**Response includes:**
- Installation commands
- Environment variable setup
- Complete working code
- Usage examples with error handling

**Not a Pro user?** Free users see an upgrade prompt with pricing.

**[Get Pro access →](https://architectgbt.com/pricing)** to unlock code templates.

---

### Prompting Tips

| Do | Don't |
|-------|----------|
| Be specific about your use case | Ask generic "which is best?" questions |
| Mention budget, volume, latency needs | Only ask for model names without context |
| Start with `list_models` to explore | Waste recommendations on exploratory questions |
| Use `get_ai_recommendation` for decisions | Ask for code without mentioning language |

**Pro Tip:** You can say "use the list_models tool" or "call get_ai_recommendation" to explicitly trigger a specific tool.

---

## Pricing & Limits

| Tier | Recommendations | Code Templates | Cost Calculator | API Keys | Price |
|------|-----------------|----------------|-----------------|----------|-------|
| **Free** | 3/day (MCP) + 10/month (web) | No | No | No | $0 |
| **Pro** | Unlimited | Unlimited | Yes | Up to 5 | **$15/mo** |

### Free Tier

Perfect for trying ArchitectGBT:
- No signup required — works instantly
- 3 AI recommendations/day via MCP (IP-based rate limit)
- Unlimited model browsing (`list_models` tool)
- 10 recommendations/month on the web app
- Full model database access on [architectgbt.com](https://architectgbt.com)

**Limitations:**
- No code templates
- No cost calculator
- No API key access
- No priority support

**Best for:** Exploring options, comparing models, trying ArchitectGBT for personal projects.

---

### Pro Tier ($15/month)

For developers shipping to production:
- Unlimited AI recommendations (MCP + web app)
- Production-ready code templates (TypeScript + Python)
- Cost calculator with realistic usage estimates
- API key access (create up to 5 keys)
- Priority email support
- Advanced filters and comparison tools
- Early access to new features

**Best for:** Professional developers, startups, teams building AI products.

**[Get Pro Access →](https://architectgbt.com/pricing)**

---

### Enterprise (Custom Pricing)

Need more? We offer:
- Team collaboration (shared recommendations, templates)
- SSO and advanced security
- Priority support with SLA
- Onboarding and training

**[Contact Sales →](https://architectgbt.com/contact)**

---

### Rate Limit Details

| Endpoint | Free | Pro |
|----------|------|-----|
| `list_models` | Unlimited | Unlimited |
| `get_ai_recommendation` (MCP) | 3/day | Unlimited |
| Web app recommendations | 10/month | Unlimited |
| `get_code_template` | No | Unlimited |

**Rate limit resets:** Midnight UTC daily

**Hit your limit?**
1. Wait for reset (resets every 24 hours)
2. Use the [web app](https://architectgbt.com) (10 free/month)
3. **[Upgrade to Pro](https://architectgbt.com/pricing)** for unlimited access

---

## Available Tools

This MCP server exposes 3 tools that your IDE's AI assistant can use:

### 1. `list_models`

**Description:** Browse all available AI models with pricing and specifications.

**Parameters:**
- `provider` (optional): Filter by provider — `"OpenAI"` | `"Anthropic"` | `"Google"` | `"Meta"` | `"Mistral"`
- `limit` (optional): Max models to return (default: 50)

**Returns:**
- List of models with name, provider, pricing (input/output per 1M tokens), context window, speed ranking

**Rate limit:** Unlimited (always free)

---

### 2. `get_ai_recommendation`

**Description:** Get AI-powered model recommendations based on your project requirements.

**Parameters:**
- `projectDescription` (required): Your use case (e.g., "customer support chatbot")
- `budget` (optional): `"low"` | `"medium"` | `"high"` | `"unlimited"` (default: medium)
- `priority` (optional): `"cost"` | `"speed"` | `"quality"` | `"balanced"` (default: balanced)

**Returns:**
- Top recommended model with match score
- Detailed reasoning and analysis
- Pros and cons
- Estimated costs
- Alternative suggestions

**Rate limit:**
- **Free:** 3 per day (resets midnight UTC)
- **Pro:** Unlimited

---

### 3. `get_code_template`

**Description:** Get production-ready integration code for specific AI models.

**Parameters:**
- `model` (required): Model name (e.g., `"Claude"`, `"GPT-4"`, `"Gemini"`)
- `language` (optional): `"typescript"` | `"python"` (default: typescript)

**Returns:**
- Installation commands
- Environment variable setup
- Complete working code
- Usage examples with error handling

**Rate limit:**
- **Free:** Not available (shows upgrade prompt)
- **Pro:** Unlimited

---

## Troubleshooting

### "Daily Limit Reached"

**Problem:** You've used your 3 free recommendations for today.

**Solutions:**
1. **Wait for reset** — Limits reset at midnight UTC (check countdown in response)
2. **Use the web app** — Get 10 more recommendations/month at [architectgbt.com](https://architectgbt.com)
3. **Upgrade to Pro** — Get unlimited access for $15/month → [Upgrade here](https://architectgbt.com/pricing)

---

### "API Key Invalid"

**Problem:** Your API key isn't being accepted.

**Solutions:**
1. **Check format** — Keys start with `agbt_` (32 characters total)
2. **Verify Pro status** — API keys only work for Pro subscribers → [Check subscription](https://architectgbt.com/dashboard/settings)
3. **Regenerate key** — Create a new key at [Settings](https://architectgbt.com/dashboard/settings)
4. **Check config** — Ensure key is in `env` section of your MCP config
5. **Restart IDE** — Changes require full restart

**Example config:**
```json
{
  "mcpServers": {
    "architectgbt": {
      "command": "npx",
      "args": ["-y", "architectgbt-mcp@latest"],
      "env": {
        "ARCHITECTGBT_API_KEY": "agbt_abc123xyz..."
      }
    }
  }
}
```

---

### MCP Server Not Loading

**Problem:** Tools aren't showing up in your IDE.

**Solutions:**
1. **Check Node.js** — Requires Node.js >= 18.0.0 (`node --version`)
2. **Verify config** — Check JSON syntax in your MCP config file
3. **Restart IDE** — Full restart required after config changes
4. **Test manually** — Run `npx -y architectgbt-mcp@latest` in terminal
5. **Check network** — Verify you can access https://architectgbt.com/api/models

**For Cursor users:** Look for the connection icon in the bottom right corner

---

### Models Not Showing

**Problem:** `list_models` returns empty or errors.

**Solutions:**
1. **Check internet** — Test connection to https://architectgbt.com
2. **Verify API** — Visit https://architectgbt.com/api/models in browser
3. **Update package** — Run with `@latest` tag: `npx -y architectgbt-mcp@latest`
4. **Clear cache** — Delete `node_modules/.cache` and retry

---

### Free Tier Not Working

**Problem:** Getting errors even without API key.

**Solutions:**
1. **Remove API key** — Free tier doesn't need `env` section at all
2. **Use basic config:**
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
3. **Check IP limit** — Each IP gets 3/day (shared across users on same network)
4. **Create free account** — Get 10 more/month on [architectgbt.com](https://architectgbt.com)

---

### Still Having Issues?

- **Email support:** hello@architectgbt.com
- **Documentation:** [architectgbt.com/docs/mcp-integration](https://architectgbt.com/docs/mcp-integration)
- **Report bugs:** [GitHub Issues](https://github.com/3rdbrain/architectgbt-mcp/issues)

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ARCHITECTGBT_API_KEY` | No (Pro only) | Your API key for unlimited access (starts with `agbt_`) |
| `ARCHITECTGBT_API_URL` | No | Custom API endpoint (default: `https://architectgbt.com`) |

**Example:**
```bash
export ARCHITECTGBT_API_KEY="agbt_your_key_here"
```

---

## Links & Support

### ArchitectGBT Platform

- **Homepage:** [architectgbt.com](https://architectgbt.com) — Explore 50+ models, compare pricing, get recommendations
- **Browse Models:** [architectgbt.com/models](https://architectgbt.com/models) — Full database with filters and search
- **Pricing:** [architectgbt.com/pricing](https://architectgbt.com/pricing) — Upgrade to Pro for unlimited access
- **Get API Key:** [architectgbt.com/dashboard/settings](https://architectgbt.com/dashboard/settings) — Manage keys and subscription
- **Documentation:** [architectgbt.com/docs/mcp-integration](https://architectgbt.com/docs/mcp-integration) — Full MCP setup guide
- **Blog:** [architectgbt.com/blog](https://architectgbt.com/blog) — Model comparisons, benchmarks, tutorials

### NPM Package

- **Package:** [npmjs.com/package/architectgbt-mcp](https://www.npmjs.com/package/architectgbt-mcp)
- **Version:** 0.4.0
- **License:** MIT

### Support Channels

- **Email:** hello@architectgbt.com
- **Bug Reports:** [GitHub Issues](https://github.com/3rdbrain/architectgbt-mcp/issues)
- **Feature Requests:** [GitHub Discussions](https://github.com/3rdbrain/architectgbt-mcp/discussions)
- **Twitter/X:** [@architectgbt](https://twitter.com/architectgbt) — Updates and announcements

---

## Why Use ArchitectGBT?

Save hours of research — We track 50+ models from 5 providers so you don't have to.

Make better decisions — AI-powered recommendations based on your actual requirements, not marketing hype.

Ship faster — Production-ready code templates eliminate boilerplate and integration headaches.

Optimize costs — Realistic cost estimates prevent budget surprises in production.

Stay updated — We monitor pricing changes, new releases, and deprecations across all providers.

**[Start exploring models now →](https://architectgbt.com)**

---

## Contributing

This MCP server is part of the [ArchitectGBT](https://architectgbt.com) platform. We welcome contributions.

**Development Setup:**
```bash
git clone https://github.com/3rdbrain/architectgbt-mcp.git
cd architectgbt-mcp
npm install
npm run build
npm run dev
```

**Before submitting PRs:**
- Test with both Cursor and Claude Desktop
- Update documentation if adding features
- Follow existing code style

---

## License

MIT © ArchitectGBT

---

## Acknowledgments

Built with:
- [Model Context Protocol (MCP)](https://modelcontextprotocol.io) by Anthropic
- [Cursor IDE](https://cursor.sh) and [Claude Desktop](https://claude.ai/download)
- TypeScript, Node.js, and the amazing open-source community

---

<div align="center">

**Built for developers who ship fast**

[Try Free](https://architectgbt.com) · [Get Pro](https://architectgbt.com/pricing) · [Read Docs](https://architectgbt.com/docs/mcp-integration)

</div>
