import type { Metadata } from "next";
import {
  getGitHubUser,
  getGitHubRepos,
  getContributions,
  getTopLanguages,
  getTotalStars,
} from "@/lib/github";
import { StatsCard } from "@/components/github/StatsCard";
import { ContributionGraph } from "@/components/github/ContributionGraph";

export const metadata: Metadata = { title: "GitHub | Yoseph Ephrem Kifle" };

export const dynamic = "force-dynamic";

const languageColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Go: "#00ADD8",
  C: "#555555",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Rust: "#dea584",
  Java: "#b07219",
  Ruby: "#701516",
  Dart: "#00B4AB",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  "C++": "#f34b7d",
  "C#": "#178600",
  PHP: "#4F5D95",
  Lua: "#000080",
  Vim: "#199f4b",
  Dockerfile: "#384d54",
  Makefile: "#427819",
};

export default async function GitHubPage() {
  let user, repos, contributions;
  try {
    [user, repos, contributions] = await Promise.all([
      getGitHubUser(),
      getGitHubRepos(),
      getContributions(),
    ]);
  } catch {
    return (
      <main className="no-scroll relative flex items-center justify-center">
        <p className="text-secondary">Unable to load GitHub data. Please try again later.</p>
      </main>
    );
  }

  const topLanguages = getTopLanguages(repos);
  const totalStars = getTotalStars(repos);

  const stats = [
    { label: "Public Repos", value: user.public_repos },
    { label: "Total Stars", value: totalStars },
    { label: "Followers", value: user.followers },
    { label: "Top Language", value: topLanguages[0]?.name || "N/A" },
  ];

  return (
    <main className="no-scroll relative overflow-y-auto">
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-16 lg:px-24 py-12 pb-28">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary">GitHub Activity</h1>
          <p className="mt-2 text-secondary">
            Open source contributions and coding activity.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <StatsCard key={stat.label} label={stat.label} value={stat.value} index={i} />
          ))}
        </div>

        {/* Contribution graph — real data from GitHub GraphQL */}
        <div className="mb-8">
          <ContributionGraph
            weeks={contributions.weeks}
            totalContributions={contributions.totalContributions}
          />
        </div>

        {/* Top languages */}
        <div className="rounded-xl border border-border bg-card backdrop-blur-sm p-6 mb-8">
          <h3 className="text-sm font-medium text-secondary mb-4">Top Languages</h3>
          <div className="flex flex-wrap gap-3">
            {topLanguages.map((lang) => (
              <div
                key={lang.name}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-subtle border border-border"
              >
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: languageColors[lang.name] || "#a1a1aa" }}
                />
                <span className="text-sm font-medium text-primary">{lang.name}</span>
                <span className="text-xs text-muted">{lang.count} repos</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
