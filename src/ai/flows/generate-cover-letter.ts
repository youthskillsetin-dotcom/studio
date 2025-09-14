
'use server';
/**
 * @fileOverview A flow to generate a personalized cover letter based on a user's resume and a job description.
 *
 * - generateCoverLetter - A function that handles the generation of the cover letter.
 * - GenerateCoverLetterInput - The input type for the function.
 * - GenerateCoverLetterOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResumeDataSchema = z.object({
    fullName: z.string().optional().describe('The user\'s full name.'),
    email: z.string().optional().describe('The user\'s email address.'),
    phone: z.string().optional().describe('The user\'s phone number.'),
    experience: z.string().optional().describe('A text block describing the user\'s work experience, with bullet points for achievements.'),
    education: z.string().optional().describe('A text block describing the user\'s education.'),
    skills: z.string().optional().describe('A comma-separated or bulleted list of the user\'s skills.'),
});

const GenerateCoverLetterInputSchema = z.object({
  resumeData: ResumeDataSchema.describe('The user\'s resume information.'),
  jobDescription: z.string().min(50, 'Please provide a more detailed job description.').describe('The full job description for the role the user is applying for.'),
});
export type GenerateCoverLetterInput = z.infer<typeof GenerateCoverLetterInputSchema>;

const GenerateCoverLetterOutputSchema = z.object({
  coverLetter: z.string().describe('The full, professionally written cover letter in markdown format. It should be tailored to the job description, highlighting the user\'s relevant skills and experiences from their resume.'),
});
export type GenerateCoverLetterOutput = z.infer<typeof GenerateCoverLetterOutputSchema>;


const prompt = ai.definePrompt({
  name: 'generateCoverLetterPrompt',
  input: {schema: GenerateCoverLetterInputSchema},
  output: {schema: GenerateCoverLetterOutputSchema},
  prompt: `You are an expert AI career coach specializing in writing compelling cover letters for students and recent graduates. Your task is to write a personalized and professional cover letter based on the provided resume details and job description.

  **User's Resume Data:**
  - Full Name: {{{resumeData.fullName}}}
  - Experience: {{{resumeData.experience}}}
  - Education: {{{resumeData.education}}}
  - Skills: {{{resumeData.skills}}}

  **Job Description to Apply For:**
  ---
  {{{jobDescription}}}
  ---

  **Instructions:**

  1.  **Analyze the Job Description:** Carefully read the job description to identify the key requirements, skills, and responsibilities the employer is looking for.
  2.  **Match Skills and Experience:** Review the user's resume data. Find and highlight the most relevant skills and experiences that match the job description.
  3.  **Structure the Cover Letter:** Write a professional cover letter with the following structure:
      *   **Introduction:** State the position the user is applying for and where they saw it. Express enthusiasm for the role and the company.
      *   **Body Paragraph(s):** In one or two paragraphs, connect the user's experience and skills directly to the job requirements. Use specific examples from their resume (e.g., 'My experience organizing the school science fair for 150+ students demonstrates my project management and coordination skills, which would be valuable for this role.'). Don't just list skills; explain how they apply.
      *   **Conclusion:** Reiterate interest in the role, express eagerness to discuss their qualifications further, and thank the hiring manager for their time and consideration.
  4.  **Maintain a Professional Tone:** The tone should be confident, enthusiastic, and professional. The entire output must be a single string formatted in markdown. Do not include placeholders like '[Your Name]' or '[Company Name]'; use the information provided or infer it if necessary.
  `,
  config: {
    model: 'googleai/gemini-1.5-pro-latest',
  }
});


const generateCoverLetterFlow = ai.defineFlow(
  {
    name: 'generateCoverLetterFlow',
    inputSchema: GenerateCoverLetterInputSchema,
    outputSchema: GenerateCoverLetterOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    
    if (!output) {
      throw new Error("The AI model failed to generate a valid cover letter.");
    }
    return output;
  }
);

export async function generateCoverLetter(input: GenerateCoverLetterInput): Promise<GenerateCoverLetterOutput> {
  return generateCoverLetterFlow(input);
}
