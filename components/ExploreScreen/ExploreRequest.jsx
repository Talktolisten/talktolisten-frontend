import Api from '../../axios/api';
import { getUserID } from '../../util/tokenUtils';

export const explore_get_bots_categories = async (category) => {
    return await Api({
        method: 'GET',
        url: 'api/v1/explore/category',
        params: {
            category: category,
        }
    }).then(res => {
        return res.data;
    });
};

export const explore_get_bots_search = async (searchTerm) => {
    return await Api({
        method: 'GET',
        url: 'api/v1/explore/search',
        params: {
            search: searchTerm,
        }
    }).then(res => {
        return res.data;
    });
};

export const create_new_chat = async (bot_id) => {
    return await Api({
        method: 'POST',
        url: 'api/v1/chat/',
        data: {
            user_id: await getUserID(),
            bot_id1: bot_id,
        }
    }).then(res => {
        return res.data.chat_id;
    });
};

export const explore_group_chat = async () => {
    return await Api({
        method: 'GET',
        url: 'api/v1/explore/groupchat',
    }).then(res => {
        return res.data;
    });
}