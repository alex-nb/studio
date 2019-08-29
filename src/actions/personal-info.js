import { headerPageTypes } from './types';
import { headerPageAPI } from './api-endpoints';

import axios from 'axios';

const personalInfoLoaded = (personalInfo) => ({
    type: headerPageTypes.PERSONAL_INFO_GET,
    payload: personalInfo
});

const personalInfoError = (error) => ({
    type: headerPageTypes.PERSONAL_INFO_GET_FAILURE,
    payload: error
});

export const fetchPersonalInfo = () => async dispatch => {
    try {
        const res = await axios.get(headerPageAPI.GET_PERSONAL_INFO);
        dispatch(personalInfoLoaded(res.data));
    } catch (err) {
        console.error('Get personal info. '+err);
        dispatch(personalInfoError(err));
    }
};