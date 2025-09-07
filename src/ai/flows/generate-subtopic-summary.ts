'use server';

/**
 * @fileOverview A flow to generate a summary for a subtopic.
 *
 * - generateSubtopicSummary - A function that handles the generation of the summary.
 * - GenerateSubtopicSummaryInput - The input type for the function.
 * - GenerateSubtopicSummaryOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSubtopicSummaryInputSchema = z.object({
  title: z.string().describe('The title of the subtopic.'),
  content: z.string().describe('The full HTML content of the subtopic.'),
});
export type GenerateSubtopicSummaryInput = z.infer<typeof GenerateSubtopicSummaryInputSchema>;

const GenerateSubtopicSummaryOutputSchema = z.object({
  summary: z.string().describe('A 2-3 sentence summary of the subtopic.'),
});
export type GenerateSubtopicSummaryOutput = z.infer<typeof GenerateSubtopicSummaryOutputSchema>;

export async function generateSubtopicSummary(input: GenerateSubtopicSummaryInput): Promise<GenerateSubtopicSummaryOutput> {
  return generateSubtopicSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSubtopicSummaryPrompt',
  input: {schema: GenerateSubtopicSummaryInputSchema},
  output: {schema: GenerateSubtopicSummaryOutputSchema},
  prompt: `You are an expert educator. Your task is to create a concise, 2-3 sentence summary of the provided subtopic.

Focus on the key takeaways and most important concepts presented in the content. The summary should be clear, easy to understand, and capture the essence of the lesson.

Subtopic Title: {{{title}}}

Subtopic Content:
{{{content}}}
`,
});

const generateSubtopicSummaryFlow = ai.defineFlow(
  {
    name: 'generateSubtopicSummaryFlow',
    inputSchema: GenerateSubtopicSummaryInputSchema,
    outputSchema: GenerateSubtopicSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
