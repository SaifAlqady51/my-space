import { JOB_HISTORY } from "@/data";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { Badge } from "../ui";

export interface JobExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  technologies?: string[];
  isCurrentJob?: boolean;
  link?: string;
}

const JobHistoryTimeline: React.FC = () => {
  return (
    <div className=" bg-inherit py-12 px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto">
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-gold hidden xl:block"></div>
          <div className="absolute left-8 w-0.5 h-full bg-gray-200 xl:hidden"></div>

          {JOB_HISTORY.map((job, index) => (
            <JobDetails job={job} index={index} key={job.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobHistoryTimeline;

const JobDetails: React.FC<{ job: JobExperience; index: number }> = ({
  job,
  index,
}) => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const formatDuration = (start: string, end: string | null): string => {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();
    const months =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());
    return `${Math.floor(months / 12)} yr ${months % 12} mo`;
  };

  return (
    <div className="relative mb-16 last:mb-0">
      <div
        className={`hidden xl:flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"
          }`}
      >
        <div className={`w-5/12 `}>
          <JobCard job={job} />
        </div>

        {/* Center Dot */}
        <div className="w-2/12 flex justify-center">
          <div className="w-4 h-4 bg-gold rounded-full border-4 border-gray-200 shadow-lg z-10 relative">
            <div className="absolute inset-0 bg-gold rounded-full animate-ping opacity-75"></div>
          </div>
        </div>

        <div className={`w-5/12 `}>
          <div className={`${index % 2 === 0 ? "text-left" : "text-right"}`}>
            <Badge variant="gold">{formatDate(job.startDate)}</Badge>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="xl:hidden flex items-start">
        {/* Mobile Dot */}
        <div className="flex-shrink-0 w-16 flex justify-center">
          <div className="w-4 h-4 bg-gold rounded-full border-4 border-white dark:border-gray-800 shadow-lg relative mt-6">
            <div className="absolute inset-0 bg-gold rounded-full animate-ping opacity-75"></div>
          </div>
        </div>

        {/* Mobile Content */}
        <div className="flex-1 ml-4">
          <div className="mb-2 flex justify-between items-center">
            <Badge variant="gold">{formatDate(job.startDate)}</Badge>
          </div>

          <JobCard job={job} />
        </div>
      </div>
    </div>
  );
};

const JobCard: React.FC<{ job: JobExperience }> = ({ job }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-2xl font-bold text-gold-500 ">{job.title}</h3>
        </div>
        <div className="text-right"></div>
      </div>

      <div className="flex xl:flex-col gap-1 flex-row xl:items-start items-center justify-between  text-sm text-gold-600 mb-4">
        <p className="text-xl text-gold-400">{job.company}</p>
        <div className="flex items-center justify-center">
          <FaLocationDot className="w-4 h-4 mr-1" />
          {job.location}
        </div>
      </div>

      <p className="mb-4 opacity-80">{job.description}</p>

      {job.technologies && job.technologies.length > 0 && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {job.technologies.map((tech) => (
              <span
                key={tech}
                className="text-gold-300 bg-gray-700  text-xs px-3 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
