
'use server';

/**
 * @fileOverview A flow to generate a complete course with multiple subtopics from a single topic.
 *
 * - generateFullCourse - A function that handles the generation of the course.
 * - GenerateFullCourseInput - The input type for the function.
 * - GenerateFullCourseOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFullCourseInputSchema = z.object({
  topic: z.string().describe('The overall topic for the new course.'),
  description: z.string().optional().describe('An optional brief description or specific focus for the course.'),
});
export type GenerateFullCourseInput = z.infer<typeof GenerateFullCourseInputSchema>;

const PracticeQuestionSchema = z.object({
    id: z.string().describe("A unique ID for the question, e.g., 'q1', 'q2'."),
    type: z.enum(['mcq', 'text']).describe("The type of question: multiple-choice or open text."),
    question: z.string().describe("The question text."),
    options: z.array(z.string()).optional().describe("An array of 3-4 strings for MCQ options."),
    answer: z.string().describe("The correct answer. For MCQs, this must exactly match one of the options."),
});

const SubtopicSchema = z.object({
  title: z.string().describe("A concise, engaging title for this specific subtopic lesson (e.g., 'Day 1: Understanding Income')."),
  content: z.string().describe("The lesson content for this subtopic, formatted as a single string of simple HTML. Use <h1>, <h2>, <p>, <ul>, and <li> tags. The content should be comprehensive and easy for a teenager to understand."),
  practice_questions: z.array(PracticeQuestionSchema).length(2).describe("An array of exactly 2 practice questions to test understanding of the content for this subtopic."),
  ai_summary: z.string().describe("A 2-3 sentence summary followed by a bulleted list of 3-4 key takeaways for this subtopic. Use standard markdown."),
});


const GenerateFullCourseOutputSchema = z.object({
  title: z.string().describe("A concise, engaging title for the entire course/module."),
  description: z.string().describe("A 1-2 sentence description of what the entire course covers."),
  subtopics: z.array(SubtopicSchema).min(3).max(5).describe("An array of 3 to 5 distinct subtopic lessons that progressively build on each other to form a coherent course.")
});
export type GenerateFullCourseOutput = z.infer<typeof GenerateFullCourseOutputSchema>;


const prompt = ai.definePrompt({
  name: 'generateFullCoursePrompt',
  input: {schema: GenerateFullCourseInputSchema},
  output: {schema: GenerateFullCourseOutputSchema},
  model: 'googleai/gemini-1.5-pro-latest',
  prompt: `You are an expert curriculum developer for an EdTech platform called YouthSkillSet, which caters to teenagers (ages 15-20). Your task is to generate a complete, multi-day course module based on the provided topic.

  **Course Topic:**
  "{{{topic}}}"

  {{#if description}}
  **Additional Focus:**
  "{{{description}}}"
  {{/if}}

  **Instructions:**

  1.  **Course Title & Description:** First, create a high-level, engaging title and a short description for the entire course module.

  2.  **Break Down into Subtopics:** Divide the main topic into 3 to 5 logical, sequential subtopics. Each subtopic will be a 'day' in the course. The subtopics should flow logically from one to the next.

  3.  **Generate Each Subtopic Lesson:** For each of the subtopics you've defined, you must generate the following detailed content:
      *   **title:** A clear title for that day's lesson (e.g., "Day 1: The Basics of X").
      *   **content:** Write the main lesson content as a single string of simple HTML. Use only \`<h1>\`, \`<h2>\`, \`<p>\`, and \`<ul>\`/\`<li>\` tags. The content must be clear, educational, and engaging for a teenage audience.
      *   **practice_questions:** Create exactly two practice questions for that subtopic. One must be a multiple-choice question ('mcq') with 3 options, and one must be an open-ended text question ('text'). The questions must directly relate to the subtopic's content.
      *   **ai_summary:** Write a summary in markdown format for the subtopic. It should be a 2-3 sentence paragraph followed by a bulleted list of 3-4 key takeaways.

  4.  **Final Output:** Your final output must be a single JSON object that strictly adheres to the provided schema, containing the overall course title, description, and the array of fully-populated subtopic objects.
  `,
});

const generateFullCourseFlow = ai.defineFlow(
  {
    name: 'generateFullCourseFlow',
    inputSchema: GenerateFullCourseInputSchema,
    outputSchema: GenerateFullCourseOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    
    if (!output) {
        throw new Error("The AI model failed to generate a valid course structure.");
    }
    return output;
  }
);

export async function generateFullCourse(input: GenerateFullCourseInput): Promise<GenerateFullCourseOutput> {
  return generateFullCourseFlow(input);
}
