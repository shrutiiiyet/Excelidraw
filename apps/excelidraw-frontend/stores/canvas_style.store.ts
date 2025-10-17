
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

type StrokeWidth = 'thin' | 'medium' | 'thick';
type StrokeStyle = 'solid' | 'dashed' | 'dotted';
type Roughness = 'none' | 'normal' | 'high';
type FillStyle = 'hachure' | 'solid' | 'cross-hatch';

interface CanvasStyleStore {
  strokeColor: string;
  setStrokeColor: (color: string) => void;
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
  strokeWidth: StrokeWidth;
  setStrokeWidth: (width: StrokeWidth) => void;
  strokeStyle: StrokeStyle;
  setStrokeStyle: (style: StrokeStyle) => void;
  roughness: Roughness;
  setRoughness: (r: Roughness) => void;
  fillStyle: FillStyle;
  setFillStyle: (style: FillStyle) => void;
}

export const useCanvasStyleStore = create<CanvasStyleStore>()(
  subscribeWithSelector(set => ({
    strokeColor: 'white',
    setStrokeColor: color => set({ strokeColor: color }),
    backgroundColor: 'transparent',
    setBackgroundColor: color => set({ backgroundColor: color }),
    strokeWidth: 'thin',
    setStrokeWidth: w => set({ strokeWidth: w }),
    strokeStyle: 'solid',
    setStrokeStyle: style => set({ strokeStyle: style }),
    roughness: 'none',
    setRoughness: r => set({ roughness: r }),
    fillStyle: 'hachure',
    setFillStyle: style => set({ fillStyle: style }),
  })),
);
