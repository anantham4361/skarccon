import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { getLandingProfile } from "@/services/landing.service";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [companyName, setCompanyName] = useState("Construction Company");

  useEffect(() => {
    getLandingProfile().then((data) => {
      if (data?.company_name) setCompanyName(data.company_name);
    });
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo / Name */}
        <span className="text-xl font-bold text-blue-600">
          {companyName}
        </span>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-md font-medium">
          <a href="#home" className="hover:text-blue-600">Home</a>
          <a href="#about" className="hover:text-blue-600">About</a>
          <a href="#projects" className="hover:text-blue-600">Projects</a>
          <a href="#services" className="hover:text-blue-600">Services</a>
          <a href="#contact" className="hover:text-blue-600">Contact</a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <nav className="flex flex-col p-4 gap-4 text-md">
            <a href="#home" onClick={() => setOpen(false)}>Home</a>
            <a href="#about" onClick={() => setOpen(false)}>About</a>
            <a href="#projects" onClick={() => setOpen(false)}>Projects</a>
            <a href="#services" onClick={() => setOpen(false)}>Services</a>
            <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
          </nav>
        </div>
      )}
    </header>
  );
}
