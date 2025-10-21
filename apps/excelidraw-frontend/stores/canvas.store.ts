import { CanvasEngine } from "@/canvas_engine/CanvasEngine";
import { create } from "zustand";

interface CanvasEngineState {
  canvasEngine: CanvasEngine | null;
  setCanvasEngine: (engine: CanvasEngine) => void;
}

export const useCanvasEngineStore = create<CanvasEngineState>((set) => ({
  canvasEngine: null,
  setCanvasEngine: (engine: CanvasEngine) => set({ canvasEngine: engine }),
}));
