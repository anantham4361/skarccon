import { supabase } from "./supabaseClient";

export async function getLandingProfile() {
  const { data, error } = await supabase
    .from("admin_profile")
    .select(`
      company_name,
      email,
      phone,
      whatsapp,
      address
    `)
    .single();

  if (error) {
    console.error("Failed to fetch landing profile", error);
    throw error;
  }

  return data;
}



export async function getLandingStats() {
  const { data, error } = await supabase
    .from("statistics")
    .select("*")
    .single();

  if (error) {
    console.error("Failed to fetch landing stats", error);
    throw error;
  }

  return data;
}


export async function getLandingProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select(`
      id,
      title,
      description,
      project_images (
        id,
        image_url,
        order_index
      ),
      project_chips (
        id,
        label
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects", error);
    throw error;
  }

  return data;
}