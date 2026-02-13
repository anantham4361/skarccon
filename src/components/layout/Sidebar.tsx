import { NavLink } from "react-router-dom";
import { X, LayoutDashboard, FolderKanban, User, BarChart3, Mail } from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/profile", label: "Profile", icon: User },
  { href: "/admin/statistics", label: "Statistics", icon: BarChart3 },
  { href: "/admin/messages", icon: Mail, label: "Messages" }

];

interface SidebarItemProps {
  href: string;
  icon: any;
  label: string;
  onClick?: () => void;
}

function SidebarItem({ href, icon: Icon, label, onClick }: SidebarItemProps) {
  return (
    <NavLink
      to={href}
      end={href === "/admin"}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-md transition-colors text-sm ${isActive
          ? "bg-gray-700 text-white"
          : "text-gray-300 hover:bg-gray-800 hover:text-white"
        }`
      }
    >
      <Icon className="h-5 w-5" />
      {label}
    </NavLink>
  );
}

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-60 bg-gray-900 text-white transform transition-transform duration-300
  md:translate-x-0 md:fixed
  ${isOpen ? "translate-x-0" : "-translate-x-full"}
`}

      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-gray-800 px-4">
          <span className="text-xl font-bold">Admin</span>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-800 hover:text-white md:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 p-4">
          {navItems.map((item) => (
            <SidebarItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              onClick={onClose}
            />
          ))}
        </nav>
      </aside>
    </>
  );
}
