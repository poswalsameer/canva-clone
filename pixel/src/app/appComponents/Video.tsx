import React, { useRef, useState } from "react";
import { Image as FabricImage } from "fabric";
import { Button } from "@/components/ui/button";
import { VideoIcon } from "lucide-react";

function Video({ canvas, canvasRef }: any) {
  const [videoSource, setVideoSource] = useState<string | null>(null);
  // @ts-ignore
  const [fabricVideo, setFabricVideo] = useState<any>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const inputRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleVideoUpload = (e: any) => {

    const file = e.target.files[0];

    if (file) {
      setVideoSource(null);

      const url = URL.createObjectURL(file);
      setVideoSource(url);

      const videoElement = document.createElement("video");
      videoElement.src = url;
      videoElement.crossOrigin = "anonymous";

      videoElement.addEventListener("loadeddata", () => {
        const videoWidth = videoElement.videoWidth;
        const videoHeight = videoElement.videoHeight;

        videoElement.width = videoWidth;
        videoElement.height = videoHeight;

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const scale = Math.min(
          canvasWidth / videoWidth,
          canvasHeight / videoHeight
        );

        canvas.renderAll();

        const fabricImage = new FabricImage(videoElement, {
          left: 0,
          top: 0,
          scaleX: scale,
          scaleY: scale,
        });

        setFabricVideo(fabricImage);
        canvas.add(fabricImage);
        canvas.renderAll();

        videoElement.play();
      });

      videoElement.addEventListener( "error", (error) => {
        console.error("Video load error: ", error);
      } )

      videoElement.addEventListener("ended", () => {
        // Restart the video when it ends for looping
        videoElement.currentTime = 0;
        videoElement.play();
      });

      videoRef.current = videoElement;
    }
  };



  return (
    <div>
      <Button
        className="w-full justify-start border border-black"
        variant="outline"
        onClick={handleUploadClick}
      >
        <VideoIcon className="mr-2 h-4 w-4" />
        Video
      </Button>

      <input
        ref={inputRef}
        type="file"
        accept="video/mp4"
        style={{ display: "none" }}
        onChange={handleVideoUpload}
      />
      
    </div>
  );
}

export default Video;
