import "./assets/tailwind.css";
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import NotFound from "./components/NotFound";
import OrdersTable from "./components/OrdersTable";
import CustomersTable from "./components/CustomersTable";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
// Ganti yang tadinya FaBomb dll jadi ini:
import { MdReport, MdNoAccounts, MdGppBad, MdHelpOutline } from "react-icons/md";

function App() {
  return (
    <div id="app-container" className="bg-gray-100 min-h-screen flex">
      {/* 1. Sidebar tetap di samping */}
      <Sidebar />

      {/* 2. Main content menggunakan flex-col tanpa padding di sini */}
      <div id="main-content" className="flex-1 flex flex-col">
        
        {/* 3. Header harus di luar div padding agar bisa full width ke samping */}
        <Header />

        {/* 4. Baru di bagian konten (Routes) kita biarkan Dashboard yang atur paddingnya */}
        <main className="flex-1">
          <Routes>
            
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

          </Routes>
        </main>
        
      </div>
    </div>
  );
}

export default App;