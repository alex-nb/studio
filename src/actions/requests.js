import {requestsMoneyPageTypes} from './types';
import {requestsMoneyPageAPI} from './api-endpoints';

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

export const setAnswerRequest = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post(requestsMoneyPageAPI.SET_ANSWER_REQUEST, formData, config);
        dispatch({
            type: requestsMoneyPageTypes.SET_ANSWER_REQUEST,
            payload: res.data.request
        });
    }
    catch (err) {
        console.error('Set answer request. '+err);
        dispatch({
            type: requestsMoneyPageTypes.SET_ANSWER_REQUEST_FAILURE,
            payload: err
        });
    }
};

export const createRequest = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post(requestsMoneyPageAPI.CREATE_REQUEST_MONEY, formData, config);
        dispatch({
            type: requestsMoneyPageTypes.CREATE_REQUEST_MONEY,
            payload: res.data.request
        });
    }
    catch (err) {
        console.error('Create request. '+err);
        dispatch({
            type: requestsMoneyPageTypes.CREATE_REQUEST_MONEY_FAILURE,
            payload: err
        });
    }
};