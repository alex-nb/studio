import { transactionsPageTypes } from '../actions/types';

const initialState = {
    transaction: [],
    loadingTransaction: true,
    errorTransaction: null
};

export default function (state = initialState, action) {

    switch (action.type) {

        case transactionsPageTypes.TRANSACTION_GET:
            return {
                transaction: action.payload,
                loadingTransaction: false,
                errorTransaction: null
            };

        case transactionsPageTypes.TRANSACTION_GET_FAILURE:
            return {
                transaction: [],
                loadingTransaction: false,
                errorTransaction: action.payload
            };

        default:
            return state;
    }

};
