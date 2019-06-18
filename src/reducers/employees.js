import {
    EMPLOYEES_GET_SUCCESS,
    EMPLOYEES_GET_REQUEST,
    EMPLOYEES_GET_FAILURE,
    DEPARTMENTS_GET_SUCCESS,
    DEPARTMENTS_GET_REQUEST,
    DEPARTMENTS_GET_FAILURE,
    DEPARTMENT_ORDER_GET_SUCCESS,
    DEPARTMENT_ORDER_GET_REQUEST,
    DEPARTMENT_ORDER_GET_FAILURE,
    ALL_EMPLOYEES_LIST_GET_SUCCESS,
    ALL_EMPLOYEES_LIST_GET_REQUEST,
    ALL_EMPLOYEES_LIST_GET_FAILURE
} from '../actions/types';

const initialState = {
    employees: {},
    departments: {},
    departmentOrder: {},
    allEmployeesList: [],
    loadingEmployees: true,
    loadingDepartmentOrder: true,
    loadingDepartments: true,
    loadingAllEmployeesList: true,
    errorEmployees: null,
    errorDepartments: null,
    errorDepartmentOrder: null,
    errorAllEmployeesList: null,
};

export default function (state = initialState, action) {

    switch (action.type) {
        /*case 'EMPLOYEE_NEW_ADD':
            console.log("reducer EMPLOYEE_NEW_ADD");
            console.log(action.payload);
            const newEmployee = {
                id: 8,
                name: `${action.payload.lastName} ${action.payload.firstName} ${action.payload.secondName}`,
            };
            console.log(newEmployee);
            return {
                ...state,
                allEmployeesList: [
                    ...state.allEmployeesList,
                    newEmployee
                ],
            };*/

        case EMPLOYEES_GET_SUCCESS:
            return {
                ...state,
                employees: action.payload,
                loadingEmployees: false,
                errorEmployees: null
            };

        case EMPLOYEES_GET_REQUEST:
            return {
                ...state,
                employees: {},
                loadingEmployees: true,
                errorEmployees: null
            };

        case EMPLOYEES_GET_FAILURE:
            return {
                ...state,
                employees: {},
                loadingEmployees: false,
                errorEmployees: action.payload
            };

        case DEPARTMENTS_GET_SUCCESS:
            return {
                ...state,
                departments: action.payload,
                loadingDepartments: false,
                errorDepartments: null
            };

        case DEPARTMENTS_GET_REQUEST:
            return {
                ...state,
                departments: {},
                loadingDepartments: true,
                errorDepartments: null
            };

        case DEPARTMENTS_GET_FAILURE:
            return {
                ...state,
                departments: {},
                loadingDepartments: false,
                errorDepartments: action.payload
            };

        case DEPARTMENT_ORDER_GET_SUCCESS:
            return {
                ...state,
                departmentOrder: action.payload,
                loadingDepartmentOrder: false,
                errorDepartmentOrder: null
            };

        case DEPARTMENT_ORDER_GET_REQUEST:
            return {
                ...state,
                departmentOrder: {},
                loadingDepartmentOrder: true,
                errorDepartmentOrder: null
            };

        case DEPARTMENT_ORDER_GET_FAILURE:
            return {
                ...state,
                departmentOrder: {},
                loadingProcess: false,
                errorDepartmentOrder: action.payload
            };

        case ALL_EMPLOYEES_LIST_GET_SUCCESS:
            return {
                ...state,
                allEmployeesList: action.payload,
                loadingAllEmployeesList: false,
                errorAllEmployeesList: null
            };

        case ALL_EMPLOYEES_LIST_GET_REQUEST:
            return {
                ...state,
                allEmployeesList: [],
                loadingAllEmployeesList: true,
                errorAllEmployeesList: null
            };

        case ALL_EMPLOYEES_LIST_GET_FAILURE:
            return {
                ...state,
                allEmployeesList: [],
                loadingAllEmployeesList: false,
                errorAllEmployeesList: action.payload
            };

        default:
            return state;
    }

};