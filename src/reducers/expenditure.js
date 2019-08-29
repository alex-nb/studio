import { expendituresPageTypes } from '../actions/types';

const initialState = {
    expenditure: [],
    loadingExpenditure: true,
    errorExpenditure: null
};

export default function (state = initialState, action) {

    switch (action.type) {
        case expendituresPageTypes.EXPENDITURE_GET:
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

        case expendituresPageTypes.UPDATE_EXPENDITURE:
            if (state.expenditure.find(exp => exp._id===action.payload._id)) {
                return {
                    expenditure: state.expenditure.map(exp => {
                        if (exp._id===action.payload._id) return action.payload;
                        return exp;
                    }),
                    loadingExpenditure: false,
                    errorExpenditure: null
                };
            }
            return {
                expenditure: [
                    ...state.expenditure,
                    action.payload
                ],
                loadingExpenditure: false,
                errorExpenditure: null
            };

        case expendituresPageTypes.UPDATE_EXPENDITURE_FAILURE:
            return {
                ...state,
                loadingExpenditure: false,
                errorExpenditure: action.payload
            };

        default:
            return state;
    }

};