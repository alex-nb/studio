import { expendituresPageTypes } from './types';
import { expendituresPageAPI } from './api-endpoints';

import axios from 'axios';

const expenditureLoaded = (expenditure) => {
    return {
        type: expendituresPageTypes.EXPENDITURE_GET,
        payload: expenditure
    };
};

const expenditureError = (error) => {
    return {
        type: expendituresPageTypes.EXPENDITURE_GET_FAILURE,
        payload: error
    };
};

export const fetchExpenditure = () => async dispatch => {
    try {
        const res = await axios.get(expendituresPageAPI.GET_EXPENDITURE);
        dispatch(expenditureLoaded(res.data.expenditures));
    } catch (err) {
        console.error('Get expenditures list. '+err);
        dispatch(expenditureError(err));
    }
};