import { requestsMoneyPageTypes } from '../actions/types';


const initialState = {
    requestsMoney: [],
    pagination: {
        currentPage: 1,
        totalItems: 1,
        itemsPerPage: 1,
    },
    loadingRequestsMoney: true,
    errorRequestsMoney: null
};

export default function (state = initialState, action) {

    switch (action.type) {
        case requestsMoneyPageTypes.REQUESTS_MONEY_GET:
            return {
                ...state,
                requestsMoney: action.payload.requests,
                pagination: {
                    currentPage: action.payload.currentPage,
                    totalItems: action.payload.totalItems,
                    itemsPerPage: action.payload.itemsPerPage,
                },
                loadingRequestsMoney: false,
                errorRequestsMoney: null
            };

        case requestsMoneyPageTypes.REQUESTS_MONEY_GET_FAILURE:
            return {
                ...state,
                requestsMoney: [],
                loadingRequestsMoney: false,
                errorRequestsMoney: action.payload
            };

        case requestsMoneyPageTypes.SET_ANSWER_REQUEST:
            return {
                ...state,
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