"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { ImageIcon, Layers, VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Stage, Layer, Image as KonvaImage, Group, Rect } from "react-konva";
import Konva from "konva";

interface HTMLVideoProps {
  src: string;
  width: number;
  height: number;
}

interface MediaItem {
  type: "image" | "video";
  url: string;
  position: { x: number; y: number };
}

interface StageDimensions {
  width: number;
  height: number;
}

function Page() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const parentDivRef = useRef<HTMLDivElement>(null);
  const [stageDimensions, setStageDimensions] = useState<StageDimensions>({
    width: 800,
    height: 600,
  });
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const setVideoRef = useCallback(
    (index: number) => (el: HTMLVideoElement | null) => {
      videoRefs.current[index] = el;
    },
    []
  );

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

  const handleFileUpload = (type: "image" | "video") => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = type === "image" ? "image/*" : "video/*";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      const type = file.type.startsWith("image/") ? "image" : "video";
      setMedia((prevMedia) => [
        ...prevMedia,
        {
          type,
          url: objectUrl,
          position: {
            x: stageDimensions.width / 2 - 100,
            y: stageDimensions.height / 2 - 100,
          },
        },
      ]);
    } else {
      alert("Please select a valid file.");
    }
  };

  const handleDragEnd = (
    index: number,
    e: Konva.KonvaEventObject<DragEvent>
  ) => {
    const newMedia = [...media];
    newMedia[index].position = { x: e.target.x(), y: e.target.y() };
    setMedia(newMedia);
  };

  const handleSelect = (index: number) => {
    setSelectedItem(index);
  };

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
        <aside className="h-[30rem] w-64 flex flex-col justify-center items-center gap-y-5 rounded-r-lg bg-gray-100 p-4">
          {/* ADD IMAGE BUTTON */}
          <Button
            onClick={() => handleFileUpload("image")}
            className="w-full justify-start border border-black"
            variant="outline"
          >
            <ImageIcon className="mr-2 h-4 w-4" />
            Image
            <span className="sr-only">Insert Image</span>
          </Button>
          <Button
            onClick={() => handleFileUpload("video")}
            className="w-full justify-start border border-black"
            variant="outline"
          >
            <VideoIcon className="mr-2 h-4 w-4" />
            Video
            <span className="sr-only">Insert Video</span>
          </Button>

          {/* Hidden file input element */}
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </aside>

        {/* MAIN CANVAS */}
        <section className="flex-1 overflow-auto p-4">
          <div
            ref={parentDivRef}
            className="h-[37rem] w-full bg-gray-200 rounded-lg shadow-inner"
          >
            <Stage
              width={stageDimensions.width}
              height={stageDimensions.height}
            >
              <Layer>
                {media.map((item, index) => {
                  if (item.type === "image") {
                    const img = new window.Image();
                    img.src = item.url;
                    return (
                      <KonvaImage
                        key={index}
                        x={item.position.x}
                        y={item.position.y}
                        image={img}
                        width={200}
                        height={200}
                        draggable
                        onDragEnd={(e) => handleDragEnd(index, e)}
                        onClick={() => handleSelect(index)}
                      />
                    );
                  } else {
                    return (
                      <Group
                        key={index}
                        x={item.position.x}
                        y={item.position.y}
                        draggable
                        onDragEnd={(e) => handleDragEnd(index, e)}
                        onClick={() => handleSelect(index)}
                      >
                        <Rect width={10} height={10} fill="black" />
                      </Group>
                    );
                  }
                })}
              </Layer>
            </Stage>
            {media.map(
              (item, index) =>
                item.type === "video" && (
                  <video
                    key={index}
                    ref={setVideoRef(index)}
                    src={item.url}
                    width={200}
                    height={200}
                    controls
                    style={{
                      position: "absolute",
                      left: `${item.position.x}px`,
                      top: `${item.position.y}px`,
                      pointerEvents: selectedItem === index ? "auto" : "none",
                    }}
                    onClick={() => {
                      const video = videoRefs.current[index];
                      if (video) {
                        video.paused ? video.play() : video.pause();
                      }
                    }}
                  />
                )
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Page;
