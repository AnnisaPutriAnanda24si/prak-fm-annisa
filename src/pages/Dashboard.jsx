import { useEffect, useState } from "react"
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaStar, FaUser } from "react-icons/fa"
import PageHeader from "../components/PageHeader"
import RecentOrders from "../components/RecentOrders"
import { supabase } from "../services/supabaseClient"
import { useAuth } from "../contexts/AuthContext"
import LoadingSpinner from '@/components/LoadingSpinner'

export default function Dashboard() {
    const { isAdmin, profile } = useAuth()
    const [stats, setStats] = useState({ totalOrders: 0, completed: 0, cancelled: 0, revenue: 0 })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true)
                let query = supabase.from("orders").select("*")

                if (!isAdmin) {
                    query = query.eq("user_id", profile?.id)
                }

                const { data } = await query
                const orders = data || []

                setStats({
                    totalOrders: orders.length,
                    completed: orders.filter(o => o.status === "completed").length,
                    cancelled: orders.filter(o => o.status === "cancelled").length,
                    revenue: orders
                        .filter(o => o.status === "completed")
                        .reduce((sum, o) => sum + Number(o.total_amount), 0),
                })
            } catch (err) {
                console.error("Failed to fetch stats:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    if (loading) return <LoadingSpinner text="Memuat dashboard..." />

    return (
        <div id="dashboard-container">
            <PageHeader title="Dashboard" breadcrumb="Dashboard" />

            {/* Member Info Card */}
            {!isAdmin && profile && (
                <div className="bg-gradient-to-r from-hijau to-emerald-400 rounded-xl p-6 text-white mb-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold">Welcome, {profile.full_name || "Member"}!</h3>
                            <div className="flex items-center gap-4 mt-3">
                                <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
                                    <FaStar className="text-yellow-300" />
                                    <span className="font-bold">{profile.tier}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full">
                                    <FaUser />
                                    <span className="font-bold">{profile.total_points} Points</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm opacity-80">Role</p>
                            <p className="font-bold uppercase">{profile.role}</p>
                        </div>
                    </div>
                </div>
            )}

            <div id="dashboard-grid" className="pt-4 pb-4 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                    <div className="bg-hijau rounded-full p-4 text-3xl text-white">
                        <FaShoppingCart />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">{stats.totalOrders}</span>
                        <span className="text-gray-400">Total Orders</span>
                    </div>
                </div>

                <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                    <div className="bg-biru rounded-full p-4 text-3xl text-white">
                        <FaTruck />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">{stats.completed}</span>
                        <span className="text-gray-400">Completed</span>
                    </div>
                </div>

                <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                    <div className="bg-merah rounded-full p-4 text-3xl text-white">
                        <FaBan />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">{stats.cancelled}</span>
                        <span className="text-gray-400">Canceled</span>
                    </div>
                </div>

                <div className="flex items-center space-x-5 bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
                    <div className="bg-kuning rounded-full p-4 text-3xl text-white">
                        <FaDollarSign />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">Rp. {stats.revenue.toLocaleString('id-ID')}</span>
                        <span className="text-gray-400">Revenue</span>
                    </div>
                </div>
            </div>

            <div className="px-5 pb-10">
                <RecentOrders />
            </div>
        </div>
    )
}