import {
    ALL_REPORTS_GET_REQUEST,
    ALL_REPORTS_GET_SUCCESS,
    ALL_REPORTS_GET_FAILURE
} from '../actions/types';

const initialState = {
    allReports: [],
    loadingAllReports: true,
    errorAllReports: null
};

export default function (state = initialState, action) {

    switch (action.type) {
        case ALL_REPORTS_GET_SUCCESS:
            return {
                allReports: action.payload,
                loadingAllReports: false,
                errorAllReports: null
            };

        case ALL_REPORTS_GET_REQUEST:
            return {
                allReports: {},
                loadingAllReports: true,
                errorAllReports: null
            };

        case ALL_REPORTS_GET_FAILURE:
            return {
                allReports: {},
                loadingAllReports: false,
                errorAllReports: action.payload
            };

        default:
            return state;
    }

};