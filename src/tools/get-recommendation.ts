import { z } from "zod";

const API_BASE = process.env.ARCHITECTGBT_API_URL || "https://architectgbt.com";
const API_KEY = process.env.ARCHITECTGBT_API_KEY;

export const getRecommendationTool = {
  name: "get_ai_recommendation",
  description:
    "Analyze a project description and recommend the best AI model with pricing, reasoning, and alternatives. Free tier: 3 recommendations/day. Add ARCHITECTGBT_API_KEY for unlimited access.",
  inputSchema: {
    type: "object" as const,
    properties: {
      prompt: {
        type: "string",
        description:
          "Description of what you want to build (e.g., 'customer support chatbot for e-commerce')",
      },
      budget: {
        type: "string",
        enum: ["low", "medium", "high", "unlimited"],
        description: "Budget constraint for API costs",
      },
      priority: {
        type: "string",
        enum: ["cost", "speed", "quality", "balanced"],
        description: "What matters most for this project",
      },
    },
    required: ["prompt"],
  },
};

const InputSchema = z.object({
  prompt: z.string(),
  budget: z.enum(["low", "medium", "high", "unlimited"]).optional(),
  priority: z.enum(["cost", "speed", "quality", "balanced"]).optional(),
});

export async function handleGetRecommendation(args: unknown) {
  const input = InputSchema.parse(args);

  try {
    // Determine which endpoint to use
    const endpoint = API_KEY ? `${API_BASE}/api/recommend` : `${API_BASE}/api/recommend/public`;
    
    // Build headers
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    
    // Add API key if available
    if (API_KEY) {
      headers["Authorization"] = `Bearer ${API_KEY}`;
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        prompt: input.prompt,
        budget: input.budget,
        priority: input.priority,
      }),
    });

    if (!response.ok) {
      // Handle rate limiting for free tier
      if (response.status === 429) {
        const data = await response.json();
        const resetHeader = response.headers.get('X-RateLimit-Reset');
        const resetTime = resetHeader ? new Date(resetHeader).toLocaleString() : 'tomorrow';
        
        return {
          content: [
            {
              type: "text",
              text: `🚫 **Daily Limit Reached**\n\n${data.error?.message || 'You\'ve used all 3 free recommendations today.'}\n\nResets at: ${resetTime}\n\n**Get unlimited access:**\n1. Visit https://architectgbt.com\n2. Sign up for free (10 recommendations/month)\n3. Generate an API key from Settings\n4. Add to your MCP config:\n\`\`\`json\n{\n  "mcpServers": {\n    "architectgbt": {\n      "command": "npx",\n      "args": ["-y", "architectgbt-mcp"],\n      "env": {\n        "ARCHITECTGBT_API_KEY": "your_api_key_here"\n      }\n    }\n  }\n}\n\`\`\`\n\n💡 Pro tip: Upgrade to Pro ($15/mo) for unlimited recommendations!`,
            },
          ],
        };
      }
      
      // Handle authentication requirement
      if (response.status === 401 || response.status === 405) {
        return {
          content: [
            {
              type: "text",
              text: `❌ **API Key Invalid or Expired**\n\nYour API key is not valid. To fix this:\n\n1. Visit https://architectgbt.com/settings\n2. Generate a new API key\n3. Update your MCP config\n\n**Without an API key:**\nYou can still use the free tier (3 recommendations/day). Remove the ARCHITECTGBT_API_KEY from your config.`,
            },
          ],
        };
      }
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // Show rate limit info if present
    const remaining = response.headers.get('X-RateLimit-Remaining');
    const limit = response.headers.get('X-RateLimit-Limit');
    
    // Format the response nicely
    let result = formatRecommendation(data);
    
    // Add rate limit footer for free tier
    if (remaining !== null && limit !== null && !API_KEY) {
      result += `\n\n---\n📊 **Free Tier:** ${remaining}/${limit} recommendations remaining today\n💎 Get unlimited access at https://architectgbt.com`;
    }

    return {
      content: [{ type: "text", text: result }],
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return {
      content: [
        {
          type: "text",
          text: `Failed to get recommendation: ${message}. Please try again.`,
        },
      ],
      isError: true,
    };
  }
}

function formatRecommendation(data: any): string {
  const { recommendation, reasoning, alternatives, model } = data;

  let result = `## 🎯 AI Model Recommendation\n\n`;

  if (model) {
    result += `### Recommended: ${model.name}\n`;
    result += `- **Provider:** ${model.provider}\n`;
    result += `- **Model ID:** ${model.model_id || "N/A"}\n`;

    if (model.input_price || model.output_price) {
      result += `- **Pricing:** $${model.input_price}/1M input, $${model.output_price}/1M output\n`;
    }

    if (model.context_window) {
      result += `- **Context Window:** ${model.context_window.toLocaleString()} tokens\n`;
    }
  }

  if (reasoning) {
    result += `\n### Why This Model?\n${reasoning}\n`;
  }

  if (alternatives && alternatives.length > 0) {
    result += `\n### Alternatives\n`;
    alternatives.forEach((alt: any, i: number) => {
      result += `${i + 1}. **${alt.name}** - ${alt.reason || alt.description || ""}\n`;
    });
  }

  result += `\n---\n*Powered by [ArchitectGBT](https://architectgbt.com)*`;

  return result;
}
