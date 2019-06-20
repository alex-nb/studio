import { headerPageTypes } from '../actions/types';

const initialState = {
    personalInfo: {},
    loadingPersonalInfo: true,
    errorPersonalInfo: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case headerPageTypes.PERSONAL_INFO_GET_SUCCESS:
            return {
                personalInfo: action.payload,
                loadingPersonalInfo: false,
                errorPersonalInfo: null
            };

        case headerPageTypes.PERSONAL_INFO_GET_REQUEST:
            return {
                personalInfo: [],
                loadingPersonalInfo: true,
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