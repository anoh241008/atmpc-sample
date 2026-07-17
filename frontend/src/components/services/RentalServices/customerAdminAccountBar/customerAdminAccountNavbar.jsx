import React from 'react'
import { NavLink } from 'react-router-dom'
import { HiOutlineHome, HiOutlineUsers, HiOutlineHomeModern, HiOutlineCreditCard, HiOutlineEnvelope, HiOutlineLockClosed } from 'react-icons/hi2'
import AuthenticationManagement from '../../../../hooks/authentication/authenticationManagement';
export default function RentalServiceCustomerAdminAccountNavbar() {

    const { handleLogout, logoutLoading} = AuthenticationManagement();

    const navLinkClass = ({ isActive }) =>
        `flex items-center justify-center w-10 h-10 rounded-full transition duration-300 ${
            isActive
                ? "bg-green-700 text-white shadow-sm"
                : "text-gray-500 hover:bg-green-50 hover:text-green-700"
        }`;

    return (
        <div className="fixed top-0 left-0 w-full font-oswald z-50">
            <nav className="bg-white relative w-full flex justify-end items-center gap-1 sm:gap-2 px-5 py-3
            mx-auto max-w-3xl shadow-sm border border-gray-100 sm:rounded-none md:rounded-full">

                <h1 className="text-sm font-extrabold text-green-700 tracking-widest uppercase absolute left-5">
                    Dashboard
                </h1>

                <NavLink
                    className={navLinkClass}
                    to="/services/RentalServices/customerAdminAccount/customerAdminDashboardView/customerAdminMainDashboardpage"
                >
                    <HiOutlineHome className="text-xl cursor-pointer" />
                </NavLink>

                <NavLink
                    className={navLinkClass}
                    to="/services/RentalServices/customerAdminAccount/customerAdminAccountProfileView/customerAdminAccountProfilePage"
                >
                    <HiOutlineUsers className="text-xl cursor-pointer" />
                </NavLink>

                <NavLink
                    className={navLinkClass}
                    to="/services/RentalServices/customerAdminAccount/customerAdminAccountBillingView/customerAdminAccountBillingPage"
                >
                    <HiOutlineCreditCard className="text-xl cursor-pointer" />
                </NavLink>

                <NavLink
                    className={navLinkClass}
                    to="/services/RentalServices/customerAdminAccount/customerAdminAccountChattingView/customerAdminAccountChattingPage"
                >
                    <HiOutlineEnvelope className="text-xl cursor-pointer" />
                </NavLink>

                <button
                  onClick={handleLogout}
                    disabled={logoutLoading}
                    className="flex items-center justify-center w-10 h-10 rounded-full text-gray-500 hover:bg-red-50 hover:text-red-600 transition duration-300"
                >
                    <HiOutlineLockClosed className="text-xl cursor-pointer" />
                </button>

            </nav>
        </div>
    );
}