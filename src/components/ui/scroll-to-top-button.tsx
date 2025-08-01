"use client";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { FaArrowUp } from "react-icons/fa6";

export const ScrollToTopButton = () => {
  const { isVisible, scrollToTop } = useScrollToTop();

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 p-3 rounded-full bg-slate-700 text-white shadow-gray-800 shadow-lg transition-all duration-300 cursor-pointer ${isVisible
          ? "opacity-100 hover:bg-slate-800 hover:scale-110"
          : "opacity-0 pointer-events-none"
        }`}
      aria-label="Scroll to top"
    >
      <FaArrowUp size={24} />
    </button>
  );
};
