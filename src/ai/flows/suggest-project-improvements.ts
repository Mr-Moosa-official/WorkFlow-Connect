'use server';

/**
 * @fileOverview An AI agent that suggests improvements to project descriptions.
 * 
 * - suggestProjectImprovements - A function that suggests improvements to a project description.
 * - SuggestProjectImprovementsInput - The input type for the suggestProjectImprovements function.
 * - SuggestProjectImprovementsOutput - The return type for the suggestProjectImprovements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestProjectImprovementsInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('The original project description to be improved.'),
});
export type SuggestProjectImprovementsInput = z.infer<
  typeof SuggestProjectImprovementsInputSchema
>;

const SuggestProjectImprovementsOutputSchema = z.object({
  improvedDescription: z
    .string()
    .describe('The improved project description suggested by the AI.'),
});
export type SuggestProjectImprovementsOutput = z.infer<
  typeof SuggestProjectImprovementsOutputSchema
>;

export async function suggestProjectImprovements(
  input: SuggestProjectImprovementsInput
): Promise<SuggestProjectImprovementsOutput> {
  return suggestProjectImprovementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestProjectImprovementsPrompt',
  input: {schema: SuggestProjectImprovementsInputSchema},
  output: {schema: SuggestProjectImprovementsOutputSchema},
  prompt: `You are an expert at writing compelling project descriptions that attract highly qualified freelancers. Given the following project description, suggest improvements to make it more appealing and informative for potential freelancers. Focus on clarity, completeness, and persuasiveness.\n\nOriginal Project Description: {{{projectDescription}}}\n\nImproved Project Description:`
});

const suggestProjectImprovementsFlow = ai.defineFlow(
  {
    name: 'suggestProjectImprovementsFlow',
    inputSchema: SuggestProjectImprovementsInputSchema,
    outputSchema: SuggestProjectImprovementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
