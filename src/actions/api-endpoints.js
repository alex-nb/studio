/*  Authorization  */

export const authAPI = {
    LOGIN : '/auth/login',
    SIGNUP : '/auth/signup'
};


/*   Employees page */

export const employeesPageAPI = {
    GET_DEPARTMENTS_STRUCTURE : '/employees/departments',
    GET_ALL_EMPLOYEES : '/employees',
    ADD_EMPLOYEE: '/employees',
    UPDATE_DEPARTMENTS: '/employees/departments',
    DELETE_EMPLOYEE: '/employees/'
};


/*   Expenditures page */


export const expendituresPageAPI = {
    GET_EXPENDITURE : '/finance/expenditure',
    UPDATE_EXPENDITURE: '/finance/expenditure',
};

/*   Projects page */

export const projectsPageAPI = {
    GET_NEW_PROJECTS : '/projects/new',
    GET_PROCESS_PROJECTS : '/projects/process',
    GET_CLOSE_PROJECTS : '/projects/close',
    GET_ALL_PROJECTS : '/projects',
    GET_PROJECT : '/projects/',
    UPDATE_PROJECT: '/projects',
    CLOSE_PROJECT: '/projects/close',
    ADD_REPORT: '/reports',
    START_PROJECT: '/projects/start',
    CREATE_PROJECT: '/projects/create'
};



/*   Reports page */

export const reportsPageAPI = {
    GET_ALL_REPORTS : '/reports',
    UPDATE_REPORT: '/reports/update',
};


/*   Requests money page */

export const requestsMoneyPageAPI = {
    GET_REQUESTS_MONEY : '/finance/request',
    SET_ANSWER_REQUEST: '/finance/request/answer',
    CREATE_REQUEST_MONEY: '/finance/request'
};


/*   Transactions page */

export const transactionsPageAPI = {
    GET_TRANSACTIONS : '/finance/transaction',
    UPDATE_TRANSACTION : '/finance/transaction'
};


/*   Header */

export const headerPageAPI = {
    GET_PERSONAL_INFO : '/employees/person'
};