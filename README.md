# ArchitectGBT MCP Server

AI model recommendation engine for Cursor, Claude Desktop, and Windsurf.

Get instant AI model recommendations without leaving your IDE.

## Features

- 🎯 **Smart Recommendations** - Get the best AI model for your use case
- 📝 **Code Templates** - Production-ready integration code
- 📊 **Model Database** - Compare 50+ AI models with pricing

## Installation

### For Cursor

Add to your `~/.cursor/mcp.json` (or `C:\Users\YourName\.cursor\mcp.json` on Windows):

```json
{
  "mcpServers": {
    "architectgbt": {
      "command": "npx",
      "args": ["-y", "architectgbt-mcp"]
    }
  }
}
```

**Important:** Restart Cursor completely after adding the configuration.

### For Claude Desktop

Add to your Claude Desktop config (`%APPDATA%\Claude\claude_desktop_config.json` on Windows):

```json
{
  "mcpServers": {
    "architectgbt": {
      "command": "npx",
      "args": ["architectgbt-mcp"]
    }
  }
}
```

### For Windsurf

Add to your MCP configuration:

```json
{
  "mcpServers": {
    "architectgbt": {
      "command": "npx",
      "args": ["architectgbt-mcp"]
    }
  }
}
```

## Available Tools

### `list_models`

List available AI models with pricing information.

**Example prompts:**
- "List all Anthropic models"
- "Show me all models"
- "What OpenAI models are available?"

**Example output:**
```
## 📊 Available AI Models

| Model | Provider | Input $/1M | Output $/1M |
|-------|----------|------------|-------------|
| Claude Haiku 4.5 | Anthropic | $0.80 | $4.00 |
| Claude Opus 4.5 | Anthropic | $15.00 | $75.00 |
| Claude Sonnet 4.5 | Anthropic | $3.00 | $15.00 |
| GPT-4o | OpenAI | $2.50 | $10.00 |
| GPT-4o mini | OpenAI | $0.15 | $0.60 |
...

*Showing 10 models. Use `get_ai_recommendation` for personalized suggestions.*
```

### `get_code_template`

Get production-ready integration code for any AI model.

**Supported providers:** Anthropic (Claude), OpenAI (GPT), Google (Gemini)  
**Languages:** TypeScript, Python

**Example prompts:**
- "Give me a TypeScript template for Claude"
- "Python code for OpenAI GPT-4"
- "Gemini integration in TypeScript"

**Example output:**
```typescript
// ✅ Installation
npm install @anthropic-ai/sdk

// 🔑 Environment Variables
ANTHROPIC_API_KEY=your_api_key_here

// 📦 Code
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const message = await client.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  max_tokens: 1024,
  messages: [
    { role: 'user', content: 'Hello, Claude!' }
  ],
});

console.log(message.content);

// 💡 Usage Tips
// - Use streaming for real-time responses
// - Add system prompts for better control
// - Handle rate limits with retries
```

### `get_ai_recommendation`

Get personalized AI model recommendations based on your project description.

**Note:** Requires authentication. For full recommendations with cost analysis and reasoning, visit [architectgbt.com](https://architectgbt.com) and sign up for a free account.

**Example prompts:**
- "What AI model should I use for a customer support chatbot?"
- "Recommend a model for code generation on a budget"
- "Best model for document analysis with 100K context?"

**Example response:**
```
❌ Authentication Required

The ArchitectGBT API requires authentication. To get AI model recommendations:

1. Visit https://architectgbt.com
2. Sign up for a free account (free tier available!)
3. Use the website directly for personalized recommendations

Alternatively, you can:
- Use `list_models` to browse available models
- Use `get_code_template` to get integration code for any model

For your query: "customer support chatbot"
I recommend visiting the website for a personalized analysis with cost estimates and reasoning.
```

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Local Testing

To test locally before publishing, update your MCP config to point to the built file:

```json
{
  "mcpServers": {
    "architectgbt": {
      "command": "node",
      "args": ["C:/Users/pravi/workspacenew/architectgbt-mcp/dist/index.js"]
    }
  }
}
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `ARCHITECTGBT_API_URL` | API base URL | `https://architectgbt.com` |

## License

MIT

## Links

- [ArchitectGBT Website](https://architectgbt.com)
- [MCP Documentation](https://modelcontextprotocol.io)
