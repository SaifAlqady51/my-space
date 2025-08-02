"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { MdOutlineFeedback } from "react-icons/md";
import { useScrollManager } from "@/hooks/use-scroll-manager";
import { FeedbackDialog } from "./feedback-dialgo";

export function FeedbackButton() {
  const { isAtBottom } = useScrollManager();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed md:bottom-8 bottom-18 md:left-8 left-4 z-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="default"
            className={`rounded-xl bg-slate-950 text-center hover:bg-slate-800 hover:scale-110 shadow-gray-800 shadow-md transition-all duration-300 text-gold-500 flex items-center gap-2 ${isAtBottom ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
          >
            <p className="whitespace-nowrap font-semibold">Give feedback</p>
            <MdOutlineFeedback className="w-5 h-5" />
          </Button>
        </DialogTrigger>
        <FeedbackDialog
          key={isOpen ? "open" : "closed"} // Force reset on close
        />
      </Dialog>
    </div>
  );
}
