import { JOB_HISTORY } from "@/data";
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { Badge } from "../ui";
import { formatDate } from "@/helpers";

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

export const JobHistoryTimeline: React.FC = () => {
  return (
    <div className=" bg-inherit py-12 px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto">
        <div className="relative">
          <div className="absolute w-0.5 h-full bg-gold left-2 xl:left-1/2 xl:-translate-x-0.5"></div>
          {JOB_HISTORY.map((job, index) => {
            const isEven = index % 2 === 0;
            return (
              <div className="relative mb-6 last:mb-0" key={index}>
                <div className="flex flex-col xl:flex-row items-start xl:items-center">
                  <div className="flex-shrink-0 w-4 xl:w-2/12 flex justify-center order-1 xl:order-none">
                    <div className="w-4 h-4 bg-gold rounded-full border-4 border-gray-200 shadow-lg z-10 relative">
                      <div className="absolute inset-0 bg-gold rounded-full animate-ping opacity-75"></div>
                    </div>
                  </div>

                  <div
                    className={`space-y-4 xl:space-y-0 flex-1 xl:w-5/12 xl:ml-0 ml-6 order-2 ${isEven ? "xl:order-first" : "xl:order-last"
                      }`}
                  >
                    <div className="xl:hidden flex justify-between xl:m-0">
                      {/* Date Badge for Mobile View*/}
                      <DateBadge
                        date={job.startDate}
                        isCurrentJob={job.isCurrentJob}
                      />
                    </div>
                    <JobCard job={job} />
                  </div>

                  <div
                    className={`flex-1 xl:w-5/12 mt-2 xl:mt-0 order-3 ${isEven
                        ? "text-left xl:order-last"
                        : "text-right xl:order-first"
                      }`}
                  >
                    {/* Date Badge for Desktop View*/}
                    <div className="hidden justify-between xl:block">
                      <DateBadge
                        date={job.startDate}
                        isCurrentJob={job.isCurrentJob}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface DateBadgeProps {
  date: string;
  isCurrentJob?: boolean;
}

const DateBadge: React.FC<DateBadgeProps> = ({ date }) => {
  return <Badge variant="gold">{formatDate(date)}</Badge>;
};

const JobCard: React.FC<{ job: JobExperience }> = ({ job }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-center mb-2">
        <div className="flex md:flex-row flex-col md:justify-between  w-full gap-1 ">
          <h3 className="text-2xl font-bold text-gold-400">{job.title}</h3>

          {job.isCurrentJob && (
            <Badge className=" w-fit flex bg-green-900 text-green-300 text-xs md:px-3 px-2 md:py-1 py-0.5 h-fit rounded-md whitespace-nowrap">
              Current Position
            </Badge>
          )}
        </div>
      </div>

      <div className="flex xl:flex-row gap-1 flex-col items-start xl:items-center justify-between text-sm text-gold-600 mb-4">
        <p className="text-xl text-gold-500 font-semibold">{job.company}</p>
        <div className="flex items-center justify-center">
          <FaLocationDot className="w-4 h-4 mr-1" />
          {job.location}
        </div>
      </div>

      <p className="mb-4">{job.description}</p>

      {job.technologies && job.technologies.length > 0 && (
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {job.technologies.map((tech) => (
              <span
                key={tech}
                className="text-gold-300 bg-gray-700 text-xs px-3 py-1 rounded-full"
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
