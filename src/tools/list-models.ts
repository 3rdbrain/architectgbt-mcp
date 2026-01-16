import { z } from "zod";

const API_BASE = process.env.ARCHITECTGBT_API_URL || "https://architectgbt.com";

export const listModelsTool = {
  name: "list_models",
  description:
    "List available AI models with optional filtering by provider or capability.",
  inputSchema: {
    type: "object" as const,
    properties: {
      provider: {
        type: "string",
        enum: ["OpenAI", "Anthropic", "Google", "Meta", "Mistral", "all"],
        description: "Filter by provider",
      },
      limit: {
        type: "number",
        description: "Maximum number of models to return (default: 50)",
      },
    },
    required: [],
  },
};

const InputSchema = z.object({
  provider: z
    .enum(["OpenAI", "Anthropic", "Google", "Meta", "Mistral", "all"])
    .optional(),
  limit: z.number().default(50),
});

export async function handleListModels(args: unknown) {
  const input = InputSchema.parse(args);

  try {
    const response = await fetch(`${API_BASE}/api/models`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const responseData = await response.json();
    
    // Handle the API response structure: { success: true, data: [...] }
    let models = responseData.success && Array.isArray(responseData.data) 
      ? responseData.data 
      : Array.isArray(responseData) 
      ? responseData 
      : [];

    if (!Array.isArray(models)) {
      throw new Error(`Expected array but got ${typeof models}. API might have changed.`);
    }

    // Filter by provider if specified
    if (input.provider && input.provider !== "all") {
      models = models.filter(
        (m: any) =>
          m.provider?.toLowerCase() === input.provider?.toLowerCase()
      );
    }

    // Limit results
    models = models.slice(0, input.limit);

    // Group by provider for better readability
    const groupedModels: Record<string, any[]> = {};
    models.forEach((m: any) => {
      const provider = m.provider || "Unknown";
      if (!groupedModels[provider]) {
        groupedModels[provider] = [];
      }
      groupedModels[provider].push(m);
    });

    // Format output with grouping
    let result = `Available AI Models (${models.length} total)\n`;
    result += `${"=".repeat(70)}\n\n`;

    Object.entries(groupedModels).forEach(([provider, providerModels]) => {
      result += `${provider}:\n`;
      providerModels.forEach((m: any) => {
        const inputPer1M = m.input_cost_per_1k ? (m.input_cost_per_1k * 1000).toFixed(2) : "?";
        const outputPer1M = m.output_cost_per_1k ? (m.output_cost_per_1k * 1000).toFixed(2) : "?";
        result += `  • ${m.name.padEnd(30)} $${inputPer1M.padStart(6)} / $${outputPer1M.padStart(6)} (in/out per 1M tokens)\n`;
      });
      result += `\n`;
    });

    result += `${"=".repeat(70)}\n`;
    result += `💡 Tip: Use get_ai_recommendation for personalized model suggestions based on your needs.`;

    return {
      content: [{ type: "text", text: result }],
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return {
      content: [{ type: "text", text: `Failed to list models: ${message}` }],
      isError: true,
    };
  }
}
