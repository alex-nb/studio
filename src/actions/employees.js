import {employeesPageTypes} from './types';
import {employeesPageAPI} from './api-endpoints';
import axios from "axios";
import {setAlert} from "./alert";

export const fetchAllEmployeesList = () => async dispatch => {
    try {
        const res = await axios.get(employeesPageAPI.GET_ALL_EMPLOYEES);
        dispatch({
            type: employeesPageTypes.ALL_EMPLOYEES_LIST_GET,
            payload: res.data.employeesList
        });
    } catch (err) {
        console.error('Get all employees list. '+err);
        dispatch({
            type: employeesPageTypes.ALL_EMPLOYEES_LIST_GET_FAILURE,
            payload: err
        });
    }
};

export const fetchCompanyStructure = () => async dispatch => {
    try {
        const res = await axios.get(employeesPageAPI.GET_DEPARTMENTS_STRUCTURE);
        let employees = {}, departments = {}, departmentsOrder = [];
        await res.data.departmentsStructure.map(async dept => {
            let listEmployees = [];
            departmentsOrder[dept.orderNum-1] = dept._id;
            if (dept.employees && dept.employees.length !== 0) {
                await dept.employees.map(emp => {
                    let i = Object.keys(employees).length+1;
                    employees = {
                        ...employees,
                        [i]: {
                            id: i,
                            name: emp.name,
                            idBase: emp._id,
                            img: emp.img
                        }
                    };
                    listEmployees.push(i);
                    return null;
                });
            }
            departments = {
                ...departments,
                [dept._id]: {
                    id: dept._id,
                    title: dept.title,
                    employeesIds: listEmployees
                }
            };
        });
        dispatch({
            type: employeesPageTypes.EMPLOYEES_GET,
            payload: employees
        });
        dispatch({
            type: employeesPageTypes.DEPARTMENTS_GET,
            payload: departments
        });
        dispatch({
            type: employeesPageTypes.DEPARTMENT_ORDER_GET,
            payload: departmentsOrder
        });
    } catch (err) {
        console.error('Get departments structure. '+err);
        dispatch({
            type: employeesPageTypes.EMPLOYEES_GET_FAILURE,
            payload: err
        });
        dispatch({
            type: employeesPageTypes.DEPARTMENTS_GET_FAILURE,
            payload: err
        });
        dispatch({
            type: employeesPageTypes.DEPARTMENT_ORDER_GET_FAILURE,
            payload: err
        });
    }
    try {
        const res = await axios.get(employeesPageAPI.GET_ALL_EMPLOYEES);
        dispatch({
            type: employeesPageTypes.ALL_EMPLOYEES_LIST_GET,
            payload: res.data.employeesList
        });
    } catch (err) {
        console.error('Get all employees list. '+err);
        dispatch({
            type: employeesPageTypes.ALL_EMPLOYEES_LIST_GET_FAILURE,
            payload: err
        });
    }
};

export const getDepartments = () => async dispatch => {
    try {
        const res = await axios.get(employeesPageAPI.GET_DEPARTMENTS_STRUCTURE);
        let departments = [];
        await res.data.departmentsStructure.map(async dept => {
            departments.push({id: dept._id,
                title: dept.title});
        });
        dispatch({
            type: employeesPageTypes.ONLY_DEPARTMENT,
            payload: departments
        });
    } catch (err) {
        console.error('Get departments. '+err);
        dispatch({
            type: employeesPageTypes.DEPARTMENTS_GET_FAILURE,
            payload: err
        });
    }
};

export const addEmployee = (formData, history) => async dispatch => {
    dispatch({
        type: employeesPageTypes.EMPLOYEE_LOAD
    });
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post(employeesPageAPI.ADD_EMPLOYEE, formData, config);
        dispatch({
            type: employeesPageTypes.ADD_EMPLOYEE,
            payload: res.data.department
        });
        if (history) history.push('/employees');
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: employeesPageTypes.ADD_EMPLOYEE_FAILURE
        });
    }
};

export const updateDepartments = (departments) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        await axios.post(employeesPageAPI.UPDATE_DEPARTMENTS, departments, config);
        /*dispatch({
            type: employeesPageTypes.UPDATE_DEPARTMENTS,
            payload: res.data.department
        });*/
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            await errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        /*dispatch({
            type: employeesPageTypes.UPDATE_DEPARTMENTS_FAILURE,
            payload: err
        });*/
    }
};

export const deleteEmployee = (idEmp) => async dispatch => {
    try {
        const res = await axios.delete(employeesPageAPI.DELETE_EMPLOYEE+idEmp);
        dispatch({
            type: employeesPageTypes.DELETE_EMPLOYEE,
            payload: res.data.employee
        });
        dispatch(setAlert('Сотрудник удален', 'success'));
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            await errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        /*dispatch({
            type: employeesPageTypes.DELETE_EMPLOYEE_FAILURE,
            payload: err
        });*/
    }
};