export type Project = {
  title: string;
  description: string;
  image: string;
  href: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    title: "Bridgeline",
    description:
      "An AI-powered construction bid analysis platform for preconstruction teams. Upload subcontractor proposal PDFs, automatically extract and normalize pricing and scope data, and compare bids side by side across vendors. Includes project dashboards, trade-level bid leveling, carried cost summaries, and export tools for faster, more accurate estimating.",
    image: "/projects/bridgeline.png",
    href: "https://bridgeline.io/",
    tags: ["TypeScript", "Next.js", "Firebase", "Firestore", "Gemini", "Tailwind", "GCP", "Docker"],
  },
  {
    title: "Yuba",
    description:
      "An AI-powered venture-building platform for early-stage founders. Turns raw startup ideas into investor-ready businesses by guiding users through problem validation, market research, value proposition design, product planning, and go-to-market strategy — all in one structured workflow.",
    image: "/projects/yuba.png",
    href: "https://yubanow.com/",
    tags: ["Python", "FastAPI", "TypeScript", "Next.js", "Tailwind", "OpenAI", "Azure", "Docker", "Stripe", "Webhooks", "PostgreSQL", "Redis", "WebSockets"],
  },
  {
    title: "Detmo",
    description:
      "A spending management platform. Implemented user authentication with role-based access, subscription-based payments, a batching mechanism for performance, retries with exponential backoff for webhook reliability, and a referral system for growth.",
    image: "/projects/detmo.png",
    href: "https://www.detmo.co/",
    tags: ["TypeScript", "Next.js", "Stripe", "Webhooks", "PostgreSQL", "Python", "FastAPI", "Tailwind"],
  },
  {
    title: "AKIL Platform",
    description:
      "A platform connecting NGOs and volunteers. Integrated real-time chat (25% engagement increase), improved onboarding (35% more volunteer sign-ups), and enhanced opportunity-matching (20% rise in successful placements). Streamlined recruitment and made volunteering more accessible.",
    image: "/projects/akil.png",
    href: "https://www.akilconnect.org/en",
    tags: ["Go", "Redis", "MongoDB", "TypeScript", "Next.js", "Tailwind", "GCP", "WebSockets"],
  },
  {
    title: "RateEat",
    description:
      "Built a web dashboard with an integrated admin system for customizable reporting, improving operational efficiency for 400+ businesses. Developed backend services handling data aggregation, authentication, and performance-critical endpoints. Implemented SSR with Next.js, improving app performance by 50%.",
    image: "/projects/rateeat.png",
    href: "https://rateeat.app/",
    tags: ["Node.js", "Express", "Next.js", "TypeScript", "PostgreSQL", "Redis", "GCP"],
  },
  {
    title: "AfroChat",
    description:
      "A scalable, AI-powered chat platform for the African community. Engineered the web app from the ground up with real-time messaging. Led backend migration using Domain-Driven Design, Dependency Injection, and TDD, boosting performance by 30%. Now serves over 1,000 users.",
    image: "/projects/afrochat.png",
    href: "https://afrochat.app/en",
    tags: ["Python", "FastAPI", "Next.js", "TypeScript", "Frontier AI Models"],
  },
];
