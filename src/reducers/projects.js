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
    errorProject: null,
    errorProjectsNew: null,
    errorProjectsProcess: null,
    errorProjectsClose: null
};

export default function (state = initialState, action) {

    switch (action.type) {

        case projectsPageTypes.GET_CURRENT_PROJECT:
            return {
                ...state,
                project: action.payload,
                loadingProject: false,
                errorProject: null
            };

        case projectsPageTypes.GET_CURRENT_PROJECT_FAILURE:
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

        case projectsPageTypes.UPDATE_PROJECT:
            return {
                ...state,
                project: action.payload,
                loadingProject: false,
                errorProject: null
            };

        case projectsPageTypes.UPDATE_PROJECT_FAILURE:
            return {
                ...state,
                project: {},
                loadingProject: false,
                errorProject: action.payload
            };

        case projectsPageTypes.CLOSE_PROJECT:
            return {
                ...state,
                project: action.payload,
                loadingProject: false,
                errorProject: null
            };

        case projectsPageTypes.CLOSE_PROJECT_FAILURE:
            return {
                ...state,
                project: {},
                loadingProject: false,
                errorProject: action.payload
            };

        case projectsPageTypes.ADD_REPORT:
            return {
                ...state,
                projectsProcess: state.projectsProcess.map(project =>
                    project._id === action.payload._id ? action.payload : project
                ),
                loadingProcess: false,
                errorProjectsProcess: null
            };

        case projectsPageTypes.ADD_REPORT_FAILURE:
            return {
                ...state,
                loadingProcess: false,
                errorProjectsProcess: action.payload
            };

        default:
            return state;
    }

};