import { supabase } from "./supabaseClient";




// project service
export async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select(`
      id,
      title,
      description,
      project_images (id, image_url, order_index),
      project_chips (id, label)
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createProject(title: string, description?: string) {
  const { data, error } = await supabase
    .from("projects")
    .insert({ title, description })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProject(projectId: string) {
  // 1️⃣ Get storage file paths
  const imagePaths = await getProjectImagePaths(projectId);

  // 2️⃣ Delete storage files
  await deleteProjectStorageFiles(imagePaths);

  // 3️⃣ Delete project (DB cascade handles rest)
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId);

  if (error) throw error;
}


export async function updateProject(
  projectId: string,
  title: string,
  description?: string
) {
  const { error } = await supabase
    .from("projects")
    .update({ title, description })
    .eq("id", projectId);

  if (error) throw error;
}

export async function deleteProjectImages(projectId: string) {
  const { error } = await supabase
    .from("project_images")
    .delete()
    .eq("project_id", projectId);

  if (error) throw error;
}

export async function deleteProjectChips(projectId: string) {
  const { error } = await supabase
    .from("project_chips")
    .delete()
    .eq("project_id", projectId);

  if (error) throw error;
}



// image upload service
export async function uploadProjectImages(
  projectId: string,
  files: File[]
) {
  if (files.length > 3) {
    throw new Error("Maximum 3 images allowed");
  }

  const uploadedUrls: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = `${projectId}/${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("projects")
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("projects")
      .getPublicUrl(filePath);

    uploadedUrls.push(data.publicUrl);

    await supabase.from("project_images").insert({
      project_id: projectId,
      image_url: data.publicUrl,
      order_index: i + 1,
    });
  }

  return uploadedUrls;
}


async function getProjectImagePaths(projectId: string): Promise<string[]> {
  const { data, error } = await supabase
    .from("project_images")
    .select("image_url")
    .eq("project_id", projectId);

  if (error) throw error;

  return (
    data?.map((img) => {
      const parts = img.image_url.split("/projects/");
      return parts[1]; // project_id/filename
    }) || []
  );
}


async function deleteProjectStorageFiles(paths: string[]) {
  if (paths.length === 0) return;

  const { error } = await supabase.storage
    .from("projects")
    .remove(paths);

  if (error) throw error;
}


//chips service
export async function addProjectChips(
  projectId: string,
  chips: string[]
) {
  const payload = chips.map((chip) => ({
    project_id: projectId,
    label: chip,
  }));

  const { error } = await supabase
    .from("project_chips")
    .insert(payload);

  if (error) throw error;
}
