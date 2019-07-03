import { commonInfoTypes } from '../actions/types';

const initialState = {
    selected: '',
};

export default function (state = initialState, action) {
    switch (action.type) {
        case commonInfoTypes.CHANGE_SELECTED_MENU:
            return {
                selected: action.payload
            };

        default:
            return state;
    }

};