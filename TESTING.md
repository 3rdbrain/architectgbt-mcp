# Testing ArchitectGBT MCP Integration

## Quick Test Guide

### 1. Set Your API Key

**Windows (PowerShell):**
```powershell
$env:ARCHITECTGBT_API_KEY = "your_api_key_here"
```

**macOS/Linux:**
```bash
export ARCHITECTGBT_API_KEY=your_api_key_here
```

### 2. Configure Cursor IDE

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

### 3. Restart Cursor

Close and reopen Cursor IDE to load the MCP server with your API key.

### 4. Test Commands

#### Test 1: List Models
Ask Claude in Cursor:
```
Show me all available AI models
```

Expected: List of models with pricing

#### Test 2: Get Recommendation
Ask Claude:
```
Recommend an AI model for building a chatbot with 100k daily users and $500/month budget
```

Expected: Top 3 model recommendations with cost breakdown

#### Test 3: Get Template
Ask Claude:
```
Show me the Next.js SaaS template
```

Expected: Template code and description

### 5. Verify Unlimited Access

With your API key set:
- ✅ No rate limits (unlimited recommendations)
- ✅ Usage tracked in your dashboard
- ✅ `last_used_at` updates in Settings → API Keys

### 6. Test Without API Key

Remove the environment variable:
```powershell
Remove-Item Env:\ARCHITECTGBT_API_KEY
```

Restart Cursor and try again:
- ✅ First 3 requests work (anonymous tier)
- ✅ 4th request shows rate limit error

## Troubleshooting

### API Key Not Working

1. **Check environment variable is set:**
   ```powershell
   echo $env:ARCHITECTGBT_API_KEY
   ```

2. **Verify format:**
   - Must start with `agbt_`
   - Should be 37+ characters long

3. **Check Cursor loaded it:**
   - Restart Cursor after setting the variable
   - Check Cursor's MCP logs

### MCP Server Not Found

```powershell
# Test MCP server directly
npx -y architectgbt-mcp@0.2.0
```

### Still Getting Rate Limited

- Verify API key is in environment variables
- Check it matches the key in your dashboard
- Ensure Cursor was restarted after setting the variable

## Production Testing Checklist

- [ ] Anonymous access works (3/day limit)
- [ ] API key provides unlimited access
- [ ] Usage count increments in dashboard
- [ ] last_used_at updates after each request
- [ ] Rate limit resets after 24 hours
- [ ] All 3 tools work (list_models, get_ai_recommendation, get_template)
- [ ] Error messages are user-friendly
- [ ] MCP works in both Cursor and Claude Desktop

## API Endpoints Being Used

When using MCP with API key:
- **GET** `https://architectgbt.com/api/models` - List models
- **POST** `https://architectgbt.com/api/recommend` - Get recommendations

Headers sent:
```
Authorization: Bearer agbt_your_key_here
Content-Type: application/json
```

## Next Steps

1. Monitor usage in Settings → API Keys
2. Check MCP usage analytics (coming soon)
3. Share MCP package with team members
4. Upgrade to Pro for unlimited access ($15/month)
