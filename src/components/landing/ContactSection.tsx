import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { sendContactMessage } from "../../services/contact.service";
import { getLandingProfile } from "../../services/landing.service";

export default function ContactSection() {
  const [profileEmail, setProfileEmail] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getLandingProfile().then((data) => {
      if (data?.email) setProfileEmail(data.email);
    });
  }, []);

  const handleChange = (
    key: keyof typeof form,
    value: string
  ) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {

      await sendContactMessage(form);

      await emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  {
    to_email: profileEmail,
    name: form.name,
    email: form.email,
    phone: form.phone,
    message: form.message,
  },
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
);


      setSuccess(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center">
          Contact <span className="text-blue-600">Us</span>
        </h2>

        <p className="mt-3 text-center text-gray-600">
          Get in touch with us for your next project
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-5 bg-gray-50 p-6 rounded-xl shadow-sm"
        >
          <input
            placeholder="Your Name"
            required
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full border rounded px-4 py-2"
          />

          <input
            type="email"
            placeholder="Your Email"
            required
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="w-full border rounded px-4 py-2"
          />

          <input
            placeholder="Phone Number"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="w-full border rounded px-4 py-2"
          />

          <textarea
            placeholder="Your Message"
            required
            rows={4}
            value={form.message}
            onChange={(e) => handleChange("message", e.target.value)}
            className="w-full border rounded px-4 py-2"
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {success && (
            <p className="text-green-600 text-center text-sm">
              Message sent successfully!
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
