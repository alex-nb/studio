import {expendituresPageTypes} from './types';
import {expendituresPageAPI} from './api-endpoints';
import axios from 'axios';
import {setAlert} from "./alert";

export const fetchExpenditure = () => async dispatch => {
    try {
        const res = await axios.get(expendituresPageAPI.GET_EXPENDITURE);
        dispatch({
            type: expendituresPageTypes.EXPENDITURE_GET,
            payload: res.data.expenditures
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
            type: expendituresPageTypes.EXPENDITURE_GET_FAILURE,
            payload: err
        });
    }
};

export const updateExpenditure = (formData) => async dispatch => {
    dispatch({
        type: expendituresPageTypes.EXPENDITURE_LOAD,
    });
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post(expendituresPageAPI.UPDATE_EXPENDITURE, formData, config);
        dispatch({
            type: expendituresPageTypes.EXPENDITURE_UPDATE,
            payload: res.data.expenditure
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
            type: expendituresPageTypes.EXPENDITURE_UPDATE_FAILURE,
            payload: err
        });
    }
};