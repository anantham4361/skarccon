import { ArrowRight, Phone } from "lucide-react";
import { Button } from "../ui/Button"; // your Button component

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-0"
    >

      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center flex flex-col items-center justify-center">
        <h1 className="text-5xl sm:text-6xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Building Your <span className="text-blue-400">Dream Projects</span> With Trust & Quality
        </h1>

        <p className="text-white/90 text-lg sm:text-2xl mb-8">
          We deliver high-quality construction, architecture, and engineering solutions tailored to your vision.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => scrollToSection("#projects")}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2 text-md"
          >
            View Projects
            <ArrowRight className="h-5 w-5" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection("#contact")}
            className="border-white text-white hover:bg-white hover:text-black gap-2 text-md"
          >
            <Phone className="h-5 w-5" />
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
