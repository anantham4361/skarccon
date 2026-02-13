import { useAuth } from "../../auth/AuthProvider";
import { Menu } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const { signOut } = useAuth();
  return (
    <header className="h-14 bg-white shadow flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-4">
        {/* Hamburger */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={onMenuClick}
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <h1 className="font-semibold text-lg">Admin Dashboard</h1>
      </div>

      <button className="text-white bg-red-600 hover:bg-red-700 px-4 py-1.5 rounded-md text-sm" onClick={signOut}>
        Logout
      </button>
    </header>
  );
}
