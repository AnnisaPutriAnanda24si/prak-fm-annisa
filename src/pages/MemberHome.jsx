import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"
import { useAuth } from "../contexts/AuthContext"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import AlertBox from '@/components/AlertBox'
import LoadingSpinner from '@/components/LoadingSpinner'
import { FaShoppingCart, FaStar, FaStore } from "react-icons/fa"

export default function MemberHome() {
    const { profile } = useAuth()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    // Checkout state
    const [cart, setCart] = useState(null) // { product, quantity }
    const [checkoutLoading, setCheckoutLoading] = useState(false)
    const [showCheckout, setShowCheckout] = useState(false)

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from("products")
                .select("*")
                .order("created_at", { ascending: false })

            if (error) throw error
            setProducts(data || [])
        } catch (err) {
            setError("Gagal memuat produk: " + err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchProducts() }, [])

    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency', currency: 'IDR', minimumFractionDigits: 0
        }).format(angka)
    }

    const openCheckout = (product) => {
        setCart({ product, quantity: 1 })
        setShowCheckout(true)
        setError("")
        setSuccess("")
    }

    const handleCheckout = async () => {
        if (!cart) return
        setCheckoutLoading(true)
        setError("")
        setSuccess("")

        try {
            const totalAmount = cart.product.price * cart.quantity

            // 1. Insert order
            const { data: order, error: orderError } = await supabase
                .from("orders")
                .insert({
                    user_id: profile.id,
                    total_amount: totalAmount,
                    status: "pending",
                })
                .select()
                .single()

            if (orderError) throw orderError

            // 2. Insert order item
            const { error: itemError } = await supabase
                .from("order_items")
                .insert({
                    order_id: order.id,
                    product_id: cart.product.id,
                    quantity: cart.quantity,
                    price_at_purchase: cart.product.price,
                })

            if (itemError) throw itemError

            // 3. Reduce stock
            const { error: stockError } = await supabase
                .from("products")
                .update({ stock: cart.product.stock - cart.quantity })
                .eq("id", cart.product.id)

            if (stockError) throw stockError

            setSuccess(`Pesanan berhasil dibuat! ${cart.product.name} x${cart.quantity} = ${formatRupiah(totalAmount)}`)
            setShowCheckout(false)
            setCart(null)
            fetchProducts() // refresh stock
        } catch (err) {
            setError("Gagal memproses pesanan: " + err.message)
        } finally {
            setCheckoutLoading(false)
        }
    }

    if (loading) return <LoadingSpinner text="Memuat produk..." />

    return (
        <div>
            {/* Member Greeting */}
            <div className="bg-gradient-to-r from-hijau to-emerald-400 rounded-2xl p-6 text-white mb-8 shadow-lg">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Halo, {profile?.full_name || "Member"}! 👋</h1>
                        <p className="mt-1 opacity-90">Selamat berbelanja! Dapatkan poin dari setiap pembelian.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 px-4 py-2 rounded-xl text-center">
                            <FaStar className="inline text-yellow-300 mr-1" />
                            <span className="font-bold">{profile?.tier}</span>
                        </div>
                        <div className="bg-white/20 px-4 py-2 rounded-xl text-center">
                            <span className="font-bold">{profile?.total_points}</span> pts
                        </div>
                    </div>
                </div>
            </div>

            {error && <AlertBox type="error">{error}</AlertBox>}
            {success && <AlertBox type="success">{success}</AlertBox>}

            {/* Product Grid */}
            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 h-40 flex items-center justify-center">
                                <FaStore className="text-5xl text-gray-300 group-hover:text-hijau transition-colors" />
                            </div>
                            <CardContent className="p-4">
                                <h3 className="font-bold text-gray-800 text-base mb-1 truncate">{product.name}</h3>
                                {product.description && (
                                    <p className="text-xs text-gray-500 mb-3 line-clamp-2">{product.description}</p>
                                )}
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-lg font-bold text-gray-900">{formatRupiah(product.price)}</span>
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${product.stock < 10 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                        {product.stock < 10 ? `Stok ${product.stock}` : 'Tersedia'}
                                    </span>
                                </div>
                                <Button
                                    onClick={() => openCheckout(product)}
                                    disabled={product.stock < 1}
                                    className="w-full bg-hijau hover:bg-hijau/90 text-white"
                                >
                                    <FaShoppingCart className="mr-2" />
                                    {product.stock < 1 ? 'Habis' : 'Beli'}
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 text-gray-400">
                    <FaStore className="text-6xl mx-auto mb-4" />
                    <p className="text-lg font-medium">Belum ada produk tersedia.</p>
                </div>
            )}

            {/* Checkout Modal */}
            {showCheckout && cart && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/30 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Konfirmasi Pesanan</h3>
                            <button onClick={() => setShowCheckout(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                        </div>

                        <div className="space-y-3">
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="font-semibold text-gray-800">{cart.product.name}</p>
                                <p className="text-sm text-gray-500">{formatRupiah(cart.product.price)} / pcs</p>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-gray-700">Jumlah</label>
                                <div className="flex items-center space-x-3">
                                    <button
                                        onClick={() => setCart(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
                                        className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="w-8 text-center font-bold text-lg">{cart.quantity}</span>
                                    <button
                                        onClick={() => setCart(prev => ({
                                            ...prev,
                                            quantity: Math.min(cart.product.stock, prev.quantity + 1)
                                        }))}
                                        className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="border-t pt-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Total</span>
                                    <span className="text-xl font-bold text-gray-900">
                                        {formatRupiah(cart.product.price * cart.quantity)}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">
                                    Dapatkan {(cart.product.price * cart.quantity) >= 10000 ? Math.floor((cart.product.price * cart.quantity) / 10000) : 0} poin!
                                </p>
                            </div>

                            <div className="flex space-x-3 mt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowCheckout(false)}
                                    className="flex-1"
                                >
                                    Batal
                                </Button>
                                <Button
                                    onClick={handleCheckout}
                                    disabled={checkoutLoading}
                                    className="flex-1 bg-hijau hover:bg-hijau/90 text-white"
                                >
                                    {checkoutLoading ? "Memproses..." : "Pesan Sekarang"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
