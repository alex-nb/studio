import { commonInfoTypes } from './types';


export const changeSelected = dataSelected => dispatch => {
    dispatch({
        type: commonInfoTypes.CHANGE_SELECTED_MENU,
        payload: dataSelected
    });
};