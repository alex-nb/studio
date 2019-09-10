import { employeesPageTypes } from '../actions/types';

const initialState = {
    employees: {},
    departments: {},
    departmentOrder: [],
    allEmployeesList: [],
    onlyDepartment: [],
    loadingOnlyDepartment: true,
    loadingEmployees: true,
    loadingEmployee: false,
    loadingDepartmentOrder: true,
    loadingDepartments: true,
    loadingAllEmployeesList: true,
    errorEmployees: null,
    errorDepartments: null,
    errorDepartmentOrder: null,
    errorAllEmployeesList: null,
    errorOnlyDepartment: null
};

export default function (state = initialState, action) {

    switch (action.type) {
        case employeesPageTypes.EMPLOYEE_LOAD:
            return {
                ...state,
                loadingEmployee: true,
            };

        case employeesPageTypes.EMPLOYEES_GET:
            return {
                ...state,
                employees: action.payload,
                loadingEmployees: false,
                errorEmployees: null
            };

        case employeesPageTypes.EMPLOYEES_GET_FAILURE:
            return {
                ...state,
                employees: {},
                loadingEmployees: false,
                errorEmployees: action.payload
            };

        case employeesPageTypes.DEPARTMENTS_GET:
            return {
                ...state,
                departments: action.payload,
                loadingDepartments: false,
                errorDepartments: null
            };

        case employeesPageTypes.DEPARTMENTS_GET_FAILURE:
            return {
                ...state,
                departments: {},
                loadingDepartments: false,
                errorDepartments: action.payload
            };

        case employeesPageTypes.DEPARTMENT_ORDER_GET:
            return {
                ...state,
                departmentOrder: action.payload,
                loadingDepartmentOrder: false,
                errorDepartmentOrder: null
            };

        case employeesPageTypes.DEPARTMENT_ORDER_GET_FAILURE:
            return {
                ...state,
                departmentOrder: [],
                loadingProcess: false,
                errorDepartmentOrder: action.payload
            };

        case employeesPageTypes.ALL_EMPLOYEES_LIST_GET:
            return {
                ...state,
                allEmployeesList: action.payload,
                loadingAllEmployeesList: false,
                errorAllEmployeesList: null
            };

        case employeesPageTypes.ALL_EMPLOYEES_LIST_GET_FAILURE:
            return {
                ...state,
                allEmployeesList: [],
                loadingAllEmployeesList: false,
                errorAllEmployeesList: action.payload
            };

        case employeesPageTypes.ONLY_DEPARTMENT:
            return {
                ...state,
                onlyDepartment: action.payload,
                loadingOnlyDepartment: false,
                errorOnlyDepartment: null
            };

        case employeesPageTypes.ONLY_DEPARTMENT_FAILURE:
            return {
                ...state,
                onlyDepartment: [],
                loadingOnlyDepartment: false,
                errorOnlyDepartment: action.payload
            };


        case employeesPageTypes.ADD_EMPLOYEE:
            if (Object.keys(state.employees).length>0 && Object.keys(state.departments).length > 0) {
                const {_id, employees} = action.payload;
                const employee = employees.pop();
                let i = Number(Object.keys(state.employees).find(key =>  state.employees[key].idBase === employee._id && state.departments[_id].employeesIds.indexOf(Number(key)) > -1));
                if (!i) i = Number(Object.keys(state.employees).length+1);

                return {
                    ...state,
                    loadingEmployee: false,
                    departments: {
                        ...state.departments,
                        [_id]: {
                            ...state.departments[_id],
                            employeesIds: state.departments[_id].employeesIds.indexOf(i)>-1 ?
                                state.departments[_id].employeesIds :
                                [
                                    ...state.departments[_id].employeesIds,
                                    i
                                ]
                        }
                    },
                    employees: {
                        ...state.employees,
                        [i]: {
                            id: i,
                            name: employee.name,
                            idBase: employee._id,
                            img: employee.img
                        }
                    }
                };
            }
            return state;


        case employeesPageTypes.ADD_EMPLOYEE_FAILURE:
            return {
                ...state,
                loadingEmployee: false
            };

        case employeesPageTypes.DELETE_EMPLOYEE:
            const idEmp = action.payload._id;
            return {
                ...state,
                allEmployeesList: state.allEmployeesList.filter(emp=>emp._id!==idEmp),
            };

        case employeesPageTypes.DELETE_EMPLOYEE_FAILURE:
            return state;

        default:
            return state;
    }

};