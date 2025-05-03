import { Button } from "antd";
import { useSearchParams } from "react-router-dom";
import Alert from '@mui/material/Alert';
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { CallData } from "../../interfaces/callData";
import CallDataTable from "../../components/Table";
import SubscriptionPage from "../../components/Subscription";
import axios from "axios";
import { config } from "../../services/config";
import { useMsal } from "@azure/msal-react";
import { AccountInfo, InteractionRequiredAuthError, InteractionStatus } from "@azure/msal-browser";
import { RetrieveCallData } from "../../requests/calls";
export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [callData, setCallData] = useState<CallData>()
  const [open, setOpen] = useState(false)
  const { instance, accounts, inProgress } = useMsal();
  const [user, setUser] = useState<AccountInfo | null>(null);

  useEffect(() => {
    if (searchParams.get("success") == "true") {
      setOpen(true)
    }
    if (searchParams.get("admin_consent") == "True") {
      requestOAuthLink()
    }
    if (inProgress === InteractionStatus.None && accounts.length > 0) {
      setUser(accounts[0]);
    }
  }, [accounts, inProgress])

  const requestCallData = async () => {
    var token = await requestToken(config.scopes.TEAM_SPEND)
    console.log(token)
    var response: CallData = await RetrieveCallData(accounts[0].tenantId, token!)
    setCallData(response)
  }
  const requestToken = async (scope: string): Promise<string | null> => {
    try {
      const response = await instance.acquireTokenSilent({
        scopes: [config.scopes.TEAM_SPEND],
        account: accounts[0],
      });
      console.log("Access Token:", response.accessToken);
    } catch (error) {
      console.warn("Silent token acquisition failed. Trying popup...");
      if (error instanceof InteractionRequiredAuthError) {
        try {
          const response = await instance.acquireTokenPopup({ scopes: [config.scopes.TEAM_SPEND] });
          console.log("Access Token (popup):", response.accessToken);
        } catch (popupError) {
          console.error("Popup token acquisition failed:", popupError);
    
    
            const adminConsentUrl = `https://login.microsoftonline.com/common/adminconsent?client_id=${config.sso.AUTH.auth.clientId}`;
            window.location.href = adminConsentUrl;
        }
      } else {
        console.error("Token error:", error);
      }
    }
    // try {
    //   await instance.acquireTokenPopup({
    //     scopes: [config.scopes.USER]
    //   });
    //   var token = await instance.acquireTokenSilent({
    //     scopes: [config.scopes.TEAM_SPEND]
    //   })
    //   console.log(token.accessToken)
    //   return token.accessToken
    // }
    // catch (error: any) {
    //   console.log(error)
    //   if (error.errorCode === "interaction_required" || error.errorCode === "consent_required" || error.errorCode === "invalid_grant") {
    //     const consentUrl = `https://login.microsoftonline.com/common/adminconsent?client_id=093e700b-9436-4ad0-9986-09e17c5d3174&redirect_uri=${config.sso.AUTH.auth.redirectUri}`;
    //     window.location.href = consentUrl;
    //   }
    // }
    

    return null;
  }

  const requestOAuthLink = async () => {
    var token = await requestToken(config.scopes.TEAM_SPEND)
    console.log(token)
    if (token != null) {
      axios.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
    const url = config.url.API_URL;
    await axios.get(`${url}/oauth`)
      .then(resp => {
        console.log(resp)
        window.location.href = resp.data;
      }).catch(err => console.log(err));
  };

  return (
    <>
      {open && <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
              window.location.href = "/dashboard"
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        style={{ width: "300px", margin: "0 auto" }}>App integration successful!</Alert>}
      {user && <p>Welcome, {user.name}</p>}
      <Button onClick={async () => await requestCallData()}>Retrieve Call Data</Button>
      <Button onClick={async () => await requestOAuthLink()}>Oauth</Button>
      <SubscriptionPage />
      <div style={{ width: "60%", margin: "0 auto" }}>
        {callData && <CallDataTable data={callData} />}
      </div>
    </>
  )
}