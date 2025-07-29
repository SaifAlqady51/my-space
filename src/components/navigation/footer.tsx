"use client";
import { NAVLIST } from "@/data";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Footer = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (timer) {
        clearTimeout(timer);
      }

      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setIsVisible(true);
        return;
      }

      setIsVisible(currentScrollY < lastScrollY);

      setTimer(
        setTimeout(() => {
          setIsVisible(true);
        }, 1000),
      );

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timer) clearTimeout(timer);
    };
  }, [lastScrollY, timer]);

  return (
    <div
      className={`flex justify-between fixed bottom-0 shadow-white top-shadow-lg md:hidden w-full bg-slate-950 h-16 px-10 transition-transform duration-300  ${isVisible ? "translate-y-0" : "translate-y-full"
        }`}
    >
      {NAVLIST.map((item, idx) => (
        <Link
          href={item.link}
          key={idx}
          className="flex items-center justify-center p-4 transition-colors "
        >
          <div className="flex items-center gap-0.5 flex-col hover:text-gold-100 hover:scale-105 transition-transform duration-100">
            <div className="text-xl">{item.icon}</div>
            <p className="text-xs font-semibold">{item.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
