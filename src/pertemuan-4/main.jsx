import { createRoot } from "react-dom/client";
import "./tailwind.css";
import FrameworkList from "./FrameworkList";
import ResponsiveText from "./ResponsiveDesign";
import FrameworkListSearchFilter  from "./FrameworkListSearchFilter ";

createRoot(document.getElementById("root"))
    .render(
        <div>
            <ResponsiveText/>
            <FrameworkListSearchFilter/>
            {/* <FrameworkList/> */}
            
        </div>
    )