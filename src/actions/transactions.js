import {
    TRANSACTION_GET_REQUEST,
    TRANSACTION_GET_SUCCESS,
    TRANSACTION_GET_FAILURE
} from './types';

import axios from 'axios';

const transactionRequested = () => {
    return {
        type: TRANSACTION_GET_REQUEST
    };
};

const transactionLoaded = (transaction) => {
    return {
        type: TRANSACTION_GET_SUCCESS,
        payload: transaction
    };
};

const transactionError = (error) => {
    return {
        type: TRANSACTION_GET_FAILURE,
        payload: error
    };
};

export const fetchTransaction = () => async dispatch => {
    dispatch(transactionRequested());
    try {
        const res = await axios.get('/finance/transaction');
        dispatch(transactionLoaded(res));
    } catch (err) {
        dispatch(transactionError(err));
    }
    /*dispatch(transactionRequested());
    bdApiService.getTransaction()
        .then((transaction) => dispatch(transactionLoaded(transaction)))
        .catch((err) => dispatch(transactionError(err)));*/
};