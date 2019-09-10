import {projectsPageTypes} from '../actions/types';

const initialState = {
    projectsNew: [],
    projectsClose: [],
    projectsProcess: [],
    project: {},
    loadingProject: true,
    loadingNew: true,
    loadingProcess: true,
    loadingClose: true,
    loadingUpdateProject: false,
    errorProject: null,
    errorProjectsNew: null,
    errorProjectsProcess: null,
    errorProjectsClose: null
};

export default function (state = initialState, action) {

    switch (action.type) {

        case projectsPageTypes.CURRENT_PROJECT_GET:
            return {
                ...state,
                project: action.payload,
                loadingProject: false,
                errorProject: null
            };

        case projectsPageTypes.PROJECT_LOAD:
            return {
                ...state,
                loadingUpdateProject: true,
            };

        case projectsPageTypes.CURRENT_PROJECT_GET_FAILURE:
            return {
                ...state,
                project: {},
                loadingProject: false,
                errorProject: action.payload
            };

        case projectsPageTypes.PROJECTS_NEW_GET:
            return {
                ...state,
                projectsNew: action.payload,
                loadingNew: false,
                errorProjectsNew: null
            };

        case projectsPageTypes.PROJECTS_NEW_GET_FAILURE:
            return {
                ...state,
                projectsNew: [],
                loadingNew: false,
                errorProjectsNew: action.payload
            };

        case projectsPageTypes.PROJECTS_PROCESS_GET:
            return {
                ...state,
                projectsProcess: action.payload,
                loadingProcess: false,
                errorProjectsProcess: null
            };

        case projectsPageTypes.PROJECTS_PROCESS_GET_FAILURE:
            return {
                ...state,
                projectsProcess: [],
                loadingProcess: false,
                errorProjectsProcess: action.payload
            };

        case projectsPageTypes.PROJECTS_CLOSE_GET:
            return {
                ...state,
                projectsClose: action.payload,
                loadingClose: false,
                errorProjectsClose: null
            };

        case projectsPageTypes.PROJECTS_CLOSE_GET_FAILURE:
            return {
                ...state,
                projectsClose: [],
                loadingClose: false,
                errorProjectsClose: action.payload
            };

        case projectsPageTypes.PROJECT_UPDATE:
            return {
                ...state,
                project: {},
                loadingUpdateProject: false
            };

        case projectsPageTypes.PROJECT_UPDATE_FAILURE:
            return {
                ...state,
                loadingUpdateProject: false
            };

        case projectsPageTypes.PROJECT_CLOSE:
            return {
                ...state,
                project: {},
                loadingUpdateProject: false
            };

        case projectsPageTypes.PROJECT_CLOSE_FAILURE:
            return {
                ...state,
                loadingUpdateProject: false
            };

        case projectsPageTypes.REPORT_ADD:
            return {
                ...state,
                projectsProcess: state.projectsProcess.map(project =>
                    project._id === action.payload._id ? action.payload : project
                ),
                loadingProcess: false,
                errorProjectsProcess: null
            };

        case projectsPageTypes.REPORT_ADD_FAILURE:
            return {
                ...state,
                loadingProcess: false,
                errorProjectsProcess: action.payload
            };

        case projectsPageTypes.PROJECT_START:
            return {
                ...state,
                projectsProcess: [
                    ...state.projectsProcess,
                    action.payload
                ],
                projectsNew: state.projectsNew.filter(project => project._id !== action.payload._id),
                loadingProject: false,
                errorProject: null
            };

        case projectsPageTypes.PROJECT_START_FAILURE:
            return {
                ...state,
                loadingProject: false,
                errorProject: action.payload
            };

        case projectsPageTypes.CREATE_PROJECT_FAILURE:
        case projectsPageTypes.CREATE_PROJECT:
            return {
                ...state,
                loadingUpdateProject: false
            };

        default:
            return state;
    }

};