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
import { Sparkles } from "lucide-react";
import { generateFreelancerProfile } from "@/ai/flows/generate-freelancer-profile";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";

export default function GenerateProfileSummary({ skills }: { skills: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [profileDraft, setProfileDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsLoading(true);
    setProfileDraft("");
    try {
      const result = await generateFreelancerProfile({ skills });
      setProfileDraft(result.profileDraft);
    } catch (error) {
      console.error("Failed to generate profile:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate profile summary. Please try again.",
      });
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
          <Sparkles className="mr-2 h-4 w-4 text-primary" />
          Generate with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]" onOpenAutoFocus={handleGenerate}>
        <DialogHeader>
          <DialogTitle>AI-Generated Profile Summary</DialogTitle>
          <DialogDescription>
            Use this draft as a starting point for your "About Me" section.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isLoading ? (
            <div className="space-y-2">
                <Skeleton className="h-24 w-full" />
            </div>
          ) : (
            <Textarea value={profileDraft} rows={8} readOnly />
          )}
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(profileDraft);
              toast({ title: "Copied to clipboard!" });
              setIsOpen(false);
            }}
            disabled={isLoading || !profileDraft}
          >
            Copy & Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
