/*const employeeNewAdd = (employee) => {
    console.log("action employeeNewAdd");
    console.log(employee);
    return {
        type: 'EMPLOYEE_NEW_ADD',
        payload: employee
    };
};*/

const employeeNewAdd = (employee) => () => {
    console.log("action employeeNewAdd");
    console.log(employee);
    const newEmployee = {
        id: 8,
        name: `${employee.lastName} ${employee.firstName} ${employee.secondName}`,
    };
    //bdApiService.employeeNewAdd(newEmployee);
    return {
        type: 'EMPLOYEE_NEW_ADD',
        payload: employee
    };
};

const projectsNewLoaded = (listProjects) => {
    return {
        type: 'FETCH_PROJECTS_NEW_SUCCESS',
        payload: listProjects
    };
};

const projectsNewRequested = () => {
    return {
        type: 'FETCH_PROJECTS_NEW_REQUEST'
    };
};

const projectsNewError = (error) => {
    return {
        type: 'FETCH_PROJECTS_NEW_FAILURE',
        payload: error
    };
};

const projectsProcessLoaded = (listProjects) => {
    return {
        type: 'FETCH_PROJECTS_PROCESS_SUCCESS',
        payload: listProjects
    };
};

const projectsProcessRequested = () => {
    return {
        type: 'FETCH_PROJECTS_PROCESS_REQUEST'
    };
};

const projectsProcessError = (error) => {
    return {
        type: 'FETCH_PROJECTS_PROCESS_FAILURE',
        payload: error
    };
};

const projectsCloseLoaded = (listProjects) => {
    return {
        type: 'FETCH_PROJECTS_CLOSE_SUCCESS',
        payload: listProjects
    };
};

const projectsCloseRequested = () => {
    return {
        type: 'FETCH_PROJECTS_CLOSE_REQUEST'
    };
};

const projectsCloseError = (error) => {
    return {
        type: 'FETCH_PROJECTS_CLOSE_FAILURE',
        payload: error
    };
};


const employeesLoaded = (listEmployees) => {
    return {
        type: 'FETCH_EMPLOYEES_SUCCESS',
        payload: listEmployees
    };
};

const employeesRequested = () => {
    return {
        type: 'FETCH_EMPLOYEES_REQUEST'
    };
};

const employeesError = (error) => {
    return {
        type: 'FETCH_EMPLOYEES_FAILURE',
        payload: error
    };
};

const departmentsLoaded = (listDepartments) => {
    return {
        type: 'FETCH_DEPARTMENTS_SUCCESS',
        payload: listDepartments
    };
};

const departmentsRequested = () => {
    return {
        type: 'FETCH_DEPARTMENTS_REQUEST'
    };
};

const departmentsError = (error) => {
    return {
        type: 'FETCH_DEPARTMENTS_FAILURE',
        payload: error
    };
};

const departmentOrderLoaded = (listDepartmentOrder) => {
    return {
        type: 'FETCH_DEPARTMENT_ORDER_SUCCESS',
        payload: listDepartmentOrder
    };
};

const departmentOrderRequested = () => {
    return {
        type: 'FETCH_DEPARTMENT_ORDER_REQUEST'
    };
};

const departmentOrderError = (error) => {
    return {
        type: 'FETCH_DEPARTMENT_ORDER_FAILURE',
        payload: error
    };
};

const allReportsRequested = () => {
    return {
      type: 'FETCH_ALL_REPORTS_REQUEST'
    };
};

const allReportsLoaded = (listAllReports) => {
    return {
        type: 'FETCH_ALL_REPORTS_SUCCESS',
        payload: listAllReports
    };
};

const allReportsError = (error) => {
    return {
        type: 'FETCH_ALL_REPORTS_FAILURE',
        payload: error
    };
};

const allEmployeesListRequested = () => {
    return {
        type: 'FETCH_ALL_EMPLOYEES_LIST_REQUEST'
    };
};

const allEmployeesListLoaded = (listAllEmployees) => {
    return {
        type: 'FETCH_ALL_EMPLOYEES_LIST_SUCCESS',
        payload: listAllEmployees
    };
};

const allEmployeesListError = (error) => {
    return {
        type: 'FETCH_ALL_EMPLOYEES_LIST_FAILURE',
        payload: error
    };
};

const personalInfoRequested = () => {
    return {
        type: 'FETCH_PERSONAL_INFO_REQUEST'
    };
};

const personalInfoLoaded = (personalInfo) => {
    return {
        type: 'FETCH_PERSONAL_INFO_SUCCESS',
        payload: personalInfo
    };
};

const personalInfoError = (error) => {
    return {
        type: 'FETCH_PERSONAL_INFO_FAILURE',
        payload: error
    };
};

const personalReportsRequested = () => {
    return {
        type: 'FETCH_PERSONAL_REPORTS_REQUEST'
    };
};

const personalReportsLoaded = (personalReports) => {
    return {
        type: 'FETCH_PERSONAL_REPORTS_SUCCESS',
        payload: personalReports
    };
};

const personalReportsError = (error) => {
    return {
        type: 'FETCH_PERSONAL_REPORTS_FAILURE',
        payload: error
    };
};

