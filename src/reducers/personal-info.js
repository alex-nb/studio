import { userAccountPageTypes } from '../actions/types';

const initialState = {
    info: {},
    balanceHistory: {},
    paginationBalanceHistory: {
        currentPage: 1,
        hasNextPage: false,
        hasPreviousPage: false,
        nextPage: 0,
        previousPage: 0,
        lastPage: 0,
    },
    departments: [],
    loadingPersonalInfo: true,
    loadingBalanceHistory: true,
    updatingPersonalInfo: false,
    errorPersonalInfo: null,
    errorBalanceHistory: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case userAccountPageTypes.PERSONAL_INFO_GET:
            return {
                ...state,
                info: action.payload.employee,
                departments: action.payload.departments,
                errorPersonalInfo: null,
                loadingPersonalInfo: false
            };

        case userAccountPageTypes.PERSONAL_INFO_GET_FAILURE:
            return {
                ...state,
                info: [],
                errorPersonalInfo: action.payload,
                loadingPersonalInfo: false
            };

        case userAccountPageTypes.PERSONAL_INFO_LOAD:
            return {
                ...state,
                updatingPersonalInfo: true
            };

        case userAccountPageTypes.PERSONAL_INFO_UPDATE:
            return {
                ...state,
                info: action.payload,
                updatingPersonalInfo: false,
                errorPersonalInfo: null
            };

        case userAccountPageTypes.PERSONAL_INFO_UPDATE_FAILURE:
            return {
                ...state,
                //updatingPersonalInfo: false,
                errorPersonalInfo: action.payload
            };

        case userAccountPageTypes.BALANCE_HISTORY_GET:
            return {
                ...state,
                balanceHistory: action.payload.balanceHistory,
                paginationBalanceHistory: {
                    currentPage: action.payload.currentPage,
                    hasNextPage: action.payload.hasNextPage,
                    hasPreviousPage: action.payload.hasPreviousPage,
                    nextPage: action.payload.nextPage,
                    previousPage: action.payload.previousPage,
                    lastPage: action.payload.lastPage,
                    loadingBalanceHistory: false
                },
                loadingBalanceHistory: false
            };

        case userAccountPageTypes.BALANCE_HISTORY_GET_FAILURE:
            return {
                ...state,
                errorBalanceHistory: action.payload,
                loadingBalanceHistory: false
            };

        default:
            return state;
    }

};