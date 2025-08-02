"use client";
import { useScrollManager } from "@/hooks/use-scroll-manager";
import { FaArrowUp } from "react-icons/fa6";

export const ScrollToTopButton = () => {
  const { isAtTop, scrollToTop } = useScrollManager();

  return (
    <button
      onClick={scrollToTop}
      className={`fixed md:bottom-8 md:right-8 bottom-18 right-4 p-3 rounded-full bg-slate-950 text-gold-500 shadow-gray-800 shadow-md transition-all duration-300 cursor-pointer z-50 ${isAtTop
          ? "opacity-100 hover:bg-slate-800 hover:scale-110"
          : "opacity-0 pointer-events-none"
        }`}
      aria-label="Scroll to top"
    >
      <FaArrowUp size={24} />
    </button>
  );
};
