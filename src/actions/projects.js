import {projectsPageTypes, reportsPageTypes} from './types';
import {projectsPageAPI} from './api-endpoints';

import axios from 'axios';

const projectLoaded = (project) => ({
    type: projectsPageTypes.GET_CURRENT_PROJECT,
    payload: project
});
const projectError = (error) => ({
    type: projectsPageTypes.GET_CURRENT_PROJECT_FAILURE,
    payload: error
});

const projectsNewLoaded = (listProjects) => ({
    type: projectsPageTypes.PROJECTS_NEW_GET,
    payload: listProjects
});
const projectsNewError = (error) => ({
    type: projectsPageTypes.PROJECTS_NEW_GET_FAILURE,
    payload: error
});

const projectsProcessLoaded = (listProjects) => ({
    type: projectsPageTypes.PROJECTS_PROCESS_GET,
    payload: listProjects
});
const projectsProcessError = (error) => ({
    type: projectsPageTypes.PROJECTS_PROCESS_GET_FAILURE,
    payload: error
});

const projectsCloseLoaded = (listProjects) => ({
    type: projectsPageTypes.PROJECTS_CLOSE_GET,
    payload: listProjects
});
const projectsCloseError = (error) => ({
    type: projectsPageTypes.PROJECTS_CLOSE_GET_FAILURE,
    payload: error
});

export const getCurrentProject = (id) => async dispatch => {
    try {
        const res = await axios.get(projectsPageAPI.GET_PROJECT+id);
        dispatch(projectLoaded(res.data.project));
    } catch (err) {
        console.error('Get project '+id+'. '+err);
        dispatch(projectError(err));
    }
};

export const fetchAllProjects = () => async dispatch => {
    try {
        const res = await axios.get(projectsPageAPI.GET_PROCESS_PROJECTS);
        dispatch(projectsProcessLoaded(res.data.projects));
    } catch (err) {
        console.error('Get process projects. '+err);
        dispatch(projectsProcessError(err));
    }
    try {
        const res = await axios.get(projectsPageAPI.GET_CLOSE_PROJECTS);
        dispatch(projectsCloseLoaded(res.data.projects));
    } catch (err) {
        console.error('Get close projects. '+err);
        dispatch(projectsCloseError(err));
    }
    try {
        const res = await axios.get(projectsPageAPI.GET_NEW_PROJECTS);
        dispatch(projectsNewLoaded(res.data.projects));
    } catch (err) {
        console.error('Get new projects. '+err);
        dispatch(projectsNewError(err));
    }
};

export const updateProject = (formData, history) => async dispatch => {
    console.log(formData);
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post(projectsPageAPI.UPDATE_PROJECT, formData, config);
        dispatch({
            type: projectsPageAPI.UPDATE_PROJECT,
            payload: res.data
        });
        history.push('/projects');
        //dispatch(setAlert('Post Created', 'success'));
    } catch (err) {
        console.error('Update project. '+err);
        dispatch({
            type: projectsPageAPI.UPDATE_PROJECT_FAILURE,
            payload: err
        });
    }
};