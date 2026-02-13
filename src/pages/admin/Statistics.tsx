import { useEffect, useState } from "react";
import { Save, CheckCircle, Clock, Users, Calendar } from "lucide-react";

import { getStatistics, updateStatistics } from "../../services/stats.service";



import Loader from "../../components/ui/Loader";

import type { Stats } from "../../types/stats";
import { Button } from "../../components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import StatCounter from "@/components/admin/StatCounter";

export default function Statistics() {
  const [stats, setStats] = useState<Stats>({
    id: "",
    completed_projects: 0,
    ongoing_projects: 0,
    happy_clients: 0,
    experience_years: 0,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Fetch stats on mount
  useEffect(() => {
    getStatistics()
      .then((data) => {
        setStats({
          id: data.id || "",
          completed_projects: data.completed_projects || 0,
          ongoing_projects: data.ongoing_projects || 0,
          happy_clients: data.happy_clients || 0,
          experience_years: data.experience_years || 0,
        });
      })
      .catch((err) => console.error("Failed to fetch statistics:", err));
  }, []);

  // Only numeric keys
  type StatKey = keyof Omit<Stats, "id">;

  const updateStat = (key: StatKey, delta: number) => {
    setStats((prev) => ({
      ...prev,
      [key]: Math.max(0, (prev[key] as number) + delta),
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      await updateStatistics(stats);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to save statistics:", err);
      alert("Failed to save statistics");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Statistics Management</h2>
          <p className="text-muted-foreground">
            Manage the counters displayed on the website
          </p>
        </div>

        <div className="flex items-center gap-4">
          {saveSuccess && (
            <span className="text-sm text-green-600">
              Saved successfully!
            </span>
          )}

          <Button
            onClick={handleSave}
            className="bg-green-300 hover:bg-green-500 hover:text-white"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <Loader size="sm" className="mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Counters */}
      <Card>
        <CardHeader>
          <CardTitle>Website Counters</CardTitle>
          <CardDescription>
            Use the + and - buttons to adjust each counter. Click Save Changes to update the website.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <StatCounter
              label="Completed Projects"
              value={stats.completed_projects}
              icon={CheckCircle}
              iconColor="bg-green-500"
              onIncrement={() => updateStat("completed_projects", 1)}
              onDecrement={() => updateStat("completed_projects", -1)}
            />

            <StatCounter
              label="Ongoing Projects"
              value={stats.ongoing_projects}
              icon={Clock}
              iconColor="bg-blue-500"
              onIncrement={() => updateStat("ongoing_projects", 1)}
              onDecrement={() => updateStat("ongoing_projects", -1)}
            />

            <StatCounter
              label="Happy Clients"
              value={stats.happy_clients}
              icon={Users}
              iconColor="bg-purple-500"
              onIncrement={() => updateStat("happy_clients", 1)}
              onDecrement={() => updateStat("happy_clients", -1)}
            />

            <StatCounter
              label="Experience (Years)"
              value={stats.experience_years}
              icon={Calendar}
              iconColor="bg-orange-500"
              onIncrement={() => updateStat("experience_years", 1)}
              onDecrement={() => updateStat("experience_years", -1)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
