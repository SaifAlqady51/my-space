"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Owl from "../../public/owl.png";

export default function WelcomeTransition() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if this is the first visit
    const hasSeenWelcome =
      typeof window !== "undefined"
        ? localStorage.getItem("hasSeenWelcome")
        : null;

    if (!hasSeenWelcome) {
      setShowWelcome(true);

      localStorage.setItem("hasSeenWelcome", "true");

      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, 3000);

      const removeTimer = setTimeout(() => {
        setShowWelcome(false);
      }, 4000);

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(removeTimer);
      };
    }
  }, []);

  if (!showWelcome) return null;

  return (
    <div
      className={`fixed inset-0 flex bg-blue-100 items-start justify-center z-50 transition-opacity duration-500 ${isExiting ? "opacity-0" : "opacity-100"}`}
    >
      <div className="text-center">
        <div className="animate-scale-in mb-2 mt-40 flex justify-center items-center">
          <Image src={Owl} alt="logo" height={120} width={120} />
        </div>

        <h1 className="md:text-5xl text-2xl font-bold text-gray-800 mb-4 animate-slide-up">
          Welcome
        </h1>

        <p className="md:text-2xl text-lg text-gray-600 animate-fade-in delay-200">
          You are about to enter a SAFE SPACE.
        </p>

        <div className="mt-6 flex justify-center space-x-2">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"
              style={{
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
