import {
    EXPENDITURE_GET_REQUEST,
    EXPENDITURE_GET_SUCCESS,
    EXPENDITURE_GET_FAILURE
} from './types';

import axios from 'axios';
import leha from "../img/leha.jpeg";
import men from "../img/men.jpg";
import stark from "../img/stark.jpg";
import tigra from "../img/tigra.png";
import clever from "../img/clever.jpeg";

const expenditureRequested = () => {
    return {
        type:EXPENDITURE_GET_REQUEST
    };
};

const expenditureLoaded = (expenditure) => {
    return {
        type: EXPENDITURE_GET_SUCCESS,
        payload: expenditure
    };
};

const expenditureError = (error) => {
    return {
        type: EXPENDITURE_GET_FAILURE,
        payload: error
    };
};

export const fetchExpenditure = () => async dispatch => {
    dispatch(expenditureRequested());
    try {
        const res = await axios.get('/finance/expenditure');
        dispatch(expenditureLoaded(res));
    } catch (err) {
        dispatch(expenditureError(err));
    }
    /*dispatch(expenditureRequested());
    bdApiService.getExpenditure()
        .then((expenditure) => dispatch(expenditureLoaded(expenditure)))
        .catch((err) => dispatch(expenditureError(err)));*/
};