import Api from '../../axios/api';

export const explore_get_bots = async () =>{

    return await Api({
        method:'GET',
        url:'api/v1/explore/',
    }).then(res => {
        return res.data;
     });
};