import {genkit} from 'genkit';
import {openRouter} from 'genkitx-openrouter';

export const ai = genkit({
  plugins: [
    openRouter({
      apiKey: process.env.OPENROUTER_API_KEY,
    }),
  ],
  model: 'openai/gpt-4o-mini',
});
