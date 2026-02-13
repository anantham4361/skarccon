import type { AdminProfile } from "@/types/profile";
import { supabase } from "./supabaseClient";



export async function getProfile(): Promise<AdminProfile> {
  const { data, error } = await supabase
    .from("admin_profile")
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function updateProfile(profile: AdminProfile) {
  const { error } = await supabase
    .from("admin_profile")
    .update({
      company_name: profile.company_name,
      email: profile.email,
      phone: profile.phone,
      whatsapp: profile.whatsapp,
      address: profile.address,
      updated_at: new Date().toISOString(),
    })
    .eq("id", profile.id);

  if (error) throw error;
}
