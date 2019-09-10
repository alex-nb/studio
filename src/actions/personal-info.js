import { headerPageTypes } from './types';
import { headerPageAPI } from './api-endpoints';
import axios from 'axios';

export const fetchPersonalInfo = () => async dispatch => {
    try {
        const res = await axios.get(headerPageAPI.GET_PERSONAL_INFO);
        dispatch({
            type: headerPageTypes.PERSONAL_INFO_GET,
            payload: res.data
        });
    } catch (err) {
        console.error('Get personal info. '+err);
        dispatch({
            type: headerPageTypes.PERSONAL_INFO_GET_FAILURE,
            payload: err
        });
    }
};