import { authTypes } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuth: !!localStorage.getItem('token'),
    authLoading: false,
    userId: localStorage.getItem('userId'),
    error: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case authTypes.USER_LOAD:
            return {
                ...state,
                authLoading: true
            };
        case authTypes.REGISTER_SUCCESS:
        case authTypes.LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuth: true,
                authLoading: false
            };
        case authTypes.REGISTER_FAIL:
        case authTypes.AUTH_ERROR:
        case authTypes.LOGIN_FAIL:
        case authTypes.LOGOUT:
            return {
                ...state,
                token: null,
                isAuth: false,
                authLoading: false,
                error: action.payload
            };
        default:
            return state;
    }
}