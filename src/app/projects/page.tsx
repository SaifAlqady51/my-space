import { ProjectCard } from "@/components/projects/project-card";
import { PROJECTS } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-16 mb-10">
      {PROJECTS.map((project, index) => (
        <div
          key={index}
          className={`flex ${index % 2 === 0 ? "justify-end" : "justify-start"}`}
        >
          <ProjectCard {...project} />
        </div>
      ))}
    </div>
  );
}
