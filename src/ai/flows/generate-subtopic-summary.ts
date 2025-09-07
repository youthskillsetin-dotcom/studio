
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
  summary: z.string().describe('A 2-3 sentence summary of the subtopic, followed by a bulleted list of 3-4 key takeaways. Use standard markdown for formatting.'),
});
export type GenerateSubtopicSummaryOutput = z.infer<typeof GenerateSubtopicSummaryOutputSchema>;

export async function generateSubtopicSummary(input: GenerateSubtopicSummaryInput): Promise<GenerateSubtopicSummaryOutput> {
  return generateSubtopicSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSubtopicSummaryPrompt',
  input: {schema: GenerateSubtopicSummaryInputSchema},
  output: {schema: GenerateSubtopicSummaryOutputSchema},
  prompt: `You are an expert educator. Your task is to create a detailed summary of the provided subtopic.

The response should consist of two parts:
1. A concise, 2-3 sentence paragraph that captures the essence of the lesson.
2. A bulleted list (using standard markdown like '*' or '-') of the 3-4 most important key takeaways from the content.

Focus on the key concepts and actionable advice presented in the content. Ensure the entire output is a single string formatted with markdown.

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
    const result = await prompt.generate({
        input,
        model: 'googleai/gemini-1.5-flash',
    });
    return result.output!;
  }
);
