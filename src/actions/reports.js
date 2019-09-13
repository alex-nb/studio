import {reportsPageTypes} from './types';
import {reportsPageAPI} from './api-endpoints';
import axios from 'axios';
import {setAlert} from "./alert";

export const fetchAllReports = () => async dispatch => {
    try {
        const res = await axios.get(reportsPageAPI.GET_ALL_REPORTS);
        dispatch({
            type: reportsPageTypes.ALL_REPORTS_GET,
            payload: res.data.reports
        });
    } catch (err) {
        console.error('Get reports list. '+err);
        dispatch({
            type: reportsPageTypes.ALL_REPORTS_GET_FAILURE,
            payload: err
        });
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
            type: reportsPageTypes.REPORT_UPDATE,
            payload: res.data.report
        });
    } catch (err) {
        console.error(err);
        if (err.response && err.response.data && err.response.data.errors) {
            const errors = err.response.data.errors;
            if (errors) {
                await errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }
        }
        /*dispatch({
            type: reportsPageTypes.UPDATE_REPORT_FAILURE,
            payload: err
        });*/
    }
};