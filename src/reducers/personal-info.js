import { headerPageTypes } from '../actions/types';

const initialState = {
    personalInfo: {},
    balanceHistory: {},
    loadingPersonalInfo: true,
    errorPersonalInfo: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case headerPageTypes.PERSONAL_INFO_GET:
            return {
                personalInfo: action.payload.employee,
                balanceHistory: action.payload.balanceHistory,
                loadingPersonalInfo: false,
                errorPersonalInfo: null
            };

        case headerPageTypes.PERSONAL_INFO_GET_FAILURE:
            return {
                personalInfo: [],
                loadingPersonalInfo: false,
                errorPersonalInfo: action.payload
            };

        default:
            return state;
    }

};