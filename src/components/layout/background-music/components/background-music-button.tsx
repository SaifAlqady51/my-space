import { UtilsButton } from "@/components/ui/utils-button";
import { useScrollManager } from "@/hooks/use-scroll-manager";
import { IoVolumeHigh, IoVolumeMute } from "react-icons/io5";

interface BackgroundMusicButtonProps {
  isLoaded: boolean;
  isPlaying: boolean;
  isMuted: boolean;
  onClick?: () => void;
}

export const BackgroundMusicButton = ({
  isLoaded,
  isPlaying,
  isMuted,
  onClick,
}: BackgroundMusicButtonProps) => {
  const { hideOnScrollDown } = useScrollManager();

  const getIcon = () => {
    const iconProps = { size: 24 };
    if (!isLoaded)
      return <IoVolumeMute {...iconProps} className="animate-pulse" />;
    if (!isPlaying || isMuted) return <IoVolumeMute {...iconProps} />;
    return <IoVolumeHigh {...iconProps} />;
  };
  return (
    <UtilsButton
      onClick={onClick}
      isIcon={true}
      showCondition={hideOnScrollDown}
      className="rounded-full fixed lg:top-18 top-1 md:right-4 right-2"
    >
      {getIcon()}
    </UtilsButton>
  );
};
