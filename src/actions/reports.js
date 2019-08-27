import { reportsPageTypes } from './types';
import { reportsPageAPI } from './api-endpoints';

import axios from 'axios';


const allReportsLoaded = (listAllReports) => ({
    type: reportsPageTypes.ALL_REPORTS_GET,
    payload: listAllReports
});

const allReportsError = (error) => ({
    type: reportsPageTypes.ALL_REPORTS_GET_FAILURE,
    payload: error
});

export const fetchAllReports = () => async dispatch => {
    try {
        const res = await axios.get(reportsPageAPI.GET_ALL_REPORTS);
        dispatch(allReportsLoaded(res.data.reports));
    } catch (err) {
        console.error('Get reports list. '+err);
        dispatch(allReportsError(err));
    }
};
