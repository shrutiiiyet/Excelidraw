"use client";

import { useZoom } from "@/hooks/useZoom";
import { Minus, Plus } from "lucide-react";

const CanvasZoom = () => {
  const { zoom, zoomIn, zoomOut } = useZoom();

  return (
    <div className="bg-background flex items-center gap-4 rounded-lg shadow-md">
      <button
        onClick={zoomOut}
        disabled={zoom === 100}
        className={`cursor-pointer rounded-l-lg p-2 ${
          zoom === 100
            ? "cursor-not-allowed text-gray-400"
            : "hover:bg-light_background text-white"
        }`}
      >
        <Minus className="h-5 w-5" />
      </button>

      <span className="text-lg font-semibold text-white">{zoom}%</span>

      <button
        onClick={zoomIn}
        disabled={zoom === 300}
        className={`cursor-pointer rounded-r-lg p-2 ${
          zoom === 300
            ? "cursor-not-allowed text-gray-400"
            : "hover:bg-light_background text-white"
        }`}
      >
        <Plus className="h-5 w-5" />
      </button>
    </div>
  );
};

export default CanvasZoom;
