import type { Stats } from "../types/stats";
import { supabase } from "./supabaseClient";



export async function getStatistics(): Promise<Stats> {
  const { data, error } = await supabase
    .from("statistics")
    .select("*")
    .limit(1)
    .single();

  if (error) throw error;
  return data;
}


export async function updateStatistics(stats: Stats) {
  const { error } = await supabase
    .from("statistics")
    .update({
      completed_projects: stats.completed_projects,
      ongoing_projects: stats.ongoing_projects,
      happy_clients: stats.happy_clients,
      experience_years: stats.experience_years,
      updated_at: new Date().toISOString(),
    })
    .eq("id", stats.id); 

  if (error) throw error;
}
