import React,{useState} from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Folder,
  FileText,
  Users,
  Settings,
  LogOut,
  MessageSquare,
  X,
} from "lucide-react";
import AuthenticationManagement from "../../../../hooks/authentication/authenticationManagement";

const SidebarItem = ({ icon: Icon, label, to }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition ${
        isActive
          ? "bg-green-100 text-green-700 font-medium"
          : "text-gray-600 hover:bg-gray-200"
      }`
    }
  >
    <Icon size={18} />
    <span>{label}</span>
  </NavLink>
);

export const Sidebar = ({ isOpen, setIsOpen }) => {

  const {handleLogout, logoutLoading} = AuthenticationManagement();
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-gray-100 p-5 flex flex-col justify-between transform transition-transform duration-300 overflow-y-auto
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Top */}
        <div>
          {/* Mobile Header */}
          <div className="flex justify-between items-center mb-6 md:hidden">
            <h1 className="font-bold text-gray-300">MENU</h1>
            <X
              className="cursor-pointer text-black"
              onClick={() => setIsOpen(false)}
            />
          </div>

          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-yellow-500 w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold">
              ⛁
            </div>
            <div>
              <h1 className="font-bold text-black">The Ledger</h1>
              <p className="text-xs text-gray-500">Admin Console</p>
            </div>
          </div>

          {/* Menu */}
          <div className="space-y-2">
            <SidebarItem icon={LayoutDashboard} label="Overview" to="/admin/dashboard-overview" />
            <SidebarItem icon={Folder} label="Projects" to="/admin/dashboard-project-management" />
            <SidebarItem icon={FileText} label="Content" to="/admin/dashboard-content-management" />
            <SidebarItem icon={MessageSquare} label="Messages" to="/admin/dashboard-messages" />
          </div>
        </div>

        {/* Bottom */}
        <div className="space-y-2">
          <SidebarItem icon={Settings} label="Settings" to="/settings" />
            <button
                        onClick={handleLogout}
                        disabled={logoutLoading}
                        className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition text-gray-600 hover:bg-gray-200 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <LogOut size={18} />
                        <span>{logoutLoading ? "Logging out..." : "Log out"}</span>

                    </button>
        </div>
      </aside>
    </>
  );
};