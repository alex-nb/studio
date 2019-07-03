import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './private-route';
import ProjectsPage from '../projects-page';
import { Transaction, Expenditure, Requests } from "../finance";
import EmployeesPage from "../employees-page";
import Reports from "../reports";
import CreateEmployee from "../employees-page/create-employee";
import EditProject from "../projects-page/edit-project";
import LoginPage from '../auth/login';
import SignupPage from '../auth/signup';
import Welcome from '../layout/welcome';
import NotFound from '../layout/not-found';

const Routes = () => {
    return (
        <Switch>
            <Route path="/login" exact component={LoginPage}/>
            <Route path="/signup" exact component={SignupPage}/>
            <PrivateRoute path="/" exact component={Welcome}/>
            <PrivateRoute path="/projects" exact component={ProjectsPage} />
            <PrivateRoute path="/projects/:id" component={({ match }) => {
                const { id } = match.params;
                return <EditProject projectId={id} />
            }} />
            <PrivateRoute path="/employees" component={EmployeesPage} />
            <PrivateRoute path="/create_employee" component={CreateEmployee} />
            <PrivateRoute path="/balance" component={Transaction} />
            <PrivateRoute path="/expenditure" component={Expenditure} />
            <PrivateRoute path="/requests" component={Requests} />
            <PrivateRoute path="/reports" component={Reports} />
            <Route component={NotFound} />
        </Switch>
    );
};

export default Routes;
