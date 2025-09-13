
'use server';
/**
 * @fileOverview An AI agent that generates a personalized learning plan based on a user's career goal.
 *
 * - generateLearningPlan - A function that handles the learning plan generation.
 * - GenerateLearningPlanInput - The input type for the function.
 * - GenerateLearningPlanOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getLessons } from '@/lib/data';

const GenerateLearningPlanInputSchema = z.object({
  careerGoal: z.string().describe('The career goal the user wants to achieve, e.g., "Data Analyst" or "Entrepreneur".'),
});
export type GenerateLearningPlanInput = z.infer<typeof GenerateLearningPlanInputSchema>;

const GenerateLearningPlanOutputSchema = z.object({
  introduction: z.string().describe("A brief, encouraging introduction to the learning plan."),
  steps: z.array(z.object({
    step: z.number().describe('The step number.'),
    title: z.string().describe('A descriptive title for the step.'),
    description: z.string().describe('A detailed explanation of what to do in this step.'),
    relevant_module_ids: z.array(z.string()).optional().describe('A list of IDs of relevant modules from the platform that apply to this step.'),
  })).describe('A list of step-by-step actions the user should take.'),
  conclusion: z.string().describe("A final, motivating closing statement."),
});
export type GenerateLearningPlanOutput = z.infer<typeof GenerateLearningPlanOutputSchema>;


// This is the tool the AI agent can use. It allows the AI to "look up"
// the available course content on the platform.
const getAvailableLessons = ai.defineTool(
    {
      name: 'getAvailableLessons',
      description: 'Returns a list of all available learning modules on the platform, which can be used to find relevant courses for a user\'s career goal.',
      inputSchema: z.object({}),
      outputSchema: z.array(z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
      })),
    },
    async () => {
      const lessons = await getLessons();
      // We only return a subset of the data to the AI to keep the context clean.
      return lessons.map(({ id, title, description }) => ({ id: id!, title, description }));
    }
);


const prompt = ai.definePrompt({
    name: 'learningPlanPrompt',
    input: {schema: GenerateLearningPlanInputSchema},
    output: {schema: GenerateLearningPlanOutputSchema},
    tools: [getAvailableLessons],
    prompt: `You are an expert AI career counselor for the YouthSkillSet platform. Your task is to create a personalized, actionable learning plan for a user based on their stated career goal.

    **Instructions:**

    1.  **Analyze the User's Goal:** Understand the user's career goal: \`{{{careerGoal}}}\`.

    2.  **Find Relevant Courses:** Use the \`getAvailableLessons\` tool to see all the learning modules available on the platform. Identify which of these modules are most relevant to the user's goal.

    3.  **Create a Step-by-Step Plan:** Generate a 3-5 step plan. For each step:
        *   Provide a clear title (e.g., "Step 1: Master the Fundamentals of Finance").
        *   Write a detailed description of what the user should do.
        *   If a step directly relates to one or more modules on the platform, you **must** include the \`relevant_module_ids\` in your response for that step. For instance, if the tool returns a module with the ID "1" and title "Personal Finance 101", you must include "1" in the \`relevant_module_ids\` array.

    4.  **Structure the Output:**
        *   Start with a brief, encouraging introduction.
        *   Present the steps clearly.
        *   End with a motivating conclusion.
    `,
});

const generateLearningPlanFlow = ai.defineFlow(
  {
    name: 'generateLearningPlanFlow',
    inputSchema: GenerateLearningPlanInputSchema,
    outputSchema: GenerateLearningPlanOutputSchema,
  },
  async (input) => {
    const { output } = await prompt.generate({
      input,
      model: 'googleai/gemini-1.5-pro-latest', // Pro model is better for tool use
    });

    if (!output) {
      throw new Error("The AI model failed to generate a valid learning plan.");
    }
    return output;
  }
);


export async function generateLearningPlan(input: GenerateLearningPlanInput): Promise<GenerateLearningPlanOutput> {
  return generateLearningPlanFlow(input);
}
