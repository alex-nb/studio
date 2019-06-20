import { requestsMoneyPageTypes } from './types';
import { requestsMoneyPageAPI } from './api-endpoints';

import axios from 'axios';

const requestsMoneyRequested = () => ({
    type: requestsMoneyPageTypes.REQUESTS_MONEY_GET_REQUEST
});

const requestsMoneyLoaded = (requestsMoney) => ({
    type: requestsMoneyPageTypes.REQUESTS_MONEY_GET_SUCCESS,
    payload: requestsMoney
});

const requestsMoneyError = (error) => ({
    type: requestsMoneyPageTypes.REQUESTS_MONEY_GET_FAILURE,
    payload: error
});

export const fetchRequestsMoney = () => async dispatch => {
    dispatch(requestsMoneyRequested());
    try {
        const res = await axios.get(requestsMoneyPageAPI.GET_REQUESTS_MONEY);
        dispatch(requestsMoneyLoaded(res.data.requests));
    } catch (err) {
        dispatch(requestsMoneyError(err));
    }
};