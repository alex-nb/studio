import { reportsPageTypes } from '../actions/types';

const initialState = {
    allReports: [],
    loadingAllReports: true,
    errorAllReports: null,
    errorAddReport: null
};

export default function (state = initialState, action) {

    switch (action.type) {
        case reportsPageTypes.ALL_REPORTS_GET:
            return {
                ...state,
                allReports: action.payload,
                loadingAllReports: false,
                errorAllReports: null
            };

        case reportsPageTypes.ALL_REPORTS_GET_FAILURE:
            return {
                ...state,
                allReports: {},
                loadingAllReports: false,
                errorAllReports: action.payload
            };

        case reportsPageTypes.ADD_REPORT:
            return {
                ...state,
                allReports: [action.payload, ...state.allReports],
                loadingAllReports: false,
            };

        case reportsPageTypes.ADD_REPORT_FAILURE:
            return {
                ...state,
                loadingAllReports: false,
                errorAddReport: action.payload
            };

        default:
            return state;
    }

};