import { ProjectCardProps } from "@/components/projects/project-card";
import pair_dev_finder from "@assets/pair_dev_finder.png";
import chat_app from "@assets/chat_app.png";
import simple_bank from "@assets/simple_bank.png";
import flight_booking from "@assets/flight_booking_app.png";

export const PROJECTS: ProjectCardProps[] = [
  {
    projectName: "Pair Dev Finder",
    content:
      "Pair Dev Finder connects developers for collaborative coding sessions by matching skills and availability. With built-in video chat and real-time code sharing, it makes pair programming effortless. Whether you're practicing algorithms, working on a project, or just learning, find the perfect coding partner and build better code—together!",
    image: pair_dev_finder,
    imageAlt: "pair dev finder image",
    link: "https://github.com/SaifAlqady51/pair-dev-finder/blob/main/README.md",
  },
  {
    projectName: "Simple Bank",
    content:
      "A secure banking application built with Go featuring user authentication, account management, and money transfers. Implements both REST and gRPC APIs with JWT/PASETO authentication, PostgreSQL database, and comprehensive testing, containerized deployment, and automated CI/CD pipeline.",
    image: simple_bank,
    imageAlt: "simple bank image",
    link: "https://github.com/SaifAlqady51/simple-bank/blob/main/README.md",
  },

  {
    projectName: "Chat App",
    content:
      "Real-time Chat Application - Microservices Architecture A scalable chat application built with Java  and Spring Boot using microservices architecture. Features Apache Kafka for inter-service communication, Docker containerization, and Kubernetes orchestration. Handles authentication, messaging, and conversation management with PostgreSQL and Redis.",
    image: chat_app,
    imageAlt: "chat app image",
    link: "/",
  },
  {
    projectName: "Flight Booking App",
    content:
      "Flight Booking App - A Next.js application with real-time flight search powered by Amadeus API, featuring IATA-standard airport codes. Built with modern technologies including GraphQL (Apollo), Prisma ORM, Redux for state management, and Styled Components. The app provides responsive flight booking functionality with a clean UI and efficient data handling.",
    image: flight_booking,
    imageAlt: "flight booking app image",
    link: "https://github.com/SaifAlqady51/flight_booking_website/blob/main/README.md",
  },
];
