import {userAccountPageTypes} from './types';
import {userAccountPageAPI} from './api-endpoints';
import axios from 'axios';
import {setAlert} from "./alert";

export const fetchPersonalInfo = () => async dispatch => {
    try {
        const res = await axios.get(userAccountPageAPI.GET_PERSONAL_INFO);
        dispatch({
            type: userAccountPageTypes.PERSONAL_INFO_GET,
            payload: res.data
        });
    } catch (err) {
        console.error('Get personal info. '+err);
        dispatch({
            type: userAccountPageTypes.PERSONAL_INFO_GET_FAILURE,
            payload: err
        });
    }
};

export const getBalanceHistory = (page=1) => async dispatch => {
    try {
        const res = await axios.get(userAccountPageAPI.GET_BALANCE_HISTORY+'/'+page);
        dispatch({
            type: userAccountPageTypes.BALANCE_HISTORY_GET,
            payload: res.data
        });
    } catch (err) {
        if (err.response && err.response.data && err.response.data.errors) {
            const errors = err.response.data.errors;
            if (errors) {
                await errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }
        }
        dispatch({
            type: userAccountPageTypes.BALANCE_HISTORY_GET_FAILURE,
            payload: err
        });
    }
};

export const updatePersonalInfo = (formData) => async dispatch => {
    dispatch({
        type: userAccountPageTypes.PERSONAL_INFO_LOAD
    });
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        console.log(formData);
        const res = await axios.post(userAccountPageAPI.UPDATE_PERSONAL_INFO, formData, config);
        dispatch({
            type: userAccountPageTypes.PERSONAL_INFO_UPDATE,
            payload: res.data.employee
        });
        console.log('suc');
    } catch (err) {
        console.log(err);
        if (err.response && err.response.data && err.response.data.errors) {
            const errors = err.response.data.errors;
            if (errors) {
                await errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }
        }
        dispatch({
            type: userAccountPageTypes.PERSONAL_INFO_UPDATE_FAILURE
        });
    }
};