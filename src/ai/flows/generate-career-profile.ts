
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
        min: z.string().describe("The estimated starting salary for this role in INR Lakhs Per Annum (LPA). This must be a number as a string, e.g., '5' for 5 LPA."),
        max: z.string().describe("The estimated senior-level salary for this role in INR Lakhs Per Annum (LPA). This must be a number as a string, e.g., '15' for 15 LPA."),
    }).describe("An estimated salary range in Indian Rupees (INR) per year, expressed in Lakhs Per Annum (LPA)."),
    demand: z.string().describe("The current demand level for this role (e.g., 'High', 'Medium', 'Growing')."),
    futureOutlook: z.string().describe("A 1-2 sentence projection on the future growth of this career."),
  }).describe("Insights into the job market for this career."),
  suggestedRoles: z.array(z.string()).describe("A list of 3-4 entry-level or related job titles."),
  hiringCompanies: z.array(z.string()).describe("A list of 3-4 example companies or types of industries that hire for this role."),
});
export type GenerateCareerProfileOutput = z.infer<typeof GenerateCareerProfileOutputSchema>;

const prompt = ai.definePrompt({
  name: 'generateCareerProfilePrompt',
  input: {schema: GenerateCareerProfileInputSchema},
  output: {schema: GenerateCareerProfileOutputSchema},
  prompt: `You are an expert career counselor AI. Your task is to generate a comprehensive and accurate career profile tailored for a student in India based on the user's input. The user might provide a career title, a skill, or a general interest.

  **Instructions:**

  1.  **Interpret the User's Input:**
      *   Analyze the user's input: \`{{{userInput}}}\`.
      *   If the input is a clear career title (e.g., "Software Developer," "UX Designer"), proceed.
      *   If the input is a skill (e.g., "Python," "Graphic Design"), identify a primary and popular career path associated with that skill (e.g., Python -> "Data Scientist," Graphic Design -> "Graphic Designer").
      *   If the input is an interest (e.g., "video games," "helping people"), infer a relevant and common career path (e.g., "Game Developer," "Social Worker").
      *   If the input is ambiguous or too broad (e.g., "manager," "business"), default to a popular and well-defined career like "Software Developer" and explicitly state in the description that you have chosen a common career path as the input was broad.

  2.  **Generate the Profile Content (Strictly follow the output schema):**
      *   **careerTitle**: Provide the standard professional title for the identified career.
      *   **description**: Write a concise and engaging 1-2 paragraph overview. Explain what professionals in this role do and why their work is important.
      *   **responsibilities**: List 4-5 key, typical day-to-day responsibilities. Use clear, action-oriented language (e.g., "Develop and maintain web applications," "Conduct user research...").
      *   **skills**: Identify 5-7 essential skills. For each skill, provide a detailed 2-3 sentence description explaining *why* it's important and *how* it's used in this specific career.
      *   **learningRoadmap**: Create a practical, 4-step learning roadmap from beginner to advanced. Each step should be a clear, actionable description.
      *   **jobMarketInsights**:
          *   **salaryRange**: Provide a realistic salary range in **Indian Rupees (INR) Lakhs Per Annum (LPA)**. The 'min' and 'max' values MUST be strings representing numbers (e.g., for ₹5,00,000, use "5"; for ₹15,50,000 use "15.5").
          *   **demand**: State the current job demand (e.g., "High," "Medium," "Growing").
          *   **futureOutlook**: Write a concise 1-2 sentence projection on the future prospects of this career.
      *   **suggestedRoles**: List 3-4 related or entry-level job titles that a person pursuing this path could aim for.
      *   **hiringCompanies**: Name 3-4 specific, well-known companies or types of industries in India that hire for this role.`,
});

const generateCareerProfileFlow = ai.defineFlow(
  {
    name: 'generateCareerProfileFlow',
    inputSchema: GenerateCareerProfileInputSchema,
    outputSchema: GenerateCareerProfileOutputSchema,
  },
  async (input) => {
    const result = await prompt.generate({
      input,
      model: 'googleai/gemini-1.5-pro-latest',
    });
    return result.output!;
  }
);

export async function generateCareerProfile(input: GenerateCareerProfileInput): Promise<GenerateCareerProfileOutput> {
  return generateCareerProfileFlow(input);
}
