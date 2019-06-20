import { expendituresPageTypes } from '../actions/types';

const initialState = {
    expenditure: [],
    loadingExpenditure: true,
    errorExpenditure: null
};

export default function (state = initialState, action) {

    switch (action.type) {
        case expendituresPageTypes.EXPENDITURE_GET_REQUEST:
            return {
                expenditure: [],
                loadingExpenditure: true,
                errorExpenditure: null
            };

        case expendituresPageTypes.EXPENDITURE_GET_SUCCESS:
            return {
                expenditure: action.payload,
                loadingExpenditure: false,
                errorExpenditure: null
            };

        case expendituresPageTypes.EXPENDITURE_GET_FAILURE:
            return {
                expenditure: [],
                loadingExpenditure: false,
                errorExpenditure: action.payload
            };

        default:
            return state;
    }

};