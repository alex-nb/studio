import { combineReducers } from 'redux';

import employeesList from './employees';
import personal_info from './personal-info';
import expenditureList from './expenditure';
import projectsList from './projects';
import reportsList from './reports';
import requestsList from './requests';
import transactionsList from './transactions';
import auth from './auth';

export default combineReducers({
    employeesList,
    personal_info,
    expenditureList,
    projectsList,
    reportsList,
    requestsList,
    transactionsList,
    auth
});