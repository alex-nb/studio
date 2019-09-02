import {employeesPageTypes} from './types';
import {employeesPageAPI} from './api-endpoints';

import axios from "axios";


const employeesLoaded = (listEmployees) => {
    return {
        type: employeesPageTypes.EMPLOYEES_GET,
        payload: listEmployees
    };
};

const employeesError = (error) => ({
    type: employeesPageTypes.EMPLOYEES_GET_FAILURE,
    payload: error
});

const departmentsLoaded = (listDepartments) => ({
    type: employeesPageTypes.DEPARTMENTS_GET,
    payload: listDepartments
});

const departmentsError = (error) => ({
    type: employeesPageTypes.DEPARTMENTS_GET_FAILURE,
    payload: error
});

const departmentOrderLoaded = (listDepartmentOrder) => ({
    type: employeesPageTypes.DEPARTMENT_ORDER_GET,
    payload: listDepartmentOrder
});

const departmentOrderError = (error) => ({
    type: employeesPageTypes.DEPARTMENT_ORDER_GET_FAILURE,
    payload: error
});

const allEmployeesListLoaded = (listAllEmployees) => ({
    type: employeesPageTypes.ALL_EMPLOYEES_LIST_GET,
    payload: listAllEmployees
});

const allEmployeesListError = (error) => ({
    type: employeesPageTypes.ALL_EMPLOYEES_LIST_GET_FAILURE,
    payload: error
});

export const fetchAllEmployeesList = () => async dispatch => {
    try {
        const res = await axios.get(employeesPageAPI.GET_ALL_EMPLOYEES);
        dispatch(allEmployeesListLoaded(res.data.employeesList));
    } catch (err) {
        console.error('Get all employees list. '+err);
        dispatch(allEmployeesListError(err));
    }
};

export const fetchCompanyStructure = () => async dispatch => {
    console.log('fetch');
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
                            name: emp.idEmp.name,
                            idBase: emp.idEmp._id,
                            img: emp.idEmp.img
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
        dispatch(employeesLoaded(employees));
        dispatch(departmentsLoaded(departments));
        dispatch(departmentOrderLoaded(departmentsOrder));
    } catch (err) {
        console.error('Get departments structure. '+err);
        dispatch(employeesError(err));
        dispatch(departmentsError(err));
        dispatch(departmentOrderError(err));
    }
    try {
        const res = await axios.get(employeesPageAPI.GET_ALL_EMPLOYEES);
        dispatch(allEmployeesListLoaded(res.data.employeesList));
    } catch (err) {
        console.error('Get all employees list. '+err);
        dispatch(allEmployeesListError(err));
    }
};

export const addEmployee = (formData) => async dispatch => {
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
    } catch (err) {
        console.error('Add employee. '+err);
        dispatch({
            type: employeesPageTypes.ADD_EMPLOYEE_FAILURE,
            payload: err
        });
    }
};