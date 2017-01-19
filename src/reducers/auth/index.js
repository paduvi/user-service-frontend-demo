/**
 * Created by chotoxautinh on 1/13/17.
 */
import {combineReducers} from 'redux';

const isRequesting = (state = false, action) => {
    switch (action.type) {
        case 'REQUEST_AUTH':
            return true;
        case 'REQUEST_AUTH_SUCCESS':
        case 'REQUEST_AUTH_FAILURE':
            return false;
        default:
            return state;
    }
}

const info = (state = {}, action) => {
    if (action.response) {
        return {
            ...state,
            ...action.response.entities.auth,
        };
    }
    return state;
}

const auth = combineReducers({
    isRequesting,
    info
});

export default auth;

export const getIsRequesting = (state) => state.isRequesting