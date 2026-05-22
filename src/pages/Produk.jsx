import React, { useState } from 'react';
import productData from '../data/products.json';
import { Link } from 'react-router';

export default function Produk() {
    const [products] = useState(productData);
    const [searchTerm, setSearchTerm] = useState("");

    // Fungsi Filter Pencarian
    const filteredProducts = products.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Fungsi Format Rupiah
    const formatRupiah = (angka) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(angka);
    };

    // Hitung Stok Rendah (Contoh < 10)
    const lowStockCount = products.filter(p => p.stock < 10).length;

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="">

                {/* HEADER SECTION */}
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

                {/* SEARCH & ACTION BAR */}
                <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Cari nama atau kode produk..."
                            className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium transition-all shadow-lg shadow-blue-200">
                        + Tambah Produk
                    </button>
                </div>

                {/* TABLE SECTION */}
                <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-400 text-xs uppercase tracking-wider font-bold">
                                    <th className="px-6 py-4">Produk</th>
                                    <th className="px-6 py-4">Kode</th>
                                    <th className="px-6 py-4">Kategori</th>
                                    <th className="px-6 py-4">Brand</th>
                                    <th className="px-6 py-4">Harga</th>
                                    <th className="px-6 py-4 text-center">Stok</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((item) => (
                                        <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                                    <Link to={`/products/${item.id}`} className="text-emerald-400 hover:text-emerald-500">
                                                        {item.title}
                                                    </Link>
                                                </p>
                                                <p className="text-xs text-gray-400">ID: #{item.id}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-mono text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                                    {item.code}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-600">
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-500">{item.brand}</td>
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-gray-900">{formatRupiah(item.price)}</p>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold shadow-sm ${item.stock < 10
                                                        ? 'bg-red-50 text-red-600 border border-red-100'
                                                        : 'bg-green-50 text-green-600 border border-green-100'
                                                    }`}>
                                                    <span className={`w-2 h-2 rounded-full mr-2 ${item.stock < 10 ? 'bg-red-500' : 'bg-green-500'}`}></span>
                                                    {item.stock} <span className="ml-1 font-normal">Pcs</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center">
                                                <p className="text-gray-400 mt-2 font-medium">Produk tidak ditemukan...</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* FOOTER TABLE */}
                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                        <p>Menampilkan <span className="font-bold text-gray-700">{filteredProducts.length}</span> dari {products.length} data</p>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50">Prev</button>
                            <button className="px-3 py-1 border border-gray-300 rounded bg-white hover:bg-gray-50">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}