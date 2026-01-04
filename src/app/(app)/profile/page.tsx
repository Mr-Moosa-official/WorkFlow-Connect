import Image from 'next/image';
import { users } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit, Star } from 'lucide-react';
import GenerateProfileSummary from './generate-profile-summary';

export default function ProfilePage() {
  const user = users[0]; // Mocking the current user as the first freelancer
  const userImage = PlaceHolderImages.find((img) => img.id === user.avatar);

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            <Avatar className="h-32 w-32 border-4 border-primary">
              {userImage && <AvatarImage src={userImage.imageUrl} alt={user.name} />}
              <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center gap-4 md:justify-start">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <Button variant="outline" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-1 text-lg text-muted-foreground">{user.title}</p>
              <div className="mt-2 flex items-center justify-center gap-2 md:justify-start">
                <span className="font-bold text-yellow-500">{user.rating.toFixed(1)}</span>
                <Star className="h-5 w-5 text-yellow-500" />
                <span className="text-muted-foreground">({user.reviews} reviews)</span>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
                {user.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="mt-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>About Me</CardTitle>
                {!user.isClient && <GenerateProfileSummary skills={user.skills} />}
              </div>
            </CardHeader>
            <CardContent className="prose prose-stone dark:prose-invert max-w-none">
                <p>{user.about}</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="portfolio" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {user.portfolio.map((item) => {
              const portfolioImage = PlaceHolderImages.find((img) => img.id === item.image);
              return (
                <Card key={item.id}>
                    {portfolioImage && (
                        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                            <Image
                                src={portfolioImage.imageUrl}
                                alt={item.title}
                                fill
                                className="object-cover"
                                data-ai-hint={portfolioImage.imageHint}
                            />
                        </div>
                    )}
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
             {user.portfolio.length === 0 && (
                <p className="text-muted-foreground col-span-3 text-center py-8">No portfolio items yet.</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center py-8">No reviews yet.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
