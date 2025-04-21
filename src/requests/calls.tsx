import axios from "axios"
import { config } from "../services/config"
import { refreshUserToken } from "../services/firebase";
import { CallData } from "../interfaces/callData";
export const retrieveCallData = async (): Promise<CallData> => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${await refreshUserToken()}`;
    return await axios.get(`${config.url.API_URL}/CallRecords/records/2f08c12d-e83b-4a07-93e1-014bb90e70ee`)
        .then(resp => {
            return resp.data
        })
        .catch(err => console.log(err))
}