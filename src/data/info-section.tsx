import { getTimeBasedGreeting } from "@/app/helpers/get-time-based-greeting";
import Space from "@assets/space.jpg";
import LockIn from "@assets/Locked-in_3.jpg";
import { InfoSectionProps } from "@/components/home";

export const INFO_DATA: (InfoSectionProps & { id: number })[] = [
  {
    id: 1,
    imageSrc: Space,
    imageAlt: "space-image",
    title: `${getTimeBasedGreeting()}, I'm Saif Alqady \nand this is my SPACE`,
    subTitle: "Projects, thoughts, experiments—capturing the process.",
    description:
      "This is my digital workshop—a living archive of ideas in motion. Here, I document the journey of creation: experiments, iterations, and the small breakthroughs that shape meaningful work. It's not about polished perfection, but the honest path from 'what if' to 'why not.' Consider this an open invitation to explore the process behind the results.",
    imagePosition: "right",
  },
  {
    id: 2,
    imageSrc: LockIn,
    imageAlt: "space-image",
    title: "Who Am I?",
    subTitle: "Still figuring that out — but I know what I do",
    description:
      "Web developer by day, amateur chess player by night—I thrive on clean code that reads like poetry and systems that don't crumble under pressure. Mobile-friendly design, maintainable architecture, and thoughtful scalability matter to me because building things right beats midnight firefighting. On the backend, I focus on efficient queries, well-structured APIs, and reliable error handling—because even the best ideas fail without a solid foundation. Let's build something that works, lasts, and (ideally) doesn't keep us awake at 3 AM.",
    imagePosition: "left",
  },
];
