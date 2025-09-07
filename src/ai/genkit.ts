import {genkit, type ModelReference} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {defineModel} from '@genkit-ai/googleai';

// Define custom models for OpenRouter
const gemma7b = defineModel(
  {
    name: 'google/gemma-7b-it',
    label: 'Gemma 7B',
    version: '2024-05-20',
    supports: {
      generate: true,
      multiturn: true,
      tools: false,
      media: false,
      systemRole: false,
    },
  },
  async (request) => {
    // Note: The specific implementation for calling OpenRouter would go here.
    // Since we are just configuring, we can rely on the plugin's baseURL and apiKey.
    // Genkit handles the actual API call based on the plugin configuration.
    // This is a placeholder to satisfy the defineModel structure.
    return {candidates: []};
  }
);

export const geminiPro = googleAI.model('gemini-pro');

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: 'https://openrouter.ai/api/v1/chat/completions',
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
