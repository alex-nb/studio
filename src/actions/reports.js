import {
    ALL_REPORTS_GET_REQUEST,
    ALL_REPORTS_GET_SUCCESS,
    ALL_REPORTS_GET_FAILURE
} from './types';

import axios from 'axios';

const allReportsRequested = () => {
    return {
        type: ALL_REPORTS_GET_REQUEST
    };
};

const allReportsLoaded = (listAllReports) => {
    return {
        type: ALL_REPORTS_GET_SUCCESS,
        payload: listAllReports
    };
};

const allReportsError = (error) => {
    return {
        type: ALL_REPORTS_GET_FAILURE,
        payload: error
    };
};

export const fetchAllReports = () => async dispatch => {
    dispatch(allReportsRequested());
    try {
        const res = await axios.get('/report');
        dispatch(allReportsLoaded(res));
    } catch (err) {
        dispatch(allReportsError(err));
    }
    /*dispatch(allReportsRequested());
    bdApiService.getAllReports()
        .then((allReports) => dispatch(allReportsLoaded(allReports)))
        .catch((err) => dispatch(allReportsError(err)));*/
};