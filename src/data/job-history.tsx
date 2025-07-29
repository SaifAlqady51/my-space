import { JobExperience } from "@/components/home/job-history-timeline";

export const JOB_HISTORY: JobExperience[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "EVVENT AS",
    location: "Norway (Remote)",
    startDate: "2023-12",
    endDate: "2024-04",
    description:
      "Developed and maintained responsive web applications using Next.js, TypeScript, and Tailwind CSS. Implemented modern frontend architectures to deliver high-performance, maintainable code. Collaborated with design and backend teams to create seamless user experiences. Followed best practices for code quality, testing, and accessibility while meeting project deadlines.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Git"],
    link: "#",
  },
  {
    id: "2",
    title: "Full Stack Developer ",
    company: "UPWORK ",
    location: "Remote",
    startDate: "2024-06",
    endDate: "2025-07",
    description:
      "Developed and maintained full-stack applications, transforming legacy systems into scalable microservices using Next.js, NestJS, and TypeScript. Designed event-driven architectures for real-time data processing and deployed containerized services on Kubernetes to enhance reliability and scalability. Led optimizations across frontend and backend systems, improving performance and maintainability while modernizing deployment workflows",
    technologies: [
      "Next.js",
      "NestJS",
      "TypeScript",
      "GraphQL",
      "Node.js",
      "Kafka",
      "Microservices",
      "Docker",
      "AWS",
      "React",
    ],
    link: "#",
    isCurrentJob: true,
  },
];
