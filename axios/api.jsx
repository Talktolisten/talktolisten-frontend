import axios from "axios";
import { getTokens } from "../util/tokenUtils";

export const URL = process.env.API_URL;

const Api = async (config) =>{
    const token = await getTokens();
    const { accessToken } = token;

    if(accessToken){
        config.headers={
            Authorization: `Bearer ${accessToken}`,
        };
    }
    axios.interceptors.response.use(
        response =>{
            return response;
        },
        function(error){
            if(!error.response){
                error.response={
                    data:'Connection error',
                    status:500,
                };
            }
            if(error.response.status === 401){
                console.log('Unauthorized: Your session has expired');
            }
            return Promise.reject(error);
        },
    );
    config.baseURL=URL;
    return axios(config);
};

export default Api;