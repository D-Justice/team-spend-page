import axios from "axios"
import { config } from "../services/config"
import { CallData } from "../interfaces/callData";
export const RetrieveCallData = async (email: string, token: string): Promise<CallData> => {
    try {
        const response = await axios.get(`${config.url.API_URL}/CallRecords/records/${email}`,{
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

        return response.data;
    } catch (err) {
        console.error("Error fetching call data:", err);
        throw err;
    }
};