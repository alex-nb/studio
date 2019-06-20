import { projectsPageTypes } from './types';
import { projectsPageAPI } from './api-endpoints';

import axios from 'axios';

const projectsNewLoaded = (listProjects) => ({
    type: projectsPageTypes.PROJECTS_NEW_GET_SUCCESS,
    payload: listProjects
});

const projectsNewRequested = () => ({
    type: projectsPageTypes.PROJECTS_NEW_GET_REQUEST
});

const projectsNewError = (error) => ({
    type: projectsPageTypes.PROJECTS_NEW_GET_FAILURE,
    payload: error
});

const projectsProcessLoaded = (listProjects) => ({
    type: projectsPageTypes.PROJECTS_PROCESS_GET_SUCCESS,
    payload: listProjects
});

const projectsProcessRequested = () => ({
    type: projectsPageTypes.PROJECTS_PROCESS_GET_REQUEST
});

const projectsProcessError = (error) => ({
    type: projectsPageTypes.PROJECTS_PROCESS_GET_FAILURE,
    payload: error
});

const projectsCloseLoaded = (listProjects) => ({
    type: projectsPageTypes.PROJECTS_CLOSE_GET_SUCCESS,
    payload: listProjects
});

const projectsCloseRequested = () => ({
    type:  projectsPageTypes.PROJECTS_CLOSE_GET_REQUEST
});

const projectsCloseError = (error) => ({
    type: projectsPageTypes.PROJECTS_CLOSE_GET_FAILURE,
    payload: error
});

const personalReportsRequested = () => ({
    type: projectsPageTypes.PERSONAL_REPORTS_GET_REQUEST
});

const personalReportsLoaded = (personalReports) => ({
    type: projectsPageTypes.PERSONAL_REPORTS_GET_SUCCESS,
    payload: personalReports
});

const personalReportsError = (error) => ({
    type: projectsPageTypes.PERSONAL_REPORTS_GET_FAILURE,
    payload: error
});

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
};

export const fetchAllProjects = () => async dispatch => {
    dispatch(projectsProcessRequested());
    try {
        const res = await axios.get(projectsPageAPI.GET_PROCESS_PROJECTS);
        dispatch(projectsProcessLoaded(res.data.projects));
    } catch (err) {
        dispatch(projectsProcessError(err));
    }
    dispatch(projectsCloseRequested());
    try {
        const res = await axios.get(projectsPageAPI.GET_CLOSE_PROJECTS);
        dispatch(projectsCloseLoaded(res.data.projects));
    } catch (err) {
        dispatch(projectsCloseError(err));
    }
    dispatch(projectsNewRequested());
    try {
        const res = await axios.get(projectsPageAPI.GET_NEW_PROJECTS);
        dispatch(projectsNewLoaded(res.data.projects));
    } catch (err) {
        dispatch(projectsNewError(err));
    }
};