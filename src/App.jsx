import "./assets/tailwind.css"
import React, { Suspense } from "react"
import { MdReport, MdNoAccounts, MdGppBad, MdHelpOutline } from "react-icons/md"
import { Routes, Route } from "react-router-dom"

import { AuthProvider } from "./contexts/AuthContext"
import MainLayout from "./layouts/MainLayout"
import AuthLayout from "./layouts/AuthLayouts"
import Loading from "./components/Loading"
import ProtectedRoute from "./components/ProtectedRoute"

const Dashboard = React.lazy(() => import("./pages/Dashboard"))
const Orders = React.lazy(() => import("./pages/Orders"))
const Customers = React.lazy(() => import("./pages/Customers"))
const Produk = React.lazy(() => import("./pages/Produk"))
const Login = React.lazy(() => import("./pages/Auth/Login"))
const Register = React.lazy(() => import("./pages/Auth/Register"))
const Forgot = React.lazy(() => import("./pages/Auth/Forgot"))
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"))
const Components = React.lazy(() => import("./pages/Components"))
const FiturXYZ = React.lazy(() => import("./pages/FiturXYZ"))
const Note = React.lazy(() => import("./pages/Note"))
const ErrorPage = React.lazy(() => import("./components/ErrorPage"))
const MemberHome = React.lazy(() => import("./pages/MemberHome"))
const MemberOrders = React.lazy(() => import("./pages/MemberOrders"))
const MemberLayout = React.lazy(() => import("./layouts/MemberLayout"))


function App() {
    return (
        <AuthProvider>
            <Suspense fallback={<Loading />}>
                <Routes>
                    {/* Auth Routes (public - no sidebar) */}
                    <Route element={<AuthLayout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/forgot" element={<Forgot />} />
                    </Route>

                    {/* ADMIN Routes */}
                    <Route
                        element={
                            <ProtectedRoute requiredRole="Admin">
                                <MainLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route path="/admin" element={<Dashboard />} />
                        <Route path="/admin/orders" element={<Orders />} />
                        <Route path="/admin/customers" element={<Customers />} />
                        <Route path="/admin/products" element={<Produk />} />
                        <Route path="/admin/products/:id" element={<ProductDetail />} />
                        <Route path="/admin/components" element={<Components />} />
                        <Route path="/admin/fitur-xyz" element={<FiturXYZ />} />
                        <Route path="/admin/note" element={<Note />} />

                        <Route path="/admin/error-400" element={
                            <ErrorPage errorCode="400" errorTitle="Bad Request"
                                description="Permintaan tidak dapat diproses karena kesalahan sintaks atau parameter."
                                errorIcon={<MdReport />} />
                        } />
                        <Route path="/admin/error-401" element={
                            <ErrorPage errorCode="401" errorTitle="Unauthorized"
                                description="Akses ditolak! Kamu harus login terlebih dahulu untuk melihat data ini."
                                errorIcon={<MdNoAccounts />} />
                        } />
                        <Route path="/admin/error-403" element={
                            <ErrorPage errorCode="403" errorTitle="Forbidden"
                                description="Kamu tidak memiliki izin (role) yang cukup untuk mengakses halaman admin ini."
                                errorIcon={<MdGppBad />} />
                        } />
                        <Route path="/admin/*" element={
                            <ErrorPage errorCode="404" errorTitle="Page Not Found"
                                description="Halaman yang kamu cari tidak ditemukan atau sudah dipindahkan."
                                errorIcon={<MdHelpOutline />} />
                        } />
                    </Route>

                    {/* MEMBER Routes */}
                    <Route
                        element={
                            <ProtectedRoute requiredRole="Member">
                                <MemberLayout />
                            </ProtectedRoute>
                        }
                    >
                        <Route path="/" element={<MemberHome />} />
                        <Route path="/member/orders" element={<MemberOrders />} />
                    </Route>
                </Routes>
            </Suspense>
        </AuthProvider>
    )
}

export default App