const requestsMoneyRequested = () => {
    return {
        type: 'FETCH_REQUESTS_MONEY_REQUEST'
    };
};

const requestsMoneyLoaded = (requestsMoney) => {
    return {
        type: 'FETCH_REQUESTS_MONEY_SUCCESS',
        payload: requestsMoney
    };
};

const requestsMoneyError = (error) => {
    return {
        type: 'FETCH_REQUESTS_MONEY_FAILURE',
        payload: error
    };
};

const expenditureRequested = () => {
    return {
        type: 'FETCH_EXPENDITURE_REQUEST'
    };
};

const expenditureLoaded = (expenditure) => {
    return {
        type: 'FETCH_EXPENDITURE_SUCCESS',
        payload: expenditure
    };
};

const expenditureError = (error) => {
    return {
        type: 'FETCH_EXPENDITURE_FAILURE',
        payload: error
    };
};

const transactionRequested = () => {
    return {
        type: 'FETCH_TRANSACTION_REQUEST'
    };
};

const transactionLoaded = (transaction) => {
    return {
        type: 'FETCH_TRANSACTION_SUCCESS',
        payload: transaction
    };
};

const transactionError = (error) => {
    return {
        type: 'FETCH_TRANSACTION_FAILURE',
        payload: error
    };
};

const fetchTransaction = (bdApiService, dispatch) => () => {
    dispatch(transactionRequested());
    bdApiService.getTransaction()
        .then((transaction) => dispatch(transactionLoaded(transaction)))
        .catch((err) => dispatch(transactionError(err)));
};

const fetchExpenditure = (bdApiService, dispatch) => () => {
    dispatch(expenditureRequested());
    bdApiService.getExpenditure()
        .then((expenditure) => dispatch(expenditureLoaded(expenditure)))
        .catch((err) => dispatch(expenditureError(err)));
};

const fetchRequestsMoney = (bdApiService, dispatch) => () => {
    dispatch(requestsMoneyRequested());
    bdApiService.getRequestsMoney()
        .then((requestsMoney) => dispatch(requestsMoneyLoaded(requestsMoney)))
        .catch((err) => dispatch(requestsMoneyError(err)));
};

const fetchPersonalInfo = (bdApiService, dispatch) => () => {
    dispatch(personalInfoRequested());
    bdApiService.getPersonalInfo()
        .then((personalInfo) => dispatch(personalInfoLoaded(personalInfo)))
        .catch((err) => dispatch(personalInfoError(err)));
};

const fetchPersonalReports = (bdApiService, dispatch) => () => {
    dispatch(personalReportsRequested());
    bdApiService.getPersonalReports()
        .then((personalReports) => dispatch(personalReportsLoaded(personalReports)))
        .catch((err) => dispatch(personalReportsError(err)));
};

const fetchAllProjects = (bdApiService, dispatch) => () => {
    dispatch(projectsProcessRequested());
    bdApiService.getProjectsProcess()
        .then((projectsProcess) => dispatch(projectsProcessLoaded(projectsProcess)))
        .catch((err) => dispatch(projectsProcessError(err)));
    dispatch(projectsCloseRequested());
    bdApiService.getProjectsClose()
        .then((projectsClose) => dispatch(projectsCloseLoaded(projectsClose)))
        .catch((err) => dispatch(projectsCloseError(err)));
    dispatch(projectsNewRequested());
    bdApiService.getProjectsNew()
        .then((projectsNew) => dispatch(projectsNewLoaded(projectsNew)))
        .catch((err) => dispatch(projectsNewError(err)));
};

const fetchCompanyStructure = (bdApiService, dispatch) => () => {
    dispatch(employeesRequested());
    bdApiService.getEmployees()
        .then((employees) => dispatch(employeesLoaded(employees)))
        .catch((err) => dispatch(employeesError(err)));
    dispatch(departmentsRequested());
    bdApiService.getDepartments()
        .then((departments) => dispatch(departmentsLoaded(departments)))
        .catch((err) => dispatch(departmentsError(err)));
    dispatch(departmentOrderRequested());
    bdApiService.getDepartmentsOrder()
        .then((departmentOrder) => dispatch(departmentOrderLoaded(departmentOrder)))
        .catch((err) => dispatch(departmentOrderError(err)));
    dispatch(allEmployeesListRequested());
    bdApiService.getListEmployees()
        .then((allEmployeesList) => dispatch(allEmployeesListLoaded(allEmployeesList)))
        .catch((err) => dispatch(allEmployeesListError(err)));
};

const fetchAllReports = (bdApiService, dispatch) => () => {
    dispatch(allReportsRequested());
    bdApiService.getAllReports()
        .then((allReports) => dispatch(allReportsLoaded(allReports)))
        .catch((err) => dispatch(allReportsError(err)));
};

export {
    projectsNewLoaded,
    projectsNewRequested,
    projectsNewError,
    fetchAllProjects,
    fetchCompanyStructure,
    fetchAllReports,
    fetchPersonalInfo,
    fetchPersonalReports,
    employeeNewAdd,
    fetchRequestsMoney,
    fetchExpenditure,
    fetchTransaction
};