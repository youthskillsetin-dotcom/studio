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
  description: z.string().describe("A 1-2 paragraph overview of what this career entails, explaining its relevance and importance."),
  responsibilities: z.array(z.string()).describe("A list of 4-5 typical day-to-day responsibilities."),
  skills: z.array(z.object({
    skill: z.string().describe('The name of the skill.'),
    description: z.string().describe('A detailed, 2-3 sentence description of why this skill is important and how it is applied in this career.'),
  })).describe('A list of 5-7 essential skills for this career.'),
  learningRoadmap: z.object({
      step1: z.string().describe("Step 1: Foundational skills to master first."),
      step2: z.string().describe("Step 2: Essential tools and technologies to learn."),
      step3: z.string().describe("Step 3: Practical application through projects or internships."),
      step4: z.string().describe("Step 4: Advanced specialization or next-level skills."),
  }).describe("A 4-step learning roadmap from beginner to advanced."),
  jobMarketInsights: z.object({
    salaryRange: z.object({
        min: z.number().describe("The estimated starting salary for this role in INR Lakhs Per Annum (LPA). This must be a number only."),
        max: z.number().describe("The estimated senior-level salary for this role in INR Lakhs Per Annum (LPA). This must be a number only."),
    }).describe("An estimated salary range in Indian Rupees (INR) per year, expressed in Lakhs Per Annum (LPA). The min and max values should be numbers, not strings."),
    demand: z.string().describe("The current demand level for this role (e.g., 'High', 'Medium', 'Growing')."),
    futureOutlook: z.string().describe("A 1-2 sentence projection on the future growth of this career."),
  }).describe("Insights into the job market for this career."),
  suggestedRoles: z.array(z.string()).describe("A list of 3-4 entry-level or related job titles."),
  hiringCompanies: z.array(z.string()).describe("A list of 3-4 example companies or types of industries that hire for this role."),
});
export type GenerateCareerProfileOutput = z.infer<typeof GenerateCareerProfileOutputSchema>;

export async function generateCareerProfile(input: GenerateCareerProfileInput): Promise<GenerateCareerProfileOutput> {
  return generateCareerProfileFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCareerProfilePrompt',
  input: {schema: GenerateCareerProfileInputSchema},
  output: {schema: GenerateCareerProfileOutputSchema},
  model: 'gemini-1.5-flash-latest',
  prompt: `You are an expert career counselor AI, acting as a friendly and inspiring guide for a student in India. Your goal is to generate a comprehensive, accurate, and engaging career profile based on the user's input.

  The user has provided the following input: {{{userInput}}}

  **Your Task:**

  1.  **Interpret the Input:** First, carefully analyze the user's input. It could be a specific career title (e.g., "Software Engineer"), a skill (e.g., "Python programming"), or an interest (e.g., "making video games"). Identify the most relevant and suitable professional career path based on this input.

  2.  **Generate a Detailed Profile:** Once you have identified the career, generate a complete profile using the specified output schema. Make every section rich, detailed, and encouraging.
      *   **careerTitle**: Use the standard, professional name for the role.
      *   **description**: Write an engaging 1-2 paragraph overview. Don't just define the role; explain its importance and the impact it has.
      *   **responsibilities**: List 4-5 key responsibilities. Use action-oriented language to describe what a person in this role *actually does* day-to-day.
      *   **skills**: For each of the 5-7 skills, provide a detailed 2-3 sentence description explaining *why* the skill is essential and how it's applied in this specific career.
      *   **learningRoadmap**: Create a clear, 4-step roadmap that guides a beginner. Start with foundational knowledge and progress to advanced specializations. Be specific.
      *   **jobMarketInsights**:
          *   **salaryRange**: Provide a realistic salary range in **Indian Rupees (INR)**. The 'min' and 'max' values must be numbers only representing Lakhs Per Annum (LPA). For example, if a salary is 5,00,000 INR, the value for the field should be the number 5. Do not include currency symbols or "LPA" text in the number fields.
          *   **demand**: State the current job demand clearly (e.g., "High", "Growing").
          *   **futureOutlook**: Write a concise but encouraging sentence about future prospects.
      *   **suggestedRoles**: List a few realistic entry-level or related job titles.
      *   **hiringCompanies**: Name a few well-known companies or types of industries (e.g., "Tech Startups", "Financial Services") that hire for this role in India.
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
