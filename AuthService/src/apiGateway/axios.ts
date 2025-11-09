
import axios from "axios";

export async function postAxios(id: number, username: string){
    try {
        const response = await axios.post(`${process.env.API_GATEWAY_URL}/booking/patient`, {
            patientId: id,
            username: username
        })
        // console.log(response.data);
        return response.data
    } catch (error) {
        console.error('Error during POST request:', error);
        throw new Error;
    }
}