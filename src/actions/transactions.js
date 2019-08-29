import {transactionsPageTypes} from './types';
import {transactionsPageAPI} from './api-endpoints';

import axios from 'axios';

const transactionLoaded = (transaction) => ({
    type: transactionsPageTypes.TRANSACTION_GET,
    payload: transaction
});

const transactionError = (error) => ({
    type: transactionsPageTypes.TRANSACTION_GET_FAILURE,
    payload: error
});

export const fetchTransaction = () => async dispatch => {
    try {
        const res = await axios.get(transactionsPageAPI.GET_TRANSACTIONS);
        dispatch(transactionLoaded(res.data.transactions));
    } catch (err) {
        console.error('Get transactions list. '+err);
        dispatch(transactionError(err));
    }
};

export const updateTransaction = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post(transactionsPageAPI.UPDATE_TRANSACTION, formData, config);
        dispatch({
            type: transactionsPageTypes.UPDATE_TRANSACTION,
            payload: res.data.transaction
        });
    }
    catch (err) {
        console.error('Update transaction. '+err);
        dispatch({
            type: transactionsPageTypes.UPDATE_TRANSACTION_FAILURE,
            payload: err
        });
    }
};