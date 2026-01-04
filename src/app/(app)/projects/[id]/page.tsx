import Image from "next/image";
import Link from "next/link";
import { projects, users } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, DollarSign, User as UserIcon } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import ImproveDescriptionButton from "./improve-description-button";
import SummarizeProposalsButton from "./summarize-proposals-button";

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id);
  
  if (!project) {
    return <div className="container py-12">Project not found.</div>;
  }

  const client = users.find((u) => u.id === project.clientId);
  const projectImage = PlaceHolderImages.find(img => img.id === project.image);

  return (
    <div className="container mx-auto max-w-6xl py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {projectImage && (
            <div className="relative mb-6 h-64 w-full rounded-lg overflow-hidden">
               <Image
                  src={projectImage.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                  data-ai-hint={projectImage.imageHint}
                />
            </div>
          )}
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold tracking-tight mb-2">{project.title}</h1>
            <ImproveDescriptionButton projectDescription={project.description} />
          </div>
          
          <div className="mb-6 flex flex-wrap gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span>Budget: ${project.budget.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="prose prose-stone dark:prose-invert max-w-none">
            <p>{project.description}</p>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>
          </div>

          <Separator className="my-8" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Proposals ({project.bids.length})</h2>
              <SummarizeProposalsButton projectDescription={project.description} bids={project.bids} />
            </div>
            <div className="space-y-6">
              {project.bids.length > 0 ? (
                project.bids.map((bid) => {
                  const freelancer = users.find(u => u.id === bid.freelancerId);
                  if (!freelancer) return null;
                  const freelancerImage = PlaceHolderImages.find(img => img.id === freelancer.avatar);
                  return (
                    <Card key={bid.id}>
                      <CardHeader className="flex flex-row items-center justify-between">
                         <div className="flex items-center gap-4">
                            <Avatar>
                                {freelancerImage && <AvatarImage src={freelancerImage.imageUrl} />}
                                <AvatarFallback>{freelancer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{freelancer.name}</p>
                                <p className="text-sm text-muted-foreground">{freelancer.title}</p>
                            </div>
                         </div>
                         <div className="text-right">
                             <p className="text-lg font-bold text-primary">${bid.amount.toLocaleString()}</p>
                             <p className="text-sm text-muted-foreground">{new Date(bid.timestamp).toLocaleDateString()}</p>
                         </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{bid.proposal}</p>
                      </CardContent>
                    </Card>
                  )
                })
              ) : (
                <p className="text-muted-foreground">Be the first to submit a proposal!</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {client && (
            <Card>
              <CardHeader>
                <CardTitle>About the Client</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <UserIcon className="p-2"/>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{client.name}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                       <span>{client.rating.toFixed(1)}</span>
                       <span className="text-yellow-500">★</span>
                       <span>({client.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                    <Link href={`/profile/${client.id}`}>View Profile</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Submit Your Proposal</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="amount">Your Bid</Label>
                  <Input id="amount" type="number" placeholder="e.g. 4500" />
                </div>
                <div>
                  <Label htmlFor="proposal">Your Proposal</Label>
                  <Textarea id="proposal" placeholder="Explain why you're the best fit for this project..." rows={6}/>
                </div>
                <Button className="w-full">Submit Proposal</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
