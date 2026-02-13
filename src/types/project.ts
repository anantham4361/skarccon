export interface ProjectImage {
  id: string;
  image_url: string;
  order_index: number;
}

export interface ProjectChip {
  id: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  project_images: ProjectImage[];
  project_chips: ProjectChip[];
}
