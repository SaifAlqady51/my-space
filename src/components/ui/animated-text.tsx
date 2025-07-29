"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  duration?: number;
  easing?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  className = "",
  delay = 0,
  yOffset = 40,
  duration = 1000,
  easing = "cubic-bezier(0.22, 1, 0.36, 1)", // Beautiful "overshoot" curve
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -15% 0px", // Trigger when 15% from viewport bottom
      },
    );

    const current = elementRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [delay]);

  return (
    <div
      ref={elementRef}
      className={`will-change-transform ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0) translateZ(0)"
          : `translateY(${yOffset}px) translateZ(0)`,
        transition: `
          opacity ${duration}ms ${easing} ${delay}ms,
          transform ${duration}ms ${easing} ${delay}ms
        `,
        backfaceVisibility: "hidden", // Fixes flickering in some browsers
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedText;
