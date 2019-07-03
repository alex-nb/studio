import { headerPageTypes } from './types';
//import { headerPageAPI } from './api-endpoints';

//import axios from 'axios';
import stark from "../img/stark.jpg";

const personalInfoRequested = () => ({
    type: headerPageTypes.PERSONAL_INFO_GET_REQUEST
});

const personalInfoLoaded = (personalInfo) => ({
    type: headerPageTypes.PERSONAL_INFO_GET_SUCCESS,
    payload: personalInfo
});

const personalInfoError = (error) => ({
    type: headerPageTypes.PERSONAL_INFO_GET_FAILURE,
    payload: error
});

export const fetchPersonalInfo = () => async dispatch => {
    dispatch(personalInfoRequested());
    try {
        //const res = await axios.get('/api/posts');
        const res = await {
            id: '3',
            name: 'Арья Старк',
            role: 'studio',
            rate: '400 Y',
            img: stark,
            balance: '15 000 Y',
            balanceHistory: [
                {
                    id: 1,
                    date: '10.01.19',
                    spending: '10 000',
                    arrival: '',
                    balance: '-10 000'
                },
                {
                    id: 2,
                    date: '20.01.19',
                    spending: '25 000',
                    arrival: '',
                    balance: '-35 000'
                },
                {
                    id: 3,
                    date: '05.02.19',
                    spending: '15 000',
                    arrival: '50 000',
                    balance: '0'
                },
                {
                    id: 4,
                    date: '15.02.19',
                    spending: '10 000',
                    arrival: '20 000',
                    balance: '10 000'
                },
                {
                    id: 5,
                    date: '20.02.19',
                    spending: '40 000',
                    arrival: '55 000',
                    balance: '15 000'
                },
            ]
        };
        dispatch(personalInfoLoaded(res));
    } catch (err) {
        console.error('Get personal info. '+err);
        dispatch(personalInfoError(err));
    }
};