import {
    TRANSACTION_GET_REQUEST,
    TRANSACTION_GET_SUCCESS,
    TRANSACTION_GET_FAILURE
} from '../actions/types';

const initialState = {
    transaction: [],
    loadingTransaction: true,
    errorTransaction: null
};

export default function (state = initialState, action) {

    switch (action.type) {
        case TRANSACTION_GET_REQUEST:
            return {
                transaction: [],
                loadingTransaction: true,
                errorTransaction: null
            };

        case TRANSACTION_GET_SUCCESS:
            return {
                transaction: action.payload,
                loadingTransaction: false,
                errorTransaction: null
            };

        case TRANSACTION_GET_FAILURE:
            return {
                transaction: [],
                loadingTransaction: false,
                errorTransaction: action.payload
            };

        default:
            return state;
    }

};
