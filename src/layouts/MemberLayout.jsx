import { Outlet, Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { MdDashboard, MdList, MdLogout, MdStore } from "react-icons/md"

export default function MemberLayout() {
    const { profile, signOut } = useAuth()
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
        <div className="min-h-screen bg-gray-50">
            {/* Simple Navbar */}
            <nav className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <Link to="/" className="flex items-center space-x-2">
                            <span className="font-poppins text-2xl text-gray-900 font-bold">
                                Sedap<span className="text-hijau">.</span>
                            </span>
                        </Link>

                        {/* Nav Links */}
                        <div className="flex items-center space-x-6">
                            <Link to="/" className="flex items-center space-x-1 text-gray-600 hover:text-hijau transition-colors font-medium">
                                <MdStore className="text-lg" />
                                <span>Belanja</span>
                            </Link>
                            <Link to="/member/orders" className="flex items-center space-x-1 text-gray-600 hover:text-hijau transition-colors font-medium">
                                <MdList className="text-lg" />
                                <span>Pesanan Saya</span>
                            </Link>
                        </div>

                        {/* Profile & Logout */}
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <p className="text-sm font-semibold text-gray-800">{profile?.full_name || "Member"}</p>
                                <p className="text-xs text-gray-400">
                                    <span className="text-hijau font-bold">{profile?.tier}</span> · {profile?.total_points} pts
                                </p>
                            </div>
                            <img
                                src={`https://avatar.iran.liara.run/public/${Math.floor(Math.random() * 100)}`}
                                className="w-9 h-9 rounded-full"
                                alt="avatar"
                            />
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-1 text-gray-400 hover:text-red-500 transition-colors"
                                title="Logout"
                            >
                                <MdLogout className="text-xl" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Outlet />
            </main>
        </div>
    )
}
