import { useEffect, useState } from "react"
import PageHeader from "../components/PageHeader"
import { supabase } from "../services/supabaseClient"
import AlertBox from '@/components/AlertBox'
import LoadingSpinner from '@/components/LoadingSpinner'

const tierColors = {
    Gold: "text-yellow-600 bg-yellow-50 border border-yellow-200",
    Silver: "text-gray-500 bg-gray-50 border border-gray-200",
    Bronze: "text-orange-600 bg-orange-50 border border-orange-200",
}

export default function Customers() {
    const [customers, setCustomers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const fetchCustomers = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .order("created_at", { ascending: false })

            if (error) throw error
            setCustomers(data || [])
        } catch (err) {
            setError("Gagal memuat data pelanggan: " + err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchCustomers() }, [])

    const getTierClass = (level) => tierColors[level] || "text-gray-600 bg-gray-50"

    if (loading) return <LoadingSpinner text="Memuat pelanggan..." />

    return (
        <div id="customer-container">
            <PageHeader title="Customers" breadcrumb="Dashboard / Customers" />
            {error && <AlertBox type="error">{error}</AlertBox>}

            <div className="bg-white rounded-[30px] p-6 shadow-sm overflow-x-auto mt-4">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-gray-400 uppercase text-sm border-b">
                            <th className="pb-4 font-semibold">Name</th>
                            <th className="pb-4 font-semibold">Role</th>
                            <th className="pb-4 font-semibold">Tier</th>
                            <th className="pb-4 font-semibold">Points</th>
                            <th className="pb-4 font-semibold">Join Date</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {customers.length > 0 ? (
                            customers.map((customer) => (
                                <tr key={customer.id} className="border-b last:border-none hover:bg-gray-50 transition-colors">
                                    <td className="py-4 font-bold text-gray-800">{customer.full_name || "Unknown"}</td>
                                    <td className="py-4">
                                        <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-600">
                                            {customer.role}
                                        </span>
                                    </td>
                                    <td className="py-4">
                                        <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${getTierClass(customer.tier)}`}>
                                            {customer.tier}
                                        </span>
                                    </td>
                                    <td className="py-4 font-semibold">{customer.total_points} pts</td>
                                    <td className="py-4 text-gray-500">{new Date(customer.created_at).toLocaleDateString('id-ID')}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-20 text-center text-gray-400">Belum ada pelanggan.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}