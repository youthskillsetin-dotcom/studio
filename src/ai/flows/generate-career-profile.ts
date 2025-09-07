
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
  prompt: `Generate a comprehensive and accurate career profile for a student in India based on the user's input: {{{userInput}}}.

  **Instructions:**
  1.  **Interpret Input**: Analyze the user's input (a career title, skill, or interest). If the input is ambiguous (e.g., "manager"), default to a popular, related career like "Software Developer" and state this choice in the description.
  2.  **Generate Profile**:
      *   **careerTitle**: Use the standard professional name for the role.
      *   **description**: Write an engaging 1-2 paragraph overview, explaining the role's importance and impact.
      *   **responsibilities**: List 4-5 key daily responsibilities using action-oriented language.
      *   **skills**: List 5-7 essential skills. For each, provide a detailed 2-3 sentence description of why it's crucial for this career.
      *   **learningRoadmap**: Create a clear, 4-step beginner-to-advanced roadmap.
      *   **jobMarketInsights**:
          *   **salaryRange**: Provide a realistic salary range in Indian Rupees (INR) as Lakhs Per Annum (LPA). 'min' and 'max' must be numbers only (e.g., for ₹5,00,000, use 5).
          *   **demand**: State current job demand (e.g., "High", "Growing").
          *   **futureOutlook**: Write a concise sentence on future prospects.
      *   **suggestedRoles**: List 3-4 realistic, related job titles.
      *   **hiringCompanies**: Name 3-4 well-known companies or industries in India that hire for this role.`,
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
