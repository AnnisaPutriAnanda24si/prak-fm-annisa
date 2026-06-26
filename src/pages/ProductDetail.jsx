import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"
import LoadingSpinner from '@/components/LoadingSpinner'

export default function ProductDetail() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true)
                const { data, error } = await supabase
                    .from("products")
                    .select("*")
                    .eq("id", id)
                    .single()

                if (error) throw error
                setProduct(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct()
    }, [id])

    if (loading) return <div className="p-4"><LoadingSpinner text="Memuat produk..." /></div>
    if (error) return <div className="text-red-600 p-4">Error: {error}</div>
    if (!product) return <div className="p-4">Produk tidak ditemukan.</div>

    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka)
    }

    return (
        <div className="p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto mt-6">
            {product.image_url && (
                <img src={product.image_url} alt={product.name} className="rounded-xl mb-4 w-full h-48 object-cover" />
            )}
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            {product.description && <p className="text-gray-600 mb-2">{product.description}</p>}
            <p className="text-gray-800 font-semibold text-lg mb-1">Harga: {formatRupiah(product.price)}</p>
            <p className="text-gray-600 mb-1">Stok: {product.stock} Pcs</p>
            {product.category && <p className="text-gray-600">Kategori: {product.category}</p>}
        </div>
    )
}