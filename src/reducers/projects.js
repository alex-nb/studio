import {
    PROJECTS_NEW_GET_SUCCESS,
    PROJECTS_NEW_GET_REQUEST,
    PROJECTS_NEW_GET_FAILURE,
    PROJECTS_PROCESS_GET_SUCCESS,
    PROJECTS_PROCESS_GET_REQUEST,
    PROJECTS_PROCESS_GET_FAILURE,
    PROJECTS_CLOSE_GET_SUCCESS,
    PROJECTS_CLOSE_GET_REQUEST,
    PROJECTS_CLOSE_GET_FAILURE,
    PERSONAL_REPORTS_GET_SUCCESS,
    PERSONAL_REPORTS_GET_REQUEST,
    PERSONAL_REPORTS_GET_FAILURE
} from '../actions/types';

const initialState = {
    projectsNew: [],
    projectsClose: [],
    projectsProcess: [],
    allReports: [],
    loadingNew: true,
    loadingProcess: true,
    loadingClose: true,
    loadingAllReports: true,
    errorProjectsNew: null,
    errorProjectsProcess: null,
    errorProjectsClose: null,
    errorAllReports: null,
};

export default function (state = initialState, action) {

    switch (action.type) {
        case PROJECTS_NEW_GET_SUCCESS:
            return {
                ...state,
                projectsNew: action.payload,
                loadingNew: false,
                errorProjectsNew: null
            };

        case PROJECTS_NEW_GET_REQUEST:
            return {
                ...state,
                projectsNew: [],
                loadingNew: true,
                errorProjectsNew: null
            };

        case PROJECTS_NEW_GET_FAILURE:
            return {
                ...state,
                projectsNew: [],
                loadingNew: false,
                errorProjectsNew: action.payload
            };

        case PROJECTS_PROCESS_GET_SUCCESS:
            return {
                ...state,
                projectsProcess: action.payload,
                loadingProcess: false,
                errorProjectsProcess: null
            };

        case PROJECTS_PROCESS_GET_REQUEST:
            return {
                ...state,
                projectsProcess: [],
                loadingProcess: true,
                errorProjectsProcess: null
            };

        case PROJECTS_PROCESS_GET_FAILURE:
            return {
                ...state,
                projectsProcess: [],
                loadingProcess: false,
                errorProjectsProcess: action.payload
            };

        case PROJECTS_CLOSE_GET_SUCCESS:
            return {
                ...state,
                projectsClose: action.payload,
                loadingClose: false,
                errorProjectsClose: null
            };

        case PROJECTS_CLOSE_GET_REQUEST:
            return {
                ...state,
                projectsClose: [],
                loadingClose: true,
                errorProjectsClose: null
            };

        case PROJECTS_CLOSE_GET_FAILURE:
            return {
                ...state,
                projectsClose: [],
                loadingClose: false,
                errorProjectsClose: action.payload
            };

        case PERSONAL_REPORTS_GET_SUCCESS:
            return {
                ...state,
                personalReports: action.payload,
                loadingPersonalReports: false,
                errorPersonalReports: null
            };

        case PERSONAL_REPORTS_GET_REQUEST:
            return {
                ...state,
                personalReports: [],
                loadingPersonalReports: true,
                errorPersonalReports: null
            };

        case PERSONAL_REPORTS_GET_FAILURE:
            return {
                ...state,
                personalReports: [],
                loadingPersonalReports: false,
                errorPersonalReports: action.payload
            };

        default:
            return state;
    }

};