import {configureGenkit, genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

configureGenkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY,
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

export const ai = genkit();
