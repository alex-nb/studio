import { reportsPageTypes } from './types';
import { reportsPageAPI } from './api-endpoints';

import axios from 'axios';

const allReportsRequested = () => ({
    type: reportsPageTypes.ALL_REPORTS_GET_REQUEST
});

const allReportsLoaded = (listAllReports) => ({
    type: reportsPageTypes.ALL_REPORTS_GET_SUCCESS,
    payload: listAllReports
});

const allReportsError = (error) => ({
    type: reportsPageTypes.ALL_REPORTS_GET_FAILURE,
    payload: error
});

export const fetchAllReports = () => async dispatch => {
    dispatch(allReportsRequested());
    try {
        const res = await axios.get(reportsPageAPI.GET_ALL_REPORTS);
        dispatch(allReportsLoaded(res.data.reports));
    } catch (err) {
        dispatch(allReportsError(err));
    }
};