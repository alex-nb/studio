/*  Authorization  */

export const authTypes = {
    USER_LOAD : 'USER_LOAD',
    REGISTER_SUCCESS : 'REGISTER_SUCCESS',
    LOGIN_SUCCESS : 'LOGIN_SUCCESS',
    REGISTER_FAIL : 'REGISTER_FAIL',
    AUTH_ERROR : 'AUTH_ERROR',
    LOGIN_FAIL : 'LOGIN_FAIL',
    LOGOUT : 'LOGOUT'
};


/*   Common info */

export const commonInfoTypes = {
    CHANGE_SELECTED_MENU: 'CHANGE_SELECTED_MENU'
};


/*   Employees page */

export const employeesPageTypes = {
    EMPLOYEES_GET : 'EMPLOYEES_GET',
    EMPLOYEES_GET_FAILURE : 'EMPLOYEES_GET_FAILURE',
    DEPARTMENTS_GET : 'DEPARTMENTS_GET',
    DEPARTMENTS_GET_FAILURE : 'EMPLOYEES_GE',
    DEPARTMENT_ORDER_GET : 'DEPARTMENT_ORDER_GET',
    DEPARTMENT_ORDER_GET_FAILURE : 'DEPARTMENT_ORDER_GET_FAILURE',
    ALL_EMPLOYEES_LIST_GET : 'ALL_EMPLOYEES_LIST_GET',
    ALL_EMPLOYEES_LIST_GET_FAILURE : 'ALL_EMPLOYEES_LIST_GET_FAILURE'
};


/*   Expenditures page */


export const expendituresPageTypes = {
    EXPENDITURE_GET : 'EXPENDITURE_GET',
    EXPENDITURE_GET_FAILURE : 'EXPENDITURE_GET_FAILURE'
};

/*   Projects page */

export const projectsPageTypes = {
    PROJECTS_NEW_GET : 'PROJECTS_NEW_GET',
    PROJECTS_NEW_GET_FAILURE : 'PROJECTS_NEW_GET_FAILURE',
    PROJECTS_PROCESS_GET : 'PROJECTS_PROCESS_GET',
    PROJECTS_PROCESS_GET_FAILURE : 'PROJECTS_PROCESS_GET_FAILURE',
    PROJECTS_CLOSE_GET : 'PROJECTS_CLOSE_GET',
    PROJECTS_CLOSE_GET_FAILURE : 'PROJECTS_CLOSE_GET_FAILURE',
    GET_CURRENT_PROJECT : 'GET_CURRENT_PROJECT',
    GET_CURRENT_PROJECT_FAILURE : 'GET_CURRENT_PROJECT_FAILURE',
    UPDATE_PROJECT: 'UPDATE_PROJECT',
    UPDATE_PROJECT_FAILURE: 'UPDATE_PROJECT_FAILURE'
};



/*   Reports page */

export const reportsPageTypes = {
    ALL_REPORTS_GET : 'ALL_REPORTS_GET',
    ALL_REPORTS_GET_FAILURE : 'ALL_REPORTS_GET_FAILURE',
    ADD_REPORT: 'ADD_REPORT',
    ADD_REPORT_FAILURE: 'ADD_REPORT_FAILURE'
};


/*   Requests money page */

export const requestsMoneyPageTypes = {
    REQUESTS_MONEY_GET : 'REQUESTS_MONEY_GET',
    REQUESTS_MONEY_GET_FAILURE : 'REQUESTS_MONEY_GET_FAILURE'
};


/*   Transactions page */

export const transactionsPageTypes = {
    TRANSACTION_GET : 'TRANSACTION_GET',
    TRANSACTION_GET_FAILURE : 'TRANSACTION_GET_FAILURE'
};


/*   Header */

export const headerPageTypes = {
    PERSONAL_INFO_GET_REQUEST : 'PERSONAL_INFO_GET_REQUEST',
    PERSONAL_INFO_GET_SUCCESS : 'PERSONAL_INFO_GET_SUCCESS',
    PERSONAL_INFO_GET_FAILURE : 'PERSONAL_INFO_GET_FAILURE'
};