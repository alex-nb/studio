import {transactionsPageTypes} from '../actions/types';

const initialState = {
    transaction: [],
    pagination: {
        currentPage: 1,
        totalItems: 1,
        itemsPerPage: 1,
    },
    loadingTransaction: true,
    loadingUpdateTransaction: false,
    errorTransaction: null,
    errorUpdateTransaction: null
};

export default function (state = initialState, action) {

    switch (action.type) {

        case transactionsPageTypes.TRANSACTION_GET:
            return {
                ...state,
                transaction: action.payload.transactions,
                pagination: {
                    currentPage: action.payload.currentPage,
                    totalItems: action.payload.totalItems,
                    itemsPerPage: action.payload.itemsPerPage,
                },
                loadingTransaction: false,
                errorTransaction: null
            };

        case transactionsPageTypes.TRANSACTION_GET_FAILURE:
            return {
                ...state,
                transaction: [],
                loadingTransaction: false,
                errorTransaction: action.payload
            };

        case transactionsPageTypes.TRANSACTION_LOAD:
            return {
                ...state,
                loadingUpdateTransaction: true
            };

        case transactionsPageTypes.TRANSACTION_UPDATE:
            if (state.transaction.find(transaction => transaction._id===action.payload._id)) {
                return {
                    ...state,
                    transaction: state.transaction.map(transaction => {
                        if (transaction._id===action.payload._id) return action.payload;
                        return transaction;
                    }),
                    loadingUpdateTransaction: false,
                    errorUpdateTransaction: null
                };
            }
            return {
                ...state,
                transaction: [
                    action.payload,
                    ...state.transaction
                ],
                loadingUpdateTransaction: false,
                errorUpdateTransaction: null
            };

        case transactionsPageTypes.TRANSACTION_UPDATE_FAILURE:
            return {
                ...state,
                loadingUpdateTransaction: false,
                errorUpdateTransaction: action.payload
            };


        default:
            return state;
    }

};
