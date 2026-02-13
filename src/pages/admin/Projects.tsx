import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import ProjectForm from "@/components/forms/ProjectForm";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { useProjects } from "@/hooks/useProjects";
import { deleteProject } from "@/services/project.service";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Projects() {
  const { projects, refetch } = useProjects();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<any | null>(null);


  const openCreateModal = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const openEditModal = (project: any) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const openDeleteModal = (project: any) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;
    try {
      await deleteProject(projectToDelete.id);
      await refetch();
    } finally {
      setIsDeleteModalOpen(false);
      setProjectToDelete(null);
    }
  };

  const handleFormSuccess = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    refetch();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Project Management</h2>
          <p className="text-muted-foreground">
            Manage your portfolio projects
          </p>
        </div>

        <Button
          onClick={openCreateModal}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      {/* Mobile Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            {project.project_images?.[0]?.image_url && (
              <img
                src={project.project_images[0].image_url}
                alt={project.title}
                className="aspect-video w-full object-cover"
              />
            )}

            <CardContent className="p-4">
              <h3 className="mb-2 text-lg font-semibold">
                {project.title}
              </h3>

              {/* Chips */}
              <div className="mb-4 flex flex-wrap gap-2">
                {project.project_chips?.map((chip: any) => (
                  <span
                    key={chip.id}
                    className="inline-flex items-center px-3 py-1 rounded-full
                               bg-blue-100 text-blue-700 text-xs
                               whitespace-nowrap"
                  >
                    {chip.label}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => openEditModal(project)}
                  className="flex-1 bg-yellow-500 text-black hover:bg-yellow-600"
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit
                </Button>

                <Button
                  size="sm"
                  onClick={() => openDeleteModal(project)}
                  className="flex-1 bg-red-500 text-white hover:bg-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop Table */}
      <Card className="hidden md:block">
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
          <CardDescription>
            {projects.length} project{projects.length !== 1 && "s"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left text-sm">Image</th>
                <th className="px-4 py-3 text-left text-sm">Title</th>
                <th className="px-4 py-3 text-left text-sm">Chips</th>
                <th className="px-4 py-3 text-right text-sm">Actions</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b last:border-0">
                  <td className="px-4 py-3">
                    <img
                      src={
                        project.project_images?.[0]?.image_url ||
                        "/placeholder.svg"
                      }
                      alt={project.title}
                      className="h-12 w-16 rounded object-cover"
                    />
                  </td>

                  <td className="px-4 py-3">{project.title}</td>

                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      {project.project_chips?.map((chip: any) => (
                        <span
                          key={chip.id}
                          className="inline-flex items-center px-3 py-1 rounded-full
                                     bg-blue-100 text-blue-700 text-xs
                                     whitespace-nowrap"
                        >
                          {chip.label}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="icon"
                        onClick={() => openEditModal(project)}
                        className="bg-yellow-500 text-black hover:bg-yellow-600"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <Button
                        size="icon"
                        onClick={() => openDeleteModal(project)}
                        className="bg-red-500 text-white hover:bg-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <ProjectForm
          project={editingProject || undefined}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProject(null);
          }}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
  <AlertDialogContent className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg">
    <AlertDialogHeader>
      <AlertDialogTitle>Delete Project</AlertDialogTitle>
      <AlertDialogDescription>
        Are you sure you want to delete "{projectToDelete?.title}"?
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>

    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction
        onClick={handleDelete}
        className="bg-red-500 text-white hover:bg-red-600"
      >
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    </div>
  );
}
