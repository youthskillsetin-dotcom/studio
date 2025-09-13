
'use server';
/**
 * @fileOverview A flow to generate career archetypes based on a user's answers to a quiz.
 *
 * - generateCareerArchetypes - A function that handles the generation of career archetypes.
 * - GenerateCareerArchetypesInput - The input type for the function.
 * - GenerateCareerArchetypesOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCareerArchetypesInputSchema = z.object({
  answers: z.object({
    teamwork: z.string().describe("User's preference for working in a team vs. alone."),
    workStyle: z.string().describe("User's preference for building with hands vs. with ideas."),
    interest: z.string().describe("User's preference between solving puzzles vs. creating designs."),
    subject: z.string().describe("User's preference between understanding money vs. understanding people."),
  }),
});
export type GenerateCareerArchetypesInput = z.infer<typeof GenerateCareerArchetypesInputSchema>;

const GenerateCareerArchetypesOutputSchema = z.object({
  archetypes: z.array(z.object({
    title: z.string().describe("The title of the career archetype (e.g., 'The Analyst', 'The Builder')."),
    description: z.string().describe("A 1-2 sentence description of this archetype's core traits and motivations."),
    suggested_roles: z.array(z.string()).describe("A list of 3-4 concrete job titles that fit this archetype."),
  })).length(3).describe("A list of exactly 3 career archetypes that match the user's answers."),
});
export type GenerateCareerArchetypesOutput = z.infer<typeof GenerateCareerArchetypesOutputSchema>;

const prompt = ai.definePrompt({
  name: 'generateCareerArchetypesPrompt',
  input: {schema: GenerateCareerArchetypesInputSchema},
  output: {schema: GenerateCareerArchetypesOutputSchema},
  prompt: `You are an expert career counselor AI creating career 'archetypes' for a teenager based on their answers to a personality quiz. Your task is to generate three distinct archetypes that match their preferences.

  **User's Answers:**
  - Teamwork preference: {{{answers.teamwork}}}
  - Work style: {{{answers.workStyle}}}
  - Core interest: {{{answers.interest}}}
  - Subject preference: {{{answers.subject}}}

  **Instructions:**

  1.  **Analyze the Answers:** Based on the user's preferences, create three distinct and suitable career archetypes.
  2.  **Define Each Archetype:**
      *   **title**: Give each archetype a clear and inspiring title (e.g., "The Analyst," "The Creator," "The Strategist," "The Helper," "The Builder").
      *   **description**: Write a short, encouraging 1-2 sentence description explaining the core traits of someone with this archetype.
      *   **suggested_roles**: Provide a list of 3-4 specific, entry-level or common job titles that fit this archetype. Ensure the roles are relevant to a young person in India.
  3.  **Ensure Variety:** The three archetypes should be different from each other and reflect the nuances of the user's answers. For example, if a user likes both puzzles and design, you might suggest an "Analyst" archetype and a "Creative Technologist" archetype.
  4.  **Format Correctly:** Ensure your output is a JSON object that strictly follows the provided schema, containing exactly three archetypes.
  `,
});

const generateCareerArchetypesFlow = ai.defineFlow(
  {
    name: 'generateCareerArchetypesFlow',
    inputSchema: GenerateCareerArchetypesInputSchema,
    outputSchema: GenerateCareerArchetypesOutputSchema,
  },
  async (input) => {
    const result = await prompt.generate({
      input,
      model: 'googleai/gemini-1.5-pro-latest',
    });
    return result.output!;
  }
);

export async function generateCareerArchetypes(input: GenerateCareerArchetypesInput): Promise<GenerateCareerArchetypesOutput> {
  return generateCareerArchetypesFlow(input);
}
