import {transactionsPageTypes} from './types';
import {transactionsPageAPI} from './api-endpoints';
import axios from 'axios';
import {setAlert} from "./alert";

export const fetchTransaction = (page=1) => async dispatch => {
    try {
        const res = await axios.get(transactionsPageAPI.GET_TRANSACTIONS+'/'+page);
        dispatch({
            type: transactionsPageTypes.TRANSACTION_GET,
            payload: res.data
        });
    } catch (err) {
        console.error(err);
        if (err.response && err.response.data && err.response.data.errors) {
            const errors = err.response.data.errors;
            if (errors) {
                await errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }
        }
        dispatch({
            type: transactionsPageTypes.TRANSACTION_GET_FAILURE,
            payload: err
        });
    }
};

export const updateTransaction = (formData) => async dispatch => {
    dispatch({
        type: transactionsPageTypes.TRANSACTION_LOAD
    });
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post(transactionsPageAPI.UPDATE_TRANSACTION, formData, config);
        dispatch({
            type: transactionsPageTypes.TRANSACTION_UPDATE,
            payload: res.data.transaction
        });
    }
    catch (err) {
        console.error(err);
        if (err.response && err.response.data && err.response.data.errors) {
            const errors = err.response.data.errors;
            if (errors) {
                await errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }
        }
        dispatch({
            type: transactionsPageTypes.TRANSACTION_UPDATE_FAILURE,
            payload: err
        });
    }
};