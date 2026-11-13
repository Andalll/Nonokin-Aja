import OpenAI from "openai";

export function getNimClient() {
  const apiKey = process.env.NVIDIA_API_KEY;
  const baseURL = process.env.NVIDIA_BASE_URL || "https://integrate.api.nvidia.com/v1";

  if (!apiKey) {
    throw new Error("NVIDIA_API_KEY is not set in environment variables");
  }

  return new OpenAI({
    apiKey,
    baseURL,
    defaultHeaders: {
      "user-agent": "nonokin-aja/1.0",
    },
  });
}

export function getChatModel() {
  return process.env.NVIDIA_CHAT_MODEL || "nvidia/llama-3.1-nemotron-70b-instruct";
}

export function getEmbedModel() {
  return process.env.NVIDIA_EMBED_MODEL || "nvidia/embed-qa-4";
}
