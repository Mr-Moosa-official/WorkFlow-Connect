import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function PostProjectPage() {
  return (
    <div className="container mx-auto max-w-3xl py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Post a New Project</CardTitle>
          <CardDescription>
            Fill out the details below to attract the best talent for your job.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input id="title" placeholder="e.g., E-commerce Website Redesign" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Project Category</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="design">Web & UI/UX Design</SelectItem>
                  <SelectItem value="development">Web Development</SelectItem>
                  <SelectItem value="writing">Writing & Content</SelectItem>
                  <SelectItem value="marketing">Digital Marketing</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Describe your project in detail..." rows={8} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Required Skills</Label>
              <Input id="skills" placeholder="e.g., React, Figma, SEO (comma-separated)" />
              <p className="text-sm text-muted-foreground">
                Enter skills separated by commas.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="budget">Budget ($)</Label>
                    <Input id="budget" type="number" placeholder="e.g., 5000" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="deadline">Deadline</Label>
                    <Input id="deadline" type="date" />
                </div>
            </div>

            <div className="flex justify-end pt-4">
              <Button size="lg" type="submit">Submit Project</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
