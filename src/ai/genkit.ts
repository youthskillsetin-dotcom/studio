import {genkit} from 'genkit';
import {openai} from '@genkit-ai/openai';

export const ai = genkit({
  plugins: [],
  model: 'openai/gpt-4o-mini',
});
