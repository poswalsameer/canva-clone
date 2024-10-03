"use client";

import React, { useState, useRef, useEffect } from "react";
import { Layers } from "lucide-react";
import * as fabric from 'fabric';
import { Canvas, Rect } from 'fabric';
import Video from "../appComponents/Video";
import ImageComponent from '../appComponents/ImageComponent';

function Page() {

  const canvasRef = useRef<any>(null);
  const [canvas, setCanvas] = useState<any>(null);

  useEffect( () => {

    if( canvasRef.current ){
      const initCanvas = new Canvas(canvasRef.current, {
        width: 1000,
        height: 500,
      });

      initCanvas.backgroundColor = "#fff";
      console.log("Logging before renderAll()");
      initCanvas.renderAll();

      console.log("Logging before setting initCanvas in the state");
      setCanvas(initCanvas);
      console.log("Logging after setting initCanvas in the state");

      return () => {
        initCanvas.dispose();
      }

    }

  }, [] )

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
        <aside className="h-[30rem] w-64 flex flex-col justify-center items-center gap-y-5 rounded-lg bg-gray-100 p-4">
          
          {/* IMAGE UPLOAD COMPONENT BUTTON */}
          <ImageComponent canvas={canvas} />

          {/* VIDEO UPLOAD BUTTON AS WELL AS THE CANVAS */}
          <Video canvas={canvas} canvasRef={canvasRef} />

          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }} 
          />
        </aside>

        {/* MAIN CANVAS */}
        <section className="p-4">
          <canvas
            className="h-[37rem] w-full rounded-lg "
            id="canvas"
            ref={canvasRef}
          ></canvas>
        </section>
      </main>
    </div>
  );
}

export default Page;
