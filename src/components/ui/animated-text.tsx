"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type AnimatedTextProps = {
  children: React.ReactNode;
  animationType?: "fadeUp" | "typewriter" | "bounce";
  hoverEffect?: boolean;
  className?: string;
  delay?: number;
} & React.HTMLAttributes<HTMLDivElement>;

const AnimatedText = ({
  children,
  animationType = "fadeUp",
  hoverEffect = false,
  className = "",
  delay = 0,
  ...props
}: AnimatedTextProps) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    // Store original content and clear it only for typewriter
    const originalText = element.textContent || "";
    if (animationType === "typewriter") {
      element.textContent = "";
    }

    switch (animationType) {
      case "fadeUp":
        gsap.fromTo(
          element,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "power3.out",
            delay: delay + 0.3,
          },
        );
        break;
      case "typewriter":
        const chars = originalText.split("");
        chars.forEach((char, i) => {
          gsap.to(element, {
            duration: 0.05,
            delay: delay + i * 0.05,
            onStart: () => {
              element.textContent += char;
            },
          });
        });
        break;
      case "bounce":
        gsap.fromTo(
          element,
          { y: -100 },
          {
            y: 0,
            duration: 1,
            ease: "bounce.out",
            delay: delay,
          },
        );
        break;
      default:
        gsap.fromTo(
          element,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 1,
            delay: delay,
          },
        );
    }

    if (hoverEffect) {
      const hoverAnimation = () => {
        gsap.to(element, {
          duration: 0.3,
          scale: 1.05,
          color: "#4f46e5",
          ease: "power1.out",
        });
      };

      const hoverOutAnimation = () => {
        gsap.to(element, {
          duration: 0.3,
          scale: 1,
          color: "inherit",
          ease: "power1.out",
        });
      };

      element.addEventListener("mouseenter", hoverAnimation);
      element.addEventListener("mouseleave", hoverOutAnimation);

      return () => {
        element.removeEventListener("mouseenter", hoverAnimation);
        element.removeEventListener("mouseleave", hoverOutAnimation);
      };
    }
  }, [animationType, hoverEffect, delay]);

  return (
    <div ref={textRef} className={className} {...props}>
      {children}
    </div>
  );
};

export default AnimatedText;
