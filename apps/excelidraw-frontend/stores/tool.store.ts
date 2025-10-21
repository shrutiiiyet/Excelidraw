import { create } from "zustand";
import { Tool } from "@/type/tool";

type ToolState = {
  selectedTool: Tool;
  setSelectedTool: (tool: Tool) => void;
};

export const useToolStore = create<ToolState>((set) => ({
  selectedTool: "Selection",
  setSelectedTool: (tool) => set({ selectedTool: tool }),
}));
