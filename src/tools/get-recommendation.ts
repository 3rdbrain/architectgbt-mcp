import { z } from "zod";

const API_BASE = process.env.ARCHITECTGBT_API_URL || "https://architectgbt.com";

export const getRecommendationTool = {
  name: "get_ai_recommendation",
  description:
    "Analyze a project description and recommend the best AI model with pricing, reasoning, and alternatives. Use this when someone asks which AI model to use for their project. Note: This uses the public ArchitectGBT website - users should visit architectgbt.com and sign up for full API access.",
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
    const response = await fetch(`${API_BASE}/api/recommend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input.prompt,
        budget: input.budget,
        priority: input.priority,
      }),
    });

    if (!response.ok) {
      // Handle authentication requirement
      if (response.status === 401) {
        return {
          content: [
            {
              type: "text",
              text: `❌ **Authentication Required**\n\nThe ArchitectGBT API requires authentication. To get AI model recommendations:\n\n1. Visit https://architectgbt.com\n2. Sign up for a free account\n3. Use the website directly for personalized recommendations\n\nAlternatively, you can:\n- Use \`list_models\` to browse available models\n- Use \`get_code_template\` to get integration code for any model\n\nFor your query: "${input.prompt}"\nI recommend visiting the website for a personalized analysis.`,
            },
          ],
        };
      }
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // Format the response nicely
    const result = formatRecommendation(data);

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
