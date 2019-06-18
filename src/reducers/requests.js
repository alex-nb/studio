import {
    REQUESTS_MONEY_GET_REQUEST,
    REQUESTS_MONEY_GET_SUCCESS,
    REQUESTS_MONEY_GET_FAILURE
} from '../actions/types';


const initialState = {
    requestsMoney: [],
    loadingRequestsMoney: true,
    errorRequestsMoney: null
};

export default function (state = initialState, action) {

    switch (action.type) {
        case REQUESTS_MONEY_GET_REQUEST:
            return {
                requestsMoney: [],
                loadingRequestsMoney: true,
                errorRequestsMoney: null
            };

        case REQUESTS_MONEY_GET_SUCCESS:
            return {
                requestsMoney: action.payload,
                loadingRequestsMoney: false,
                errorRequestsMoney: null
            };

        case REQUESTS_MONEY_GET_FAILURE:
            return {
                requestsMoney: [],
                loadingRequestsMoney: false,
                errorRequestsMoney: action.payload
            };


        default:
            return state;
    }

};