import { employeesPageTypes } from '../actions/types';

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

        case employeesPageTypes.EMPLOYEES_GET_SUCCESS:
            return {
                ...state,
                employees: action.payload,
                loadingEmployees: false,
                errorEmployees: null
            };

        case employeesPageTypes.EMPLOYEES_GET_REQUEST:
            return {
                ...state,
                employees: {},
                loadingEmployees: true,
                errorEmployees: null
            };

        case employeesPageTypes.EMPLOYEES_GET_FAILURE:
            return {
                ...state,
                employees: {},
                loadingEmployees: false,
                errorEmployees: action.payload
            };

        case employeesPageTypes.DEPARTMENTS_GET_SUCCESS:
            return {
                ...state,
                departments: action.payload,
                loadingDepartments: false,
                errorDepartments: null
            };

        case employeesPageTypes.DEPARTMENTS_GET_REQUEST:
            return {
                ...state,
                departments: {},
                loadingDepartments: true,
                errorDepartments: null
            };

        case employeesPageTypes.DEPARTMENTS_GET_FAILURE:
            return {
                ...state,
                departments: {},
                loadingDepartments: false,
                errorDepartments: action.payload
            };

        case employeesPageTypes.DEPARTMENT_ORDER_GET_SUCCESS:
            return {
                ...state,
                departmentOrder: action.payload,
                loadingDepartmentOrder: false,
                errorDepartmentOrder: null
            };

        case employeesPageTypes.DEPARTMENT_ORDER_GET_REQUEST:
            return {
                ...state,
                departmentOrder: {},
                loadingDepartmentOrder: true,
                errorDepartmentOrder: null
            };

        case employeesPageTypes.DEPARTMENT_ORDER_GET_FAILURE:
            return {
                ...state,
                departmentOrder: {},
                loadingProcess: false,
                errorDepartmentOrder: action.payload
            };

        case employeesPageTypes.ALL_EMPLOYEES_LIST_GET_SUCCESS:
            return {
                ...state,
                allEmployeesList: action.payload,
                loadingAllEmployeesList: false,
                errorAllEmployeesList: null
            };

        case employeesPageTypes.ALL_EMPLOYEES_LIST_GET_REQUEST:
            return {
                ...state,
                allEmployeesList: [],
                loadingAllEmployeesList: true,
                errorAllEmployeesList: null
            };

        case employeesPageTypes.ALL_EMPLOYEES_LIST_GET_FAILURE:
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