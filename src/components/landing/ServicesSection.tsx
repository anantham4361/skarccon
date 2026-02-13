import { Hammer, Ruler, Building2 } from "lucide-react";

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold">
            Our <span className="text-blue-600">Services</span>
          </h2>
          <p className="mt-3 text-gray-600">
            End-to-end solutions for your construction needs
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <ServiceCard
            icon={Building2}
            title="Construction"
            description="Residential and commercial construction with quality materials and skilled execution."
            color="blue"
          />
          <ServiceCard
            icon={Ruler}
            title="Architecture"
            description="Modern and functional architectural designs tailored to your vision and budget."
            color="orange"
          />
          <ServiceCard
            icon={Hammer}
            title="Renovation"
            description="Upgrading and remodeling existing structures with precision and care."
            color="green"
          />
        </div>
      </div>
    </section>
  );
}


function ServiceCard({ icon: Icon, title, description, color }: any) {
  const colorMap: any = {
    blue: "bg-blue-100 text-blue-600",
    orange: "bg-orange-100 text-orange-600",
    green: "bg-green-100 text-green-600",
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 text-center">
      <div
        className={`mx-auto mb-4 h-14 w-14 flex items-center justify-center rounded-full ${colorMap[color]}`}
      >
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-gray-600 text-lg">
        {description}
      </p>
    </div>
  );
}
