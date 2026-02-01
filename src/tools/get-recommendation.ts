import { z } from "zod";

const API_BASE = process.env.ARCHITECTGBT_API_URL || "https://architectgbt.com";
const API_KEY = process.env.ARCHITECTGBT_API_KEY;

export const getRecommendationTool = {
  name: "get_ai_recommendation",
  description:
    "Get AI model recommendations for SOFTWARE PROJECTS ONLY (web apps, APIs, chatbots, AI features, etc.). DO NOT use for physical projects, crafts, or non-software tasks. Analyzes requirements and recommends the best AI model with pricing, reasoning, and alternatives. Free tier: 3 recommendations/day. Add ARCHITECTGBT_API_KEY for unlimited access.",
  inputSchema: {
    type: "object" as const,
    properties: {
      prompt: {
        type: "string",
        description:
          "Description of the SOFTWARE project you want to build (e.g., 'customer support chatbot for e-commerce', 'code review AI assistant', 'document analysis API')",
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
    const endpoint = API_KEY ? `${API_BASE}/api/recommend` : `${API_BASE}/api/recommend/anonymous`;
    
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
  // Handle conversational/off-topic responses
  if (data.off_topic || data.needs_clarification) {
    let result = data.message || '';
    
    if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
      result += `\n\n📋 To help me recommend the perfect AI model, please tell me:\n`;
      data.questions.forEach((q: string, i: number) => {
        result += `${i + 1}. ${q}\n`;
      });
    }
    
    return result;
  }

  const recommendations = data.recommendations || [];
  
  if (recommendations.length === 0) {
    return `❌ No recommendations found. Try describing your project in more detail.`;
  }

  let result = `🎯 AI Model Recommendation — Analysis Complete!\n`;
  result += `${"=".repeat(70)}\n\n`;

  // Main recommendation
  const top = recommendations[0];
  result += `✨ TOP MATCH (${top.match_score || top.score || 95}% match)\n\n`;
  result += `${top.model_name || top.name}\n`;
  result += `Provider: ${top.provider}\n`;
  
  // Pricing
  if (top.estimated_cost) {
    const cost = top.estimated_cost;
    result += `Estimated Cost: $${cost.total_cost_usd?.toFixed(4) || '0.0000'}\n`;
    result += `  └─ ${cost.input_tokens?.toLocaleString() || '0'} input + ${cost.output_tokens?.toLocaleString() || '0'} output tokens\n`;
  } else if (top.input_price !== undefined && top.output_price !== undefined) {
    result += `Pricing: $${top.input_price}/1M input • $${top.output_price}/1M output\n`;
  }

  // Capabilities
  if (top.capabilities?.context_window || top.context_window) {
    const contextWindow = top.capabilities?.context_window || top.context_window;
    result += `Context Window: ${contextWindow.toLocaleString()} tokens\n`;
  }

  // Reasoning
  if (top.reasoning) {
    result += `\n💡 Why this model?\n${top.reasoning}\n`;
  }

  // Pros and Cons
  if (top.pros || top.cons) {
    result += `\n`;
    if (top.pros && top.pros.length > 0) {
      result += `✅ Pros:\n`;
      top.pros.forEach((pro: string) => {
        result += `  • ${pro}\n`;
      });
    }
    if (top.cons && top.cons.length > 0) {
      result += `⚠️  Cons:\n`;
      top.cons.forEach((con: string) => {
        result += `  • ${con}\n`;
      });
    }
  }

  // Alternative recommendations
  if (recommendations.length > 1) {
    result += `\n${"─".repeat(70)}\n`;
    result += `\nAlternative Options:\n\n`;
    
    recommendations.slice(1, 3).forEach((rec: any, i: number) => {
      result += `${i + 2}. ${rec.model_name || rec.name} (${rec.match_score || rec.score || '??'}% match)\n`;
      result += `   Provider: ${rec.provider}\n`;
      if (rec.estimated_cost) {
        result += `   Cost: $${rec.estimated_cost.total_cost_usd?.toFixed(4) || '0.0000'}\n`;
      } else if (rec.input_price !== undefined) {
        result += `   Pricing: $${rec.input_price}/1M in • $${rec.output_price}/1M out\n`;
      }
      if (rec.reasoning) {
        result += `   Reason: ${rec.reasoning.substring(0, 150)}${rec.reasoning.length > 150 ? '...' : ''}\n`;
      }
      result += `\n`;
    });
  }

  // Analysis summary
  if (data.analysis_summary) {
    result += `${"─".repeat(70)}\n`;
    result += `\n📊 Analysis Summary:\n${data.analysis_summary}\n\n`;
  }

  // Add setup instructions for the recommended model
  result += `${"─".repeat(70)}\n`;
  result += `\n🚀 READY TO USE THIS MODEL?\n\n`;
  result += getModelSetupInstructions(top);

  result += `${"=".repeat(70)}\n`;
  result += `💎 Powered by ArchitectGBT • https://architectgbt.com`;

  return result;
}

/**
 * Generate IDE-specific setup instructions for the recommended model
 */
function getModelSetupInstructions(model: any): string {
  const modelName = model.model_name || model.name || '';
  const provider = model.provider?.toLowerCase() || '';
  
  let instructions = '';

  // Determine the provider and setup steps
  if (provider.includes('anthropic') || modelName.toLowerCase().includes('claude')) {
    instructions += `✨ Claude Desktop Setup:\n`;
    instructions += `1. Open Claude Desktop\n`;
    instructions += `2. Click Settings → Model → Select "${modelName}"\n`;
    instructions += `3. Enter your Anthropic API key if prompted\n`;
    instructions += `4. Start chatting!\n\n`;
    instructions += `🔗 Get API key: https://console.anthropic.com/settings/keys\n`;
    instructions += `📚 Docs: https://docs.anthropic.com/claude/docs/models-overview\n\n`;
    
  } else if (provider.includes('openai') || modelName.toLowerCase().includes('gpt')) {
    instructions += `✨ Cursor/Claude Desktop Setup:\n`;
    instructions += `1. Open your IDE settings\n`;
    instructions += `2. Navigate to AI Model settings\n`;
    instructions += `3. Add OpenAI API key\n`;
    instructions += `4. Select "${modelName}" from the model dropdown\n\n`;
    instructions += `🔗 Get API key: https://platform.openai.com/api-keys\n`;
    instructions += `📚 Docs: https://platform.openai.com/docs/models\n\n`;
    
  } else if (provider.includes('google') || modelName.toLowerCase().includes('gemini')) {
    instructions += `✨ IDE Setup for Gemini:\n`;
    instructions += `1. Get Google AI API key from Google AI Studio\n`;
    instructions += `2. Configure in your IDE's model settings\n`;
    instructions += `3. Select "${modelName}"\n\n`;
    instructions += `🔗 Get API key: https://aistudio.google.com/app/apikey\n`;
    instructions += `📚 Docs: https://ai.google.dev/docs\n\n`;
    
  } else {
    // Generic instructions for other providers
    instructions += `✨ Setup Instructions:\n`;
    instructions += `1. Visit ${model.provider || 'the provider'}'s website\n`;
    instructions += `2. Create an account and get an API key\n`;
    instructions += `3. Configure the API key in your IDE\n`;
    instructions += `4. Select "${modelName}" from available models\n\n`;
  }

  // Add common next steps
  instructions += `📋 Next Steps:\n`;
  instructions += `• Test with a small prompt first\n`;
  instructions += `• Monitor your API usage and costs\n`;
  instructions += `• Check rate limits for your tier\n`;
  
  // Add code template option for Pro users
  if (API_KEY) {
    instructions += `\n💡 Want production code?\n`;
    instructions += `Ask me: "Can you give me the code template for ${modelName}?"\n`;
  } else {
    instructions += `\n💡 Want production-ready code templates?\n`;
    instructions += `Get unlimited access at https://architectgbt.com/pricing\n`;
  }

  instructions += `\n`;
  
  return instructions;
}
