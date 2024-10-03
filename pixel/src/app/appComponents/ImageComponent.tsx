import React, { useRef, useState } from 'react';
import * as fabric from 'fabric';
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";

interface FabricImageUploaderProps {
  canvas: fabric.Canvas;
}

function FabricImageUploader({ canvas }: FabricImageUploaderProps) {

  // ALL STATES START FROM HERE
  const [images, setImages] = useState<fabric.Image[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // FUNCTIONS START FROM HERE
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const imgElement = new Image();
        imgElement.src = e.target?.result as string;
        imgElement.onload = () => {
          const fabricImage = new fabric.Image(imgElement, {
            crossOrigin: 'anonymous'
          });

          const scaleFactor = Math.min(
            canvas.width! / fabricImage.width!,
            canvas.height! / fabricImage.height!
          );
          fabricImage.scale(scaleFactor);

          fabricImage.set({
            left: (canvas.width! - fabricImage.width! * scaleFactor) / 2,
            top: (canvas.height! - fabricImage.height! * scaleFactor) / 2
          });

          canvas.add(fabricImage);
          canvas.renderAll();

          setImages(prevImages => [...prevImages, fabricImage]);
        };
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
        <Button
            className="justify-start border border-black"
            variant="outline"
            onClick={handleUploadClick}
        >
            <ImageIcon className="mr-2 h-4 w-4" />
            Image
        </Button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="image/*"
        multiple
      />
    </div>
  );
}

export default FabricImageUploader;