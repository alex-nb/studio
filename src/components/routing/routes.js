import React, {Component} from 'react';
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
import { connect } from 'react-redux';
import {changeSelected} from '../../actions/common-info';
import CloseProject from "../projects-page/close-project";


class Routes extends Component {

    render() {
        return (
            <Switch>
                <Route path="/login" exact component={LoginPage}/>
                <Route path="/signup" exact component={SignupPage}/>
                <PrivateRoute path="/" exact component={() => {
                    this.props.changeSelected('');
                    return <Welcome/>;
                }}/>
                <PrivateRoute path="/projects" exact component={() => {
                    this.props.changeSelected('projects');
                    return <ProjectsPage />;
                }} />
                <PrivateRoute path="/projects/edit/:id" component={({ match }) => {
                    const { id } = match.params;
                    this.props.changeSelected('projects');
                    return <EditProject projectId={id} />
                }} />
                <PrivateRoute path="/projects/close/:id" component={({ match }) => {
                    const { id } = match.params;
                    this.props.changeSelected('projects');
                    return <CloseProject projectId={id} />
                }} />
                <PrivateRoute path="/employees" component={() => {
                    this.props.changeSelected('employees');
                    return <EmployeesPage />;
                }} />
                <PrivateRoute path="/create_employee" component={() => {
                    this.props.changeSelected('employees');
                    return <CreateEmployee />;
                }} />
                <PrivateRoute path="/balance" component={() => {
                    this.props.changeSelected('balance');
                    return <Transaction />;
                }} />
                <PrivateRoute path="/expenditure" component={() => {
                    this.props.changeSelected('expenditure');
                    return <Expenditure />;
                }} />
                <PrivateRoute path="/requests" component={() => {
                    this.props.changeSelected('requests');
                    return <Requests />;
                }} />
                <PrivateRoute path="/reports" component={() => {
                    this.props.changeSelected('reports');
                    return <Reports />;
                }} />
                <Route component={NotFound} />
            </Switch>
        );
    }
}

const mapStateToProps = ({ commonInfo }) => {
    const { selected } = commonInfo;
    return { selected };
};

export default connect(mapStateToProps, {changeSelected})(Routes);

