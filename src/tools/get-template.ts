import { z } from "zod";
import { templates } from "../templates/index.js";

const API_KEY = process.env.ARCHITECTGBT_API_KEY;

export const getTemplateTool = {
  name: "get_code_template",
  description:
    "Get ArchitectGBT's production-tested code templates for AI model integration (TypeScript & Python). These are battle-tested templates with proper error handling, type safety, and best practices - NOT generic code. Pro feature - requires API key. Free users: browse models unlimited, get 3 AI recommendations/day.",
  inputSchema: {
    type: "object" as const,
    properties: {
      model: {
        type: "string",
        description:
          "The AI model name (e.g., 'Claude', 'GPT-4', 'Gemini')",
      },
      language: {
        type: "string",
        enum: ["typescript", "python"],
        description: "Programming language for the template",
      },
    },
    required: ["model"],
  },
};

const InputSchema = z.object({
  model: z.string(),
  language: z.enum(["typescript", "python"]).default("typescript"),
});

export async function handleGetTemplate(args: unknown) {
  const input = InputSchema.parse(args);

  // Check if user has API key (Pro tier)
  if (!API_KEY) {
    return {
      content: [
        {
          type: "text",
          text: `🔒 **Code Templates are a Pro Feature**

Production-ready code templates require an ArchitectGBT Pro subscription.

**What you get with Pro:**
✅ All 12+ production code templates (TypeScript & Python)
✅ Unlimited AI recommendations  
✅ One-click Vercel deploy
✅ Cost calculator & optimization
✅ Priority support (24h)

**Upgrade now:** https://architectgbt.com/pricing ($15/month)

**Already Pro?**
1. Get your API key: https://architectgbt.com/dashboard/settings
2. Add to your MCP config:
\`\`\`json
{
  "mcpServers": {
    "architectgbt": {
      "command": "npx",
      "args": ["-y", "architectgbt-mcp"],
      "env": {
        "ARCHITECTGBT_API_KEY": "agbt_your_key_here"
      }
    }
  }
}
\`\`\`
3. Restart your IDE

**Free tier includes:**
✅ Browse 50+ AI models (unlimited)
✅ 3 AI recommendations/day (no signup needed)`,
        },
      ],
    };
  }

  const modelKey = input.model.toLowerCase();
  const lang = input.language;

  // Find matching template
  let template = null;

  if (modelKey.includes("claude") || modelKey.includes("anthropic")) {
    template = templates.anthropic[lang];
  } else if (modelKey.includes("gpt") || modelKey.includes("openai")) {
    template = templates.openai[lang];
  } else if (modelKey.includes("gemini") || modelKey.includes("google")) {
    template = templates.google[lang];
  }

  if (!template) {
    return {
      content: [
        {
          type: "text",
          text: `No template found for "${input.model}" in ${lang}. Available: Claude/Anthropic, GPT/OpenAI, Gemini/Google.`,
        },
      ],
    };
  }

  const result = `## 📝 Code Template: ${input.model} (${lang})

### Installation
\`\`\`bash
${template.install}
\`\`\`

### Environment Variables
\`\`\`
${template.envVars.join("\n")}
\`\`\`

### Code
\`\`\`${lang}
${template.code}
\`\`\`

### Usage Example
\`\`\`${lang}
${template.usage}
\`\`\`

---
*Powered by [ArchitectGBT](https://architectgbt.com)*`;

  return {
    content: [{ type: "text", text: result }],
  };
}
