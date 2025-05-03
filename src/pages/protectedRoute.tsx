import { Navigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { instance, accounts, inProgress } = useMsal();
    if (inProgress != InteractionStatus.None) {
      return <div>Loading...</div>;
    }
  
    if (accounts.length == 0) {
      return <Navigate to="/login" />;
    }
  
    return children;
  };
  
  export default ProtectedRoute;
