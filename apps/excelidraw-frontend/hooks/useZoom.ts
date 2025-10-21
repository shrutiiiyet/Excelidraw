import { useState, useCallback, useEffect } from "react";

const MIN_ZOOM = 100; // 50%
const MAX_ZOOM = 300; // 300%
const ZOOM_STEP = 10; // 10% steps
const INITIAL_ZOOM = 100; // 100%

export const useZoom = () => {
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        setZoom((prev) => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
      } else if (e.key === "-" || e.key === "_") {
        e.preventDefault();
        setZoom((prev) => Math.max(prev - ZOOM_STEP, MIN_ZOOM));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const zoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + ZOOM_STEP, MAX_ZOOM));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - ZOOM_STEP, MIN_ZOOM));
  }, []);

  return { zoom, zoomIn, zoomOut };
};
