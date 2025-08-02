"use client";

import { useState, useEffect } from "react";

export const useScrollManager = () => {
  const [isAtTop, setIsAtTop] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const checkPositions = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const bottomThreshold = 50;

    setIsAtTop(scrollTop > 300);
    setIsAtBottom(docHeight - (scrollTop + windowHeight) < bottomThreshold);
  };

  const scrollToTop = () => {
    const startPosition = window.pageYOffset;
    const startTime = performance.now();

    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animateScroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const scrollDuration = 800;
      const progress = Math.min(timeElapsed / scrollDuration, 1);

      window.scrollTo({
        top: startPosition * (1 - easeInOutCubic(progress)),
        behavior: "auto",
      });

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  useEffect(() => {
    window.addEventListener("scroll", checkPositions);
    return () => window.removeEventListener("scroll", checkPositions);
  }, []);

  return { isAtTop, isAtBottom, scrollToTop };
};
