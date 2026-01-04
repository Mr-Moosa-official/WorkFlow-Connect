import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Briefcase, Users, Star } from 'lucide-react';
import { projects } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const LandingHeader = () => (
  <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="container flex h-14 items-center">
      <Link href="/" className="flex items-center gap-2">
        <Briefcase className="h-6 w-6 text-primary" />
        <span className="font-bold">WorkFlow Connect</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4">
        <Button variant="ghost" asChild>
          <Link href="/projects">Find Work</Link>
        </Button>
        <Button asChild>
          <Link href="/projects/post">Post a Job</Link>
        </Button>
      </nav>
    </div>
  </header>
);

const featureCards = [
    {
        icon: <Briefcase className="h-8 w-8 text-primary" />,
        title: "Find Your Next Project",
        description: "Browse thousands of projects from top clients and find the one that matches your skills and passion.",
    },
    {
        icon: <Users className="h-8 w-8 text-primary" />,
        title: "Hire Top Talent",
        description: "Post a project and get access to a global network of expert freelancers ready to bring your ideas to life.",
    },
    {
        icon: <Star className="h-8 w-8 text-primary" />,
        title: "Quality & Security",
        description: "Work with confidence. We provide secure payments and a transparent rating system to ensure quality.",
    },
]

export default function Home() {
  const featuredProjects = projects.slice(0, 3);
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-1');

  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1">
        <section className="relative w-full py-20 md:py-32 lg:py-40">
            {heroImage && (
                 <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover -z-10"
                    data-ai-hint={heroImage.imageHint}
                    priority
                />
            )}
            <div className="absolute inset-0 bg-black/50 -z-10" />
            <div className="container mx-auto px-4 md:px-6 text-center text-primary-foreground">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                    Connect, Collaborate, Create.
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl">
                    The premier marketplace for clients and freelancers to achieve their goals together.
                </p>
                <div className="mt-10 flex justify-center gap-4">
                    <Button size="lg" asChild>
                        <Link href="/projects">
                            Find Work <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="secondary" asChild>
                        <Link href="/projects/post">Post a Job</Link>
                    </Button>
                </div>
            </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
            <div className="container px-4 md:px-6">
                <div className="grid gap-6 md:grid-cols-3">
                   {featureCards.map(feature => (
                        <Card key={feature.title} className="flex flex-col items-center text-center p-6">
                            <CardHeader>
                                {feature.icon}
                                <CardTitle className="mt-4">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </CardContent>
                        </Card>
                   ))}
                </div>
            </div>
        </section>

        <section id="featured-projects" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
              Featured Projects
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => {
                 const projectImage = PlaceHolderImages.find(img => img.id === project.image);
                 return (
                    <Card key={project.id} className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      <div className="relative h-48 w-full">
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
                        <CardTitle>{project.title}</CardTitle>
                        <p className="text-primary font-semibold text-lg">${project.budget.toLocaleString()}</p>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4 line-clamp-2 text-muted-foreground">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <Button asChild className="mt-6 w-full">
                          <Link href={`/projects/${project.id}`}>View Project</Link>
                        </Button>
                      </CardContent>
                    </Card>
                 )
              })}
            </div>
            <div className="mt-12 text-center">
              <Button asChild variant="outline">
                <Link href="/projects">
                    Browse All Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                © {new Date().getFullYear()} WorkFlow Connect. All rights reserved.
            </p>
            <nav className="flex gap-4">
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link>
            </nav>
        </div>
      </footer>
    </div>
  );
}
