import Image, { StaticImageData } from "next/image";
import AnimatedText from "@/components/ui/animated-text";
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InfoSectionProps {
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

const InfoSection: React.FC<InfoSectionProps> = ({
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
    <div className="flex justify-center items-center h-screen w-full">
      <div
        className={cn(
          "flex flex-col md:flex-row md:items-start items-center md:justify-center justify-start h-screen md:gap-8 gap-4",
          containerClassName,
        )}
      >
        <div
          className={cn(
            "flex flex-col md:items-start items-center justify-start gap-8 md:h-full h-fit",
            imagePosition === "left" ? "md:order-2" : "md:order-1",
            textContainerClassName,
          )}
        >
          <AnimatedText
            animationType="fadeUp"
            className="md:text-5xl text-2xl md:text-left text-center font-semibold leading-snug whitespace-pre md:mt-20 mt-0"
          >
            {title}
          </AnimatedText>

          {subTitle && (
            <AnimatedText
              delay={animationDelay + 0.6}
              animationType="fadeUp"
              className="md:text-2_5xl text-center md:text-start text-lg font-light"
            >
              {subTitle}
            </AnimatedText>
          )}

          <AnimatedText
            delay={animationDelay + 1}
            animationType="fadeUp"
            className="md:text-lg text-center md:text-start text-sm font-light"
          >
            {description}
          </AnimatedText>
        </div>

        <Image
          src={imageSrc}
          alt={imageAlt}
          width={imageWidth}
          className={cn(
            "rounded-2xl max-md:h-[400px] max-md:object-cover max-md:object-bottom md:rounded-none md:h-auto md:object-contain",
            imagePosition === "left" ? "md:order-1" : "md:order-2",
            imageClassName,
          )}
        />
      </div>
    </div>
  );
};

export default InfoSection;
