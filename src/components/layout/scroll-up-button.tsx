"use client";
import { useScrollManager } from "@/hooks/use-scroll-manager";
import { FaArrowUp } from "react-icons/fa6";
import { UtilsButton } from "@ui/utils-button";

export const ScrollUpButton = () => {
  const { showOnScrollDown, scrollToTop } = useScrollManager();

  return (
    <UtilsButton
      isIcon={true}
      onClick={scrollToTop}
      showCondition={showOnScrollDown}
      className="rounded-full fixed md:bottom-8 md:right-8 bottom-18 right-4"
    >
      <FaArrowUp size={24} />
    </UtilsButton>
  );
};
