"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number; // in milliseconds
  duration?: number; // in milliseconds
  threshold?: number; // 0-1, how much of the element must be visible to trigger
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  className = "",
  delay = 0,
  duration = 500,
  threshold = 0.1,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: Unobserve after animation triggers to improve performance
          observer.unobserve(entry.target);
        }
      },
      { threshold },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold]);

  // Convert duration and delay from ms to seconds for CSS
  const durationInSeconds = duration / 1000;
  const delayInSeconds = delay / 1000;

  return (
    <div
      ref={elementRef}
      className={`opacity-0 transform translate-y-4 ${className} ${isVisible ? "animate-fade-up" : ""
        }`}
      style={{
        animation: isVisible
          ? `fadeInUp ${durationInSeconds}s ease-out ${delayInSeconds}s forwards`
          : "none",
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedText;
