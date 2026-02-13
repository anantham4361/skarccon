import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { getLandingProjects } from "@/services/landing.service";
import ProjectModal from "./ProjectModal";


export default function ProjectsSection() {
  const [projects, setProjects] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);

  useEffect(() => {
    getLandingProjects().then(setProjects);
  }, []);

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">
            Our <span className="text-blue-600">Projects</span>
          </h2>
          <p className="mt-3 text-gray-600">
            A glimpse of our completed and ongoing works
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-xl overflow-hidden border shadow-sm bg-white"
            >
              {/* Image */}
              <div className="h-52 bg-gray-100 overflow-hidden">
                {project.project_images?.[0] && (
                  <img
                    src={project.project_images[0].image_url}
                    alt={project.title}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold">
                  {project.title}
                </h3>

                <button
                  onClick={() => setSelected(project)}
                  className="mt-3 inline-flex items-center gap-2 text-blue-600 hover:underline text-sm"
                >
                  <Eye className="h-4 w-4" />
                  View Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <ProjectModal
          project={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
