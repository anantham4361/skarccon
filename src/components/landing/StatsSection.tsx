import { useEffect, useState } from "react";
import {
  CheckCircle,
  Clock,
  Users,
  Calendar,
} from "lucide-react";
import { getLandingStats } from "../../services/landing.service";

export default function StatsSection() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    getLandingStats().then(setStats);
  }, []);

  if (!stats) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Completed Projects"
          value={stats.completed_projects}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          label="Ongoing Projects"
          value={stats.ongoing_projects}
          icon={Clock}
          color="blue"
        />
        <StatCard
          label="Happy Clients"
          value={stats.happy_clients}
          icon={Users}
          color="purple"
        />
        <StatCard
          label="Experience"
          value={`${stats.experience_years}+ Years`}
          icon={Calendar}
          color="orange"
        />
      </div>
    </section>
  );
}

/* ------------------------------
   Reusable Stat Card
------------------------------ */

function StatCard({ label, value, icon: Icon, color }: any) {
  const colorMap: any = {
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (
    <div className="rounded-xl bg-white shadow-sm p-6 flex items-center gap-4">
      <div className={`p-3 rounded-full ${colorMap[color]}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
