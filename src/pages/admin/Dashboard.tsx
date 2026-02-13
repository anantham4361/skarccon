import { useEffect, useState } from "react";
import {
  Building2,
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  CheckCircle,
  Clock,
  Users,
  Calendar,
} from "lucide-react";
import { getProfile } from "../../services/profile.service";
import { getStatistics } from "../../services/stats.service";

export default function Dashboard() {
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    getProfile().then(setProfile);
    getStatistics().then(setStats);
  }, []);

  if (!profile || !stats) {
    return <div className="text-sm text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your company and website statistics
        </p>
      </div>

      {/* Profile Card */}
      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600">
            <Building2 />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{profile.company_name}</h3>
            <p className="text-sm text-muted-foreground">
              Company Profile
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-sm">
          <InfoItem icon={Mail} text={profile.email} />
          <InfoItem icon={Phone} text={profile.phone} />
          <InfoItem icon={MessageCircle} text={profile.whatsapp} />
          <InfoItem icon={MapPin} text={profile.address} />
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
          value={`${stats.experience_years} yrs`}
          icon={Calendar}
          color="orange"
        />
      </div>
    </div>
  );
}

/* ----------------------------
   Small Components
----------------------------- */

function InfoItem({ icon: Icon, text }: any) {
  if (!text) return null;

  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Icon className="h-4 w-4" />
      <span>{text}</span>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }: any) {
  const colorMap: any = {
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-full ${colorMap[color]}`}>
          <Icon />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}
