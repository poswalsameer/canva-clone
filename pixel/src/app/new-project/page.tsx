"use client";

import React, { useState, useRef, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CameraIcon,
  ImageIcon,
  Layers,
  MusicIcon,
  PenToolIcon,
  TextIcon,
  Undo2Icon,
  Redo2Icon,
  VideoIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import Konva from "konva";

function Page() {
  const [images, setImages] = useState<{ url: string; position: { x: number; y: number } }[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const parentDivRef = useRef<HTMLDivElement | null>(null);
  const [stageDimensions, setStageDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    const updateStageDimensions = () => {
      if (parentDivRef.current) {
        const { clientWidth, clientHeight } = parentDivRef.current;
        setStageDimensions({ width: clientWidth, height: clientHeight });
      }
    };

    window.addEventListener("resize", updateStageDimensions);
    updateStageDimensions(); // Set dimensions on initial render

    return () => {
      window.removeEventListener("resize", updateStageDimensions);
    };
  }, []);

  const handleFileUpload = () => {
    fileInputRef.current?.click(); // Simulates click on the hidden file input
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(file);
      // Add new image to the images array
      setImages((prevImages) => [
        ...prevImages,
        {
          url: objectUrl,
          position: {
            x: stageDimensions.width / 2 - 100, // Center the image
            y: stageDimensions.height / 2 - 100,
          },
        },
      ]);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleDragEnd = (index: number, e: Konva.KonvaEventObject<DragEvent>) => {
    const newImages = [...images];
    newImages[index].position = { x: e.target.x(), y: e.target.y() };
    setImages(newImages);
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <nav className="bg-gray-900 text-gray-100 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex flex-row justify-center items-center gap-x-1">
            <Layers className="h-6 w-6 text-purple-400" />
            <span className="ml-2 text-2xl font-bold text-purple-400">Pixel</span>
          </div>
        </div>
      </nav>

      <main className="min-h-screen bg-gray-800 flex justify-center items-center overflow-hidden">
        <aside className="h-[30rem] w-64 flex flex-col justify-center items-center gap-y-5 rounded-r-lg bg-gray-100 p-4">
          {/* ADD IMAGE BUTTON */}
          <Button onClick={handleFileUpload} className="w-full justify-start border border-black" variant="outline">
            <ImageIcon className="mr-2 h-4 w-4" />
            Image
            <span className="sr-only">Insert Image</span>
          </Button>

          {/* Hidden file input element */}
          <input
            ref={fileInputRef} // Ref for hidden file input
            type="file"
            accept="image/*"
            style={{ display: "none" }} // Hide the input element
            onChange={handleFileChange} // Handle file selection
          />
        </aside>

        {/* MAIN CANVAS */}
        <section className="flex-1 overflow-auto p-4">
          <div ref={parentDivRef} className="h-[37rem] w-full bg-gray-200 rounded-lg shadow-inner">
            <Stage width={stageDimensions.width} height={stageDimensions.height}>
              <Layer>
                {images.map((image, index) => {
                  const img = new window.Image();
                  img.src = image.url; // Set the image source
                  img.width = 200; // Fixed width
                  img.height = 200; // Fixed height

                  return (
                    <KonvaImage
                      key={index}
                      x={image.position.x}
                      y={image.position.y}
                      image={img} // Set image prop
                      draggable
                      onDragEnd={(e) => handleDragEnd(index, e)}
                    />
                  );
                })}
              </Layer>
            </Stage>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Page;
