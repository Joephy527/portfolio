const GITHUB_USERNAME = "Joephy527";
const GITHUB_API = "https://api.github.com";

export type GitHubUser = {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
};

export type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
  updated_at: string;
};

export type GitHubEvent = {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: Record<string, unknown>;
};

export type ContributionDay = {
  date: string;
  contributionCount: number;
  contributionLevel: string;
};

export type ContributionWeek = {
  contributionDays: ContributionDay[];
};

export async function getGitHubUser(): Promise<GitHubUser> {
  const res = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch GitHub user");
  return res.json();
}

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch GitHub repos");
  const repos: GitHubRepo[] = await res.json();
  return repos.filter((r) => !r.fork);
}

export async function getGitHubEvents(): Promise<GitHubEvent[]> {
  const res = await fetch(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/events/public?per_page=20`,
    { next: { revalidate: 1800 } }
  );
  if (!res.ok) throw new Error("Failed to fetch GitHub events");
  return res.json();
}

export async function getContributions(): Promise<{
  weeks: ContributionWeek[];
  totalContributions: number;
}> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("GITHUB_TOKEN is not set");

  const query = `
    query {
      user(login: "${GITHUB_USERNAME}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error("Failed to fetch contributions");

  const data = await res.json();
  const calendar = data.data.user.contributionsCollection.contributionCalendar;

  return {
    weeks: calendar.weeks,
    totalContributions: calendar.totalContributions,
  };
}

export function getTopLanguages(repos: GitHubRepo[]): { name: string; count: number }[] {
  const languageCounts: Record<string, number> = {};
  for (const repo of repos) {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
  }
  return Object.entries(languageCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

export function getTotalStars(repos: GitHubRepo[]): number {
  return repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
}
