import { createRoot } from "react-dom/client";
import HelloWorld from "./HelloWorld";
import Container from "./Container";
import './custom.css';

createRoot(document.getElementById("root"))
    .render(
        <div>
            <Container>            
                <HelloWorld/>
            </Container>
            {/* alt + shift + panah bawah untuk copas cepat*/}

        </div>
    )

