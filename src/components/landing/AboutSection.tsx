import { useEffect, useState } from "react";
import { getLandingProfile } from "../../services/landing.service";

export default function AboutSection() {
  const [aboutData, setAboutData] = useState<any>(null);

  useEffect(() => {
    getLandingProfile().then(setAboutData);
  }, []);

  if (!aboutData) return null;

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076&auto=format&fit=crop"
              alt="Construction team at work"
              className="rounded-lg shadow-xl w-full h-[400px] lg:h-[500px] object-cover"
            />

          </div>

          {/* Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              About Us
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {(`${aboutData.company_name}, we are committed to delivering exceptional construction and architecture services that exceed our clients' expectations. With over 15 years of experience in the industry, our team of skilled professionals brings expertise, dedication, and innovation to every project.

              We specialize in residential and commercial construction, from luxury homes to large-scale commercial developments. Our approach combines traditional craftsmanship with modern techniques and sustainable practices, ensuring that every structure we build is not only beautiful but also built to last.

              Our commitment to quality, safety, and customer satisfaction has made us one of the most trusted names in the construction industry. We take pride in our transparent communication, timely delivery, and attention to detail that sets us apart from the competition.`)
                .split("\n\n")
                .map((paragraph: string, index: number) => (
                  <p key={index}>{paragraph}</p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
