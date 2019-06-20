import { expendituresPageTypes } from './types';
import { expendituresPageAPI } from './api-endpoints';

import axios from 'axios';

const expenditureRequested = () => {
    return {
        type: expendituresPageTypes.EXPENDITURE_GET_REQUEST
    };
};

const expenditureLoaded = (expenditure) => {
    return {
        type: expendituresPageTypes.EXPENDITURE_GET_SUCCESS,
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
    dispatch(expenditureRequested());
    try {
        const res = await axios.get(expendituresPageAPI.GET_EXPENDITURE);
        dispatch(expenditureLoaded(res.data.expenditures));
    } catch (err) {
        dispatch(expenditureError(err));
    }
};