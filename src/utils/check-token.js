import jwt from 'jsonwebtoken';
import axios from "axios";
import {authTypes} from "../actions/types";
require('dotenv').config();

const checkTokenExpirationMiddleware = store => next => action => {
    const token = localStorage.getItem('token');
    axios.defaults.baseURL = process.env.REACT_APP_API_PROTOCOL+'://'+process.env.REACT_APP_API_HOST;
    if (token) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        if (jwt.decode(token).exp < Date.now() / 1000) {
            localStorage.clear();
            next({ type: authTypes.LOGOUT });
        }
    }
    else {
        delete axios.defaults.headers.common['Authorization'];
    }
    next(action);
};
export default checkTokenExpirationMiddleware;