// AdminLayout.jsx
import React, { useState } from "react";
import { Sidebar } from "../../../components/main/admin/navbar/adminNavbar";
import { Menu } from "lucide-react";

const AdminLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#fafafb]">
      
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Content */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Mobile Top Bar (IMPORTANT) */}
        <div className="md:hidden sticky top-0 z-40 flex items-center justify-between p-4 border-b bg-gray-100">
          <Menu
            className="cursor-pointer text-black"
            onClick={() => setIsOpen(true)}
          />
          <h1 className="font-semibold text-gray-400">Dashboard</h1>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 md:ml-0 bg-gray-100">
          {children}
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;