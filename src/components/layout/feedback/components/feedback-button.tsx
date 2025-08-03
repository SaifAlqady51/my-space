import { MdOutlineFeedback } from "react-icons/md";
import { useScrollManager } from "@/hooks/use-scroll-manager";
import { UtilsButton } from "@/components/ui/utils-button";

interface FeedbackButtonProps {
  onClick?: () => void;
}

export const FeedbackButton = ({ onClick }: FeedbackButtonProps) => {
  const { hideOnScrollUp } = useScrollManager();
  return (
    <UtilsButton
      onClick={onClick}
      className="fixed md:bottom-8 bottom-18 md:left-8 left-4"
      isIcon={false}
      showCondition={hideOnScrollUp}
    >
      <p className="whitespace-nowrap font-semibold">Give feedback</p>
      <MdOutlineFeedback className="w-5 h-5" />
    </UtilsButton>
  );
};
