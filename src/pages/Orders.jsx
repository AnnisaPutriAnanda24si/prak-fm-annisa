import { useEffect, useState } from "react"
import PageHeader from "../components/PageHeader"
import { supabase } from "../services/supabaseClient"
import { useAuth } from "../contexts/AuthContext"
import AlertBox from '@/components/AlertBox'
import LoadingSpinner from '@/components/LoadingSpinner'

const statusColors = {
    pending: "bg-yellow-100 text-yellow-600",
    processing: "bg-blue-100 text-blue-600",
    completed: "bg-green-100 text-green-600",
    cancelled: "bg-red-100 text-red-600",
}

export default function Orders() {
    const { isAdmin, user } = useAuth()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const fetchOrders = async () => {
        try {
            setLoading(true)
            let query = supabase
                .from("orders")
                .select("*, profiles(full_name)")
                .order("created_at", { ascending: false })

            if (!isAdmin) {
                query = query.eq("user_id", user.id)
            }

            const { data, error } = await query
            if (error) throw error
            setOrders(data || [])
        } catch (err) {
            setError("Gagal memuat pesanan: " + err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchOrders() }, [])

    const getStatusClass = (status) => statusColors[status] || "bg-gray-100 text-gray-600"

    if (loading) return <LoadingSpinner text="Memuat pesanan..." />

    return (
        <div id="orders-container">
            <PageHeader title="Orders" breadcrumb="Dashboard / Orders" />
            {error && <AlertBox type="error">{error}</AlertBox>}

            <div className="bg-white rounded-[30px] p-6 shadow-sm overflow-x-auto mt-4">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-gray-400 uppercase text-sm border-b">
                            <th className="pb-4 font-semibold">Customer</th>
                            <th className="pb-4 font-semibold">Status</th>
                            <th className="pb-4 font-semibold">Total</th>
                            <th className="pb-4 font-semibold">Points</th>
                            <th className="pb-4 font-semibold">Date</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order.id} className="border-b last:border-none hover:bg-gray-50 transition-colors">
                                    <td className="py-4 font-bold">{order.profiles?.full_name || "Unknown"}</td>
                                    <td className="py-4">
                                        <span className={`px-4 py-1.5 rounded-xl text-xs font-bold ${getStatusClass(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-4 font-semibold">Rp. {Number(order.total_amount).toLocaleString('id-ID')}</td>
                                    <td className="py-4">{order.points_earned || 0} pts</td>
                                    <td className="py-4 text-gray-500">{new Date(order.created_at).toLocaleDateString('id-ID')}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-20 text-center text-gray-400">Belum ada pesanan.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}