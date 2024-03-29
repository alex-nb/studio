import {requestsMoneyPageTypes} from './types';
import {requestsMoneyPageAPI} from './api-endpoints';
import axios from 'axios';
import {setAlert} from "./alert";

export const fetchRequestsMoney = (page=1) => async dispatch => {
    try {
        const res = await axios.get(requestsMoneyPageAPI.GET_REQUESTS_MONEY+'/'+page);
        dispatch({
            type: requestsMoneyPageTypes.REQUESTS_MONEY_GET,
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
            type: requestsMoneyPageTypes.REQUESTS_MONEY_GET_FAILURE,
            payload: err
        });
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
        console.error(err);
        if (err.response && err.response.data && err.response.data.errors) {
            const errors = err.response.data.errors;
            if (errors) {
                await errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }
        }
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
        dispatch(setAlert('Запрос на дс отправлен', 'success'));
    }
    catch (err) {
        console.error(err);
        if (err.response && err.response.data && err.response.data.errors) {
            const errors = err.response.data.errors;
            if (errors) {
                await errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }
        }
        /*dispatch({
            type: requestsMoneyPageTypes.CREATE_REQUEST_MONEY_FAILURE,
            payload: err
        });*/
    }
};