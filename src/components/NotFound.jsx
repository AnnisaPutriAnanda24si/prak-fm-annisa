import ErrorPage from "./ErrorPage";
import { FaPlug } from "react-icons/fa"; 

export default function NotFound() {
  return (
    <ErrorPage 
      errorCode="404"
      errorTitle="Page not found"
      description="A massa, interdum pretium, ut sit est nec. Convallis fames proin lacus cras."
      errorIcon={<FaPlug className="rotate-[15deg]" />} 
    />
  );
}