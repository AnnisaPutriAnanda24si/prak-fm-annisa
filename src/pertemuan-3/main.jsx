import { createRoot } from "react-dom/client";
import TailwindCSS from "./TailwindCSS";
import "./tailwind.css";

createRoot(document.getElementById("root"))
    .render(
        <div>
            {/* alt + shift + panah bawah untuk copas cepat*/}
            {/* tailwind utility base, beda dengan boostrap */}
            <TailwindCSS/>
        </div>
    )