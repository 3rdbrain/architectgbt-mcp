# Testing ArchitectGBT MCP Integration

## Quick Test Guide

### Option 1: Test Anonymous (No Setup)

**Easiest way** - works immediately:

1. **Configure Cursor IDE** - Create `.cursor/mcp.json`:

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

2. **Restart Cursor**

3. **Test it** - Ask Claude:
   - "Show me all available AI models"
   - "Recommend an AI model for a chatbot"

✅ **Expected:** Works instantly - 3 free recommendations/day

---

### Option 2: Test with Pro (Unlimited)

**For unlimited access** - requires Pro account:

1. **Upgrade to Pro:** [architectgbt.com/pricing](https://architectgbt.com/pricing)

2. **Get API Key:** [architectgbt.com/dashboard/settings](https://architectgbt.com/dashboard/settings)

3. **Set Environment Variable:**

**Windows (PowerShell):**
```powershell
$env:ARCHITECTGBT_API_KEY = "agbt_your_key_here"
```

**macOS/Linux:**
```bash
export ARCHITECTGBT_API_KEY=agbt_your_key_here
```

4. **Configure Cursor** - Edit `.cursor/mcp.json`:

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

5. **Restart Cursor**

6. **Test it** - Ask Claude same questions as above

✅ **Expected:** Unlimited recommendations, no daily limits

---

## Test Commands

### Test 1: List Models
Ask Claude in Cursor:
```
Show me all available AI models
```

Expected: List of 50+ models with pricing

### Test 2: Get Recommendation
Ask Claude:
```
Recommend an AI model for building a chatbot with 100k daily users and $500/month budget
```

Expected: Top recommendations with cost breakdown

### Test 3: Get Template
Ask Claude:
```
Show me the Next.js SaaS template
```

Expected: Template code and description

---

## Verify Access Level

### Anonymous/Free (No API Key)
- ✅ First 3 requests work
- ❌ 4th request shows rate limit error
- ✅ Resets after 24 hours
- ✅ No signup required

### Pro (With API Key)
- ✅ Unlimited requests
- ✅ No rate limits
- ✅ Usage tracked in dashboard
---

## Troubleshooting

### Anonymous Not Working

**Common issue:** API key in config but not valid

**Solution:**
1. Remove the `env` section from `.cursor/mcp.json`
2. Use just: `"args": ["-y", "architectgbt-mcp@latest"]`
3. Restart Cursor
4. ✅ Should work with free tier (3/day)

### API Key Not Working (Pro Users)

1. **Check you've upgraded:**
   - Free accounts cannot use API keys
   - [Upgrade to Pro](https://architectgbt.com/pricing)

2. **Verify environment variable:**
   ```powershell
   echo $env:ARCHITECTGBT_API_KEY
   ```

3. **Check format:**
   - Must start with `agbt_`
   - Should be 37+ characters long

4. **Regenerate key:**
   - Go to [Settings](https://architectgbt.com/dashboard/settings)
   - Generate new key
   - Update config

### MCP Server Not Loading

**Test directly:**
```powershell
npx -y architectgbt-mcp@latest
```

**Common fixes:**
- Ensure Node.js >= 18.0.0
- Check internet connection
- Verify JSON syntax in config
- Restart Cursor after config changes
## Troubleshooting

### API Key Not Working

1. **Check environment variable is set:**
   ```powershell
   echo $env:ARCHITECTGBT_API_KEY
   ```

2. **Verify format:**
   - Must start with `agbt_`
   - Should be 37+ characters long

---

## Testing Checklist

### Anonymous Tier
- [ ] Works without signup
- [ ] Works without API key
- [ ] First 3 requests succeed
- [ ] 4th request shows rate limit
- [ ] Rate limit resets after 24 hours
- [ ] Error message shows upgrade path

### Pro Tier
- [ ] Requires Pro subscription
- [ ] API key provides unlimited access
- [ ] Usage count increments in dashboard
- [ ] `last_used_at` updates after requests
- [ ] All tools work (list_models, get_ai_recommendation, get_template)
- [ ] No rate limits

### General
- [ ] Error messages are user-friendly
- [ ] Works in Cursor IDE
- [ ] Works in Claude Desktop
- [ ] Handles network errors gracefully

---

## API Endpoints Used

### Anonymous (No API Key)
- **GET** `https://architectgbt.com/api/models` - Public endpoint
- **POST** `https://architectgbt.com/api/recommend/public` - Rate limited (3/day)

### Pro (With API Key)
- **GET** `https://architectgbt.com/api/models` - Public endpoint
- **POST** `https://architectgbt.com/api/recommend` - Unlimited

**Headers sent:**
```
Authorization: Bearer agbt_your_key_here
Content-Type: application/json
```

---

## Next Steps

### For Free Users
1. Try anonymous tier (3/day)
2. Sign up at [architectgbt.com](https://architectgbt.com) for web access (10/month)
3. [Upgrade to Pro](https://architectgbt.com/pricing) when ready for unlimited

### For Pro Users
1. Monitor usage in [Settings → API Keys](https://architectgbt.com/dashboard/settings)
2. Generate multiple keys for different projects (max 5)
3. Share MCP setup with your team

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
