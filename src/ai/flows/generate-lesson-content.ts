
'use server';

/**
 * @fileOverview A flow to generate a complete subtopic lesson, including content, questions, and summary.
 *
 * - generateLessonContent - A function that handles the generation of the lesson content.
 * - GenerateLessonContentInput - The input type for the function.
 * - GenerateLessonContentOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLessonContentInputSchema = z.object({
  topic: z.string().describe('The topic for the new subtopic lesson.'),
});
export type GenerateLessonContentInput = z.infer<typeof GenerateLessonContentInputSchema>;


const PracticeQuestionSchema = z.object({
    id: z.string().describe("A unique ID for the question, e.g., 'q1', 'q2'."),
    type: z.enum(['mcq', 'text']).describe("The type of question: multiple-choice or open text."),
    question: z.string().describe("The question text."),
    options: z.array(z.string()).optional().describe("An array of 3-4 strings for MCQ options."),
    answer: z.string().describe("The correct answer. For MCQs, this must exactly match one of the options."),
});

export const GenerateLessonContentOutputSchema = z.object({
  title: z.string().describe("A concise, engaging title for the subtopic lesson."),
  content: z.string().describe("The lesson content, formatted as a single string of simple HTML. Use <h1>, <h2>, <p>, <ul>, and <li> tags. The content should be comprehensive and easy for a teenager to understand."),
  practice_questions: z.array(PracticeQuestionSchema).length(2).describe("An array of exactly 2 practice questions to test understanding of the content."),
  ai_summary: z.string().describe("A 2-3 sentence summary followed by a bulleted list of 3-4 key takeaways. Use standard markdown."),
  video_url: z.string().url().describe("A relevant, high-quality YouTube video URL for the topic. The URL must be a standard watch URL, not an embed link."),
});
export type GenerateLessonContentOutput = z.infer<typeof GenerateLessonContentOutputSchema>;

const prompt = ai.definePrompt({
  name: 'generateLessonContentPrompt',
  input: {schema: GenerateLessonContentInputSchema},
  output: {schema: GenerateLessonContentOutputSchema},
  prompt: `You are an expert curriculum developer for an EdTech platform called YouthSkillSet, which caters to teenagers. Your task is to generate a complete subtopic lesson based on the provided topic.

  **Topic:**
  {{{topic}}}

  **Instructions:**

  1.  **Title:** Create a short, catchy, and descriptive title for the lesson.
  2.  **Content:** Write the main lesson content as a single string of HTML.
      *   Use only the following tags: \`<h1>\` for the main title, \`<h2>\` for subheadings, \`<p>\` for paragraphs, and \`<ul>\`/\`<li>\` for bullet points.
      *   The content should be clear, educational, and engaging for a teenage audience (ages 15-20). Break down complex ideas into simple, digestible parts.
  3.  **Practice Questions:** Create exactly two practice questions.
      *   One should be a multiple-choice question ('mcq') with 3 options.
      *   One should be an open-ended text question ('text').
      *   The questions must directly relate to the content you wrote.
      *   For the MCQ, ensure the 'answer' field perfectly matches one of the 'options'.
  4.  **AI Summary:** Write a summary in markdown format. It should start with a 2-3 sentence paragraph summarizing the key concept, followed by a bulleted list of 3-4 key takeaways.
  5.  **Video URL:** Find a real, relevant, and high-quality educational YouTube video for the topic. The URL must be a standard 'watch' URL (e.g., 'https://www.youtube.com/watch?v=...'). Do NOT provide shortened or embed URLs.

  Ensure your entire output strictly adheres to the JSON schema provided.
  `,
  config: {
    model: 'googleai/gemini-1.5-pro-latest',
  }
});

const generateLessonContentFlow = ai.defineFlow(
  {
    name: 'generateLessonContentFlow',
    inputSchema: GenerateLessonContentInputSchema,
    outputSchema: GenerateLessonContentOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    
    if (!output) {
        throw new Error("The AI model failed to generate a valid lesson content.");
    }
    return output;
  }
);

export async function generateLessonContent(input: GenerateLessonContentInput): Promise<GenerateLessonContentOutput> {
  return generateLessonContentFlow(input);
}
