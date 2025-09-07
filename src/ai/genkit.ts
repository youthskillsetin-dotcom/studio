import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const geminiPro = googleAI.model('gemini-pro');

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: 'https://openrouter.ai/api/v1',
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
