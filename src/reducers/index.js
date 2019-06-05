const initialState = {
    projectsNew: [],
    projectsClose: [],
    projectsProcess: [],
    employees: {},
    departments: {},
    departmentOrder: {},
    allReports: [],
    allEmployeesList: [],
    personalInfo: {},
    personalReports: [],
    requestsMoney: [],
    expenditure: [],
    transaction: [],
    loadingNew: true,
    loadingProcess: true,
    loadingClose: true,
    loadingEmployees: true,
    loadingDepartmentOrder: true,
    loadingDepartments: true,
    loadingAllReports: true,
    loadingAllEmployeesList: true,
    loadingPersonalInfo: true,
    loadingPersonalReports: true,
    loadingRequestsMoney: true,
    loadingExpenditure: true,
    loadingTransaction: true,
    errorProjectsNew: null,
    errorProjectsProcess: null,
    errorProjectsClose: null,
    errorEmployees: null,
    errorDepartments: null,
    errorDepartmentOrder: null,
    errorAllReports: null,
    errorAllEmployeesList: null,
    errorPersonalInfo: null,
    errorPersonalReports: null,
    errorRequestsMoney: null,
    errorExpenditure: null,
    errorTransaction: null
};

const reducer =(state = initialState, action) => {

    switch (action.type) {
        case 'EMPLOYEE_NEW_ADD':
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
            };

        case 'FETCH_PROJECTS_NEW_SUCCESS':
            return {
                ...state,
                projectsNew: action.payload,
                loadingNew: false,
                errorProjectsNew: null
            };

        case 'FETCH_PROJECTS_NEW_REQUEST':
            return {
                ...state,
                projectsNew: [],
                loadingNew: true,
                errorProjectsNew: null
            };

        case 'FETCH_PROJECTS_NEW_FAILURE':
            return {
                ...state,
                projectsNew: [],
                loadingNew: false,
                errorProjectsNew: action.payload
            };

        case 'FETCH_PROJECTS_PROCESS_SUCCESS':
            return {
                ...state,
                projectsProcess: action.payload,
                loadingProcess: false,
                errorProjectsProcess: null
            };

        case 'FETCH_PROJECTS_PROCESS_REQUEST':
            return {
                ...state,
                projectsProcess: [],
                loadingProcess: true,
                errorProjectsProcess: null
            };

        case 'FETCH_PROJECTS_PROCESS_FAILURE':
            return {
                ...state,
                projectsProcess: [],
                loadingProcess: false,
                errorProjectsProcess: action.payload
            };

        case 'FETCH_PROJECTS_CLOSE_SUCCESS':
            return {
                ...state,
                projectsClose: action.payload,
                loadingClose: false,
                errorProjectsClose: null
            };

        case 'FETCH_PROJECTS_CLOSE_REQUEST':
            return {
                ...state,
                projectsClose: [],
                loadingClose: true,
                errorProjectsClose: null
            };

        case 'FETCH_PROJECTS_CLOSE_FAILURE':
            return {
                ...state,
                projectsClose: [],
                loadingClose: false,
                errorProjectsClose: action.payload
            };

        case 'FETCH_EMPLOYEES_SUCCESS':
            return {
                ...state,
                employees: action.payload,
                loadingEmployees: false,
                errorEmployees: null
            };

        case 'FETCH_EMPLOYEES_REQUEST':
            return {
                ...state,
                employees: {},
                loadingEmployees: true,
                errorEmployees: null
            };

        case 'FETCH_EMPLOYEES_FAILURE':
            return {
                ...state,
                employees: {},
                loadingEmployees: false,
                errorEmployees: action.payload
            };

        case 'FETCH_DEPARTMENTS_SUCCESS':
            return {
                ...state,
                departments: action.payload,
                loadingDepartments: false,
                errorDepartments: null
            };

        case 'FETCH_DEPARTMENTS_REQUEST':
            return {
                ...state,
                departments: {},
                loadingDepartments: true,
                errorDepartments: null
            };

        case 'FETCH_DEPARTMENTS_FAILURE':
            return {
                ...state,
                departments: {},
                loadingDepartments: false,
                errorDepartments: action.payload
            };

        case 'FETCH_DEPARTMENT_ORDER_SUCCESS':
            return {
                ...state,
                departmentOrder: action.payload,
                loadingDepartmentOrder: false,
                errorDepartmentOrder: null
            };

        case 'FETCH_DEPARTMENT_ORDER_REQUEST':
            return {
                ...state,
                departmentOrder: {},
                loadingDepartmentOrder: true,
                errorDepartmentOrder: null
            };

        case 'FETCH_DEPARTMENT_ORDER_FAILURE':
            return {
                ...state,
                departmentOrder: {},
                loadingProcess: false,
                errorDepartmentOrder: action.payload
            };

        case 'FETCH_ALL_REPORTS_SUCCESS':
            return {
                ...state,
                allReports: action.payload,
                loadingAllReports: false,
                errorAllReports: null
            };

        case 'FETCH_ALL_REPORTS_REQUEST':
            return {
                ...state,
                allReports: {},
                loadingAllReports: true,
                errorAllReports: null
            };

        case 'FETCH_ALL_REPORTS_FAILURE':
            return {
                ...state,
                allReports: {},
                loadingAllReports: false,
                errorAllReports: action.payload
            };

        case 'FETCH_ALL_EMPLOYEES_LIST_SUCCESS':
            return {
                ...state,
                allEmployeesList: action.payload,
                loadingAllEmployeesList: false,
                errorAllEmployeesList: null
            };

        case 'FETCH_ALL_EMPLOYEES_LIST_REQUEST':
            return {
                ...state,
                allEmployeesList: [],
                loadingAllEmployeesList: true,
                errorAllEmployeesList: null
            };

        case 'FETCH_ALL_EMPLOYEES_LIST_FAILURE':
            return {
                ...state,
                allEmployeesList: [],
                loadingAllEmployeesList: false,
                errorAllEmployeesList: action.payload
            };

        case 'FETCH_PERSONAL_INFO_SUCCESS':
            return {
                ...state,
                personalInfo: action.payload,
                loadingPersonalInfo: false,
                errorPersonalInfo: null
            };

        case 'FETCH_PERSONAL_INFO_REQUEST':
            return {
                ...state,
                personalInfo: [],
                loadingPersonalInfo: true,
                errorPersonalInfo: null
            };

        case 'FETCH_PERSONAL_INFO_FAILURE':
            return {
                ...state,
                personalInfo: [],
                loadingPersonalInfo: false,
                errorPersonalInfo: action.payload
            };

        case 'FETCH_PERSONAL_REPORTS_SUCCESS':
            return {
                ...state,
                personalReports: action.payload,
                loadingPersonalReports: false,
                errorPersonalReports: null
            };

        case 'FETCH_PERSONAL_REPORTS_REQUEST':
            return {
                ...state,
                personalReports: [],
                loadingPersonalReports: true,
                errorPersonalReports: null
            };

        case 'FETCH_PERSONAL_REPORTS_FAILURE':
            return {
                ...state,
                personalReports: [],
                loadingPersonalReports: false,
                errorPersonalReports: action.payload
            };

        case 'FETCH_REQUESTS_MONEY_REQUEST':
            return {
                ...state,
                requestsMoney: [],
                loadingRequestsMoney: true,
                errorRequestsMoney: null
            };

        case 'FETCH_REQUESTS_MONEY_SUCCESS':
            return {
                ...state,
                requestsMoney: action.payload,
                loadingRequestsMoney: false,
                errorRequestsMoney: null
            };

        case 'FETCH_REQUESTS_MONEY_FAILURE':
            return {
                ...state,
                requestsMoney: [],
                loadingRequestsMoney: false,
                errorRequestsMoney: action.payload
            };

        case 'FETCH_EXPENDITURE_REQUEST':
            return {
                ...state,
                expenditure: [],
                loadingExpenditure: true,
                errorExpenditure: null
            };

        case 'FETCH_EXPENDITURE_SUCCESS':
            return {
                ...state,
                expenditure: action.payload,
                loadingExpenditure: false,
                errorExpenditure: null
            };

        case 'FETCH_EXPENDITURE_FAILURE':
            return {
                ...state,
                expenditure: [],
                loadingExpenditure: false,
                errorExpenditure: action.payload
            };

        case 'FETCH_TRANSACTION_REQUEST':
            return {
                ...state,
                transaction: [],
                loadingTransaction: true,
                errorTransaction: null
            };

        case 'FETCH_TRANSACTION_SUCCESS':
            return {
                ...state,
                transaction: action.payload,
                loadingTransaction: false,
                errorTransaction: null
            };

        case 'FETCH_TRANSACTION_FAILURE':
            return {
                ...state,
                transaction: [],
                loadingTransaction: false,
                errorTransaction: action.payload
            };

        default:
            return state;
    }

};

export default reducer;