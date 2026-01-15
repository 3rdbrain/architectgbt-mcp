import { z } from "zod";
import { templates } from "../templates/index.js";

export const getTemplateTool = {
  name: "get_code_template",
  description:
    "Get a production-ready code template for integrating a specific AI model. Returns working code with setup instructions.",
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
