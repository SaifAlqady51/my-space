"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { FeedbackButton } from "./components/feedback-button";

export function FeedBackDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  useEffect(() => {
    if (!isOpen) {
      setFeedback("");
      setStatus("idle");
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!feedback.trim()) return;

    setStatus("sending");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        body: JSON.stringify({ feedback }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "omit",
      });

      if (!response.ok) throw new Error("Sending failed");

      setStatus("success");
      setFeedback("");
    } catch (error) {
      console.error("Feedback submission error:", error);
      setStatus("error");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <FeedbackButton onClick={() => setIsOpen(true)} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Anonymous Feedback</DialogTitle>
          <DialogDescription>
            Negative feedback only accepted.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Your feedback here..."
              className="min-h-[120px]"
              disabled={status === "sending"}
              required
            />
          </div>

          {status === "success" && (
            <p className="text-success text-sm mb-4">
              Thank you! Your feedback has been sent.
            </p>
          )}
          {status === "error" && (
            <p className="text-error text-sm mb-4">
              Sending failed. Please try again.
            </p>
          )}

          <DialogFooter>
            <Button
              type="submit"
              variant="outline"
              disabled={!feedback.trim() || status === "sending"}
            >
              {status === "sending" ? "Sending..." : "Send Anonymously"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
