import uuid from 'uuid';
import { commonInfoTypes } from './types';

export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
    const id = uuid.v4();
    dispatch({
        type: commonInfoTypes.SET_ALERT,
        payload: { msg, alertType, id }
    });

    setTimeout(() => dispatch({ type: commonInfoTypes.REMOVE_ALERT, payload: id }), timeout);
};