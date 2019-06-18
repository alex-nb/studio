import {
    PERSONAL_INFO_GET_REQUEST,
    PERSONAL_INFO_GET_SUCCESS,
    PERSONAL_INFO_GET_FAILURE
} from '../actions/types';

const initialState = {
    personalInfo: {},
    loadingPersonalInfo: true,
    errorPersonalInfo: null,
};

export default function (state = initialState, action) {
    console.log(action.type);
    //console.log(PERSONAL_INFO_GET_REQUEST);
    switch (action.type) {
        case PERSONAL_INFO_GET_SUCCESS:
            console.log('reducer');
            return {
                personalInfo: action.payload,
                loadingPersonalInfo: false,
                errorPersonalInfo: null
            };

        case PERSONAL_INFO_GET_REQUEST:
            return {
                personalInfo: [],
                loadingPersonalInfo: true,
                errorPersonalInfo: null
            };

        case PERSONAL_INFO_GET_FAILURE:
            return {
                personalInfo: [],
                loadingPersonalInfo: false,
                errorPersonalInfo: action.payload
            };

        default:
            return state;
    }

};