import type { Metadata } from "next";
import { ResumeContent } from "@/components/resume/ResumeContent";

export const metadata: Metadata = { title: "Resume | Yoseph Ephrem Kifle" };

export default function ResumePage() {
  return (
    <main className="relative flex flex-col min-h-dvh lg:h-dvh lg:overflow-hidden">
      {/* Header */}
      <div className="z-20 bg-surface/80 backdrop-blur-xl px-6 md:px-16 lg:px-24 py-4 border-b border-border/50 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-primary">Resume</h1>
            <p className="mt-1 text-secondary text-sm lg:text-base">Experience, education, and skills.</p>
          </div>
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-xl bg-accent text-accent-text text-xs lg:text-sm font-medium hover:bg-accent-hover transition-colors"
          >
            Download PDF
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 lg:overflow-hidden px-6 md:px-16 lg:px-24 py-6 lg:py-8 pb-24 lg:pb-20">
        <div className="max-w-7xl mx-auto h-full">
          <ResumeContent />
        </div>
      </div>
    </main>
  );
}
