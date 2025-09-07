'use server';

/**
 * @fileOverview AI mentor chat interface flow.
 *
 * - aiMentorChat - A function that handles the AI mentor chat process.
 * - AIMentorChatInput - The input type for the aiMentorChat function.
 * - AIMentorChatOutput - The return type for the aiMentorChat function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const AIMentorChatInputSchema = z.object({
  message: z.string().describe('The message from the user to the AI mentor.'),
  chatHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']).describe('The role of the message sender.'),
    content: z.string().describe('The content of the message.'),
  })).optional().describe('The chat history between the user and the AI mentor.'),
});
export type AIMentorChatInput = z.infer<typeof AIMentorChatInputSchema>;

const AIMentorChatOutputSchema = z.object({
  response: z.string().describe('The response from the AI mentor.'),
});
export type AIMentorChatOutput = z.infer<typeof AIMentorChatOutputSchema>;

export async function aiMentorChat(input: AIMentorChatInput): Promise<AIMentorChatOutput> {
  return aiMentorChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiMentorChatPrompt',
  input: {schema: AIMentorChatInputSchema},
  output: {schema: AIMentorChatOutputSchema},
  model: googleAI.model('gemma-7b-it-free'),
  prompt: `You are a personalized AI mentor providing learning guidance to the user.

  Your name is MentorAI.

  You have access to the previous messages of the chat in the chatHistory parameter.

  Respond to the following user message:
  {{message}}`,
});

const aiMentorChatFlow = ai.defineFlow(
  {
    name: 'aiMentorChatFlow',
    inputSchema: AIMentorChatInputSchema,
    outputSchema: AIMentorChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
