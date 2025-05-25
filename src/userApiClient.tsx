import axios from "axios";
import { config } from "./services/config";
import { msalInstance } from "./services/msal";

const userApiClient = axios.create({
  baseURL: config.url.API_URL,
});

userApiClient.interceptors.request.use(async (configuration) => {
  const account = msalInstance.getActiveAccount();

  if (account) {
    try {
      const tokenResponse = await msalInstance.acquireTokenSilent({
        account,
        scopes: [config.scopes.USER],
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

export default userApiClient;