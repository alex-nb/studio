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
                departmentOrder: {},
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

        case employeesPageTypes.ADD_EMPLOYEE:
            const {_id, employees} = action.payload;
            const employee = employees.pop();
            console.log(employee);
            console.log(_id);
            const i = Object.keys(state.employees).length+1;
            console.log(i);
            console.log(state);
            console.log(action.payload);

            return {
                ...state,
                departments: {
                  ...state.departments,
                  [_id]: {
                      ...state.departments[_id],
                      employeesIds: [
                          ...state.departments[_id].employeesIds,
                          i
                      ]
                  }
                },
                employees: {
                    ...state.employees,
                    [i]: {
                        id: i,
                        name: employee.idEmp.name,
                        idBase: employee.idEmp._id,
                        img: employee.idEmp.img
                    }
                }
            };

        case employeesPageTypes.ADD_EMPLOYEE_FAILURE:
            return {
                ...state,
                errorEmployees: action.payload
            };

        default:
            return state;
    }

};