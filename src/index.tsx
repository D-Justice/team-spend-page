import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import 'antd/dist/antd.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Router from "./router";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { config } from "./services/config";

const msalInstance = new PublicClientApplication(config.sso.AUTH);

async function setupMsal() {
    await msalInstance.initialize();
}
const App = () => {
  setupMsal();
  return (
  <MsalProvider instance={msalInstance}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
  </MsalProvider>
)};

ReactDOM.render(<App />, document.getElementById("root"));
