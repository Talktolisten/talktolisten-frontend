import { SET_USER_ID, REMOVE_USER_ID } from "../actionTypes";

const initialState = {
    userID: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_ID:
            return {
                ...state,
                userID: action.payload,
            };
        case REMOVE_USER_ID:
            return {
                ...state,
                userID: null,
            };
        default:
            return state;
    }
};

export default userReducer;