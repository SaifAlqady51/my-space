import React from "react";
import { Button } from "../ui";
import Image, { StaticImageData } from "next/image";

export interface ProjectCardProps {
  projectName: string;
  content: string;
  image: string | StaticImageData;
  imageAlt: string;
  link: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  projectName,
  content,
  image,
  imageAlt,
  link,
}) => {
  return (
    <div className="w-full max-w-5xl bg-slate-800 rounded-2xl shadow-md overflow-hidden shadow-slate-700 hover:scale-105 hover:shadow-lg duration-300 transition flex flex-col md:flex-row md:h-[260px]">
      {/* Image section - full width on mobile, 1/3 width on desktop */}
      <div className="w-full h-56 md:w-1/3 md:h-full bg-gray-300 flex-shrink-0 relative">
        {/* Project image */}
        <Image
          src={image}
          alt={imageAlt}
          className="w-full h-full object-cover"
          width={500}
          height={500}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content section - contains title, progress, description, and button */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        {/* Top content area - title, progress, and description */}
        <div className="flex flex-col gap-4">
          {/* Header row - project title and progress indicator */}
          <div className="flex md:flex-row flex-col items-center justify-between">
            {/* Project title */}
            <h2 className="text-xl font-semibold text-gold-500 mb-2">
              {projectName}
            </h2>
          </div>

          {/* Project description text */}
          <p className="text-sm mb-6 leading-relaxed">{content}</p>
        </div>

        {/* Bottom action area - View Details button */}
        <div className="flex justify-end">
          <Button
            target="_blank"
            href={link}
            className="bg-slate-950 hover:bg-slate-900  px-6 py-2 rounded-full text-sm font-semibold transition-colors duration-200"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};
