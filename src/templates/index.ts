export const templates: Record<string, Record<string, {
  install: string;
  envVars: string[];
  code: string;
  usage: string;
}>> = {
  anthropic: {
    typescript: {
      install: "npm install @anthropic-ai/sdk",
      envVars: ["ANTHROPIC_API_KEY=your-api-key"],
      code: `import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function chat(message: string): Promise<string> {
  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    messages: [{ role: "user", content: message }],
  });

  const textBlock = response.content[0];
  if (textBlock.type === "text") {
    return textBlock.text;
  }
  throw new Error("Unexpected response type");
}`,
      usage: `const answer = await chat("What is the capital of France?");
console.log(answer);`,
    },
    python: {
      install: "pip install anthropic",
      envVars: ["ANTHROPIC_API_KEY=your-api-key"],
      code: `import anthropic

client = anthropic.Anthropic()

def chat(message: str) -> str:
    response = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=1024,
        messages=[{"role": "user", "content": message}]
    )
    return response.content[0].text`,
      usage: `answer = chat("What is the capital of France?")
print(answer)`,
    },
  },

  openai: {
    typescript: {
      install: "npm install openai",
      envVars: ["OPENAI_API_KEY=your-api-key"],
      code: `import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function chat(message: string): Promise<string> {
  const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: message }],
  });

  return response.choices[0].message.content || "";
}`,
      usage: `const answer = await chat("What is the capital of France?");
console.log(answer);`,
    },
    python: {
      install: "pip install openai",
      envVars: ["OPENAI_API_KEY=your-api-key"],
      code: `from openai import OpenAI

client = OpenAI()

def chat(message: str) -> str:
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": message}]
    )
    return response.choices[0].message.content`,
      usage: `answer = chat("What is the capital of France?")
print(answer)`,
    },
  },

  google: {
    typescript: {
      install: "npm install @google/generative-ai",
      envVars: ["GOOGLE_API_KEY=your-api-key"],
      code: `import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function chat(message: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContent(message);
  return result.response.text();
}`,
      usage: `const answer = await chat("What is the capital of France?");
console.log(answer);`,
    },
    python: {
      install: "pip install google-generativeai",
      envVars: ["GOOGLE_API_KEY=your-api-key"],
      code: `import google.generativeai as genai
import os

genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

def chat(message: str) -> str:
    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content(message)
    return response.text`,
      usage: `answer = chat("What is the capital of France?")
print(answer)`,
    },
  },
};
