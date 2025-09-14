
'use server';
/**
 * @fileOverview A flow to generate AI feedback on a user's resume.
 *
 * - generateResumeFeedback - A function that handles the generation of AI feedback.
 * - GenerateResumeFeedbackInput - The input type for the function.
 * - GenerateResumeFeedbackOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResumeDataSchema = z.object({
    fullName: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    linkedin: z.string().optional(),
    experience: z.string().optional(),
    education: z.string().optional(),
    skills: z.string().optional(),
});

export const GenerateResumeFeedbackInputSchema = z.object({
  resumeData: ResumeDataSchema,
});
export type GenerateResumeFeedbackInput = z.infer<typeof GenerateResumeFeedbackInputSchema>;

export const GenerateResumeFeedbackOutputSchema = z.object({
  overallScore: z.number().min(0).max(100).describe('An overall score for the resume from 0 to 100.'),
  overallFeedback: z.string().describe('A 2-3 sentence summary of the resume\'s strengths and key areas for improvement.'),
  sectionFeedback: z.object({
    contact: z.string().describe('Specific feedback for the Contact Information section.'),
    experience: z.string().describe('Specific feedback for the Experience section, focusing on action verbs and impact.'),
    education: z.string().describe('Specific feedback for the Education section.'),
    skills: z.string().describe('Specific feedback for the Skills section.'),
  }).describe('Detailed feedback for each major section of the resume.'),
});
export type GenerateResumeFeedbackOutput = z.infer<typeof GenerateResumeFeedbackOutputSchema>;


const prompt = ai.definePrompt({
  name: 'generateResumeFeedbackPrompt',
  input: {schema: GenerateResumeFeedbackInputSchema},
  output: {schema: GenerateResumeFeedbackOutputSchema},
  prompt: `You are an expert AI career coach specializing in reviewing resumes for students and recent graduates. Your task is to provide constructive, actionable feedback on the following resume content.

  **Resume Content:**
  - Full Name: {{{resumeData.fullName}}}
  - Contact: {{{resumeData.email}}}, {{{resumeData.phone}}}, {{{resumeData.linkedin}}}
  - Experience: {{{resumeData.experience}}}
  - Education: {{{resumeData.education}}}
  - Skills: {{{resumeData.skills}}}

  **Instructions:**

  1.  **Calculate an Overall Score:** Based on best practices for entry-level resumes, provide an overall score out of 100. Consider clarity, impact, formatting (as inferred from the text), and completeness.
  2.  **Write Overall Feedback:** In 2-3 sentences, summarize the resume's strongest points and the most critical areas that need improvement. Maintain an encouraging and helpful tone.
  3.  **Provide Section-Specific Feedback:**
      *   **Contact:** Check if essential contact info (email, phone, LinkedIn) is present and looks professional.
      *   **Experience:** This is the most important section. Check if the bullet points start with strong action verbs (e.g., "Managed," "Created," "Led," "Analyzed"). Do they describe accomplishments rather than just duties? Are they quantified (e.g., "increased engagement by 30%")?
      *   **Education:** Is the information clear and correctly formatted?
      *   **Skills:** Are the skills relevant? Is there a good mix of technical (hard) and soft skills?
  4.  **Be Specific and Actionable:** Don't just say "improve experience." Say "In your experience section, replace 'Was responsible for...' with a stronger action verb like 'Coordinated...' and try to add a number to show the impact, like 'Coordinated a fair for over 150 students.'".
  5.  **Maintain Persona:** Be encouraging, positive, and constructive. You are a coach helping someone land their first job, not a harsh critic.
  `,
  config: {
    model: 'googleai/gemini-1.5-pro-latest',
  }
});


const generateResumeFeedbackFlow = ai.defineFlow(
  {
    name: 'generateResumeFeedbackFlow',
    inputSchema: GenerateResumeFeedbackInputSchema,
    outputSchema: GenerateResumeFeedbackOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    
    if (!output) {
      throw new Error("The AI model failed to generate valid feedback for the resume.");
    }
    return output;
  }
);

export async function generateResumeFeedback(input: GenerateResumeFeedbackInput): Promise<GenerateResumeFeedbackOutput> {
  return generateResumeFeedbackFlow(input);
}
