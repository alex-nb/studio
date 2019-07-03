import { transactionsPageTypes } from './types';
import { transactionsPageAPI } from './api-endpoints';

import axios from 'axios';

const transactionRequested = () => ({
    type: transactionsPageTypes.TRANSACTION_GET_REQUEST
});

const transactionLoaded = (transaction) => ({
    type: transactionsPageTypes.TRANSACTION_GET_SUCCESS,
    payload: transaction
});

const transactionError = (error) => ({
    type: transactionsPageTypes.TRANSACTION_GET_FAILURE,
    payload: error
});

export const fetchTransaction = () => async dispatch => {
    dispatch(transactionRequested());
    try {
        const res = await axios.get(transactionsPageAPI.GET_TRANSACTIONS);
        dispatch(transactionLoaded(res.data.transactions));
    } catch (err) {
        console.error('Get transactions list. '+err);
        dispatch(transactionError(err));
    }
};