import axios from "axios"
import { config } from "../../services/config"
import { Button } from "antd";
import { useSearchParams } from "react-router-dom";
import Alert from '@mui/material/Alert';
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { refreshUserToken } from "../../services/firebase";
import { retrieveCallData } from "../../requests/calls";
import { CallData } from "../../interfaces/callData";
import CallDataTable from "../../components/Table";
export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [callData, setCallData] = useState<CallData>()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (searchParams.get("success") == "true") {
      setOpen(true)
    }
  }, [])
  const requestOAuthLink = async () => {
    var url = config.url.API_URL;

    axios.defaults.headers.common["Authorization"] = `Bearer ${await refreshUserToken()}`;

    await axios.get(`${url}/oauth`, { withCredentials: true })
      .then(resp => {
        window.location.href = resp.data
      })
  }
  const requestCallData = async () => {
    var response: CallData = await retrieveCallData()
    setCallData(response)
  }


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
      <h1>Under maintenance - coming soon!</h1>
      <Button onClick={requestOAuthLink}> Begin OAuth</Button>
      <Button onClick={requestCallData}>Retrieve Call Data</Button>
      <div style={{width: "60%", margin: "0 auto"}}>
        {callData && <CallDataTable data={callData} />}
      </div>
    </>
  )
}