"use client";

import React, { useState, useEffect, useRef } from "react";
import { RoughNotation } from "react-rough-notation";

interface AnimationProps {
  type?:
    | "highlight"
    | "underline"
    | "box"
    | "circle"
    | "strike-through"
    | "crossed-off"
    | "bracket";
  color?: string;
  children: React.ReactNode;
  brackets?: "left" | "right";
}

const Animation = ({
  type = "highlight",
  color = "#A7EFC2",
  children,
}: AnimationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const element = ref.current; // Store the ref value

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element); // Use stored ref value
    };
  }, []);

  return (
    <span ref={ref}>
      <RoughNotation
        type={type}
        show={isVisible}
        color={color}
        strokeWidth={2}
        animationDuration={800}
        brackets={["left", "right"]}
      >
        {children}
      </RoughNotation>
    </span>
  );
};

export default Animation;
