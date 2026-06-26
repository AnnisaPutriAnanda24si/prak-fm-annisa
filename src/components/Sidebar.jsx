import { AiFillBulb } from "react-icons/ai"
import { MdDashboard, MdLabel, MdList, MdPeople, MdError, MdPersonOff, MdLock, MdLogout } from "react-icons/md"
import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

const menuClass = ({ isActive }) =>
    `flex cursor-pointer items-center rounded-xl p-4 space-x-2
        ${isActive ?
            "text-hijau bg-green-200 font-extrabold" :
            "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
        }`

export default function Sidebar() {
    const { profile, isAdmin, signOut } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await signOut()
            navigate("/login")
        } catch (err) {
            console.error("Logout failed:", err)
        }
    }

    return (
        <div id="sidebar" className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg">
            {/* Logo */}
            <div id="sidebar-logo" className="flex flex-col">
                <span id="logo-title" className="font-poppins text-[48px] text-gray-900">
                    Sedap <b id="logo-dot" className="text-hijau">.</b>
                </span>
                <span id="logo-subtitle" className="font-semibold text-gray-400 font-barlow">Admin Dashboard</span>
                {profile && (
                    <span className="mt-2 text-xs text-gray-500 font-medium">
                        Role: <span className="font-bold uppercase text-hijau">{profile.role}</span>
                    </span>
                )}
            </div>

            {/* List Menu */}
            <div id="sidebar-menu" className="mt-10">
                <ul id="menu-list" className="space-y-3">
                    <li>
                        <NavLink id="menu-1" to="/admin" className={menuClass}>
                            <MdDashboard className="mr-4 text-xl" />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink id="menu-2" to="/admin/orders" className={menuClass}>
                            <MdList className="mr-4 text-xl" />
                            <span>Orders</span>
                        </NavLink>
                    </li>

                    {isAdmin && (
                        <li>
                            <NavLink id="menu-3" to="/admin/customers" className={menuClass}>
                                <MdPeople className="mr-4 text-xl" />
                                <span>Customers</span>
                            </NavLink>
                        </li>
                    )}

                    <li>
                        <NavLink id="menu-products" to="/admin/products" className={menuClass}>
                            <MdLabel className="mr-4 text-xl" />
                            <span>Product</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink id="menu-fitur" to="/admin/fitur-xyz" className={menuClass}>
                            <AiFillBulb className="mr-4 text-xl" />
                            <span>Fitur XYZ</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink id="menu-note" to="/admin/note" className={menuClass}>
                            <AiFillBulb className="mr-4 text-xl" />
                            <span>Note</span>
                        </NavLink>
                    </li>

                    {/* Error Pages */}
                    {isAdmin && (
                        <>
                            <hr className="my-4 border-gray-100" />
                            <li>
                                <NavLink id="menu-error-400" to="/admin/error-400" className={menuClass}>
                                    <MdError className="mr-4 text-xl text-orange-500" />
                                    <span>Bad Request (400)</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink id="menu-error-401" to="/admin/error-401" className={menuClass}>
                                    <MdPersonOff className="mr-4 text-xl text-red-400" />
                                    <span>Unauthorized (401)</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink id="menu-error-403" to="/admin/error-403" className={menuClass}>
                                    <MdLock className="mr-4 text-xl text-red-600" />
                                    <span>Forbidden (403)</span>
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* Logout */}
                    <hr className="my-4 border-gray-100" />
                    <li>
                        <button
                            onClick={handleLogout}
                            className="flex w-full cursor-pointer items-center rounded-xl p-4 space-x-2 text-gray-600 hover:text-red-500 hover:bg-red-50 hover:font-extrabold transition-all"
                        >
                            <MdLogout className="mr-4 text-xl" />
                            <span>Logout</span>
                        </button>
                    </li>
                </ul>
            </div>

            {/* Footer */}
            <div id="sidebar-footer" className="mt-auto">
                {profile && (
                    <div className="bg-hijau px-4 py-2 rounded-md shadow-lg mb-10 flex items-center">
                        <div className="text-white text-sm">
                            <span>Welcome, <b>{profile.full_name || "User"}</b></span>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{profile.tier}</span>
                                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{profile.total_points} pts</span>
                            </div>
                        </div>
                        <img
                            src={`https://avatar.iran.liara.run/public/${Math.floor(Math.random() * 100)}`}
                            className="w-16 rounded-full ml-2"
                            alt="avatar"
                        />
                    </div>
                )}
                <span id="footer-brand" className="font-bold text-gray-400">Sedap Admin Dashboard</span>
                <p id="footer-copyright" className="font-light text-gray-400">&copy; 2025 All Right Reserved</p>
            </div>
        </div>
    )
}
