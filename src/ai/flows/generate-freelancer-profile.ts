'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating a freelancer profile based on input skills.
 *
 * The flow takes a list of skills as input and uses a language model to generate a draft freelancer profile.
 * It exports:
 *   - `generateFreelancerProfile`: The main function to trigger the profile generation flow.
 *   - `GenerateFreelancerProfileInput`: The TypeScript type definition for the input schema.
 *   - `GenerateFreelancerProfileOutput`: The TypeScript type definition for the output schema.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateFreelancerProfileInputSchema = z.object({
  skills: z
    .array(z.string())
    .describe('A list of skills the freelancer possesses.'),
});
export type GenerateFreelancerProfileInput = z.infer<
  typeof GenerateFreelancerProfileInputSchema
>;

const GenerateFreelancerProfileOutputSchema = z.object({
  profileDraft: z
    .string()
    .describe('A draft of the freelancer profile generated based on the input skills.'),
});
export type GenerateFreelancerProfileOutput = z.infer<
  typeof GenerateFreelancerProfileOutputSchema
>;

export async function generateFreelancerProfile(
  input: GenerateFreelancerProfileInput
): Promise<GenerateFreelancerProfileOutput> {
  return generateFreelancerProfileFlow(input);
}

const generateFreelancerProfilePrompt = ai.definePrompt({
  name: 'generateFreelancerProfilePrompt',
  input: {schema: GenerateFreelancerProfileInputSchema},
  output: {schema: GenerateFreelancerProfileOutputSchema},
  prompt: `You are an AI assistant specialized in creating compelling freelancer profiles.

  Based on the skills provided, generate a draft for a freelancer profile that highlights their expertise and attracts potential clients.

  Skills: {{#each skills}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  Profile Draft:
  `,
});

const generateFreelancerProfileFlow = ai.defineFlow(
  {
    name: 'generateFreelancerProfileFlow',
    inputSchema: GenerateFreelancerProfileInputSchema,
    outputSchema: GenerateFreelancerProfileOutputSchema,
  },
  async input => {
    const {output} = await generateFreelancerProfilePrompt(input);
    return output!;
  }
);
