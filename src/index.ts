#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { getRecommendationTool, handleGetRecommendation } from "./tools/get-recommendation.js";
import { getTemplateTool, handleGetTemplate } from "./tools/get-template.js";
import { listModelsTool, handleListModels } from "./tools/list-models.js";

const server = new Server(
  {
    name: "architectgbt-mcp",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [getRecommendationTool, getTemplateTool, listModelsTool],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "get_ai_recommendation":
        return await handleGetRecommendation(args);
      case "get_code_template":
        return await handleGetTemplate(args);
      case "list_models":
        return await handleListModels(args);
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return {
      content: [{ type: "text", text: `Error: ${message}` }],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("ArchitectGBT MCP server running on stdio");
}

main().catch(console.error);
