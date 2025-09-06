'use server';

/**
 * @fileOverview A flow to generate AI feedback on a user's practice attempt for a subtopic.
 *
 * - generateAIFeedback - A function that handles the generation of AI feedback.
 * - GenerateAIFeedbackInput - The input type for the generateAIFeedback function.
 * - GenerateAIFeedbackOutput - The return type for the generateAIFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAIFeedbackInputSchema = z.object({
  subtopicContent: z.string().describe('The content of the subtopic.'),
  userAnswer: z.string().describe('The user\'s answer to the practice question.'),
  correctAnswer: z.string().describe('The correct answer to the practice question.'),
});
export type GenerateAIFeedbackInput = z.infer<typeof GenerateAIFeedbackInputSchema>;

const GenerateAIFeedbackOutputSchema = z.object({
  feedback: z.string().describe('The AI-generated feedback on the user\'s answer.'),
});
export type GenerateAIFeedbackOutput = z.infer<typeof GenerateAIFeedbackOutputSchema>;

export async function generateAIFeedback(input: GenerateAIFeedbackInput): Promise<GenerateAIFeedbackOutput> {
  return generateAIFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAIFeedbackPrompt',
  input: {schema: GenerateAIFeedbackInputSchema},
  output: {schema: GenerateAIFeedbackOutputSchema},
  prompt: `You are an AI mentor providing feedback on a student's practice attempt.

  Subtopic Content: {{{subtopicContent}}}
  User's Answer: {{{userAnswer}}}
  Correct Answer: {{{correctAnswer}}}

  Provide constructive and specific feedback to help the student understand their mistakes and improve their understanding.
  Focus on explaining the concepts and reasoning behind the correct answer.
  Be encouraging and supportive in your feedback, guiding the student towards mastery.
  Response should be in markdown format.
  `,
});

const generateAIFeedbackFlow = ai.defineFlow(
  {
    name: 'generateAIFeedbackFlow',
    inputSchema: GenerateAIFeedbackInputSchema,
    outputSchema: GenerateAIFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
