import Image, { StaticImageData } from "next/image";
import AnimatedText from "@/components/ui/animated-text";
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface InfoSectionProps {
  imageSrc: string | StaticImageData;
  imageAlt: string;
  imageWidth?: number;
  title: ReactNode;
  subTitle?: ReactNode;
  description: ReactNode;
  containerClassName?: string;
  textContainerClassName?: string;
  imagePosition?: "left" | "right";
  animationDelay?: number;
  imageClassName?: string;
}

export const InfoSection: React.FC<InfoSectionProps> = ({
  imageSrc,
  imageAlt,
  imageWidth = 500,
  title,
  subTitle,
  description,
  containerClassName = "",
  textContainerClassName = "",
  imagePosition = "right",
  animationDelay = 0,
  imageClassName = "",
}) => {
  return (
    <div
      className={cn(
        "flex flex-col xl:flex-row xl:items-start items-center xl:justify-center justify-start  xl:gap-8 gap-4  h-fit w-full",
        containerClassName,
      )}
    >
      <div
        className={cn(
          "flex flex-col xl:items-start items-center justify-start gap-8 xl:h-full h-fit max-w-[750px]",
          imagePosition === "left" ? "xl:order-2" : "xl:order-1",
          textContainerClassName,
        )}
      >
        <AnimatedText
          delay={animationDelay}
          className="text-title xl:text-left text-center font-semibold  xl:mt-20 mt-0 leading-snug"
        >
          {title}
        </AnimatedText>

        {subTitle && (
          <AnimatedText
            delay={animationDelay + 600}
            className="xl:text-2_5xl md:text-2xl text-center xl:text-start text-lg font-light"
          >
            {subTitle}
          </AnimatedText>
        )}

        <AnimatedText
          delay={animationDelay + 1000}
          className="xl:text-lg md:text-md text-center xl:text-start text-sm font-light"
        >
          {description}
        </AnimatedText>
      </div>

      <Image
        src={imageSrc}
        alt={imageAlt}
        width={imageWidth}
        className={cn(
          "rounded-2xl max-xl:h-[400px] max-xl:object-cover max-xl:object-bottom xl:rounded-none xl:h-auto xl:object-contain",
          imagePosition === "left" ? "xl:order-1" : "xl:order-2",
          imageClassName,
        )}
      />
    </div>
  );
};
