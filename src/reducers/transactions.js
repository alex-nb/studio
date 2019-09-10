import {transactionsPageTypes} from '../actions/types';

const initialState = {
    transaction: [],
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
                transaction: action.payload,
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
                    transaction: state.transaction.map(transaction => {
                        if (transaction._id===action.payload._id) return action.payload;
                        return transaction;
                    }),
                    loadingUpdateTransaction: false,
                    errorUpdateTransaction: null
                };
            }
            return {
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
