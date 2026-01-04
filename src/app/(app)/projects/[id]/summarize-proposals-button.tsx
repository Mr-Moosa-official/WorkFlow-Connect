"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sparkles } from "lucide-react";
import { summarizeFreelancerProposals } from "@/ai/flows/summarize-freelancer-proposals";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import type { Bid } from "@/lib/types";
import { users } from "@/lib/data";

interface SummarizeProposalsButtonProps {
  projectDescription: string;
  bids: Bid[];
}

export default function SummarizeProposalsButton({ projectDescription, bids }: SummarizeProposalsButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [summaries, setSummaries] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (bids.length === 0) return;
    setIsLoading(true);
    setSummaries([]);
    try {
      const proposals = bids.map(bid => bid.proposal);
      const result = await summarizeFreelancerProposals({ projectDescription, proposals });
      setSummaries(result.summaries);
    } catch (error) {
      console.error("Failed to summarize proposals:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to summarize proposals. Please try again.",
      });
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getFreelancerName = (freelancerId: string) => {
    return users.find(u => u.id === freelancerId)?.name || 'Unknown Freelancer';
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={() => setIsOpen(true)} disabled={bids.length === 0}>
          <Sparkles className="mr-2 h-4 w-4 text-primary" />
          Summarize with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl" onOpenAutoFocus={handleSummarize}>
        <DialogHeader>
          <DialogTitle>AI-Powered Proposal Summaries</DialogTitle>
          <DialogDescription>
            Concise summaries of each proposal to help you decide faster.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 max-h-[60vh] overflow-y-auto pr-2">
          {isLoading ? (
            <div className="space-y-4">
              {bids.map(bid => (
                <div key={bid.id} className="space-y-2">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ))}
            </div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {bids.map((bid, index) => (
                <AccordionItem value={`item-${index}`} key={bid.id}>
                  <AccordionTrigger>{`Proposal from ${getFreelancerName(bid.freelancerId)} - $${bid.amount.toLocaleString()}`}</AccordionTrigger>
                  <AccordionContent>
                    <div className="prose prose-stone dark:prose-invert max-w-none">
                      <h4 className="font-semibold text-base">AI Summary:</h4>
                      <p>{summaries[index] || "Summary not available."}</p>
                      <hr className="my-4" />
                      <h4 className="font-semibold text-base">Original Proposal:</h4>
                      <p className="text-sm text-muted-foreground">{bid.proposal}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
