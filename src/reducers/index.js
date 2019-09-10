import { combineReducers } from 'redux';

import employeesList from './employees';
import personalInfo from './personal-info';
import expenditureList from './expenditure';
import projectsList from './projects';
import reportsList from './reports';
import requestsList from './requests';
import transactionsList from './transactions';
import auth from './auth';
import commonInfo from './common-info';
import alert from './alert';

export default combineReducers({
    employeesList,
    personalInfo,
    expenditureList,
    projectsList,
    reportsList,
    requestsList,
    transactionsList,
    auth,
    commonInfo,
    alert
});