import React, { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import {
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineHomeModern,
  HiOutlineCreditCard,
  HiOutlineLockClosed,
  HiOutlineEnvelope
} from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';
import AuthenticationManagement from '../../../../hooks/authentication/authenticationManagement';

export default function BranchAdminBar() {
  const [resizeSidebar, setResizeSidebar] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { handleLogout, logoutLoading } = AuthenticationManagement();

  const handleClick = () => {
    setResizeSidebar(prev => !prev);
  };

  // ✅ FIX: control text visibility for BOTH mobile + desktop
  const showText = resizeSidebar || mobileOpen;

  return (
    <>

      {/* MOBILE TOGGLE BUTTON */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed bottom-5 right-5 z-50 bg-green-600 text-white px-4 py-3 rounded-full shadow-lg"
      >
        ☰
      </button>

      {/* OVERLAY */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          fixed z-50 bg-white opacity-95 rounded-xl flex flex-col mt-0 md:mt-10
          shadow-xl transition-all duration-300 ease-in-out

          md:h-auto md:left-5 md:top-10
          ${resizeSidebar ? 'md:w-64' : 'md:w-20'}

          w-64 h-full top-0 left-0
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >

        {/* HEADER */}
        <div className="flex flex-row gap-2 w-full py-4 px-4 items-center bg-transparent">

          <h4 className="bg-green-600 text-xs font-black px-2 py-2 rounded-lg text-white">
            AM
          </h4>

          {showText && (
            <div className="flex flex-col flex-1">
              <p className="text-black text-sm font-black tracking-tighter font-oswald">
                Marawi City
              </p>
              <p className="text-gray-500 text-xs font-bold tracking-tighter font-oswald -mt-1">
                BRANCH
              </p>
            </div>
          )}

          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden ml-auto text-black text-lg"
          >
            ✕
          </button>

          <div
            onClick={handleClick}
            className="hidden md:flex bg-green-600 p-1 rounded-full cursor-pointer -mr-6 shadow-xl"
          >
            <FaChevronRight
              className={`text-white transition-transform duration-300 transform ${
                resizeSidebar ? 'rotate-180' : ''
              }`}
              size={10}
            />
          </div>

        </div>

        {/* NAV */}
        <nav className="flex flex-col gap-2 px-4 py-6 md:py-10">

          <NavLink
            to="/services/RentalServices/branchAdmin/branchAdminDashboardView/branchAdminDashboardPage"
            className={({ isActive }) =>
              `flex items-center gap-4 text-sm font-oswald hover:bg-green-500 rounded-md p-2 text-black ${
                isActive ? 'font-extrabold' : ''
              }`
            }
          >
            <HiOutlineHome className="text-xl" />
            {showText && 'Dashboard'}
          </NavLink>

          <NavLink
            to="/services/RentalServices/branchAdmin/branchAdminTenantView/tenantViewpage"
            className={({ isActive }) =>
              `flex items-center gap-4 text-sm font-oswald hover:bg-green-500 rounded-md p-2 text-black ${
                isActive ? 'font-extrabold' : ''
              }`
            }
          >
            <HiOutlineUsers className="text-xl" />
            {showText && 'Tenants'}
          </NavLink>

          <NavLink
            to="/services/RentalServices/branchAdmin/branchAdminRoomView/branchAdminRoomViewPage"
            className={({ isActive }) =>
              `flex items-center gap-4 text-sm font-oswald hover:bg-green-500 rounded-md p-2 text-black ${
                isActive ? 'font-extrabold' : ''
              }`
            }
          >
            <HiOutlineHomeModern className="text-xl" />
            {showText && 'Rooms'}
          </NavLink>

          <NavLink
            to="/services/RentalServices/branchAdmin/branchAdminMessagesView/branchAdminMessagePage"
            className={({ isActive }) =>
              `flex items-center gap-4 text-sm font-oswald hover:bg-green-500 rounded-md p-2 text-black ${
                isActive ? 'font-extrabold' : ''
              }`
            }
          >
            <HiOutlineEnvelope className="text-xl" />
            {showText && 'Messages'}
          </NavLink>

          <NavLink
            to="/services/RentalServices/branchAdmin/branchAdminBillingView/branchAdminBillingViewPage"
            className={({ isActive }) =>
              `flex items-center gap-4 text-sm font-oswald hover:bg-green-500 rounded-md p-2 text-black ${
                isActive ? 'font-extrabold' : ''
              }`
            }
          >
            <HiOutlineCreditCard className="text-xl" />
            {showText && 'Billing'}
          </NavLink>

          <NavLink
            onClick={handleLogout}
            disabled={logoutLoading}
            className="flex items-center text-black gap-4 text-sm font-oswald hover:bg-green-500 rounded-md p-2"
          >
            <HiOutlineLockClosed className="text-xl text-black" />
            {showText && 'Logout'}
          </NavLink>

        </nav>

      </div>
    </>
  );
}