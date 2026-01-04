import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { projects } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ProjectsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Find Your Next Project</h1>
        <p className="mt-2 text-muted-foreground">
          Browse thousands of opportunities to find your perfect match.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search by title, skill, or keyword..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map((project) => {
          const projectImage = PlaceHolderImages.find(img => img.id === project.image);
          return (
            <Card key={project.id} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-40 w-full">
                {projectImage && (
                  <Image
                    src={projectImage.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                    data-ai-hint={projectImage.imageHint}
                  />
                )}
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">{project.title}</CardTitle>
                <p className="text-lg font-semibold text-primary">${project.budget.toLocaleString()}</p>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <p className="mb-4 line-clamp-3 text-muted-foreground flex-grow">
                  {project.description}
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.skills.slice(0, 4).map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <Button asChild className="mt-auto w-full">
                  <Link href={`/projects/${project.id}`}>View Project</Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
