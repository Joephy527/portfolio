import { Eye, FileText, TrendingUp, Users } from "lucide-react";

type Stat = {
  label: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
};

export function StatsCards() {
  const stats: Stat[] = [
    { label: "Total Views", value: "1,234", change: "+12%", icon: <Eye size={18} /> },
    { label: "Blog Posts", value: 3, icon: <FileText size={18} /> },
    { label: "This Week", value: 156, change: "+8%", icon: <TrendingUp size={18} /> },
    { label: "Unique Visitors", value: 89, icon: <Users size={18} /> },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="p-4 rounded-xl border border-zinc-200 bg-white">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400">{stat.icon}</span>
            {stat.change && (
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                {stat.change}
              </span>
            )}
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-zinc-900">{stat.value}</div>
            <div className="text-sm text-zinc-500">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
