# ArchitectGBT MCP Server

AI model recommendation engine for Cursor, Claude Desktop, and Windsurf.

Get instant AI model recommendations without leaving your IDE.

## Features

- 🎯 **Smart Recommendations** - Get the best AI model for your use case
- 📝 **Code Templates** - Production-ready integration code
- 📊 **Model Database** - Compare 50+ AI models with pricing

## Installation

### For Cursor

Add to your `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "architectgbt": {
      "command": "npx",
      "args": ["@architectgbt/mcp"]
    }
  }
}
```

### For Claude Desktop

Add to your Claude Desktop config (`%APPDATA%\Claude\claude_desktop_config.json` on Windows):

```json
{
  "mcpServers": {
    "architectgbt": {
      "command": "npx",
      "args": ["@architectgbt/mcp"]
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
      "args": ["@architectgbt/mcp"]
    }
  }
}
```

## Available Tools

### `get_ai_recommendation`

Get personalized AI model recommendations based on your project description.

**Example prompts:**
- "What AI model should I use for a customer support chatbot?"
- "Recommend a model for code generation on a budget"
- "Best model for document analysis with 100K context?"

### `get_code_template`

Get production-ready integration code for any AI model.

**Example prompts:**
- "Give me a TypeScript template for Claude"
- "Python code for OpenAI GPT-4"
- "Gemini integration in TypeScript"

### `list_models`

List available AI models with pricing information.

**Example prompts:**
- "List all Anthropic models"
- "Show me the cheapest models"
- "What OpenAI models are available?"

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
