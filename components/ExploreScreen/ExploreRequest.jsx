import Api from '../../axios/api';

export const explore_get_bots = async () =>{

    return await Api({
        method:'GET',
        url:'explore/',
    }).then(res => {
        return res.data;
     });
};