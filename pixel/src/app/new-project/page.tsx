import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CameraIcon, ImageIcon, Layers, MusicIcon, PenToolIcon, TextIcon, Undo2Icon, Redo2Icon, VideoIcon } from "lucide-react"
import { Button } from "@/components/ui/button";

function Page() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <nav className="bg-gray-900 text-gray-100 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex flex-row justify-center items-center gap-x-1">
            <Layers className="h-6 w-6 text-purple-400" />
            <span className="ml-2 text-2xl font-bold text-purple-400">
              Pixel
            </span>
          </div>
        </div>
      </nav>

      <main className="min-h-screen bg-gray-800 flex justify-center items-center overflow-hidden">

        {/* LEFT SIDE BAR */}
        <aside className=" h-[30rem] w-64 flex flex-col justify-center items-center gap-y-5 rounded-r-lg bg-gray-100 p-4">

        {/* ADD TEXT BUTTON */}
            <Button className="w-full justify-start border border-black" variant="outline">
                <TextIcon className="mr-2 h-4 w-4" />
                Text
                <span className="sr-only">Insert Text</span>
            </Button>

            {/* ADD IMAGE BUTTON */}
            <Button className="w-full justify-start border border-black" variant="outline">
                <ImageIcon className="mr-2 h-4 w-4" />
                Image
                <span className="sr-only">Insert Image</span>
            </Button>

            {/* ADD VIDEO BUTTON */}
            <Button className="w-full justify-start border border-black" variant="outline">
                <VideoIcon className="mr-2 h-4 w-4" />
                Video
                <span className="sr-only">Insert Video</span>
            </Button>

          {/* <Tabs defaultValue="insert">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="insert">Insert</TabsTrigger>
              <TabsTrigger value="edit">Edit</TabsTrigger>
            </TabsList>
            <TabsContent value="insert" className="mt-4 space-y-4">
              <Button className="w-full justify-start" variant="outline">
                <TextIcon className="mr-2 h-4 w-4" />
                Text
                <span className="sr-only">Insert Text</span>
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <ImageIcon className="mr-2 h-4 w-4" />
                Image
                <span className="sr-only">Insert Image</span>
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <VideoIcon className="mr-2 h-4 w-4" />
                Video
                <span className="sr-only">Insert Video</span>
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MusicIcon className="mr-2 h-4 w-4" />
                Audio
                <span className="sr-only">Insert Audio</span>
              </Button>
            </TabsContent>
            <TabsContent value="edit" className="mt-4 space-y-4">
              <Button className="w-full justify-start" variant="outline">
                <Layers className="mr-2 h-4 w-4" />
                Layers
                <span className="sr-only">Manage Layers</span>
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <PenToolIcon className="mr-2 h-4 w-4" />
                Draw
                <span className="sr-only">Draw Tool</span>
              </Button>
            </TabsContent>
          </Tabs> */}
        </aside>

        {/* MAIN CANVAS */}
        <section className="flex-1 overflow-auto p-4">
          <div className="h-[30rem] w-full bg-gray-200 rounded-lg shadow-inner">
            <canvas className="flex h-full items-center justify-center">

              
            </canvas>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Page;
