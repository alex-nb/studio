import {projectsPageTypes} from './types';
import {projectsPageAPI} from './api-endpoints';
import { setAlert } from './alert';
import axios from 'axios';

export const getCurrentProject = (id) => async dispatch => {
    try {
        const res = await axios.get(projectsPageAPI.GET_PROJECT+id);
        dispatch({
            type: projectsPageTypes.CURRENT_PROJECT_GET,
            payload: res.data.project
        });
    } catch (err) {
        console.error(err);
        if (err.response && err.response.data && err.response.data.errors) {
            const errors = err.response.data.errors;
            if (errors) {
                await errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }
        }
        dispatch({
            type: projectsPageTypes.CURRENT_PROJECT_GET_FAILURE,
            payload: err
        });
    }
};

export const fetchAllProjects = () => async dispatch => {
    try {
        const res = await axios.get(projectsPageAPI.GET_PROCESS_PROJECTS);
        dispatch({
            type: projectsPageTypes.PROJECTS_PROCESS_GET,
            payload: res.data.projects
        });
    } catch (err) {
        console.error('Get process projects. '+err);
        dispatch({
            type: projectsPageTypes.PROJECTS_PROCESS_GET_FAILURE,
            payload: err
        });
    }
    try {
        const res = await axios.get(projectsPageAPI.GET_CLOSE_PROJECTS);
        dispatch({
            type: projectsPageTypes.PROJECTS_CLOSE_GET,
            payload: res.data.projects
        });
    } catch (err) {
        console.error('Get close projects. '+err);
        dispatch({
            type: projectsPageTypes.PROJECTS_CLOSE_GET_FAILURE,
            payload: err
        });
    }
    try {
        const res = await axios.get(projectsPageAPI.GET_NEW_PROJECTS);
        dispatch({
            type: projectsPageTypes.PROJECTS_NEW_GET,
            payload: res.data.projects
        });
    } catch (err) {
        console.error('Get new projects. '+err);
        /*const errors = err.response.data.errors;
        if (errors) {
            await errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }*/
        dispatch({
            type: projectsPageTypes.PROJECTS_NEW_GET_FAILURE,
            payload: err
        });
    }
};

export const addReport = formData => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post(projectsPageAPI.ADD_REPORT, formData, config);
        dispatch({
            type: projectsPageTypes.REPORT_ADD,
            payload: res.data.project
        });
        dispatch(setAlert('Отчет добавлен', 'success'));
    } catch (err) {
        console.error(err);
        if (err.response && err.response.data && err.response.data.errors) {
            const errors = err.response.data.errors;
            if (errors) {
                await errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }
        }
        /*dispatch({
            type: projectsPageTypes.ADD_REPORT_FAILURE,
            payload: err
        });*/
    }
};

export const updateProject = (formData, history) => async dispatch => {
    dispatch({
        type: projectsPageTypes.PROJECT_LOAD
    });
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post(projectsPageAPI.UPDATE_PROJECT, formData, config);
        dispatch({
            type: projectsPageTypes.PROJECT_UPDATE,
            payload: res.data.project
        });
        history.push('/projects');
    } catch (err) {
        console.error(err);
        if (err.response && err.response.data && err.response.data.errors) {
            const errors = err.response.data.errors;
            if (errors) {
                await errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }
        }
        dispatch({
            type: projectsPageTypes.PROJECT_UPDATE_FAILURE
        });
    }
};

export const closeProject = (formData, history) => async  dispatch => {
    dispatch({
        type: projectsPageTypes.PROJECT_LOAD
    });
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post(projectsPageAPI.CLOSE_PROJECT, formData, config);
        dispatch({
            type: projectsPageTypes.PROJECT_CLOSE,
            payload: res.data.project
        });
        history.push('/projects');
    } catch (err) {
        console.error(err);
        if (err.response && err.response.data && err.response.data.errors) {
            const errors = err.response.data.errors;
            if (errors) {
                await errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }
        }
        dispatch({
            type: projectsPageTypes.PROJECT_CLOSE_FAILURE
        });
    }
};

export const startProject = (id) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post(projectsPageAPI.START_PROJECT, {id: id}, config);
        dispatch({
            type: projectsPageTypes.PROJECT_START,
            payload: res.data.project
        });
    } catch (err) {
        console.error(err);
        if (err.response && err.response.data && err.response.data.errors) {
            const errors = err.response.data.errors;
            if (errors) {
                await errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }
        }
        /*dispatch({
            type: projectsPageTypes.START_PROJECT_FAILURE,
            payload: err
        });*/
    }
};

export const createProject = (formData, history) => async dispatch => {
    dispatch({
        type: projectsPageTypes.PROJECT_LOAD
    });
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post(projectsPageAPI.CREATE_PROJECT, formData, config);
        dispatch({
            type: projectsPageTypes.CREATE_PROJECT,
            payload: res.data.project
        });
        history.push('/projects');
    } catch (err) {
        console.error(err);
        if (err.response && err.response.data && err.response.data.errors) {
            const errors = err.response.data.errors;
            if (errors) {
                await errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }
        }
        dispatch({
            type: projectsPageTypes.CREATE_PROJECT_FAILURE
        });
    }
};