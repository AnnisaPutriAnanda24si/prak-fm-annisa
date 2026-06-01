import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout(){
    return(
            <div id="app-container" className="bg-gray-100 min-h-screen flex">
      <Sidebar />

      <div id="main-content" className="flex-1 flex flex-col">
        
        <Header />

        <main className="flex-1 min-h-screen bg-gray-50 p-4 md:p-8">
            <Outlet/>
        </main>
        
      </div>
    </div>
    )
}