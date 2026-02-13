import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";

import {
  createProject,
  updateProject,
  uploadProjectImages,
  deleteProjectImages,
  addProjectChips,
  deleteProjectChips,
} from "../../services/project.service";
import Loader from "../ui/Loader";
import { Button } from "../ui/Button";

interface ProjectFormProps {
  onClose: () => void;
  onSuccess: () => void;
  project?: any;
}

export default function ProjectForm({ onClose, onSuccess, project }: ProjectFormProps) {
  const [title, setTitle] = useState(project?.title || "");
  const [description, setDescription] = useState(project?.description || "");
  const [chips, setChips] = useState(project?.project_chips?.map((c: any) => c.label).join(", ") || "");
  const [images, setImages] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 3) {
      setError("Maximum 3 images are allowed");
      return;
    }
    setError("");
    setImages(selectedFiles);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Project title is required");
      return;
    }

    if (!project && images.length === 0) {
      setError("At least one image is required");
      return;
    }

    setSubmitting(true);

    try {
      let projectId = project?.id;

      if (project) {
        await updateProject(project.id, title, description);
        if (images.length > 0) {
          await deleteProjectImages(project.id);
          await uploadProjectImages(project.id, images);
        }
        await deleteProjectChips(project.id);
        projectId = project.id;
      } else {
        const newProject = await createProject(title, description);
        await uploadProjectImages(newProject.id, images);
        projectId = newProject.id;
      }

      const chipArray = chips.split(",").map((c: string) => c.trim()).filter(Boolean);
      if (chipArray.length > 0 && projectId) {
        await addProjectChips(projectId, chipArray);
      }

      onSuccess();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-6 text-xl font-semibold">{project ? "Edit Project" : "Add New Project"}</h3>

        {error && <div className="mb-4 rounded bg-red-100 px-3 py-2 text-sm text-red-700">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="mb-1 block text-sm font-medium">Project Title *</label>
            <input
              type="text"
              className="w-full rounded border p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={submitting}
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1 block text-sm font-medium">Description</label>
            <textarea
              className="w-full rounded border p-2"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={submitting}
            />
          </div>

          {/* Images */}
          <div>
            <label className="mb-1 block text-sm font-medium">Images {project ? "(optional)" : "(max 3) *"}</label>
            <div className="grid grid-cols-3 gap-2">
              {images.map((img, index) => (
                <div key={index} className="relative aspect-video overflow-hidden rounded-md border border-border">
                  <div key={index} className="relative aspect-video overflow-hidden rounded-md border border-border">
  <img
    src={URL.createObjectURL(img)}
    alt={`Preview ${index + 1}`}
    className="w-full h-full object-cover"
  />
</div>

                  <button type="button" onClick={() => removeImage(index)} className="absolute right-1 top-1 rounded-full bg-foreground/80 p-1 text-background hover:bg-foreground">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {images.length < 3 && (
                <button type="button" onClick={() => fileInputRef.current?.click()} className="flex aspect-video flex-col items-center justify-center rounded-md border-2 border-dashed border-border text-muted-foreground hover:border-secondary hover:text-secondary">
                  <Upload className="h-6 w-6" />
                  <span className="mt-1 text-xs">Upload</span>
                </button>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
          </div>

          {/* Chips */}
          <div>
            <label className="mb-1 block text-sm font-medium">Chips (comma separated)</label>
            <input
              type="text"
              placeholder="G+2, 60x40, Bangalore"
              className="w-full rounded border p-2"
              value={chips}
              onChange={(e) => setChips(e.target.value)}
              disabled={submitting}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={submitting}>Cancel</Button>
            <Button type="submit" className="bg-green-300 hover:bg-green-500 hover:text-white" disabled={submitting}>
              {submitting ? <Loader size="sm" className="mr-2" /> : project ? "Update Project" : "Save Project"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
