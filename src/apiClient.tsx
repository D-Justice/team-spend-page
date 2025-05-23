import axios from "axios";
import { config } from "./services/config";
import { msalInstance } from "./services/msal";

const apiClient = axios.create({
  baseURL: config.url.API_URL,
});

apiClient.interceptors.request.use(async (configuration) => {
  const account = msalInstance.getActiveAccount();

  if (account) {
    try {
      const tokenResponse = await msalInstance.acquireTokenSilent({
        account,
        scopes: [config.scopes.TEAM_SPEND],
      });
      configuration.headers.Authorization = `Bearer ${tokenResponse.accessToken}`;
    } catch (err) {
      console.error("Token acquisition failed", err);
    }
  } else {
    console.warn("No active account found");
  }

  return configuration;
});

export default apiClient;
