import { projects } from "@/data/projects";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Projects | Yoseph Ephrem Kifle" };

export default function ProjectsPage() {
  return (
    <main className="no-scroll relative">
      <div className="relative z-10 flex flex-col min-h-full px-6 md:px-12 lg:px-16 xl:px-24 py-12 pb-24 lg:pb-12">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-primary">Projects</h1>
          <p className="mt-2 text-secondary">A selection of things I&apos;ve built.</p>
        </div>

        <div className="flex-1 flex items-center pb-16">
          <ProjectShowcase projects={projects} />
        </div>
      </div>
    </main>
  );
}
