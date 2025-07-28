import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "default" | "gold" | "outline" | "success" | "destructive";
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = "default",
  ...props
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center min-w-24 font-semibold px-5 py-3 rounded-full text-sm shadow-lg",
        {
          "bg-gold-500 text-black": variant === "gold",
          "bg-primary text-primary-foreground": variant === "default",
          "bg-transparent border border-input text-foreground":
            variant === "outline",
          "bg-green-500 text-white": variant === "success",
          "bg-destructive text-destructive-foreground":
            variant === "destructive",
        },
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};
