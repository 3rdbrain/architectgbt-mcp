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
        description: "Maximum number of models to return (default: 10)",
      },
    },
    required: [],
  },
};

const InputSchema = z.object({
  provider: z
    .enum(["OpenAI", "Anthropic", "Google", "Meta", "Mistral", "all"])
    .optional(),
  limit: z.number().default(10),
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

    // Format output
    let result = `## 📊 Available AI Models\n\n`;
    result += `| Model | Provider | Input $/1M | Output $/1M |\n`;
    result += `|-------|----------|------------|-------------|\n`;

    models.forEach((m: any) => {
      result += `| ${m.name} | ${m.provider} | $${m.input_price || "?"} | $${m.output_price || "?"} |\n`;
    });

    result += `\n*Showing ${models.length} models. Use \`get_ai_recommendation\` for personalized suggestions.*`;

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
