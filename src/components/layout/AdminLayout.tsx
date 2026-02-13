import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";


export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Content Area */}
      <div className="flex flex-1 flex-col md:ml-60">
        
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

      
        <main
          className="flex-1 p-6"
          onClick={() => sidebarOpen && setSidebarOpen(false)}
        >
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}
