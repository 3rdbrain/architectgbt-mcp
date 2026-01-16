# Cursor IDE Setup for ArchitectGBT MCP

## Quick Start

1. **Open Cursor Settings**
   - Press `Ctrl+Shift+J` (Windows/Linux) or `Cmd+Shift+J` (Mac)
   - Or go to: Settings → Features → Model Context Protocol

2. **Add MCP Server Configuration**

Create or edit `.cursor/mcp.json` in your project:

```json
{
  "mcpServers": {
    "architectgbt": {
      "command": "npx",
      "args": ["-y", "architectgbt-mcp@0.2.0"]
    }
  }
}
```

3. **Restart Cursor**
   - Close and reopen Cursor to load the MCP server

## Usage

### Free Tier (No API Key)
Get 3 AI model recommendations per day without authentication:

```
Ask Claude: "recommend an AI model for building a chatbot with 100k daily users"
```

The MCP server will automatically use the anonymous endpoint.

### Pro Tier (Unlimited Access)

1. **Generate API Key**
   - Sign in at [architectgbt.com](https://architectgbt.com)
   - Go to Settings → API Keys
   - Click "Generate New Key"
   - Copy the key (shown only once!)

2. **Set Environment Variable**

**Windows (PowerShell):**
```powershell
$env:ARCHITECTGBT_API_KEY = "agbt_your_key_here"
```

**macOS/Linux:**
```bash
export ARCHITECTGBT_API_KEY=agbt_your_key_here
```

**Permanent Setup:**
- Windows: Add to System Environment Variables
- macOS/Linux: Add to `~/.bashrc` or `~/.zshrc`

3. **Restart Cursor** with environment variable loaded

## Available Tools

### 1. list_models
Lists all available AI models with pricing

**Example:**
```
"Show me all available AI models"
"What models support vision?"
```

### 2. get_ai_recommendation
Get personalized model recommendations based on requirements

**Example:**
```
"Recommend a model for:
- Building a code assistant
- Budget: $500/month
- Needs: function calling, code completion"
```

### 3. get_template
Get ready-to-use code templates

**Example:**
```
"Show me the Next.js SaaS template"
"Get the FastAPI template"
```

## Pricing

- **Free**: 3 recommendations/day (no API key needed)
- **Pro Monthly ($15)**: 200 credits + unlimited MCP
- **Pro Annual ($150)**: 150 credits/month + unlimited MCP

[View full pricing →](https://architectgbt.com#pricing)

## Troubleshooting

### MCP Server Not Found
```bash
# Force install latest version
npx -y architectgbt-mcp@latest
```

### Rate Limited (Free Tier)
```
Error: Rate limit exceeded. Limit: 3 requests per day.
```
- Wait 24 hours, or
- Upgrade to Pro for unlimited access

### API Key Invalid
```
Error: Invalid API key
```
- Check key is correct (starts with `agbt_`)
- Verify environment variable is set
- Restart Cursor after setting variable

### Connection Failed
- Check internet connection
- Verify firewall allows npm/npx
- Try manual test: `npx -y architectgbt-mcp@0.2.0`

## Support

- 📧 Email: support@architectgbt.com
- 🐛 Issues: [github.com/3rdbrain/architectgbt-mcp](https://github.com/3rdbrain/architectgbt-mcp/issues)
- 📚 Docs: [architectgbt.com/docs](https://architectgbt.com)
