import axios from "axios"
import { config } from "../../services/config"
import { Button } from "antd";

export default function Dashboard() {
    const requestOAuthLink = async () => {
        var url = config.url.API_URL;
        var token = localStorage.getItem("token");
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        await axios.get(`${url}/oauth`, { withCredentials: true })
        .then(resp => {
            window.location.href = resp.data
        })
    } 
    return(
        <>
        <h1>Under maintenance - coming soon!</h1>
        <Button onClick={requestOAuthLink}> Begin OAuth</Button>
        </>
    )
}