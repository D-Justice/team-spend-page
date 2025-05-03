import { config } from "../services/config";
import axios from "axios";

export async function RequestOAuthLink(token: string) {
  const url = config.url.API_URL;
  await axios.get(`${url}/oauth`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
    .then(resp => {
      window.location.href = resp.data;
    });
};