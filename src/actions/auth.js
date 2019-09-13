import { authTypes } from './types';
import { authAPI } from './api-endpoints';
import {setAlert} from "./alert";
import axios from 'axios';


// Register User
export const signup = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ name, email, password });

    dispatch({
        type: authTypes.USER_LOAD
    });

    try {
        const res = await axios.put(authAPI.SIGNUP, body, config);

        dispatch({
            type: authTypes.REGISTER_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        console.error('Register user. '+err);
        dispatch({
            type: authTypes.REGISTER_FAIL,
            payload: err
        });
    }
};

// Login User
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    dispatch({
        type: authTypes.USER_LOAD
    });

    try {
        const res = await axios.post(authAPI.LOGIN, body, config);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.userId);
        localStorage.setItem('roles', JSON.stringify(res.data.roles));
        dispatch({
            type: authTypes.LOGIN_SUCCESS,
            payload: res.data
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
            type: authTypes.LOGIN_FAIL,
            payload: err
        });
    }
};

// Logout
export const logout = () => dispatch => {
    localStorage.clear();
    dispatch({ type: authTypes.LOGOUT });
};
