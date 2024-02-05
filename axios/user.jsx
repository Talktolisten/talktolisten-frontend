import { getUserID } from "../../util/tokenUtils";

export const get_user_info = async () => {
    const user_id = await getUserID();
    return await Api({
        method:'GET',
        url: `api/v1/user/${user_id}`,
    }).then(res => {
        return res.data;
     });
};