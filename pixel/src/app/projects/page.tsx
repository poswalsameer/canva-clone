'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProjectDashboard() {

  const router = useRouter();
  const { status } = useSession();

  // This would typically come from your authentication state
  // const user = {
  //   name: "John Doe",
  //   projects: [
  //     { id: 1, name: "Project A" },
  //     { id: 2, name: "Project B" },
  //     { id: 3, name: "Project C" },
  //   ],
  // }

  const routeToNewProject = () => {
    router.push('/new-project');
  }

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push('/');
    return null;
  }

  const handleLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-gray-900 text-gray-100 p-4">
        <div className="container mx-auto flex justify-between items-center">
            <div className="flex flex-row justify-center items-center gap-x-1">
                <Layers className="h-6 w-6 text-purple-400" />
                <span className="ml-2 text-2xl font-bold text-purple-400">Pixel</span>
            </div>
            <Button className="h-10 w-32 bg-purple-600 text-white hover:bg-purple-700 rounded-sm" 
            onClick={handleLogout}
            >Logout</Button>
        </div>
      </nav>

      {/* Main content */}
      <main className="bg-gray-800 text-white flex-grow container mx-auto p-4 space-y-8">
        {/* Upper section - Create New Project */}
        <section className="bg-muted p-6 rounded-lg">
          <h2 className="text-xl text-black font-semibold mb-4">Create a New Project</h2>
          <Button onClick={routeToNewProject}>Create New Project</Button>
        </section>

        {/* Lower section - Your Projects */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Your Projects</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* {user.projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="outline">View Project</Button>
                </CardContent>
              </Card>
            ))} */}
          </div>
        </section>
      </main>
    </div>
  )
}