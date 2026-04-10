import { createRoot } from "react-dom/client";
import TailwindCSS from "./TailwindCSS";
import "./tailwind.css";
import UserForm from "./UserForm";
import HitungGajiForm from "./HitungGajiForm";

createRoot(document.getElementById("root"))
    .render(
        <div>
            {/* alt + shift + panah bawah untuk copas cepat*/}
            {/* tailwind utility base, beda dengan boostrap */}
            {/* <TailwindCSS/> */}
            {/* <UserForm/> */}
            <HitungGajiForm/>
        </div>
    )