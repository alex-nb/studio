import { requestsMoneyPageTypes } from './types';
import { requestsMoneyPageAPI } from './api-endpoints';

import axios from 'axios';

const requestsMoneyLoaded = (requestsMoney) => ({
    type: requestsMoneyPageTypes.REQUESTS_MONEY_GET,
    payload: requestsMoney
});

const requestsMoneyError = (error) => ({
    type: requestsMoneyPageTypes.REQUESTS_MONEY_GET_FAILURE,
    payload: error
});

export const fetchRequestsMoney = () => async dispatch => {
    try {
        const res = await axios.get(requestsMoneyPageAPI.GET_REQUESTS_MONEY);
        dispatch(requestsMoneyLoaded(res.data.requests));
    } catch (err) {
        console.error('Get requests list. '+err);
        dispatch(requestsMoneyError(err));
    }
};