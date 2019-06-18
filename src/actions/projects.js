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
} from './types';

import axios from 'axios';

const projectsNewLoaded = (listProjects) => {
    return {
        type: PROJECTS_NEW_GET_SUCCESS,
        payload: listProjects
    };
};

const projectsNewRequested = () => {
    return {
        type: PROJECTS_NEW_GET_REQUEST
    };
};

const projectsNewError = (error) => {
    return {
        type: PROJECTS_NEW_GET_FAILURE,
        payload: error
    };
};

const projectsProcessLoaded = (listProjects) => {
    return {
        type: PROJECTS_PROCESS_GET_SUCCESS,
        payload: listProjects
    };
};

const projectsProcessRequested = () => {
    return {
        type: PROJECTS_PROCESS_GET_REQUEST
    };
};

const projectsProcessError = (error) => {
    return {
        type: PROJECTS_PROCESS_GET_FAILURE,
        payload: error
    };
};

const projectsCloseLoaded = (listProjects) => {
    return {
        type: PROJECTS_CLOSE_GET_SUCCESS,
        payload: listProjects
    };
};

const projectsCloseRequested = () => {
    return {
        type:  PROJECTS_CLOSE_GET_REQUEST
    };
};

const projectsCloseError = (error) => {
    return {
        type: PROJECTS_CLOSE_GET_FAILURE,
        payload: error
    };
};

const personalReportsRequested = () => {
    return {
        type: PERSONAL_REPORTS_GET_REQUEST
    };
};

const personalReportsLoaded = (personalReports) => {
    return {
        type: PERSONAL_REPORTS_GET_SUCCESS,
        payload: personalReports
    };
};

const personalReportsError = (error) => {
    return {
        type: PERSONAL_REPORTS_GET_FAILURE,
        payload: error
    };
};

export const fetchPersonalReports = () => async dispatch => {
    dispatch(personalReportsRequested());
    try {
        const res = {
            4: [
                {
                    id: 1,
                    project_id: 4,
                    date: '28.02.2019',
                    reportText: 'Написал модуль синхронизации желаний заказчика со здравым смыслом.',
                    time: '7h',
                    status: 1
                },
                {
                    id: 2,
                    project_id: 4,
                    date: '14.03.2019',
                    reportText: 'Встретил Матушку, сходили в церковь. Помолился за наше мобильное приложение, поставил свечку. Должно сработать.',
                    time: '4h',
                    status: 0
                }
            ],
            5: [
                {
                    id: 3,
                    project_id: 5,
                    date: '17.04.2019',
                    reportText: 'Я сделал чертеж водонагревающей башни. Возможно это пригодится.',
                    time: '8h',
                    status: -1
                }
            ]
        };
        dispatch(personalReportsLoaded(res));
    } catch (err) {
        dispatch(personalReportsError(err));
    }
    /*dispatch(personalReportsRequested());
    bdApiService.getPersonalReports()
        .then((personalReports) => dispatch(personalReportsLoaded(personalReports)))
        .catch((err) => dispatch(personalReportsError(err)));*/
};

export const fetchAllProjects = () => async dispatch => {
    dispatch(projectsProcessRequested());
    try {
        const res = await axios.get('/projects/process');
        dispatch(projectsProcessLoaded(res));
    } catch (err) {
        dispatch(projectsProcessError(err));
    }
    dispatch(projectsCloseRequested());
    try {
        const res = await axios.get('/projects/close');
        dispatch(projectsCloseLoaded(res));
    } catch (err) {
        dispatch(projectsCloseError(err));
    }
    dispatch(projectsNewRequested());
    try {
        const res = await axios.get('/projects/new');
        dispatch(projectsNewLoaded(res));
    } catch (err) {
        dispatch(projectsNewError(err));
    }
    /*dispatch(projectsProcessRequested());
    bdApiService.getProjectsProcess()
        .then((projectsProcess) => dispatch(projectsProcessLoaded(projectsProcess)))
        .catch((err) => dispatch(projectsProcessError(err)));
    dispatch(projectsCloseRequested());
    bdApiService.getProjectsClose()
        .then((projectsClose) => dispatch(projectsCloseLoaded(projectsClose)))
        .catch((err) => dispatch(projectsCloseError(err)));
    dispatch(projectsNewRequested());
    bdApiService.getProjectsNew()
        .then((projectsNew) => dispatch(projectsNewLoaded(projectsNew)))
        .catch((err) => dispatch(projectsNewError(err)));*/
};