import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GEMINI_API_KEY,
    }),
  ],
  // The following options are not supported in Genkit v1.x and have been removed
  // to prevent server errors. Tracing is enabled by default.
  // logLevel: 'debug',
  // enableTracingAndMetrics: true,
});
