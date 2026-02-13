import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: any;
  onClose: () => void;
}) {
  const images = project.project_images || [];
  const chips = project.project_chips || [];
  const [index, setIndex] = useState(0);

  const next = () =>
    setIndex((i) => (i + 1) % images.length);
  const prev = () =>
    setIndex((i) => (i - 1 + images.length) % images.length);

  // Optional but recommended: lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4
                 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-2xl w-full rounded-xl overflow-hidden relative
                   animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 bg-white rounded-full p-1 shadow
                     text-gray-600 hover:text-black"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Image Carousel */}
        <div className="relative h-72 bg-black">
          {images.length > 0 && (
            <img
              src={images[index].image_url}
              alt=""
              className="h-full w-full object-cover"
            />
          )}

          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2
                           bg-white/80 p-1 rounded hover:bg-white"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2
                           bg-white/80 p-1 rounded hover:bg-white"
              >
                <ChevronRight />
              </button>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold">
            {project.title}
          </h3>

          {/* Chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            {chips.map((chip: any) => (
              <span
                key={chip.id}
                className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs"
              >
                {chip.label}
              </span>
            ))}
          </div>

          {/* Description */}
          {project.description && (
            <p className="mt-4 text-gray-600">
              {project.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
