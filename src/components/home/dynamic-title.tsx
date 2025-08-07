"use client";
import { useEffect, useState } from "react";

export function DynamicTitle({ text }: { text: string }) {
  const [resolvedText, setResolvedText] = useState(text);

  useEffect(() => {
    const hour = new Date().getHours();
    let greeting = "Hello";

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 18) greeting = "Good Afternoon";
    else greeting = "Good Evening";

    setResolvedText(text.replace("{{GREETING}}", greeting));
  }, [text]);

  return <>{resolvedText}</>;
}
