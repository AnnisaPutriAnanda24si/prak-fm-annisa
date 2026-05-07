import { createRoot } from "react-dom/client";
import "./assets/tailwind.css";
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import { Link } from "react-router-dom"
import { Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root"))
    .render(
        <div id="app-container" className="bg-gray-100 min-h-screen flex">
            <div id="layout-wrapper" className="flex flex-row flex-1">
                <Sidebar />
                <div id="main-content" className="flex-1 p-4">
                    <Header />
                    <Dashboard />


                </div>
            </div>
        </div>
    )