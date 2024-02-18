import { SET_USER_ID } from '../actionTypes';

export const setUserID = (userID) => ({
    type: SET_USER_ID,
    payload: userID,
});
