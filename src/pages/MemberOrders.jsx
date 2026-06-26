import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"
import { useAuth } from "../contexts/AuthContext"
import LoadingSpinner from '@/components/LoadingSpinner'
import AlertBox from '@/components/AlertBox'
import { FaShoppingBag, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const statusIcons = {
    pending: <FaClock className="text-yellow-500" />,
    processing: <FaClock className="text-blue-500" />,
    completed: <FaCheckCircle className="text-green-500" />,
    cancelled: <FaTimesCircle className="text-red-500" />,
}

const statusColors = {
    pending: "bg-yellow-100 text-yellow-700",
    processing: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
}

export default function MemberOrders() {
    const { profile } = useAuth()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        if (!profile?.id) {
            navigate("/login")
            return
        }

        const fetchOrders = async () => {
            try {
                setLoading(true)
                const { data, error } = await supabase
                    .from("orders")
                    .select("*, order_items(*, products(name))")
                    .eq("user_id", profile.id)
                    .order("created_at", { ascending: false })

                if (error) throw error
                setOrders(data || [])
            } catch (err) {
                setError("Gagal memuat pesanan: " + err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchOrders()
    }, [profile?.id])

    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka)
    }

    if (loading) return <LoadingSpinner text="Memuat pesanan..." />

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Pesanan Saya</h1>
                <p className="text-gray-500 text-sm mt-1">Riwayat pesanan Anda</p>
            </div>

            {error && <AlertBox type="error">{error}</AlertBox>}

            {orders.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    <FaShoppingBag className="text-6xl mx-auto mb-4" />
                    <p className="text-lg font-medium">Belum ada pesanan.</p>
                    <p className="text-sm mt-1">Mulai belanja untuk melihat pesanan Anda di sini.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[order.status] || "bg-gray-100"}`}>
                                        {order.status}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        {new Date(order.created_at).toLocaleDateString('id-ID', {
                                            day: 'numeric', month: 'long', year: 'numeric',
                                            hour: '2-digit', minute: '2-digit'
                                        })}
                                    </span>
                                </div>
                                <span className="font-bold text-gray-800">{formatRupiah(order.total_amount)}</span>
                            </div>

                            <div className="border-t border-gray-50 pt-3 space-y-2">
                                {order.order_items?.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">
                                            {item.products?.name || "Produk"} <span className="text-gray-400">x{item.quantity}</span>
                                        </span>
                                        <span className="font-medium text-gray-700">{formatRupiah(item.price_at_purchase * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>

                            {order.points_earned > 0 && (
                                <div className="mt-3 bg-yellow-50 text-yellow-700 text-xs px-3 py-2 rounded-lg font-medium">
                                    🎉 Dapat {order.points_earned} poin dari pesanan ini!
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
