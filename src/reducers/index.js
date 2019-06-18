import { combineReducers } from 'redux';

import employees from './employees';
import personal_info from './personal-info';
import expenditure from './expenditure';
import projects from './projects';
import reports from './reports';
import requests from './requests';
import transactions from './transactions';

export default combineReducers({
    employees,
    personal_info,
    expenditure,
    projects,
    reports,
    requests,
    transactions
});