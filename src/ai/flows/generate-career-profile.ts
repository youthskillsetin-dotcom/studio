'use server';
/**
 * @fileOverview A flow to generate a full career profile based on a user's input which could be a career title, skill, or interest.
 *
 * - generateCareerProfile - A function that handles the generation of the career profile.
 * - GenerateCareerProfileInput - The input type for the function.
 * - GenerateCareerProfileOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCareerProfileInputSchema = z.object({
  userInput: z.string().describe('The user\'s input, which can be a career title, a skill, or an interest.'),
});
export type GenerateCareerProfileInput = z.infer<typeof GenerateCareerProfileInputSchema>;

const GenerateCareerProfileOutputSchema = z.object({
  careerTitle: z.string().describe("The official title of the career."),
  description: z.string().describe("A 1-2 paragraph overview of what this career entails."),
  responsibilities: z.array(z.string()).describe("A list of 4-5 typical day-to-day responsibilities."),
  skills: z.array(z.object({
    skill: z.string().describe('The name of the skill.'),
    description: z.string().describe('A detailed, 2-3 sentence description of why this skill is important.'),
  })).describe('A list of 5-7 essential skills for this career.'),
  salaryRange: z.object({
    min: z.number().describe("The estimated starting salary for this role in INR Lakhs Per Annum (LPA)."),
    max: z.number().describe("The estimated senior-level salary for this role in INR Lakhs Per Annum (LPA)."),
  }).describe("An estimated salary range in Indian Rupees (INR) per year, expressed in Lakhs Per Annum (LPA)."),
  careerOutlook: z.string().describe("A brief paragraph on the future growth and prospects for this career."),
  learningResources: z.array(z.string()).describe("A list of 3-4 actionable next steps or learning resources, like types of online courses, books, or projects to start with."),
});
export type GenerateCareerProfileOutput = z.infer<typeof GenerateCareerProfileOutputSchema>;

export async function generateCareerProfile(input: GenerateCareerProfileInput): Promise<GenerateCareerProfileOutput> {
  return generateCareerProfileFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCareerProfilePrompt',
  input: {schema: GenerateCareerProfileInputSchema},
  output: {schema: GenerateCareerProfileOutputSchema},
  prompt: `You are an expert career counselor AI creating a detailed and inspiring career profile for a student in India.

  The user has provided the following input: {{{userInput}}}

  Your first step is to interpret the user's input. It could be a specific career title (e.g., "Software Engineer"), a skill (e.g., "Python programming"), or an interest (e.g., "making video games"). Identify the most relevant and suitable career path based on this input.

  Once you have identified the career, generate a comprehensive profile for it based on the output schema.
  - The 'careerTitle' should be the standard, professional name for the identified role.
  - Make the description and outlook sections engaging and informative.
  - Ensure the skills and responsibilities are highly relevant to the role.
  - The salary range should be in Indian Rupees, converted to Lakhs Per Annum (LPA). For example, if the salary is 500,000 INR, the value should be 5.
  - The learning resources should be generic but actionable (e.g., "Look for 'Advanced Python for Data Science' courses on Coursera or Udemy," not specific URLs).
  `,
});

const generateCareerProfileFlow = ai.defineFlow(
  {
    name: 'generateCareerProfileFlow',
    inputSchema: GenerateCareerProfileInputSchema,
    outputSchema: GenerateCareerProfileOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
