import axios from "axios";

export const URL ='https://sore-ruby-kitten-gown.cyclic.app/';

const Api = async (config) =>{
    // const token ='vvfvv';
    // if(token){
    //     config.headers={
    //         authorization:token
    //     };
    // }
    axios.interceptors.response.use(
        response =>{
            return response;
        },
        function(error){
            if(!error.response){
                error.response={
                    data:'network error',
                    status:500,
                };
            }
            if(error.response.status === 401){
                console.log('Un Authorised');
            }
            return Promise.reject(error);
        },
    );
    config.baseURL=URL;
    return axios(config);
};

export default Api;



