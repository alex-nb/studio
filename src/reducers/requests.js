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

        case requestsMoneyPageTypes.SET_ANSWER_REQUEST:
            return {
                requestsMoney: state.requestsMoney.map(request => {
                    if (request._id===action.payload._id) return action.payload;
                    return request;
                }),
                loadingRequestsMoney: false,
                errorRequestsMoney: null
            };

        case requestsMoneyPageTypes.SET_ANSWER_REQUEST_FAILURE:
            return {
                ...state,
                loadingRequestsMoney: false,
                errorRequestsMoney: action.payload
            };

        case requestsMoneyPageTypes.CREATE_REQUEST_MONEY:
            return state;

        case requestsMoneyPageTypes.CREATE_REQUEST_MONEY_FAILURE:
            return state;

        default:
            return state;
    }

};