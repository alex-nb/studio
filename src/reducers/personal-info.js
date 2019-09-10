import { headerPageTypes } from '../actions/types';

const initialState = {
    info: {},
    balanceHistory: {},
    departments: [],
    loadingPersonalInfo: true,
    errorPersonalInfo: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case headerPageTypes.PERSONAL_INFO_GET:
            return {
                info: action.payload.employee,
                balanceHistory: action.payload.balanceHistory,
                departments: action.payload.departments,
                loadingPersonalInfo: false,
                errorPersonalInfo: null
            };

        case headerPageTypes.PERSONAL_INFO_GET_FAILURE:
            return {
                info: [],
                loadingPersonalInfo: false,
                errorPersonalInfo: action.payload
            };

        default:
            return state;
    }

};