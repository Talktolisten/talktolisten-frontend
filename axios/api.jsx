import axios from "axios";
import { getTokens } from "../util/tokenUtils";

export const URL = 'http://ec2-3-14-66-196.us-east-2.compute.amazonaws.com:8000/';

axios.interceptors.response.use(
    response => {
        return response;
    },
    function(error) {
        if (!error.response) {
            error.response = {
                data: 'Connection error',
                status: 500,
            };
        }
        if (error.response.status === 401) {
            console.log('Unauthorized: Your session has expired');
        }
        return Promise.reject(error);
    },
);

const Api = async (config) => {
    const token = await getTokens();
    const { accessToken } = token;

    if (accessToken) {
        config.headers = {
            Authorization: `Bearer ${accessToken}`,
        };
    }

    config.baseURL = URL;
    return axios(config);
};

export default Api;