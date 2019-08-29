import {reportsPageTypes} from './types';
import {reportsPageAPI} from './api-endpoints';

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

export const updateReport = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post(reportsPageAPI.UPDATE_REPORT, formData, config);
        dispatch({
            type: reportsPageTypes.UPDATE_REPORT,
            payload: res.data.report
        });
    } catch (err) {
        console.error('Update report. '+err);
        dispatch({
            type: reportsPageTypes.UPDATE_REPORT_FAILURE,
            payload: err
        });
    }
};