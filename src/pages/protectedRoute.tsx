import { Navigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { msalInstance } from "../services/msal";
import { config } from "../services/config";
import apiClient from "../apiClient";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { accounts, inProgress } = useMsal();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAndRedirect = async () => {
      if (inProgress !== InteractionStatus.None) return;

      try {
        await msalInstance.acquireTokenSilent({
          scopes: [config.scopes.USER],
        });
        setIsAuthorized(true);
      } catch {
        try {
          const resp = await apiClient.get(`/auth/oauth`);
          window.location.href = resp.data;
        } catch (err) {
          console.error("Failed to get OAuth link", err);
          setIsAuthorized(false);
        }
      }
    };

    checkAndRedirect();
  }, [inProgress]);

  if (inProgress !== InteractionStatus.None || isAuthorized === null) {
    return <div>Loading...</div>;
  }

  if (accounts.length === 0 || isAuthorized === false) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
