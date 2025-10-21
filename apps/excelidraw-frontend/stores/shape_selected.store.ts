import { create } from "zustand";

// const [isShapeSelected, setIsShapeSelected] = useState(false);

interface IsShapeSelectedState {
  isShapeSelected: boolean;
  setIsShapeSelected: (isSelected: boolean) => void;
}

export const useIsShapeSelectedStore = create<IsShapeSelectedState>((set) => ({
  isShapeSelected: false,
  setIsShapeSelected: (isSelected: boolean) =>
    set({ isShapeSelected: isSelected }),
}));
