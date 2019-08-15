import { requestsMoneyPageTypes } from '../actions/types';


const initialState = {
    requestsMoney: [],
    loadingRequestsMoney: true,
    errorRequestsMoney: null
};

export default function (state = initialState, action) {

    switch (action.type) {
        case requestsMoneyPageTypes.REQUESTS_MONEY_GET:
            return {
                requestsMoney: action.payload,
                loadingRequestsMoney: false,
                errorRequestsMoney: null
            };

        case requestsMoneyPageTypes.REQUESTS_MONEY_GET_FAILURE:
            return {
                requestsMoney: [],
                loadingRequestsMoney: false,
                errorRequestsMoney: action.payload
            };


        default:
            return state;
    }

};