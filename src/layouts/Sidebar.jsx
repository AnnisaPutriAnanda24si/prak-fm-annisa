import { MdDashboard, MdDetails, MdLabel, MdList, MdPeople, MdError, MdPersonOff, MdLock, MdNoAccounts } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";

const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4  space-x-2
        ${isActive ?
        "text-hijau bg-green-200 font-extrabold" :
        "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
    }`

export default function Sidebar() {
    return (
        <div id="sidebar" className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg">
            {/* Logo */}
            <div id="sidebar-logo" className="flex flex-col">
                <span id="logo-title" className="font-poppins text-[48px] text-gray-900">
                    Sedap <b id="logo-dot" className="text-hijau">.</b>
                </span>
                <span id="logo-subtitle" className="font-semibold text-gray-400 font-barlow">Modern Admin Dashboard</span>
            </div>

            {/* List Menu */}
            <div id="sidebar-menu" className="mt-10">
                <ul id="menu-list" className="space-y-3">
                    {/* ... Menu Dashboard, Orders, Customers tetap ada ... */}
                    <li>
                        <NavLink id="menu-1" to="/" className={menuClass}>
                            <MdDashboard className="mr-4 text-xl" />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink id="menu-2" to="/orders" className={menuClass}>
                            <MdList className="mr-4 text-xl" />
                            <span>Orders</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink id="menu-3" to="/customers" className={menuClass}>
                            <MdPeople className="mr-4 text-xl" />
                            <span>Customers</span>
                        </NavLink>
                    </li>

                    {/* MENU ERROR BARU */}
                    <hr className="my-4 border-gray-100" /> {/* Garis pembatas biar rapi */}

                    <li>
                        <NavLink id="menu-4" to="/error-400" className={menuClass}>
                            <MdError className="mr-4 text-xl text-orange-500" />
                            <span>Bad Request (400)</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink id="menu-5" to="/error-401" className={menuClass}>
                            <MdPersonOff className="mr-4 text-xl text-red-400" />
                            <span>Unauthorized (401)</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink id="menu-6" to="/error-403" className={menuClass}>
                            <MdLock className="mr-4 text-xl text-red-600" />
                            <span>Forbidden (403)</span>
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Footer */}
            <div id="sidebar-footer" className="mt-auto">
                <div id="footer-card" className="bg-hijau px-4 py-2 rounded-md shadow-lg mb-10 flex items-center">
                    <div id="footer-text" className="text-white text-sm">
                        <span>Please organize your menus through button below!</span>
                        <div id="add-menu-button" className="flex justify-center items-center p-2 mt-3 bg-white rounded-md space-x-2">
                            <span className="text-gray-600 flex items-center">+ Add Menus</span>
                        </div>
                    </div>
                    <img id="footer-avatar" src="https://avatar.iran.liara.run/public/28" className="w-20 rounded-full" />
                </div>
                <span id="footer-brand" className="font-bold text-gray-400">Sedap Restaurant Admin Dashboard</span>
                <p id="footer-copyright" className="font-light text-gray-400">&copy; 2025 All Right Reserved</p>
            </div>
        </div>
    );
}
