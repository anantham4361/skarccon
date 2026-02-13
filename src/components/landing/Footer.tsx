import { useEffect, useState } from "react";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";
import { getLandingProfile } from "../../services/landing.service";

export default function Footer() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    getLandingProfile().then(setProfile);
  }, []);

  if (!profile) return null;

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 grid gap-10 md:grid-cols-3">
        {/* Company */}
        <div>
          <h3 className="text-xl font-bold text-white">
            {profile.company_name}
          </h3>
          <p className="mt-3 text-sm text-gray-400">
            Delivering reliable construction and architectural solutions with
            quality and integrity.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">
            Contact
          </h4>
          <ul className="space-y-2 text-sm">
            {profile.phone && (
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {profile.phone}
              </li>
            )}
            {profile.whatsapp && (
              <li className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                {profile.whatsapp}
              </li>
            )}
            {profile.email && (
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {profile.email}
              </li>
            )}
          </ul>
        </div>

        {/* Address */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">
            Address
          </h4>
          <p className="flex items-start gap-2 text-sm">
            <MapPin className="h-4 w-4 mt-1" />
            {profile.address}
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} {profile.company_name}. All rights reserved.
      </div>
    </footer>
  );
}
