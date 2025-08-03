import { cn } from "@/lib/utils";
import { Button } from "./button";

interface UtilsButtonProps {
  children: React.ReactNode;
  showCondition: boolean;
  isIcon: boolean;
  onClick?: () => void;
  className?: string;
}
export const UtilsButton = ({
  children,
  showCondition,
  isIcon,
  onClick,
  className,
}: UtilsButtonProps) => {
  return (
    <Button
      onClick={onClick}
      size={isIcon ? "icon" : "default"}
      variant="default"
      className={cn(
        "rounded-xl bg-slate-950 text-center hover:bg-slate-800",
        "hover:scale-110 shadow-gray-800 shadow-md transition-all",
        "duration-300 text-gold-500 flex items-center gap-2 z-50",
        showCondition ? "opacity-100" : "opacity-0 pointer-events-none",
        className,
      )}
    >
      {children}
    </Button>
  );
};
