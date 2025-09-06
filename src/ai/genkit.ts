import {genkit} from 'genkit';
import {openai} from 'genkitx-openai';

export const ai = genkit({
  plugins: [
    openai({
      apiKey: process.env.OPENROUTER_API_KEY,
      apiHost: "openrouter.ai/api/v1",
    }),
  ],
});
