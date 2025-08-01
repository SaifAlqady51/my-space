import {
  InfoSection,
  JobHistoryTimeline,
  WorkHistoryMap,
  FeedbackButton,
} from "@/components/home";
import { ScrollToTopButton } from "@/components/ui";
import { INFO_DATA } from "@/data";

export default function Main() {
  return (
    <>
      <main className="xl:py-16 py-10 xl:space-y-36 gap-12 md:px-12 px-4 xl:px-52  xl:mt-12">
        <div className="space-y-24">
          {INFO_DATA.map((section) => (
            <InfoSection
              key={section.id}
              imageSrc={section.imageSrc}
              imageAlt={section.imageAlt}
              title={section.title}
              subTitle={section.subTitle}
              description={section.description}
              imagePosition={section.imagePosition}
            />
          ))}
        </div>
        <JobHistoryTimeline />
        <div className=" flex flex-col justify-center items-center ">
          <h3 className="text-title font-bold text-center mb-6">
            {`Countries I'v worked in (remotely)`}
          </h3>
          <WorkHistoryMap />
        </div>
      </main>
      <ScrollToTopButton />
      <FeedbackButton />
    </>
  );
}
