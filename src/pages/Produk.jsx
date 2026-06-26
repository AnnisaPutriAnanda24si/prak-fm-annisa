import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { supabase } from "../services/supabaseClient"
import { useAuth } from "../contexts/AuthContext"
import AlertBox from '@/components/AlertBox'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function Produk() {
    const { isAdmin } = useAuth()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [formData, setFormData] = useState({ name: "", description: "", price: "", stock: "", image_url: "" })
    const [saving, setSaving] = useState(false)

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
            setError("Gagal memuat data produk: " + err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchProducts() }, [])

    const filteredProducts = products.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka)
    }

    const lowStockCount = products.filter(p => p.stock < 10).length

    const openAddModal = () => {
        setEditingProduct(null)
        setFormData({ name: "", description: "", price: "", stock: "", image_url: "" })
        setShowModal(true)
    }

    const openEditModal = (product) => {
        setEditingProduct(product)
        setFormData({
            name: product.name,
            description: product.description || "",
            price: product.price.toString(),
            stock: product.stock.toString(),
            image_url: product.image_url || "",
        })
        setShowModal(true)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSave = async (e) => {
        e.preventDefault()
        setSaving(true)
        setError("")
        try {
            const data = {
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock),
                image_url: formData.image_url || null,
            }
            if (editingProduct) {
                const { error } = await supabase.from("products").update(data).eq("id", editingProduct.id)
                if (error) throw error
            } else {
                const { error } = await supabase.from("products").insert(data)
                if (error) throw error
            }
            setShowModal(false)
            fetchProducts()
        } catch (err) {
            setError("Gagal menyimpan produk: " + err.message)
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id, name) => {
        if (!confirm(`Yakin ingin menghapus "${name}"?`)) return
        try {
            const { error } = await supabase.from("products").delete().eq("id", id)
            if (error) throw error
            fetchProducts()
        } catch (err) {
            setError("Gagal menghapus produk: " + err.message)
        }
    }

    if (loading) return <LoadingSpinner text="Memuat produk..." />

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div>
                {error && <AlertBox type="error">{error}</AlertBox>}

                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Inventory Produk</h1>
                        <p className="text-gray-500 mt-1">Kelola data barang dan pantau ketersediaan stok Anda.</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 text-center">
                            <p className="text-xs text-gray-400 uppercase font-bold">Total Produk</p>
                            <p className="text-xl font-bold text-blue-600">{products.length}</p>
                        </div>
                        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 text-center">
                            <p className="text-xs text-gray-400 uppercase font-bold">Stok Rendah</p>
                            <p className="text-xl font-bold text-red-500">{lowStockCount}</p>
                        </div>
                    </div>
                </div>

                <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </span>
                        <input type="text" placeholder="Cari nama produk..."
                            className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                            onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    {isAdmin && (
                        <button onClick={openAddModal}
                            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition-all shadow-lg shadow-blue-200">
                            + Tambah Produk
                        </button>
                    )}
                </div>

                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-400 text-xs uppercase tracking-wider font-bold">
                                    <th className="px-6 py-4">Produk</th>
                                    <th className="px-6 py-4">Harga</th>
                                    <th className="px-6 py-4 text-center">Stok</th>
                                    {isAdmin && <th className="px-6 py-4 text-center">Aksi</th>}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((item) => (
                                        <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-gray-800">
                                                    <Link to={`/products/${item.id}`} className="hover:text-blue-600">{item.name}</Link>
                                                </p>
                                                {item.description && <p className="text-xs text-gray-400 mt-1 truncate max-w-xs">{item.description}</p>}
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-gray-900">{formatRupiah(item.price)}</p>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold shadow-sm ${item.stock < 10 ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
                                                    <span className={`w-2 h-2 rounded-full mr-2 ${item.stock < 10 ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                                    {item.stock} <span className="ml-1 font-normal">Pcs</span>
                                                </div>
                                            </td>
                                            {isAdmin && (
                                                <td className="px-6 py-4 text-center">
                                                    <div className="flex gap-2 justify-center">
                                                        <button onClick={() => openEditModal(item)}
                                                            className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-200 transition-colors">Edit</button>
                                                        <button onClick={() => handleDelete(item.id, item.name)}
                                                            className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-xs font-bold hover:bg-red-200 transition-colors">Hapus</button>
                                                    </div>
                                                </td>
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={isAdmin ? 4 : 3} className="px-6 py-20 text-center">
                                            <p className="text-gray-400 font-medium">{searchTerm ? "Produk tidak ditemukan..." : "Belum ada produk."}</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/30 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-800">{editingProduct ? "Edit Produk" : "Tambah Produk"}</h3>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange}
                                    className="w-full border rounded-lg p-2 outline-none focus:border-hijau" placeholder="Nama produk" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                                <textarea name="description" value={formData.description} onChange={handleChange}
                                    className="w-full border rounded-lg p-2 outline-none focus:border-hijau" placeholder="Deskripsi produk" rows="2" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Harga (Rp)</label>
                                    <input type="number" name="price" value={formData.price} onChange={handleChange}
                                        className="w-full border rounded-lg p-2 outline-none focus:border-hijau" placeholder="100000" required min="0" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Stok</label>
                                    <input type="number" name="stock" value={formData.stock} onChange={handleChange}
                                        className="w-full border rounded-lg p-2 outline-none focus:border-hijau" placeholder="10" required min="0" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">URL Gambar (opsional)</label>
                                <input type="text" name="image_url" value={formData.image_url} onChange={handleChange}
                                    className="w-full border rounded-lg p-2 outline-none focus:border-hijau" placeholder="https://..." />
                            </div>
                            <div className="flex space-x-3 mt-6">
                                <button type="button" onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 font-medium">Cancel</button>
                                <button type="submit" disabled={saving}
                                    className="flex-1 px-4 py-2 bg-hijau text-white rounded-lg hover:opacity-90 font-medium shadow-lg shadow-hijau/30 disabled:opacity-50">
                                    {saving ? "Menyimpan..." : "Simpan"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}