"use client";

import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";

const transparentColor =
  "linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc)";

export const strokeColors = [
  { hex: "transparent" },
  { hex: "#000000" },
  { hex: "#c0c0c0" },
  { hex: "#d9d9d9" },
  { hex: "#a38d84" },
  { hex: "#5e9ea0" },
  { hex: "#72a4d4" },
  { hex: "#c59be7" },
  { hex: "#f191c1" },
  { hex: "#e28e7a" },
  { hex: "#468a55" },
  { hex: "#6dbb7a" },
  { hex: "#b66a2c" },
  { hex: "#f2a444" },
  { hex: "#f4768a" },
  { hex: "#ff1744" },
  { hex: "#ffc107" },
  { hex: "#00e676" },
  { hex: "#651fff" },
  { hex: "#29b6f6" },
];

export const backgroundColors = [
  { hex: "transparent" },
  { hex: "#ffffff" },
  { hex: "#f8f9fa" },
  { hex: "#f5f5f5" },
  { hex: "#e0f7fa" },
  { hex: "#b2ebf2" },
  { hex: "#b3e5fc" },
  { hex: "#a5d6a7" },
  { hex: "#dcedc8" },
  { hex: "#ffe082" },
  { hex: "#ffecb3" },
  { hex: "#ffe0b2" },
  { hex: "#ffab91" },
  { hex: "#f48fb1" },
  { hex: "#ce93d8" },
  { hex: "#263238" },
  { hex: "#37474f" },
  { hex: "#4a148c" },
  { hex: "#00695c" },
  { hex: "#5d4037" },
];

interface ColorPaletteProps {
  selectedColor: string;
  setColor: (color: string) => void;
  type: "Stroke" | "Background"; // Differentiate stroke and background
}

const ColorPalette: React.FC<ColorPaletteProps> = ({
  selectedColor,
  setColor,
  type,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const colors = type === "Stroke" ? strokeColors : backgroundColors;

  const quickColors =
    type === "Background"
      ? [colors[0], colors[1], colors[4], colors[7]]
      : [colors[1], colors[3], colors[6], colors[8]];

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="relative mb-2" ref={ref}>
      {/* Quick Color Selection */}
      <p className="mb-1 text-sm font-medium">{type}</p>
      <div className="flex items-center gap-2">
        {quickColors.map(({ hex }) => (
          <button
            key={hex}
            className={clsx(
              "flex h-6 w-6 cursor-pointer items-center justify-center rounded border-2 transition-all",
              selectedColor === hex ? "border-blue-500" : "border-transparent",
            )}
            style={{
              backgroundColor: hex === "transparent" ? "white" : hex,
              backgroundImage:
                hex === "transparent" ? transparentColor : "none",
              backgroundSize: "6px 6px",
              backgroundPosition: "0 0, 3px 3px",
            }}
            onClick={() => {
              if (selectedColor !== hex) {
                setColor(hex);
              }
            }}
            title={hex === "transparent" ? "Transparent" : hex}
          ></button>
        ))}

        {/* Open Full Palette Button */}
        <div className="ml-2 border-l border-l-gray-700 pl-2">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className={clsx(
              "flex h-7 w-7 cursor-pointer items-center justify-center rounded border-2 transition-all",
              selectedColor === "transparent"
                ? "border-gray-500 bg-white"
                : "border-transparent",
            )}
            style={{
              backgroundColor:
                selectedColor === "transparent" ? "white" : selectedColor,
              backgroundImage:
                selectedColor === "transparent" ? transparentColor : "none",
              backgroundSize: "6px 6px",
              backgroundPosition: "0 0, 3px 3px",
            }}
            title="More Colors"
          ></button>
        </div>
      </div>

      {/* Color Palette Dropdown */}
      {isOpen && (
        <div className="bg-background absolute top-6 left-full z-10 ml-6 w-54 rounded-lg p-4 text-white shadow-md">
          <p className="mb-2 text-sm font-medium">
            {type === "Stroke" ? "Stroke Color" : "Background Color"}
          </p>

          {/* Colors */}
          <div className="mb-4 grid grid-cols-5 gap-2">
            {colors.map(({ hex }) => (
              <button
                key={hex}
                className={clsx(
                  "flex h-8 w-8 cursor-pointer items-center justify-center rounded border-2 transition-all",
                  selectedColor === hex ? "border-blue-500" : "border-gray-700",
                )}
                style={{
                  backgroundColor: hex === "transparent" ? "white" : hex,
                  backgroundImage:
                    hex === "transparent" ? transparentColor : "none",
                  backgroundSize: "6px 6px",
                  backgroundPosition: "0 0, 3px 3px",
                }}
                onClick={() => {
                  if (selectedColor !== hex) {
                    setColor(hex);
                  }
                  // setIsOpen(false); // Close after selection
                }}
                title={hex === "transparent" ? "Transparent" : hex}
              ></button>
            ))}
          </div>

          {/* Hex Code Input */}
          <p className="mb-2 text-sm font-medium">Hex Code</p>
          <div className="bg-lighter_background flex items-center gap-2 rounded-md p-2">
            <span className="text-gray-400">#</span>
            <input
              type="text"
              className="w-full bg-transparent text-white outline-none"
              value={
                selectedColor === "transparent"
                  ? "transparent"
                  : selectedColor.replace("#", "")
              }
              readOnly
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ColorPalette;
