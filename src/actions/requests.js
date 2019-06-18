import {
    REQUESTS_MONEY_GET_REQUEST,
    REQUESTS_MONEY_GET_SUCCESS,
    REQUESTS_MONEY_GET_FAILURE
} from './types';

import axios from 'axios';

const requestsMoneyRequested = () => {
    return {
        type: REQUESTS_MONEY_GET_REQUEST
    };
};

const requestsMoneyLoaded = (requestsMoney) => {
    return {
        type: REQUESTS_MONEY_GET_SUCCESS,
        payload: requestsMoney
    };
};

const requestsMoneyError = (error) => {
    return {
        type: REQUESTS_MONEY_GET_FAILURE,
        payload: error
    };
};

export const fetchRequestsMoney = () => async dispatch => {
    dispatch(requestsMoneyRequested());
    try {
        const res = await axios.get('/finance/request');
        dispatch(requestsMoneyLoaded(res));
    } catch (err) {
        dispatch(requestsMoneyError(err));
    }
    /*dispatch(requestsMoneyRequested());
    bdApiService.getRequestsMoney()
        .then((requestsMoney) => dispatch(requestsMoneyLoaded(requestsMoney)))
        .catch((err) => dispatch(requestsMoneyError(err)));*/
};