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
import { suggestProjectImprovements } from "@/ai/flows/suggest-project-improvements";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function ImproveDescriptionButton({ projectDescription }: { projectDescription: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [improvedDescription, setImprovedDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleImproveDescription = async () => {
    setIsLoading(true);
    setImprovedDescription("");
    try {
      const result = await suggestProjectImprovements({ projectDescription });
      setImprovedDescription(result.improvedDescription);
    } catch (error) {
      console.error("Failed to improve description:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate improvements. Please try again.",
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
          Improve with AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]" onOpenAutoFocus={handleImproveDescription}>
        <DialogHeader>
          <DialogTitle>AI-Powered Improvements</DialogTitle>
          <DialogDescription>
            Here are some suggestions to make your project description more compelling.
          </DialogDescription>
        </DialogHeader>
        <div className="prose prose-stone dark:prose-invert max-w-none rounded-md border p-4">
          {isLoading ? (
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-4/5 mt-4" />
                <Skeleton className="h-4 w-full" />
            </div>
          ) : (
            <p>{improvedDescription}</p>
          )}
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(improvedDescription);
              toast({ title: "Copied to clipboard!" });
              setIsOpen(false);
            }}
            disabled={isLoading || !improvedDescription}
          >
            Copy & Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
