import { expendituresPageTypes } from '../actions/types';

const initialState = {
    expenditure: [],
    loadingExpenditure: true,
    loadingUpdateExpenditure: false,
    errorExpenditure: null,
    errorUpdateExpenditure: null
};

export default function (state = initialState, action) {

    switch (action.type) {
        case expendituresPageTypes.EXPENDITURE_GET:
            return {
                ...state,
                expenditure: action.payload,
                loadingExpenditure: false,
                errorExpenditure: null
            };

        case expendituresPageTypes.EXPENDITURE_GET_FAILURE:
            return {
                ...state,
                expenditure: [],
                loadingExpenditure: false,
                errorExpenditure: action.payload
            };

        case expendituresPageTypes.EXPENDITURE_LOAD:
            return {
                ...state,
                loadingUpdateExpenditure: true
            };

        case expendituresPageTypes.EXPENDITURE_UPDATE:
            if (state.expenditure.find(exp => exp._id===action.payload._id)) {
                return {
                    expenditure: state.expenditure.map(exp => {
                        if (exp._id===action.payload._id) return action.payload;
                        return exp;
                    }),
                    loadingUpdateExpenditure: false,
                    errorUpdateExpenditure: null
                };
            }
            return {
                expenditure: [
                    ...state.expenditure,
                    action.payload
                ],
                loadingUpdateExpenditure: false,
                errorUpdateExpenditure: null
            };

        case expendituresPageTypes.EXPENDITURE_UPDATE_FAILURE:
            return {
                ...state,
                loadingUpdateExpenditure: false,
                errorUpdateExpenditure: action.payload
            };

        default:
            return state;
    }

};