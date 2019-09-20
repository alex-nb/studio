import { commonInfoTypes } from '../actions/types';

const initialState = [];

export default alert = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case commonInfoTypes.SET_ALERT:
            return [...state, payload];
        case commonInfoTypes.REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
}