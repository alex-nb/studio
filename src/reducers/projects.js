import { projectsPageTypes } from '../actions/types';

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
        case projectsPageTypes.PROJECTS_NEW_GET_SUCCESS:
            return {
                ...state,
                projectsNew: action.payload,
                loadingNew: false,
                errorProjectsNew: null
            };

        case projectsPageTypes.PROJECTS_NEW_GET_REQUEST:
            return {
                ...state,
                projectsNew: [],
                loadingNew: true,
                errorProjectsNew: null
            };

        case projectsPageTypes.PROJECTS_NEW_GET_FAILURE:
            return {
                ...state,
                projectsNew: [],
                loadingNew: false,
                errorProjectsNew: action.payload
            };

        case projectsPageTypes.PROJECTS_PROCESS_GET_SUCCESS:
            return {
                ...state,
                projectsProcess: action.payload,
                loadingProcess: false,
                errorProjectsProcess: null
            };

        case projectsPageTypes.PROJECTS_PROCESS_GET_REQUEST:
            return {
                ...state,
                projectsProcess: [],
                loadingProcess: true,
                errorProjectsProcess: null
            };

        case projectsPageTypes.PROJECTS_PROCESS_GET_FAILURE:
            return {
                ...state,
                projectsProcess: [],
                loadingProcess: false,
                errorProjectsProcess: action.payload
            };

        case projectsPageTypes.PROJECTS_CLOSE_GET_SUCCESS:
            return {
                ...state,
                projectsClose: action.payload,
                loadingClose: false,
                errorProjectsClose: null
            };

        case projectsPageTypes.PROJECTS_CLOSE_GET_REQUEST:
            return {
                ...state,
                projectsClose: [],
                loadingClose: true,
                errorProjectsClose: null
            };

        case projectsPageTypes.PROJECTS_CLOSE_GET_FAILURE:
            return {
                ...state,
                projectsClose: [],
                loadingClose: false,
                errorProjectsClose: action.payload
            };

        case projectsPageTypes.PERSONAL_REPORTS_GET_SUCCESS:
            return {
                ...state,
                personalReports: action.payload,
                loadingPersonalReports: false,
                errorPersonalReports: null
            };

        case projectsPageTypes.PERSONAL_REPORTS_GET_REQUEST:
            return {
                ...state,
                personalReports: [],
                loadingPersonalReports: true,
                errorPersonalReports: null
            };

        case projectsPageTypes.PERSONAL_REPORTS_GET_FAILURE:
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