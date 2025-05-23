import axios from "axios"
import { CallData } from "../interfaces/callData";
export const RetrieveCallData = async (tenantId: string): Promise<CallData> => {
    try {
        const response = await axios.get(`/callrecords/records/${tenantId}`);
        return response.data;
    } catch (err) {
        console.error("Error fetching call data:", err);
        throw err;
    }
};
