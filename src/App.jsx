import "./assets/tailwind.css";
import React, { Suspense } from "react";
import { MdReport, MdNoAccounts, MdGppBad, MdHelpOutline } from "react-icons/md";
import { Routes, Route } from "react-router-dom";

const Sidebar = React.lazy(() => import("./components/Sidebar"))
// import Sidebar from "./components/Sidebar";
const Header = React.lazy(() => import("./components/Header"))
// import Header from "./components/Header";
const NotFound = React.lazy(() => import("./components/NotFound"))
// import NotFound from "./components/NotFound";
const OrdersTable = React.lazy(() => import("./components/OrdersTable"))
// import OrdersTable from "./components/OrdersTable";
const CustomersTable = React.lazy(() => import("./components/CustomersTable"))
// import CustomersTable from "./components/CustomersTable";
const ErrorPage = React.lazy(() => import("./components/ErrorPage"))
// import ErrorPage from "./components/ErrorPage";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayouts";
import Loading from "./components/Loading";

const Dashboard = React.lazy(() => import("./pages/Dashboard"))
// import Dashboard from "./pages/Dashboard";
const Orders = React.lazy(() => import("./pages/Orders"))
// import Orders from "./pages/Orders";
const Customers = React.lazy(() => import("./pages/Customers"))
// import Customers from "./pages/Customers";
const Login = React.lazy(() => import("./pages/Auth/Login"))
// import Login from "./pages/Auth/Login";
const Register = React.lazy(() => import("./pages/Auth/Register"))
// import Register from "./pages/Auth/Register";
const Forgot = React.lazy(() => import("./pages/Auth/Forgot"))
// import Forgot from "./pages/Auth/Forgot";


function App() {
  return (

    <Suspense fallback={<Loading/>}>
                <Routes>
            <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />

            <Route path="/error-400" element={
                <ErrorPage 
                    errorCode="400" 
                    errorTitle="Bad Request" 
                    description="Permintaan tidak dapat diproses karena kesalahan sintaks atau parameter."
                    errorIcon={<MdReport />} 
                />
            } />

            <Route path="/error-401" element={
                <ErrorPage 
                    errorCode="401" 
                    errorTitle="Unauthorized" 
                    description="Akses ditolak! Kamu harus login terlebih dahulu untuk melihat data ini."
                    errorIcon={<MdNoAccounts />} 
                />
            } />

            <Route path="/error-403" element={
                <ErrorPage 
                    errorCode="403" 
                    errorTitle="Forbidden" 
                    description="Kamu tidak memiliki izin (role) yang cukup untuk mengakses halaman admin ini."
                    errorIcon={<MdGppBad />} 
                />
            } />

            <Route path="*" element={
                <ErrorPage 
                    errorCode="404" 
                    errorTitle="Page Not Found" 
                    description="Halaman yang kamu cari tidak ditemukan atau sudah dipindahkan."
                    errorIcon={<MdHelpOutline />} 
                />
            } />
            
            </Route>
            

              <Route element={<AuthLayout/>}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register/>} />
                <Route path="/forgot" element={<Forgot/>} />
            </Route>
          </Routes>
    </Suspense>



  );
}

export default App;