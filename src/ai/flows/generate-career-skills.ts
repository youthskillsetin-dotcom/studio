
'use server';

/**
 * @fileOverview A flow to generate recommended skills for a given career path.
 *
 * - generateCareerSkills - A function that handles the generation of career skills.
 * - GenerateCareerSkillsInput - The input type for the generateCareerSkills function.
 * - GenerateCareerSkillsOutput - The return type for the generateCareerSkills function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCareerSkillsInputSchema = z.object({
  career: z.string().describe('The desired career path.'),
});
export type GenerateCareerSkillsInput = z.infer<typeof GenerateCareerSkillsInputSchema>;

const GenerateCareerSkillsOutputSchema = z.object({
  skills: z.array(z.object({
    skill: z.string().describe('The name of the skill.'),
    description: z.string().describe('A detailed description of why this skill is important for the career.'),
  })).describe('A list of recommended skills for the career path.'),
});
export type GenerateCareerSkillsOutput = z.infer<typeof GenerateCareerSkillsOutputSchema>;

export async function generateCareerSkills(input: GenerateCareerSkillsInput): Promise<GenerateCareerSkillsOutput> {
  return generateCareerSkillsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCareerSkillsPrompt',
  input: {schema: GenerateCareerSkillsInputSchema},
  output: {schema: GenerateCareerSkillsOutputSchema},
  model: 'googleai/gemini-1.5-flash',
  prompt: `You are an expert career counselor AI.
  
  Based on the user's desired career path, generate a list of 5-7 essential skills required for that role.
  For each skill, provide a detailed, 2-3 sentence description explaining its importance and what it entails in the context of the specified career.

  Career: {{{career}}}
  `,
});

const generateCareerSkillsFlow = ai.defineFlow(
  {
    name: 'generateCareerSkillsFlow',
    inputSchema: GenerateCareerSkillsInputSchema,
    outputSchema: GenerateCareerSkillsOutputSchema,
  },
  async input => {
    const result = await prompt(input);
    return result.output!;
  }
);
