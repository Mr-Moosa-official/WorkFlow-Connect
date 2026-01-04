'use server';
/**
 * @fileOverview Summarizes freelancer proposals for a client.
 *
 * - summarizeFreelancerProposals - A function that summarizes freelancer proposals.
 * - SummarizeFreelancerProposalsInput - The input type for the summarizeFreelancerProposals function.
 * - SummarizeFreelancerProposalsOutput - The return type for the summarizeFreelancerProposals function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeFreelancerProposalsInputSchema = z.object({
  projectDescription: z.string().describe('The description of the project.'),
  proposals: z.array(z.string()).describe('An array of freelancer proposals.'),
});
export type SummarizeFreelancerProposalsInput = z.infer<
  typeof SummarizeFreelancerProposalsInputSchema
>;

const SummarizeFreelancerProposalsOutputSchema = z.object({
  summaries: z
    .array(z.string())
    .describe('An array of summaries for each proposal.'),
});
export type SummarizeFreelancerProposalsOutput = z.infer<
  typeof SummarizeFreelancerProposalsOutputSchema
>;

export async function summarizeFreelancerProposals(
  input: SummarizeFreelancerProposalsInput
): Promise<SummarizeFreelancerProposalsOutput> {
  return summarizeFreelancerProposalsFlow(input);
}

const summarizeProposalsPrompt = ai.definePrompt({
  name: 'summarizeProposalsPrompt',
  input: {schema: SummarizeFreelancerProposalsInputSchema},
  output: {schema: SummarizeFreelancerProposalsOutputSchema},
  prompt: `You are a project management assistant helping a client review freelancer proposals. For each proposal, provide a concise summary that captures the freelancer's key offerings and approach to the project. The project description is {{{projectDescription}}}. The proposals are as follows: {{#each proposals}} Proposal: {{{this}}} {{/each}}`,
});

const summarizeFreelancerProposalsFlow = ai.defineFlow(
  {
    name: 'summarizeFreelancerProposalsFlow',
    inputSchema: SummarizeFreelancerProposalsInputSchema,
    outputSchema: SummarizeFreelancerProposalsOutputSchema,
  },
  async input => {
    const summaries = [];
    for (const proposal of input.proposals) {
      const { output } = await ai.generate({
        prompt: `Summarize the following freelancer proposal in a concise manner, highlighting the key offerings and approach to the project. Project Description: ${input.projectDescription}. Proposal: ${proposal}`,
        model: 'googleai/gemini-2.5-flash'
      });
      summaries.push(output?.text ?? 'No summary available.');
    }
    return { summaries };
  }
);
