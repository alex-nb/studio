import { employeesPageTypes } from './types';
import { employeesPageAPI } from './api-endpoints';

import axios from "axios";


const employeesLoaded = (listEmployees) => {
    return {
        type: employeesPageTypes.EMPLOYEES_GET_SUCCESS,
        payload: listEmployees
    };
};

const employeesRequested = () => ({
    type: employeesPageTypes.EMPLOYEES_GET_REQUEST
});

const employeesError = (error) => ({
    type: employeesPageTypes.EMPLOYEES_GET_FAILURE,
    payload: error
});

const departmentsLoaded = (listDepartments) => ({
    type: employeesPageTypes.DEPARTMENTS_GET_SUCCESS,
    payload: listDepartments
});

const departmentsRequested = () => ({
    type: employeesPageTypes.DEPARTMENTS_GET_REQUEST
});

const departmentsError = (error) => ({
    type: employeesPageTypes.DEPARTMENTS_GET_FAILURE,
    payload: error
});

const departmentOrderLoaded = (listDepartmentOrder) => ({
    type: employeesPageTypes.DEPARTMENT_ORDER_GET_SUCCESS,
    payload: listDepartmentOrder
});

const departmentOrderRequested = () => ({
    type: employeesPageTypes.DEPARTMENT_ORDER_GET_REQUEST
});

const departmentOrderError = (error) => ({
    type: employeesPageTypes.DEPARTMENT_ORDER_GET_FAILURE,
    payload: error
});

const allEmployeesListRequested = () => ({
    type:  employeesPageTypes.ALL_EMPLOYEES_LIST_GET_REQUEST
});

const allEmployeesListLoaded = (listAllEmployees) => ({
    type: employeesPageTypes.ALL_EMPLOYEES_LIST_GET_SUCCESS,
    payload: listAllEmployees
});

const allEmployeesListError = (error) => ({
    type: employeesPageTypes.ALL_EMPLOYEES_LIST_GET_FAILURE,
    payload: error
});

export const fetchCompanyStructure = () => async dispatch => {
    dispatch(employeesRequested());
    dispatch(departmentsRequested());
    dispatch(departmentOrderRequested());

    try {
        const res = await axios.get(employeesPageAPI.GET_DEPARTMENTS_STRUCTURE);
        let employees = {}, departments = {}, departmentsOrder = [];
        let i=1;
        await res.data.departmentsStructure.map(async dept => {
            let listEmployees = [];
            departmentsOrder[dept.orderNum-1] = dept._id;
            if (dept.employees && dept.employees.length !== 0) {
                await dept.employees.map(emp => {
                    //const imgPath = '../'+emp.idEmp.img;
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
                    i++;
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

    dispatch(allEmployeesListRequested());
    try {
        const res = await axios.get(employeesPageAPI.GET_ALL_EMPLOYEES);
        dispatch(allEmployeesListLoaded(res.data.employeesList));
    } catch (err) {
        console.error('Get all employees list. '+err);
        dispatch(allEmployeesListError(err));
    }
/*
    try {
        const res = await {
            '1': {id: '1', name: 'Алешенька', idBase: '1', rate: '300', img: leha},
            '2': {id: '2', name: 'Лев Петрович', idBase: '2', rate: '400', img: men},
            '3': {id: '3', name: 'Арья Старк', idBase: '3', rate: '400', img: stark},
            '4': {id: '4', name: 'Тигруля', idBase: '4', rate: '500', img: tigra},
            '5': {id: '5', name: 'Мечтающий инженер', idBase: '5', rate: '800', img: clever},
            '6': {id: '6', name: 'Тигруля', idBase: '4', rate: '500', img: tigra},
            '7': {id: '7', name: 'Лев Петрович', idBase: '2', rate: '400', img: men},
        };
        dispatch(employeesLoaded(res));
    } catch (err) {
        console.error('Get employees list. '+err);
        dispatch(employeesError(err));
    }

    try {
        const res = await {
            'dept-1': {
                id: 'dept-1',
                title: 'Design',
                employeesIds: ['4']
            },
            'dept-2': {
                id: 'dept-2',
                title: 'Programming',
                employeesIds: ['3', '1']
            },
            'dept-3': {
                id: 'dept-3',
                title: 'SEO',
                employeesIds: []
            },
            'dept-4': {
                id: 'dept-4',
                title: 'Typesetting',
                employeesIds: ['6', '7']
            },
            'dept-5': {
                id: 'dept-5',
                title: 'Project management',
                employeesIds: ['5', '7']
            },
            'dept-6': {
                id: 'dept-6',
                title: 'Studio',
                employeesIds: ['2']
            },
        };
        dispatch(departmentsLoaded(res));
    } catch (err) {
        console.error('Get departments. '+err);
        dispatch(departmentsError(err));
    }
    try {
        const res = await ['dept-6', 'dept-5', 'dept-4', 'dept-2', 'dept-1', 'dept-3'];
        //const res = await axios.get('/api/posts');
        dispatch(departmentOrderLoaded(res));
    } catch (err) {
        console.error('Get department order. '+err);
        dispatch(departmentOrderError(err));
    }*/
};