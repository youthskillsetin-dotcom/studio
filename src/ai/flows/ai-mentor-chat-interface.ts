
'use server';

/**
 * @fileOverview AI mentor chat interface flow.
 *
 * - aiMentorChat - A function that handles the AI mentor chat process.
 * - AIMentorChatInput - The input type for the aiMentorChat function.
 * - AIMentorChatOutput - The return type for the aiMentorChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {type Message} from 'genkit/content';
import { getLessons } from '@/lib/data';
import type { Lesson } from '@/lib/types';


// This defines the structure of each message in the chat history.
// It's flexible to handle user, model, and tool messages.
const ChatMessageSchema = z.object({
    role: z.enum(['user', 'model', 'tool']),
    content: z.any(),
});

const AIMentorChatInputSchema = z.object({
  message: z.string().describe('The message from the user to the AI mentor.'),
  chatHistory: z.array(ChatMessageSchema).optional().describe('The chat history between the user and the AI mentor.'),
});
export type AIMentorChatInput = z.infer<typeof AIMentorChatInputSchema>;

const AIMentorChatOutputSchema = z.object({
  response: z.string().describe('The response from the AI mentor.'),
});
export type AIMentorChatOutput = z.infer<typeof AIMentorChatOutputSchema>;


const getRelevantLessons = ai.defineTool(
    {
        name: 'getRelevantLessons',
        description: 'Use this tool to find relevant course content when a user asks a question about a specific lesson, topic, or concept from the YouthSkillSet curriculum.',
        inputSchema: z.object({
            query: z.string().describe('The user\'s query about a specific topic to search for in the course materials.'),
        }),
        outputSchema: z.array(z.object({
            id: z.string(),
            title: z.string(),
            description: z.string(),
            subtopics: z.array(z.object({
                title: z.string(),
                content: z.string(),
            })),
        })),
    },
    async ({ query }) => {
        const lessons = await getLessons();
        const lowerCaseQuery = query.toLowerCase();

        // Filter lessons and subtopics based on the query
        const relevantContent = lessons.map(lesson => {
            const relevantSubtopics = lesson.subtopics.filter(subtopic => 
                subtopic.title.toLowerCase().includes(lowerCaseQuery) || 
                subtopic.content.toLowerCase().includes(lowerCaseQuery)
            );

            if (relevantSubtopics.length > 0 || lesson.title.toLowerCase().includes(lowerCaseQuery) || lesson.description.toLowerCase().includes(lowerCaseQuery)) {
                return {
                    id: lesson.id!,
                    title: lesson.title,
                    description: lesson.description,
                    // Return only relevant subtopics if there's a match, otherwise return all
                    subtopics: relevantSubtopics.length > 0 ? relevantSubtopics.map(st => ({ title: st.title, content: st.content })) : lesson.subtopics.map(st => ({ title: st.title, content: st.content }))
                };
            }
            return null;
        }).filter((l): l is NonNullable<typeof l> => l !== null);
        
        return relevantContent;
    }
);


const prompt = ai.definePrompt({
    name: 'aiMentorChatPrompt',
    input: {schema: AIMentorChatInputSchema},
    output: {schema: AIMentorChatOutputSchema},
    history: (input) => input.chatHistory as Message[] | undefined,
    tools: [getRelevantLessons],
    prompt: `You are MentorAI, a specialized AI assistant for the YouthSkillSet platform. Your persona is encouraging, knowledgeable, and slightly informal, like a friendly and approachable tutor for teenagers and young adults.

    **Your Core Mission:**
    Help users learn, understand the course material, explore career paths, and stay motivated.

    **Your Interaction Guidelines:**

    1.  **Be an Expert Guide:** When a user asks about a topic from the curriculum, you **must use the \`getRelevantLessons\` tool** to find relevant information from the platform's content. Use the information returned by the tool to answer with expertise and clarity. Break down complex concepts into simple, easy-to-understand explanations. Use analogies relevant to a young audience.

    2.  **Be a Career Counselor:** If a user asks about careers (e.g., "What skills do I need for UX design?" or "What does a data analyst do?"), provide clear, actionable advice. You can reference general knowledge about career paths and skills.

    3.  **Encourage Practice:** Don't just give away answers. If a user asks for the solution to a practice question, gently guide them toward the answer first. For example, ask "What have you tried so far?" or "Which part of the lesson do you think applies here?". If they are still stuck, then provide the answer and explain the concept behind it.

    4.  **Stay On-Topic:** Your expertise is limited to the platform's curriculum (Finance, Entrepreneurship, AI, Career Skills, etc.) and general career advice. If asked about something completely unrelated (e.g., celebrity gossip, complex physics), politely steer the conversation back to learning. You can say something like, "That's an interesting question! My expertise is really in helping you with your career and learning goals. Do you have any questions about our lessons?"

    5.  **Maintain Your Persona:**
        *   Start conversations in a friendly way (e.g., "Hey there! I'm MentorAI. How can I help you level up your skills today?").
        *   Use encouraging language ("Great question!", "That's a smart way to think about it!", "You're on the right track!").
        *   Keep responses concise and well-formatted. Use markdown (like lists and bold text) to improve readability.

    **Chat History:**
    You have access to the previous messages in this conversation via the \`chatHistory\` parameter. Use this context to provide relevant and continuous guidance.

    **User's Current Message:**
    Respond to the following message from the user:
    "{{{message}}}"
    `,
     config: {
        model: 'googleai/gemini-1.5-pro-latest',
    }
  });


const aiMentorChatFlow = ai.defineFlow(
  {
    name: 'aiMentorChatFlow',
    inputSchema: AIMentorChatInputSchema,
    outputSchema: AIMentorChatOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    
    if (!output) {
      throw new Error("The AI model failed to generate a valid response.");
    }
    return output;
  }
);


export async function aiMentorChat(input: Pick<AIMentorChatInput, 'message' | 'chatHistory'>): Promise<AIMentorChatOutput> {
    return aiMentorChatFlow(input);
}
