import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
  import { Badge } from "@/components/ui/badge";
  import { projects, users } from "@/lib/data";
  
  export default function DashboardProjectsPage() {
    const myProjects = projects.slice(0, 3); // Mock: assuming these are client's projects
    const bidProjects = projects.slice(3, 5); // Mock: assuming these are freelancer's bids

    return (
      <Tabs defaultValue="my-projects">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="my-projects">My Projects</TabsTrigger>
            <TabsTrigger value="my-bids">My Bids</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="my-projects">
          <Card>
            <CardHeader>
              <CardTitle>My Projects</CardTitle>
              <CardDescription>
                A list of projects you have posted.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Proposals</TableHead>
                    <TableHead className="hidden md:table-cell">Deadline</TableHead>
                    <TableHead className="text-right">Budget</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myProjects.map(project => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">Open</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{project.bids.length}</TableCell>
                      <TableCell className="hidden md:table-cell">{new Date(project.deadline).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">${project.budget.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="my-bids">
          <Card>
            <CardHeader>
              <CardTitle>My Bids</CardTitle>
              <CardDescription>
                A list of projects you have submitted proposals for.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">My Bid</TableHead>
                    <TableHead className="hidden md:table-cell">Project Budget</TableHead>
                    <TableHead className="text-right">Client</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                   {bidProjects.map(project => {
                    const client = users.find(u => u.id === project.clientId);
                    return (
                        <TableRow key={project.id}>
                            <TableCell className="font-medium">{project.title}</TableCell>
                            <TableCell>
                                <Badge variant="default">Pending</Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">$4,800</TableCell>
                            <TableCell className="hidden md:table-cell">${project.budget.toLocaleString()}</TableCell>
                            <TableCell className="text-right">{client?.name}</TableCell>
                        </TableRow>
                    )
                   })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    )
  }
  