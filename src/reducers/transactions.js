import {transactionsPageTypes} from '../actions/types';

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
        case transactionsPageTypes.UPDATE_TRANSACTION:
            if (state.transaction.find(transaction => transaction._id===action.payload._id)) {
                return {
                    transaction: state.transaction.map(transaction => {
                        if (transaction._id===action.payload._id) return action.payload;
                        return transaction;
                    }),
                    loadingTransaction: false,
                    errorTransaction: null
                };
            }
            return {
                transaction: [
                    action.payload,
                    ...state.transaction
                ],
                loadingTransaction: false,
                errorTransaction: null
            };

        case transactionsPageTypes.UPDATE_TRANSACTION_FAILURE:
            return {
                ...state,
                loadingTransaction: false,
                errorTransaction: action.payload
            };


        default:
            return state;
    }

};
