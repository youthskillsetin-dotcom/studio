
'use server';

/**
 * @fileOverview A flow to generate AI feedback on a user's practice attempt for a subtopic.
 *
 * - generateAIFeedback - A function that handles the generation of AI feedback.
 * - GenerateAIFeedbackInput - The input type for the generateAIFeedback function.
 * - GenerateAIFeedbackOutput - The return type for the generateAIFeedback function.
 */

import {ai} from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import {z} from 'genkit';

const GenerateAIFeedbackInputSchema = z.object({
  subtopicContent: z.string().describe('The content of the subtopic.'),
  userAnswers: z.string().describe('A JSON string representing an array of user answers to the practice questions.'),
  questions: z.string().describe('A JSON string representing an array of the practice questions, including their correct answers.'),
});
export type GenerateAIFeedbackInput = z.infer<typeof GenerateAIFeedbackInputSchema>;

const GenerateAIFeedbackOutputSchema = z.object({
  feedback: z.string().describe('The AI-generated feedback on the user\'s answers.'),
  isCorrect: z.boolean().describe('Whether the user\'s answers were generally correct.')
});
export type GenerateAIFeedbackOutput = z.infer<typeof GenerateAIFeedbackOutputSchema>;

export async function generateAIFeedback(input: GenerateAIFeedbackInput): Promise<GenerateAIFeedbackOutput> {
  return generateAIFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAIFeedbackPrompt',
  input: {schema: GenerateAIFeedbackInputSchema},
  output: {schema: GenerateAIFeedbackOutputSchema},
  model: googleAI.model('gemini-1.5-flash-latest'),
  prompt: `You are an AI mentor providing feedback on a student's practice quiz.

  The student has just completed a lesson with the following content:
  ---
  Subtopic Content: {{{subtopicContent}}}
  ---

  The student was given the following questions (in JSON format):
  ---
  Questions: {{{questions}}}
  ---

  The student provided the following answers (as a JSON object mapping question ID to answer):
  ---
  User's Answers: {{{userAnswers}}}
  ---

  Your task is to provide constructive and specific feedback to help the student learn. Follow these steps:

  1.  **Assess Overall Performance**: First, determine if the user's answers are generally correct. Compare the user's answers to the correct answers in the questions JSON. Set the 'isCorrect' output field to true if most answers are correct, and false otherwise.
  2.  **Generate Feedback**:
      *   Start with an encouraging and positive opening, like "Great job!" or "Good effort!".
      *   Go through each question. If the answer is correct, briefly affirm it.
      *   If an answer is incorrect or could be improved (especially for text answers), provide a clear and concise explanation of the correct answer and the underlying concepts.
      *   For text-based questions, evaluate the user's reasoning and provide feedback on their thought process.
      *   Keep the feedback for each question to 2-3 sentences to be concise.
      *   Conclude with a summary and an encouraging closing statement to motivate the student.
  3.  **Format**: Ensure your entire feedback response is in well-structured markdown format. Use lists and bold text to make it easy to read.
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
